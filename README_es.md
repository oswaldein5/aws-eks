## K8s en AWS EKS

### Crear Cluster y Nodos en AWS

### 01.- Crea el Namespace demo-k8s
```
kubectl apply -f demo-k8s-ns.yaml
``` 

### 02.- Crea el contexto
```
kubectl config set-context demo-k8s-context --namespace=demo-k8s --cluster=arn:aws:eks:us-east-1:533267367989:cluster/demo-cluster --user=arn:aws:eks:us-east-1:533267367989:cluster/demo-cluster
```

### 03.- Ir al contexto creado.
```
kubectl config use-context demo-k8s-context
```

### 04.- Crea StorageClass para persistencia dinamica de volumenes (opcional)
```
kubectl apply -f demo-k8s-sc.yaml
```

### 05.- Ejecuta archivos de configuración (YAML)
***Escenario 01) Persistencia de Volúmenes a nivel de nodo (hostPath)***
```
kubectl apply -f mongodb-deploy.yaml -f mongodb-svc.yaml -f webserver-deploy.yaml -f webserver-svc.yaml

kubectl delete -f mongodb-deploy.yaml -f mongodb-svc.yaml -f webserver-deploy.yaml -f webserver-svc.yaml
```
***Escenario 02) Persistencia de Volúmenes con PVC usando almacenamiento EBS***
```
kubectl apply -f mongodb-pv.yaml -f mongodb-pvc.yaml -f mongodb-deploy-pvc.yaml -f mongodb-svc.yaml -f webserver-deploy.yaml -f webserver-svc.yaml

kubectl delete -f mongodb-pv.yaml -f mongodb-pvc.yaml -f mongodb-deploy-pvc.yaml -f mongodb-svc.yaml -f webserver-deploy.yaml -f webserver-svc.yaml
```
***Escenario 03) Persistencia de Volumenes EBS (Dinámica) --> Se debe ejecutar primero el paso 04***
```
kubectl apply -f mongodb-pvc-dynamic.yaml -f mongodb-deploy-pvc.yaml -f mongodb-svc.yaml -f webserver-deploy.yaml -f webserver-svc.yaml

kubectl delete -f mongodb-pvc-dynamic.yaml -f mongodb-deploy-pvc.yaml -f mongodb-svc.yaml -f webserver-deploy.yaml -f webserver-svc.yaml
```

### 06.- Crear Base de datos y Colección en MongoDB (esta acción se realiza solo una vez)

Abrir una sesión interactiva de MongoDB Shell (mongosh) dentro del pod `mongodb`
```
kubectl exec -it <pod-mongodb> -- mongosh

kubectl exec -it mongodb-55bc6d8899-rxvkq -- mongosh

use myDB
db.createCollection("countries")
db.countries.insertMany([
	{ name: 'Estados Unidos', pib: 21137518 },
	{ name: 'China', pib: 14140163 },
	{ name: 'Japón', pib: 5081770 },
	{ name: 'Alemania', pib: 3845630 },
	{ name: 'Ecuador', pib: 2507666 }
])
```
