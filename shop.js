/* Texmorro product, order and custom-order pages.
   Orders are sent by opening WhatsApp (wa.me) with the message pre-filled. */
(() => {
  const TX = window.TX;
  const params = new URLSearchParams(location.search);
  const $ = (sel) => document.querySelector(sel);

  const el = (tag, attrs = {}, text) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // Chip group: radio (single) or checkbox (multi)
  const chips = (wrap, name, values, { multi = false, selected = [] } = {}) => {
    wrap.replaceChildren(...values.map((value, i) => {
      const id = `${name}-${i}`;
      const label = el("label", { class: "chip", for: id });
      const input = el("input", { type: multi ? "checkbox" : "radio", name, id, value });
      if (selected.includes(value)) input.checked = true;
      label.append(input, el("span", {}, value));
      return label;
    }));
  };
  const chipValues = (name) => [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);

  const productHref = (p) => (p.cat ? `product.html?cat=${p.cat}&i=${p.id.split("-").pop()}` : `product.html?id=${p.id}`);
  const lines = (pairs) => pairs.filter(([, v]) => v !== undefined && String(v).trim() !== "").map(([k, v]) => `${k}: ${v}`).join("\n");

  // Shared "sent" panel + WhatsApp open
  const sendToWhatsApp = (message) => {
    const link = TX.waLink(message);
    const win = window.open(link, "_blank");
    if (win) win.opener = null;
    const panel = $("#sent-panel");
    if (panel) {
      $("#sent-open").href = link;
      panel.hidden = false;
      $("#sent-close").focus();
    }
    if (!win) location.href = link; // popup blocked → open in this tab
  };

  const wireSentPanel = (getMessage) => {
    const panel = $("#sent-panel");
    if (!panel) return;
    $("#sent-close").addEventListener("click", () => { panel.hidden = true; });
    panel.addEventListener("click", (e) => { if (e.target === panel) panel.hidden = true; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") panel.hidden = true; });
    $("#sent-copy").addEventListener("click", async (e) => {
      try {
        await navigator.clipboard.writeText(getMessage());
        e.currentTarget.textContent = "Copied ✓";
      } catch {
        e.currentTarget.textContent = "Copy failed — select the preview text";
      }
    });
  };

  const validPhone = (v) => v.replace(/[^\d]/g, "").length >= 8;

  const showError = (box, field, message) => {
    box.textContent = message;
    box.hidden = false;
    field.setAttribute("aria-invalid", "true");
    field.focus();
  };

  /* ---------------- Product page ---------------- */
  if ($("#pd")) {
    const product = TX.getProduct(params) || TX.lookbook[0];
    document.title = `${product.name} — Texmorro`;
    $("#pd-crumb-name").textContent = product.name;
    if (product.cat) {
      $("#pd-crumb-cat").textContent = product.category;
      $("#pd-crumb-cat").href = "index.html#make-section";
    }
    const img = $("#pd-image");
    img.src = product.image;
    img.alt = product.alt;
    $("#pd-cat").textContent = product.category;
    $("#pd-title").textContent = product.name;
    $("#pd-summary").textContent = product.summary;
    $("#pd-details").replaceChildren(...product.details.map((d) => el("li", {}, d)));

    chips($("#pd-fabrics"), "fabric", product.fabrics, { selected: [product.fabrics[0]] });
    chips($("#pd-colors"), "color", product.colors, { selected: [product.colors[0]] });
    chips($("#pd-sizes"), "size", TX.sizes, { multi: true, selected: ["S", "M", "L"] });

    const qty = $("#pd-qty");
    document.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        qty.value = Math.max(1, (Number(qty.value) || 0) + Number(btn.dataset.step));
        updateWa();
      });
    });

    const choice = () => ({
      fabric: chipValues("fabric")[0] || "",
      color: chipValues("color")[0] || "",
      sizes: chipValues("size").join(", "),
      qty: Math.max(1, Number(qty.value) || 1)
    });

    const updateWa = () => {
      const c = choice();
      $("#pd-wa").href = TX.waLink(`Hello Texmorro, I have a question about the ${product.name} (${product.category}).\n\n${lines([["Fabric", c.fabric], ["Colour", c.color], ["Sizes", c.sizes], ["Quantity", `${c.qty} pcs`]])}\n\nLink: ${location.href}`);
    };
    $("#pd-form").addEventListener("change", updateWa);
    qty.addEventListener("input", updateWa);
    updateWa();

    // Order → order page with selections carried over
    $("#pd-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const c = choice();
      const q = new URLSearchParams({ product: product.cat ? `${product.cat}:${product.id.split("-").pop()}` : product.id, fabric: c.fabric, color: c.color, sizes: c.sizes, qty: c.qty });
      location.href = `order.html?${q}`;
    });
    $("#pd-custom").href = `custom-order.html?ref=${encodeURIComponent(product.cat ? "" : product.id)}&type=${encodeURIComponent(product.cat ? product.category : "Dress")}`;

    // Thumbnail gallery when the product has more than one photo
    const gallery = product.gallery || [product.image];
    const thumbs = $("#pd-thumbs");
    if (thumbs && gallery.length > 1) {
      thumbs.replaceChildren(...gallery.map((src, i) => {
        const b = el("button", { type: "button", class: "pd-thumb", "aria-label": `Show photo ${i + 1} of ${gallery.length}`, "aria-pressed": String(i === 0) });
        b.append(el("img", { src, alt: "" }));
        b.addEventListener("click", () => {
          img.src = src;
          thumbs.querySelectorAll(".pd-thumb").forEach((t) => t.setAttribute("aria-pressed", String(t === b)));
        });
        return b;
      }));
    } else if (thumbs) {
      thumbs.remove();
    }

    // Hover zoom (mouse) — follows cursor
    const zoom = $("#pd-zoom");
    zoom.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = zoom.getBoundingClientRect();
      img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      zoom.classList.add("is-zoomed");
    });
    zoom.addEventListener("pointerleave", () => zoom.classList.remove("is-zoomed"));

    // Related products
    $("#pd-related").replaceChildren(...TX.lookbook.filter((p) => p.id !== product.id).slice(0, 4).map((p) => {
      const a = el("a", { class: "related-card", href: productHref(p) });
      a.append(el("img", { src: p.image, alt: p.alt, loading: "lazy" }), el("span", { class: "pd-cat" }, p.category), el("h3", {}, p.name));
      return a;
    }));
  }

  /* ---------------- Order page ---------------- */
  if ($("#order-form")) {
    const form = $("#order-form");
    const select = $("#o-product");

    // Product list: lookbook styles + What We Make items
    const options = TX.lookbook.map((p) => ({ key: p.id, product: p }));
    Object.keys(TX.makeProducts).forEach((cat) => {
      if (cat === "collection") return; // same pieces as the lookbook list
      TX.makeProducts[cat].forEach((_, i) => {
        const p = TX.getProduct(new URLSearchParams({ cat, i }));
        options.push({ key: `${cat}:${i}`, product: p });
      });
    });
    const groups = {};
    options.forEach((o) => {
      const g = o.product.cat ? o.product.category : "Our collection";
      (groups[g] ||= el("optgroup", { label: g })).append(el("option", { value: o.key }, o.product.name));
    });
    select.append(...Object.values(groups));
    const wanted = params.get("product") || TX.lookbook[0].id;
    select.value = options.some((o) => o.key === wanted) ? wanted : TX.lookbook[0].id;

    const current = () => options.find((o) => o.key === select.value).product;

    const fillSelect = (sel, values, pick) => {
      sel.replaceChildren(...values.map((v) => el("option", { value: v }, v)), el("option", { value: "Other / discuss" }, "Other / discuss"));
      sel.value = values.includes(pick) ? pick : values[0];
    };

    // Size quantity grid
    const sizeWrap = $("#o-sizes");
    const preSizes = (params.get("sizes") || "S, M, L").split(",").map((s) => s.trim()).filter(Boolean);
    const preQty = Number(params.get("qty")) || 50;
    // Split the quantity evenly; give any remainder to the first sizes so the total is exact
    const picked = TX.sizes.filter((s) => preSizes.includes(s));
    const base = Math.floor(preQty / Math.max(1, picked.length));
    const extra = preQty - base * picked.length;
    sizeWrap.replaceChildren(...TX.sizes.map((s) => {
      const box = el("label", { class: "size-box" });
      const input = el("input", { type: "number", min: "0", step: "1", inputmode: "numeric", "data-size": s, "aria-label": `Quantity in size ${s}` });
      const pos = picked.indexOf(s);
      input.value = pos === -1 ? 0 : base + (pos < extra ? 1 : 0);
      box.append(el("span", {}, s), input);
      return box;
    }));

    const sizeTotals = () => [...sizeWrap.querySelectorAll("input")].map((i) => [i.dataset.size, Math.max(0, Number(i.value) || 0)]);

    const onProduct = (first) => {
      const p = current();
      fillSelect($("#o-fabric"), p.fabrics, first ? params.get("fabric") : null);
      fillSelect($("#o-color"), p.colors, first ? params.get("color") : null);
      $("#sum-image").src = p.image;
      $("#sum-image").alt = p.alt;
      $("#sum-cat").textContent = p.category;
      $("#sum-name").textContent = p.name;
      $("#sum-link").href = productHref(p);
    };

    const message = () => {
      const p = current();
      const sizes = sizeTotals().filter(([, n]) => n > 0);
      const total = sizes.reduce((a, [, n]) => a + n, 0);
      const v = (id) => $(id).value.trim();
      return [
        "🧵 NEW ORDER — Texmorro website",
        "",
        lines([["Product", `${p.name} (${p.category})`], ["Fabric", v("#o-fabric")], ["Colour", v("#o-color")]]),
        `Sizes: ${sizes.length ? sizes.map(([s, n]) => `${s} × ${n}`).join(", ") : "-"}`,
        `Total quantity: ${total} pcs`,
        lines([["Needed by", v("#o-date")]]),
        "",
        "👤 Customer",
        lines([["Name", v("#o-name")], ["Brand", v("#o-brand")], ["WhatsApp", v("#o-phone")], ["Email", v("#o-email")], ["Location", v("#o-country")]]),
        v("#o-notes") ? `\n📝 Notes\n${v("#o-notes")}` : "",
        "",
        `Product link: ${new URL(productHref(p), location.href).href}`
      ].filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n").trim();
    };

    const refresh = () => {
      $("#o-total").textContent = sizeTotals().reduce((a, [, n]) => a + n, 0);
      $("#wa-preview").textContent = message();
    };

    select.addEventListener("change", () => { onProduct(false); refresh(); });
    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);
    onProduct(true);
    refresh();
    wireSentPanel(message);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = $("#order-error");
      form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
      err.hidden = true;
      const total = sizeTotals().reduce((a, [, n]) => a + n, 0);
      if (total < 1) return showError(err, sizeWrap.querySelector("input"), "Please add a quantity for at least one size.");
      if (!$("#o-name").value.trim()) return showError(err, $("#o-name"), "Please enter your name.");
      if (!validPhone($("#o-phone").value)) return showError(err, $("#o-phone"), "Please enter a valid WhatsApp number so we can reply.");
      if ($("#o-email").value && !$("#o-email").checkValidity()) return showError(err, $("#o-email"), "Please check your email address.");
      sendToWhatsApp(message());
    });
  }

  /* ---------------- Custom order page ---------------- */
  if ($("#custom-form")) {
    const form = $("#custom-form");
    const types = ["Dress", "Gown", "Tops & tees", "Shirts & polos", "Bottoms", "Outerwear", "Uniforms", "Other"];
    const pre = params.get("type");
    const match = pre && types.find((t) => {
      const a = t.toLowerCase().split(" ")[0];
      return pre.toLowerCase().split(/[^a-z]+/).some((w) => w && (w === a || a.startsWith(w) || w.startsWith(a)));
    });
    chips($("#c-type"), "ctype", types, { selected: [match || (pre ? "Other" : "Dress")] });
    chips($("#c-sizes"), "csize", [...TX.sizes, "Custom sizes"], { multi: true });
    chips($("#c-help"), "chelp", ["Design development", "Pattern making", "Sampling", "Custom labels", "Packaging"], { multi: true });

    const ref = $("#c-ref");
    ref.append(el("option", { value: "" }, "No, it’s my own design"), ...TX.lookbook.map((p) => el("option", { value: p.id }, p.name)));
    if (TX.lookbook.some((p) => p.id === params.get("ref"))) ref.value = params.get("ref");

    const message = () => {
      const v = (id) => $(id).value.trim();
      const refP = TX.lookbook.find((p) => p.id === ref.value);
      return [
        "✂️ CUSTOM ORDER REQUEST — Texmorro website",
        "",
        lines([
          ["Product type", chipValues("ctype")[0]],
          ["Based on", refP ? refP.name : ""],
          ["Fabric", v("#c-fabric")],
          ["Colours", v("#c-colors")],
          ["Sizes", chipValues("csize").join(", ")],
          ["Quantity", v("#c-qty") ? `${v("#c-qty")} pcs` : ""],
          ["Target price", v("#c-budget")],
          ["Needed by", v("#c-date")],
          ["Reference", v("#c-link")],
          ["Help needed", chipValues("chelp").join(", ")]
        ]),
        "",
        "📝 Design",
        v("#c-desc") || "-",
        "",
        "👤 Customer",
        lines([["Name", v("#c-name")], ["Brand", v("#c-brand")], ["WhatsApp", v("#c-phone")], ["Email", v("#c-email")], ["Location", v("#c-country")]])
      ].join("\n").trim();
    };

    const refresh = () => { $("#wa-preview").textContent = message(); };
    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);
    refresh();
    wireSentPanel(message);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = $("#custom-error");
      form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
      err.hidden = true;
      if ($("#c-desc").value.trim().length < 10) return showError(err, $("#c-desc"), "Please describe your design in a few words (at least 10 characters).");
      if (!(Number($("#c-qty").value) > 0)) return showError(err, $("#c-qty"), "Please enter the total quantity.");
      if ($("#c-link").value && !$("#c-link").checkValidity()) return showError(err, $("#c-link"), "Please enter a full link starting with https://");
      if (!$("#c-name").value.trim()) return showError(err, $("#c-name"), "Please enter your name.");
      if (!validPhone($("#c-phone").value)) return showError(err, $("#c-phone"), "Please enter a valid WhatsApp number so we can reply.");
      if ($("#c-email").value && !$("#c-email").checkValidity()) return showError(err, $("#c-email"), "Please check your email address.");
      sendToWhatsApp(message());
    });
  }
})();
