// modules/HoaDon/hoaDon.service.js
async function getAll(user) {
    const pool = await poolPromise;
  
    let query = 'SELECT * FROM HoaDon';
    if (user.role === 'KhachHang')
      query += ` WHERE khach_hang_id = (SELECT id FROM KhachHang WHERE user_id = ${user.id})`;
  
    if (user.role === 'NhanVien')
      query += ` WHERE nhan_vien_id = (SELECT id FROM NhanVien WHERE user_id = ${user.id})`;
  
    const rs = await pool.request().query(query);
    return { code: 200, data: rs.recordset };
  }
  