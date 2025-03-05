const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const productsRouter = require('./proyect-folder/routes/products');
const cartsRouter = require('./proyect-folder/routes/carts');
const ProductManager = require('./ProductManager');
const productManager = new ProductManager();

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const io = new Server(server);

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', productsRouter(io));
app.use('/api/carts', cartsRouter);

// Rutas
app.get('/', async (req, res) => {
    const products = await productManager.getAll(); // Asegurar que productManager esté importado
    res.render('home', { title: 'Lista de Productos', products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getAll();
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
});

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    // Emitir la lista de productos cuando un cliente se conecta
    socket.emit('productList', async () => await productManager.getAll());

    // Escuchar evento de agregar producto
    socket.on('addProduct', async (product) => {
        await productManager.addProduct(product);  // Agregar el producto
        const updatedProducts = await productManager.getAll();
        io.emit('productList', updatedProducts);  // Emitir la lista actualizada
    });

    // Escuchar evento de eliminar producto
    socket.on('deleteProduct', async (productId) => {
        await productManager.deleteProduct(productId);  // Eliminar el producto
        const updatedProducts = await productManager.getAll();
        io.emit('productList', updatedProducts);  // Emitir la lista actualizada
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
