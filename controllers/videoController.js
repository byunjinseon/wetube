import routes from "../routes";
import Video from "../models/Video";
import { set } from "mongoose";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", {pageTitle: "home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", { pagetTitle: "Home", videos: [] });
    }
}
export const search = async (req, res) => {
    const {
        query: {term: searchingBy}
    } = req;
    let videos = [];
    try {
        videos = await Video.find({ title: {$regex: searchingBy, $options: "i"}});
    } catch(error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "::SEARCH::", searchingBy, videos});
}
export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "::UPLOAD::" });
};
export const postUpload = async(req, res) => {
    const { 
        body: { title, description },
        file: { path } 
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch(error) {
        res.redirect(routes.home);
    }
}
export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `::EDIT::${video.title}`, video });
    } catch(error) {
        res.redirect(routes.home);
    }
    res.render("editVideo", { pageTitle: "::EDITVIDEO::" });
}

export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;
    try {
        await Video.findOneAndUpdate({_id:id}, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch {
        req.redirect(routes.home);
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        await Video.findOneAndRemove({_id:id});
    } catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
}