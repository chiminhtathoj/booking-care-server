import express from "express";
import homeController from "../controllers/homeController"
import loginController from "../controllers/loginController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"



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
    //user
    router.get("/api/get-users", userController.hanldeGetUsers)
    router.put("/api/create-new-user", userController.handleCreateNewUser)
    router.delete("/api/delete-user", userController.handleDeleteUser)
    router.patch("/api/edit-user", userController.handleEditUser)
    router.get("/api/get-allcode", userController.handleGetAllCode)

    //doctor

    router.get("/api/get-top-doctor", doctorController.handleGetTopDoctor)
    router.get("/api/get-all-doctor", doctorController.handleGetAllDoctor)
    router.post("/api/create-info-doctor", doctorController.handleCreateInfoDoctor)
    router.get("/api/get-detail-doctor", doctorController.handleGetDetailDoctorById)
    router.get("/api/get-markdown-doctor", doctorController.handleGetMarkdownDoctorById)
    router.post("/api/create-bulk-schedule", doctorController.handleCreateBulkSchedule)
    router.get("/api/get-schedule-doctor", doctorController.handleGetScheduleDoctor)
    router.get("/api/get-extra-info-doctor-by-id", doctorController.handleGetExtraInfoDoctorById)
    router.get("/api/get-profile-doctor-by-id", doctorController.handleGetProfileDoctorById)

    //patient
    router.post("/api/find-or-create-appointment", patientController.postBookAppointment)




    return app.use("/", router)
}

module.exports = initWebRoutes;