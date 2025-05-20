const router = require("express").Router();
const ctl    = require("./productController");
const imgCtl = require("./productImage.controller");
const { verifyToken, requireRoles } = require("@middlewares/authMiddleware");
const { ROLES } = require("@shared/constants");

/* ---------- ẢNH SẢN PHẨM (đặt TRƯỚC để không bị dynamic :id “nuốt”) */
router.get("/:pid/images", imgCtl.list);
router.post(
  "/:pid/images",
  verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN),
  imgCtl.create
);
router.delete(
  "/img/:id",            // ✅ đổi prefix => tránh đụng GET /:id
  verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN),
  imgCtl.remove
);

/* ---------- SẢN PHẨM ---------- */
router.get("/", ctl.getAll);
router.get("/newest", ctl.getNewest);
router.get("/:id(\\d+)", ctl.getById);

router.post(
  "/", verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.create
);
router.put(
  "/:id(\\d+)", verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.update
);
router.delete(
  "/:id(\\d+)", verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.remove
);

module.exports = router;
