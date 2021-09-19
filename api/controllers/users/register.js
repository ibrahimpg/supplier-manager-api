const { validateNewUser } = require('../../utilities/validation');
const { hash } = require('../../utilities/crypto');
const { uploadImage } = require('../../services/media');
const database = require('../../services/database');

module.exports = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    console.log(password);

    if (!validateNewUser(username, password, email)[0]) {
      return res.status(400).send(validateNewUser(username, password, email)[1]);
    }

    const checkExistingUser = await database.findAll('users', 'username', username);

    if (checkExistingUser.length > 0) return res.status(400).send('Username already exists.');

    const checkExistingEmail = await database.findAll('users', 'email', email);

    if (checkExistingEmail.length > 0) return res.status(400).send('Email already in use.');

    const { hashedPassword, salt, keylen } = hash(password);

    const imgUrl = await uploadImage('./blank.png', `users/${username}`);

    const companyName = 'Company Name';

    const companyDescription = 'Company Description';

    const data = { username, password: hashedPassword, salt, keylen, email, imgUrl, companyDescription, companyName };

    await database.insertOne('users', data);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(400).json(String(err.message));
  }
};
