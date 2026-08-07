/*
 * UI flow: drop photos -> parse & strip metadata automatically -> download.
 * Everything happens in this page; no file ever leaves the device.
 */
'use strict';

(function () {

  var dropzone = document.getElementById('dropzone');
  var fileInput = document.getElementById('file-input');
  var fileList = document.getElementById('file-list');
  var batchBar = document.getElementById('batch-bar');
  var batchSummary = document.getElementById('batch-summary');
  var downloadAllBtn = document.getElementById('download-all');
  var clearAllBtn = document.getElementById('clear-all');
  var keepOrientation = document.getElementById('keep-orientation');
  var cardTemplate = document.getElementById('file-card-template');
  var liveRegion = document.getElementById('status-live');

  var items = [];
  var nextId = 1;

  var UNSUPPORTED_HINTS = {
    heic: 'HEIC isn’t supported yet. On iPhone: Settings → Camera → Formats → Most Compatible, or share the photo as JPEG first.',
    avif: 'AVIF isn’t supported yet — convert it to JPEG, PNG, or WebP first.',
    generic: 'Unsupported file type. Drop a JPG, PNG, or WebP image.'
  };

  function fmtBytes(n) { return MetaReader.fmtSize(n); }

  function announce(message) { liveRegion.textContent = message; }

  function cleanName(name) {
    var dot = name.lastIndexOf('.');
    return dot > 0 ? name.slice(0, dot) + '-clean' + name.slice(dot) : name + '-clean';
  }

  /* ------------------------------------------------------------ intake */

  function addFiles(fileArray) {
    var files = Array.prototype.slice.call(fileArray).filter(function (f) { return f && f.size > 0; });
    if (!files.length) return;
    files.forEach(function (file) {
      var item = { id: nextId++, file: file, card: buildCard(file.name) };
      items.push(item);
      fileList.appendChild(item.card.root);
      processItem(item);
    });
    updateBatchBar();
  }

  function processItem(item) {
    item.file.arrayBuffer().then(function (buffer) {
      var bytes = new Uint8Array(buffer);
      var kind = Cleaners.detect(bytes);
      if (kind === 'jpeg' || kind === 'png' || kind === 'webp') {
        item.bytes = bytes;
        item.kind = kind;
        item.meta = MetaReader.read(bytes, kind);
        runClean(item);
        item.thumbUrl = URL.createObjectURL(item.file);
        item.card.thumb.src = item.thumbUrl;
        renderResult(item);
        announce(item.file.name + ' cleaned. ' + foundCount(item) + ' metadata items removed.');
      } else {
        renderError(item, UNSUPPORTED_HINTS[kind] || UNSUPPORTED_HINTS.generic);
        announce(item.file.name + ' could not be processed.');
      }
      updateBatchBar();
    }).catch(function () {
      renderError(item, 'Could not read this file. It may be corrupted.');
      updateBatchBar();
    });
  }

  function runClean(item) {
    var keepFlag = keepOrientation.checked;
    var opts = { orientation: keepFlag && item.kind === 'jpeg' ? item.meta.orientation : null };
    item.result = Cleaners.clean(item.bytes, item.kind, opts);
    item.orientationKept = !!(opts.orientation && opts.orientation !== 1);
    if (item.cleanUrl) URL.revokeObjectURL(item.cleanUrl);
    var mime = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[item.kind];
    item.cleanUrl = URL.createObjectURL(new Blob([item.result.bytes], { type: mime }));
  }

  function foundCount(item) {
    var n = item.meta.fields.length + item.meta.extras.length;
    if (item.orientationKept) n = Math.max(0, n - 1);
    return n;
  }

  /* --------------------------------------------------------- rendering */

  function buildCard(name) {
    var fragment = cardTemplate.content.cloneNode(true);
    var card = {
      root: fragment.querySelector('.file-card'),
      thumb: fragment.querySelector('.thumb'),
      name: fragment.querySelector('.file-name'),
      stats: fragment.querySelector('.file-stats'),
      badges: fragment.querySelector('.badges'),
      download: fragment.querySelector('.btn-download'),
      details: fragment.querySelector('.file-details'),
      detailsBody: fragment.querySelector('.details-body')
    };
    card.name.textContent = name;
    card.stats.textContent = 'Processing…';
    return card;
  }

  function badge(text, variant) {
    var el = document.createElement('span');
    el.className = 'badge' + (variant ? ' badge-' + variant : '');
    el.textContent = text;
    return el;
  }

  function renderResult(item) {
    var card = item.card;
    var removedBytes = item.bytes.length - item.result.bytes.length;
    card.stats.textContent = fmtBytes(item.bytes.length) + ' → ' + fmtBytes(item.result.bytes.length) +
      (removedBytes > 0 ? ' (−' + fmtBytes(removedBytes) + ')' : '');

    card.badges.textContent = '';
    var count = foundCount(item);
    if (item.meta.gps) card.badges.appendChild(badge('GPS location removed', 'danger'));
    if (count > 0 || item.result.removed.length > 0) {
      card.badges.appendChild(badge(count > 0 ? count + ' metadata item' + (count === 1 ? '' : 's') + ' removed' : 'Metadata removed', 'ok'));
    } else {
      card.badges.appendChild(badge('Already clean', 'neutral'));
    }
    if (item.orientationKept) card.badges.appendChild(badge('Orientation kept', 'neutral'));

    card.download.href = item.cleanUrl;
    card.download.download = cleanName(item.file.name);
    card.download.hidden = false;

    renderDetails(item);
    card.details.hidden = false;
  }

  function renderDetails(item) {
    var body = item.card.detailsBody;
    body.textContent = '';

    if (item.meta.gps) {
      var gps = document.createElement('p');
      gps.className = 'gps-warning';
      gps.textContent = 'This photo contained your exact location: ' + item.meta.gps.lat + ', ' + item.meta.gps.lon + '. It has been removed.';
      body.appendChild(gps);
    }

    if (item.meta.fields.length) {
      var table = document.createElement('table');
      table.className = 'meta-table';
      item.meta.fields.forEach(function (f) {
        var row = table.insertRow();
        row.insertCell().textContent = f.label;
        row.insertCell().textContent = MetaReader.formatField(f);
      });
      body.appendChild(table);
    }

    if (item.meta.extras.length) {
      var extras = document.createElement('ul');
      extras.className = 'meta-extras';
      item.meta.extras.forEach(function (x) {
        var li = document.createElement('li');
        li.textContent = x;
        extras.appendChild(li);
      });
      body.appendChild(extras);
    }

    if (item.result.removed.length) {
      var removed = document.createElement('p');
      removed.className = 'removed-note';
      removed.textContent = 'Removed: ' + item.result.removed.map(function (r) {
        return r.label + ' (' + fmtBytes(r.size) + ')';
      }).join(', ') + '.';
      body.appendChild(removed);
    }

    if (item.orientationKept) {
      var note = document.createElement('p');
      note.className = 'orientation-note';
      note.textContent = 'A minimal orientation tag was kept so the photo doesn’t display sideways. It contains no personal information.';
      body.appendChild(note);
    }

    if (!item.meta.fields.length && !item.meta.extras.length && !item.result.removed.length) {
      var none = document.createElement('p');
      none.textContent = 'No metadata found — this file was already clean.';
      body.appendChild(none);
    }
  }

  function renderError(item, message) {
    var card = item.card;
    card.root.classList.add('file-card-error');
    card.stats.textContent = message;
    card.badges.textContent = '';
    card.badges.appendChild(badge('Not processed', 'danger'));
    item.error = true;
  }

  /* --------------------------------------------------------- batch bar */

  function cleanedItems() {
    return items.filter(function (item) { return item.result; });
  }

  function updateBatchBar() {
    var done = cleanedItems();
    if (!items.length) { batchBar.hidden = true; return; }
    batchBar.hidden = false;
    var fields = done.reduce(function (sum, item) { return sum + foundCount(item); }, 0);
    batchSummary.textContent = done.length + ' photo' + (done.length === 1 ? '' : 's') + ' cleaned · ' +
      fields + ' metadata item' + (fields === 1 ? '' : 's') + ' removed';
    downloadAllBtn.hidden = done.length < 2;
  }

  downloadAllBtn.addEventListener('click', function () {
    var done = cleanedItems();
    if (!done.length) return;
    var used = {};
    var entries = done.map(function (item) {
      var name = item.file.name;
      if (used[name]) {
        var dot = name.lastIndexOf('.');
        var stem = dot > 0 ? name.slice(0, dot) : name;
        var ext = dot > 0 ? name.slice(dot) : '';
        name = stem + '-' + (used[name]) + ext;
      }
      used[item.file.name] = (used[item.file.name] || 0) + 1;
      return { name: name, bytes: item.result.bytes };
    });
    var url = URL.createObjectURL(ZipWriter.build(entries));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'photos-metadata-removed.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  });

  clearAllBtn.addEventListener('click', function () {
    items.forEach(function (item) {
      if (item.cleanUrl) URL.revokeObjectURL(item.cleanUrl);
      if (item.thumbUrl) URL.revokeObjectURL(item.thumbUrl);
    });
    items = [];
    fileList.textContent = '';
    updateBatchBar();
    announce('All files cleared.');
    dropzone.focus();
  });

  keepOrientation.addEventListener('change', function () {
    items.forEach(function (item) {
      if (!item.result) return;
      runClean(item);
      renderResult(item);
    });
    updateBatchBar();
  });

  /* ------------------------------------------------- drag, drop, paste */

  dropzone.addEventListener('click', function () { fileInput.click(); });
  dropzone.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });
  fileInput.addEventListener('change', function () {
    addFiles(fileInput.files);
    fileInput.value = '';
  });

  ['dragenter', 'dragover'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      e.preventDefault();
      if (type === 'dragleave' && e.relatedTarget) return;
      dropzone.classList.remove('dragover');
    });
  });
  document.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  });

  document.addEventListener('paste', function (e) {
    if (e.clipboardData && e.clipboardData.files.length) addFiles(e.clipboardData.files);
  });

})();
