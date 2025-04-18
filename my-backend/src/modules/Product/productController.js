const productService = require('@modules/Product/productService');
const { requireFields } = require('@shared/helpers/validate');
const rsp             = require('@shared/helpers/response');

exports.getAll = async (req, res) => {
  try {
    const data = await productService.getAll(req);
    rsp.ok(res, data);
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Lỗi lấy danh sách sản phẩm');
  }
};

exports.getById = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;
  try {
    const data = await productService.getById(req, req.params.id);
    data ? rsp.ok(res, data) : rsp.error(res, 404, 'Không tìm thấy sản phẩm');
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Lỗi lấy sản phẩm theo ID');
  }
};

exports.create = async (req, res) => {
  if (!requireFields(res, { ma_san_pham: req.body.ma_san_pham, ten_san_pham: req.body.ten_san_pham }))
    return;
  try {
    const data = await productService.create({ body: req.body, username: req.user.username });
    rsp.created(res, data);
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Lỗi thêm sản phẩm');
  }
};

exports.update = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;
  try {
    const data = await productService.update(req.params.id, req.body, req.user.username);
    rsp.ok(res, data);
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Lỗi cập nhật sản phẩm');
  }
};

