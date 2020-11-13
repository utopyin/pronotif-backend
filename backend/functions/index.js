const functions = require('firebase-functions');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const pronote = require('pronote-api');

app.use(cors());

app.get('/pronote/lastmessage', async (req, res) => {
  const url = req.query.url;
  const username = req.query.username;
  const password = req.query.password;

  const login = await pronote.login(url, username, password/*, cas*/);
  const infos = await login.infos();
  let infosSorted = infos.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 4);
  res.send(infosSorted)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.app = functions.https.onRequest(app);
