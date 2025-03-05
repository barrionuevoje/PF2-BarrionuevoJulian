const socket = io();

// Escuchar el evento 'productList' para actualizar la lista de productos
socket.on('productList', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Limpiar la lista actual
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        productList.appendChild(li);
    });
});

// Enviar un nuevo producto al servidor cuando se envíe el formulario
document.getElementById('addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newProduct = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
    };

    // Emitir el evento para agregar un producto
    socket.emit('addProduct', newProduct);

    // Añadir el evento de eliminación
socket.on('productList', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        
        // Botón para eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            socket.emit('deleteProduct', product.id); // Emitir el evento para eliminar
        });
        
        li.appendChild(deleteButton);
        productList.appendChild(li);
    });
});

});
