import express from "express";
import homeController from "../controllers/homeController"
import loginController from "../controllers/loginController"
import userController from "../controllers/userController"


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

    router.put("/api/create-new-user", loginController.handleCreateNewUser)
    router.delete("/api/delete-user", loginController.handleDeleteUser)
    router.patch("/api/edit-user", loginController.handleEditUser)


    router.get("/api/get-allcode", userController.handleGetAllCode)

    return app.use("/", router)
}

module.exports = initWebRoutes;