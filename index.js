import bcrypt from 'bcrypt';

const plainText = 'sony123';
const plaintext2 = 'whatalooser';

console.time('bcrypt');
const hash = bcrypt.hashSync(plainText, 10);
console.log(hash);
console.timeEnd('bcrypt');
