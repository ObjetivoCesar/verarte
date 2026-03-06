/* =========================================================
   VerArteLoja — script.js v2
   ========================================================= */

const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxRoroADucatz_MaCWUTUBYM8Ao3P4yP4Lnq0zGbPpLoyK6l0BOF8l4m7waXjx3XfhqvQ/exec', // Paste Apps Script Web App URL here after setup
    WHATSAPP_NUMBER: '593999372331',
    CATALOG_URL: 'public/catalogo.pdf',
    MAPS_URL: 'https://maps.app.goo.gl/ntenis6eNLW2rySBA',
};

// ─── CATEGORY DEFINITIONS ─────────────────────────────────────────────────
const CATEGORY_DISPLAY = [
    { id: 'desayunos', label: 'Desayunos', emoji: '🥞', page: 'page_09', priceMin: 20, priceMax: 26 },
    { id: 'unitarios', label: 'Mini Bouquets', emoji: '🌸', page: 'page_12', priceMin: 2.5, priceMax: 9 },
    { id: 'small', label: 'Bouquets Small', emoji: '🌺', page: 'page_13', priceMin: 8, priceMax: 15 },
    { id: 'bouquets', label: 'Bouquets', emoji: '💐', page: 'page_17', priceMin: 12, priceMax: 37 },
    { id: 'arreglos', label: 'Arreglos Florales', emoji: '🌷', page: 'page_20', priceMin: 20, priceMax: 50 },
    { id: 'vino', label: 'Con Vino', emoji: '🍷', page: 'page_18', priceMin: 25, priceMax: 33 },
    { id: 'cristal', label: 'Base Cristal', emoji: '💎', page: 'page_22', priceMin: 25, priceMax: 40 },
    { id: 'fruta', label: 'Con Fruta', emoji: '🍓', page: 'page_23', priceMin: 20, priceMax: 35 },
    { id: 'maquillaje', label: 'Con Maquillaje', emoji: '💄', page: 'page_24', priceMin: 23, priceMax: 30 },
];

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────
const PRODUCTS = [
    // DESAYUNOS
    {
        code: 'DGP1', name: 'Desayuno Girl Power', cat: 'desayunos', price: 26, page: 'page_08', emoji: '🥞',
        desc: 'Desayunador de madera decorado · Bouquet de Flores · Collage de 3 fotos · Huma/Tamal · Bandeja con mini pancitos · Mantequilla y mermelada · Jugo · Café · Ensalada de frutas con yogurt · Chocolates · Decoración Día de la Mujer'
    },
    {
        code: 'DBW2', name: 'Desayuno Beautiful Woman', cat: 'desayunos', price: 20, page: 'page_09', emoji: '🌸',
        desc: 'Caja decorada · Bouquet de Flores · Huma/Tamal · Mini pancito · Jugo · Mantequilla y mermelada · Café · Ensalada de frutas con yogurt · Decoración Día de la Mujer'
    },
    // UNITARIOS
    { code: 'BUR1', name: 'Mini Bouquet con 1 Rosa', cat: 'unitarios', price: 2.50, page: 'page_11', emoji: '🌹' },
    { code: 'BUGI2', name: 'Mini Bouquet con 1 Girasol', cat: 'unitarios', price: 2.50, page: 'page_11', emoji: '🌻' },
    { code: 'BUR3', name: 'Mini Bouquet con 1 Rosa', cat: 'unitarios', price: 3.50, page: 'page_11', emoji: '🌹' },
    { code: 'BUGE4', name: 'Mini Bouquet con 1 Gerbera', cat: 'unitarios', price: 3.50, page: 'page_11', emoji: '🌸' },
    { code: 'BUR5', name: 'Mini Bouquet con Rosa y variedad', cat: 'unitarios', price: 6, page: 'page_12', emoji: '💐' },
    { code: 'BUR6', name: 'Mini Bouquet con Rosa', cat: 'unitarios', price: 6, page: 'page_12', emoji: '🌹' },
    { code: 'BUR7', name: 'Mini Bouquet con Rosas', cat: 'unitarios', price: 6, page: 'page_12', emoji: '🌹' },
    { code: 'BUR8', name: 'Mini Bouquet con Rosas y variedad', cat: 'unitarios', price: 9, page: 'page_12', emoji: '💐' },
    // SMALL
    { code: 'BSR1', name: 'Bouquet Small con Rosas y variedad', cat: 'small', price: 8, page: 'page_13', emoji: '🌺' },
    { code: 'BSR2', name: 'Bouquet Small con Rosas', cat: 'small', price: 8, page: 'page_13', emoji: '🌷' },
    { code: 'BSGI3', name: 'Bouquet Small Girasol, Rosas y Ferreros', cat: 'small', price: 12, page: 'page_13', emoji: '🌻' },
    { code: 'BSGE4', name: 'Bouquet Small Girasol, Rosas y Ferreros', cat: 'small', price: 15, page: 'page_13', emoji: '🌻' },
    // BOUQUETS
    { code: 'BM1', name: 'Bouquet Rosa Pastel y Babyblue', cat: 'bouquets', price: 20, page: 'page_14', emoji: '💐' },
    { code: 'BM2', name: 'Bouquet Mix de Rosa y Chocolates', cat: 'bouquets', price: 20, page: 'page_14', emoji: '🍫' },
    { code: 'BML3', name: 'Bouquet con Rosas y Lirios', cat: 'bouquets', price: 22, page: 'page_14', emoji: '🌸' },
    { code: 'BML4', name: 'Bouquet Rosas, Lirios y Chocolates', cat: 'bouquets', price: 22, page: 'page_14', emoji: '🍫' },
    { code: 'BM5', name: 'Arreglo con Rosas y Gerbera', cat: 'bouquets', price: 25, page: 'page_15', emoji: '🌷' },
    { code: 'BM6', name: 'Bouquet con Rosas', cat: 'bouquets', price: 12, page: 'page_15', emoji: '🌹' },
    { code: 'BM7', name: 'Bouquet con Rosas', cat: 'bouquets', price: 25, page: 'page_15', emoji: '🌹' },
    { code: 'BM8', name: 'Bouquet con Rosas y Girasol', cat: 'bouquets', price: 15, page: 'page_15', emoji: '🌻' },
    { code: 'BML8', name: 'Bouquet con Rosa y Lirios', cat: 'bouquets', price: 12, page: 'page_16', emoji: '🌸' },
    { code: 'BM9', name: 'Bouquet con Rosa y BabyBlue', cat: 'bouquets', price: 15, page: 'page_16', emoji: '💙' },
    { code: 'BM10', name: 'Bouquet con Rosa y BabyBlue', cat: 'bouquets', price: 12, page: 'page_16', emoji: '💙' },
    { code: 'BML11', name: 'Bouquet con Rosas y Lirios', cat: 'bouquets', price: 20, page: 'page_16', emoji: '🌸' },
    { code: 'BM12', name: 'Bouquet con Rosa y Ferrero', cat: 'bouquets', price: 20, page: 'page_17', emoji: '🍫' },
    { code: 'BM13', name: 'Bouquet con Rosa y Lirios', cat: 'bouquets', price: 37, page: 'page_17', emoji: '🌸' },
    { code: 'BM14', name: 'Bouquet con Chocolates', cat: 'bouquets', price: 25, page: 'page_17', emoji: '🍫' },
    { code: 'BM15', name: 'Bouquet Especial', cat: 'bouquets', price: 25, page: 'page_17', emoji: '💐' },
    // ARREGLOS CON VINO
    { code: 'AV1', name: 'Arreglo con Vino y Girasoles', cat: 'vino', price: 30, page: 'page_18', emoji: '🍷' },
    { code: 'AV2', name: 'Arreglo con Vino y Chocolates', cat: 'vino', price: 30, page: 'page_18', emoji: '🍷' },
    { code: 'AV3', name: 'Arreglo con Vino, Rosas y Chocolates', cat: 'vino', price: 33, page: 'page_18', emoji: '🍷' },
    { code: 'AV4', name: 'Arreglo con Vino', cat: 'vino', price: 25, page: 'page_18', emoji: '🍾' },
    // ARREGLOS FLORALES
    { code: 'AF1', name: 'Florero de Cristal', cat: 'arreglos', price: 22, page: 'page_19', emoji: '🌷' },
    { code: 'AF2', name: 'Arreglo Floral', cat: 'arreglos', price: 25, page: 'page_19', emoji: '🌸' },
    { code: 'AF3', name: 'Arreglo Floral', cat: 'arreglos', price: 25, page: 'page_19', emoji: '🌸' },
    { code: 'AF4', name: 'Florero de Cristal', cat: 'arreglos', price: 20, page: 'page_19', emoji: '🌷' },
    { code: 'AF5', name: 'Arreglo Rosas y Fresas con Chocolate', cat: 'arreglos', price: 40, page: 'page_20', emoji: '🍓' },
    { code: 'AF6', name: 'Corazón con Ferreros y Cervezas', cat: 'arreglos', price: 30, page: 'page_20', emoji: '❤️' },
    { code: 'AF7', name: 'Arreglo Floral Especial', cat: 'arreglos', price: 35, page: 'page_20', emoji: '🌺' },
    { code: 'AF8', name: 'Florero de Cristal con Gerberas', cat: 'arreglos', price: 49, page: 'page_20', emoji: '🌸' },
    { code: 'AF9', name: 'Arreglo Floral Premium', cat: 'arreglos', price: 35, page: 'page_21', emoji: '💐' },
    { code: 'AF10', name: 'Arreglo Floral', cat: 'arreglos', price: 28, page: 'page_21', emoji: '🌷' },
    { code: 'AF11', name: 'Arreglo Floral', cat: 'arreglos', price: 35, page: 'page_21', emoji: '🌸' },
    { code: 'AF12', name: 'Arreglo Floral', cat: 'arreglos', price: 30, page: 'page_21', emoji: '🌺' },
    // BASE CRISTAL
    { code: 'AC1', name: 'Arreglo con Base de Cristal', cat: 'cristal', price: 25, page: 'page_22', emoji: '💎' },
    { code: 'AC2', name: 'Arreglo con Base de Cristal', cat: 'cristal', price: 35, page: 'page_22', emoji: '💎' },
    { code: 'AC3', name: 'Arreglo con Base de Cristal', cat: 'cristal', price: 35, page: 'page_22', emoji: '💎' },
    { code: 'AC4', name: 'Arreglo con Base de Cristal', cat: 'cristal', price: 40, page: 'page_22', emoji: '💎' },
    // FRUTA
    { code: 'AFR1', name: 'Arreglo con Fruta', cat: 'fruta', price: 20, page: 'page_23', emoji: '🍓' },
    { code: 'AFR2', name: 'Arreglo con Fruta Especial', cat: 'fruta', price: 22, page: 'page_23', emoji: '🍊' },
    { code: 'AFR3', name: 'Arreglo con Fruta Premium', cat: 'fruta', price: 35, page: 'page_23', emoji: '🍉' },
    // MAQUILLAJE
    { code: 'MAQ1', name: 'Bouquet Rosa Pastel + Maquillaje', cat: 'maquillaje', price: 23, page: 'page_24', emoji: '💄' },
    { code: 'MAQ2', name: 'Bouquet Mix Rosa y Chocolates + Maquillaje', cat: 'maquillaje', price: 30, page: 'page_24', emoji: '💄' },
    { code: 'MAQ3', name: 'Bouquet Rosas y Lirios + Maquillaje', cat: 'maquillaje', price: 25, page: 'page_24', emoji: '💄' },
    { code: 'MAQ4', name: 'Bouquet Rosas, Lirios y Choc. + Maquillaje', cat: 'maquillaje', price: 30, page: 'page_24', emoji: '💄' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const catPageSrc = (page) => `public/images/catalog/${page}.jpg`;
const catInfo = (catId) => CATEGORY_DISPLAY.find(c => c.id === catId);

// ─── NAVBAR ───────────────────────────────────────────────────────────────
function initNavbar() {
    const hamburger = $('#nav-hamburger');
    const links = $('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => links.classList.toggle('mobile-open'));
        $$('.nav-links a').forEach(a => a.addEventListener('click', () => links.classList.remove('mobile-open')));
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
    PRODUCTS.forEach(p => {
        const card = document.createElement('div');
        const cat = catInfo(p.cat);
        const isHidden = p.cat !== CATEGORY_DISPLAY[0].id;
        card.className = `product-card cat-${p.cat}${isHidden ? ' hidden' : ''}`;
        card.dataset.name = p.name.toLowerCase();
        card.dataset.code = p.code.toLowerCase();
        card.dataset.cat = p.cat;
        const imgSrc = catPageSrc(p.page);
        card.innerHTML = `
      <img class="card-img" src="${imgSrc}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="card-img-placeholder cat-${p.cat}" style="display:none">${p.emoji}</div>
      <div class="card-overlay">
        <div class="card-price">$${p.price.toFixed(2)} <span class="card-price-small">+ envío</span></div>
        <div class="card-name">${p.name}</div>
        <div class="card-meta">${cat ? cat.label : ''}</div>
        <div class="card-action">Ver detalle <span>→</span></div>
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
      <span class="modal-spec-label">Cod. ${p.code} — ${p.name}</span>
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
    const waMsg = encodeURIComponent(`Hola VerArteLoja! 🌸\nMe interesa: *Cod. ${p.code}* — ${p.name}\nPrecio: $${p.price.toFixed(2)} + envío`);

    $('#modal-left').innerHTML = `
    <img src="${catPageSrc(p.page)}" alt="${p.name}"
         style="width:100%;height:100%;object-fit:cover;"
         onerror="this.outerHTML='<div class=\\'modal-left-placeholder cat-${p.cat}\\'>${p.emoji}</div>'">
  `;
    $('#modal-right').innerHTML = `
    <button id="modal-close" class="modal-close-btn" aria-label="Cerrar">✕</button>
    <div class="modal-cat-tag">${cat ? cat.emoji + ' ' + cat.label.toUpperCase() : ''}</div>
    <h2 class="modal-title">${p.name}</h2>
    <p class="modal-tagline">"Un detalle que se siente especial"</p>
    <p class="modal-desc">${p.desc || 'Todos los arreglos llevan tarjeta y decoración especial para el destinatario.'}</p>
    <div class="modal-specs">
      <div class="modal-specs-title">Especificaciones</div>
      <div class="modal-spec-row">
        <span class="modal-spec-label">🏷️ Código</span>
        <span class="modal-spec-value">Cod. ${p.code}</span>
      </div>
      <div class="modal-spec-row">
        <span class="modal-spec-label">💰 Precio</span>
        <span class="modal-spec-value">$${p.price.toFixed(2)}</span>
      </div>
      <div class="modal-spec-row">
        <span class="modal-spec-label">🚚 Envío</span>
        <span class="modal-spec-value">Consultar</span>
      </div>
    </div>
    <div class="modal-cta">
      <button class="btn btn-primary" onclick="closeModal();selectProductInForm('${p.code}')">✉️ Hacer pedido</button>
      <a class="btn btn-ghost-white" href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMsg}" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Consultar por WhatsApp
      </a>
    </div>
    <div class="modal-location">📍 Bernardo Valdivieso y Miguel Riofrío Esq. · Loja</div>
  `;
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
        `7. Referencia: ${data.referencia}`, '',
        '*👤 Datos de quien recibe:*',
        `8. Nombre: ${data.destinatario}`, `9. Celular: ${data.celular}`, '',
        '*🕐 Entrega:*', `10. Hora: ${data.hora}`, `11. Fecha: ${data.fecha}`, '',
        `💌 Mensaje: ${data.mensaje || '(sin mensaje)'}`,
    ];
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function initForm() {
    const form = $('#order-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = $('#submit-btn');
        const feedback = $('#form-feedback');
        const sel = $('#f-codigo');
        const selectedOpt = sel.options[sel.selectedIndex];

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

        if (CONFIG.GOOGLE_SCRIPT_URL) {
            try {
                // no-cors + text/plain avoids CORS preflight which Apps Script cannot handle
                await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(data),
                });
                // Response is opaque in no-cors — assume success if no exception
                feedback.className = 'form-feedback success';
                feedback.textContent = '✅ ¡Pedido registrado! Verito te contactará pronto. 🌸';
                form.reset(); btn.disabled = false; btn.textContent = '✉️ Enviar pedido';
                return;
            } catch (err) { console.warn('Sheets unavailable, falling back to WA.', err); }
        }

        feedback.className = 'form-feedback success';
        feedback.textContent = '📲 Abriendo WhatsApp con tu pedido…';
        setTimeout(() => window.open(buildWhatsAppFromForm(data), '_blank'), 400);
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
