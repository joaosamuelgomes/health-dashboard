function validateCidAtemporalParams(req, res, next) {
    const { time_range, cid } = req.query;

    // checar se os parametros foram passados
    if (!time_range || !cid) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    next();
}

module.exports = { validateCidAtemporalParams };
