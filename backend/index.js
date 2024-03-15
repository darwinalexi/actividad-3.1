import express from 'express'
import body_parser from 'body-parser'
import rutasArticulos from './src/routes/articulos.routes.js'
import rutasComentarios from './src/routes/comentarios.routes.js'
import rutasPublicaciones from './src/routes/publicaciones.routes.js'
import rutasUsuarios from './src/routes/usuarios.routes.js'
import rutasAuth from './src/routes/auth.routes.js'
import { validarToken } from './src/controllers/auth.controller.js'
import cors from 'cors'

const server = express()
const PORT = 3333

// Configuración
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))
server.use(cors())

// Ejs
server.set('view engine', 'ejs')
server.set('views', './views')
server.use(express.static('./public'))
server.get('/document', (req, res) => {
    res.render('document.ejs')
})

// Rutas
server.use(rutasAuth)
server.use(validarToken, rutasArticulos)
server.use(validarToken, rutasComentarios)
server.use(validarToken, rutasPublicaciones)
server.use(validarToken, rutasUsuarios)

server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto http://localhost:${PORT}`);
})