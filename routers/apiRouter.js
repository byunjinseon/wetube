import express from "express";
import routes from "../routes";
import { deleteComment, postAddComment, postRegisterView } from "../controllers/videoController";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);
apiRouter.get(routes.deleteComment, onlyPrivate, deleteComment);

export default apiRouter;