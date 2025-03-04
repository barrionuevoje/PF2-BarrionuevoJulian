io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    // Aquí podrías emitir productos cuando se agreguen o eliminen
    socket.emit('productos', productos);  // Ejemplo de cómo emitir productos

    // También puedes escuchar eventos del cliente
    socket.on('nuevoProducto', (producto) => {
        console.log('Nuevo producto:', producto);
        // Luego podrías emitir los productos actualizados
        io.emit('productos', productosActualizados);
    });
});
