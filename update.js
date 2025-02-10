const router = require("express")();
const mongoose = require("mongoose");
const Data = require("./mongodb");
router.get("/checkupdate/:currentversion", async (req, res) => {
  const currentVersion = req.params.currentversion;
  var latestVersion, url, date;
  const data = await Data.findOne().sort({ _id: -1 }); // Sort by _id to get the latest document
  latestVersion = data.version;
  url = data.url;
  date = data.date;

  if (currentVersion.replaceAll(".", "") >= latestVersion.replaceAll(".", "")) {
    res.send("no updates available");
  } else {
    res.send(url);
  }
});

module.exports = router;
