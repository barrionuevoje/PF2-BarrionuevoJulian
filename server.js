const express = require('express');
const productsRouter = require('./proyect-folder/routes/products');
const cartsRouter = require('./proyect-folder/routes/carts');

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando. Prueba las rutas /api/products o /api/carts.');
  });