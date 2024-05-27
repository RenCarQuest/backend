const registerUser = require('./registerController');
const allUsers = require('./getUsers');
const loginUser = require('./loginUser');
const deleteUser = require('./deleteUser');
const logoutUser = require('./Security/logoutUser');

module.exports = {
    registerUser,
    allUsers,
    loginUser,
    deleteUser,
    logoutUser
}
