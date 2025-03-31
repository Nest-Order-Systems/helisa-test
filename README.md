# 🧩 Nest Order System

Este proyecto es una arquitectura de microservicios construida con **NestJS**, que incluye:

- ✅ `client-gateway` – API Gateway
- 🛒 `orders-ms` – Microservicio de Órdenes
- 📦 `inventory-ms` – Microservicio de Inventario
- 🚚 `delivery-ms` – Microservicio de Entregas

---

## 📁 Estructura del Proyecto

nestjs-order-system/ │ ├── client-gateway/ # API Gateway ├──  │ └── inventory-ms/ # Microservicio de Inventario ├── order-microservice/ │ └── orders-ms/ # Microservicio de Órdenes ├── delivery-microservice/ │ └── delivery-ms/ # Microservicio de Entregas ├── docker-compose.yml # Levanta las bases de datos requeridas └── README.md

---

## ⚙️ Requisitos

- Node.js >= 20
- Docker + Docker Compose
- NPM
- Nest CLI (opcional): `npm i -g @nestjs/cli`

---

## 🐳 Configuración con Docker

Desde la raíz del proyecto, levanta las bases de datos necesarias:

```bash
docker-compose up -d
```

## Levantar los servicios
1. Api Gateway
```
cd client-gateway
npm install
npm run start:dev
```

2. Inventory Microservice
```
cd inventory-ms
npm install
npx prisma migrate dev
npm run start:dev
```

3. Order Microservice
```
cd orders-ms
npm install
npx prisma migrate dev
npm run start:dev
```

4. Delivery Microservice
```
cd delivery-ms
npm install
npx prisma migrate dev
npm run start:dev
```

## 📬 Comunicación entre Microservicios

Todos los microservicios se comunican mediante mensajes asíncronos usando **NATS** como sistema de transporte.

- 🎯 Cada microservicio se registra como un consumidor de NATS.
- 🧩 El API Gateway (`client-gateway`) actúa como punto de entrada HTTP para exponer los endpoints de forma centralizada.
- 🔁 Las solicitudes entrantes se enrutan por NATS hacia:
  - `inventory-ms`
  - `orders-ms`
  - `delivery-ms`

---

## 🧪 Pruebas de la API

Puedes probar el sistema fácilmente usando **Postman** con nuestra colección predefinida.

### Endpoints expuestos por el `client-gateway`:

- `GET /inventory`
- `GET /inventory/:id`
- `POST /orders`
- `GET /orders/:id`
- `GET /delivery/:id`

🔗 **Colección Postman:** [📥 Enlace a la colección](./postman/Order%20System%20Inventory.postman_collection.json)

> Puedes importar este archivo en Postman usando la opción **"Import > File"**.

---

## 📌 Notas Técnicas

- 🧱 Cada microservicio tiene su propia base de datos **PostgreSQL**
- 🔧 Se utiliza **Prisma ORM** para manejar la capa de datos
- 🧪 Se recomienda ejecutar las migraciones con `npx prisma migrate dev` en cada microservicio
- ⚡ **NATS** permite una comunicación desacoplada, rápida y escalable

---

## 👨‍💻 Autor

Proyecto desarrollado por **Juan Camilo Rodriguez Torres.** como prueba técnica de arquitectura de microservicios con NestJS 🚀