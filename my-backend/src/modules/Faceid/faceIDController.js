const { requireFields } = require('@shared/helpers/validate');
const rsp               = require('@shared/helpers/response');
const faceService       = require('@modules/Faceid/faceID.service');

// POST /register-face        (Nhân Viên)
exports.insertFaceIDViaPython = async (req, res) => {
  if (!requireFields(res, req.body)) return;
  try {
    const data = await faceService.enrollByImage({
      userId:     req.body.userId,
      imgBase64:  req.body.imgBase64,
      pose:       req.body.pose || 'front',
      authHeader: req.headers.authorization
    });
    rsp.ok(res, { message: 'Face enrolled', data });
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Enroll failed');
  }
};

// POST /register-face-public (mọi role)
exports.insertFaceID = async (req, res) => {
  if (!requireFields(res, req.body)) return;
  try {
    const data = await faceService.enrollRawVector({
      userId:      req.body.userId,
      embeddingB64:req.body.faceVectorBase64,
      pose:        req.body.pose
    });
    rsp.ok(res, { message: 'Face ID inserted', data });
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Insert failed');
  }
};

// POST /verify-face
exports.verifyFace = async (req, res) => {
  if (!requireFields(res, req.body)) return;
  try {
    const result = await faceService.verify({
      userId:        req.body.userId,
      faceVectorB64: req.body.faceVectorBase64,
      meta: {
        ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
        ua: req.headers['user-agent'] || ''
      }
    });
    rsp.error(res, result.code, result.data.message); // 200/401 handled inside
  } catch (e) {
    console.error(e);
    rsp.error(res, 500, 'Verify failed');
  }
};
