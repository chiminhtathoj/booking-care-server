import db from "../models/index"
import bcrypt from "bcryptjs"
const salt = bcrypt.genSaltSync(10);

const getAllCode = (inputType) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (inputType) {
                const res = {}
                const data = await db.Allcode.findAll({
                    where: {
                        type: inputType
                    }
                })
                res.errCode = 0
                res.data = data
                resolve(res)
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCode
}