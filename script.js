const state = { products: [], selectedLang: 'en' };

async function loadProducts() {
  const res = await fetch('products.json');
  state.products = await res.json();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = state.products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name.en}">
      <div class="name-en">${p.name.en}</div>
      <div class="name-local">${p.name[state.selectedLang] || ''}</div>
      <select>
        <option value="0">Qty: 0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  `).join('');
}

document.getElementById('lang').addEventListener('change', e => {
  state.selectedLang = e.target.value;
  renderProducts();
});

loadProducts();
