import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://alexreb:CZ8K8iPVpx2AHp8@cluster0.ianf7.mongodb.net/Cluster0?retryWrites=true&w=majority";

export const getBoardList = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");
    const query = { username: "Alex" };
    const returnedBoardList = await boardlist.findOne(query);
    res.send(returnedBoardList);
  } finally {
    await client.close();
  }
};

export const updateBoardList = async (req, res) => {
  const client = new MongoClient(uri);
  const updateBoardList = req.body.state;

  try {
    await client.connect();
    const database = client.db("app-data");
    const boardlist = database.collection("board-list");

    const query = { username: "Alex" };
    const updateDocument = {
      $set: { boardList: updateBoardList },
    };

    const insertedBoardList = await boardlist.updateOne(query, updateDocument);
    res.send(insertedBoardList);
  } finally {
    await client.close();
  }
};
