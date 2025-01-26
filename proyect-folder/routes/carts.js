const express = require('express');
const CartManager = require('../../CartsManager');

const router = express.Router();
const cartManager = new CartManager();

// POST /api/carts/ - Crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.addCart();
  res.status(201).json(newCart);
});

// GET /api/carts/:cid - Listar productos de un carrito
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getById(parseInt(req.params.cid));
  if (!cart) return res.status(404).send('Carrito no encontrado');
  res.json(cart);
});

// POST /api/carts/:cid/product/:pid - Agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
  if (!updatedCart) return res.status(404).send('Carrito no encontrado o producto inválido');
  res.json(updatedCart);
});

module.exports = router;
