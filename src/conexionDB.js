import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'Tienda',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

export default conectarDB;