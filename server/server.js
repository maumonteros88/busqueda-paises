const express = require("express");
const path = require("path");
const app = express();
const paises = require("./paises.json");

const PORT = 3007;
const index = path.join(__dirname, "../client", "index.html");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/public")));


app.get("/", (req, res) => {
  res.sendFile(index);
});

app.get("/buscar", (req, res) => {
  let country = req.query.country || "";
  

   let result = paises;

   result = result.filter((element) =>
      element
        .toLocaleLowerCase()
        .includes(country.toString().toLocaleLowerCase())
    );
    res.json(result);
  }

);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is up and listening on PORT:", PORT);
});
