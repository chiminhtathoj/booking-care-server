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

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {}
            const isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await db.User.findOne({
                    attributes: ["email", "password", "roleId"],
                    where: { email: email },
                    raw: true
                })
                if (user)//check khi co nguoi dang xoa du lieu trong database
                {
                    const isCorrect = bcrypt.compareSync(password, user.password); // true
                    if (isCorrect) {
                        userData.errCode = 0
                        userData.message = "Password is correct"
                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 2
                        userData.message = "Password is not correct"
                    }
                }
                else {
                    userData.errCode = 3
                    userData.message = "User is not exist"
                }

            }
            else {
                userData.errCode = 1
                userData.message = `email is not exist `

            }
            resolve(userData)
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
                    attributes: {
                        excludes: ["password"]
                    }
                })
            }
            if (userId !== "ALL" && userId) {
                user = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        excludes: ["password"]
                    }
                })
            }

            resolve(user)
        } catch (error) {
            reject(error)
        }

    })
}

const createNewUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await checkUserEmail(userInfo.email)
            if (isExist) {
                resolve({
                    errCode: 1,
                    message: "your email already taken"
                })
            }
            const password = hashPassword(userInfo.password)
            await db.User.create({
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                password: password,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address,
                gender: userInfo.gender === "1" ? true : false,
                roleId: userInfo.roleId,
            })
            resolve({
                errCode: 0,
                message: "create new user succeed"
            })
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
            const user = await db.User.findOne({
                where: {
                    id: userInfo.id
                },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "the user not found!"
                })
            }
            else {
                user.email = userInfo.email,
                    user.firstName = userInfo.firstName,
                    user.lastName = userInfo.lastName

                await user.save()
            }
            resolve({
                errCode: 0,
                message: "edit succeed"
            })
        } catch (error) {
            reject(error)
        }
    })
}

const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

module.exports = {
    handleLogin,
    getUsers,
    createNewUser,
    deleteUser,
    editUser
}