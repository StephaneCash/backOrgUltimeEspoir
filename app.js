const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const caregoriesRoutes = require("./routes/categories.routes");
const sousCategories = require("./routes/sousCategories.routes");
const imagesRoutes = require("./routes/images.routes");
const articlesRoutes = require("./routes/articles.routes");
const actualites = require("./routes/actualites.routes");
const don = require("./routes/dons.routes");
const participant = require("./routes/particpants.routes");

const categoriesMagazines = require("./routes/categoriesMagazines.routes");
const magazines = require("./routes/magazines.routes");
const users = require("./routes/users.routes");

app.use("/api/users", users);

app.use("/api/categories", caregoriesRoutes);
app.use("/api/actualites", actualites);
app.use("/api/sous-categories", sousCategories);
app.use("/api/dons", don);
app.use("/api/participants", participant);

app.use("/api/images", imagesRoutes);
app.use("/api/articles", articlesRoutes);

app.use("/api/magazines", magazines);
app.use("/api/categories-magazines", categoriesMagazines);

module.exports = app;