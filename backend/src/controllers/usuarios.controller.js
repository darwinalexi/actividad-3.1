/* 
listar todo
crear todo
actualiizar 
mostrar
*/

import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
export const listartodo = async(req, res)=>{
    try {
        const [resultado]= await pool.query("select * from usuarios")

        if (resultado.length >0) {
            res.status(200).json(resultado)
        }else{
            res.status(404).json({
                "mensaje":"no hay usuarios registrados"
            })

        }
    } catch (error) {
            res.status(500).json({
            "mensaje" : error
            })
    }
}

export const crearUnUsuario = async (req, res) => {
    try {

        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(404).json({error})
        }
        const { nombre_completo, correo, clave } = req.body
        const [ resultado ] = await pool.query("insert into usuarios(nombre_completo, correo, clave) values (?, ?, ?)", [nombre_completo, correo, clave])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El usuario ha sido creado con exito!!!!!"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el usuario el usuario"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const actualizarUnUsuario = async (req, res) => {
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(404).json({error})
        }
        const { id } = req.params
        const { nombre_completo, correo, clave } = req.body
        const [ oldUser ] = await pool.query("select * from usuarios where id=?", [id])
        const [ resultado ] = await pool.query(`update usuarios set nombre_completo='${nombre_completo?nombre_completo:oldUser[0].nombre_completo}', correo='${correo?correo:oldUser[0].correo}', clave='${clave?clave:oldUser[0].clave}' where id=${parseInt(id)}`)

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El usuario ha sido actualizado"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el usuario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

    
    export const mostrarunusuario = async(req, res)=>{
        try {
            const {id}=req.params
            const [resultado] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
            if (resultado.length >0) {
                res.status(200).json(resultado)
            }else{
                res.status(404).json({
                    "mensaje":"no se encontro este usuario"
                })

            }
        } catch (error) {
                res.status(500).json({
                "mensaje" : error
                })
        }
    }
    
export const eliminarUnUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Se eliminó exitosamente el usuario y los registros relacionados"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró ningún usuario con ese ID y no se pudo eliminar"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
};
