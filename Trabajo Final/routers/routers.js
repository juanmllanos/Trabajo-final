const router = require('express').Router()
const nodeMailer = require('nodemailer')
const users = require('../controllers/usersControlers.js')
const validationRulesMessage = require('../validators/validatorRules.js')
const validationRulesRegister = require('../validators/validatorRulesRegister.js')
const validationRulesEditRegister = require('../validators/validatorRulesEditRegister.js')

require('dotenv').config()

const authentication = (req, res, next) => {
    if (req.session.user) {
        next()
    } else res.redirect('/noAuthentication')
}

router.get('/message', (req, res) => {
    res.render('message', {user: req.session.user})
})

router.post('/message', validationRulesMessage, async (req, res) => {
    const {nombre, apellido, correo, mensaje} = req.body

    const emailMsj = {
        to: 'juan_m@hotmail.com.ar',
        from: correo,
        subjet: 'Mensaje desde formulario de contacto',
        html: `Contacto: ${nombre} ${apellido}: ${mensaje}`
    }
    
    const transport = nodeMailer.createTransport(
        {
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.user,
                pass: process.env.pass
            }
        }
    )
        
    const sendMailStatus = await transport.sendMail(emailMsj)

    if (sendMailStatus.rejected.length) {
            req.app.locals.sendMailFeedback = 'No pudimos enviar'
        } else {
            req.app.locals.sendMailFeedback = 'Mensaje Enviado'
        }
    res.redirect('/')
})

router.get('/register', users.getRegisterForm)

router.post('/register', validationRulesRegister, users.sendRegisterForm)

router.get('/login', users.getLoginForm)

router.post('/login', users.sendLoginForm)

router.get('/turns', authentication, (req, res) => {
    res.render('turns', {user: req.session.user})
})

router.get('/settings', authentication, users.getSettings)

router.post('/settings', validationRulesEditRegister, users.sendSettings)

router.get('/validate', authentication, users.validateEmail)

router.get('/deleteUser', authentication, users.deleteUser)

router.get('/logout', authentication, users.logout)

module.exports = router