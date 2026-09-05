import mongoose, { Aggregate } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { comment } from "postcss"
import { ApiProvider } from "@reduxjs/toolkit/query/react"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        }
    ])
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
   const {content} = req.body
   const {videoId} =req.params

   if (!content?.trim()){
    throw new ApiError(400, 'Comment content is required')
   }
   const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id
   })

   if(!comment){
    throw new ApiError (500, "something went wrong while adding comment")
   }

   return res.status(200).json(
    new ApiResponse(200, comment, "Comment added Successfullly")
   )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params

    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, "No Comment found")
    }
    if(comment.owner.toString() !== req.user._id.toString()){
        throw new ApiError (403, "you can not update someone else's comment")
    }

    const {content} = req.body
    if(!content?.trim()){
        throw new ApiError(400, "New commnet required")
    }

    comment.content = content
    await comment.save()
    return res.status(200).json(new ApiResponse(200, {}, "Commnet updated"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, "No Comment found")
    }
    if(comment.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You cannot delte someone else's comment")
    }

    await comment.deleteOne()
    return res.status(200).json( new ApiResponse(200, {}, "Comment delted Successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }