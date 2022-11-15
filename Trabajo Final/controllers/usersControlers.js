const segurePassword = require('../helpers/segurePassword.js')
const User = require('../schemas/usersSchema.js')


function getRegisterForm(req, res) {
    res.render('registerForm')
}

async function sendRegisterForm(req, res) {
    const {name, lastName, email, password} = req.body
    const hashedPass = await segurePassword.encrypt(password)

    const newUser = new User({
        name, lastName, email, password: hashedPass
    })
    
    //probando
    const usr = {
        id: newUser._id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email
    }
    req.session.user = usr

    newUser.save((error) => {
        if (!error) {
            res.render('turns', {user: req.session.user})
        } else {
            res.render('registerForm', {message: 'Ya exite ese mail registrado'})
        }
    })
}

function getLoginForm(req, res) {
    res.render('loginForm')
}

async function sendLoginForm(req, res) {
    const { email, password} = req.body
    const user = await User.find().where({ email })
    
    if (!user.length) {
        return res.render('loginForm', { message: 'E-mail o contraseña incorrecta'})
    }
    
    if (await segurePassword.uncrypt(password, user[0].password)) {
        const usr = {
            id: user[0]._id,
            name: user[0].name,
            lastName: user[0].lastName,
            email: user[0].email
        }
        req.session.user = usr
        res.render('turns', {user: req.session.user})
    } else {
        return res.render('loginForm', {message: 'E-mail o contraseña incorrecta'})
    }
}

async function getSettings(req, res) {
    const user = await User.findById(req.session.user.id).lean()
    res.render('editUserForm', {user} )
}

async function sendSettings(req, res) {
    await User.findByIdAndUpdate(req.session.user.id, req.body)

    //probando
    const user = await User.find().where(req.body.email)
    const usr = {
        id: user[0]._id,
        name: user[0].name,
        lastName: user[0].lastName,
        email: user[0].email
    }
    req.session.user = usr

    res.redirect('/user/turns')
}

async function validateEmail(req, res) {
    res.redirect('/')
}

async function deleteUser(req, res) {
    await User.findByIdAndDelete(req.session.user.id)
    req.session.destroy()
    res.redirect("/")
}

//logout (destroy)
function logout(req, res) {
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    getRegisterForm,
    sendRegisterForm,
    getLoginForm,
    sendLoginForm,
    getSettings,
    sendSettings,
    validateEmail,
    deleteUser,
    logout
}