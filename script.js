/* =========================================================
   VerArteLoja — script.js v2
   ========================================================= */

const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxRoroADucatz_MaCWUTUBYM8Ao3P4yP4Lnq0zGbPpLoyK6l0BOF8l4m7waXjx3XfhqvQ/exec', // Paste Apps Script Web App URL here after setup
    WHATSAPP_NUMBER: '593999372331',
    CATALOG_URL: 'Catalogo dia de la mujer 2026_20260306_094416_0000.pdf',
    MAPS_URL: 'https://maps.app.goo.gl/ntenis6eNLW2rySBA',
    STORE_LOCATION: { lat: -4.00104, lng: -79.20039 }, // Loja, EC
};

// ─── CATEGORY DEFINITIONS ─────────────────────────────────────────────────
const CATEGORY_DISPLAY = [
    { id: 'desayunos', label: 'Desayunos', emoji: '🥞', page: 'p08n.webp', priceMin: 20, priceMax: 26 },
    { id: 'bouquets', label: 'Bouquets', emoji: '💐', page: 'p14n.webp', priceMin: 2.5, priceMax: 37 },
    { id: 'vino', label: 'Con Vino', emoji: '🍷', page: 'p18n.webp', priceMin: 25, priceMax: 33 },
    { id: 'arreglos', label: 'Arreglos Florales', emoji: '🌷', page: 'p19n.webp', priceMin: 20, priceMax: 50 },
    { id: 'fruta', label: 'Con Fruta', emoji: '🍓', page: 'p24n.webp', priceMin: 20, priceMax: 35 },
    { id: 'maquillaje', label: 'Con Maquillaje', emoji: '💄', page: 'p25n.webp', priceMin: 23, priceMax: 30 },
    { id: 'rosas_eternas', label: 'Rosas Eternas', emoji: '✨', page: 'p26n.webp', priceMin: 18, priceMax: 25 },
];

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────
const PRODUCTS = [
    // DESAYUNOS (Page 8-9)
    {
        code: 'DGP (P8)', name: 'Desayuno Girl Power', cat: 'desayunos', price: 26, page: 'p08n.webp', emoji: '🥞',
        desc: 'Desayunador de madera decorado · Bouquet de Flores · Collage de 3 fotos · Huma/Tamal · Bandeja con mini pancitos · Mantequilla y mermelada · Jugo · Café · Ensalada de frutas con yogurt · Chocolates'
    },
    {
        code: 'DBW (P9)', name: 'Desayuno Beautiful Woman', cat: 'desayunos', price: 20, page: 'p09n.webp', emoji: '🌸',
        desc: 'Caja decorada · Bouquet de Flores · Huma/Tamal · Mini pancito · Jugo · Mantequilla y mermelada · Café · Ensalada de frutas con yogurt'
    },

    // BOUQUETS UNITARIOS (Page 11)
    { code: 'BUR1 (P11)', name: 'Mini Bouquet con 1 Rosa', cat: 'bouquets', price: 2.50, page: 'p11n.webp', emoji: '🌹' },
    { code: 'BUGI2 (P11)', name: 'Mini Bouquet con 1 Girasol', cat: 'bouquets', price: 3.50, page: 'p11n.webp', emoji: '🌻' },
    { code: 'BUR3 (P11)', name: 'Mini Bouquet con 1 Rosa', cat: 'bouquets', price: 2.50, page: 'p11n.webp', emoji: '🌹' },
    { code: 'BUGE4 (P11)', name: 'Mini Bouquet con 1 Gerbera', cat: 'bouquets', price: 3.50, page: 'p11n.webp', emoji: '🌸' },

    // BOUQUETS UNITARIOS (Page 12)
    { code: 'BUR5 (P12)', name: 'Mini Bouquet con Rosa y variedad', cat: 'bouquets', price: 4, page: 'p12n.webp', emoji: '💐' },
    { code: 'BUR6 (P12)', name: 'Mini Bouquet con Rosa', cat: 'bouquets', price: 4, page: 'p12n.webp', emoji: '🌹' },
    { code: 'BUR7 (P12)', name: 'Mini Bouquet con Rosas', cat: 'bouquets', price: 6, page: 'p12n.webp', emoji: '🌹' },
    { code: 'BUR8 (P12)', name: 'Mini Bouquet con Rosas y variedad', cat: 'bouquets', price: 6, page: 'p12n.webp', emoji: '💐' },

    // BOUQUETS SMALL (Page 13)
    { code: 'BSR1 (P13)', name: 'Mini Bouquet con Rosas y variedad', cat: 'bouquets', price: 9, page: 'p13n.webp', emoji: '🌺' },
    { code: 'BSR2 (P13)', name: 'Mini Bouquet con Rosas', cat: 'bouquets', price: 9, page: 'p13n.webp', emoji: '🌷' },
    { code: 'BSGI3 (P13)', name: 'Mini Bouquet con Girasol, Rosas y Ferreros', cat: 'bouquets', price: 12, page: 'p13n.webp', emoji: '🌻' },
    { code: 'BSGE4 (P13)', name: 'Mini Bouquet con Girasol, Rosas y Ferreros', cat: 'bouquets', price: 12, page: 'p13n.webp', emoji: '🌻' },

    // BOUQUETS (Page 14)
    { code: 'BM1 (P14)', name: 'Bouquet Rosa Pastel y Babyblue', cat: 'bouquets', price: 15, page: 'p14n.webp', emoji: '💐' },
    { code: 'BM2 (P14)', name: 'Bouquet Mix de Rosa y Chocolates', cat: 'bouquets', price: 20, page: 'p14n.webp', emoji: '🍫' },
    { code: 'BML3 (P14)', name: 'Bouquet con Rosas, Lirios y Chocolates', cat: 'bouquets', price: 20, page: 'p14n.webp', emoji: '🌸' },
    { code: 'BML4 (P14)', name: 'Bouquet con Rosas y lirios', cat: 'bouquets', price: 20, page: 'p14n.webp', emoji: '🍫' },

    // BOUQUETS (Page 28)
    { code: 'BG1 (P28)', name: 'Bouquet Especial con chocolates', cat: 'bouquets', price: 20, page: 'p28n.webp', emoji: '🍫' },
    { code: 'BG2 (P28)', name: 'Bouquet Designer', cat: 'bouquets', price: 25, page: 'p28n.webp', emoji: '💐' },
    { code: 'BG3 (P28)', name: 'Bouquet Premium Rosa y Variedad', cat: 'bouquets', price: 35, page: 'p28n.webp', emoji: '🌹' },
    { code: 'BG4 (P28)', name: 'Bouquet con Rosas y variedad', cat: 'bouquets', price: 30, page: 'p28n.webp', emoji: '🌸' },

    // BOUQUETS (Page 30)
    { code: 'BG5 (P30)', name: 'Bouquet con Rosa y Ferrero (Globo)', cat: 'bouquets', price: 30, page: 'p30n.webp', emoji: '🎈' },
    { code: 'BG6 (P30)', name: 'Bouquet con Rosas y Lirios', cat: 'bouquets', price: 35, page: 'p30n.webp', emoji: '🌸' },
    { code: 'BG7 (P30)', name: 'Bouquet con Mix de Flores', cat: 'bouquets', price: 28, page: 'p30n.webp', emoji: '💐' },
    { code: 'BG8 (P30)', name: 'Bouquet con Rosas Rosadas', cat: 'bouquets', price: 30, page: 'p30n.webp', emoji: '🌹' },

    // BOUQUETS (Page 17)
    { code: 'BM12 (P17)', name: 'Bouquet con Rosa y Ferrero', cat: 'bouquets', price: 37, page: 'p17n.webp', emoji: '🍫' },
    { code: 'BM13 (P17)', name: 'Bouquet con Rosa y Lirios', cat: 'bouquets', price: 20, page: 'p17n.webp', emoji: '🌸' },
    { code: 'BM14 (P17)', name: 'Bouquet con Chocolates', cat: 'bouquets', price: 25, page: 'p17n.webp', emoji: '🍫' },
    { code: 'BM15 (P17)', name: 'Bouquet Especial', cat: 'bouquets', price: 25, page: 'p17n.webp', emoji: '💐' },

    // ARREGLOS CON VINO (Page 18)
    { code: 'AV1 (P18)', name: 'Arreglo con Vino y Girasoles', cat: 'vino', price: 30, page: 'p18n.webp', emoji: '🍷' },
    { code: 'AV2 (P18)', name: 'Arreglo con Vino y Chocolates', cat: 'vino', price: 30, page: 'p18n.webp', emoji: '🍷' },
    { code: 'AV3 (P18)', name: 'Arreglo con Vino', cat: 'vino', price: 25, page: 'p18n.webp', emoji: '🍷' },
    { code: 'AV4 (P18)', name: 'Arreglo con Vino, Rosas y Chocolates', cat: 'vino', price: 33, page: 'p18n.webp', emoji: '🍾' },

    // ARREGLOS FLORALES (Page 19)
    { code: 'AF1 (P19)', name: 'Florero de Cristal', cat: 'arreglos', price: 22, page: 'p19n.webp', emoji: '🌷' },
    { code: 'AF2 (P19)', name: 'Florero de Cristal', cat: 'arreglos', price: 25, page: 'p19n.webp', emoji: '🌸' },
    { code: 'AF3 (P19)', name: 'Florero de Cristal', cat: 'arreglos', price: 20, page: 'p19n.webp', emoji: '🌸' },
    { code: 'AF4 (P19)', name: 'Arreglo Floral Grande', cat: 'arreglos', price: 50, page: 'p19n.webp', emoji: '🌻' },

    // ARREGLOS FLORALES (Page 20)
    { code: 'AF5 (P20)', name: 'Arreglo con Rosas y Fresas con Chocolate', cat: 'arreglos', price: 27, page: 'p20n.webp', emoji: '🍓' },
    { code: 'AF6 (P20)', name: 'Arreglo Floral Premium', cat: 'arreglos', price: 35, page: 'p20n.webp', emoji: '❤️' },
    { code: 'AF7 (P20)', name: 'Florero de Cristal con Gerberas', cat: 'arreglos', price: 25, page: 'p20n.webp', emoji: '🌺' },
    { code: 'AF8 (P20)', name: 'Corazón con Ferreros y Cervezas', cat: 'arreglos', price: 49, page: 'p20n.webp', emoji: '🌸' },

    // ARREGLOS FLORALES (Page 21-22)
    { code: 'AF9 (P22)', name: 'Arreglo Floral Primavera', cat: 'arreglos', price: 25, page: 'p22n.webp', emoji: '💐' },
    { code: 'AF10 (P22)', name: 'Arreglo Floral Sol y Sombra', cat: 'arreglos', price: 35, page: 'p22n.webp', emoji: '🌷' },
    { code: 'AF11 (P22)', name: 'Arreglo Floral Jardín', cat: 'arreglos', price: 28, page: 'p22n.webp', emoji: '🌸' },
    { code: 'AF12 (P22)', name: 'Arreglo Floral Orquídea', cat: 'arreglos', price: 30, page: 'p22n.webp', emoji: '🌺' },

    // ARREGLOS EN BASE DE CRISTAL (Page 23)
    { code: 'AC1 (P23)', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 25, page: 'p23n.webp', emoji: '💎' },
    { code: 'AC2 (P23)', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 30, page: 'p23n.webp', emoji: '💎' },
    { code: 'AC3 (P23)', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 30, page: 'p23n.webp', emoji: '💎' },
    { code: 'AC4 (P23)', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 40, page: 'p23n.webp', emoji: '💎' },

    // ARREGLOS CON FRUTA (Page 24)
    { code: 'BM1 (P24)', name: 'Arreglo con Fruta y Girasoles', cat: 'fruta', price: 25, page: 'p24n.webp', emoji: '🍓' },
    { code: 'BM2 (P24)', name: 'Arreglo con Fruta y Rosas', cat: 'fruta', price: 20, page: 'p24n.webp', emoji: '🍊' },
    { code: 'BML3 (P24)', name: 'Arreglo con Fruta y Lirios', cat: 'fruta', price: 22, page: 'p24n.webp', emoji: '🍉' },
    { code: 'BML4 (P24)', name: 'Arreglo con Fruta, Rosas y Lirios', cat: 'fruta', price: 35, page: 'p24n.webp', emoji: '🍉' },

    // BOUQUETS CON MAQUILLAJE (Page 25)
    { code: 'BM1 (P25)', name: 'Bouquet Rosa Pastel y Babyblue + Maq.', cat: 'maquillaje', price: 30, page: 'p25n.webp', emoji: '💄' },
    { code: 'BM2 (P25)', name: 'Bouquet Mix de Rosa y Chocolates + Maq.', cat: 'maquillaje', price: 23, page: 'p25n.webp', emoji: '💄' },
    { code: 'BML3 (P25)', name: 'Bouquet con Rosas, Lirios y Chocolates + Maq.', cat: 'maquillaje', price: 30, page: 'p25n.webp', emoji: '💄' },
    { code: 'BML4 (P25)', name: 'Bouquet con Rosas y lirios + Maq.', cat: 'maquillaje', price: 25, page: 'p25n.webp', emoji: '💄' },

    // ROSAS ETERNAS (Page 26)
    { code: 'BM1 (P26)', name: 'Bouquet con Tulipanes (Eterna)', cat: 'rosas_eternas', price: 4, page: 'p26n.webp', emoji: '🌷' },
    { code: 'BM2 (P26)', name: 'Bouquet con 1 Rosa (Eterna)', cat: 'rosas_eternas', price: 2.50, page: 'p26n.webp', emoji: '🌹' },
    { code: 'BML3 (P26)', name: 'Bouquet con Rosas, Lirios y Chocolates (Eterna)', cat: 'rosas_eternas', price: 10, page: 'p26n.webp', emoji: '🍫' },
    { code: 'BML4 (P26)', name: 'Bouquet en Caja con Tulipanes (Eterna)', cat: 'rosas_eternas', price: 17, page: 'p26n.webp', emoji: '🌷' },

    // ROSAS ETERNAS (Page 27)
    { code: 'BM1 (P27)', name: 'Bouquet con Tulipanes (Eterna Agotado)', cat: 'rosas_eternas', price: 20, page: 'p27n.webp', emoji: '🌷' },
    { code: 'BM2 (P27)', name: 'Bouquet con 1 Rosa (Eterna)', cat: 'rosas_eternas', price: 2.50, page: 'p27n.webp', emoji: '🌹' },
    { code: 'BML3 (P27)', name: 'Bouquet con Rosas, Lirios y Chocolates (Eterna)', cat: 'rosas_eternas', price: 10, page: 'p27n.webp', emoji: '🍫' },
    { code: 'BML4 (P27)', name: 'Bouquet en Caja con Tulipanes (Eterna)', cat: 'rosas_eternas', price: 17, page: 'p27n.webp', emoji: '🌷' },
];


