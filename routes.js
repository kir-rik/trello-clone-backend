import { Router } from "express";
import {
  createAction,
  getActionList,
  getActionsAmount,
} from "./controllers/actions-controllers.js";

import {
  createList,
  deleteList,
  changeListTitle,
  getLists,
  updateLists,
} from "./controllers/lists-controllers.js";

import {
  deleteBoard,
  getBoardList,
  createBoard,
  changeBoardTitle,
} from "./controllers/boards-controllers.js";

import {
  createCard,
  changeCardTitle,
  changeCardDescription,
} from "./controllers/cards-controllers.js";

const router = Router();

router.get("/api/get-board-list", getBoardList);

router.get("/api/get-lists", getLists);

router.get("/api/get-action-list", getActionList);

router.get("/api/get-actions-amount", getActionsAmount);

router.post("/api/create-board", createBoard);

router.post("/api/create-list", createList);

router.post("/api/create-card", createCard);

router.post("/api/create-action", createAction);

router.delete("/api/delete-board", deleteBoard);

router.delete("/api/delete-list", deleteList);

router.put("/api/change-board-title", changeBoardTitle);

router.put("/api/change-list-title", changeListTitle);

router.put("/api/change-card-title", changeCardTitle);

router.put("/api/change-card-descr", changeCardDescription);

router.put("/api/update-lists", updateLists);

export default router;
