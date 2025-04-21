const service = require('./hoaDon.service');
const rsp = require('@shared/helpers/response');

exports.getAll = async (req, res) => {
  const result = await service.getAll(req.user);
  rsp.handle(res, result);
};
