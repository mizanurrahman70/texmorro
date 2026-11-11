/* Texmorro product catalogue + WhatsApp helpers (shared by all pages) */
window.TX = {
  whatsapp: "8801756375660",

  // Lookbook styles shown on the home page and product pages
  // Our own collection (photos in images/collection)
  lookbook: [
    {
      id: "royal-blue-jacket", name: "Royal blue block-print jacket", category: "Statement jackets",
      image: "images/collection/royal-blue-jacket-front.jpg",
      gallery: ["images/collection/royal-blue-jacket-front.jpg", "images/collection/royal-blue-jacket-detail.jpg", "images/collection/royal-blue-jacket-angle.jpg", "images/collection/royal-blue-jacket-side.jpg"],
      alt: "Model wearing a royal blue jacket with a gold block-printed border at the hem and cuffs",
      summary: "An oversized royal blue jacket with a camp collar and a gold block-printed border along the hem and cuffs, a signature piece from our own collection.",
      details: ["Oversized, boxy fit", "Notched camp collar", "Block-printed hem and cuffs", "Single-button front"],
      fabrics: ["Cotton twill", "Cotton canvas", "Linen blend", "Silk blend"],
      colors: ["Royal blue", "Indigo", "Black", "Custom colour"]
    },
    {
      id: "olive-embroidered-jacket", name: "Olive embroidered jacket", category: "Outerwear",
      image: "images/collection/olive-jacket-women.jpg",
      gallery: ["images/collection/olive-jacket-women.jpg", "images/collection/olive-jacket-men.jpg", "images/collection/olive-jacket-duo.jpg"],
      alt: "Model in an olive cropped jacket with wide embroidered lapels",
      summary: "A cropped olive jacket with dramatic wide lapels and embroidered panels, cut to work on both women and men.",
      details: ["Wide embroidered lapels", "Cropped bomber body", "Gathered cuffs", "Unisex fit"],
      fabrics: ["Cotton gabardine", "Twill", "Canvas", "Wool blend"],
      colors: ["Olive", "Khaki", "Black", "Custom colour"]
    },
    {
      id: "plum-wrap-jacket", name: "Plum wrap jacket", category: "Runway",
      image: "images/collection/plum-wrap-jacket.jpg",
      gallery: ["images/collection/plum-wrap-jacket.jpg"],
      alt: "Model on a runway in a plum wrap jacket with an embroidered chest motif",
      summary: "An asymmetric plum wrap jacket with a hand-embroidered chest motif, shown on the runway.",
      details: ["Asymmetric wrap front", "Embroidered chest motif", "Wide lapel", "Relaxed shoulder"],
      fabrics: ["Wool blend", "Suiting", "Cotton twill", "Linen"],
      colors: ["Plum", "Burgundy", "Charcoal", "Custom colour"]
    },
    {
      id: "burgundy-coord-set", name: "Burgundy co-ord set", category: "Co-ord sets",
      image: "images/collection/burgundy-coord-set.jpg",
      gallery: ["images/collection/burgundy-coord-set.jpg"],
      alt: "Model in a burgundy cropped jacket and matching wide-leg trousers",
      summary: "A tonal burgundy co-ord: a cropped jacket with wide lapels and matching wide-leg trousers.",
      details: ["Cropped jacket, wide lapels", "Matching wide-leg trousers", "Tonal buttons", "Tailored finish"],
      fabrics: ["Cotton twill", "Suiting", "Linen blend", "Corduroy"],
      colors: ["Burgundy", "Rust", "Olive", "Custom colour"]
    },
    {
      id: "olive-overshirt", name: "Olive camp overshirt", category: "Shirts",
      image: "images/collection/olive-overshirt.jpg",
      gallery: ["images/collection/olive-overshirt.jpg"],
      alt: "Model in a short-sleeve olive overshirt with a contrast collar",
      summary: "A short-sleeve olive overshirt with a contrast collar and chest pockets, relaxed and easy to wear.",
      details: ["Short sleeves", "Contrast collar", "Chest flap pockets", "Boxy fit"],
      fabrics: ["Cotton poplin", "Linen", "Twill", "Seersucker"],
      colors: ["Olive", "Sand", "Navy", "Custom colour"]
    },
    {
      id: "ivory-block-print-coord", name: "Ivory block-print co-ord", category: "Unisex sets",
      image: "images/collection/ivory-block-print-coord.jpg",
      gallery: ["images/collection/ivory-block-print-coord.jpg"],
      alt: "Two models in matching ivory shirt-jackets and trousers with elephant block prints",
      summary: "Matching ivory shirt-jackets and trousers with hand block-printed elephant and floral borders, made as a unisex set.",
      details: ["Block-printed motifs", "Shirt-jacket and trousers", "Relaxed unisex fit", "Printed borders"],
      fabrics: ["Khadi cotton", "Linen", "Cotton slub", "Silk blend"],
      colors: ["Ivory", "Off-white", "Sand", "Custom colour"]
    }
  ],

  makeProducts: {
    collection: [
      ["Royal blue block-print jacket", "collection/royal-blue-jacket-front.jpg", "royal-blue-jacket"],
      ["Olive embroidered jacket", "collection/olive-jacket-women.jpg", "olive-embroidered-jacket"],
      ["Plum wrap jacket", "collection/plum-wrap-jacket.jpg", "plum-wrap-jacket"],
      ["Burgundy co-ord set", "collection/burgundy-coord-set.jpg", "burgundy-coord-set"],
      ["Olive camp overshirt", "collection/olive-overshirt.jpg", "olive-overshirt"],
      ["Royal blue jacket — side", "collection/royal-blue-jacket-side.jpg", "royal-blue-jacket"],
      ["Olive jacket — menswear", "collection/olive-jacket-men.jpg", "olive-embroidered-jacket"],
      ["Ivory block-print co-ord", "collection/ivory-block-print-coord.jpg", "ivory-block-print-coord"],
      ["Royal blue jacket — detail", "collection/royal-blue-jacket-angle.jpg", "royal-blue-jacket"],
      ["Olive jacket — duo", "collection/olive-jacket-duo.jpg", "olive-embroidered-jacket"]
    ],
    tops: [
      ["T-shirts", "tee-classic.jpg"],
      ["Premium cotton tees", "tee-premium.jpg"],
      ["Graphic tees", "collection.jpg"],
      ["Relaxed-fit tees", "model-look.jpg"],
      ["Long-sleeve tops", "shirt-rack.jpg"],
      ["Layering tops", "fashion-flatlay.jpg"],
      ["Everyday essentials", "garment-detail.jpg"],
      ["Collection tops", "outerwear.jpg"],
      ["Casual tops", "teamwear.jpg"],
      ["Custom-fit tees", "knitwear.jpg"]
    ],
    bottoms: [
      ["Denim", "denim.jpg"],
      ["Trousers", "trousers.jpg"],
      ["Everyday bottoms", "model-look.jpg"],
      ["Coordinated separates", "fashion-flatlay.jpg"],
      ["Casual pants", "outerwear.jpg"],
      ["Tailored bottoms", "shirt-rack.jpg"],
      ["Relaxed-fit trousers", "teamwear.jpg"],
      ["Denim styles", "collection.jpg"],
      ["Seasonal bottoms", "garment-detail.jpg"],
      ["Collection separates", "tee-premium.jpg"]
    ],
    shirts: [
      ["Classic shirts", "shirt-rack.jpg"],
      ["Polo shirts", "polo-shirt.jpg"],
      ["Smart-casual shirts", "tee-premium.jpg"],
      ["Work shirts", "teamwear.jpg"],
      ["Overshirts", "outerwear.jpg"],
      ["Everyday polos", "tee-classic.jpg"],
      ["Relaxed shirts", "fashion-flatlay.jpg"],
      ["Custom shirts", "collection.jpg"],
      ["Layering shirts", "knitwear.jpg"],
      ["Shirt details", "garment-detail.jpg"]
    ],
    layers: [
      ["Hoodies", "knitwear.jpg"],
      ["Sweatshirts", "outerwear.jpg"],
      ["Knit sweaters", "fashion-flatlay.jpg"],
      ["Pullover layers", "model-look.jpg"],
      ["Everyday fleece", "teamwear.jpg"],
      ["Relaxed knitwear", "tee-premium.jpg"],
      ["Layering essentials", "shirt-rack.jpg"],
      ["Collection knits", "collection.jpg"],
      ["Custom hoodies", "tee-classic.jpg"],
      ["Knit details", "garment-detail.jpg"]
    ],
    outerwear: [
      ["Jackets", "leather-jacket.jpg"],
      ["Denim jackets", "denim.jpg"],
      ["Lightweight layers", "outerwear.jpg"],
      ["Statement outerwear", "model-look.jpg"],
      ["Everyday jackets", "teamwear.jpg"],
      ["Seasonal layers", "fashion-flatlay.jpg"],
      ["Collection outerwear", "collection.jpg"],
      ["Relaxed jackets", "knitwear.jpg"],
      ["Shirt jackets", "shirt-rack.jpg"],
      ["Outerwear details", "garment-detail.jpg"]
    ],
    uniforms: [
      ["Team uniforms", "teamwear.jpg"],
      ["Work shirts", "shirt-rack.jpg"],
      ["Custom polos", "polo-shirt.jpg"],
      ["Uniform tops", "tee-classic.jpg"],
      ["Coordinated layers", "outerwear.jpg"],
      ["Team hoodies", "knitwear.jpg"],
      ["Workwear jackets", "leather-jacket.jpg"],
      ["Uniform bottoms", "trousers.jpg"],
      ["Denim workwear", "denim.jpg"],
      ["Custom uniform sets", "collection.jpg"]
    ]
},

  sizes: ["XS", "S", "M", "L", "XL", "XXL"],

  // Category info for "What We Make" items
  categories: {
    collection: { label: "Our Collection", fabrics: ["Cotton twill", "Linen", "Silk blend", "Wool blend"] },
    tops: { label: "Tops & Tees", fabrics: ["Cotton jersey", "Organic cotton", "Cotton-poly blend", "Slub jersey"] },
    bottoms: { label: "Bottoms", fabrics: ["Denim", "Cotton twill", "Linen", "Stretch blends"] },
    shirts: { label: "Shirts & Polos", fabrics: ["Poplin", "Oxford", "Pique", "Linen"] },
    layers: { label: "Hoodies & Knitwear", fabrics: ["Fleece", "French terry", "Cotton knit", "Merino blend"] },
    outerwear: { label: "Jackets & Outerwear", fabrics: ["Twill", "Denim", "Nylon", "Faux leather"] },
    uniforms: { label: "Sets & Uniforms", fabrics: ["Poly-cotton", "Pique", "Twill", "Performance knit"] }
  },

  // Find a product from the page URL (?id=... or ?cat=...&i=...)
  getProduct(params) {
    const id = params.get("id");
    const found = this.lookbook.find((p) => p.id === id);
    if (found) return found;
    const cat = params.get("cat");
    const i = Number(params.get("i"));
    const list = this.makeProducts[cat];
    if (list && list[i]) {
      const [name, img, lookbookId] = list[i];
      const linked = this.lookbook.find((p) => p.id === lookbookId);
      if (linked) return linked;
      const info = this.categories[cat];
      return {
        id: `${cat}-${i}`, name, category: info.label,
        image: this.imagePath(img), alt: name,
        summary: `${name} produced to your specification, with your fabric, colours, sizing and branding.`,
        details: ["Made to your specification", "Custom labels and trims", "Size set and sample before bulk", "Quality checked at every stage"],
        fabrics: info.fabrics,
        colors: ["Black", "White", "Navy", "Custom colour"],
        cat
      };
    }
    return null;
  },

  imagePath(img) {
    return img.includes("/") ? `images/${img}` : `images/what-we-make/${img}`;
  },

  waLink(text) {
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(text)}`;
  }
};
