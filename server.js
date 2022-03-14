//sequelize

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_react_redux"
);
const { STRING } = Sequelize.DataTypes;

const Guitarist = sequelize.define("guitarist", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Guitar = sequelize.define("guitar", {
  name: {
    type: STRING,
    allownull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Guitarist.belongsTo(Guitar);
Guitar.hasMany(Guitarist);
//express
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use('/public',express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/guitarists", async (req, res, next) => {
  try {
    const guitarists = await Guitarist.findAll({
      include: [Guitar]
    });
    res.send(guitarists);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/guitars", async (req, res, next) => {
  try {
    const guitars = await Guitar.findAll({
      include: [Guitarist]
    });
    res.send(guitars);
  } catch (ex) {
    next(ex);
  }
});

app.get('/', async (req,res,next) => {
    try{

    }
    catch(ex) {
        next(ex)
    }
})

app.get('/all', async(req,res,next) => {
  try{
    const guitarists = await Guitarist.findAll({
      include: [Guitar]})
    const guitars = await Guitar.findAll({
        include: [Guitarist]
      });
    const guitaristMap = guitarists.map(guitarist => {
      return `<ul> ${guitarist.name}</ul>`;
    }).join('');
    const guitarMap = guitars.map(guitar => {
      return `<ul> ${guitar.name}</ul>`;
    }).join('');
    const html = `<html>
    <h1>Robby's Guitar Page</h1>
    <a href= '/'> Back To Home Page </a>
    <h1>Guitarists</h1>
    <div> ${guitaristMap}</div>
    <h1>Guitars</h1>
    <div> ${guitarMap} </div>
    </html>`
      res.send(html)
    }
  catch(ex){
      next(Ex)
  }
} )
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
    jamesH.guitarId = espEclipse.id;
    kirkH.guitarId = espHorizon.id;
    tedN.guitarId = gibsonByrdland.id;
    joeW.guitarId = gibsonLesPaul.id;
    riversC.guitarId = fenderStrat.id;
    tomMor.guitarId = fenderTele.id;
    keithR.guitarId = fenderTele.id;
    ericC.guitarId = fenderStrat.id;

    await Promise.all([
      jamesH.save(),
      kirkH.save(),
      tedN.save(),
      joeW.save(),
      riversC.save(),
      tomMor.save(),
      ericC.save(),
      keithR.save(),
    ]);
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
