// ── SCROLL PHOTO RAILS ────────────────────────────────────────────────────────
// Drop images into assets/photos/scroll/ and list their filenames here.
// Both rails will cycle through the same set — left scrolls up, right scrolls down.
const SCROLL_PHOTOS = [
  "assets/photos/scroll/FullSizeRender.jpeg",
  "assets/photos/scroll/IMG_0161.jpeg",
  "assets/photos/scroll/IMG_0951.jpeg",
  "assets/photos/scroll/IMG_1102.JPG",
  "assets/photos/scroll/IMG_2063.jpeg",
  "assets/photos/scroll/IMG_2789.jpeg",
  "assets/photos/scroll/IMG_6965.jpeg",
  "assets/photos/scroll/IMG_7466.jpeg",
  "assets/photos/scroll/IMG_7505.jpeg",
  "assets/photos/scroll/IMG_8238.jpeg",
  "assets/photos/IMG_0771.jpeg",
  "assets/photos/IMG_1492.jpeg",
  "assets/photos/IMG_2369.jpeg",
  "assets/photos/IMG_2471.jpeg",
  "assets/photos/IMG_2828.jpeg",
  "assets/photos/IMG_6416.jpeg",
  "assets/photos/IMG_6423.jpeg",
  "assets/photos/IMG_6790.jpeg",
  "assets/photos/IMG_8645.jpeg",
];

function initPhotoRails() {
  const tracks = document.querySelectorAll(".photo-rail-track");
  if (!tracks.length) return;

  tracks.forEach(track => {
    if (SCROLL_PHOTOS.length === 0) {
      // Placeholder tiles until real photos are added
      for (let i = 0; i < 10; i++) {
        const ph = document.createElement("div");
        ph.className = "photo-rail-placeholder";
        ph.textContent = "[ photo ]";
        track.appendChild(ph);
      }
      return;
    }

    // Duplicate the list so the loop is seamless — animation runs to -50%
    // which lands exactly back at the start of the original set
    [...SCROLL_PHOTOS, ...SCROLL_PHOTOS].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      track.appendChild(img);
    });
  });
}

// ── END SCROLL PHOTO RAILS ────────────────────────────────────────────────────

// ── GALLERY ───────────────────────────────────────────────────────────────────
// Add or remove photos here. caption is optional — leave "" to show ref only.
const GALLERY_PHOTOS = [
  { src: "assets/photos/scroll/FullSizeRender.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_0161.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_0951.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_1102.JPG", caption: "" },
  { src: "assets/photos/scroll/IMG_2063.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_2789.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_6965.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_7466.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_7505.jpeg", caption: "" },
  { src: "assets/photos/scroll/IMG_8238.jpeg", caption: "" },
  { src: "assets/photos/IMG_0771.jpeg", caption: "" },
  { src: "assets/photos/IMG_1492.jpeg", caption: "" },
  { src: "assets/photos/IMG_2369.jpeg", caption: "" },
  { src: "assets/photos/IMG_2471.jpeg", caption: "" },
  { src: "assets/photos/IMG_2828.jpeg", caption: "" },
  { src: "assets/photos/IMG_6416.jpeg", caption: "" },
  { src: "assets/photos/IMG_6423.jpeg", caption: "" },
  { src: "assets/photos/IMG_6790.jpeg", caption: "" },
  { src: "assets/photos/IMG_8645.jpeg", caption: "" },
];

function initGallery() {
  const wall = document.getElementById("evidence-wall");
  const countEl = document.getElementById("gallery-count");
  if (!wall) return;

  if (countEl) countEl.textContent = String(GALLERY_PHOTOS.length);

  GALLERY_PHOTOS.forEach((photo, i) => {
    const ref = String(i + 1).padStart(3, "0");

    const print = document.createElement("div");
    print.className = "proof-print";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || "";
    img.loading = "lazy";

    const meta = document.createElement("div");
    meta.className = "proof-meta";

    const refEl = document.createElement("span");
    refEl.className = "proof-ref";
    refEl.textContent = `[${ref}]`;
    meta.appendChild(refEl);

    if (photo.caption) {
      const capEl = document.createElement("span");
      capEl.className = "proof-caption";
      capEl.textContent = photo.caption;
      meta.appendChild(capEl);
    }

    print.appendChild(img);
    print.appendChild(meta);
    wall.appendChild(print);
  });
}

