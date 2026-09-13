import {Router} from "express";
import {changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, logoutUser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyJWT)

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

//change Password
router.route("/change-password").post(verifyJWT, changeCurrentPassword)

//get current user
router.route("/current-user").get(verifyJWT, getCurrentUser)

//update account details
router.route("/update_account").patch(verifyJWT, updateAccountDetails)

//avtar update
router.route("/update-avatr").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

//image update
router.route("/image-update").patch(verifyJWT, upload.single("/coverImage"), updateUserCoverImage)

//user profile
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

//watch History
router.route("/watchHistory").get(verifyJWT, getWatchHistory)

export default router