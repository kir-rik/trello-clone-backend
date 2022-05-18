import { MongoClient } from "mongodb";
import { uri } from "../index.js";

export const getLists = async (req, res) => {
  const client = new MongoClient(uri);
  const boardId = req.query.boardId;
  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const currentUser = await boardlist.findOne(query);
    const currentLists = currentUser.lists.filter(
      (list) => list.boardId === boardId
    );

    res.send(currentLists);
  } finally {
    await client.close();
  }
};

export const createList = async (req, res) => {
  const client = new MongoClient(uri);
  const newList = req.body.list;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");

    const query = { username: "Alex" };
    const newDocument = {
      $push: { lists: newList },
    };

    const updatedLists = await boardlist.updateOne(query, newDocument);
    res.send(updatedLists);
  } finally {
    await client.close();
  }
};

export const deleteList = async (req, res) => {
  const client = new MongoClient(uri);
  const listId = req.body.listId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const newDocument = {
      $pull: { lists: { listId: listId } },
    };

    const updatedLists = await boardlist.updateOne(query, newDocument);
    res.send(updatedLists);
  } finally {
    await client.close();
  }
};

export const changeListTitle = async (req, res) => {
  const client = new MongoClient(uri);
  const { listTitle, listId } = req.body.params;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
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

    const updatedListTitle = await boardlist.updateOne(query, newDocument);
    res.send(updatedListTitle);
  } finally {
    await client.close();
  }
};

export const updateLists = async (req, res) => {
  const client = new MongoClient(uri);
  const updateLists = req.body.listsState;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = {
      username: "Alex",
    };

    const currentUser = await boardlist.findOne(query);
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
    const updatedLists = await boardlist.updateOne(query, updateDocument);
    res.send(updatedLists);
  } finally {
    await client.close();
  }
};
