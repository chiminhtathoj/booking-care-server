import db from "../models/index"

const getTopDoctor = (limitOutput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = ""
            doctor = await db.User.findAll({
                limit: parseInt(limitOutput),
                where: {
                    roleId: "R2"
                },
                order: [['id', 'DESC']],
                attributes: {
                    exclude: ["password"],

                },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["valueEn", "valueVi"] }
                ],
                raw: true,
                nest: true

            })
            resolve(doctor)
        } catch (error) {
            reject({
                errCode: 1,
                message: "Fail to get top doctor in doctorservice"
            })
        }
    })
}
module.exports = {
    getTopDoctor
}