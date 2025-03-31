# 🧩 Nest Order System

Este proyecto es una arquitectura de microservicios construida con **NestJS**, que incluye:

- ✅ `client-gateway` – API Gateway
- 🛒 `orders-ms` – Microservicio de Órdenes
- 📦 `inventory-ms` – Microservicio de Inventario
- 🚚 `delivery-ms` – Microservicio de Entregas

---

## 📁 Estructura del Proyecto

helisa-test/ │ ├── client-gateway/ # 🚪 API Gateway (punto de entrada) │ ├── delivery-ms/ # 🚚 Microservicio de entregas │ └── prisma/ # Esquema y migraciones de base de datos │ └── src/ # Código fuente del microservicio │ ├── inventory-ms/ # 📦 Microservicio de inventario │ └── prisma/ # Esquema y migraciones de base de datos │ └── src/ # Código fuente del microservicio │ ├── orders-ms/ # 🛒 Microservicio de órdenes │ └── prisma/ # Esquema y migraciones de base de datos │ └── src/ # Código fuente del microservicio │ ├── postman/ # 📬 Colección de pruebas con Postman │ ├── docker-compose.yml # 🐳 Levanta bases de datos PostgreSQL ├── README.md # 📘

---

## ⚙️ Requisitos

- Node.js >= 20
- Docker + Docker Compose
- NPM
- Nest CLI (opcional): `npm i -g @nestjs/cli`

---

## 🚀 Levantar el servidor de NATS

Este sistema usa NATS para la comunicación entre microservicios. Para levantar un servidor local:

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

## 🐳 Configuración con Docker

Cada microservicio contiene su propio archivo docker-compose.yml para levantar la base de datos correspondiente. Debes ejecutar el siguiente comando dentro de cada carpeta de microservicio:

```bash
docker-compose up -d
```
## 📍 Ejecutar por microservicio:

Inventory Microservice

1. Inventory Microservice
```bash
cd inventory-ms
docker-compose up -d
```

2. Orders Microservice
```bash
cd orders-ms
docker-compose up -d
```

3. Delivery Microservice
```bash
cd delivery-ms
docker-compose up -d
```


### 🧪 Precargar datos de inventario
---
Después de ejecutar las migraciones, puedes insertar datos de prueba con:

```bash
cd inventory-ms
npm run seed
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
- `GET /orders`
- `GET /delivery`

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