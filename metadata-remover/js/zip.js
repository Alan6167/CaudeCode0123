/*
 * Minimal ZIP writer (store method, no compression) for batch downloads.
 * Image data is already compressed, so storing is the right choice.
 */
'use strict';

var ZipWriter = (function () {

  var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) {
      c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function dosDateTime(date) {
    var d = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    var t = (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
    return { d: d & 0xFFFF, t: t & 0xFFFF };
  }

  // entries: [{name: string, bytes: Uint8Array}] -> Blob
  function build(entries) {
    var encoder = new TextEncoder();
    var now = dosDateTime(new Date());
    var localParts = [];
    var centralParts = [];
    var offset = 0;

    entries.forEach(function (entry) {
      var nameBytes = encoder.encode(entry.name);
      var crc = crc32(entry.bytes);
      var local = new Uint8Array(30 + nameBytes.length);
      var dv = new DataView(local.buffer);
      dv.setUint32(0, 0x04034B50, true);
      dv.setUint16(4, 20, true);              // version needed
      dv.setUint16(6, 0x0800, true);          // UTF-8 names
      dv.setUint16(8, 0, true);               // store
      dv.setUint16(10, now.t, true);
      dv.setUint16(12, now.d, true);
      dv.setUint32(14, crc, true);
      dv.setUint32(18, entry.bytes.length, true);
      dv.setUint32(22, entry.bytes.length, true);
      dv.setUint16(26, nameBytes.length, true);
      dv.setUint16(28, 0, true);
      local.set(nameBytes, 30);

      var central = new Uint8Array(46 + nameBytes.length);
      var cdv = new DataView(central.buffer);
      cdv.setUint32(0, 0x02014B50, true);
      cdv.setUint16(4, 20, true);
      cdv.setUint16(6, 20, true);
      cdv.setUint16(8, 0x0800, true);
      cdv.setUint16(10, 0, true);
      cdv.setUint16(12, now.t, true);
      cdv.setUint16(14, now.d, true);
      cdv.setUint32(16, crc, true);
      cdv.setUint32(20, entry.bytes.length, true);
      cdv.setUint32(24, entry.bytes.length, true);
      cdv.setUint16(28, nameBytes.length, true);
      cdv.setUint32(42, offset, true);        // local header offset
      central.set(nameBytes, 46);

      localParts.push(local, entry.bytes);
      centralParts.push(central);
      offset += local.length + entry.bytes.length;
    });

    var centralSize = centralParts.reduce(function (sum, p) { return sum + p.length; }, 0);
    var end = new Uint8Array(22);
    var edv = new DataView(end.buffer);
    edv.setUint32(0, 0x06054B50, true);
    edv.setUint16(8, entries.length, true);
    edv.setUint16(10, entries.length, true);
    edv.setUint32(12, centralSize, true);
    edv.setUint32(16, offset, true);

    return new Blob(localParts.concat(centralParts, [end]), { type: 'application/zip' });
  }

  return { build: build };
})();
