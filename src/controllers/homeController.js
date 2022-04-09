import express from "express";
import db from "../models/index"
import CRUDservice from "../services/CRUDservice"

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll()
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (err) {
        throw err
    }
}
const getCrud = async (req, res) => {
    try {
        return res.render("crud.ejs");
    }
    catch (err) {
        throw err
    }
}
const postCrud = async (req, res) => {
    try {
        const message = await CRUDservice.createNewUser(req.body);
        console.log(message)
        return res.send(JSON.stringify(req.body));

    }
    catch (err) {
        throw err
    }
}

module.exports = {
    getHomePage,
    getCrud,
    postCrud
}