import { MongoClient } from "mongodb";
import { uri } from "../index.js";

export const getBoardList = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const returnedBoardList = await boardlist.findOne(query);
    res.send(returnedBoardList.boards);
  } finally {
    await client.close();
  }
};

export const createBoard = async (req, res) => {
  const client = new MongoClient(uri);
  const newBoard = req.body.board;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");

    const query = { username: "Alex" };
    const newDocument = {
      $push: { boards: newBoard },
    };

    const updatedBoards = await boardlist.updateOne(query, newDocument);
    res.send(updatedBoards);
  } finally {
    await client.close();
  }
};

export const deleteBoard = async (req, res) => {
  const client = new MongoClient(uri);
  const deleteBoard = req.body.boardId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const newDocumentBoards = {
      $pull: { boards: { boardId: deleteBoard } },
    };
    const newDocumentLists = {
      $pull: { lists: { boardId: deleteBoard } },
    };
    const updateLists = await boardlist.updateOne(query, newDocumentLists);
    const updatedBoards = await boardlist.updateOne(query, newDocumentBoards);
    res.send(updateLists);
    res.send(updatedBoards);
  } finally {
    await client.close();
  }
};

export const changeBoardTitle = async (req, res) => {
  const client = new MongoClient(uri);
  const { boardTitle, boardId } = req.body.params;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
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

    const updatedBoardTitle = await boardlist.updateOne(query, newDocument);
    res.send(updatedBoardTitle);
  } finally {
    await client.close();
  }
};
