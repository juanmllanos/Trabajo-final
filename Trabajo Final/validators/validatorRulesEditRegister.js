const validator = require('express-validator')
const { body } = validator
const { validationResult } = require('express-validator')

const validationRulesEditRegister = [
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

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const editDataOk = req.body
            const arrWarnings = errors.array()
            
            const errorName = []
            const errorLastName = []
            const errorEmail = []
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
            }

            res.render('editUserForm', {
                arrWarnings,
                editDataOk,
                errorName,
                errorLastName,
                errorEmail,
            })        
        } else return next()
    
    }
]

module.exports = validationRulesEditRegister