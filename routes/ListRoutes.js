import { Router } from "express";
import { getDb } from "../db/connect.js";

const ListRouter = Router();

ListRouter.route("/api/get-lists=?:boardId").get(async (req, res) => {
  const boardId = req.params.boardId;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  await dbConnect.collection("board-list").findOne(query, (err, result) => {
    const currentLists = result.lists.filter(
      (list) => list.boardId === boardId
    );
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      res.send(currentLists);
    }
  });
});

ListRouter.route("/api/create-list").post(async (req, res) => {
  const newList = req.body;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  const newDocument = {
    $push: { lists: newList },
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

ListRouter.route("/api/delete-list").delete(async (req, res) => {
  const listId = req.body.listId;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  const newDocument = {
    $pull: { lists: { listId: listId } },
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

ListRouter.route("/api/change-list-title").put(async (req, res) => {
  const { listTitle, listId } = req.body;
  const dbConnect = getDb();
  const query = {
    username: "Alex",
    lists: {
      $elemMatch: { listId: listId },
    },
  };
  const newDocument = {
    $set: {
      "lists.$.listTitle": listTitle,
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

ListRouter.route("/api/update-lists").put(async (req, res) => {
  const updateLists = req.body.listsState;
  const dbConnect = getDb();

  try {
    const query = {
      username: "Alex",
    };
    const currentUser = await dbConnect.collection("board-list").findOne(query);
    const currentLists = currentUser.lists;
    const filtered = currentLists.filter((item1) => {
      return (
        updateLists.findIndex((item2) => item2.listId === item1.listId) === -1
      );
    });
    const resultLists = [...filtered, ...updateLists];
    const updateDocument = {
      $set: { lists: resultLists },
    };
    dbConnect
      .collection("board-list")
      .updateOne(query, updateDocument, (err, result) => {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.send(result);
        }
      });
  } catch (error) {
    console.log(error);
  }
});

export default ListRouter;
