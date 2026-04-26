const express = require("express");
const routes = require("./routes");

const app = express();
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("NEXUS Dashboard Running");
});

app.listen(3000, () => {
  console.log("Dashboard running on 3000");
});
