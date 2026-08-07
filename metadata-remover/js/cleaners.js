/*
 * Lossless metadata removal for JPEG / PNG / WebP.
 * Operates on raw bytes only — image data is never decoded or re-encoded,
 * so output quality is bit-for-bit identical to the input.
 */
'use strict';

var Cleaners = (function () {

  function ascii(bytes, off, str) {
    if (off + str.length > bytes.length) return false;
    for (var i = 0; i < str.length; i++) {
      if (bytes[off + i] !== str.charCodeAt(i)) return false;
    }
    return true;
  }

  function findAscii(bytes, from, to, str) {
    var max = Math.min(to, bytes.length) - str.length;
    for (var i = from; i <= max; i++) {
      if (ascii(bytes, i, str)) return true;
    }
    return false;
  }

  function concat(parts) {
    var total = 0;
    for (var i = 0; i < parts.length; i++) total += parts[i].length;
    var out = new Uint8Array(total);
    var pos = 0;
    for (var j = 0; j < parts.length; j++) {
      out.set(parts[j], pos);
      pos += parts[j].length;
    }
    return out;
  }

  /* ---------------------------------------------------------------- JPEG */

  // Minimal EXIF APP1 carrying only the Orientation tag (no privacy impact,
  // prevents photos from displaying sideways after the original EXIF is gone).
  function orientationSegment(orientation) {
    var seg = new Uint8Array(36);
    var dv = new DataView(seg.buffer);
    dv.setUint16(0, 0xFFE1);            // APP1 marker
    dv.setUint16(2, 34);                // segment length
    seg.set([0x45, 0x78, 0x69, 0x66, 0x00, 0x00], 4); // "Exif\0\0"
    var t = 10;                         // TIFF header (big-endian)
    dv.setUint16(t, 0x4D4D);            // "MM"
    dv.setUint16(t + 2, 0x002A);
    dv.setUint32(t + 4, 8);             // IFD0 offset
    dv.setUint16(t + 8, 1);             // 1 entry
    dv.setUint16(t + 10, 0x0112);       // Orientation
    dv.setUint16(t + 12, 3);            // SHORT
    dv.setUint32(t + 14, 1);            // count
    dv.setUint16(t + 18, orientation);  // value
    dv.setUint32(t + 22, 0);            // no next IFD
    return seg;
  }

  function jpegSegmentLabel(marker, bytes, off) {
    if (marker === 0xE1) {
      if (ascii(bytes, off + 4, 'Exif')) return 'EXIF data';
      if (ascii(bytes, off + 4, 'http://ns.adobe.com/xap/')) return 'XMP data';
      return 'APP1 data';
    }
    if (marker === 0xEB && findAscii(bytes, off + 4, off + 44, 'jumb')) return 'Content Credentials (C2PA)';
    if (marker === 0xED) return 'IPTC / Photoshop data';
    if (marker === 0xFE) return 'Comment';
    if (marker === 0xE2 && ascii(bytes, off + 4, 'MPF')) return 'Multi-picture data';
    return 'APP' + (marker - 0xE0) + ' data';
  }

  // Keep only segments required for correct decoding and color rendering.
  function jpegKeepApp(marker, bytes, off) {
    if (marker === 0xE0) return true;                                   // JFIF
    if (marker === 0xE2) return ascii(bytes, off + 4, 'ICC_PROFILE');   // color profile
    if (marker === 0xEE) return ascii(bytes, off + 4, 'Adobe');         // color transform
    return false;
  }

  function findEOI(bytes, from) {
    for (var i = from; i + 1 < bytes.length; i++) {
      if (bytes[i] === 0xFF && bytes[i + 1] === 0xD9) return i;
    }
    return -1;
  }

  function cleanJpeg(bytes, opts) {
    if (bytes.length < 4 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) return null;
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var parts = [bytes.subarray(0, 2)];
    var removed = [];
    var off = 2;

    if (opts && opts.orientation && opts.orientation !== 1) {
      parts.push(orientationSegment(opts.orientation));
    }

    while (off + 4 <= bytes.length) {
      if (bytes[off] !== 0xFF) break; // malformed stream: keep the rest as-is
      var marker = bytes[off + 1];

      if (marker === 0xFF) { off++; continue; }       // fill byte
      if (marker === 0xD9) { parts.push(bytes.subarray(off, off + 2)); off += 2; break; }

      if (marker === 0xDA) {
        // Start of scan — copy entropy-coded data through EOI, then stop.
        // Anything after EOI (e.g. motion-photo video payloads) is dropped.
        var eoi = findEOI(bytes, off);
        var end = eoi === -1 ? bytes.length : eoi + 2;
        parts.push(bytes.subarray(off, end));
        if (end < bytes.length) {
          removed.push({ label: 'Hidden data after image end', size: bytes.length - end });
        }
        off = bytes.length;
        break;
      }

      if (marker >= 0xD0 && marker <= 0xD8) { parts.push(bytes.subarray(off, off + 2)); off += 2; continue; }

      if (off + 4 > bytes.length) break;
      var len = dv.getUint16(off + 2);
      if (len < 2 || off + 2 + len > bytes.length) break;
      var segEnd = off + 2 + len;

      var isApp = marker >= 0xE0 && marker <= 0xEF;
      if ((isApp && !jpegKeepApp(marker, bytes, off)) || marker === 0xFE) {
        removed.push({ label: jpegSegmentLabel(marker, bytes, off), size: segEnd - off });
      } else {
        parts.push(bytes.subarray(off, segEnd));
      }
      off = segEnd;
    }

    // Malformed input safety: if parsing stopped before a scan was reached,
    // keep the remaining bytes untouched rather than truncating the image.
    if (off < bytes.length) parts.push(bytes.subarray(off));
    return { bytes: concat(parts), removed: removed };
  }

  /* ----------------------------------------------------------------- PNG */

  var PNG_SIG = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
  var PNG_DROP = { tEXt: 'Text metadata', zTXt: 'Compressed text metadata', iTXt: 'International text metadata', eXIf: 'EXIF data', tIME: 'Last-modified time', caBX: 'Content Credentials (C2PA)' };

  function cleanPng(bytes) {
    for (var s = 0; s < 8; s++) if (bytes[s] !== PNG_SIG[s]) return null;
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var parts = [bytes.subarray(0, 8)];
    var removed = [];
    var off = 8;
    while (off + 8 <= bytes.length) {
      var len = dv.getUint32(off);
      var type = String.fromCharCode(bytes[off + 4], bytes[off + 5], bytes[off + 6], bytes[off + 7]);
      var chunkEnd = off + 12 + len;
      if (chunkEnd > bytes.length) break;
      if (PNG_DROP[type]) {
        removed.push({ label: PNG_DROP[type], size: chunkEnd - off });
      } else {
        parts.push(bytes.subarray(off, chunkEnd));
      }
      off = chunkEnd;
      if (type === 'IEND') {
        if (off < bytes.length) removed.push({ label: 'Hidden data after image end', size: bytes.length - off });
        break;
      }
    }
    return { bytes: concat(parts), removed: removed };
  }

  /* ---------------------------------------------------------------- WebP */

  function cleanWebp(bytes) {
    if (!(ascii(bytes, 0, 'RIFF') && ascii(bytes, 8, 'WEBP')) || bytes.length < 12) return null;
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var chunks = [];
    var removed = [];
    var off = 12;
    while (off + 8 <= bytes.length) {
      var fourcc = String.fromCharCode(bytes[off], bytes[off + 1], bytes[off + 2], bytes[off + 3]);
      var size = dv.getUint32(off + 4, true);
      var padded = size + (size & 1);
      var chunkEnd = off + 8 + padded;
      if (off + 8 + size > bytes.length) break;
      if (fourcc === 'EXIF' || fourcc === 'XMP ' || fourcc === 'C2PA') {
        removed.push({
          label: fourcc === 'EXIF' ? 'EXIF data' : fourcc === 'C2PA' ? 'Content Credentials (C2PA)' : 'XMP data',
          size: 8 + size
        });
      } else {
        var copy = new Uint8Array(bytes.subarray(off, Math.min(chunkEnd, bytes.length)));
        if (fourcc === 'VP8X' && copy.length >= 9) copy[8] &= ~(0x08 | 0x04); // clear EXIF + XMP flags
        chunks.push(copy);
      }
      off = chunkEnd;
    }
    if (!removed.length) {
      // Nothing to strip — return the original bytes untouched.
      return { bytes: bytes, removed: removed };
    }
    var body = concat(chunks);
    var out = new Uint8Array(12 + body.length);
    out.set(bytes.subarray(0, 12));
    out.set(body, 12);
    var outDv = new DataView(out.buffer);
    outDv.setUint32(4, out.length - 8, true); // fix RIFF size
    return { bytes: out, removed: removed };
  }

  /* ----------------------------------------------------------------- API */

  function detect(bytes) {
    if (bytes.length > 3 && bytes[0] === 0xFF && bytes[1] === 0xD8) return 'jpeg';
    if (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'png';
    if (bytes.length > 12 && ascii(bytes, 0, 'RIFF') && ascii(bytes, 8, 'WEBP')) return 'webp';
    if (bytes.length > 12 && ascii(bytes, 4, 'ftyp')) {
      var brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]).trim();
      if (['heic', 'heix', 'hevc', 'heif', 'mif1', 'msf1'].indexOf(brand) !== -1) return 'heic';
      if (brand === 'avif' || brand === 'avis') return 'avif';
    }
    return null;
  }

  function clean(bytes, kind, opts) {
    if (kind === 'jpeg') return cleanJpeg(bytes, opts);
    if (kind === 'png') return cleanPng(bytes);
    if (kind === 'webp') return cleanWebp(bytes);
    return null;
  }

  return { detect: detect, clean: clean };
})();
