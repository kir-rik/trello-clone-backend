import { MongoClient } from "mongodb";
import "dotenv/config";
const connectionString = process.env.DB_CONNECT;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let dbConnection;

export const connectToServer = (callback) => {
  client.connect((err, db) => {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db("app-data");
    console.log("Successfully connected to MongoDB.");

    return callback();
  });
};

export const getDb = () => {
  return dbConnection;
};
