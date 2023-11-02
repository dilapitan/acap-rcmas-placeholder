const express = require("express");
const app = express();

const { DRY_SPELL_DATA1, DRY_SPELL_DATA2 } = require("./data");

app.get("/", (req, res) => {
  res.send("Welcome to ACAP-RCMAS Placeholder!");
});

app.get("/seasonal/dryspell/:id", (req, res) => {
  if (req.params.id === "1") {
    res.status(200).json({
      data: {
        months: DRY_SPELL_DATA1,
      },
    });
  } else {
    res.status(200).json({
      data: {
        months: DRY_SPELL_DATA2,
      },
    });
  }
});

app.listen(3000);
