const express = require("express");
const app = express();
const port = 3010;
const cors = require("cors");

const taskArray = {
  tasks: [
    {
      _id: 1,
      task: "start project",
      status: "pending",
    },

    {
      _id: 2,
      task: "test project",
      status: "pending",
    },
  ],
  maxTask_id: 2,
};

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Working");
  next();
});

app.get("/", (req, res) => {
  console.log("get");
  res.json(taskArray.tasks);
});

app.get("/:id", (req, res) => {
  let reqID = req.params.id;
  console.log(reqID);
  if (reqID) {
    let filter = taskArray.tasks.filter((task) => {
      {
        return reqID == task._id;
      }
    });
    if (filter.length) res.json(filter);
    else res.status(400).send("id not found");
  } else {
    res.status(400).send("Bad request");
  }
});

app.delete("/", (req, res) => {
  const n = req.query.ind;
  // console.log(n);
  if (n >= taskArray.tasks.length) res.status(400).send("id not found");
  try {
    taskArray.tasks.splice(n, 1);
  } catch {
    res.status(400).send("Error");
  }
  res.json({ Message: "Deleted Successfuly" });
});

app.post("/", (req, res) => {
  let newTask = req.body;
  newTask._id = ++taskArray.maxTask_id;
  newTask.status = "Pending";
  taskArray.tasks.push(req.body);

  res.json(taskArray.tasks);
});

app.post("/", (req, res) => {
  let newTask = req.body;
  newTask._id = ++taskArray.maxTask_id;
  newTask.status = "Pending";
  taskArray.tasks.push(req.body);

  res.json(taskArray.tasks);
});

app.patch("/", (req, res) => {
  let UpdatedTask = req.body.task;
  let index = req.body.index;

  taskArray.tasks.splice(index, 1, UpdatedTask);
  res.json(taskArray.tasks);
});

app.listen(port, () => {
  console.log(`Server running @ port: ${port}`);
});
