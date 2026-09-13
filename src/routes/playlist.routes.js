import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createPlaylist, getUserPlaylists, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, updatePlaylist } from "../controllers/playlist.controller";

const router = Router()

router.use(verifyJWT)

router.route("/").post(createPlaylist);
router.route("/userPlaylists").get(getUserPlaylists);
router.route("/:playlistID").get(getPlaylistById).patch(updatePlaylist).delete(deletePlaylist);
router.route("/add/:vedioId/:playlistId").patch(addVideoToPlaylist);
router.route("/remove/:vedioId/:playlistId").patch(removeVideoFromPlaylist);
router.route("/user/:userId").get(getUserPlaylists)

export default router