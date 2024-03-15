import { Router } from "express";
import { actualizarUnUsuario,  crearUnUsuario,  eliminarUnUsuario,  listartodo, mostrarunusuario } from "../controllers/usuarios.controller.js";
import { middlewaresCreateUsers, middlewaresUpdate} from "../middlewares/usuarios.middlewares.js";

 const router= Router()

 router.get("/usuarios", listartodo)
 router.post("/usuarios",middlewaresCreateUsers, crearUnUsuario)
 router.put("/usuarios/:id",middlewaresUpdate, actualizarUnUsuario)
 router.get("/usuarios/:id",mostrarunusuario)
 router.delete("/usuarios/:id",eliminarUnUsuario)
 

 export default router