#!/bin/bash

# Crear la base de datos y la colección en MongoDB
mongosh <<EOF
# Crear la base de datos
use myDB
# Crear la colección
db.createCollection("countries")

# Insertar documentos en la colección
db.countries.insertMany([
	{ name: 'Estados Unidos', pib: 21137518 },
	{ name: 'China', pib: 14140163 },
	{ name: 'Japón', pib: 5081770 },
	{ name: 'Alemania', pib: 3845630 },
	{ name: 'Ecuador', pib: 2507666 }
])

# Mostrar los documentos de la colección
db.countries.find().pretty()
EOF