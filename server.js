const { Guitarist, Guitar, sequelize } = require("./db/db");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/guitarists", async (req, res, next) => {
  try {
    const guitarists = await Guitarist.findAll({
      include: [Guitar],
    });
    res.send(guitarists);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/guitars", async (req, res, next) => {
  try {
    const guitars = await Guitar.findAll({
      include: [Guitarist],
    });
    res.send(guitars);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/guitarists", async (req, res, next) => {
  try {
    const response = await Guitarist.generateRandom();
    res.status(201).send(response);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/guitarists/:id", async (req, res, next) => {
  try {
    const guitarist = await Guitarist.findByPk(req.params.id);
    await guitarist.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//start function

const init = async () => {
  try {
    await sequelize.sync({ force: true });
    const [
      jamesH,
      kirkH,
      tedN,
      joeW,
      riversC,
      tomMor,
      keithR,
      ericC,
      fenderStrat,
      fenderTele,
      gibsonLesPaul,
      gibsonByrdland,
      espEclipse,
      espHorizon,
    ] = await Promise.all([
      Guitarist.create({ name: "James Hetfield" }),
      Guitarist.create({ name: "Kirk Hammet" }),
      Guitarist.create({ name: "Ted Nugent" }),
      Guitarist.create({ name: "Joe Walsh" }),
      Guitarist.create({ name: "Rivers Cuomo" }),
      Guitarist.create({ name: "Tom Morello" }),
      Guitarist.create({ name: "Keith Richards" }),
      Guitarist.create({ name: "Eric Clapton" }),
      Guitar.create({ name: "Fender Stratocaster" }),
      Guitar.create({ name: "Fender Telecaster" }),
      Guitar.create({ name: "Gibson Les Paul" }),
      Guitar.create({ name: "Gibson Byrdland" }),
      Guitar.create({ name: "ESP Eclipse" }),
      Guitar.create({ name: "ESP Horizon" }),
    ]);

    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
