import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.inventory.createMany({
    data: [
        { name: 'Monitor', price: 200.00, quantity: 5 },
        { name: 'Teclado', price: 100.00, quantity: 10 },
        { name: 'Mouse', price: 50.00, quantity: 15 },
        { name: 'Webcam', price: 150.00, quantity: 7 },
        { name: 'Laptop Stand', price: 120.00, quantity: 8 },
        { name: 'Audífonos', price: 180.00, quantity: 12 },
        { name: 'Parlantes', price: 160.00, quantity: 6 },
        { name: 'Impresora', price: 350.00, quantity: 4 },
        { name: 'Router WiFi', price: 90.00, quantity: 9 },
        { name: 'Micrófono', price: 130.00, quantity: 5 },
        { name: 'Cámara IP', price: 220.00, quantity: 3 },
        { name: 'Tablet', price: 300.00, quantity: 5 },
        { name: 'Smartphone', price: 500.00, quantity: 6 },
        { name: 'Proyector', price: 400.00, quantity: 2 },
        { name: 'Control Remoto', price: 25.00, quantity: 20 },
        { name: 'Cable HDMI', price: 15.00, quantity: 30 },
        { name: 'Batería Portátil', price: 45.00, quantity: 10 },
        { name: 'Memoria USB', price: 20.00, quantity: 25 },
        { name: 'Disco Duro Externo', price: 250.00, quantity: 4 },
        { name: 'Adaptador USB-C', price: 35.00, quantity: 18 },
    ],
  });

  console.log('✅ Inventario precargado con éxito');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });