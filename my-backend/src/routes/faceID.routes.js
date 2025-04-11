// src/routes/faceID.routes.js
const { Router } = require("express");
const { insertFaceID, verifyFace } = require("../controllers/faceIDController");

const router = Router();

// POST /api/face/register-face
router.post('/register-face', insertFaceID);

// POST /api/face/verify-face
router.post('/verify-face', verifyFace);

module.exports = router;
