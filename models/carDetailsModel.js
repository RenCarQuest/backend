const mongoose = require('mongoose');

const CarDetailsSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  transmissionType: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'],
    required: true
  },
  passengerCapacity: { type: Number, required: true },
  rentalPricePerDay: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  licensePlate: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
  typeOfUse: {
    type: String,
    enum: ['Commercial', 'Tourism'],
  },
  mileage: { type: Number },
  carType: {
    type: String,
    enum: ['Sedan', 'Coupe', 'Van', 'SUV', 'Convertible'],
  },
  drivetrain: { type: String, enum: ['FWD', 'RWD', 'AWD', '4WD'] },
  fuelPolicy: { type: String, enum: ['Full-Full', 'Fuel-Reimbursement'] },
});

const CarDetails = mongoose.model('CarDetails', CarDetailsSchema);

module.exports = CarDetails;
