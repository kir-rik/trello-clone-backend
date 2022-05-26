import { Router } from "express";
import { getDb } from "../db/connect.js";
import logger from "../logger.js";

const BoardRouter = Router();

BoardRouter.route("/api/get-board-list").get(async (_req, res) => {
  const dbConnect = getDb();
  const query = { username: "Alex" };
  await dbConnect.collection("board-list").findOne(query, (err, result) => {
    if (err) {
      res.status(400).send("Error fetching get boards list!");
      logger.info("Error fetching get boards list!");
    } else {
      res.status(200).send(result.boards);
      logger.info("Success fetching get boards list!");
    }
  });
});

BoardRouter.route("/api/create-board").post(async (req, res) => {
  const newBoard = req.body;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  const newDocument = {
    $push: { boards: newBoard },
  };
  await dbConnect
    .collection("board-list")
    .updateOne(query, newDocument, (err, result) => {
      if (err) {
        res.status(400).send("Error create board!");
        logger.info("Error fetching create board!");
      } else {
        res.status(200).send(result);
        logger.info("Success fetching create board!");
      }
    });
});

BoardRouter.route("/api/delete-board").delete(async (req, res) => {
  const deleteBoard = req.body.boardId;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  const newDocumentBoards = {
    $pull: { boards: { boardId: deleteBoard } },
  };
  await dbConnect
    .collection("board-list")
    .updateOne(query, newDocumentBoards, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching delete-board!");
        logger.info("Error fetching delete-board!");
      } else {
        res.status(200).send(result);
        logger.info("Success fetching delete-board!");
      }
    });
});

BoardRouter.route("/api/change-board-title").put(async (req, res) => {
  const { boardTitle, boardId } = req.body;
  const dbConnect = getDb();
  const query = {
    username: "Alex",
    boards: {
      $elemMatch: { boardId: boardId },
    },
  };
  const newDocument = {
    $set: {
      "boards.$.boardTitle": boardTitle,
    },
  };
  await dbConnect
    .collection("board-list")
    .updateOne(query, newDocument, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching change board title!");
        logger.info("Error fetching change board title!");
      } else {
        res.send(result);
        logger.info("Success fetching change board title!");
      }
    });
});

export default BoardRouter;
