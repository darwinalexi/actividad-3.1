import { Router } from "express";
import { createArticles, deleteArticles, showAArticles, showArticles, updateArticles } from "../controllers/articulos.controller.js";
import { middlewaresShowArticles, middlewaresUpdateArticles } from '../middlewares/articulos.middlewares.js'

const router = Router()

router.get("/articulos", showArticles)
router.post("/articulos",middlewaresShowArticles, createArticles)
router.put("/articulos/:id",middlewaresUpdateArticles, updateArticles)
router.get("/articulos/:id", showAArticles)
router.delete("/articulos/:id", deleteArticles)


export default router
