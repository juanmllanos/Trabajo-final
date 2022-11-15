const bcrypt = require('bcrypt')
const saltRound = 10

const encrypt = async (password) => {
    return await bcrypt.hash(password, saltRound)
}

const uncrypt = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = { encrypt, uncrypt}