import { Router } from "express";
import { getDb } from "../db/connect.js";

const BoardRouter = Router();

BoardRouter.route("/api/get-board-list").get(async (_req, res) => {
  const dbConnect = getDb();
  const query = { username: "Alex" };
  await dbConnect.collection("board-list").findOne(query, (err, result) => {
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      res.send(result.boards);
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
        res.status(400).send("Error fetching listings!");
      } else {
        res.send(result);
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
        res.status(400).send("Error fetching listings!");
      } else {
        res.send(result);
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
        res.status(400).send("Error fetching listings!");
      } else {
        res.send(result);
      }
    });
});

export default BoardRouter;
