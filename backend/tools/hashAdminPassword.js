// tools/hashAdminPassword.js
const bcrypt = require('bcrypt');

const run = async () => {
  const password = 'admin';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
};

run();
