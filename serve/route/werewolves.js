const express = require('express');
const mysql = require('mysql');

var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '66812652j',
  database: 'werewolves'
})

module.exports = function () {
  var router = express.Router();
  router.get('/getRule', (req, res) => {
    let num = req.query.num;
    db.query(`SELECT * FROM rule WHERE player_num = ${num}`, (err, data) => {
      if (err) {
        res.status(500).send('database error').end();
      } else {
        let orgin_rule = JSON.parse(data[0].rule);
        let rule = {};
        for (let key in orgin_rule) {
          db.query(`SELECT name FROM actor WHERE other_name = '${key}'`, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(data[0].name);
              rule[data[0].name] = orgin_rule[key];
              if (Object.keys(rule).length == Object.keys(orgin_rule).length) {
                res.send(rule).end();
              }
            }
          })
        }
      }
    })
  })

  router.post('/postRoomInfo', (req, res) => {
    let player_num = req.body.player_num;
    let rule = req.body.rule;
    let player_actor = [];
    for (key in rule) {
      for (let i = 0; i < rule[key]; i++) {
        player_actor.push(key);
      }
    }
    console.log(player_num);
    console.log(player_actor);
    res.send('ok');
  })

  return router;
}

