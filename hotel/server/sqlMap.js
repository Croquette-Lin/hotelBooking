// sql语句
var sqlMap = {
  user: {
    // 添加已登录用户，生成token
    addlogged: 'insert into loggedUser(username, password, token) value (?, ?, ?)',
    // 查询用户
    select: 'select username, password from users where username = ? and password = ?',
    add: 'insert into users(username, password) value (?, ?)'
  },
  admin: {
    select: 'select username, password from admin where username = ? and password = ?',
    addlogged: 'insert into loggedadmin(adminname, password, token) value (?, ?, ?)',
    selectall: 'select * from users'
  },
  order: {
    // 添加订单信息
    add: 'insert into orderform(userid, g_name, g_idnumber, g_phone, g_ck_in, g_ck_out, g_intime, g_day, g_state, h_price, h_type, h_number, h_name, r_id, d_ctime, d_number, img) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updated: 'update room set state = "已预订" where r_id = ? and number = ?',
    find_All: 'select * from orderform where userid = ? order by g_ck_in desc',
    find_Wait: 'select * from orderform where userid = ? and g_state = "待入住" order by g_ck_in desc',
    find_Address: 'select address from category where name = ?',
    select: 'select * from orderform order by g_ck_in desc',
    selectwait_list: 'select * from orderform where g_state = "待入住" order by g_ck_in desc',
    selectin_list: 'select * from orderform where g_state = "已入住" order by g_ck_in desc',
    selectdone_list: 'select * from orderform where g_state = "已完成" order by g_ck_in desc',
    selectcancel_list: 'select * from orderform where g_state = "已取消" order by g_ck_in desc',
    updateroomcancel: 'update room set state = "未入住" where r_id = ? and number = ?', // 修改房间状态为未入住
    updateroomstate: 'update room set state = "已入住" where r_id = ? and number = ?', // 修改房间状态为已入住
    updateinstate: 'update orderform set g_state = "已入住" where d_number = ?',  // 修改用户订单的入住状态
    updatecancelstate: 'update orderform set g_state = "已取消" where d_number = ?', // 修改用户订单为取消状态
    updatedonestate: 'update orderform set g_state = "已完成" where d_number = ?', // 修改用户订单为已完成
    delete: 'delete from orderform where d_number = ?', // 删除订单
    selectcount: 'SELECT (SELECT COUNT(*) FROM orderform WHERE g_state="已完成") AS c_done,(SELECT COUNT(*) FROM orderform WHERE g_state="待入住") AS c_wait,(SELECT COUNT(*) FROM orderform WHERE g_state="已取消") AS c_cancel,(SELECT COUNT(*) FROM orderform WHERE g_state="已入住") AS c_in,(SELECT COUNT(*) FROM orderform) AS c_all',
    selectprice: 'SELECT h_name,SUM(h_price) as price FROM orderform WHERE g_state != "已取消" GROUP BY h_name '
  },
  hotel_category: {
    search: 'select * from category left join room on category.id=room.r_id order by rand();', // 查找所有酒店
    search_city: 'select distinct city from category;',  // 查询已有的所有城市，搜索表单去重
    search_Info: 'select * from category left join room on (category.id=room.r_id) where type = ? and city = ? and star = ? and state = "未入住";',
    search_Info_allstar: 'select * from category left join room on (category.id=room.r_id) where type = ? and city = ? and state = "未入住";',
    search_Info_all: 'select * from category left join room on (category.id=room.r_id) where state = "未入住" order by rand();',  // 查询所有未入住的酒店
    search_Info_keywords: 'select * from category left join room on (category.id=room.r_id) where state = "未入住" and city like  ? ' + ' "%" order by rand();',
    update: 'update category left join room on (category.id=room.r_id) set category.name = ?, category.city = ?, category.info = ?, room.oldprice = ?, room.price = ?, category.star = ? WHERE room.r_id = ? AND room.number = ?',
    delete: 'delete from room where r_id = ? and number = ?',
  },
}

module.exports = sqlMap;
