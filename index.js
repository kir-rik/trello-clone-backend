const BOARDLIST = [
  {
    boardListId: "111",
    boardId: "121",
    boardTitle: "Board",
    lists: [
      {
        listId: "131",
        listTitle: "List",
        cards: [
          {
            cardId: "141",
            cardTitle: "Card",
            cardDescription: "",
            cardData: [
              {
                cardDataId: "151",
                action: "First comment",
                date: "displayDateWithTime",
              },
            ],
          },
        ],
      },
    ],
  },
];

const PORT = 8000;
const express = require("express");

const app = express();

app.get("/boardlist", (req, res) => {
  res.json(BOARDLIST);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
