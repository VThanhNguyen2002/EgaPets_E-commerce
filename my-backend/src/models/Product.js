const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ten_san_pham: { type: String, required: true },
  thuong_hieu: { type: String },
  loai: { type: String },
  nguon_goc: { type: String },
  so_gram: { type: Number },
  han_su_dung: { type: Date },
  gia_thanh: { type: Number },
  giam_gia: { type: Number },
  danh_gia: { type: Number },
  thanh_phan: { type: String },
  danh_muc_id: { type: Number },
});

module.exports = mongoose.model('Product', ProductSchema);
