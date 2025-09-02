'use strict';

const cart = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');
const storageKey = 'products';

class Product {
  constructor(productElem) {
    this.id = productElem.dataset.id;
    this.count = 0;
    this.cartProduct = null;

    this.elem = productElem;
    this.addedValue = productElem.querySelector('.product__quantity-value');
    this.image = productElem.querySelector('.product__image');

    this.buttonDec = productElem.querySelector('.product__quantity-control_dec');
    this.buttonInc = productElem.querySelector('.product__quantity-control_inc');
    this.buttonAdd = productElem.querySelector('.product__add');

    this.buttonDec.addEventListener('click', () => this.decAddedValue());
    this.buttonInc.addEventListener('click', () => this.incAddedValue());
    this.buttonAdd.addEventListener('click', () => this.addProduct());
  }

  decAddedValue() {
    if (+this.addedValue.innerText > 1) this.addedValue.innerText--;
  }

  incAddedValue() {
    this.addedValue.innerText++;
  }

  addProduct() {
    const addedCount = +this.addedValue.innerText;
    this.count += addedCount;

    let endPoint;

    if (this.cartProduct) {
      // существующий товар → летим к его элементу
      endPoint = this.cartProduct.getBoundingClientRect();
      this.startAnimation(endPoint, () => {
        this.updateCartCount();
        this.updateCartState();
      });
    } else {
      // первый товар → создаём временный элемент для вычисления позиции
      const tempDiv = document.createElement('div');
      tempDiv.className = 'cart__product';
      tempDiv.style.visibility = 'hidden';
      tempDiv.innerHTML = `<img class="cart__product-image" src="${this.image.src}">`;
      cartProducts.appendChild(tempDiv);
      endPoint = tempDiv.getBoundingClientRect();
      tempDiv.remove();

      // анимация летящей картинки
      this.startAnimation(endPoint, () => {
        // создаём элемент корзины после анимации
        this.cartProduct = document.createElement('div');
        this.cartProduct.className = 'cart__product';
        this.cartProduct.dataset.id = this.id;
        this.cartProduct.innerHTML = `
          <img class="cart__product-image" src="${this.image.src}">
          <div class="cart__product-count">${this.count}</div>
          <div class="cart__product-remove">×</div>
        `;
        cartProducts.appendChild(this.cartProduct);

        // кнопка удаления
        this.cartProduct.querySelector('.cart__product-remove')
          .addEventListener('click', () => this.deleteProduct());

        this.updateCartState();
      });
    }
  }

  startAnimation(endPoint, callback) {
    const flyingImage = this.image.cloneNode(false);
    const startPoint = this.image.getBoundingClientRect();

    flyingImage.style.position = 'fixed';
    flyingImage.style.left = startPoint.left + 'px';
    flyingImage.style.top = startPoint.top + 'px';
    flyingImage.style.width = this.image.offsetWidth + 'px';
    flyingImage.style.height = this.image.offsetHeight + 'px';
    flyingImage.style.zIndex = 1000;
    document.body.appendChild(flyingImage);

    const nSteps = 10;
    const tStep = 50;

    const animateStep = (step) => {
      if (step === 0) {
        flyingImage.remove();
        if (callback) callback();
        return;
      }
      const rect = flyingImage.getBoundingClientRect();
      const dx = (endPoint.left - rect.left) / step;
      const dy = (endPoint.top - rect.top) / step;
      flyingImage.style.left = rect.left + dx + 'px';
      flyingImage.style.top = rect.top + dy + 'px';
      setTimeout(() => animateStep(step - 1), tStep);
    };

    animateStep(nSteps);
  }

  updateCartCount() {
    if (this.cartProduct) {
      this.cartProduct.querySelector('.cart__product-count').innerText = this.count;
    }
  }

  deleteProduct() {
    this.count = 0;
    this.addedValue.innerText = 1;

    if (this.cartProduct) {
      this.cartProduct.remove();
      this.cartProduct = null;
    }

    this.updateCartState();
  }

  updateCartState() {
    if (this.cartProduct) {
      this.cartProduct.querySelector('.cart__product-count').innerText = this.count;
    }
    localStorage.setItem(storageKey, cartProducts.innerHTML);
    toggleCartVisibility();
  }
}

// показать/скрыть корзину
function toggleCartVisibility() {
  cart.style.display = cartProducts.children.length > 0 ? 'block' : 'none';
}

// восстановление из localStorage
cartProducts.innerHTML = localStorage.getItem(storageKey) || '';
toggleCartVisibility();

// создаём объекты Product
const products = [];
for (const elem of document.getElementsByClassName('product')) {
  const product = new Product(elem);
  products.push(product);

  for (const cartProduct of cartProducts.querySelectorAll('.cart__product')) {
    if (product.id === cartProduct.dataset.id) {
      product.cartProduct = cartProduct;
      product.count = +cartProduct.querySelector('.cart__product-count').innerText;

      let removeBtn = cartProduct.querySelector('.cart__product-remove');
      if (!removeBtn) {
        removeBtn = document.createElement('div');
        removeBtn.className = 'cart__product-remove';
        removeBtn.innerText = '×';
        cartProduct.appendChild(removeBtn);
      }

      removeBtn.addEventListener('click', () => product.deleteProduct());
      break;
    }
  }
}

// кнопка очистки корзины
const clearButton = document.querySelector('.cart__clear');
clearButton.addEventListener('click', () => {
  for (const cartProduct of cartProducts.querySelectorAll('.cart__product')) {
    cartProduct.remove();
  }

  for (const product of products) {
    product.count = 0;
    product.addedValue.innerText = 1;
    product.cartProduct = null;
  }

  localStorage.removeItem(storageKey);
  toggleCartVisibility();
});
