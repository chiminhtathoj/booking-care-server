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

module.exports = {
    getHomePage,
    getCrud,
    postCrud,
    displayCrud
}