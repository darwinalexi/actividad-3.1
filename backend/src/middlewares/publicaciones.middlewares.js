import {check} from 'express-validator'

export const middlewaresCreatePublics =[
    check('nombre','nombre, campo obligatorio').not().isEmpty(),
    check('descripcion','Ingrese alguna descripcion').not() .isEmpty(),
    check('imagen', 'Imagen opcional').optional(),
    check('fuentes', 'Ingrese alguna fuente suministrada').not().isEmpty(),
    check('tipo', 'Obligatorio registrar un tipo').not() .isEmpty(),
    check('id_usuario','Id usuario obligatorio').not() .isEmpty().isInt()
];
export const middlewaresUpdatePublics=[
    check('nombre','Nombre invalido').optional(),
    check('descripcion','Descripcion invalida').optional(),
    check('imagen', 'Imagen opcional').optional(),
    check('fuentes', 'Fuente invalida').optional(),
    check('tipo', 'Tipo invalido').optional(),
    check('id_usuario','Id usuario invalido').optional().isInt()
];