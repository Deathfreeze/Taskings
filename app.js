// Reqire all necessary dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Define new instance of express
const app = express();

// connect to mongoDB
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Set EJS view engine
app.set("view engine", "ejs");

//
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const itemSchema = mongoose.Schema({
  name: String,
  date: Date,
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "PT One Orders",
  date: Date(),
});

const item2 = new Item({
  name: "Dispatch Orders",
  date: Date(),
});

const item3 = new Item({
  name: "Resettlement Training",
  date: Date(),
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
          res.redirect("/");
        } else {
          console.log("Successfully added items to DB");
        }
      });
    } else {
      res.render("list", {
        listTitle: "Typing Pool Tasking Prototype Application",
        newListItems: foundItems,
      });
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const itemName1 = new Item({
    name: itemName,
    date: Date(),
  });

  itemName1.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const delName = req.body.checkbox;
  Item.deleteOne(
    {
      _id: delName,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully Deleted the item");
      }
    }
  );

  res.redirect("/");
});

app.get("/:newList", function (req, res) {
  const customNameList = req.params.newList;
  //create the new schema here, I was to tired to finish this section
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
