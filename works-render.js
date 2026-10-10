/* ============================================================================
   works-render.js — builds the Works category index + case-study detail views
   from window.WORKS_DATA. Replaces the old placeholder grid script.
   Bilingual: every text node gets .en / .zh spans (toggled by the page's
   lang classes). Image placeholders use <image-slot>; video placeholders use
   a static .video-slot the user swaps for a <video>/embed later.
   ========================================================================== */
(function () {
  'use strict';
  function start() {
    var D = window.WORKS_DATA;
    var works = document.getElementById('works');
    if (!D || !works) { return setTimeout(start, 40); }

    // ---- order each category's items newest → oldest (by project date YYYYMM) ----
    var ITEM_DATE = {
      onemorestep: 202601, babel: 202501, primal: 202404, yinyang: 202308, paranoid: 202302, space: 202206,
      dragongate: 202302,
      lightofmylife: 202602,
      rain: 202401, deeptime: 202302, mistake: 202208,
      shatteredjade: 202606, pressx: 202512, fiveelements: 202510, hyperglimpse: 202501
    };
    Object.keys(D.cats).forEach(function (k) {
      if (D.cats[k].fixed) return; // curated order (VR / AR)
      D.cats[k].items.sort(function (a, b) { return (ITEM_DATE[b.id] || 0) - (ITEM_DATE[a.id] || 0); });
    });

    var stack = works.querySelector('.cat-stack');
    var cats = [].slice.call(stack.querySelectorAll('.cat'));
    var detail = works.querySelector('.works-detail');
    var dNum = detail.querySelector('.detail-num');
    var dTitle = detail.querySelector('.detail-title');
    var tocList = detail.querySelector('.toc-list');
    var back = detail.querySelector('.works-back');
    var caseView = works.querySelector('.works-case');
    var caseHost = caseView.querySelector('.case-host');
    var caseBack = caseView.querySelector('.case-back');
    var caseBackCat = caseView.querySelector('.case-back-cat');
    var crumbWorks = caseView.querySelector('.crumb-works');
    var crumbCat = caseView.querySelector('.crumb-cat');
    var crumbCur = caseView.querySelector('.crumb-cur');
    var caseClose = caseView.querySelector('.case-close');
    var caseEnd = caseView.querySelector('.case-end');
    var folderCS = { paper: '', ink: '' };
    var hoverable = !(window.matchMedia && window.matchMedia('(hover:none)').matches);

    /* ---------- tiny DOM helpers ---------- */
    function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
    function bil(en, zh) {
      var f = document.createDocumentFragment();
      var s1 = el('span', 'en'); s1.textContent = en; f.appendChild(s1);
      var s2 = el('span', 'zh'); s2.textContent = zh == null ? en : zh; f.appendChild(s2);
      return f;
    }
    function bilInto(tag, cls, en, zh) { var e = el(tag, cls); e.appendChild(bil(en, zh)); return e; }

    function mediaSlot(kind, id, ratio, label_en, label_zh, src) {
      var frame = el('div', 'media-frame');
      frame.style.aspectRatio = ratio;
      var s = document.createElement(kind === 'video' ? 'video-slot' : 'image-slot');
      s.id = id;
      if (kind !== 'video') s.setAttribute('shape', 'rect');
      if (kind !== 'video' && src) s.setAttribute('src', src);
      s.setAttribute('placeholder', kind === 'video' ? ('Add video · ' + label_zh) : (label_en + ' / ' + label_zh));
      frame.appendChild(s);
      return frame;
    }

    /* ---------- category index ---------- */
    function catKeyOf(elm) {
      var n = +elm.getAttribute('data-cat');
      return D.order[n - 1];
    }
    cats.forEach(function (catEl) {
      var key = catKeyOf(catEl);
      var c = D.cats[key];
      if (!c) return;
      var thumb = catEl.querySelector('.cat-thumb');
      // swap the static "cover" caption for a generative per-category motif
      var oldCover = thumb.querySelector('.cat-cover'); if (oldCover) oldCover.remove();
      var art = document.createElement('div');
      art.className = 'cat-art cat-art-' + key;
      art.setAttribute('aria-hidden', 'true');
      thumb.insertBefore(art, thumb.firstChild);
      // refresh sub-label with count
      var sub = catEl.querySelector('.cat-sub');
      if (sub) { sub.innerHTML = ''; sub.appendChild(bil(c.sub_en + ' · ' + c.items.length, c.sub_zh + ' · ' + c.items.length)); }
    });

    /* ---------- case study ---------- */
    function buildCase(key, item, i, total) {
      if (item.id === 'shatteredjade' && window.renderShatteredJade) { return window.renderShatteredJade(item); }
      if (item.id === 'onemorestep' && window.renderOneMoreStep) { return window.renderOneMoreStep(item); }
      if (item.id === 'space' && window.renderSpace) { return window.renderSpace(item); }
      if (item.id === 'babel' && window.renderBabel) { return window.renderBabel(item); }
      if (item.id === 'hyperglimpse' && window.renderHyperGlimpse) { return window.renderHyperGlimpse(item); }
      if (item.id === 'primal' && window.renderPrimal) { return window.renderPrimal(item); }      if (item.id === 'yinyang' && window.renderYinYang) { return window.renderYinYang(item); }
      if (item.id === 'paranoid' && window.renderParanoid) { return window.renderParanoid(item); }
      if (item.id === 'rain' && window.renderRain) { return window.renderRain(item); }
      if (item.id === 'deeptime' && window.renderDeepTime) { return window.renderDeepTime(item); }
      if (item.id === 'dragongate' && window.renderDragonGate) { return window.renderDragonGate(item); }
      if (item.id === 'lightofmylife' && window.renderLightOfMyLife) { return window.renderLightOfMyLife(item); }
      var art = el('article', 'case' + (item.kind === 'research' ? ' is-research' : ''));
      art.id = 'case-' + key + '-' + item.id;
      art.setAttribute('data-screen-label', item.title);

      var head = el('div', 'case-head');
      var num = el('div', 'case-num');
      num.textContent = ('0' + (i + 1)).slice(-2) + ' / ' + ('0' + total).slice(-2);
      if (item.kind === 'research') { var rb = el('span', 'case-badge'); rb.appendChild(bil(item.wip ? 'Research · in progress' : 'Research', item.wip ? '研究 · 进行中' : '研究')); num.appendChild(rb); }
      head.appendChild(num);
      var title = el('h3', 'case-title'); title.textContent = item.title; head.appendChild(title);
      head.appendChild(bilInto('p', 'case-tag', item.tag_en, item.tag_zh));
      art.appendChild(head);

      var info = el('div', 'case-info');
      var meta = el('div', 'case-meta');
      item.meta.forEach(function (m) {
        var row = el('div', 'meta-row');
        row.appendChild(bilInto('span', 'mk', m.k_en, m.k_zh));
        row.appendChild(bilInto('span', 'mv', m.v_en, m.v_zh));
        meta.appendChild(row);
      });
      info.appendChild(meta);
      var tech = el('div', 'case-tech');
      (item.tech || []).forEach(function (t) { var tag = el('span', 'tg'); tag.textContent = t; tech.appendChild(tag); });
      info.appendChild(tech);
      art.appendChild(info);

      // cover
      var cover = el('div', 'case-cover');
      cover.appendChild(mediaSlot(item.cover, 'm-' + key + '-' + item.id + '-cover', '16 / 9', 'cover', '封面', item.cover_src));
      art.appendChild(cover);

      // playable build link
      if (item.play) {
        var pa = el('a', 'case-play');
        pa.href = item.play; pa.target = '_blank'; pa.rel = 'noopener';
        pa.appendChild(bilInto('span', 'cp-label', item.play_label_en || 'Play the build', item.play_label_zh || '在线试玩'));
        var parr = el('span', 'cp-arr'); parr.textContent = '\u2197'; pa.appendChild(parr);
        art.appendChild(pa);
      }

      // research question
      if (item.q_en) {
        var q = el('blockquote', 'case-q');
        q.appendChild(bilInto('span', 'q-label', 'Research question', '研究问题'));
        q.appendChild(bilInto('p', 'q-text', item.q_en, item.q_zh));
        art.appendChild(q);
      }

      art.appendChild(bilInto('p', 'case-overview', item.overview_en, item.overview_zh));

      // implementations
      var impls = el('div', 'case-impls');
      (item.impl || []).forEach(function (im, n) {
        var row = el('div', 'impl' + (im.media ? ' has-media' : ''));
        var txt = el('div', 'impl-text');
        txt.appendChild(bilInto('h4', 'impl-h', im.h_en, im.h_zh));
        txt.appendChild(bilInto('p', 'impl-b', im.b_en, im.b_zh));
        row.appendChild(txt);
        if (im.media) {
          var md = el('div', 'impl-media');
          md.appendChild(mediaSlot(im.media, 'm-' + key + '-' + item.id + '-i' + n, '4 / 3',
            im.media === 'video' ? 'clip' : 'still', im.media === 'video' ? '片段' : '图', im.src));
          row.appendChild(md);
        }
        impls.appendChild(row);
      });
      art.appendChild(impls);

      // reflection
      var ref = el('div', 'case-reflect');
      ref.appendChild(bilInto('span', 'reflect-label', item.kind === 'research' ? 'Critical reflection' : 'Reflection', item.kind === 'research' ? '批判性反思' : '反思'));
      ref.appendChild(bilInto('p', 'reflect-text', item.reflect_en, item.reflect_zh));
      art.appendChild(ref);

      return art;
    }

    /* ---------- TOC row (project index) ---------- */
    function yearOf(item) {
      var m = (item.meta || []).filter(function (x) { return /timeline|year/i.test(x.k_en); })[0];
      if (!m) return '';
      var yy = (m.v_en || '').match(/\d{4}/g);
      if (!yy) return m.v_en || '';
      return yy.length > 1 ? yy[0] + '\u2013' + yy[yy.length - 1] : yy[0];
    }
    function coverSlot(key, item) {
      var s = document.createElement('image-slot');
      s.id = 'toc-' + (item.home || key) + '-' + item.id;
      s.setAttribute('shape', 'rect');
      s.setAttribute('placeholder', 'Cover / \u5c01\u9762');
      if (item.cover_src) s.setAttribute('src', item.cover_src);
      return s;
    }
    function buildTocRow(key, item, i, total) {
      var row = el('div', 'toc-row');
      row.setAttribute('role', 'button'); row.tabIndex = 0;
      row.setAttribute('data-screen-label', item.title);

      var main = el('div', 'toc-main');
      var idx = el('span', 'toc-idx'); idx.textContent = ('0' + (i + 1)).slice(-2); main.appendChild(idx);
      var body = el('div', 'toc-body');
      var title = el('h3', 'toc-title'); title.textContent = item.title; body.appendChild(title);
      var tag = el('div', 'toc-tag');
      var yr = yearOf(item);
      if (yr) { var ty = el('span', 'ty'); ty.textContent = yr; tag.appendChild(ty); }
      if (item.kind === 'research') { var bd = el('span', 'toc-badge'); bd.appendChild(bil(item.wip ? 'Research \u00b7 WIP' : 'Research', item.wip ? '\u7814\u7a76 \u00b7 \u8fdb\u884c\u4e2d' : '\u7814\u7a76')); tag.appendChild(bd); }
      var sub = el('span'); sub.appendChild(bil(item.tag_en, item.tag_zh)); tag.appendChild(sub);
      body.appendChild(tag);
      if (item.explores_en) body.appendChild(bilInto('p', 'toc-explores', item.explores_en, item.explores_zh));
      if (item.stack && item.stack.length) {
        var st = el('div', 'toc-stack');
        item.stack.forEach(function (s) { var chip = el('span', 'ts'); chip.appendChild(bil(s.en, s.zh)); st.appendChild(chip); });
        body.appendChild(st);
      }
      var view = el('div', 'toc-view'); view.appendChild(bil('View project', '\u67e5\u770b\u9879\u76ee'));
      var varr = el('span', 'varr'); varr.textContent = '\u2197'; view.appendChild(varr);
      body.appendChild(view);
      main.appendChild(body);
      row.appendChild(main);

      var prev = el('div', 'toc-preview');
      prev.appendChild(coverSlot(key, item));
      row.appendChild(prev);

      row.addEventListener('click', function () { openCase(key, item, i, total); });
      row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(key, item, i, total); } });
      return row;
    }

    /* ---------- views ---------- */
    function openDetail(catEl, noPush) {
      var key = catKeyOf(catEl);
      var c = D.cats[key]; if (!c) return;
      dNum.textContent = c.num + ' \u00b7 ' + c.items.length;
      dTitle.innerHTML = ''; dTitle.appendChild(bil(c.en, c.zh));
      var cs = getComputedStyle(catEl);
      folderCS.paper = cs.backgroundColor; folderCS.ink = cs.color;
      var folder = detail.querySelector('.detail-folder');
      folder.style.setProperty('--paper', folderCS.paper);
      folder.style.setProperty('--ink', folderCS.ink);
      tocList.innerHTML = '';
      c.items.forEach(function (item, i) { tocList.appendChild(buildTocRow(key, item, i, c.items.length)); });
      works.classList.remove('case-open');
      works.classList.add('toc-open');
      detail.setAttribute('aria-hidden', 'false');
      caseView.setAttribute('aria-hidden', 'true');
      works.scrollTop = 0;
      setActive(null);
      if (!noPush) pushState({ w: 'toc', k: key, d: 1 });
    }
    function openCase(key, item, i, total, noPush) {
      var c = D.cats[key];
      caseHost.innerHTML = '';
      caseHost.appendChild(buildCase(key, item, i, total));
      caseBackCat.innerHTML = ''; caseBackCat.appendChild(bil(c.en, c.zh));
      crumbCat.innerHTML = ''; crumbCat.appendChild(bil(c.en, c.zh));
      crumbCur.textContent = item.title;
      buildEnd(key, i, total);
      var folder = caseView.querySelector('.detail-folder');
      folder.style.setProperty('--paper', folderCS.paper);
      folder.style.setProperty('--ink', folderCS.ink);
      works.classList.add('case-open');
      caseView.setAttribute('aria-hidden', 'false');
      works.scrollTop = 0;
      if (!noPush) {
        var st = { w: 'case', k: key, i: i, d: 2 };
        if (history.state && history.state.w === 'case') { try { history.replaceState(st, ''); } catch (e) {} } else pushState(st);
      }
    }
    /* end-of-project navigation: back to the folder, all works, next / previous */
    function buildEnd(key, i, total) {
      var c = D.cats[key], items = c.items;
      caseEnd.innerHTML = '';
      var row = el('div', 'ce-row');
      var bk = el('button', 'case-back'); bk.type = 'button';
      var ar = el('span', 'ar'); ar.setAttribute('aria-hidden', 'true'); ar.textContent = '\u2190'; bk.appendChild(ar);
      var lbl = el('span', 'cb-l'); lbl.appendChild(bil('Back to', '\u8fd4\u56de')); lbl.appendChild(document.createTextNode('\u00a0'));
      var cc = el('span', 'case-back-cat'); cc.appendChild(bil(c.en, c.zh)); lbl.appendChild(cc); bk.appendChild(lbl);
      bk.addEventListener('click', backToToc); row.appendChild(bk);
      var all = el('button', 'ce-all'); all.type = 'button'; all.appendChild(bil('All works', '\u6240\u6709\u4f5c\u54c1')); all.addEventListener('click', backToAll); row.appendChild(all);
      caseEnd.appendChild(row);
      function col(k_en, k_zh, it, idx, prev) {
        var d = el('div');
        var k = el('span', 'ce-k'); k.appendChild(bil(k_en + ' \u00b7 ' + ('0' + (idx + 1)).slice(-2) + ' / ' + ('0' + total).slice(-2), k_zh + ' \u00b7 ' + ('0' + (idx + 1)).slice(-2) + ' / ' + ('0' + total).slice(-2))); d.appendChild(k);
        var b = el('button', 'ce-link' + (prev ? ' is-prev' : '')); b.type = 'button';
        var a = el('span', 'arr'); a.setAttribute('aria-hidden', 'true'); a.textContent = prev ? '\u2190' : '\u2192';
        if (prev) b.appendChild(a); b.appendChild(document.createTextNode(it.title)); if (!prev) b.appendChild(a);
        b.addEventListener('click', function () { openCase(key, it, idx, total); });
        d.appendChild(b);
        var s = el('span', 'ce-sub'); s.appendChild(bil(it.tag_en, it.tag_zh)); d.appendChild(s);
        return d;
      }
      if (items[i + 1]) caseEnd.appendChild(col('Next project', '\u4e0b\u4e00\u4e2a\u9879\u76ee', items[i + 1], i + 1, false));
      if (items[i - 1]) caseEnd.appendChild(col('Previous project', '\u4e0a\u4e00\u4e2a\u9879\u76ee', items[i - 1], i - 1, true));
    }
    /* history: browser / phone Back returns to the folder, then to all works */
    function pushState(st) { try { history.pushState(st, ''); } catch (e) {} }
    function backToToc() { var s = history.state; if (s && s.w === 'case') history.back(); else closeCase(); }
    function backToAll() { var s = history.state; if (s && s.w === 'case') history.go(-2); else if (s && s.w === 'toc') history.back(); else closeDetail(); }
    window.addEventListener('popstate', function (e) {
      var s = e.state;
      if (!s || !s.w) { closeDetail(); return; }
      var ci = D.order.indexOf(s.k); if (ci < 0) { closeDetail(); return; }
      if (s.w === 'toc') { openDetail(cats[ci], true); return; }
      var items = D.cats[s.k].items, it = items[s.i];
      if (!it) { closeDetail(); return; }
      openDetail(cats[ci], true); openCase(s.k, it, s.i, items.length, true);
    });
    try { if (history.state && history.state.w) history.replaceState(null, ''); } catch (e) {}
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (works.classList.contains('case-open')) backToToc();
      else if (works.classList.contains('toc-open')) backToAll();
    });
    function closeCase() {
      works.classList.remove('case-open');
      caseView.setAttribute('aria-hidden', 'true');
      works.scrollTop = 0;
    }
    function closeDetail() {
      works.classList.remove('toc-open');
      works.classList.remove('case-open');
      detail.setAttribute('aria-hidden', 'true');
      caseView.setAttribute('aria-hidden', 'true');
      works.scrollTop = 0;
    }

    function setActive(cat) {
      stack.classList.toggle('has-active', !!cat);
      cats.forEach(function (c) { c.classList.toggle('is-active', c === cat); });
    }

    cats.forEach(function (c) {
      c.addEventListener('pointerenter', function () { if (hoverable) setActive(c); });
      c.addEventListener('click', function () { openDetail(c); });
      c.addEventListener('focus', function () { setActive(c); });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(c); }
      });
    });
    stack.addEventListener('pointerleave', function () { if (hoverable) setActive(null); });
    back.addEventListener('click', backToAll);
    caseBack.addEventListener('click', backToToc);
    caseClose.addEventListener('click', backToAll);
    crumbWorks.addEventListener('click', backToAll);
    crumbCat.addEventListener('click', backToToc);
    document.querySelectorAll('[data-go="2"]').forEach(function (a) { a.addEventListener('click', closeDetail); });

    window.WORKS = { open: function (k) { var i = D.order.indexOf(k); if (i >= 0) openDetail(cats[i]); }, close: closeDetail };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
