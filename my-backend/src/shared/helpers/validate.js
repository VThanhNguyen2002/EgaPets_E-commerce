// Nếu thiếu field ⇒ gửi 400 & return false
const requireFields = (res, fieldsObj) => {
    for (const [key, val] of Object.entries(fieldsObj)) {
      if (!val) {
        res.status(400).json({ error: `Missing ${key}` });
        return false;
      }
    }
    return true;
  };
  
  module.exports = { requireFields };
  