// ─── HELPERS ──────────────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const catPageSrc = (page) => {
    if (page.includes('.')) return `public/images/catalog/${page}`;
    return `public/images/catalog/${page}.jpg`;
};
const catInfo = (catId) => CATEGORY_DISPLAY.find(c => c.id === catId);

// ─── NAVBAR ───────────────────────────────────────────────────────────────
function initNavbar() {
    const hamburger = $('#nav-hamburger');
    const links = $('.nav-links');
    if (!links) return;

    // Create a close button inside the mobile menu
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Cerrar menú');
    links.insertBefore(closeBtn, links.firstChild);

    function closeMenu() {
        links.classList.remove('mobile-open');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = links.classList.toggle('mobile-open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close when clicking a link
        $$('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));

        // Close when clicking the X button
        closeBtn.addEventListener('click', closeMenu);

        // Close when clicking the backdrop (since nav-links has the ::before overlay)
        links.addEventListener('click', (e) => {
            if (e.target === links) closeMenu();
        });
    }
}

// ─── CATALOG FILTERS ──────────────────────────────────────────────────────
function buildFilters() {
    const container = $('#catalog-filters');
    if (!container) return;
    CATEGORY_DISPLAY.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (index === 0 ? ' active' : '');
        btn.dataset.filter = cat.id;
        btn.innerHTML = `${cat.emoji} ${cat.label}`;
        btn.addEventListener('click', () => {
            $$('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(cat.id);
        });
        container.appendChild(btn);
    });
}

function filterProducts(catId) {
    $$('.product-card').forEach(card => {
        card.classList.toggle('hidden', card.dataset.cat !== catId);
    });
}

// ─── PRODUCT GRID ─────────────────────────────────────────────────────────
function buildProductGrid() {
    const grid = $('#products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Group products by page image for the grid view
    const uniquePages = [...new Set(PRODUCTS.map(p => p.page))];

    uniquePages.forEach(page => {
        const pageProds = PRODUCTS.filter(p => p.page === page);
        const p = pageProds[0]; // Use first product as representative
        const card = document.createElement('div');
        const cat = catInfo(p.cat);
        const isHidden = p.cat !== CATEGORY_DISPLAY[0].id;

        card.className = `product-card cat-${p.cat}${isHidden ? ' hidden' : ''}`;
        // Store searchable data for all products on this page
        card.dataset.name = pageProds.map(item => item.name.toLowerCase()).join(' ');
        card.dataset.code = pageProds.map(item => item.code.toLowerCase()).join(' ');
        card.dataset.cat = p.cat;

        const imgSrc = catPageSrc(p.page);
        const priceLabel = pageProds.length > 1
            ? `Desde $${Math.min(...pageProds.map(x => x.price)).toFixed(2)}`
            : `$${p.price.toFixed(2)}`;

        card.innerHTML = `
      <img class="card-img" src="${imgSrc}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="card-img-placeholder cat-${p.cat}" style="display:none">${p.emoji}</div>
      <div class="card-overlay">
        <div class="card-price">${priceLabel} <span class="card-price-small">+ envío</span></div>
        <div class="card-name">${pageProds.length > 1 ? 'Varios Detalles' : p.name}</div>
        <div class="card-meta">${cat ? cat.label : ''}${pageProds.length > 1 ? ' (' + pageProds.length + ')' : ''}</div>
        <div class="card-action">${pageProds.length > 1 ? 'Ver modelos' : 'Ver detalle'} <span>→</span></div>
      </div>
    `;
        card.addEventListener('click', () => openProductModal(p));
        grid.appendChild(card);
    });
}

// ─── SEARCH ───────────────────────────────────────────────────────────────
function initSearch() {
    const input = $('#product-search');
    if (!input) return;
    const filters = $('#catalog-filters');
    const stateEl = $('#search-state');
    const stateText = $('#search-state-text');

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
            filters.style.display = 'flex';
            stateEl.classList.remove('visible');
            const activeBtn = $('.filter-btn.active');
            if (activeBtn) filterProducts(activeBtn.dataset.filter);
            return;
        }
        filters.style.display = 'none';
        stateEl.classList.add('visible');

        let count = 0;
        $$('.product-card').forEach(card => {
            const match = card.dataset.name.includes(q) || card.dataset.code.includes(q);
            card.classList.toggle('hidden', !match);
            if (match) count++;
        });
        stateText.textContent = `${count} resultado${count !== 1 ? 's' : ''} para "${input.value.trim()}"`;
    });

    $('#search-reset').addEventListener('click', () => {
        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.focus();
    });
}

