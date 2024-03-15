import { Router } from "express";
import { actualizarComentario, crearComentario, eliminarComentario, listarComentarios, mostrarUnComentario } from "../controllers/comentarios.controller.js";
import { middlewaresCreateComentario, middlewaresUpdateComentario } from "../middlewares/comentarios.middleware.js";

const router = Router()

// http://localhost:3333/comentarios
router.get("/comentarios", listarComentarios)
router.post("/comentarios", middlewaresCreateComentario, crearComentario)
// http://localhost:3333/comentarios/1
router.put("/comentarios/:id", middlewaresUpdateComentario, actualizarComentario)
router.get("/comentarios/:id", mostrarUnComentario)
router.delete("/comentarios/:id", eliminarComentario)

export default router