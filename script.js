(function () {
  var btn = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  var cfg = window.UNG_CONFIG || {};
  var form = document.getElementById("form-devis");
  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("form-submit");
  var photos = document.getElementById("photos");
  var photosHint = document.getElementById("photos-hint");

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? "#b91c1c" : "#166534";
  }

  if (photos && photosHint) {
    photos.addEventListener("change", function () {
      var files = Array.prototype.slice.call(photos.files || []);
      if (!files.length) {
        photosHint.textContent = "Formats JPG ou PNG. Plusieurs fichiers possibles. Si l’envoi échoue, envoyez les photos par WhatsApp.";
        return;
      }
      var names = files.map(function (f) {
        var mb = (f.size / (1024 * 1024)).toFixed(1);
        return f.name + " (" + mb + " Mo)";
      });
      var total = files.reduce(function (s, f) { return s + f.size; }, 0);
      photosHint.textContent = files.length + " photo(s) sélectionnée(s) : " + names.join(", ") +
        (total > 5 * 1024 * 1024 ? " — Attention : fichiers volumineux, compressez ou utilisez WhatsApp." : "");
    });
  }

  function fallbackContact() {
    var phone = cfg.phone || "0681924029";
    var mail = cfg.email || "ungelec@hotmail.com";
    var wa = cfg.whatsapp || "33681924029";
    setStatus("Formulaire non configuré pour l’e-mail automatique. Utilisez WhatsApp, le téléphone ou l’e-mail.", true);
    if (window.confirm("Ouvrir WhatsApp pour envoyer votre demande avec photos ?")) {
      window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent("Bonjour UNGÉLEC, je souhaite un devis."), "_blank");
    } else {
      window.location.href = "mailto:" + mail + "?subject=" + encodeURIComponent("Demande de devis UNGÉLEC");
    }
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Triage IA (Kev) — copie de la demande envoyée au webhook, sans bloquer l'envoi
    try {
      var tUrl = (cfg.triageUrl || "").replace(/\/$/, "");
      if (tUrl) {
        fetch(tUrl + "/triage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (form.name && form.name.value) || "",
            phone: (form.phone && form.phone.value) || "",
            email: (form.email && form.email.value) || "",
            commune: (form.commune && form.commune.value) || "",
            message: (form.message && form.message.value) || ""
          })
        }).catch(function () {});
      }
    } catch (err) {}

    var key = (cfg.web3forms_access_key || "").trim();
    if (!key) {
      fallbackContact();
      return;
    }

    var data = new FormData(form);
    data.append("access_key", key);
    // Web3Forms expects "email" for reply-to; map phone into message footer
    var extra = "\n\n—\nTéléphone : " + (data.get("phone") || "") +
      "\nCommune : " + (data.get("commune") || "");
    data.set("message", (data.get("message") || "") + extra);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours…";
    }
    setStatus("Envoi de votre demande…", false);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && res.j && res.j.success) {
          window.location.href = "merci.html";
          return;
        }
        var err = (res.j && (res.j.message || res.j.error)) || "Échec d’envoi";
        setStatus(err + " — essayez WhatsApp ou le téléphone.", true);
        fallbackContact();
      })
      .catch(function () {
        setStatus("Réseau indisponible. Utilisez WhatsApp ou le 06 81 92 40 29.", true);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envoyer la demande";
        }
      });
  });

  // Mode sombre / clair
  var themeBtn = document.getElementById("themeToggle");
  function applyTheme(mode) {
    if (mode === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (themeBtn) themeBtn.setAttribute("aria-label", "Activer le mode clair");
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeBtn) themeBtn.setAttribute("aria-label", "Activer le mode sombre");
    }
    try { localStorage.setItem("ungelec-theme", mode); } catch (e) {}
  }
  if (themeBtn) {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      themeBtn.setAttribute("aria-label", "Activer le mode clair");
    }
    themeBtn.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }
})();
