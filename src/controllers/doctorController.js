import doctorService from "../services/doctorService"

const handleGetTopDoctor = async (req, res) => {
    try {
        let limit = "10"
        if (req.query.limit) {
            limit = req.query.limit
        }
        const data = await doctorService.getTopDoctor(limit)
        if (data) {
            res.status(200).json({
                errCode: 0,
                message: "Get top doctor by controller success",
                data
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
    }



}

module.exports = {
    handleGetTopDoctor
}