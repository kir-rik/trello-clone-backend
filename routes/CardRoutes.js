import { Router } from "express";
import { getDb } from "../db/connect.js";

const CardRouter = Router();

CardRouter.route("/api/create-card").post(async (req, res) => {
  const { card, listId } = req.body;
  const dbConnect = getDb();
  const query = {
    username: "Alex",
    lists: {
      $elemMatch: { listId: listId },
    },
  };
  const newDocument = {
    $push: { "lists.$.cards": card },
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

CardRouter.route("/api/change-card-title").put(async (req, res) => {
  const { cardTitle, listId, cardId } = req.body;
  const dbConnect = getDb();
  const query = {
    username: "Alex",
    lists: {
      $elemMatch: {
        listId: listId,
        "cards.cardId": cardId,
      },
    },
  };
  const newDocument = {
    $set: { "lists.$[outer].cards.$[inner].cardTitle": cardTitle },
  };
  const filtered = {
    arrayFilters: [{ "outer.listId": listId }, { "inner.cardId": cardId }],
  };
  await dbConnect
    .collection("board-list")
    .updateOne(query, newDocument, filtered, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.send(result);
      }
    });
});

CardRouter.route("/api/change-card-descr").put(async (req, res) => {
  const { cardDescription, listId, cardId } = req.body;
  const dbConnect = getDb();
  const query = {
    username: "Alex",
    lists: {
      $elemMatch: {
        listId: listId,
        "cards.cardId": cardId,
      },
    },
  };
  const newDocument = {
    $set: { "lists.$[outer].cards.$[inner].cardDescription": cardDescription },
  };
  const filtered = {
    arrayFilters: [{ "outer.listId": listId }, { "inner.cardId": cardId }],
  };
  await dbConnect
    .collection("board-list")
    .updateOne(query, newDocument, filtered, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.send(result);
      }
    });
});

export default CardRouter;
