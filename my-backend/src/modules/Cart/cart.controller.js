const cartSvc = require('@modules/Cart/cart.service');
const { requireFields } = require('@shared/helpers/validate');
const rsp = require('@shared/helpers/response');
const { v4: uuid } = require('uuid');

// 💡 Bộ nhớ tạm để lưu thời gian gọi API gần nhất
const cartRateLimit = new Map(); // key = userId | sessionId → timestamp

/* helper lấy customerId | sessionId */
/* helper: xác định “ai” đang thao tác giỏ */
function getIdentity(req, res) {
  // — ĐÃ đăng nhập (Khách Hàng) → chỉ dùng userId, KHÔNG dính sid guest
  const user = req.user;
  if (user && user.role?.toLowerCase() === 'khachhang') {
    return { userId: user.id, khachHangId: user.khachHangId };
  }

  // — Guest: dùng sid cookie (khởi tạo nếu chưa có)
  const cookies = req.cookies || {};
  let sid = cookies.sid || req.query.sid || req.headers['x-session-id'];
  if (!sid) {
    sid = require('uuid').v4();
    res.cookie('sid', sid, {
      httpOnly: true, sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,  // 30 ngày
    });
  }
  return { sessionId: sid };
}


/* ---------- CART ---------- */
exports.list = async (req, res) => {
  const identity = getIdentity(req, res);
  const key = identity.userId || identity.sessionId;
  const now = Date.now();

  const lastCalled = cartRateLimit.get(key);
  const limitMs = 1000; // 1 giây

  if (lastCalled && now - lastCalled < limitMs) {
    return rsp.ok(res, { warning: "Bạn thao tác quá nhanh. Vui lòng đợi." });
  }

  cartRateLimit.set(key, now);

  try {
    const data = await cartSvc.listItems(identity);
    rsp.ok(res, data);
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Lỗi lấy giỏ');
  }
};

exports.add = async (req, res) => {
  if (!requireFields(res, {
    productId: req.body.productId,
    quantity : req.body.quantity
  })) return;

  try {
    await cartSvc.addItem({
      ...getIdentity(req, res),
      productId: req.body.productId,
      quantity : req.body.quantity
    });
    rsp.created(res, { message: 'Đã thêm vào giỏ' });
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, e.message || 'Lỗi thêm giỏ');
  }
};

/* ----- REMOVE ----- */
exports.remove = async (req, res) => {
  if (!requireFields(res, { id: req.params.id })) return;
  try {
    await cartSvc.remove(req.params.id);

    // 👇  trả lại giỏ hàng sau khi xoá
    const data = await cartSvc.listItems(getIdentity(req, res));
    rsp.ok(res, data);
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, "Lỗi xoá");
  }
};

/* ----- UPDATE QTY (lý do tương tự) ----- */
exports.update = async (req, res) => {
  if (!requireFields(res, { id: req.params.id, qty: req.body.quantity })) return;
  try {
    await cartSvc.updateQty(req.params.id, req.body.quantity);
    const data = await cartSvc.listItems(getIdentity(req, res));
    rsp.ok(res, data);
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, "Lỗi cập nhật");
  }
};
/* ---------- CHECKOUT ---------- */
exports.summary = async (req, res) => {
  try {
    const data = await cartSvc.cartSummary(getIdentity(req, res));
    rsp.ok(res, data);
  } catch (e) { console.error(e); rsp.error(res, 500, 'Lỗi summary'); }
};
