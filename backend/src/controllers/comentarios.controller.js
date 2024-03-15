import { pool } from '../database/conexion.js'
import { validationResult } from "express-validator";

export const listarComentarios = async (req, res) => {
    try {
        const [ resultado ] = await pool.query("select * from comentarios")

        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(404).json({
                "mensaje": "No hay comentarios"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const crearComentario = async (req, res) => {
    try {

        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(404).json({error})
        }

        const { comentario, id_usuario, id_publicacion } = req.body
        const [ resultado ] = await pool.query("insert into comentarios(comentario, id_usuario, id_publicacion) values (?, ?, ?)", [comentario, id_usuario, id_publicacion])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Comentario creado con exito"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const actualizarComentario = async (req, res) => {
    try {

        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(404).json({error})
        }

        const { id } = req.params
        const { comentario, id_usuario, id_publicacion } = req.body
        const [ oldComment ] = await pool.query("select * from comentarios where id=?", [id])
        const [ resultado ] = await pool.query(`update comentarios set comentario='${comentario?comentario:oldComment[0].comentario}', 
        id_usuario='${id_usuario?id_usuario:oldComment[0].id_usuario}', 
        id_publicacion='${id_publicacion?id_publicacion:oldComment[0].id_publicacion}' where id=${parseInt(id)}`)

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Comentario actualizado"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const mostrarUnComentario = async (req, res) => {
    try {
        const { id } = req.params; 
        const [ resultado ] = await pool.query("select * from comentarios where id=?", [id])

        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(404).json({
                "mensaje": "No se encontró el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params; 
        const [ resultado ] = await pool.query("delete from comentarios where id=?", [id])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Haz eliminado con exito el Comentario"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se encontró el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}