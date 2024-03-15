import { Router } from 'express'
import { actualizarUnaPublicacion, crearUnaPublicacion, eliminarUnaPublicacion, listarPublicaciones, mostrarSoloUnaPublicacion } from "../controllers/publicaciones.controller.js";
import  { middlewaresCreatePublics, middlewaresUpdatePublics } from '../middlewares/publicaciones.middlewares.js';

const router = Router();


// http://localhost:3333/publicaciones
router.get("/publicaciones", listarPublicaciones)
router.post("/publicaciones",middlewaresCreatePublics, crearUnaPublicacion)
// http://localhost:3333/publicaciones/3
router.put("/publicaciones/:id",middlewaresUpdatePublics, actualizarUnaPublicacion)
router.get("/publicaciones/:id", mostrarSoloUnaPublicacion)
router.delete("/publicaciones/:id", eliminarUnaPublicacion)


export default router