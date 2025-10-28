// Datos del menú
const menu = {
  ira: {
    id: 'ira-1',
    name: 'LA IRA SANTA',
    description: 'Doble carne ahumada, jalapeños flameados, salsa infernal',
    price: 18.90,
    isSpicy: true,
    image: 'https://placehold.co/400x300/1a1a1a/ffd700?text=LA+IRA+SANTA'
  },
  gula: {
    id: 'gula-1',
    name: 'GULA EXTREMA',
    description: 'Triple queso, bacon crujiente, cebolla caramelizada',
    price: 21.50,
    isSpicy: false,
    image: 'https://placehold.co/400x300/1a1a1a/ffd700?text=GULA+EXTREMA'
  }
};

// Carrito
let cart = [];

// Pantallas
const homeScreen = document.getElementById('screen-home');
const productScreen = document.getElementById('screen-product');
const cartScreen = document.getElementById('screen-cart');
const productDetail = document.getElementById('product-detail');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Eventos
document.querySelectorAll('.category').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.category;
    showProduct(cat);
  });
});

document.getElementById('btn-back').addEventListener('click', () => {
  homeScreen.classList.add('active');
  productScreen.classList.remove('active');
});

document.getElementById('btn-back-cart').addEventListener('click', () => {
  homeScreen.classList.add('active');
  cartScreen.classList.remove('active');
});

document.getElementById('btn-checkout').addEventListener('click', () => {
  alert('¡Orden enviada al infierno!');
  cart = [];
  updateCart();
  homeScreen.classList.add('active');
  cartScreen.classList.remove('active');
});

// Funciones
function showProduct(category) {
  const item = menu[category];
  if (!item) return;

  productDetail.innerHTML = `
    <div class="product-card">
      <img src="${item.image}" alt="${item.name}">
      <div class="product-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        ${item.isSpicy ? '<span class="spicy">🌶️ Picante</span>' : ''}
        <div style="font-size:20px;font-weight:bold;color:var(--burg-gold);margin:12px 0;">$${item.price.toFixed(2)}</div>
        <button class="btn-primary" onclick="addToCart('${item.id}')">AÑADIR AL PECADO</button>
      </div>
    </div>
  `;

  homeScreen.classList.remove('active');
  productScreen.classList.add('active');
}

function addToCart(id) {
  const item = Object.values(menu).find(i => i.id === id);
  if (item && !cart.some(i => i.id === id)) {
    cart.push(item);
    updateCart();
  }
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `<span>${item.name}</span> <span>$${item.price.toFixed(2)}</span>`;
    cartItems.appendChild(el);
  });

  cartTotal.innerHTML = `<div style="font-size:18px;font-weight:bold;color:var(--burg-gold);margin:16px 0;">Total: $${total.toFixed(2)}</div>`;
}

// Exponer función globalmente para onclick
window.addToCart = addToCart;
