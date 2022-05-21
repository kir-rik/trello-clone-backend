import { Router } from "express";
import { getDb } from "../db/connect.js";

const ActionRouter = Router();

ActionRouter.route("/api/get-action-list=?:cardId").get(async (req, res) => {
  const cardId = req.params.cardId;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  await dbConnect.collection("board-list").findOne(query, (err, result) => {
    const currentActionList = result.actions.filter(
      (list) => list.cardId === cardId
    );
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      res.send(currentActionList);
    }
  });
});

ActionRouter.route("/api/create-action").post(async (req, res) => {
  const newAction = req.body;
  const dbConnect = getDb();
  const query = { username: "Alex" };
  const newDocument = {
    $push: { actions: newAction },
  };
  dbConnect
    .collection("board-list")
    .updateOne(query, newDocument, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.send(result);
      }
    });
});

export default ActionRouter;
