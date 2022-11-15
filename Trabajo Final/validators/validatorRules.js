const validator = require('express-validator')
const { body } = validator
const { validationResult } = require('express-validator')

const validationRulesMessage = [
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar su nombre')
    .isLength({ min:2 })
    .withMessage('Debe tener mas de 2 caracteres'),
    
    body('apellido')
    .notEmpty().withMessage('Debe ingresar su apellido')
    .isLength({ min:2 })
    .withMessage('Debe tener mas de 2 caracteres'),
    
    body('correo')
    .notEmpty().withMessage('Debe ingresar su correo')
    .isEmail()
    .withMessage('Correo invalido'),
    
    body('mensaje')
    .notEmpty().withMessage('Debe ingresar un mensaje')
    .trim(' ')
    .isLength({ min: 10, max: 300 })
    .withMessage('El mensaje debe tener entre 10 y 300 caracteres'),

    // Funcion verificadora
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const formDataOk = req.body
            const arrWarnings = errors.array()
            
            const errorNombre = []
            const errorApellido = []
            const errorCorreo = []
            const errorMensaje = []
            for (let i = 0; i < arrWarnings.length; i++) {
                if (arrWarnings[i].param === 'nombre') {
                    errorNombre.push(arrWarnings[i].msg)
                }
                if (arrWarnings[i].param === 'apellido') {
                    errorApellido.push(arrWarnings[i].msg)
                }
                if (arrWarnings[i].param === 'correo') {
                    errorCorreo.push(arrWarnings[i].msg)
                }
                if (arrWarnings[i].param === 'mensaje') {
                    errorMensaje.push(arrWarnings[i].msg)
                }
            }

            res.render('message', {
                arrWarnings,
                formDataOk,
                errorNombre,
                errorApellido,
                errorCorreo,
                errorMensaje
            })        
        } else return next()
    
    }
]

module.exports = validationRulesMessage