# 🚀 Cloud Microservice Deployment – Auth Service on AWS EKS

This project includes a containerized Node.js + TypeScript-based **Auth microservice**, deployed to **AWS EKS** with CI/CD via **GitHub Actions**.

---

## ⚙️ Setup & Deployment Commands

### ✅ 1. Configure AWS CLI

```bash
aws configure
```
 Enter your:

  `AWS Access Key ID`

  `AWS Secret Access Key`

  `Region: ap-south-1`

  `Output format: json`

### ✅ 2. Configure kubectl for EKS

```bash
aws eks update-kubeconfig --region ap-south-1 --name microservice-cluster
```

### ✅  3. Create Kubernetes Secret for .env values
```bash 
kubectl create secret generic auth-env --from-env-file=services/auth/.env.docker
```
### ❌✅  3. To Delete and update the secret later:
```bash 
kubectl delete secret auth-env
```

```bash 
kubectl describe secret auth-env
```
```bash 
kubectl get secret auth-env -o yaml
```
```bash 
echo <copy-base64-string>  | base64 --decode
```
### ✅ 4. Apply Kubernetes Deployment and Service
```bash 
kubectl apply -f k8s/<k8-service>.yaml
```
### ✅ 5. Restart Deployment (when image or env changes)
```bash 
kubectl rollout restart deployment auth
```
### ✅ 6. Check Pod Logs

```bash 
kubectl get pods
kubectl logs <pod-name>
```
### ✅ 7. Check Pod Health
```bash 
kubectl get pods
kubectl describe pod <auth-pod-name>
```

### ✅ 8. Check if Service is Accessible
```bash 
kubectl get svc
```
```bash 
kubectl describe svc <service>
```

Then open your LoadBalancer URL in the browser:
```curl 
http://<EXTERNAL-IP-or-DNS>:port/
```
