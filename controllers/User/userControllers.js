const registerUser = require('./registerController');
const allUsers = require('./getUsers');
const loginUser = require('./loginUser');
const deleteUser = require('./deleteUser');
const logoutUser = require('./Security/logoutUser');
const changePassword = require('./Security/changePassword');

module.exports = {
    registerUser,
    allUsers,
    loginUser,
    deleteUser,
    logoutUser,
    changePassword
}
