import { check } from "express-validator";

export const middlewaresShowArticles = [
    check('nombre','nombre, Campo obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }).isString(),
    check('enlace','enlace Obligatorio').not().isEmpty().isLength({ max: 225 }),
    check('autor','autor obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }),
];

export const middlewaresUpdateArticles = [
    check('nombre','nombre, Necesario').not().isEmpty().isLength({ min: 3, max: 100 }).isString().optional(),
    check('enlace','enlace Necesario').optional().isLength({min: 3, max: 225 }).optional(),
    check('autor','autor Obligatorio').not().isEmpty().isLength({ min:3, max: 100 }).optional().optional(),
]