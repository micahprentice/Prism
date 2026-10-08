/* Prism demo · quote behavior shared by every direction.
   Directions own their CSS; this file owns state, rendering, and the mock
   approval flow. No network calls. Nothing is persisted. */
(function () {
  const Q = window.PRISM_QUOTE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const money = (n) => "$" + n.toLocaleString("en-US");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const params = new URLSearchParams(location.search);
  let tierIndex = Q.tiers.findIndex((t) => t.id === params.get("tier"));
  if (tierIndex < 0) tierIndex = Math.max(0, Q.tiers.findIndex((t) => t.recommended));
  let previewIndex = null;
  let chosenWindow = Q.windows[0].id;

  const tier = () => Q.tiers[tierIndex];

  /* ---------- odometer digits ---------- */
  function odometer(el, text) {
    if (el.dataset.od !== "1" || el.childElementCount !== text.length) {
      el.innerHTML = "";
      for (const ch of text) {
        if (/\d/.test(ch)) {
          const d = document.createElement("span");
          d.className = "od";
          const reel = document.createElement("span");
          reel.className = "od-reel";
          reel.setAttribute("aria-hidden", "true");
          for (let i = 0; i <= 9; i++) {
            const n = document.createElement("span");
            n.textContent = i;
            reel.appendChild(n);
          }
          d.appendChild(reel);
          el.appendChild(d);
        } else {
          const s = document.createElement("span");
          s.className = "od-static";
          s.textContent = ch;
          el.appendChild(s);
        }
      }
      el.dataset.od = "1";
    }
    let i = 0;
    for (const ch of text) {
      const node = el.children[i++];
      if (/\d/.test(ch)) {
        node.firstChild.style.transform = `translateY(-${+ch}em)`;
      } else node.textContent = ch;
    }
    el.setAttribute("aria-label", text);
  }

  /* ---------- house stage ---------- */
  /* Every render is a stacked, absolutely positioned layer inside a frame with a
     fixed 3:2 aspect ratio, so switching tiers is a pure opacity crossfade and
     the layout never moves. */
  let compare = false;
  let compareX = 50;

  function buildHouse() {
    $$("[data-house]").forEach((stage) => {
      stage.innerHTML = "";
      /* Bottom to top: blue-hour unlit, one layer per tier, and the homeowner's
         daytime photo, which only the compare slider reveals. */
      const layers = [{ id: "base", image: Q.baseImage }, ...Q.tiers, { id: "photo", image: Q.photoImage }];
      layers.forEach((l) => {
        const img = document.createElement("img");
        img.src = l.image;
        img.srcset = `${l.image.replace(/\.webp$/, "-800.webp")} 800w, ${l.image} 1600w`;
        img.sizes = "(min-width: 1024px) 62vw, 100vw";
        img.alt = l.id === "base" ? `${Q.customer.address1} at dusk, before lights`
          : l.id === "photo" ? `${Q.customer.address1}, the homeowner's daytime photo`
          : `${Q.customer.address1} with the ${l.name} lighting`;
        img.width = Q.render.demoWidth; img.height = Q.render.demoHeight;
        img.decoding = "async";
        if (l.id === "photo") img.loading = "lazy";
        img.className = "house-layer";
        img.dataset.layer = l.id;
        stage.appendChild(img);
      });
      const spot = document.createElement("div");
      spot.className = "house-spot";
      spot.setAttribute("aria-hidden", "true");
      stage.appendChild(spot);

      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = "house-handle";
      handle.setAttribute("role", "slider");
      handle.setAttribute("aria-label", "Divider between your photo and the lit render");
      handle.setAttribute("aria-valuemin", "0");
      handle.setAttribute("aria-valuemax", "100");
      handle.innerHTML = `<span class="house-handle-grip"><svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 1 1 6l4 5M13 1l4 5-4 5"/></svg></span><span class="house-handle-tag house-handle-tag-l">Your photo</span><span class="house-handle-tag house-handle-tag-r" data-handle-tier></span>`;
      handle.addEventListener("keydown", (e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowLeft") { e.preventDefault(); setCompareX(compareX - step); }
        if (e.key === "ArrowRight") { e.preventDefault(); setCompareX(compareX + step); }
        if (e.key === "Home") { e.preventDefault(); setCompareX(0); }
        if (e.key === "End") { e.preventDefault(); setCompareX(100); }
      });
      stage.appendChild(handle);

      let dragging = false;
      const toX = (e) => {
        const r = stage.getBoundingClientRect();
        return ((e.clientX - r.left) / r.width) * 100;
      };
      stage.addEventListener("pointerdown", (e) => {
        if (!compare) return;
        dragging = true;
        stage.setPointerCapture(e.pointerId);
        stage.classList.add("is-dragging");
        setCompareX(toX(e));
      });
      stage.addEventListener("pointermove", (e) => { if (dragging) setCompareX(toX(e)); });
      const stop = () => { dragging = false; stage.classList.remove("is-dragging"); };
      stage.addEventListener("pointerup", stop);
      stage.addEventListener("pointercancel", stop);
    });

    /* Warm the other renders so the first tier switch is a crossfade, not a load. */
    const warm = () => [...Q.tiers.map((t) => t.image), Q.photoImage].forEach((src) => { const i = new Image(); i.src = src; });
    if ("requestIdleCallback" in window) requestIdleCallback(warm); else setTimeout(warm, 600);
  }

  function setCompareX(x) {
    compareX = Math.max(0, Math.min(100, x));
    $$("[data-house]").forEach((stage) => {
      stage.style.setProperty("--cx", compareX.toFixed(2) + "%");
      $(".house-handle", stage).setAttribute("aria-valuenow", Math.round(compareX));
      $(".house-handle", stage).setAttribute("aria-valuetext", `${Math.round(compareX)}% before, ${100 - Math.round(compareX)}% after`);
    });
  }

  function setCompare(on) {
    compare = on;
    if (on) setCompareX(compareX);
    $$("[data-house]").forEach((stage) => stage.classList.toggle("is-compare", on));
    $$("[data-compare]").forEach((b) => {
      b.setAttribute("aria-pressed", on);
      b.classList.toggle("is-on", on);
    });
    document.body.classList.toggle("compare-on", on);
    if (on) $(".house-handle")?.focus({ preventScroll: true });
  }

  function paintHouse() {
    $$("[data-house]").forEach((stage) => {
      $$(".house-layer", stage).forEach((img) => {
        const id = img.dataset.layer;
        let o = 0;
        if (id === "base") o = 1;
        if (id === tier().id) o = 1;
        if (previewIndex !== null && Q.tiers[previewIndex].id === id && previewIndex !== tierIndex) o = 0.55;
        img.style.opacity = o;
      });
      $$("[data-handle-tier]", stage).forEach((el) => { el.textContent = tier().name; });
    });
  }

  function spotlight(spot) {
    $$(".house-spot").forEach((el) => {
      if (!spot) { el.style.opacity = 0; return; }
      el.style.opacity = 1;
      el.style.setProperty("--sx", spot.x + "%");
      el.style.setProperty("--sy", spot.y + "%");
      el.style.setProperty("--sw", spot.w + "%");
      el.style.setProperty("--sh", spot.h + "%");
    });
  }

  /* ---------- tier dial ---------- */
  function buildDial() {
    $$("[data-dial]").forEach((dial) => {
      dial.innerHTML = "";
      dial.setAttribute("role", "radiogroup");
      dial.setAttribute("aria-label", "Lighting tier");
      Q.tiers.forEach((t, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dial-opt";
        b.setAttribute("role", "radio");
        b.dataset.index = i;
        b.innerHTML = `<span class="dial-name">${t.name}</span><span class="dial-price">${money(t.price)}</span>`;
        b.addEventListener("click", () => setTier(i));
        b.addEventListener("pointerenter", () => preview(i));
        b.addEventListener("pointerleave", () => preview(null));
        b.addEventListener("focus", () => preview(i));
        b.addEventListener("blur", () => preview(null));
        b.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setTier((i + 1) % Q.tiers.length, true); }
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setTier((i + Q.tiers.length - 1) % Q.tiers.length, true); }
        });
        dial.appendChild(b);
      });
      const ind = document.createElement("span");
      ind.className = "dial-ind";
      ind.setAttribute("aria-hidden", "true");
      dial.appendChild(ind);
    });
  }

  function paintDial() {
    $$("[data-dial]").forEach((dial) => {
      $$(".dial-opt", dial).forEach((b, i) => {
        const on = i === tierIndex;
        b.setAttribute("aria-checked", on);
        b.tabIndex = on ? 0 : -1;
        b.classList.toggle("is-on", on);
      });
      dial.style.setProperty("--dial-i", tierIndex);
    });
  }

  /* ---------- scope list ---------- */
  function buildScope() {
    $$("[data-scope]").forEach((list) => {
      list.innerHTML = "";
      Q.scope.forEach((s, i) => {
        const li = document.createElement("li");
        li.className = "scope-item";
        li.dataset.index = i;
        li.innerHTML = `
          <span class="scope-lamp" aria-hidden="true"></span>
          <span class="scope-name">${s.name}</span>
          <span class="scope-measure">${s.measure}</span>
          <span class="scope-state"></span>
          <p class="scope-detail">${s.detail}</p>`;
        if (s.spot) {
          li.addEventListener("pointerenter", () => spotlight(s.spot));
          li.addEventListener("pointerleave", () => spotlight(null));
        }
        list.appendChild(li);
      });
      /* tier boundaries, for directions that draw them */
      Q.tiers.forEach((t, ti) => {
        const from = ti === 0 ? 0 : Q.tiers[ti - 1].lit;
        const item = list.children[from];
        if (item) { item.dataset.tierStart = t.id; item.dataset.tierStartName = t.name; }
      });
    });
  }

  function paintScope(animate) {
    $$("[data-scope]").forEach((list) => {
      const n = tier().lit;
      const prev = +list.dataset.lit || 0;
      $$(".scope-item", list).forEach((li, i) => {
        const lit = i < n;
        const inherited = lit && i < (tierIndex > 0 ? Q.tiers[tierIndex - 1].lit : 0);
        const newly = lit && !inherited;
        li.classList.toggle("is-lit", lit);
        li.classList.toggle("is-new", newly);
        li.classList.toggle("is-inherited", inherited);
        /* Secession's growth: newly lit lines come on in sequence from the roofline outward. */
        const seq = lit && i >= prev ? i - prev : 0;
        li.style.setProperty("--seq", animate && !reduced ? seq : 0);
        $(".scope-state", li).textContent = lit ? (inherited ? "Included" : tier().name) : "Not in " + tier().name;
      });
      list.dataset.lit = n;
      list.dataset.tier = tier().id;
    });
  }

  /* ---------- text bindings ---------- */
  function paintText() {
    const t = tier();
    $$("[data-price]").forEach((el) => odometer(el, money(t.price)));
    $$("[data-monthly]").forEach((el) => odometer(el, money(t.monthly)));
    $$("[data-tier-name]").forEach((el) => (el.textContent = t.name));
    $$("[data-tier-line]").forEach((el) => (el.textContent = t.line));
    $$("[data-tier-crew]").forEach((el) => (el.textContent = t.crew));
    $$("[data-balance]").forEach((el) => (el.textContent = money(t.price - Q.deposit)));
    $$("[data-deposit]").forEach((el) => (el.textContent = money(Q.deposit)));
    $$("[data-months]").forEach((el) => (el.textContent = Q.financing.months));
    $$("[data-lit-count]").forEach((el) => (el.textContent = t.lit));
    $$("[data-scope-count]").forEach((el) => (el.textContent = Q.scope.length));
    document.body.dataset.tier = t.id;
  }

  function setTier(i, focus) {
    if (i === tierIndex) return;
    tierIndex = i;
    previewIndex = null;
    paintAll(true);
    if (focus) $(`[data-dial] .dial-opt[data-index="${i}"]`)?.focus();
    const u = new URL(location.href);
    u.searchParams.set("tier", tier().id);
    history.replaceState(null, "", u);
    announce(`${tier().name} selected. ${money(tier().price)}, ${tier().lit} of ${Q.scope.length} items included.`);
  }

  function preview(i) {
    /* Algorave's preview: the house shows the tier under the pointer before you commit. */
    previewIndex = i;
    paintHouse();
    document.body.dataset.preview = i === null ? "" : Q.tiers[i].id;
  }

  function paintAll(animate) {
    paintHouse();
    paintDial();
    paintScope(animate);
    paintText();
  }

  let live;
  function announce(msg) {
    if (!live) {
      live = document.createElement("div");
      live.className = "sr";
      live.setAttribute("aria-live", "polite");
      document.body.appendChild(live);
    }
    live.textContent = msg;
  }

  /* ---------- approval flow (mock Stripe) ---------- */
  function sheet() {
    let s = $("[data-sheet]");
    if (!s) {
      s = document.createElement("div");
      s.setAttribute("data-sheet", "");
      document.body.appendChild(s);
    }
    return s;
  }

  function openSheet() {
    const s = sheet();
    s.innerHTML = `
      <div class="sheet-backdrop" data-close></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <header class="sheet-head">
          <span class="sheet-test" title="Payments are a mock. Nothing is charged.">Test mode</span>
          <h2 id="sheet-title" class="sheet-title">Pick your install window</h2>
          <button type="button" class="sheet-close" data-close aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
          </button>
        </header>
        <div class="sheet-body" data-step="window"></div>
      </section>`;
    s.hidden = false;
    document.body.classList.add("sheet-open");
    renderStep("window");
    $$("[data-close]", s).forEach((b) => b.addEventListener("click", closeSheet));
    document.addEventListener("keydown", escClose);
    requestAnimationFrame(() => s.classList.add("is-open"));
  }

  function escClose(e) { if (e.key === "Escape") closeSheet(); }

  function closeSheet() {
    const s = sheet();
    s.classList.remove("is-open");
    document.body.classList.remove("sheet-open");
    document.removeEventListener("keydown", escClose);
    setTimeout(() => { s.hidden = true; s.innerHTML = ""; }, reduced ? 0 : 320);
    $("[data-approve]")?.focus();
  }

  function summary() {
    const t = tier();
    const w = Q.windows.find((w) => w.id === chosenWindow);
    return `
      <dl class="sum">
        <div><dt>Tier</dt><dd>${t.name} · ${money(t.price)}</dd></div>
        <div><dt>Install</dt><dd>${w.day}, ${w.time}</dd></div>
        <div><dt>Deposit today</dt><dd>${money(Q.deposit)}</dd></div>
        <div><dt>Balance after install</dt><dd>${money(t.price - Q.deposit)} <span class="sum-or">or ${Q.financing.months} × ${money(t.monthly)}, ${Q.financing.apr}% APR</span></dd></div>
      </dl>`;
  }

  function renderStep(step) {
    const s = sheet();
    const body = $(".sheet-body", s);
    const title = $("#sheet-title", s);
    body.dataset.step = step;

    if (step === "window") {
      title.textContent = "Pick your install window";
      body.innerHTML = `
        <p class="sheet-lede">Dale is holding three windows for ${Q.customer.address1}. Your deposit books the one you pick.</p>
        <div class="slots" role="radiogroup" aria-label="Install window">
          ${Q.windows.map((w) => `
            <label class="slot ${w.id === chosenWindow ? "is-on" : ""}">
              <input type="radio" name="window" value="${w.id}" ${w.id === chosenWindow ? "checked" : ""}>
              <span class="slot-day">${w.day}</span>
              <span class="slot-time">${w.time}</span>
              <span class="slot-note">${w.note}</span>
            </label>`).join("")}
        </div>
        ${summary()}
        <button type="button" class="sheet-cta" data-next>Continue to deposit</button>
        <p class="sheet-fine">Weather day? We move you to the next open window and text you first.</p>`;
      $$("input[name=window]", body).forEach((r) => r.addEventListener("change", () => {
        chosenWindow = r.value;
        $$(".slot", body).forEach((l) => l.classList.toggle("is-on", $("input", l).checked));
        $(".sum", body).outerHTML = summary();
      }));
      $("[data-next]", body).addEventListener("click", () => renderStep("pay"));
      $("input[name=window]:checked", body)?.focus();
    }

    if (step === "pay") {
      title.textContent = `Pay the ${money(Q.deposit)} deposit`;
      body.innerHTML = `
        <form class="pay" novalidate>
          <div class="pay-wallet">
            <button type="button" class="wallet" data-wallet>
              <svg width="38" height="16" viewBox="0 0 38 16" aria-hidden="true"><path fill="currentColor" d="M7.4 2.1c.5-.6.8-1.4.7-2.1-.7 0-1.5.5-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1zm.7 1.2c-1.1-.1-2 .6-2.6.6-.5 0-1.3-.6-2.2-.6C2.2 3.3 1.1 4 .5 5c-1.2 2.1-.3 5.2.9 6.9.6.8 1.3 1.8 2.2 1.7.9 0 1.2-.6 2.3-.6s1.4.6 2.3.6c1 0 1.6-.8 2.1-1.7.7-1 1-1.9 1-2-.1 0-1.9-.7-1.9-2.9 0-1.8 1.5-2.6 1.5-2.7-.8-1.2-2.1-1.3-2.5-1.3zM15 1v12.3h1.9V9.1h2.7c2.4 0 4.1-1.7 4.1-4.1S22.1 1 19.7 1H15zm1.9 1.6h2.2c1.7 0 2.6.9 2.6 2.4S20.8 7.5 19.1 7.5h-2.2V2.6zM28 13.4c1.2 0 2.3-.6 2.8-1.6h.1v1.5h1.8V7.1c0-1.8-1.4-2.9-3.6-2.9-2 0-3.5 1.2-3.6 2.7h1.7c.1-.8.9-1.3 1.8-1.3 1.2 0 1.8.5 1.8 1.5v.7l-2.4.1c-2.2.1-3.4 1-3.4 2.6.1 1.7 1.3 2.9 3 2.9zm.5-1.5c-1 0-1.7-.5-1.7-1.3 0-.8.6-1.2 1.8-1.3l2.1-.1v.7c.1 1.1-.9 2-2.2 2zM34.4 16.5c1.9 0 2.7-.7 3.5-2.9L38 4.3h-2l-2.3 7.5-2.3-7.5h-2l3.3 9.2-.2.6c-.3.9-.8 1.3-1.7 1.3h-.6v1.5c.1 0 .5.1.9.1z" transform="translate(0 -.5) scale(.95)"/></svg>
              <span class="sr">Pay with Apple Pay</span>
            </button>
            <span class="pay-or"><span>or pay with card</span></span>
          </div>
          <label class="field"><span>Name on card</span><input name="name" autocomplete="cc-name" value="${Q.customer.names.split(" &")[0]} Whitfield"></label>
          <label class="field"><span>Card number</span>
            <span class="field-card">
              <input name="card" inputmode="numeric" autocomplete="cc-number" value="4242 4242 4242 4242">
              <svg width="28" height="18" viewBox="0 0 28 18" aria-hidden="true"><rect x=".5" y=".5" width="27" height="17" rx="2" fill="none" stroke="currentColor" opacity=".35"/><circle cx="11" cy="9" r="4.5" fill="#EB001B" opacity=".9"/><circle cx="17" cy="9" r="4.5" fill="#F79E1B" opacity=".9"/></svg>
            </span>
          </label>
          <div class="field-row">
            <label class="field"><span>Expiry</span><input name="exp" inputmode="numeric" autocomplete="cc-exp" value="08 / 29"></label>
            <label class="field"><span>CVC</span><input name="cvc" inputmode="numeric" autocomplete="cc-csc" value="•••"></label>
            <label class="field"><span>ZIP</span><input name="zip" inputmode="numeric" autocomplete="postal-code" value="40205"></label>
          </div>
          ${summary()}
          <button type="submit" class="sheet-cta" data-pay>
            <span class="cta-label">Pay ${money(Q.deposit)}.00 and book ${Q.windows.find((w) => w.id === chosenWindow).day}</span>
            <span class="cta-busy" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
          <p class="sheet-fine">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x=".65" y="5.65" width="9.7" height="6.7" rx="1.2"/><path d="M3 5.5V3.6a2.5 2.5 0 0 1 5 0v1.9"/></svg>
            Card details are never seen by Falls City. Payments by Stripe. <strong>This is a demo in test mode; no card is charged.</strong>
          </p>
          <button type="button" class="sheet-back" data-back>Back to install windows</button>
        </form>`;
      $("[data-back]", body).addEventListener("click", () => renderStep("window"));
      $("[data-wallet]", body).addEventListener("click", () => pay(body));
      $("form", body).addEventListener("submit", (e) => { e.preventDefault(); pay(body); });
      $("input[name=name]", body).focus();
    }
  }

  function pay(body) {
    const btn = $("[data-pay]", body);
    btn.classList.add("is-busy");
    btn.disabled = true;
    $("[data-wallet]", body).disabled = true;
    announce("Processing deposit");
    setTimeout(() => {
      closeSheet();
      book();
    }, reduced ? 200 : 1400);
  }

  function book() {
    const t = tier();
    const w = Q.windows.find((w) => w.id === chosenWindow);
    $$("[data-booked-day]").forEach((el) => (el.textContent = w.day));
    $$("[data-booked-time]").forEach((el) => (el.textContent = w.time));
    $$("[data-booked-tier]").forEach((el) => (el.textContent = t.name));
    $$("[data-booked-total]").forEach((el) => (el.textContent = money(t.price)));
    $$("[data-booked-balance]").forEach((el) => (el.textContent = money(t.price - Q.deposit)));
    document.body.dataset.state = "booked";
    /* The pipeline screen reads this so the Whitfield card moves to Scheduled. Demo only. */
    try { sessionStorage.setItem("prism-demo-booking", JSON.stringify({ quote: Q.id, tier: t.id, tierName: t.name, price: t.price, deposit: Q.deposit, window: w.id, day: w.day, time: w.time, at: Date.now() })); } catch (e) {}
    announce(`Booked. ${t.name} lighting, ${w.day}, ${w.time}. Deposit paid.`);
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    $("[data-booked-focus]")?.focus();
    $$("[data-reset]").forEach((b) => b.addEventListener("click", () => {
      delete document.body.dataset.state;
      try { sessionStorage.removeItem("prism-demo-booking"); } catch (e) {}
      $("[data-approve]")?.focus();
    }, { once: true }));
  }

  /* ---------- static text ---------- */
  function paintStatic() {
    const map = {
      "company-name": Q.company.name, "company-owner": Q.company.owner, "company-phone": Q.company.phone,
      "company-license": Q.company.license, "company-insured": Q.company.insured,
      "company-rating": Q.company.reviews.rating.toFixed(1), "company-review-count": Q.company.reviews.count,
      "customer-first": Q.customer.first, "customer-names": Q.customer.names,
      "address1": Q.customer.address1, "address2": Q.customer.address2,
      "quote-id": Q.id, "valid-through": fmtDate(Q.validThrough), "sent-on": fmtDate(Q.sentOn),
      "color": Q.color, "takedown": Q.dates.takedown, "storage": Q.dates.storage,
      "apr": Q.financing.apr + "%", "fin-provider": Q.financing.provider,
    };
    for (const k in map) $$(`[data-${k}]`).forEach((el) => (el.textContent = map[k]));
    $$("[data-phone-link]").forEach((a) => (a.href = "sms:" + Q.company.phone.replace(/\D/g, "")));
  }
  function fmtDate(iso) {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  /* ---------- boot ---------- */
  function boot() {
    buildHouse();
    buildDial();
    buildScope();
    paintStatic();
    paintAll(false);
    $$("[data-approve]").forEach((b) => b.addEventListener("click", openSheet));
    $$("[data-compare]").forEach((b) => {
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => setCompare(!compare));
    });
    document.body.classList.add("is-ready");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.PRISM_DEMO = { setTier, openSheet, book, get tier() { return tier(); } };
})();
