const socket = io();  
const productList = document.getElementById('product-list');
const productForm = document.getElementById('productForm');

socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        productList.appendChild(li);
    });
});

productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    
    socket.emit('nuevoProducto', { title, price });
    
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
});
