import db from "../models/index"
import bcrypt from "bcryptjs"
const salt = bcrypt.genSaltSync(10);

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await db.User.findOne({
                where: { email: userEmail }
            })
            if (isExist)
                resolve(true)
            else
                resolve(false)
        } catch (error) {
            reject(error)
        }
    })
}
const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}


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
const createNewUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userInfo) {
                const isExist = await checkUserEmail(userInfo.email)
                if (isExist) {
                    resolve({
                        errCode: 1,
                        message: "your email already taken"
                    })
                }
                else {
                    const password = hashPassword(userInfo.password)
                    await db.User.create({
                        email: userInfo.email,
                        phoneNumber: userInfo.phoneNumber,
                        password: password,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        address: userInfo.address,
                        gender: userInfo.gender,
                        roleId: userInfo.roleId,
                        positionId: userInfo.positionId,
                        image: userInfo.image
                    })
                }
                resolve({
                    errCode: 0,
                    message: "create new user succeed"
                })
            }
            else {
                resolve({
                    errCode: 2,
                    message: "invalid input"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCode,
    createNewUser
}