// ── END GALLERY ───────────────────────────────────────────────────────────────

// ── HOLD INSPECTOR (3D viewer) ────────────────────────────────────────────────

function initHoldViewer() {
  const productRows = document.querySelectorAll("tr.product-row");
  if (!productRows.length) return;
  let openCode = null;

  function openViewer(code) {
    const vr = document.querySelector(`.viewer-row[data-for="${code}"]`);
    const pr = document.querySelector(`tr.product-row[data-product="${code}"]`);
    if (!vr) return;
    const mv = vr.querySelector("model-viewer.hold-viewer");
    const fb = vr.querySelector(".viewer-fallback");
    if (mv && !mv.getAttribute("src")) {
      mv.setAttribute("src", `assets/models/${code.toLowerCase()}.glb`);
      mv.addEventListener("error", () => {
        mv.style.display = "none";
        if (fb) fb.style.display = "block";
      }, { once: true });
    }
    vr.classList.add("is-open");
    if (pr) pr.classList.add("row-active");
    openCode = code;
  }

  function closeViewer(code) {
    const vr = document.querySelector(`.viewer-row[data-for="${code}"]`);
    const pr = document.querySelector(`tr.product-row[data-product="${code}"]`);
    if (vr) vr.classList.remove("is-open");
    if (pr) pr.classList.remove("row-active");
    openCode = null;
  }

  productRows.forEach(row => {
    row.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      const code = row.getAttribute("data-product");
      if (!code) return;
      if (openCode === code) { closeViewer(code); }
      else { if (openCode) closeViewer(openCode); openViewer(code); }
    });
  });

  document.querySelectorAll(".viewer-close").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      if (openCode) closeViewer(openCode);
    });
  });

  // open first product by default
  const firstCode = productRows[0] && productRows[0].getAttribute("data-product");
  if (firstCode) openViewer(firstCode);
}

// ── END HOLD INSPECTOR ────────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  initPhotoRails();
  initGallery();
  initHoldViewer();
  const key = "underarock-visitor-count";
  const current = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(current));

  const countEl = document.getElementById("visitor-count");
  if (countEl) {
    countEl.textContent = String(current);
  }

  const updatedEl = document.getElementById("last-updated");
  if (updatedEl) {
    updatedEl.textContent = new Date().toLocaleDateString();
  }

  const orderForm = document.getElementById("order-form");
  const itemSelect = document.getElementById("order-item");
  const statusEl = document.getElementById("order-status");
  const params = new URLSearchParams(window.location.search);
  const requestedItem = params.get("item");

  if (itemSelect && requestedItem) {
    const optionExists = Array.from(itemSelect.options).some((opt) => opt.value === requestedItem);
    if (optionExists) {
      itemSelect.value = requestedItem;
    }
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(orderForm);
      const item = data.get("item");
      const size = data.get("size");
      const qty = data.get("qty");
      const name = data.get("name");
      const email = data.get("email");
      const notes = data.get("notes");

      const subject = encodeURIComponent(`Under A Rock order request: ${item}`);
      const body = encodeURIComponent(
        [
          "New order request",
          "",
          `Item: ${item}`,
          `Size: ${size}`,
          `Quantity: ${qty}`,
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "Notes:",
          `${notes}`
        ].join("\n")
      );

      window.location.href = `mailto:orders@under-a-rock.org?subject=${subject}&body=${body}`;

      if (statusEl) {
        statusEl.textContent =
          "Mail app opened with your order draft. If it did not open, email orders@under-a-rock.org.";
      }
    });
  }
});
