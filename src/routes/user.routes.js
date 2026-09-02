import {Router} from "express";
import { loginUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,

        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

//router.prototype("/login").post(login)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)

//refresh
router.route("/refresh-token").post(refreshAccessToken)

export default router