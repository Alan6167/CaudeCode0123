/*
 * Read-only metadata parser used to show users what their photos contain
 * before it is removed. Best-effort: any parse error simply yields fewer
 * fields, never a crash.
 */
'use strict';

var MetaReader = (function () {

  var IFD0_TAGS = {
    0x010F: 'Camera make',
    0x0110: 'Camera model',
    0x0112: 'Orientation',
    0x0131: 'Software',
    0x0132: 'Modified date',
    0x013B: 'Artist',
    0x8298: 'Copyright'
  };
  var EXIF_TAGS = {
    0x9003: 'Date taken',
    0x9004: 'Date digitized',
    0x829A: 'Exposure time',
    0x829D: 'F-number',
    0x8827: 'ISO',
    0x920A: 'Focal length',
    0xA434: 'Lens model',
    0xA433: 'Lens make',
    0xA002: 'Image width',
    0xA003: 'Image height'
  };
  var TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

  function ascii(bytes, off, str) {
    if (off + str.length > bytes.length) return false;
    for (var i = 0; i < str.length; i++) {
      if (bytes[off + i] !== str.charCodeAt(i)) return false;
    }
    return true;
  }

  function readValues(dv, base, entryOff, le) {
    var type = dv.getUint16(entryOff + 2, le);
    var count = dv.getUint32(entryOff + 4, le);
    var unit = TYPE_SIZE[type];
    if (!unit || count > 65536) return null;
    var byteLen = unit * count;
    var valOff = byteLen <= 4 ? entryOff + 8 : base + dv.getUint32(entryOff + 8, le);
    if (valOff + byteLen > dv.byteLength) return null;

    if (type === 2) { // ASCII
      var chars = [];
      for (var i = 0; i < count; i++) {
        var c = dv.getUint8(valOff + i);
        if (c === 0) break;
        chars.push(c);
      }
      return [String.fromCharCode.apply(null, chars).trim()];
    }
    var out = [];
    for (var j = 0; j < count && j < 16; j++) {
      var o = valOff + j * unit;
      if (type === 1 || type === 7) out.push(dv.getUint8(o));
      else if (type === 3) out.push(dv.getUint16(o, le));
      else if (type === 4) out.push(dv.getUint32(o, le));
      else if (type === 9) out.push(dv.getInt32(o, le));
      else if (type === 5) out.push(dv.getUint32(o + 4, le) ? dv.getUint32(o, le) / dv.getUint32(o + 4, le) : 0);
      else if (type === 10) out.push(dv.getInt32(o + 4, le) ? dv.getInt32(o, le) / dv.getInt32(o + 4, le) : 0);
    }
    return out;
  }

  function readIfd(dv, base, ifdOff, le, tagMap, fields) {
    if (ifdOff + 2 > dv.byteLength) return {};
    var count = dv.getUint16(ifdOff, le);
    var pointers = {};
    for (var i = 0; i < count; i++) {
      var e = ifdOff + 2 + i * 12;
      if (e + 12 > dv.byteLength) break;
      var tag = dv.getUint16(e, le);
      if (tag === 0x8769 || tag === 0x8825) { // Exif / GPS sub-IFD pointers
        pointers[tag] = dv.getUint32(e + 8, le);
        continue;
      }
      var label = tagMap[tag];
      if (!label) continue;
      var values = readValues(dv, base, e, le);
      if (!values || !values.length || values[0] === '') continue;
      fields.push({ tag: tag, label: label, values: values });
    }
    return pointers;
  }

  function formatField(f) {
    var v = f.values;
    switch (f.tag) {
      case 0x829A: return v[0] >= 1 ? v[0] + 's' : '1/' + Math.round(1 / v[0]) + 's';
      case 0x829D: return 'f/' + (Math.round(v[0] * 10) / 10);
      case 0x920A: return (Math.round(v[0] * 10) / 10) + ' mm';
      case 0x0112: return String(v[0]);
      default: return String(v[0]);
    }
  }

  function dms(values, ref) {
    var deg = (values[0] || 0) + (values[1] || 0) / 60 + (values[2] || 0) / 3600;
    if (ref === 'S' || ref === 'W') deg = -deg;
    return Math.round(deg * 100000) / 100000;
  }

  // Parse a TIFF/EXIF block; returns {fields, gps, orientation}
  function parseTiff(bytes, tiffOff) {
    var result = { fields: [], gps: null, orientation: null };
    try {
      var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      var le;
      if (dv.getUint16(tiffOff) === 0x4949) le = true;
      else if (dv.getUint16(tiffOff) === 0x4D4D) le = false;
      else return result;
      if (dv.getUint16(tiffOff + 2, le) !== 0x002A) return result;

      var sub = new DataView(bytes.buffer, bytes.byteOffset + tiffOff, bytes.byteLength - tiffOff);
      var ifd0 = sub.getUint32(4, le);
      var pointers = readIfd(sub, 0, ifd0, le, IFD0_TAGS, result.fields);

      if (pointers[0x8769]) readIfd(sub, 0, pointers[0x8769], le, EXIF_TAGS, result.fields);

      if (pointers[0x8825]) {
        var gpsFields = [];
        readIfd(sub, 0, pointers[0x8825], le, { 1: 'latRef', 2: 'lat', 3: 'lonRef', 4: 'lon', 6: 'alt' }, gpsFields);
        var g = {};
        gpsFields.forEach(function (f) { g[f.label] = f.values; });
        if (g.lat && g.lon) {
          result.gps = {
            lat: dms(g.lat, g.latRef && g.latRef[0]),
            lon: dms(g.lon, g.lonRef && g.lonRef[0])
          };
        }
      }

      result.fields.forEach(function (f) {
        if (f.tag === 0x0112) result.orientation = f.values[0];
      });
    } catch (e) { /* truncated or hostile EXIF — show what we got */ }
    return result;
  }

  /* ------------------------------------------------- container scanners */

  function readJpeg(bytes) {
    var meta = { fields: [], extras: [], gps: null, orientation: null };
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var off = 2;
    while (off + 4 <= bytes.length) {
      if (bytes[off] !== 0xFF) break;
      var marker = bytes[off + 1];
      if (marker === 0xFF) { off++; continue; }
      if (marker === 0xDA || marker === 0xD9) break;
      if (marker >= 0xD0 && marker <= 0xD8) { off += 2; continue; }
      var len = dv.getUint16(off + 2);
      if (len < 2 || off + 2 + len > bytes.length) break;

      if (marker === 0xE1 && ascii(bytes, off + 4, 'Exif')) {
        var tiff = parseTiff(bytes, off + 10);
        meta.fields = meta.fields.concat(tiff.fields);
        if (tiff.gps) meta.gps = tiff.gps;
        if (tiff.orientation) meta.orientation = tiff.orientation;
      } else if (marker === 0xE1 && ascii(bytes, off + 4, 'http://ns.adobe.com/xap/')) {
        meta.extras.push('XMP data (' + fmtSize(len) + ')');
      } else if (marker === 0xED) {
        meta.extras.push('IPTC / Photoshop data (' + fmtSize(len) + ')');
      } else if (marker === 0xFE) {
        meta.extras.push('Comment (' + fmtSize(len) + ')');
      } else if (marker === 0xE2 && ascii(bytes, off + 4, 'MPF')) {
        meta.extras.push('Multi-picture data (' + fmtSize(len) + ')');
      }
      off += 2 + len;
    }
    return meta;
  }

  function readPng(bytes) {
    var meta = { fields: [], extras: [], gps: null, orientation: null };
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var off = 8;
    while (off + 12 <= bytes.length) {
      var len = dv.getUint32(off);
      var type = String.fromCharCode(bytes[off + 4], bytes[off + 5], bytes[off + 6], bytes[off + 7]);
      if (off + 12 + len > bytes.length) break;
      if (type === 'tEXt' || type === 'iTXt') {
        var kw = '';
        for (var i = off + 8; i < off + 8 + len && bytes[i] !== 0 && kw.length < 40; i++) {
          kw += String.fromCharCode(bytes[i]);
        }
        meta.extras.push('Text: ' + (kw || 'unnamed') + ' (' + fmtSize(len) + ')');
      } else if (type === 'zTXt') {
        meta.extras.push('Compressed text (' + fmtSize(len) + ')');
      } else if (type === 'tIME') {
        meta.extras.push('Last-modified timestamp');
      } else if (type === 'eXIf') {
        var tiff = parseTiff(bytes, off + 8);
        meta.fields = meta.fields.concat(tiff.fields);
        if (tiff.gps) meta.gps = tiff.gps;
        if (tiff.orientation) meta.orientation = tiff.orientation;
      }
      off += 12 + len;
      if (type === 'IEND') break;
    }
    return meta;
  }

  function readWebp(bytes) {
    var meta = { fields: [], extras: [], gps: null, orientation: null };
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var off = 12;
    while (off + 8 <= bytes.length) {
      var fourcc = String.fromCharCode(bytes[off], bytes[off + 1], bytes[off + 2], bytes[off + 3]);
      var size = dv.getUint32(off + 4, true);
      if (off + 8 + size > bytes.length) break;
      if (fourcc === 'EXIF') {
        var tiffOff = off + 8 + (ascii(bytes, off + 8, 'Exif') ? 6 : 0);
        var tiff = parseTiff(bytes, tiffOff);
        meta.fields = meta.fields.concat(tiff.fields);
        if (tiff.gps) meta.gps = tiff.gps;
        if (tiff.orientation) meta.orientation = tiff.orientation;
      } else if (fourcc === 'XMP ') {
        meta.extras.push('XMP data (' + fmtSize(size) + ')');
      }
      off += 8 + size + (size & 1);
    }
    return meta;
  }

  function fmtSize(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (Math.round(n / 102.4) / 10) + ' KB';
    return (Math.round(n / 104857.6) / 10) + ' MB';
  }

  function read(bytes, kind) {
    try {
      if (kind === 'jpeg') return readJpeg(bytes);
      if (kind === 'png') return readPng(bytes);
      if (kind === 'webp') return readWebp(bytes);
    } catch (e) { /* fall through */ }
    return { fields: [], extras: [], gps: null, orientation: null };
  }

  return { read: read, formatField: formatField, fmtSize: fmtSize };
})();
