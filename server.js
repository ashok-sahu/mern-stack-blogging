const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const app = require("./server/app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 9000;
const Local_DB = process.env.MONGO_URI_LOCAL;
const Server_DB = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(Server_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log(chalk.yellowBright("database connected successfully!")))
  .catch((error) => console.log(chalk.red(error.reason)));

app.get("/", (req, res) => {
  res.send("<h1>hello from the server</h1>");
});

app.listen(port, () => {
  console.log(chalk.red(`server is running on http://localhost:${port}`));
});
