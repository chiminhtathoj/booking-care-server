import bcrypt from "bcryptjs"
import db from "../models/index"
const salt = bcrypt.genSaltSync(10);


const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const password = hashPassword(data.password)
            await db.User.create({
                email: data.email,
                phoneNumber: data.phonenumber,
                password: password,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleid,
            })
            resolve("created new user")
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findAll({
                raw: true
            })
            resolve(data)
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}
const getOneUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true
            })
            if (user)
                resolve(user)
            else
                resolve({})
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const editUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: data.id
                }
            })
            user.firstName = data.firstname
            user.phoneNumber = data.phonenumber
            user.lastName = data.lastname
            user.address = data.address
            await user.save()
            const allUser = await db.User.findAll()
            resolve(allUser)
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

module.exports = {
    createNewUser,
    getAllUser,
    getOneUserById,
    editUserById
}