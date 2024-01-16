const express = require("express");
const redis = require("redis");
const cors = require("cors");
const { v4 } = require("uuid");

const port = 2000;
const client = redis.createClient({
  url: "redis://localhost:6379",
});
client.connect();
client.on("connect", () => {
  console.log("Redis Connected!");
});

const app = express();
app.use(cors());
app.use(express.json());

let layoutIndex = 0;
const getLayout = () => {
  if (layoutIndex === 0) {
    layoutIndex = 1;
  } else if (layoutIndex === 1 || layoutIndex === 2) {
    layoutIndex++;
  } else {
    layoutIndex = 1;
  }
  return layoutIndex;
};

app.get("/layout", async (req, res) => {
  try {
    // extract identifier
    const id = req.headers["uid"];
    const layout = id ? await client.get(id) : undefined;
    if (id && layout) {
      res.status(200).json({
        layout: +layout,
      });
    } else {
      const layout = getLayout();
      const id = v4();
      await client.set(id, layout.toString());
      res.status(200).json({
        id,
        layout,
      });
    }
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Listening on port: ${port}`);
  } else {
    console.log(err);
  }
});
