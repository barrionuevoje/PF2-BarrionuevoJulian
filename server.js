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

// Configuración de Handlebars con helper 'extend'
const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        extend: function(name, options) {
            const layout = app.get('views') + '/' + name + '.handlebars';
            return options.fn({ layout });
        }
    }
});

// Configuración del motor de plantillas
app.engine('handlebars', hbs.engine);
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

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real' });
});

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
});
