import patientService from "../services/patientService"
const postBookAppointment = async (req, res) => {
    try {
        const bookAppointment = await patientService.postBookAppointment(req.body);
        if (bookAppointment && bookAppointment.errCode === 0) {
            res.status(200).json({
                errCode: bookAppointment.errCode,
                message: bookAppointment.message
            })
        }
        else {
            res.status(500).json({
                errCode: 1,
                message: "create post book appointment by controller failed!"
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            errCode: 1,
            message: "create post book appointment controller failed!"
        })
    }
}

module.exports = {
    postBookAppointment
}