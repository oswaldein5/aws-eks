## Docker && Compose

### 01. Construir archivos: `dockerfile.yml` y `docker-compose.yml`

### 02. Desplegar todos los contenedores, redes y volúmenes asociados con el proyecto `nodejs-app`.
```
docker compose -p nodejs-app up --build -d > logs/compose-build-run.log 2>&1
```
### 03. Abre una sesión interactiva de MongoDB Shell (mongosh) dentro del contenedor `mongodb`.
```
docker exec -it mongodb mongosh
```
### 04. Crear BD y colección (solo la primera vez)
```
use myDB
db.createCollection("countries")
db.countries.insertMany([
	{ name: 'Estados Unidos', pib: 21137518 },
	{ name: 'China', pib: 14140163 },
	{ name: 'Japón', pib: 5081770 },
	{ name: 'Alemania', pib: 3845630 },
	{ name: 'Ecuador', pib: 2507666 }
])
db.countries.find().pretty()
```
### 05. Revisar Aplicación Web: `http://localhost:3000`

### 06. Ver los registros del contenedor y redirigirlos a un archivo
```
docker logs web_server > logs/contenedor_web_server.log 2>&1
docker logs mongodb > logs/contenedor_mongodb.log 2>&1
```
### 07. Etiquetar la imagen a subir
```
docker tag nodejs-app-web_server:latest oswaldeins/repo_unir:nodejs-app-v1.0
```
### 08. Iniciar sesión en Docker Hub
```
docker login
```
### 09. Subir la imagen a Docker Hub
```
docker push oswaldeins/repo_unir:nodejs-app-v1.0 > logs/push.log 2>&1
```
### 10. Extraer la imagen desde Docker Hub
```
docker pull oswaldeins/repo_unir:nodejs-app-v1.0 > logs/pull.log 2>&1
```
### 11. Detener y eliminar todos los contenedores, redes y volúmenes asociados con el proyecto `nodejs-app`.
```
docker compose -p nodejs-app down > logs/compose-down.log 2>&1
```