// ─── SPLIT MODAL (Category) ───────────────────────────────────────────────
function openCategoryModal(cat) {
    const prods = PRODUCTS.filter(p => p.cat === cat.id);
    const productListHTML = prods.map(p =>
        `<div class="modal-spec-row">
      <span class="modal-spec-label">${p.name}</span>
      <span class="modal-spec-value">$${p.price.toFixed(2)}</span>
    </div>`
    ).join('');

    const waMsg = encodeURIComponent(`Hola VerArteLoja! 🌸 Me interesa la categoría *${cat.label}* ${cat.emoji}. ¿Pueden ayudarme?`);

    $('#modal-left').innerHTML = `
    <img src="${catPageSrc(cat.page)}" alt="${cat.label}"
         style="width:100%;height:100%;object-fit:cover;"
         onerror="this.outerHTML='<div class=\\'modal-left-placeholder cat-${cat.id}\\'>${cat.emoji}</div>'">
  `;
    $('#modal-right').innerHTML = `
    <button id="modal-close" class="modal-close-btn" aria-label="Cerrar">✕</button>
    <div class="modal-cat-tag">${cat.emoji} Categoría</div>
    <h2 class="modal-title">${cat.label}</h2>
    <p class="modal-tagline">$${cat.priceMin} – $${cat.priceMax} · ${prods.length} detalles</p>
    <p class="modal-desc">Todos los arreglos llevan tarjeta y decoración. Los colores pueden variar según stock disponible.</p>
    <div class="modal-specs">
      <div class="modal-specs-title">Detalles disponibles</div>
      ${productListHTML}
    </div>
    <div class="modal-cta">
      <button class="btn btn-primary" onclick="closeModal();document.getElementById('pedido').scrollIntoView({behavior:'smooth'})">✉️ Ir al formulario de pedido</button>
      <a class="btn btn-ghost-white" href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMsg}" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Consultar por WhatsApp
      </a>
    </div>
    <div class="modal-location">📍 Bernardo Valdivieso y Miguel Riofrío Esq. · Loja</div>
  `;
    openModal();
}

