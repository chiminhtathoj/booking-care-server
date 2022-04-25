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
const getUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = ""
            if (userId === "ALL") {
                user = await db.User.findAll({
                    attributes: { exclude: ['password'] }
                })
            }
            if (userId !== "ALL" && userId) {
                user = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: { exclude: ['password'] }
                })
            }
            resolve(user)
        } catch (error) {
            reject(error)
        }

    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "the user not found!"
                })
            }
            else
                user.destroy()
            resolve({
                errCode: 0,
                message: "deleted"
            })
        } catch (error) {
            reject(error)
        }
    })
}

const editUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userInfo.id || userInfo.roleId || userInfo.positionId || userInfo.gender) {
                const user = await db.User.findOne({
                    where: {
                        id: userInfo.id
                    },
                    raw: false,
                    attributes: { exclude: ['password'] }
                })
                if (!user) {
                    resolve({
                        errCode: 2,
                        message: "the user not found!"
                    })
                }
                else {
                    user.firstName = userInfo.firstName,
                        user.lastName = userInfo.lastName,
                        user.address = userInfo.address,
                        user.phoneNumber = userInfo.phoneNumber,
                        user.roleId = userInfo.roleId,
                        user.positionId = userInfo.positionId,
                        user.gender = userInfo.gender

                    await user.save()
                }
                resolve({
                    errCode: 0,
                    message: "edit succeed"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "missing parameter"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCode,
    createNewUser,
    getUsers,
    deleteUser,
    editUser
}