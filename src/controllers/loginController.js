import LoginService from "../services/loginService"
const handleLogin = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Inputs empty"
        })
    }
    const userData = await LoginService.handleLogin(email, password)
    const errCode = userData.errCode
    const message = userData.message

    return res.status(200).json({
        errCode,
        message,
        user: userData.user ? userData.user : {}
    })
}

const hanldeGetUsers = async (req, res) => {
    const id = req.body.id
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing parameter"
        })
    }
    const users = await LoginService.getUsers(id)

    return res.status(200).json({
        errCode: 0,
        message: "Get users was successed",
        users
    })
}

module.exports = {
    handleLogin,
    hanldeGetUsers
}