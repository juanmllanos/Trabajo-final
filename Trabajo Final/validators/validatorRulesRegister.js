const validator = require('express-validator')
const { body } = validator
const { validationResult } = require('express-validator')

const validationRulesRegister = [
    body('name')
    .notEmpty()
    .withMessage('Ingresa tu nombre')
    .isLength({ min:2 })
    .withMessage('Tiene que tener 2 caracteres minimo'),
    
    body('lastName')
    .notEmpty().withMessage('Ingresa tu apellido')
    .isLength({ min:2 })
    .withMessage('Tiene que tener 2 caracteres minimo'),
    
    body('email')
    .notEmpty().withMessage('Ingresa tu e-mail')
    .isEmail()
    .withMessage('Correo invalido'),
    
    body('password')
    .notEmpty().withMessage('Ingresa la contraseña')
    .trim(' ')
    .isLength({ min: 6, max: 12 })
    .withMessage('Tiene que tener entre 6 y 12 caracteres'),

    // Funcion verificadora
    (req, res, next) => {
        //posibles errores
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const registerDataOk = req.body
            const arrWarnings = errors.array()
            
            const errorName = []
            const errorLastName = []
            const errorEmail = []
            const errorPassword = []
            for (let i = 0; i < arrWarnings.length; i++) {
                if (arrWarnings[i].param === 'name') {
                    errorName.push(arrWarnings[i].msg)
                }
                if (arrWarnings[i].param === 'lastName') {
                    errorLastName.push(arrWarnings[i].msg)
                }
                if (arrWarnings[i].param === 'email') {
                    errorEmail.push(arrWarnings[i].msg)
                }
                if (arrWarnings[i].param === 'password') {
                    errorPassword.push(arrWarnings[i].msg)
                }
            }

            res.render('registerForm', {
                arrWarnings,
                registerDataOk,
                errorName,
                errorLastName,
                errorEmail,
                errorPassword
            })        
        } else return next()
    
    }
]

module.exports = validationRulesRegister