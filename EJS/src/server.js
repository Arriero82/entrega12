const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const Products = require('../../container/Container');
const products = new Products("../../database/file.json");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('pages/index')
})

const PORT = 8082;

const server = httpServer.listen(PORT, () => {
    console.log(`listening in port ${server.address().port}`);
})

const prods = [
    {
        "title": "Duster",
        "price": "50000",
        "thumbnail": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP._Sy4qWVmBwixA1glVhkTzgHaE8%26pid%3DApi&f=1",
        "id": 1
    },
    {
        "title": "RAM",
        "price": "200000",
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_997702-MLA48793893569_012022-W.jpg",
        "id": 2
    },
    {
        "title": "Corolla",
        "price": "20000",
        "thumbnail": "https://cdn.motor1.com/images/mgl/qnP2R/s3/oficial-todo-sobre-el-nuevo-toyota-corolla-hybrid-llega-este-verano-a-la-argentina.jpg",
        "id": 3
    },
    {
        "title": "Mustang",
        "price": "500000",
        "thumbnail": "https://cdn.motor1.com/images/mgl/qj8lq/s1/nuova-ford-mustang-shelby-gt500.jpg",
        "id": 4
    },
    {
        "title": "Camaro",
        "price": "450000",
        "thumbnail": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.motor1.com%2Fimages%2Fmgl%2FpmxgW%2Fs1%2Fchevrolet-camaro-coupe.jpg&f=1&nofb=1&ipt=6144b305d232e0b5e90c5e92de1189a3a8ab553b2d29d4462852330f8d605983&ipo=images",
        "id": 5
    },
    {
        "title": "Corolla Cross",
        "price": "24000",
        "thumbnail": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.carbuzz.com%2Fgallery-images%2F2022-toyota-corolla-cross-forward-vision-carbuzz-854191-1600.jpg&f=1&nofb=1&ipt=dab812b370cd2f07b32537bb5f9aefeee9c105f751f2d7e17ea78e11a7c69b6d&ipo=images",
        "id": 6
    },
    {
        "title": "Puma",
        "price": "63000",
        "thumbnail": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lifequestalliance.com%2Fwp-content%2Fuploads%2F2020%2F11%2F2022-Ford-Puma-awd-automatic-america-advert-.jpg&f=1&nofb=1&ipt=9678c4029722969c951c65c57344e24ca17751043fe0d9c876fa51117730b300&ipo=images",
        "id": 7
    }
]

const mensajes = [
    {username: "Pepe", text: "Hola a todos"},
    {username: "Lula", text: "Hola Pepe"}
]


io.on('connection', (cliente) => {
    console.log(`cliente ${cliente.id} conectado`);
    
    cliente.emit('productos-server', prods)

    cliente.on('new-product', (producto) => {
        prods.push(producto);
        io.sockets.emit('productos-server', prods)
    })
    
    cliente.emit('mensajes-server', mensajes)

    cliente.on('new-message', (mensaje) => {
        mensajes.push(mensaje)
        io.sockets.emit('mensajes-server', mensajes)
    })
})          