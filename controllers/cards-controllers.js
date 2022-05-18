import { MongoClient } from "mongodb";
import { uri } from "../index.js";

export const createCard = async (req, res) => {
  const client = new MongoClient(uri);
  const { card, listId } = req.body;
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
      $push: { "lists.$.cards": card },
    };

    const updatedLists = await boardlist.updateOne(query, newDocument);
    res.send(updatedLists);
  } finally {
    await client.close();
  }
};

export const changeCardTitle = async (req, res) => {
  const client = new MongoClient(uri);
  const { cardTitle, listId, cardId } = req.body.params;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
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

    const updatedListTitle = await boardlist.updateOne(
      query,
      newDocument,
      filtered
    );
    res.send(updatedListTitle);
  } finally {
    await client.close();
  }
};

export const changeCardDescription = async (req, res) => {
  const client = new MongoClient(uri);
  const { cardDescription, listId, cardId } = req.body.params;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
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
      $set: {
        "lists.$[outer].cards.$[inner].cardDescription": cardDescription,
      },
    };

    const filtered = {
      arrayFilters: [{ "outer.listId": listId }, { "inner.cardId": cardId }],
    };

    const updatedListTitle = await boardlist.updateOne(
      query,
      newDocument,
      filtered
    );
    res.send(updatedListTitle);
  } finally {
    await client.close();
  }
};
