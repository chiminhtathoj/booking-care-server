import express from "express";
import homeController from "../controllers/homeController"


const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/crud", homeController.getCrud)
    router.post("/post-crud", homeController.postCrud)
    router.get("/displayCrud", homeController.displayCrud)
    router.get("/edit-crud", homeController.getEditCrud)
    router.post("/put-crud", homeController.putUpdateCrud)
    // router.get("/put-crud", homeController.getUpdateCrud)
    return app.use("/", router)
}

module.exports = initWebRoutes;