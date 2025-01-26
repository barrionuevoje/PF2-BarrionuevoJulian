const express = require('express');
const ProductManager = require('../../ProductManager');

const router = express.Router();
const productManager = new ProductManager();

// GET /api/products/ - Listar todos los productos
router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.json(products);
});

// GET /api/products/:pid - Traer producto por ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getById(parseInt(req.params.pid));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});

// POST /api/products/ - Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  const newProduct = await productManager.add({ title, description, code, price, status, stock, category, thumbnails });
  res.status(201).json(newProduct);
});

// PUT /api/products/:pid - Actualizar un producto
router.put('/:pid', async (req, res) => {
  const updates = req.body;
  const updatedProduct = await productManager.update(parseInt(req.params.pid), updates);
  if (!updatedProduct) return res.status(404).send('Producto no encontrado');
  res.json(updatedProduct);
});

// DELETE /api/products/:pid - Eliminar un producto
router.delete('/:pid', async (req, res) => {
  const success = await productManager.delete(parseInt(req.params.pid));
  if (!success) return res.status(404).send('Producto no encontrado');
  res.send('Producto eliminado');
});

module.exports = router;
