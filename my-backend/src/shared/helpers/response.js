const ok      = (res, data)           => res.json(data);
const created = (res, data)           => res.status(201).json(data);
const error   = (res, code, message)  => res.status(code).json({ error: message });

module.exports = { ok, created, error };
