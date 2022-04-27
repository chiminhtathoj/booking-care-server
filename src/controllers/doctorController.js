import doctorService from "../services/doctorService"

const handleGetTopDoctor = async (req, res) => {
    try {
        let limit = "10"
        if (req.query.limit) {
            limit = req.query.limit
        }
        const topDoctor = await doctorService.getTopDoctor(limit)
        if (topDoctor && topDoctor.errCode === 0) {
            res.status(200).json({
                errCode: topDoctor.errCode,
                message: "Get top doctor by controller success",
                data: topDoctor.data
            })
        }
        else {
            res.status(500).json({
                errCode: 1,
                message: "Get top doctor by controller failed!"
            })
        }
    } catch (error) {
        console.log("handleGetTopDoctor", error)
        res.status(500).json({
            errCode: 1,
            message: "Get top doctor by controller failed!"
        })
    }
}

const handleGetAllDoctor = async (req, res) => {
    try {
        const AllDoctor = await doctorService.getAllDoctor()
        if (AllDoctor && AllDoctor.errCode === 0) {
            res.status(200).json({
                errCode: AllDoctor.errCode,
                message: "Get all doctor by controller success",
                data: AllDoctor.data
            })
        }
        else {
            res.status(500).json({
                errCode: 1,
                message: "Get all doctor by controller failed!"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "Get all doctor by controller failed!"
        })
    }
}

const handleCreateInfoDoctor = async (req, res) => {
    try {
        const inputInfo = req.body
        const infoDoctor = await doctorService.createInfoDoctor(inputInfo)
        if (infoDoctor && infoDoctor.errCode === 0) {
            res.status(200).json({
                errCode: infoDoctor.errCode,
                message: "create info doctor by controller success"
            })
        }
        else {
            res.status(500).json({
                errCode: 1,
                message: "create info doctor by controller failed!"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "create doctor by controller failed!"
        })
    }
}
module.exports = {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateInfoDoctor
}