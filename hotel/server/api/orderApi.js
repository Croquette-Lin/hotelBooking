const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const { json } = require('body-parser');

// 增加订单
router.post('/addOrder', (req, res) => {
  let sqlStr = sql.order.add;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.userId, params.name,
  params.idNumber, params.phone,
  params.checkInDate, params.checkOutDate,
  params.intime, params.daynight,
  params.state, params.totalPrice,
  params.type, params.roomNumber,
  params.hotelName, params.roomr_id,
  params.createTime, params.orderId, params.roomImg], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
  conn.end();
});

// 更改对应房间的状态
router.post('/updateRoomState', (req, res) => {
  let sqlStr = sql.order.updated;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.roomr_id, params.roomNumber], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取当前登录用户的全部订单信息
router.post('/getOrder', (req, res) => {
  let sqlStr = sql.order.find_All;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, params.userId, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 根据酒店名字 查询对应的酒店地址
router.post('/getAddress', (req, res) => {
  let sqlStr = sql.order.find_Address;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, params.name, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取当前登录用户的待入住订单信息
router.post('/getWaitOrder', (req, res) => {
  let sqlStr = sql.order.find_Wait;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, params.userId, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取全部订单
router.get('/getAllOrder', (req, res) => {
  let sqlStr = sql.order.select;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取全部待入住订单
router.get('/getwaitList', (req, res) => {
  let sqlStr = sql.order.selectwait_list;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取全部已入住订单
router.get('/getinList', (req, res) => {
  let sqlStr = sql.order.selectin_list;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取全部已完成订单
router.get('/getdoneList', (req, res) => {
  let sqlStr = sql.order.selectdone_list;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取全部已取消订单
router.get('/getcancleList', (req, res) => {
  let sqlStr = sql.order.selectcancel_list;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 修改用户订单为已入住状态
router.post('/editInState', (req, res) => {
  let sqlStr = sql.order.updateinstate;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr,params.d_number, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 修改界面房间状态为已入住状态
router.post('/editRoomState', (req, res) => {
  let sqlStr = sql.order.updateroomstate;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.r_id, params.number], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 修改用户订单为已取消状态
router.post('/editOrderCancel', (req, res) => {
  let sqlStr = sql.order.updatecancelstate;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr,params.d_number, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 修改界面房间状态为未入住状态
router.post('/editRoomCancel', (req, res) => {
  let sqlStr = sql.order.updateroomcancel;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.r_id, params.number], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 修改用户订单为已完成状态
router.post('/editDoneState', (req, res) => {
  let sqlStr = sql.order.updatedonestate;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr,params.d_number, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 删除订单
router.post('/delOrder', (req, res) => {
  let sqlStr = sql.order.delete;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr,params.d_number, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取订单入住情况条数
router.get('/selectStateCount', (req, res) => {
  let sqlStr = sql.order.selectcount;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 获取各酒店收入情况
router.get('/selectPriceCount', (req, res) => {
  let sqlStr = sql.order.selectprice;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

module.exports = router;
