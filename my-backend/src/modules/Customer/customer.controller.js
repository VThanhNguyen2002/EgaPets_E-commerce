const pool = require('@shared/db/sql').poolPromise;
const { sql } = require('@shared/db/sql');

exports.getMe = async (req, res) => {
  const { khachHangId } = req.user;                 // id lấy từ JWT
  const rs = await (await pool).request()
    .input('id', sql.Int, khachHangId)
    .query('SELECT * FROM KhachHang WHERE id = @id');
  res.json(rs.recordset[0]);
};

exports.updateMe = async (req, res) => {
  const { khachHangId } = req.user;
  const {
    ho_ten, so_dien_thoai, dia_chi,
    tinh_thanh, quan_huyen, phuong_xa
  } = req.body;

  await (await pool).request()
    .input('KhId', sql.Int,          khachHangId)
    .input('HoTen', sql.NVarChar,    ho_ten)
    .input('Phone', sql.NVarChar,    so_dien_thoai)
    .input('DiaChi', sql.NVarChar,   dia_chi)
    .input('Tinh',   sql.NVarChar,   tinh_thanh)
    .input('Huyen',  sql.NVarChar,   quan_huyen)
    .input('Xa',     sql.NVarChar,   phuong_xa)
    .execute('usp_UpdateCustomerProfile');

  res.json({ success:true, message:'Đã cập nhật hồ sơ!' });
};
