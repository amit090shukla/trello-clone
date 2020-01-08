const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const initialBoard = [
  {
    id: 1,
    name: "Board 1",
    list: [
      { id: 1, title: "Hello World", description: "" },
      { id: 2, title: "I am ", description: "" },
      { id: 3, title: "Amit", description: "" }
    ]
  },
  {
    id: 2,
    name: "Board 2",
    list: [
      { id: 4, title: "Board 2", description: "" },
      { id: 5, title: "B2 - ABC ", description: "" },
      { id: 6, title: "B2- Amit", description: "" }
    ]
  }
];
app.get("/v1/boards", function(req, res) {
  setTimeout(function() {
    return res.json({ data: initialBoard });
  }, 1000);
});

app.get("/v1/crud", (req, res) => {
  setTimeout(function() {
    return res.json({ data: req.body });
  }, 1000);
});

app.listen(process.env.PORT || 8080);
