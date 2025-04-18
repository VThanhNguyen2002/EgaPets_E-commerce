const cartSvc          = require('@modules/Cart/cart.service');
const { requireFields }= require('@shared/helpers/validate');
const rsp              = require('@shared/helpers/response');
const { v4: uuid }     = require('uuid');          // cho sessionId cookie

/* helper lấy customerId|sessionId */
function getIdentity(req, res) {
  if (req.user?.role === 'KhachHang') return { customerId: req.user.id };
  /* guest: dùng cookie "sid" */
  let sid = req.cookies?.sid;
  if (!sid) {
    sid = uuid();
    res.cookie('sid', sid, { httpOnly: true });
  }
  return { sessionId: sid };
}

/* ---------- CART ---------- */
exports.add = async (req, res) => {
  if (!requireFields(res, {
    productId: req.body.productId,
    quantity : req.body.quantity,
    price    : req.body.price
  })) return;
  try {
    await cartSvc.addItem({
      ...getIdentity(req, res),
      productId: req.body.productId,
      quantity : req.body.quantity,
      price    : req.body.price,
      discount : req.body.discount || 0
    });
    rsp.created(res, { message: 'Đã thêm vào giỏ' });
  } catch (e) { console.error(e); rsp.error(res, 500, 'Lỗi thêm giỏ'); }
};

exports.list = async (req, res) => {
  try {
    const data = await cartSvc.listItems(getIdentity(req, res));
    rsp.ok(res, data);
  } catch (e) { console.error(e); rsp.error(res, 500, 'Lỗi lấy giỏ'); }
};

exports.update = async (req, res) => {
  if (!requireFields(res, { id: req.params.id, qty: req.body.quantity })) return;
  try {
    await cartSvc.updateQty(req.params.id, req.body.quantity);
    rsp.ok(res, { message: 'Đã cập nhật' });
  } catch (e) { console.error(e); rsp.error(res, 500, 'Lỗi cập nhật'); }
};

exports.remove = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;
  try {
    await cartSvc.remove(req.params.id);
    rsp.ok(res, { message: 'Đã xoá' });
  } catch (e) { console.error(e); rsp.error(res, 500, 'Lỗi xoá'); }
};

/* ---------- CHECKOUT ---------- */
exports.summary = async (req, res) => {
  try {
    const data = await cartSvc.cartSummary(getIdentity(req, res));
    rsp.ok(res, data);
  } catch (e) { console.error(e); rsp.error(res, 500, 'Lỗi summary'); }
};
