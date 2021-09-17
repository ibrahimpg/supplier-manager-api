const { randomBytes } = require('crypto');
const database = require('../../services/database');
const { validateEmail } = require('../../utilities/validation');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    const { id } = req.tokenData;

    if (!validateEmail(email)[0]) return res.status(400).send(validateEmail(email)[1]);

    // const checkExistingEmail = await database.findAll('users', 'email', email);

    // if (checkExistingEmail.length > 0) return res.status(400).send('Email already in use.');

    const verificationCode = randomBytes(4).toString('hex');

    const updateObj = { email, verified: false, verificationCode };

    await database.updateOne('users', '_id', id, updateObj);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
