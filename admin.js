/* Shoreline Realty  - staff admin peek + listings store (concept demo).
   Listings persist to localStorage; the public grid renders from the same store. */
(function () {
  "use strict";
  var d = document;

  var SEED_LISTINGS = [
    { id: "l1", price: 1289000, address: "Sample: 12 Lighthouse Lane, Port Credit", desc: "Detached home",
      hood: "port-credit", hoodLabel: "Port Credit", types: ["house"], status: "sale",
      img: "listing-home.jpg", sample: true, beds: 4, baths: 3, sqft: 2100 },
    { id: "l2", price: 749000, address: "Sample: 88 Lakeview Ave, Unit 1204", desc: "Condo",
      hood: "lakeview", hoodLabel: "Lakeview", types: ["condo"], status: "sale",
      img: "listing-condo.jpg", sample: true, beds: 2, baths: 2, sqft: 980 },
    { id: "l3", price: 989000, address: "Sample: 45 Clarkson Rd", desc: "Bungalow",
      hood: "clarkson", hoodLabel: "Clarkson", types: ["bungalow"], status: "sold",
      img: "listing-bungalow.jpg", sample: true, beds: 3, baths: 2, sqft: 1450 }
  ];

  var SEED_LEADS = [
    { id: "q1", name: "Sarah Mitchell", contact: "(905) 555-0147", address: "22 Port Credit Rd, Mississauga",
      detail: "Detached · 2,100 sq ft", range: "$1,050,000 – $1,220,000 CAD", date: "2026-10-11", done: false },
    { id: "q2", name: "Jean Tremblay", contact: "jean.t@example.ca", address: "410 Lakeshore Rd W, Oakville",
      detail: "Townhouse · 1,600 sq ft", range: "$880,000 – $1,020,000 CAD", date: "2026-10-10", done: false },
    { id: "q3", name: "David Chen", contact: "(416) 555-0198", address: "77 Erindale Dr, Mississauga",
      detail: "Semi-detached · 1,750 sq ft", range: "$940,000 – $1,090,000 CAD", date: "2026-10-08", done: true }
  ];

  var IMAGES = ["listing-home.jpg", "listing-condo.jpg", "listing-bungalow.jpg", "hero.jpg"];

  function load(key, seed) {
    try {
      var raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(seed));
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  var store = {
    get listings() { return load("shoreline_listings", SEED_LISTINGS); },
    set listings(v) { save("shoreline_listings", v); },
    get leads() { return load("shoreline_leads", SEED_LEADS); },
    set leads(v) { save("shoreline_leads", v); }
  };

  function fmt(n) { return "$" + Number(n).toLocaleString("en-CA"); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- public grid ---------- */
  var SVG_BED = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" stroke-width="1.8" stroke-linecap="round"/><path d="M3 18h18M5 10V6h14v4" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var SVG_BATH = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2z" stroke-width="1.8" stroke-linecap="round"/><path d="M6 19l-1 2M18 19l1 2M8 12V5a2 2 0 0 1 4 0" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var SVG_AREA = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h16v16H4z" stroke-width="1.8" stroke-linejoin="round"/><path d="M4 9h5V4M20 15h-5v5" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function cardHTML(l) {
    var badge = l.status === "sale"
      ? '<span class="x-badge x-badge--sale">For Sale</span>'
      : '<span class="x-badge">Sold</span>';
    var sample = l.sample ? '<span class="x-badge x-badge--sample">Sample listing</span>' : "";
    var meta = "";
    if (l.beds || l.baths || l.sqft) {
      meta = '<div class="x-card__meta">';
      if (l.beds) meta += "<span>" + SVG_BED + esc(l.beds) + " bd</span>";
      if (l.baths) meta += "<span>" + SVG_BATH + esc(l.baths) + " ba</span>";
      if (l.sqft) meta += "<span>" + SVG_AREA + esc(Number(l.sqft).toLocaleString("en-CA")) + " sqft</span>";
      meta += "</div>";
    }
    return '<article class="x-card is-in" data-types="' + esc(l.types.join(" ")) + '" data-status="' + esc(l.status) + '">' +
      '<figure class="x-card__media"><img src="' + esc(l.img) + '" alt="' + esc(l.desc + " at " + l.address) + '" loading="lazy" />' + badge + sample + "</figure>" +
      '<div class="x-card__body">' +
      '<p class="x-card__price">' + fmt(l.price) + "</p>" +
      "<h3>" + esc(l.address) + "</h3>" +
      meta +
      '<span class="x-card__hood">' + esc(l.hoodLabel) + "</span>" +
      "</div></article>";
  }

  function renderGrid() {
    var grid = d.getElementById("x-cards");
    if (!grid) return;
    grid.innerHTML = store.listings.map(cardHTML).join("");
    if (window.__shorelineCount) window.__shorelineCount();
  }
  window.__shorelineRenderGrid = renderGrid;

  /* ---------- admin ---------- */
  var LOGGED = "shoreline_admin";

  function isLogged() {
    try { return sessionStorage.getItem(LOGGED) === "1"; } catch (e) { return false; }
  }

  function showView(name) {
    d.querySelectorAll("#adm-dash [data-view]").forEach(function (v) {
      v.hidden = v.getAttribute("data-view") !== name;
    });
    d.querySelectorAll(".adm-nav button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-go") === name);
    });
    if (name === "overview") renderOverview();
    if (name === "listings") renderTable();
    if (name === "leads") renderLeads();
  }

  function renderOverview() {
    var ls = store.listings, leads = store.leads;
    var active = ls.filter(function (l) { return l.status === "sale"; }).length;
    var fresh = leads.filter(function (l) { return !l.done; }).length;
    var vol = ls.reduce(function (s, l) { return s + (+l.price || 0); }, 0);
    d.getElementById("adm-stat-active").textContent = active;
    d.getElementById("adm-stat-leads").textContent = fresh;
    d.getElementById("adm-stat-vol").textContent = fmt(vol);
    d.getElementById("adm-stat-total").textContent = ls.length;
  }

  function renderTable() {
    var tb = d.getElementById("adm-rows");
    var ls = store.listings;
    tb.innerHTML = ls.map(function (l) {
      return '<tr><td><img src="' + esc(l.img) + '" alt="" /></td>' +
        "<td><b>" + fmt(l.price) + '</b><br /><span class="adm-dim">' + esc(l.address) + "</span></td>" +
        "<td>" + esc(l.desc) + "</td>" +
        "<td>" + esc(l.hoodLabel) + "</td>" +
        '<td><span class="adm-pill ' + (l.status === "sale" ? "adm-pill--sale" : "") + '">' +
          (l.status === "sale" ? "For Sale" : "Sold") + "</span></td>" +
        '<td class="adm-actions"><button type="button" data-edit="' + l.id + '">Edit</button>' +
        '<button type="button" data-del="' + l.id + '" class="adm-danger">Delete</button></td></tr>';
    }).join("") || '<tr><td colspan="6" class="adm-dim">No listings yet. Add your first one above.</td></tr>';
  }

  function renderLeads() {
    var tb = d.getElementById("adm-leads");
    var leads = store.leads;
    tb.innerHTML = leads.map(function (l) {
      return '<tr class="' + (l.done ? "adm-done" : "") + '">' +
        "<td><b>" + esc(l.name) + '</b><br /><span class="adm-dim">' + esc(l.contact) + "</span></td>" +
        "<td>" + esc(l.address) + '<br /><span class="adm-dim">' + esc(l.detail) + "</span></td>" +
        "<td>" + esc(l.range) + "</td><td>" + esc(l.date) + "</td>" +
        '<td><button type="button" data-toggle="' + l.id + '">' + (l.done ? "Reopen" : "Mark contacted") + "</button></td></tr>";
    }).join("");
  }

  function openForm(l) {
    var f = d.getElementById("adm-form");
    f.hidden = false;
    d.getElementById("adm-f-id").value = l ? l.id : "";
    d.getElementById("adm-f-price").value = l ? l.price : "";
    d.getElementById("adm-f-address").value = l ? l.address : "";
    d.getElementById("adm-f-desc").value = l ? l.desc : "";
    d.getElementById("adm-f-hood").value = l ? l.hood : "port-credit";
    d.getElementById("adm-f-status").value = l ? l.status : "sale";
    d.getElementById("adm-f-img").value = l ? l.img : IMAGES[0];
    d.getElementById("adm-f-beds").value = l && l.beds ? l.beds : "";
    d.getElementById("adm-f-baths").value = l && l.baths ? l.baths : "";
    d.getElementById("adm-f-sqft").value = l && l.sqft ? l.sqft : "";
    d.querySelectorAll("#adm-form input[name=types]").forEach(function (cb) {
      cb.checked = l ? l.types.indexOf(cb.value) >= 0 : false;
    });
    d.getElementById("adm-form-title").textContent = l ? "Edit listing" : "Add listing";
    f.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hoodLabel(v) {
    var sel = d.getElementById("adm-f-hood");
    var opt = sel ? sel.querySelector('option[value="' + v + '"]') : null;
    return opt ? opt.textContent : v;
  }

  function initAdmin() {
    var login = d.getElementById("adm-login");
    var dash = d.getElementById("adm-dash");
    if (!login || !dash) return;

    function refresh() {
      var on = isLogged();
      login.hidden = on;
      dash.hidden = !on;
      if (on) showView("overview");
    }

    var lf = d.getElementById("adm-loginform");
    if (lf) lf.addEventListener("submit", function (e) {
      e.preventDefault();
      var em = d.getElementById("adm-email").value.trim();
      var pw = d.getElementById("adm-pass").value;
      var err = d.getElementById("adm-err");
      if (em === "demo@shorelinerealty.ca" && pw === "shoreline123") {
        try { sessionStorage.setItem(LOGGED, "1"); } catch (e2) {}
        err.hidden = true;
        refresh();
      } else {
        err.hidden = false;
      }
    });

    d.querySelectorAll(".adm-nav button[data-go]").forEach(function (b) {
      b.addEventListener("click", function () { showView(b.getAttribute("data-go")); });
    });
    var out = d.getElementById("adm-logout");
    if (out) out.addEventListener("click", function () {
      try { sessionStorage.removeItem(LOGGED); } catch (e) {}
      refresh();
    });

    d.getElementById("adm-add").addEventListener("click", function () { openForm(null); });
    d.getElementById("adm-cancel").addEventListener("click", function () {
      d.getElementById("adm-form").hidden = true;
    });

    d.getElementById("adm-rows").addEventListener("click", function (e) {
      var t = e.target;
      var ls = store.listings;
      if (t.hasAttribute("data-del")) {
        if (!confirm("Delete this listing?")) return;
        store.listings = ls.filter(function (l) { return l.id !== t.getAttribute("data-del"); });
        renderTable(); renderGrid();
      } else if (t.hasAttribute("data-edit")) {
        var found = ls.filter(function (x) { return x.id === t.getAttribute("data-edit"); })[0];
        if (found) openForm(found);
      }
    });

    d.getElementById("adm-leads").addEventListener("click", function (e) {
      var t = e.target;
      if (!t.hasAttribute("data-toggle")) return;
      var leads = store.leads;
      leads.forEach(function (l) {
        if (l.id === t.getAttribute("data-toggle")) l.done = !l.done;
      });
      store.leads = leads;
      renderLeads();
    });

    d.getElementById("adm-save").addEventListener("click", function () {
      var id = d.getElementById("adm-f-id").value;
      var types = [];
      d.querySelectorAll("#adm-form input[name=types]:checked").forEach(function (cb) { types.push(cb.value); });
      var l = {
        id: id || "l" + Date.now(),
        price: parseInt((d.getElementById("adm-f-price").value || "").replace(/[^0-9]/g, ""), 10) || 0,
        address: d.getElementById("adm-f-address").value.trim(),
        desc: d.getElementById("adm-f-desc").value.trim(),
        hood: d.getElementById("adm-f-hood").value,
        hoodLabel: hoodLabel(d.getElementById("adm-f-hood").value),
        types: types.length ? types : ["house"],
        status: d.getElementById("adm-f-status").value,
        img: d.getElementById("adm-f-img").value,
        sample: false,
        beds: parseInt(d.getElementById("adm-f-beds").value, 10) || 0,
        baths: parseInt(d.getElementById("adm-f-baths").value, 10) || 0,
        sqft: parseInt((d.getElementById("adm-f-sqft").value || "").replace(/[^0-9]/g, ""), 10) || 0
      };
      if (!l.address || !l.price) { alert("Address and price are required."); return; }
      var ls = store.listings;
      var ix = -1;
      ls.forEach(function (x, i) { if (x.id === l.id) ix = i; });
      if (ix >= 0) ls[ix] = l; else ls.unshift(l);
      store.listings = ls;
      d.getElementById("adm-form").hidden = true;
      renderTable(); renderGrid();
    });

    var rs = d.getElementById("adm-reset");
    if (rs) rs.addEventListener("click", function () {
      try { localStorage.removeItem("shoreline_listings"); localStorage.removeItem("shoreline_leads"); } catch (e) {}
      renderTable(); renderLeads(); renderGrid(); showView("overview");
    });

    refresh();
  }

  function boot() {
    renderGrid();
    initAdmin();
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
