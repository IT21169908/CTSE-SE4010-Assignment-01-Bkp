# 🚀 Cloud Microservice Deployment on AWS EKS

This project includes a containerized Node.js + TypeScript-based **Microservice**,
deployed to **AWS EKS** with CI/CD via **GitHub Actions**.

---

## ⚙️ Setup & Deployment Commands

### 🔐 Create Docker Hub Access Keys
  - Sign in to Docker Hub
  - Go to Account Settings → Personal Access Token
  - Generate new token
  - Add to GitHub Secrets (Settings > Secrets and variables > Actions)
    - DOCKER_USERNAME 
    - DOCKER_PASSWORD

### 🔐 Create AWS Access Keys
  - Sign in to AWS Console
  - Go to IAM
  - Create or Select an IAM User
  - Attach Permissions (only required permissions)
  - Copy the Access Key ID and Secret Access Key
  - Add to GitHub Secrets (Settings > Secrets and variables > Actions)
    - AWS_ACCESS_KEY_ID 
    - AWS_SECRET_ACCESS_KEY

### ✅ 1. Install AWS CLI & kubectl

```bash
pip install awscli
brew install kubectl
```

### ✅ 2. Configure AWS CLI

```bash
aws configure
```
Enter your:

`AWS Access Key ID`

`AWS Secret Access Key`

`Region: ap-south-1`

`Output format: json`

### ✅ 3. Install eksctl on Windows

```bash
choco install eksctl
```

### ✅ 4. Create EKS Cluster (simplified example using eksctl)

```bash
eksctl create cluster  --name microservice-cluster  --region ap-south-1  --nodegroup-name standard-workers  --node-type t3.medium  --nodes 2
```

### ✅ 5. Configure kubectl for EKS

```bash
aws eks update-kubeconfig --region ap-south-1 --name microservice-cluster
```

### ✅  6. Create Kubernetes Secret for .env values
```bash 
kubectl create secret generic <secretRef.name> --from-env-file=services/<service-folder>/.env.docker

kubectl create secret generic auth-env --from-env-file=services/auth/.env.docker
```
### ❌✅  7. To Delete and update the secret later:
```bash 
kubectl delete secret <service.name>

kubectl delete secret auth-env
```

```bash 
kubectl describe secret <service.name>

kubectl describe secret auth-env
```
```bash 
kubectl get secret <service.name> -o yaml

kubectl get secret auth-env -o yaml
```
```bash 
echo <copy-base64-string>  | base64 --decode
```
### ✅ 8. Apply Kubernetes Deployment and Service
```bash 
kubectl apply -f k8s/<k8-service>.yaml
```
### ✅ 9. Restart Deployment (when image or env changes)
```bash 
kubectl rollout restart deployment <service.name>

kubectl rollout restart deployment auth
```
### ✅ 10. Check Pod Logs

```bash 
kubectl get pods
kubectl logs <pod-name>
```
### ✅ 11. Check Pod Health
```bash 
kubectl get pods
kubectl describe pod <pod-name>
```

### ✅ 12. Check if Service is Accessible
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
