const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El ID del usuario es obligatorio']
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'CarDetails',
    required: [true, 'El ID del vehículo es obligatorio']
  },
  startDate: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  endDate: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria']
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', ReservationSchema);