// ─── SPLIT MODAL (Product) ────────────────────────────────────────────────
function openProductModal(p) {
    const cat = catInfo(p.cat);
    const pageVariants = PRODUCTS.filter(v => v.page === p.page);

    const updateModalContent = (selected) => {
        const waMsg = encodeURIComponent(`Hola VerArteLoja! 🌸\nMe interesa: *Cod. ${selected.code}* — ${selected.name}\nPrecio: $${selected.price.toFixed(2)} + envío`);

        $('#modal-right').innerHTML = `
            <button id="modal-close" class="modal-close-btn" aria-label="Cerrar">✕</button>
            <div class="modal-cat-tag">${cat ? cat.emoji + ' ' + cat.label.toUpperCase() : ''}</div>
            <h2 class="modal-title">${selected.name}</h2>
            <p class="modal-tagline">"Un detalle que se siente especial"</p>
            <p class="modal-desc">${selected.desc || 'Todos los arreglos llevan tarjeta y decoración especial para el destinatario.'}</p>
            
            <div class="modal-specs">
                <div class="modal-specs-title">Seleccione el detalle:</div>
                <select id="modal-variant-select" class="form-control" 
                        style="margin-bottom: 1.5rem; background: rgba(255,255,255,0.1); border-color: var(--gold); font-size: 0.85rem; padding: 0.75rem 0.6rem; cursor: pointer;">
                    ${pageVariants.map(v => `<option value="${v.code}" ${v.code === selected.code ? 'selected' : ''}>${v.code}: $${v.price.toFixed(2)} — ${v.name}</option>`).join('')}
                </select>
                <div class="modal-spec-row">
                    <span class="modal-spec-label">🚚 Envío</span>
                    <span class="modal-spec-value">Consultar</span>
                </div>
            </div>

            <div class="modal-cta">
                <button class="btn btn-primary" onclick="closeModal();selectProductInForm('${selected.code}')">✉️ Hacer pedido</button>
                <a class="btn btn-ghost-white" href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMsg}" target="_blank" rel="noopener">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Consultar por WhatsApp
                </a>
            </div>
            <div class="modal-location">📍 Bernardo Valdivieso y Miguel Riofrío Esq. · Loja</div>
        `;

        const select = $('#modal-variant-select');
        if (select) {
            select.addEventListener('change', (e) => {
                const newVal = pageVariants.find(v => v.code === e.target.value);
                updateModalContent(newVal);
            });
        }

        // Re-attach close button listener
        const closeBtn = $('#modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
    };

    $('#modal-left').innerHTML = `
        <img src="${catPageSrc(p.page)}" alt="${p.name}"
             style="width:100%;height:100%;object-fit:cover;"
             onerror="this.outerHTML='<div class=\\'modal-left-placeholder cat-${p.cat}\\'>${p.emoji}</div>'">
    `;

    updateModalContent(p);
    openModal();
}

function openModal() {
    const overlay = $('#product-modal');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Re-attach close button listener each time modal is rebuilt
    setTimeout(() => {
        const closeBtn = $('#modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
    }, 10);
}

function closeModal() {
    $('#product-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close on overlay click or Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── FORM ─────────────────────────────────────────────────────────────────
function buildFormSelect() {
    // Se elimina la generación de <select> porque ahora es un campo de texto libre.
}

window.selectProductInForm = function (code) {
    const sel = $('#f-codigo');
    const p = PRODUCTS.find(x => x.code === code);
    sel.value = p ? `${p.code} — ${p.name} ($${p.price.toFixed(2)})` : code;
    document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => sel.focus(), 500);
};

function buildWhatsAppFromForm(data) {
    const lines = [
        '🌸 *ORDEN DE PEDIDO — VerArteLoja*', '',
        `1. Remitente: ${data.remitente}`,
        `2. Detalle elegido: *${data.codigo}*`, '',
        '*📍 Datos de entrega:*',
        `3. Barrio: ${data.barrio}`, `4. N° Casa: ${data.numCasa}`,
        `5. Calle Principal: ${data.callePrincipal}`, `6. Calle Secundaria: ${data.calleSecundaria}`,
        `7. Referencia: ${data.referencia}`,
        `8. Envío: *A consultar con Verito* 🚚`, '',
        '*👤 Datos de quien recibe:*',
        `9. Nombre: ${data.destinatario}`, `10. Celular: ${data.celular}`, '',
        '*🕐 Entrega:*', `11. Hora: ${data.hora}`, `12. Fecha: ${data.fecha}`, '',
        `💌 Mensaje: ${data.mensaje || '(sin mensaje)'}`,
    ];
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function initForm() {
    const form = $('#order-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = $('#submit-btn');
        const feedback = $('#form-feedback');
        const sel = $('#f-codigo');

        const data = {
            remitente: $('#f-remitente').value.trim(),
            codigo: sel.value.trim(),
            producto: '',
            precio: '',
            barrio: $('#f-barrio').value.trim(),
            numCasa: $('#f-numcasa').value.trim(),
            callePrincipal: $('#f-calle1').value.trim(),
            calleSecundaria: $('#f-calle2').value.trim(),
            referencia: $('#f-referencia').value.trim(),
            destinatario: $('#f-destinatario').value.trim(),
            celular: $('#f-celular').value.trim(),
            hora: $('#f-hora').value,
            fecha: $('#f-fecha').value,
            mensaje: $('#f-mensaje').value.trim(),
        };

        if (!data.remitente || !data.codigo || !data.destinatario || !data.celular) {
            feedback.className = 'form-feedback error-msg';
            feedback.textContent = '⚠️ Por favor completa los campos obligatorios marcados con *.';
            return;
        }

        btn.disabled = true; btn.textContent = 'Enviando…';
        feedback.className = 'form-feedback';

        // Always attempt to save to Google Sheets (fire-and-forget, no-cors)
        if (CONFIG.GOOGLE_SCRIPT_URL) {
            fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(data),
            }).catch(err => console.warn('Sheets error:', err));
        }

        // Always open WhatsApp — guaranteed delivery to Verito
        feedback.className = 'form-feedback success';
        feedback.textContent = '✅ ¡Pedido enviado! Abriendo WhatsApp para confirmarlo con Verito… 🌸';
        setTimeout(() => window.open(buildWhatsAppFromForm(data), '_blank'), 500);
        form.reset(); btn.disabled = false; btn.textContent = '✉️ Enviar pedido';
    });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
function initReveal() {
    const ob = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ob.unobserve(e.target); } });
    }, { threshold: .12 });
    $$('.reveal').forEach(el => ob.observe(el));
}

// ─── CATALOG DOWNLOAD ─────────────────────────────────────────────────────
function initCatalogBtn() {
    $$('.js-catalog-download').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const a = document.createElement('a');
            a.href = CONFIG.CATALOG_URL;
            a.download = 'Catalogo-VerArteLoja-DiaDelaMujer2026.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
}

// ─── OVERLAY CLICK ────────────────────────────────────────────────────────
function initModalOverlay() {
    const modal = $('#product-modal');
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

// ─── INIT ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    buildFilters();
    buildProductGrid();
    buildFormSelect();
    initSearch();
    initForm();
    initReveal();
    initCatalogBtn();
    initModalOverlay();
});
