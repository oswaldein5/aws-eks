## Docker && Compose

### 01. Build files: `dockerfile.yml` and `docker-compose.yml`

### 02. Deploy all containers, networks, and volumes associated with the `nodejs-app` project.
```
docker compose -p nodejs-app up --build -d > logs/compose-build-run.log 2>&1
```
### 03. Open an interactive MongoDB Shell (mongosh) session inside the `mongodb` container.
```
docker exec -it mongodb mongosh
```
### 04. Create database and collection (only the first time)
```
use myDB
db.createCollection("countries")
db.countries.insertMany([
	{ name: 'United States', gdp: 21137518 },
	{ name: 'China', gdp: 14140163 },
	{ name: 'Japan', gdp: 5081770 },
	{ name: 'Germany', gdp: 3845630 },
	{ name: 'Ecuador', gdp: 2507666 }
])
db.countries.find().pretty()
```
### 05. Check Web Application: `http://localhost:3000`

### 06. View container logs and redirect them to a file
```
docker logs web_server > logs/container_web_server.log 2>&1
docker logs mongodb > logs/container_mongodb.log 2>&1
```
### 07. Tag the image to upload
```
docker tag nodejs-app-web_server:latest oswaldeins/repo_unir:nodejs-app-v1.0
```
### 08. Log in to Docker Hub
```
docker login
```
### 09. Push the image to Docker Hub
```
docker push oswaldeins/repo_unir:nodejs-app-v1.0 > logs/push.log 2>&1
```
### 10. Pull the image from Docker Hub
```
docker pull oswaldeins/repo_unir:nodejs-app-v1.0 > logs/pull.log 2>&1
```
### 11. Stop and remove all containers, networks, and volumes associated with the `nodejs-app` project.
```
docker compose -p nodejs-app down > logs/compose-down.log 2>&1
```