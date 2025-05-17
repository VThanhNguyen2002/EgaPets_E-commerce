const imgSvc          = require('./productImage.service');
const rsp             = require('@shared/helpers/response');
const { requireFields }= require('@shared/helpers/validate');

/* GET /api/products/:pid/images */
exports.list = async (req, res) => {
  try {
    const data = await imgSvc.listByProductId(+req.params.pid);
    rsp.ok(res, data);
  } catch(e){
    console.error(e);
    rsp.error(res, 500, 'Lỗi lấy ảnh');
  }
};

/* POST /api/products/:pid/images  (Body: { image_url, public_id, ... }) */
exports.create = async (req, res) => {
  if (!requireFields(res, { image_url: req.body.image_url, public_id: req.body.public_id }))
    return;
  try {
    const data = await imgSvc.add(+req.params.pid, req.body);
    rsp.created(res, data);
  } catch(e){
    console.error(e);
    rsp.error(res, 500, 'Lỗi thêm ảnh');
  }
};

/* DELETE /api/products/images/:id */
exports.remove = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;
  try {
    await imgSvc.remove(+req.params.id);
    rsp.ok(res, { message: 'Đã xoá ảnh' });
  } catch(e){
    console.error(e);
    rsp.error(res, 500, 'Lỗi xoá ảnh');
  }
};
