// ---------------------------------------------------------------------------------------------
// Fecha: 30/oct/2024
// Descripción: La aplicación se conecta a la base de datos y recupera los datos de los países,
//              mostrándolos haciendo uso de una plantilla 'ejs'.
// ---------------------------------------------------------------------------------------------
const express = require('express');

// Importa las funciones 'connectDB' y 'closeDB' del archivo 'db.js'
const { connectDB, closeDB } = require('./db');

const app = express();
const port = 3000;

// Configura el motor de vistas de la aplicación para usar 'ejs'
app.set('view engine', 'ejs');

// Configura la aplicación para servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Conectar a la base de datos al iniciar la aplicación
connectDB().catch(error => {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1);
});

// Define una ruta para la raíz del sitio ('/')
app.get('/', async (req, res) => {
    try {
        // Selecciona la base de datos llamando a la función 'connectDB' definida en el archivo 'db.js'
        const db = await connectDB();

		// Selecciona la colección
        const collection = db.collection('countries');

        // Busca todos los documentos en la colección
        const countries = await collection.find({}).toArray();

        // Renderiza la plantilla 'index' con los datos de los países
        res.render('index', { countries });

    // Maneja cualquier error que ocurra
    } catch (error) {
        // Si hay un error, imprímelo en la consola y envía un mensaje de error al cliente
        console.error('Error conectando a la base de datos o recuperando datos', error);
        if (!res.headersSent) {
            res.status(500).send('Error conectando a la base de datos o recuperando datos');
        }
    }
});

// Inicia la aplicación y hace que escuche en el puerto definido
app.listen(port, () => {
    // Imprime un mensaje en la consola indicando que la aplicación está en funcionamiento
    console.log(`App corriendo en el puerto: ${port}`);
});

// Cerrar la conexión a la base de datos al detener la aplicación
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});