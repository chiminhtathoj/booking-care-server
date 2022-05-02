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

const handleGetDetailDoctorById = async (req, res) => {
    try {
        const idDoctor = req.query.id
        const infoDoctor = await doctorService.getDetailDoctorById(idDoctor)
        if (infoDoctor && infoDoctor.errCode === 0) {
            res.status(200).json({
                errCode: infoDoctor.errCode,
                message: "get detail doctor by controller success",
                data: infoDoctor.data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "get detail doctor by controller failed!"
        })
    }
}

const handleGetMarkdownDoctorById = async (req, res) => {
    try {
        const idDoctor = req.query.id
        const markdownDoctor = await doctorService.getMarkdownDoctorById(idDoctor)
        if (markdownDoctor && markdownDoctor.errCode === 0) {
            res.status(200).json({
                errCode: markdownDoctor.errCode,
                message: markdownDoctor.message,
                data: markdownDoctor.data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "get markdown doctor by controller failed!"
        })
    }
}

const handleCreateBulkSchedule = async (req, res) => {
    try {
        const data = req.body
        let schedule = await doctorService.createBulkSchedule(data)
        if (schedule && schedule.errCode === 0) {
            res.status(200).json({
                errCode: schedule.errCode,
                message: schedule.message
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "create bulkschedule by controller failed!"
        })
    }
}

const handleGetScheduleDoctor = async (req, res) => {
    try {
        const data = req.query
        let scheduleDoctor = await doctorService.getScheduleDoctorById(data.idDoctor, data.date)
        if (scheduleDoctor && scheduleDoctor.errCode === 0) {
            res.status(200).json({
                errCode: scheduleDoctor.errCode,
                message: scheduleDoctor.message,
                data: scheduleDoctor.data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "get schedule doctor by controller failed!"
        })
    }
}

const handleGetExtraInfoDoctorById = async (req, res) => {
    try {
        const doctorId = req.query.id
        let extraInfoDoctor = await doctorService.getExtraInfoDoctorById(doctorId)
        if (extraInfoDoctor && extraInfoDoctor.errCode === 0) {
            res.status(200).json({
                errCode: extraInfoDoctor.errCode,
                message: extraInfoDoctor.message,
                data: extraInfoDoctor.data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "get extra info doctor by controller failed!"
        })
    }
}
module.exports = {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateInfoDoctor,
    handleGetDetailDoctorById,
    handleGetMarkdownDoctorById,
    handleCreateBulkSchedule,
    handleGetScheduleDoctor,
    handleGetExtraInfoDoctorById
}