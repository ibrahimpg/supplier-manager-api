const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { id } = req.tokenData;

    const { companyName, companyDescription } = req.body;

    await database.updateOne('users', '_id', id, { companyName, companyDescription });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
