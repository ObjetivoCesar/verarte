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
    { id: 'arreglos', label: 'Arreglos Florales', emoji: '🌷', page: 'arreglos florales.webp', priceMin: 20, priceMax: 50 },
    { id: 'bouquets', label: 'Bouquets', emoji: '💐', page: 'bouquets - b.webp', priceMin: 2.5, priceMax: 37 },
    { id: 'desayunos', label: 'Desayunos', emoji: '🥞', page: 'Desayuno Girl Power.webp', priceMin: 20, priceMax: 26 },
    { id: 'rosas_eternas', label: 'Rosas Eternas', emoji: '✨', page: 'rosas eternas.webp', priceMin: 2.5, priceMax: 25 },
    { id: 'vino', label: 'Con Vino', emoji: '🍷', page: 'arreglos con vino.webp', priceMin: 25, priceMax: 33 },
    { id: 'fruta', label: 'Con Fruta', emoji: '🍓', page: 'arreglos con fruta.webp', priceMin: 20, priceMax: 35 },
    { id: 'maquillaje', label: 'Con Maquillaje', emoji: '💄', page: 'Arreglo bouquets con maquillaje.webp', priceMin: 23, priceMax: 30 },
];

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────
const PRODUCTS = [
    // ROSAS ETERNAS (Page 26 & others)
    {
        code: 'RE1', name: 'Rosa Eterna en Cúpula', cat: 'rosas_eternas', price: 18, page: 'rosas eternas.webp', emoji: '🌟',
        desc: 'Rosa eterna natural preservada en cúpula de cristal con base de madera decorada. Un detalle que simboliza el amor eterno.'
    },
    {
        code: 'RE2', name: 'Box Premium Rosa Eterna', cat: 'rosas_eternas', price: 25, page: 'rosas eternas 2.webp', emoji: '🎁',
        desc: 'Elegante box decorado con rosa eterna natural preservada y detalles especiales. Ideal para un regalo inolvidable.'
    },
    { code: 'RE_BM1', name: 'Bouquet con Tulipanes', cat: 'rosas_eternas', price: 4, page: 'rosas eternas.webp', emoji: '🌷', desc: 'Precioso bouquet de tulipanes naturales. Código: BM1' },
    { code: 'RE_BM2', name: 'Bouquet con 1 Rosa', cat: 'rosas_eternas', price: 2.50, page: 'rosas eternas.webp', emoji: '🌹', desc: 'Detalle clásico con una rosa natural. Código: BM2' },
    { code: 'RE_BML3', name: 'Bouquet con Rosas, Lirios y Chocolates', cat: 'rosas_eternas', price: 10, page: 'rosas eternas.webp', emoji: '🍫', desc: 'Combinación dulce y floral. Código: BML3' },
    { code: 'RE_BML4', name: 'Bouquet en Caja con Tulipanes', cat: 'rosas_eternas', price: 17, page: 'rosas eternas.webp', emoji: '🌷', desc: 'Elegante presentación en caja con tulipanes. Código: BML4' },

    // DESAYUNOS
    {
        code: 'DGP1', name: 'Desayuno Girl Power', cat: 'desayunos', price: 26, page: 'Desayuno Girl Power.webp', emoji: '🥞',
        desc: 'Desayunador de madera decorado · Bouquet de Flores · Collage de 3 fotos · Huma/Tamal · Bandeja con mini pancitos · Mantequilla y mermelada · Jugo · Café · Ensalada de frutas con yogurt · Chocolates · Decoración Día de la Mujer'
    },
    {
        code: 'DBW2', name: 'Desayuno Beautiful Woman', cat: 'desayunos', price: 20, page: 'Desayuno Beatiful  Woman.webp', emoji: '🌸',
        desc: 'Caja decorada · Bouquet de Flores · Huma/Tamal · Mini pancito · Jugo · Mantequilla y mermelada · Café · Ensalada de frutas con yogurt · Decoración Día de la Mujer'
    },
    // BOUQUETS UNITARIOS (Page 11 & 12)
    { code: 'BUR1', name: 'Mini Bouquet con 1 Rosa', cat: 'bouquets', price: 2.50, page: 'bouquets-unitarios.webp', emoji: '🌹' },
    { code: 'BUGI2', name: 'Mini Bouquet con 1 Girasol', cat: 'bouquets', price: 2.50, page: 'bouquets-unitarios.webp', emoji: '🌻' },
    { code: 'BUR3', name: 'Mini Bouquet con 1 Rosa', cat: 'bouquets', price: 3.50, page: 'bouquets-unitarios 3.webp', emoji: '🌹' },
    { code: 'BUGE4', name: 'Mini Bouquet con 1 Gerbera', cat: 'bouquets', price: 3.50, page: 'bouquets-unitarios 4.webp', emoji: '🌸' },
    { code: 'BUR5', name: 'Mini Bouquet con Rosa y variedad', cat: 'bouquets', price: 4, page: 'bouquets-unitarios 2.webp', emoji: '💐' },
    { code: 'BUR6', name: 'Mini Bouquet con Rosa', cat: 'bouquets', price: 4, page: 'bouquets-unitarios 2.webp', emoji: '🌹' },
    { code: 'BUR7', name: 'Mini Bouquet con Rosas', cat: 'bouquets', price: 6, page: 'bouquets-unitarios 2.webp', emoji: '🌹' },
    { code: 'BUR8', name: 'Mini Bouquet con Rosas y variedad', cat: 'bouquets', price: 6, page: 'bouquets-unitarios 2.webp', emoji: '💐' },
    // BOUQUETS SMALL (Page 13)
    { code: 'BSR1', name: 'Mini Bouquet con Rosas y variedad', cat: 'bouquets', price: 9, page: 'bouquets-small.webp', emoji: '🌺' },
    { code: 'BSR2', name: 'Mini Bouquet con Rosas', cat: 'bouquets', price: 8, page: 'bouquets-small.webp', emoji: '🌷' },
    { code: 'BSGI3', name: 'Mini Bouquet con Girasol, Rosas y Ferreros', cat: 'bouquets', price: 12, page: 'bouquets-small.webp', emoji: '🌻' },
    { code: 'BSGE4', name: 'Mini Bouquet con Girasol, Rosas y Ferreros', cat: 'bouquets', price: 12, page: 'bouquets-small.webp', emoji: '🌻' },
    // BOUQUETS (Page 14-17)
    { code: 'BM1', name: 'Bouquet Rosa Pastel y Babyblue', cat: 'bouquets', price: 15, page: 'bouquets-a.webp', emoji: '💐' },
    { code: 'BM2', name: 'Bouquet Mix de Rosa y Chocolates', cat: 'bouquets', price: 20, page: 'bouquets-a.webp', emoji: '🍫' },
    { code: 'BML3', name: 'Bouquet con Rosas, Lirios y Chocolates', cat: 'bouquets', price: 20, page: 'bouquets-a.webp', emoji: '🌸' },
    { code: 'BML4', name: 'Bouquet con Rosas y lirios', cat: 'bouquets', price: 22, page: 'bouquets-a.webp', emoji: '🍫' },
    { code: 'BM5', name: 'Arreglo con Rosas y Gerbera', cat: 'bouquets', price: 25, page: 'bouquets - b.webp', emoji: '🌷' },
    { code: 'BM6', name: 'Bouquet con Rosas', cat: 'bouquets', price: 12, page: 'bouquets - b.webp', emoji: '🌹' },
    { code: 'BM7', name: 'Bouquet con Rosas', cat: 'bouquets', price: 15, page: 'bouquets - b.webp', emoji: '🌹' },
    { code: 'BM8', name: 'Bouquet con Rosas y Girasol', cat: 'bouquets', price: 12, page: 'bouquets - b.webp', emoji: '🌻' },
    { code: 'BML8', name: 'Bouquet con Rosa y Lirios', cat: 'bouquets', price: 15, page: 'bouquets - c.webp', emoji: '🌸' },
    { code: 'BM9', name: 'Bouquet con Rosa y BabyBlue', cat: 'bouquets', price: 12, page: 'bouquets - c.webp', emoji: '💙' },
    { code: 'BM10', name: 'Bouquet con Rosa y BabyBlue', cat: 'bouquets', price: 15, page: 'bouquets - c.webp', emoji: '💙' },
    { code: 'BML11', name: 'Bouquet con Rosas y Lirios', cat: 'bouquets', price: 20, page: 'bouquets - c.webp', emoji: '🌸' },
    { code: 'BM12', name: 'Bouquet con Rosa y Ferrero', cat: 'bouquets', price: 37, page: 'bouquets-a.webp', emoji: '🍫' },
    { code: 'BM13', name: 'Bouquet con Rosa y Lirios', cat: 'bouquets', price: 20, page: 'bouquets-a.webp', emoji: '🌸' },
    { code: 'BM14', name: 'Bouquet con Chocolates', cat: 'bouquets', price: 25, page: 'bouquets-a.webp', emoji: '🍫' },
    { code: 'BM15', name: 'Bouquet Especial', cat: 'bouquets', price: 25, page: 'bouquets-a.webp', emoji: '💐' },

    // ARREGLOS CON VINO (Page 18)
    { code: 'AV1', name: 'Arreglo con Vino y Girasoles', cat: 'vino', price: 30, page: 'arreglos con vino.webp', emoji: '🍷' },
    { code: 'AV2', name: 'Arreglo con Vino y Chocolates', cat: 'vino', price: 30, page: 'arreglos con vino.webp', emoji: '🍷' },
    { code: 'AV3', name: 'Arreglo con Vino, Rosas y Chocolates', cat: 'vino', price: 33, page: 'arreglos con vino.webp', emoji: '🍷' },
    { code: 'AV4', name: 'Arreglo con Vino', cat: 'vino', price: 25, page: 'arreglos con vino.webp', emoji: '🍾' },

    // ARREGLOS FLORALES (Page 19-21)
    { code: 'AF1', name: 'Florero de Cristal', cat: 'arreglos', price: 22, page: 'arreglos florales.webp', emoji: '🌷' },
    { code: 'AF2', name: 'Arreglo Floral', cat: 'arreglos', price: 25, page: 'arreglos florales.webp', emoji: '🌸' },
    { code: 'AF3', name: 'Arreglo Floral', cat: 'arreglos', price: 25, page: 'arreglos florales.webp', emoji: '🌸' },
    { code: 'AF4', name: 'Florero de Cristal', cat: 'arreglos', price: 20, page: 'arreglos florales.webp', emoji: '🌷' },
    { code: 'AF5', name: 'Arreglo con Rosas y Fresas con Chocolate', cat: 'arreglos', price: 27, page: 'arreglos florales 2.webp', emoji: '🍓' },
    { code: 'AF6', name: 'Arreglo Floral Premium', cat: 'arreglos', price: 40, page: 'arreglos florales 2.webp', emoji: '❤️' },
    { code: 'AF7', name: 'Florero de Cristal con Gerberas', cat: 'arreglos', price: 30, page: 'arreglos florales 2.webp', emoji: '🌺' },
    { code: 'AF8', name: 'Corazón con Ferreros y Cervezas modelo', cat: 'arreglos', price: 49, page: 'arreglos florales 2.webp', emoji: '🌸' },
    { code: 'AF9', name: 'Arreglo Floral Primaveral', cat: 'arreglos', price: 28, page: 'arreglos florales 3.webp', emoji: '💐' },
    { code: 'AF10', name: 'Arreglo Floral Sol y Sombra', cat: 'arreglos', price: 35, page: 'arreglos florales 3.webp', emoji: '🌷' },
    { code: 'AF11', name: 'Arreglo Floral Jardín', cat: 'arreglos', price: 28, page: 'arreglos florales 3.webp', emoji: '🌸' },
    { code: 'AF12', name: 'Arreglo Floral Orquídea', cat: 'arreglos', price: 30, page: 'arreglos florales 3.webp', emoji: '🌺' },

    // ARREGLOS EN BASE DE CRISTAL (Page 22)
    { code: 'AC1', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 25, page: 'arreglos con base de cristal.webp', emoji: '💎' },
    { code: 'AC2', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 35, page: 'arreglos con base de cristal.webp', emoji: '💎' },
    { code: 'AC3', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 35, page: 'arreglos con base de cristal.webp', emoji: '💎' },
    { code: 'AC4', name: 'Arreglo con Base de Cristal', cat: 'arreglos', price: 40, page: 'arreglos con base de cristal.webp', emoji: '💎' },

    // FRUTA (Page 23)
    { code: 'AFR1', name: 'Arreglo con Fruta', cat: 'fruta', price: 25, page: 'arreglos con fruta.webp', emoji: '🍓' },
    { code: 'AFR2', name: 'Arreglo con Fruta Especial', cat: 'fruta', price: 20, page: 'arreglos con fruta.webp', emoji: '🍊' },
    { code: 'AFR3', name: 'Arreglo con Fruta Premium', cat: 'fruta', price: 22, page: 'arreglos con fruta.webp', emoji: '🍉' },
    { code: 'AFR4', name: 'Arreglo Frutal de Lujo', cat: 'fruta', price: 35, page: 'arreglos con fruta.webp', emoji: '🍉' },

    // MAQUILLAJE (Page 24)
    { code: 'MAQ1', name: 'Bouquet Mix de Rosa y Chocolates + Maq.', cat: 'maquillaje', price: 30, page: 'Arreglo bouquets con maquillaje.webp', emoji: '💄' },
    { code: 'MAQ2', name: 'Bouquet Rosa Pastel + Maquillaje', cat: 'maquillaje', price: 23, page: 'Arreglo bouquets con maquillaje.webp', emoji: '💄' },
    { code: 'MAQ3', name: 'Bouquet Rosas y Lirios + Maquillaje', cat: 'maquillaje', price: 30, page: 'Arreglo bouquets con maquillaje.webp', emoji: '💄' },
    { code: 'MAQ4', name: 'Bouquet Rosas, Lirios y Choc. + Maquillaje', cat: 'maquillaje', price: 25, page: 'Arreglo bouquets con maquillaje.webp', emoji: '💄' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const catPageSrc = (page) => {
    if (page.includes('.')) return `public/images/catalog/${page}`;
    return `public/images/catalog/${page}.jpg`;
};
const catInfo = (catId) => CATEGORY_DISPLAY.find(c => c.id === catId);
const calculateShipping = (d) => {
    if (!d || d <= 0) return 0.00;
    if (d <= 1.5) return 1.50;
    if (d < 3.0) return 1.75;
    return 2.00 + Math.floor(d - 3) * 0.25;
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────
function initNavbar() {
    const hamburger = $('#nav-hamburger');
    const links = $('.nav-links');

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
                ${pageVariants.length > 1 ? `
                <select id="modal-variant-select" class="form-control" style="margin-bottom: 1.5rem; background: rgba(255,255,255,0.1); border-color: var(--gold); font-size: 0.85rem; padding: 0.75rem 0.5rem;">
                    ${pageVariants.map(v => `<option value="${v.code}" ${v.code === selected.code ? 'selected' : ''}>${v.code}: $${v.price.toFixed(2)} — ${v.name}</option>`).join('')}
                </select>
                ` : `
                <div class="modal-spec-row">
                    <span class="modal-spec-label">💰 Precio</span>
                    <span class="modal-spec-value">$${selected.price.toFixed(2)}</span>
                </div>
                `}
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
    const sel = $('#f-codigo');
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Selecciona un detalle…';
    sel.appendChild(defaultOpt);

    CATEGORY_DISPLAY.forEach(cat => {
        const group = document.createElement('optgroup');
        group.label = cat.emoji + ' ' + cat.label;
        PRODUCTS.filter(p => p.cat === cat.id).forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.code;
            opt.dataset.price = p.price;
            opt.dataset.name = p.name;
            opt.textContent = `${p.code} — ${p.name} ($${p.price.toFixed(2)})`;
            group.appendChild(opt);
        });
        sel.appendChild(group);
    });
}

window.selectProductInForm = function (code) {
    const sel = $('#f-codigo');
    sel.value = code;
    document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => sel.focus(), 500);
};

