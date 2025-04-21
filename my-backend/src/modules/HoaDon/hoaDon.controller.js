const service = require('./hoaDon.service');
const rsp = require('@shared/helpers/response');

// GET /api/hoadon
exports.getAll = async (req, res) => {
  const result = await service.getAll(req.user);
  rsp.handle(res, result);
};

// GET /api/hoadon/:id
exports.getById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getById(id, req.user);
  rsp.handle(res, result);
};

// POST /api/hoadon
exports.create = async (req, res) => {
  const result = await service.create(req.body, req.user);
  rsp.handle(res, result);
};

// PUT /api/hoadon/:id
exports.update = async (req, res) => {
  const { id } = req.params;
  const result = await service.update(id, req.body, req.user);
  rsp.handle(res, result);
};

// DELETE /api/hoadon/:id
exports.remove = async (req, res) => {
  const { id } = req.params;
  const result = await service.remove(id, req.user);
  rsp.handle(res, result);
};
