/*
    * X Listar Todos
    * X Crear Uno
    * X Actualizar Uno
    * X Mostrar Solo Uno
    * X Eliminar Uno

*/

import { pool } from '../database/conexion.js';
import {validationResult} from  "express-validator";

// Listar todas las publicaciones
export const listarPublicaciones = async (req, res) => {
    try {
        const [resultado] = await pool.query("select * from publicaciones");

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                "mensaje": "No encontramos publicaciones "
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
}
// Crear una nueva publicación
export const crearUnaPublicacion = async (req, res) => {
    try {

        const error = validationResult(req)


        if (!error.isEmpty()) {
            return res.status(404).json({error})
        }

        const { nombre, descripcion, imagen, fuentes, tipo, id_usuario } = req.body;
        
        // Asegúrate de que id_usuario sea un número
        if (isNaN(id_usuario)) {
            return res.status(400).json({
                "mensaje": "El ID de usuario debe ser un número válido."
            });
        }

        // Verifica si el usuario existe
        const [usuarioExistente] = await pool.query("select * from usuarios where id=?", [id_usuario]);

        if (usuarioExistente.length === 0) {
            return res.status(404).json({
                "mensaje": "No se encontró el usuario con el ID proporcionado."
            });
        }

        const [resultado] = await pool.query("insert into publicaciones(nombre, descripcion, imagen, fuentes, tipo, id_usuario) values (?, ?, ?, ?, ?, ?)", [nombre, descripcion, imagen, fuentes, tipo, id_usuario]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "La publicación ha sido creada con éxito!"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear la publicación"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
}


// Actualizar una publicación
export const actualizarUnaPublicacion = async (req, res) => {
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(404).json({error})
        }


        const { id } = req.params;
        const { nombre, descripcion, imagen, fuentes, tipo } = req.body;
        const [oldPost] = await pool.query("select * from publicaciones where id=?", [id]);
        const [resultado] = await pool.query(`update publicaciones set nombre='${nombre ? nombre : oldPost[0].nombre}', descripcion='${descripcion ? descripcion : oldPost[0].descripcion}', imagen='${imagen ? imagen : oldPost[0].imagen}', fuentes='${fuentes ? fuentes : oldPost[0].fuentes}', tipo='${tipo ? tipo : oldPost[0].tipo}' where id=${parseInt(id)}`);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "La publicación ha sido actualizada"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar la publicación, ¡intente de nuevo!"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
}

// Mostrar solo una publicación
export const mostrarSoloUnaPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("select * from publicaciones where id=?", [id]);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                "mensaje": "No se encontró esa publicación con ese ID"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
}

// Eliminar una publicación
export const eliminarUnaPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("delete from publicaciones where id=?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Has eliminado con éxito la publicación"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró esa publicación con ese ID y no se pudo eliminar"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
}


