const socket = io.connect()

const addProduct = (e) => {
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const thumbnail = document.querySelector('#thumbnail').value;
    socket.emit('new-product', {title, price, thumbnail})
    return false
}

const render = (prods) => {     
    const listado = prods.map((elem) => {
        return(
            `<div class="articulos">
            <h3>Modelo ${elem.title}</h3>
            <h3>Precio ${elem.price}</h3>
            <img src="${elem.thumbnail}" alt="${elem.title}"/>
            </div>`
        )
    });
    document.querySelector('#listaProductos').innerHTML = listado;
}

const addMessage = (e) => {
    const username = document.querySelector('#username').value;
    const text = document.querySelector('#text').value;
    socket.emit('new-message', {username, text})
    return false
}

const renderMessages = (messages) => {     
    const messagesList = messages.map((elem) => {
        return(
            `<div>
            <strong>${elem.username}</strong >
            <em>${elem.text}</em >
            </div >`
        )
    }).join(' ');
    document.querySelector('#listaMensajes').innerHTML = messagesList;
}

socket.on('productos-server', (prods) => {
    render(prods)
})

socket.on('mensajes-server', (mensajes) => {
    renderMessages(mensajes)
} )




