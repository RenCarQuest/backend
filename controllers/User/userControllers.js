const registerUser = require('./registerController');
const allUsers = require('./getUsers');
const loginUser = require('./loginUser');
const deleteUser = require('./deleteUser');

module.exports = {
    registerUser,
    allUsers,
    loginUser,
    deleteUser
}
