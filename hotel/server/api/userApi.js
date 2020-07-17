const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const { json } = require('body-parser');

// 查找用户
router.post('/findUser', (req, res, next) => {
  let state = 0
  let sqlStr = sql.user.select;
  let params = req.body;
  let username = params.username;
  let password = params.password;
  let conn = new DBHelper().getConn();
  let errorMessage = '';
  let promise = new Promise((resolve, reject) => {
    conn.query(sqlStr, [params.username, params.password], (err, result) => {
      if (err) {
        console.log('err' + err)
      } else {
        let user = JSON.parse(JSON.stringify(result))
        if (user.length === 0) {
          reject({
            state: 1,
            message: '输入的用户名或密码有误！'
          })
        } else {
          // 如果用户存在就根据用户的信息生成token
          let token = JSON.stringify(user) + Math.random()
          resolve({
            state, username, password, token
          })
        }
      }
    });
  }).then(data => {
    let sqlStr = sql.user.addlogged
    let insertParams = [data.username, data.password, data.token]
    conn.query(sqlStr, insertParams, function (err, result) {
      if (err) {
        console.log('err' + err)
        return res.send({
          state: 1,
          message: '插入token失败！'
        })
      } else {
        console.log(result)
        return res.send({
          state: 0,
          username: data.username,
          token: data.token,
          message: '登陆成功！'
        })
      }
    })
  }).catch(function (error) {
    var catchmsg = error.message;
    console.log('catched', error);
    console.log('cat', catchmsg);
  });
});

// 注册
router.post('/addUser', (req, res) => {
  let sqlStr = sql.user.add;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.username, params.password], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 登录 
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          status: 0,
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

// 退出登录
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: 0,
    msg: '',
    result: ''
  })
})

// 登录校验
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: 0,
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: 1,
      msg: '未登录',
      result: ''
    })
  }
})

// 查询管理员
router.post('/findAdmin', (req, res, next) => {
  let state = 0
  let sqlStr = sql.admin.select;
  let params = req.body;
  let adminname = params.adminname;
  let password = params.password;
  let conn = new DBHelper().getConn();
  let errorMessage = '';
  let promise = new Promise((resolve, reject) => {
    conn.query(sqlStr, [params.adminname, params.password], (err, result) => {
      if (err) {
        console.log('err' + err)
      } else {
        let admin = JSON.parse(JSON.stringify(result))
        if (admin.length === 0) {
          reject({
            state: 1,
            message: '输入的用户名或密码有误！'
          })
        } else {
          // 如果用户存在就根据用户的信息生成token
          let admintoken = JSON.stringify(admin) + Math.random()
          resolve({
            state, adminname, password, admintoken
          })
        }
      }
    });
  }).then(data => {
    let sqlStr = sql.admin.addlogged
    let insertParams = [data.adminname, data.password, data.admintoken]
    conn.query(sqlStr, insertParams, function (err, result) {
      if (err) {
        console.log('err' + err)
        return res.send({
          state: 1,
          message: '插入token失败！'
        })
      } else {
        console.log(result)
        return res.send({
          state: 0,
          adminname: data.adminname,
          admintoken: data.admintoken,
          message: '登陆成功！'
        })
      }
    })
  }).catch(function (error) {
    console.log('cat', error);
  });
});

// 查询用户
router.get('/selectAlladmin', (req, res) => {
  let sqlStr = sql.admin.selectall;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});


module.exports = router;
