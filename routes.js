import { Router } from "express";
import { getBoardList, updateBoardList } from "./controllers.js";

const router = Router();

router.get("/api/get-board-list", getBoardList);

router.put("/api/update-board-list", updateBoardList);

export default router;
