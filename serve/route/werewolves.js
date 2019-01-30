const express = require('express');
const mysql = require('mysql');

var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '66812652j',
  database: 'werewolves',
  multipleStatements: true
})

// 打乱数组-洗牌算法
function FisherYates(arr) {
  for (let i = 1; i < arr.length; i++) {
    const random = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
}

module.exports = function () {
  var router = express.Router();
  // 获取比赛规则
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

  // 创建房间
  router.post('/postRoomInfo', (req, res) => {
    let player_num = req.body.player_num;
    let rule = req.body.rule;
    let player_actor = [];
    for (key in rule) {
      for (let i = 0; i < rule[key]; i++) {
        player_actor.push(key);
      }
    }
    // 随机生成角色顺序
    FisherYates(player_actor);
    db.query(`INSERT INTO room (player_num, player_actor) VALUES ("${player_num}","${player_actor}"); SELECT @@IDENTITY AS 'id'`, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('database error').end();
      } else {
        let roomId = data[1][0].id.toString();
        res.send(roomId).end();
      }
    });
  })

  // 加入游戏，获取角色
  router.get('/getActor', (req, res) => {
    let roomId = req.query.roomId;
    console.log('roomId: ', roomId);
    let playerNo = req.query.playerNo;
    console.log('playerNo: ', playerNo);
    db.query(`SELECT player_actor FROM room WHERE id = '${roomId}'`, (err, data) => {
      if (err) {
        res.status(500).send(err).end();
      } else {
        let actor_arr = data[0].player_actor.split(",");
        let actor_name = actor_arr[playerNo - 1];
        db.query(`SELECT * FROM actor WHERE name = '${actor_name}'`, (err, data) => {
          if (err) {
            res.status(500).send(err).end();
          }else{
            console.log(data[0]);
            res.send(data[0]).end();
          }
        })
      }
    })
  })

  return router;
}

