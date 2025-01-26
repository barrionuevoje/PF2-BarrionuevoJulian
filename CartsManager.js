const fs = require('fs');
const path = './proyect-folder/data/carts.json';

class CartsManager {
  constructor() {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find((c) => c.id === id);
  }

  async addCart() {
    const carts = await this.getAll();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getAll();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const product = cart.products.find((p) => p.product === productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartsManager;
