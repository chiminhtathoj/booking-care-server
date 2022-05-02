import db from "../models/index"
import 'dotenv/config'
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

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
//create and update if exist
const createInfoDoctor = (infoDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!infoDoctor.doctorId || !infoDoctor.contentHTML || !infoDoctor.contentMarkdown || !infoDoctor.action
                || !infoDoctor.priceId || !infoDoctor.paymentId || !infoDoctor.provinceId || !infoDoctor.nameClinic || !infoDoctor.addressClinic
            ) {
                resolve({
                    errCode: 2,
                    message: "Fail to save info doctor in doctor service(input not enough!)"
                })
            }
            else {
                if (infoDoctor.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: infoDoctor.contentHTML,
                        contentMarkdown: infoDoctor.contentMarkdown,
                        description: infoDoctor.description,
                        doctorId: infoDoctor.doctorId
                    })
                    await db.Doctor_Info.create({
                        doctorId: infoDoctor.doctorId,
                        priceId: infoDoctor.priceId,
                        paymentId: infoDoctor.paymentId,
                        provinceId: infoDoctor.provinceId,
                        nameClinic: infoDoctor.nameClinic,
                        addressClinic: infoDoctor.addressClinic,
                        note: infoDoctor.note
                    })
                }
                else if (infoDoctor.action === "EDIT") {
                    const markdown = await db.Markdown.findOne({
                        where: {
                            doctorId: infoDoctor.doctorId
                        },
                        raw: false
                    })
                    if (markdown) {
                        markdown.contentHTML = infoDoctor.contentHTML,
                            markdown.contentMarkdown = infoDoctor.contentMarkdown,
                            markdown.description = infoDoctor.description
                        await markdown.save()
                    }
                }
                const doctorInfo = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: infoDoctor.doctorId
                    },
                    raw: false
                })
                if (doctorInfo) {
                    doctorInfo.doctorId = infoDoctor.doctorId
                    doctorInfo.priceId = infoDoctor.priceId,
                        doctorInfo.paymentId = infoDoctor.paymentId,
                        doctorInfo.provinceId = infoDoctor.provinceId,
                        doctorInfo.nameClinic = infoDoctor.nameClinic,
                        doctorInfo.addressClinic = infoDoctor.addressClinic,
                        doctorInfo.note = infoDoctor.note
                    await doctorInfo.save()
                }
                else {
                    await db.Doctor_Info.create({
                        doctorId: infoDoctor.doctorId,
                        priceId: infoDoctor.priceId,
                        paymentId: infoDoctor.paymentId,
                        provinceId: infoDoctor.provinceId,
                        nameClinic: infoDoctor.nameClinic,
                        addressClinic: infoDoctor.addressClinic,
                        note: infoDoctor.note
                    })
                }
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
                        },
                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ["id", "doctorId"]
                            },
                            include: [
                                { model: db.Allcode, as: "priceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.Allcode, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                                { model: db.Allcode, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                            ]
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

const getMarkdownDoctorById = (idDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor) {
                resolve({
                    errCode: 2,
                    message: "Missing parameter"
                })
            }
            else {
                const data = await db.Markdown.findOne({
                    where: {
                        doctorId: idDoctor
                    },
                    attributes: {
                        exclude: ["specialtyId", "clinicId"],
                    },
                })
                resolve({
                    errCode: 0,
                    message: "Get Markdown doctor by id succeed",
                    data
                })
            }
        } catch (error) {
            console.log(error)
            reject({
                errCode: 1,
                message: "Fail to Get Markdown doctor by id in doctor service"
            })
        }
    })
}

const createBulkSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = []
            if (!data.arrSchedule) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter createBulkSchedule"
                })
            }
            else if (data.arrSchedule && data.arrSchedule.length > 0) {
                schedule = data.arrSchedule.map((item) => {
                    item.maxNumber = MAX_NUMBER_SCHEDULE
                    return item
                })
                //get data exist
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    }
                })
                //get differen data between schedule and existing
                const dataCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.typeDate === b.typeDate && +a.date === +b.date
                })
                if (dataCreate && dataCreate.length > 0)
                    await db.Schedule.bulkCreate(dataCreate)

                resolve({
                    errCode: 0,
                    message: "create bulk schedule successed!"
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}

const getScheduleDoctorById = (idDoctor, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            }
            else {
                const dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: idDoctor,
                        date: date
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: "timeTypeData",
                            attributes: ["valueEn", "valueVi"]

                        }
                    ],
                    raw: false,
                    nested: true
                })
                if (!dataSchedule)
                    dataSchedule = []
                resolve({
                    errCode: 0,
                    message: "get schedule doctor by id and date successed",
                    data: dataSchedule
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getExtraInfoDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            }
            else {
                let dataExtraInfo = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: id
                    },
                    attributes: {
                        exclude: ["id", "doctorId"],
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: "priceData",
                            attributes: ["valueEn", "valueVi"]
                        },
                        {
                            model: db.Allcode,
                            as: "provinceData",
                            attributes: ["valueEn", "valueVi"]
                        },
                        {
                            model: db.Allcode,
                            as: "paymentData",
                            attributes: ["valueEn", "valueVi"]
                        }
                    ],
                    raw: false,
                    nested: true
                })
                if (!dataExtraInfo)
                    dataExtraInfo = {}
                resolve({
                    errCode: 0,
                    data: dataExtraInfo
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctor,
    getAllDoctor,
    createInfoDoctor,
    getDetailDoctorById,
    getMarkdownDoctorById,
    createBulkSchedule,
    getScheduleDoctorById,
    getExtraInfoDoctorById
}