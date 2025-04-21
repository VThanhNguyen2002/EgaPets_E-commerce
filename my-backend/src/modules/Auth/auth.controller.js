const { requireFields } = require('@shared/helpers/validate');
const rsp               = require('@shared/helpers/response');
const authService       = require('@modules/Auth/authService');

// POST /api/auth/login
exports.login = async (req, res) => {
  if (!requireFields(res, req.body)) return;
  const result = await authService.login(req.body);
  result.code === 200 ? rsp.ok(res, result.data) : rsp.error(res, result.code, result.msg);
};

// POST /api/auth/register-customer
exports.registerCustomer = async (req, res) => {
  if (!requireFields(res, req.body)) return;
  const result = await authService.register({ ...req.body, role: 'KhachHang' });
  result.code === 201 ? rsp.created(res, result.data) : rsp.error(res, result.code, result.msg);
};

// POST /api/auth/register-employee
exports.registerEmployee = async (req, res) => {
  if (!requireFields(res, req.body)) return;
  const result = await authService.register({ ...req.body, role: 'NhanVien' });
  result.code === 201 ? rsp.created(res, result.data) : rsp.error(res, result.code, result.msg);
};

exports.forgotPassword = async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  result.code === 200 ? rsp.ok(res, result.data)
                      : rsp.error(res, result.code, result.msg);
};

exports.resetPassword = async (req, res) => {
  const result = await authService.resetPassword(req.body);
  result.code === 200 ? rsp.ok(res, result.data)
                      : rsp.error(res, result.code, result.msg);
};
