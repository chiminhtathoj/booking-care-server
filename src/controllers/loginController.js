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
    const id = req.query.id
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


const handleCreateNewUser = async (req, res) => {

    const data = req.body
    const newUser = await LoginService.createNewUser(data)
    return res.status(200).json({
        errCode: newUser.errCode,
        message: newUser.message
    })

}

const handleDeleteUser = async (req, res) => {
    const userId = req.body.id
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: "the user not found"
        })
    }
    const userDeleted = await LoginService.deleteUser(userId)
    return res.status(200).json({
        errCode: userDeleted.errCode,
        message: userDeleted.message
    })
}

const handleEditUser = async (req, res) => {
    const userInfo = req.body
    if (!userInfo.id) {
        return res.status(200).json({
            errCode: 1,
            message: "the user not found"
        })
    }
    const userEdited = await LoginService.editUser(userInfo)
    return res.status(200).json({
        errCode: userEdited.errCode,
        message: userEdited.message
    })
}

module.exports = {
    handleLogin,
    hanldeGetUsers,
    handleCreateNewUser,
    handleDeleteUser,
    handleEditUser
}