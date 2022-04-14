import express from "express";
import homeController from "../controllers/homeController"
import loginController from "../controllers/loginController"


const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/crud", homeController.getCrud)
    router.post("/post-crud", homeController.postCrud)
    router.get("/displayCrud", homeController.displayCrud)
    router.get("/edit-crud", homeController.getEditCrud)
    router.post("/put-crud", homeController.putUpdateCrud)
    router.get("/delete-crud", homeController.getDeleteCrud)

    router.post("/api/login", loginController.handleLogin)
    router.get("/api/get-users", loginController.hanldeGetUsers)

    return app.use("/", router)
}

module.exports = initWebRoutes;