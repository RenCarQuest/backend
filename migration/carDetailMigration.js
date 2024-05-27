require('dotenv').config();
const mongoose = require('mongoose');
const CarDetails = require('../models/carDetailsModel');

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const createFakeCars = async () => {
    const numberOfCars = 12;
    const imageUrls = [
        "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2015/03/404013-bentley-continental-gt-speed-convertible-lateral.jpg?tf=1200x", 
        "https://carnovo.com/wp-content/uploads/2018/09/Lateral-del-BMW-X5-45e-iPerformance-2019.jpg", 
        "https://www.carsized.com/resources/bmw/4/gc/2014/sl_234097143_bmw-4-2014-side-view_4x.png",
        "https://www.carsized.com/resources/bmw/6/ca/2011/sl_231119153_bmw-6-2011-side-view_4x.png",
        "https://www.megautos.com/wp-content/uploads/2017/06/BMW-X3-2018-lateral-1024x669.jpg",
        "https://www.carsized.com/resources/bmw/x1/d/2015/sl_271114133_bmw-x1-2015-side-view_4x.png"
    ];
    const brands = ["Toyota", "Ford", "Honda", "Chevrolet", "Tesla"];
    const models = ["Camry", "F-150", "Civic", "Impala", "Model S"];
    const colors = ["red", "blue", "green", "black", "white"];
    const transmissionTypes = ["Automatic", "Manual"];
    const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];
    const typeOfUses = ["Commercial", "Tourism"];
    const carTypes = ["Sedan", "Coupe", "Van", "SUV", "Convertible"];
    const drivetrains = ["FWD", "RWD", "AWD", "4WD"];
    const fuelPolicies = ["Full-Full", "Fuel-Reimbursement"];

    for (let i = 0; i < numberOfCars; i++) {
        const newCar = new CarDetails({
            brand: brands[Math.floor(Math.random() * brands.length)],
            model: models[Math.floor(Math.random() * models.length)],
            year: Math.floor(Math.random() * (2023 - 2000 + 1) + 2000),
            color: colors[Math.floor(Math.random() * colors.length)],
            transmissionType: transmissionTypes[Math.floor(Math.random() * transmissionTypes.length)],
            fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
            passengerCapacity: Math.floor(Math.random() * (8 - 2 + 1) + 2),
            rentalPricePerDay: Math.floor(Math.random() * (500 - 50 + 1) + 50),
            availability: Math.random() < 0.5,
            licensePlate: Math.random().toString(36).substr(2, 7).toUpperCase(),
            images: [imageUrls[Math.floor(Math.random() * imageUrls.length)]],
            description: "Este vehículo es ideal tanto para la conducción urbana como para largos recorridos por carretera, combinando un rendimiento excepcional con un confort superior. Diseñado pensando en la versatilidad, este modelo ofrece una experiencia de manejo suave y estable gracias a su avanzado sistema de suspensión y una transmisión optimizada que se adapta a diversas condiciones de conducción. La cabina, amplia y ergonómicamente diseñada, proporciona un espacio acogedor para los pasajeros, con asientos de alta calidad que aseguran comodidad incluso en los viajes más largos. Además, este auto viene equipado con una serie de características de seguridad de última generación, incluyendo múltiples airbags, sistemas de asistencia al conductor y tecnología de frenado avanzada, asegurando la seguridad de todos los ocupantes en todo momento. Con su eficiente consumo de combustible y su bajo impacto ambiental, este carro no solo es una elección económica, sino también una elección responsable. El modelo está disponible en varios colores elegantes, permitiendo que cada conductor exprese su estilo personal mientras disfruta de una conducción excepcional.",
            typeOfUse: typeOfUses[Math.floor(Math.random() * typeOfUses.length)],
            mileage: Math.floor(Math.random() * (200000 - 0 + 1) + 0),
            carType: carTypes[Math.floor(Math.random() * carTypes.length)],
            drivetrain: drivetrains[Math.floor(Math.random() * drivetrains.length)],
            fuelPolicy: fuelPolicies[Math.floor(Math.random() * fuelPolicies.length)],
        });

        await newCar.save();
    }

    console.log(`${numberOfCars} fake cars created successfully.`);
    mongoose.disconnect();
};

createFakeCars();
