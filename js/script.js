/* =========================================================
   ICSTSDG 2027 website – vanilla JavaScript
   Sections: 1 Config & data | 2 Helpers | 3 Renderers |
             4 Interactions | 5 Network canvas | 6 Init
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. CONFIG & DATA
     Change the dates here (and in index.html) only after the
     organisers have officially confirmed a new edition.
     --------------------------------------------------------- */
  var CONFIG = {
    conferenceStart: "2027-08-04",
    conferenceEnd: "2027-08-06",
    contactEmail: "ieeeicstsdg2027@saec.ac.in",
    // Paste the Microsoft CMT submission link for the 3rd edition between the quotes
    // once the organisers publish it (for example "https://cmt3.research.microsoft.com/...").
    // While empty, the submit buttons scroll to the Call for Papers section instead.
    submissionUrl: ""
  };

  var ICONS = {
    cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
    city: '<path d="M3 21V9l6-3v15M9 21V4l8 3v14M17 21V11l4 2v8M3 21h18"/>',
    leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c2-5 5-8 9-10"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'
  };

  var TRACKS = [
    { title: "Emerging Technologies and Computational Intelligence", icon: "cpu", topics: [
      "Agent-Based Systems and Architectures",
      "Machine Learning and Deep Learning Tools",
      "Big Data Analytics and Processing",
      "High Performance Computing and Engineering Applications",
      "Cloud Computing, Edge, and Fog Computing" ] },
    { title: "Internet of Things (IoT), Networking and Cyber-Physical Systems", icon: "wifi", topics: [
      "Internet of Things (IoT) and Applications",
      "Networking, 5G/6G Communications",
      "Industrial IoT and Real-Time Monitoring",
      "Energy Efficiency in Embedded and Cyber-Physical Systems",
      "Digital Twins and Industrial IoT Applications" ] },
    { title: "Smart Systems and Infrastructure", icon: "city", topics: [
      "Smart Transportation and Traffic Management Systems",
      "Smart Healthcare and Assistive Technologies",
      "Smart Homes and Embedded Automation",
      "Autonomous and Intelligent Vehicle Technologies" ] },
    { title: "Green and Sustainable Technologies", icon: "leaf", topics: [
      "Green IT Infrastructure and Energy Optimization",
      "Innovation in Renewable and Green Technologies",
      "Green Computing and Electronic Waste Management",
      "Low-Power VLSI Design and Sustainable Electronics",
      "Sustainable Embedded Systems and Power Management" ] },
    { title: "Industry 4.0 and Advanced Manufacturing", icon: "gear", topics: [
      "Industrial Automation and Smart Manufacturing",
      "Predictive Maintenance using AI and ML",
      "Additive Manufacturing (3D Printing) Technologies",
      "Robotics in Assembly, Inspection, and Logistics",
      "Robotics and Intelligent Control Systems" ] },
    { title: "Security, Signal Processing and Simulation", icon: "shield", topics: [
      "Cybersecurity in Smart Systems and Embedded Devices",
      "Blockchain for Secure Engineering Systems",
      "Digital Signal and Image Processing",
      "Hardware Security and Trusted Computing",
      "Real-Time Operating Systems and Simulation Modeling" ] }
  ];

  // Official SDG colours and goal statements; links go to the UN goal pages.
  var SDGS = [
    ["No Poverty", "#E5243B", "End poverty in all its forms everywhere."],
    ["Zero Hunger", "#DDA63A", "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture."],
    ["Good Health and Well-being", "#4C9F38", "Ensure healthy lives and promote well-being for all at all ages."],
    ["Quality Education", "#C5192D", "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."],
    ["Gender Equality", "#FF3A21", "Achieve gender equality and empower all women and girls."],
    ["Clean Water and Sanitation", "#26BDE2", "Ensure availability and sustainable management of water and sanitation for all."],
    ["Affordable and Clean Energy", "#FCC30B", "Ensure access to affordable, reliable, sustainable and modern energy for all."],
    ["Decent Work and Economic Growth", "#A21942", "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all."],
    ["Industry, Innovation and Infrastructure", "#FD6925", "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation."],
    ["Reduced Inequalities", "#DD1367", "Reduce inequality within and among countries."],
    ["Sustainable Cities and Communities", "#FD9D24", "Make cities and human settlements inclusive, safe, resilient and sustainable."],
    ["Responsible Consumption and Production", "#BF8B2E", "Ensure sustainable consumption and production patterns."],
    ["Climate Action", "#3F7E44", "Take urgent action to combat climate change and its impacts."],
    ["Life Below Water", "#0A97D9", "Conserve and sustainably use the oceans, seas and marine resources for sustainable development."],
    ["Life on Land", "#56C02B", "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, halt and reverse land degradation and halt biodiversity loss."],
    ["Peace, Justice and Strong Institutions", "#00689D", "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels."],
    ["Partnerships for the Goals", "#19486A", "Strengthen the means of implementation and revitalize the global partnership for sustainable development."]
  ];

  // Committee as shown in the conference brochure. Entry = [name, role].
  var TRUST = "Dharma Naidu Educational & Charitable Trust";
  var FOUNDER = ["Thiru. D. Sudharssanam", "Founder Chairman"];
  var TRUSTEES = [
    ["Thiru. D. Duraiswamy", "Chairman"],
    ["Thiru. D. Paranthaman", "Vice Chairman"],
    ["Thiru. D. Dhasarathan", "Secretary"],
    ["Thiru. S. Amarnath", "Treasurer & Correspondent"],
    ["Thiru. S. Gopinath", "Joint Secretary"],
    ["Tmt. D. Saraswathi", "Director, Sudharsanam Vidyaashram"],
    ["Dr. S. Aravind", "Director, S.A. College of Arts & Science"],
    ["Thiru. D. Sabarinath", "Director, S.A. Engineering College"],
    ["Thiru. P. Venkatesh Raja", "Correspondent, S.A. College of Arts & Science and Sudharsanam Vidyaashram"]
  ];
  var LEADERS = [
    [
      { title: "Chief Patron", people: [["Dr. S. Ramachandran", "Principal, S.A. Engineering College (Autonomous), Chennai"]] },
      { title: "Patrons", people: [["Dr. P. Sakthivel", "Chairman – IEEE Madras Section, Immediate Past Chairman, IEEE CS Madras and IEEE CASS Madras"]] }
    ],
    [
      { people: [["Mr. H. R. Mohan", "Chairman – Events and Past Chair, IEEE CS Madras & Past President, CSI, India & Past Vice Chairman, IEEE Madras Section"]] },
      { people: [["Dr. E. Kannan", "Chairman – IEEE PCS Madras"]] },
      { people: [["Dr. S. Koteeswaran", "Chairman – SAC IEEE Madras Section and IEEE CS Madras"]] }
    ],
    [
      { people: [["Dr. P. Kalpana Devi", "Chairman – IEEE CASS Madras"]] },
      { title: "Conference Chair", people: [["Dr. M. Nalini", "HoD, CSE (Cyber Security), S.A. Engineering College (Autonomous), Chennai"]] }
    ]
  ];
  var GENERAL_CHAIRS = [
    ["Dr. D. Hemanand", "HoD, AI & DS, SAEC"],
    ["Dr. M. Anuradha", "HoD, CSE, SAEC"],
    ["Prof. C. Dhanesh", "HoD, MECH, SAEC"],
    ["Dr. R. Ganesan", "HoD, Physics, SAEC"],
    ["Dr. M. Geetha", "HoD, CSE (AIML), SAEC"],
    ["Dr. B. R. Tapas Bapu", "HoD, ECE, SAEC"],
    ["Dr. R. Hariharasuthan", "HoD, Chemistry, SAEC"],
    ["Dr. R. Radhika", "HoD, VLSI, SAEC"],
    ["Dr. P. Priya Rachel", "HoD, CIVIL, SAEC"],
    ["Dr. G. Muralikrishnan", "HoD, EEE, SAEC"],
    ["Dr. S. Sangeethapriya", "HoD, English, SAEC"],
    ["Dr. V. Rohini", "HoD, MBA, SAEC"],
    ["Dr. A. Antonidoss", "HoD, CSBS, SAEC"],
    ["Dr. Ahmed Mudassar Ali", "HoD, IT, SAEC"],
    ["Dr. R. Raja", "HoD, Mathematics, SAEC"],
    ["Prof. N. Juliet", "HoD, MCA, SAEC"]
  ];

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k]; // only used with trusted constants above
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function svg(inner, cls) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    if (cls) s.setAttribute("class", cls);
    s.innerHTML = inner;
    return s;
  }

  function endOfDay(iso) { return new Date(iso + "T23:59:59"); }
  function startOfDay(iso) { return new Date(iso + "T00:00:00"); }

  // Writes text into a node with <mark> around matches of q (safe, no innerHTML).
  function highlight(node, text, q) {
    node.textContent = "";
    if (!q) { node.textContent = text; return; }
    var lower = text.toLowerCase(), i = 0, idx;
    while ((idx = lower.indexOf(q, i)) !== -1) {
      node.appendChild(document.createTextNode(text.slice(i, idx)));
      node.appendChild(el("mark", { text: text.slice(idx, idx + q.length) }));
      i = idx + q.length;
    }
    node.appendChild(document.createTextNode(text.slice(i)));
  }

  /* ---------------------------------------------------------
     3. RENDERERS
     --------------------------------------------------------- */
  function renderTracks() {
    var grid = $("#tracksGrid");
    if (!grid) return;
    TRACKS.forEach(function (t, i) {
      var n = i + 1;
      var btn = el("button", { type: "button", "class": "track-btn", id: "track-btn-" + n, "aria-expanded": "false", "aria-controls": "track-panel-" + n });
      var icon = el("span", { "class": "icon" });
      icon.appendChild(svg(ICONS[t.icon]));
      var label = el("span", {}, [
        el("span", { "class": "track-label", text: "Track " + n }),
        el("span", { "class": "track-title", text: t.title })
      ]);
      btn.appendChild(icon);
      btn.appendChild(label);
      btn.appendChild(svg('<path d="M6 9l6 6 6-6"/>', "chev"));

      var list = el("ul");
      t.topics.forEach(function (topic) { list.appendChild(el("li", { text: topic })); });
      var inner = el("div", {}, [list]);
      inner.inert = true;
      var panel = el("div", { "class": "track-panel", id: "track-panel-" + n, role: "region", "aria-labelledby": "track-btn-" + n }, [inner]);

      var card = el("article", { "class": "track reveal" }, [btn, panel]);
      btn.addEventListener("click", function () {
        var open = card.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
        inner.inert = !open;
      });
      grid.appendChild(card);
    });
  }

  function renderSdgs() {
    var grid = $("#sdgGrid"), detail = $("#sdgDetail");
    if (!grid) return;
    var idle = detail ? detail.textContent : "";
    function show(n) { if (detail) detail.textContent = "Goal " + n + ": " + SDGS[n - 1][0] + ". " + SDGS[n - 1][2]; }
    function reset() { if (detail) detail.textContent = idle; }
    SDGS.forEach(function (g, i) {
      var n = i + 1;
      var a = el("a", {
        href: "https://sdgs.un.org/goals/goal" + n, target: "_blank", rel: "noopener",
        "aria-label": "Goal " + n + ": " + g[0] + ". " + g[2] + " Opens the United Nations page."
      }, [
        el("span", { "class": "sdg-num", text: String(n) }),
        el("span", { "class": "sdg-name", text: g[0] })
      ]);
      a.style.setProperty("--c", g[1]);
      if ([2, 7, 9, 11, 12].indexOf(n) !== -1) a.classList.add("dark"); // keeps text contrast on light SDG colours
      ["mouseenter", "focus", "touchstart"].forEach(function (ev) { a.addEventListener(ev, function () { show(n); }, { passive: true }); });
      ["mouseleave", "blur"].forEach(function (ev) { a.addEventListener(ev, reset); });
      grid.appendChild(el("li", { "class": "reveal" }, [a]));
    });
  }

  function personEl(p) {
    return el("div", { "class": "com-person" }, [
      el("strong", { text: p[0] }),
      el("span", { text: p[1] })
    ]);
  }

  function renderCommittee() {
    var box = $("#committeeList");
    if (!box) return;

    box.appendChild(el("h3", { "class": "com-trust", text: TRUST }));
    var founder = personEl(FOUNDER);
    founder.classList.add("com-founder");
    box.appendChild(founder);

    box.appendChild(el("h4", { "class": "com-sub", text: "Board of Trustees" }));
    var tr = el("div", { "class": "com-trustees" });
    TRUSTEES.forEach(function (p) { tr.appendChild(personEl(p)); });
    box.appendChild(tr);

    var lead = el("div", { "class": "com-leaders" });
    LEADERS.forEach(function (col) {
      var c = el("div", { "class": "com-col" });
      col.forEach(function (blk) {
        if (blk.title) c.appendChild(el("h4", { "class": "com-title", text: blk.title }));
        blk.people.forEach(function (p) { c.appendChild(personEl(p)); });
      });
      lead.appendChild(c);
    });
    box.appendChild(lead);

    box.appendChild(el("h4", { "class": "com-title com-gc-title", text: "General Chairs" }));
    var gc = el("div", { "class": "com-grid" });
    GENERAL_CHAIRS.forEach(function (p) { gc.appendChild(personEl(p)); });
    box.appendChild(gc);
  }

  /* ---------------------------------------------------------
     4. INTERACTIONS
     --------------------------------------------------------- */
  function initHeader() {
    var header = $("#siteHeader");
    var toggle = $("#navToggle");
    var nav = $("#primaryNav");
    var toTop = $("#toTop");

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 40);
      toTop.hidden = window.scrollY < 700;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) header.classList.add("scrolled"); else onScroll();
    }
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 1420) setMenu(false); });

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function initActiveNav() {
    var links = $$("a[data-nav]");
    // Sections without their own nav link borrow the nearest related one.
    var navFor = { ieee: "about", sdgs: "tracks", objectives: "tracks", speakers: "guidelines" };
    var ids = ["home", "about", "conference", "ieee", "call-for-papers", "tracks", "sdgs", "objectives", "dates", "registration", "committees", "guidelines", "speakers", "contact"];
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = navFor[entry.target.id] || entry.target.id;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + id;
          a.classList.toggle("active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  function initReveal() {
    var items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  function initCounters() {
    var nodes = $$("[data-count]");
    function finalText(n, node) { return n + (node.getAttribute("data-suffix") || ""); }
    if (reduceMotion || !("IntersectionObserver" in window)) return; // static text already in HTML
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var node = entry.target, target = parseInt(node.getAttribute("data-count"), 10), start = null;
        io.unobserve(node);
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1100, 1);
          node.textContent = finalText(Math.round(target * (1 - Math.pow(1 - p, 3))), node);
          if (p < 1) requestAnimationFrame(step); else node.textContent = finalText(target, node);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  // Timeline + hero badge reflect the real current date; nothing counts down.
  function initDateStates() {
    var now = new Date();
    $$("#timeline .t-item").forEach(function (item) {
      var past = now > endOfDay(item.getAttribute("data-date"));
      item.classList.toggle("is-past", past);
      item.classList.toggle("is-upcoming", !past);
      $(".t-state", item).textContent = past ? "Completed" : "Upcoming";
    });
    var chip = $("[data-conference-status]");
    if (chip) {
      var label;
      if (now > endOfDay(CONFIG.conferenceEnd)) label = "3rd edition: concluded";
      else if (now >= startOfDay(CONFIG.conferenceStart)) label = "3rd edition: in progress";
      else label = "3rd edition: upcoming";
      chip.textContent = label;
    }
  }

  function initRipple() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".btn") : null;
      if (!btn || reduceMotion || btn.disabled) return;
      var rect = btn.getBoundingClientRect(), size = Math.max(rect.width, rect.height);
      var r = el("span", { "class": "ripple", "aria-hidden": "true" });
      r.style.width = r.style.height = size + "px";
      r.style.left = (e.clientX - rect.left - size / 2) + "px";
      r.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(r);
      setTimeout(function () { r.remove(); }, 650);
    });
  }

  // Submit buttons: external CMT link when one is configured, otherwise honest fallback.
  function initSubmitLinks() {
    var links = $$("[data-submit-link]");
    var main = $("#submitButton"), status = $("#submitStatus");
    if (CONFIG.submissionUrl) {
      links.forEach(function (a) { a.href = CONFIG.submissionUrl; a.target = "_blank"; a.rel = "noopener"; });
      if (status) status.textContent = "Opens Microsoft CMT in a new tab.";
    } else if (main) {
      main.setAttribute("aria-disabled", "true");
      main.addEventListener("click", function (e) { e.preventDefault(); });
      if (status) status.textContent = "The submission link for the 3rd edition has not been published yet. It will appear on this button. Until then, write to " + CONFIG.contactEmail + " with any questions.";
    }
  }

  // Contact form: no backend, so it hands the message to the visitor's email app.
  function initContactForm() {
    var form = $("#contactForm");
    if (!form) return;
    var status = $("#formStatus");
    var rules = {
      cName: function (v) { return v ? "" : "Enter your name."; },
      cEmail: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address."; },
      cSubject: function (v) { return v ? "" : "Enter a subject."; },
      cMessage: function (v) { return v.length >= 10 ? "" : "Write a message of at least 10 characters."; }
    };
    function check(id) {
      var input = document.getElementById(id), msg = rules[id](input.value.trim());
      input.closest(".field").classList.toggle("invalid", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      $('[data-error-for="' + id + '"]').textContent = msg;
      return !msg;
    }
    Object.keys(rules).forEach(function (id) {
      document.getElementById(id).addEventListener("blur", function () { check(id); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      var ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) {
        status.textContent = "Please fix the highlighted fields.";
        var firstBad = $(".field.invalid input, .field.invalid textarea", form);
        if (firstBad) firstBad.focus();
        return;
      }
      var name = $("#cName").value.trim(), email = $("#cEmail").value.trim();
      var body = $("#cMessage").value.trim() + "\n\n—\n" + name + " (" + email + ")";
      var url = "mailto:" + CONFIG.contactEmail + "?subject=" + encodeURIComponent($("#cSubject").value.trim()) + "&body=" + encodeURIComponent(body);
      status.textContent = "Your email app should open with this message ready. It has not been sent yet. If nothing opens, write to " + CONFIG.contactEmail + " directly.";
      window.location.href = url;
    });
  }

  /* ---------------------------------------------------------
     5. NETWORK CANVAS (hero)
     --------------------------------------------------------- */
  function initNetwork() {
    var canvas = $("#networkCanvas");
    if (!canvas || reduceMotion || !canvas.getContext) return;
    var ctx = canvas.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, pts = [], raf = null, running = false;

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(70, Math.round((w * h) / 20000));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .8 });
      }
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      var maxD = 130;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.strokeStyle = "rgba(120, 190, 255," + (0.28 * (1 - d / maxD)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(85, 214, 255, .85)";
        ctx.shadowColor = "rgba(85, 214, 255, .9)"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; raf = requestAnimationFrame(frame); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting) start(); else stop(); }).observe(canvas);
    } else { start(); }
  }

  /* ---------------------------------------------------------
     6. INIT
     --------------------------------------------------------- */
  document.documentElement.classList.add("js");
  renderTracks();
  renderSdgs();
  renderCommittee();
  initHeader();
  initActiveNav();
  initReveal();
  initCounters();
  initDateStates();
  initRipple();
  initContactForm();
  initSubmitLinks();
  initNetwork();
})();
