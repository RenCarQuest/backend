const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    alias: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordHistory: [{ type: String }],
    failedLoginAttempts: { type: Number, default: 0 },
    isLocked: { type: Boolean, default: false },
    lockUntil: { type: Date },
    createdAt: { type: Date, default: Date.now },
    phoneNumber: { type: String, required: true },
});

userSchema.pre('save', function(next) {
    this.alias = `${this.firstName} ${this.lastName}`;
    next();
});

userSchema.methods.isPasswordInHistory = async function(newPassword) {
    for (let oldPassword of this.passwordHistory) {
        if (await bcrypt.compare(newPassword, oldPassword)) {
            return true;
        }
    }
    return false;
};

userSchema.methods.addPasswordToHistory = async function() {
    if (this.passwordHistory.length >= 5) { 
        this.passwordHistory.shift();
    }
    this.passwordHistory.push(this.password);
    await this.save();
};

// Método para incrementar los intentos fallidos y bloquear la cuenta si es necesario
userSchema.methods.incrementFailedLoginAttempts = async function() {
    this.failedLoginAttempts += 1;
    if (this.failedLoginAttempts >= 3) {
        this.isLocked = true;
        this.lockUntil = Date.now() + 30 * 60 * 1000; // Bloquear por 30 minutos
    }
    await this.save();
};

// Método para restablecer los intentos fallidos
userSchema.methods.resetFailedLoginAttempts = async function() {
    this.failedLoginAttempts = 0;
    this.isLocked = false;
    this.lockUntil = null;
    await this.save();
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
