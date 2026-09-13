import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";


const router = Router()
router.verifyJWT()

router.route("/channel/:channelId").get(getSubscribedChannels).post(toggleSubscription);
router.route("/user/:subscribedId").get(getUserChannelSubscribers);

export default router