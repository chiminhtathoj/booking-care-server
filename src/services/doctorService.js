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
            resolve(
                {
                    errCode: 0,
                    message: "get top doctor successed",
                    data: doctor
                })
        } catch (error) {
            reject({
                errCode: 1,
                message: "Fail to get top doctor in doctorservice"
            })
        }
    })
}
const getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDoctor = ""
            allDoctor = await db.User.findAll({
                where: {
                    roleId: "R2"
                },
                attributes: {
                    exclude: ["password", "image"],

                }
            })
            resolve({
                errCode: 0,
                message: "get all doctor successed",
                data: allDoctor
            })
        } catch (error) {
            console.log(error)
            reject({
                errCode: 1,
                message: "Fail to get all doctor in doctorservice"
            })
        }
    })
}

const createInfoDoctor = (infoDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!infoDoctor.doctorId || !infoDoctor.contentHTML || !infoDoctor.contentMarkdown) {
                resolve({
                    errCode: 2,
                    message: "Fail to save info doctor in doctor service(input not enough!)"
                })
            }
            else {
                await db.Markdown.create({
                    contentHTML: infoDoctor.contentHTML,
                    contentMarkdown: infoDoctor.contentMarkdown,
                    description: infoDoctor.description,
                    doctorId: infoDoctor.doctorId
                })
                resolve({
                    errCode: 0,
                    message: "create info doctor successed"
                })
            }
        } catch (error) {
            console.log(error)
            reject({
                errCode: 1,
                message: "Fail to save info doctor in doctor service"
            })
        }
    })
}

const getDetailDoctorById = (idDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor) {
                resolve({
                    errCode: 2,
                    message: "Missing parameter"
                })
            }
            else {
                const data = await db.User.findOne({
                    where: {
                        id: idDoctor
                    },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ["description", "contentHTML", "contentMarkdown"]
                        },
                        {
                            model: db.Allcode,
                            attributes: ["valueEn", "valueVi"],
                            as: "positionData",
                        }
                    ],
                    raw: false,
                    nested: true
                })
                if (data && data.image) {
                    data.image = new Buffer.from(data.image, "base64").toString("binary");
                }
                resolve({
                    errCode: 0,
                    message: "Get detail doctor succeed",
                    data
                })
            }
        } catch (error) {
            console.log(error)
            reject({
                errCode: 1,
                message: "Fail to get detail doctor in doctor service"
            })
        }
    })
}
module.exports = {
    getTopDoctor,
    getAllDoctor,
    createInfoDoctor,
    getDetailDoctorById
}