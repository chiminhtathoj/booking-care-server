import express from "express";
import db from "../models/index"
import CRUDservice from "../services/CRUDservice"

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll()
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }
}
const getCrud = async (req, res) => {
    try {
        return res.render("crud.ejs");
    }
    catch (error) {
        console.log(error)
    }
}
const postCrud = async (req, res) => {
    try {
        const message = await CRUDservice.createNewUser(req.body);
        console.log(message)
        return res.send(JSON.stringify(req.body));

    }
    catch (error) {
        console.log(error)
    }
}

const displayCrud = async (req, res) => {
    try {
        const data = await CRUDservice.getAllUser()
        return res.render("displayUser.ejs", {
            data
        })
    } catch (error) {
        console.log(error)
    }
}

const getEditCrud = async (req, res) => {
    try {

        const id = parseInt(req.query.id)
        if (id) {
            const data = await CRUDservice.getOneUserById(id)
            return res.render("editCrud.ejs", {
                data
            })
        }
        else
            return res.send("Sai thông tin")
    } catch (error) {

        console.log(error)
    }
}
const putUpdateCrud = async (req, res) => {
    try {
        const userinfo = req.body
        if (userinfo) {
            const data = await CRUDservice.editUserById(userinfo)
            return res.render("displayUser.ejs", { data })
        }
        else
            return res.send("Sai thong tin")
    } catch (error) {
        console.log(error)
    }
}
const getDeleteCrud = async (req, res) => {
    try {
        const id = parseInt(req.query.id)
        if (id) {
            await CRUDservice.deleteUserById(id)
            res.send("Deleted")
        } else {
            res.send("User not found")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getHomePage,
    getCrud,
    postCrud,
    displayCrud,
    getEditCrud,
    putUpdateCrud,
    getDeleteCrud
}