function buildWhatsAppFromForm(data) {
    const lines = [
        '🌸 *ORDEN DE PEDIDO — VerArteLoja*', '',
        `1. Remitente: ${data.remitente}`,
        `2. Código: *${data.codigo}* — ${data.producto} ($${data.precio})`, '',
        '*📍 Datos de entrega:*',
        `3. Barrio: ${data.barrio}`, `4. N° Casa: ${data.numCasa}`,
        `5. Calle Principal: ${data.callePrincipal}`, `6. Calle Secundaria: ${data.calleSecundaria}`,
        `7. Referencia: ${data.referencia}`,
        `8. Distancia: ${data.distancia} km — *Envío: $${data.envio}*`, '',
        '*👤 Datos de quien recibe:*',
        `9. Nombre: ${data.destinatario}`, `10. Celular: ${data.celular}`, '',
        '*🕐 Entrega:*', `11. Hora: ${data.hora}`, `12. Fecha: ${data.fecha}`, '',
        `💌 Mensaje: ${data.mensaje || '(sin mensaje)'}`,
    ];
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function initForm() {
    const form = $('#order-form');
    const distInput = $('#f-distancia');
    const shipResult = $('#shipping-result');

    if (distInput) {
        distInput.addEventListener('input', () => {
            const val = parseFloat(distInput.value);
            const cost = calculateShipping(val);
            shipResult.textContent = `Envío: $${cost.toFixed(2)}`;
            shipResult.classList.add('pulse');
            setTimeout(() => shipResult.classList.remove('pulse'), 500);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = $('#submit-btn');
        const feedback = $('#form-feedback');
        const sel = $('#f-codigo');
        const selectedOpt = sel.options[sel.selectedIndex];
        const distVal = parseFloat(distInput.value || 0);

        const data = {
            remitente: $('#f-remitente').value.trim(),
            codigo: sel.value,
            producto: selectedOpt?.dataset.name || '',
            precio: selectedOpt?.dataset.price || '',
            barrio: $('#f-barrio').value.trim(),
            numCasa: $('#f-numcasa').value.trim(),
            callePrincipal: $('#f-calle1').value.trim(),
            calleSecundaria: $('#f-calle2').value.trim(),
            referencia: $('#f-referencia').value.trim(),
            distancia: distVal,
            envio: calculateShipping(distVal).toFixed(2),
            destinatario: $('#f-destinatario').value.trim(),
            celular: $('#f-celular').value.trim(),
            hora: $('#f-hora').value,
            fecha: $('#f-fecha').value,
            mensaje: $('#f-mensaje').value.trim(),
        };

        if (!data.remitente || !data.codigo || !data.destinatario || !data.celular || !distInput.value) {
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
    $('#product-modal').addEventListener('click', e => { if (e.target === $('#product-modal')) closeModal(); });
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
