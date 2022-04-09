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

const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

module.exports = {
    createNewUser
}