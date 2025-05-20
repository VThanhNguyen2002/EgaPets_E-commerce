const { sql, query } = require('../../shared/db/sql');

/* ghi 1 bản ChiTietThanhToan */
exports.createPaymentRecord = async ({ orderId, methodId, qr, requestId }) =>
  query(`
    INSERT INTO ChiTietThanhToan(hoa_don_id, phuong_thuc_id, ma_giao_dich, qr_code)
    VALUES(@orderId, @methodId, @requestId, @qr)
  `, [
    { name: 'orderId',   type: sql.Int,      value: orderId },
    { name: 'methodId',  type: sql.Int,      value: methodId },
    { name: 'requestId', type: sql.NVarChar, value: requestId },
    { name: 'qr',        type: sql.NVarChar, value: qr },
  ]);

/* cập-nhật trạng thái khi IPN */
exports.updateStatus = async ({ orderId, requestId, status }) =>
  query(`
    UPDATE ChiTietThanhToan
    SET trang_thai      = @status,
        ngay_thanh_toan = CASE WHEN @status = N'success' THEN GETDATE() END
    WHERE hoa_don_id    = @orderId AND ma_giao_dich = @requestId
  `, [
    { name: 'status',    type: sql.NVarChar, value: status },
    { name: 'orderId',   type: sql.Int,      value: orderId },
    { name: 'requestId', type: sql.NVarChar, value: requestId },
  ]);
