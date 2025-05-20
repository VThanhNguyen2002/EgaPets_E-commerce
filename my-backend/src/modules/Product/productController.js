const productService = require("@modules/Product/productService");
const { requireFields } = require("@shared/helpers/validate");
const rsp = require("@shared/helpers/response");

// GET /
exports.getAll = async (req, res) => {
  try {
    const data = await productService.getAll(req);
    rsp.ok(res, data);
  } catch (err) {
    console.error(err);
    rsp.error(res, 500, "Lỗi lấy danh sách sản phẩm");
  }
};

// GET /:id
exports.getById = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;

  try {
    const data = await productService.getById(req, req.params.id);
    data ? rsp.ok(res, data) : rsp.error(res, 404, "Không tìm thấy sản phẩm");
  } catch (err) {
    console.error(err);
    rsp.error(res, 500, "Lỗi lấy sản phẩm theo ID");
  }
};

// POST /
exports.create = async (req, res) => {
  const { ma_san_pham, ten_san_pham, gia_thanh } = req.body;
  if (!requireFields(res, { ma_san_pham, ten_san_pham })) return;
  if (+gia_thanh <= 0 || +gia_thanh > 2_000_000_000)
    return rsp.error(res, 400, "Giá không hợp lệ");

  try {
    const data = await productService.create({
      body: req.body,
      username: req.user.username,
    });
    rsp.created(res, { success: true, data });
  } catch (err) {
    console.error(err);
    rsp.error(res, 500, "Lỗi thêm sản phẩm");
  }
};

// PUT /:id
exports.update = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;

  if (req.body.gia_thanh && +req.body.gia_thanh > 2_000_000_000)
    return rsp.error(res, 400, "Giá vượt quá giới hạn 2 tỷ");

  try {
    const data = await productService.update(
      req.params.id,
      req.body,
      req.user.username
    );
    data ? rsp.ok(res, { success: true, data }) : rsp.error(res, 404, "Không tìm thấy sản phẩm");
  } catch (err) {
    console.error(err);
    rsp.error(res, 500, "Lỗi cập nhật sản phẩm");
  }
};

// DELETE /:id
exports.remove = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;

  try {
    const deleted = await productService.remove(req.params.id, req.user.username);
    deleted
      ? rsp.ok(res, { message: "Đã xoá sản phẩm" })
      : rsp.error(res, 404, "Không tìm thấy sản phẩm");
  } catch (err) {
    console.error(err);
    rsp.error(res, 500, "Lỗi xoá sản phẩm");
  }
};

// GET /newest
exports.getNewest = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const data = await productService.getNewest(req, limit);
    rsp.ok(res, data);
  } catch (err) {
    console.error(err);
    rsp.error(res, 500, "Lỗi lấy sản phẩm mới");
  }
};
