import { MongoClient } from "mongodb";
import { uri } from "../index.js";

export const getActionList = async (req, res) => {
  const client = new MongoClient(uri);
  const { listId, cardId } = req.query;
  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const currentBoardList = await boardlist.findOne(query);
    const currentActionList = currentBoardList.actions.filter(
      (list) => list.listId === listId && list.cardId === cardId
    );
    res.send(currentActionList);
  } finally {
    await client.close();
  }
};

export const getActionsAmount = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const currentBoardList = await boardlist.findOne(query);
    const actions = currentBoardList.actions;
    res.send(actions);
  } finally {
    await client.close();
  }
};

export const createAction = async (req, res) => {
  const client = new MongoClient(uri);
  const newAction = req.body.action;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");

    const query = { username: "Alex" };
    const newDocument = {
      $push: { actions: newAction },
    };

    const updatedActions = await boardlist.updateOne(query, newDocument);
    res.send(updatedActions);
  } finally {
    await client.close();
  }
};
