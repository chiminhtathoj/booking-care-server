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

module.exports = {
    handleGetAllCode
}