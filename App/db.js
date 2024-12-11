// ---------------------------------------------------------------------------------------------
// Fecha: 30/oct/2024
// Descripción: La función 'connectDB' se encarga de establecer la conexión a la base de datos y 
//              devolver un objeto que representa la conexión.
// ---------------------------------------------------------------------------------------------
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// URI de conexión a la base de datos, viene de las variables de entorno
const uri = process.env.MONGODB_URI;

// Objeto de conexión a la base de datos
let db;
let client;

const connectDB = async () => {
  if (db) return db;

  try {

    client = new MongoClient(uri);
    await client.connect();

    db = client.db(); // No se especifica la base de datos, se conecta a la base de datos definida en la URI
    console.log('Conectado a MongoDB');

    // Retorna el objeto de conexión a la base de datos
    return db;

  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw error;
  }
};

// Función para cerrar la conexión a la base de datos
const closeDB = async () => {
  if (client) {
    try {
      await client.close();
      console.log('Conexión a MongoDB cerrada');
    } catch (error) {
      console.error('Error cerrando la conexión a MongoDB:', error);
      throw error;
    }
  }
};

// Exporta las funciones 'connectDB' y 'closeDB'
module.exports = { connectDB, closeDB };