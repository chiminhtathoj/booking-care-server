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

module.exports = {
    handleGetAllCode,
    handleCreateNewUser
}