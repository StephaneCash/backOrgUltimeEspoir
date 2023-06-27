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

const donsRouter = require("./routes/dons.routes");
const caregoriesRoutes = require("./routes/categories.routes");
const imagesRoutes = require("./routes/images.routes");
const sousCategoriesRouter = require("./routes/sousCategories.routes");
const userRoutes = require("./routes/users.routes");
const participantsRoutes = require("./routes/particpants.routes");
const articlesRouter = require("./routes/articles.routes");
const actualitesRouter = require("./routes/actualites.routes");

app.use("/api/dons", donsRouter);
app.use("/api/categories", caregoriesRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/sous-categories", sousCategoriesRouter);
app.use("/api/users", userRoutes);
app.use("/api/participants", participantsRoutes);
app.use("/api/articles", articlesRouter);
app.use("/api/actualites", actualitesRouter);

app.use("/api/uploads", express.static('./uploads'));

app.listen(process.env.PORT, () => {
    console.log("Le serveur tourne sur le port ", + process.env.PORT);
});
