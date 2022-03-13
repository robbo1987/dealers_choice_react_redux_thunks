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

Guitarist.belongsTo(Guitar)
//express
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get('/api/guitarists', async (req,res,next) => {
    try { const guitarists = await Guitarist.findAll()
           res.send(guitarists) 
    }
    catch(ex){
            next(ex)
    }
})

app.get('/api/guitars', async (req,res,next) => {
    try { const guitars = await Guitar.findAll()
           res.send(guitars) 
    }
    catch(ex){
            next(ex)
    }
})



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
      fenderStrat,
      fenderTele,
      gibsonLesPaul,
      gibsonFlyingV,
      espEclipse,
      espHorizon,
    ] = await Promise.all([
      Guitarist.create({ name: "James Hetfield" }),
      Guitarist.create({ name: "Kirk Hammet" }),
      Guitarist.create({ name: "Ted Nugent" }),
      Guitarist.create({ name: "Joe Walsh" }),
      Guitarist.create({ name: "Rivers Cuomo" }),
      Guitar.create({ name: "Fender Stratocaster" }),
      Guitar.create({ name: "Fender Telecaster" }),
      Guitar.create({ name: "Gibson Les Paul" }),
      Guitar.create({ name: "Gibson Flying v" }),
      Guitar.create({ name: "ESP Eclipse" }),
      Guitar.create({ name: "ESP Horizon" }),
    ]);
    jamesH.guitarId = espEclipse.id;
    await Promise.all([
        jamesH.save()
    ]) 
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
