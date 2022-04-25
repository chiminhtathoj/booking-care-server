import userService from "../services/userService"

const handleGetAllCode = async (req, res) => {
    try {
        const data = await userService.getAllCode(req.query.type)
        return res.status(200).json(data)
    } catch (error) {
        console.log("get all code error", error)
        return res.status(200).json({
            errCode: -1,
            message: "error from server"
        })
    }
}

const handleCreateNewUser = async (req, res) => {

    const data = req.body
    const newUser = await userService.createNewUser(data)
    return res.status(200).json({
        errCode: newUser.errCode,
        message: newUser.message
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
    const users = await userService.getUsers(id)
    return res.status(200).json({
        errCode: 0,
        message: "Get users was successed",
        users
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
    const userDeleted = await userService.deleteUser(userId)
    return res.status(200).json({
        errCode: userDeleted.errCode,
        message: userDeleted.message
    })
}

const handleEditUser = async (req, res) => {
    console.log(req.body)
    const userInfo = req.body
    if (!userInfo.id) {
        return res.status(200).json({
            errCode: 1,
            message: "the user not found"
        })
    }
    const userEdited = await userService.editUser(userInfo)
    return res.status(200).json({
        errCode: userEdited.errCode,
        message: userEdited.message
    })
}

module.exports = {
    handleGetAllCode,
    handleCreateNewUser,
    hanldeGetUsers,
    handleDeleteUser,
    handleEditUser
}