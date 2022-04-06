import express from "express";

const getHomePage = (req, res) => {
    return res.render("homePage.ejs")
}

module.exports = {
    getHomePage
}