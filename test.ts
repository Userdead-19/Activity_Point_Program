const bcrypt = require('bcrypt');

const compare_PAsswords = async (password, hash) => {
    const status = await bcrypt.compare(password, hash);
    console.log(status);
    return status;
}

let passwordstatus = compare_PAsswords("v4Gtrp3zs7t7u90", "$2b$10$4mve4EEX8k0BcrajxulT2us6rrumm1kC2A1BwroxCB5U.SzhWVZ6y");
