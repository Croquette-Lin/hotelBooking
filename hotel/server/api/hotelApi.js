const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

// 增加用户
router.post('/addUser', (req, res) => {
  let sqlStr = sql.user.add;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.name, params.password], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 查询所有酒店
router.get('/selectHotel', (req, res) => {
  let sqlStr = sql.hotel_category.search;
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

// 查询所有已有的城市
router.get('/selectHotelCity', (req, res) => {
  let sqlStr = sql.hotel_category.search_city;
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

// 查询所有符合条件的酒店列表--房间状态未入住
router.get('/selectSearchInfoAll', (req, res) => {
  let sqlStr = sql.hotel_category.search_Info_all;
  // let params = req.body;
  // console.log(params);
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

// 查询符合条件的酒店列表 房间类型 城市 星级
router.post('/selectSearchInfo', (req, res) => {
  let sqlStr = sql.hotel_category.search_Info;
  let params = req.body;
  // console.log(params);
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.num, params.region, params.findstar], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});

// 查询符合条件的酒店列表--不限星级
router.post('/selectSearchInfoAllStar', (req, res) => {
  let sqlStr = sql.hotel_category.search_Info_allstar;
  let params = req.body;
  // console.log(params);
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.num, params.region], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});

// 查询符合模糊搜索条件的酒店列表---按下enter键的查询
router.post('/selectSearchKeywords', (req, res) => {
  let sqlStr = sql.hotel_category.search_Info_keywords;
  let params = req.body;
  // console.log(params);
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, params.keywords, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});

// 修改酒店信息
router.post('/editHotelDetail', (req, res) => {
  let sqlStr = sql.hotel_category.update;
  let params = req.body;
  // console.log(params);
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.name, params.city, params.info, params.oldprice, params.price, params.star, params.r_id, params.number], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});

// 删除某房间
router.post('/deleteRoom', (req, res) => {
  let sqlStr = sql.hotel_category.delete;
  let params = req.body;
  // console.log(params);
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.r_id, params.number], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  });
  conn.end();
});

module.exports = router;
