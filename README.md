# Nest Order System 🧩

Este proyecto es una arquitectura de microservicios construida con **NestJS**, que incluye:

- ✅ `client-gateway` (API Gateway)
- 🛒 `orders-ms` (Microservicio de Órdenes)
- 📦 `inventory-ms` (Microservicio de Inventario)
- 🚚 `delivery-ms` (Microservicio de Entregas)

---

## 📁 Estructura del Proyecto

nestjs-order-system/ │ ├── client-gateway/ # API Gateway ├── inventory-microservice/ │ └── inventory-ms/ # Microservicio de Inventario ├── order-microservice/ │ └── orders-ms/ # Microservicio de Órdenes ├── delivery-microservice/ │ └── delivery-ms/ # Microservicio de Entregas ├── docker-compose.yml # Levanta las bases de datos requeridas └── README.md

---
- Node.js >= 20
- Docker + Docker Compose
- NPM
- Nest CLI (opcional): `npm i -g @nestjs/cli`

---