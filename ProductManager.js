const fs = require('fs');
const path = './proyect-folder/data/products.json';

class ProductManager {
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
    const products = await this.getAll();
    return products.find((p) => p.id === id);
  }

  async add(product) {
    const products = await this.getAll();
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product,
    };
    products.push(newProduct);
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, updates) {
    const products = await this.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();
    const filteredProducts = products.filter((p) => p.id !== id);
    if (products.length === filteredProducts.length) return null;

    await fs.promises.writeFile(path, JSON.stringify(filteredProducts, null, 2));
    return true;
  }
}

module.exports = ProductManager;
