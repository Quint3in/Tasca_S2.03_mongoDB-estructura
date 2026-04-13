use ecommerce

db.createCollection("clientes", {
   validator: {
       $jsonSchema: {
           bsonType: "object",
           required: ["nombre", "apellido1", "telefono"],
           properties: {
              nombre: { bsonType: "string" },
              apellido1: { bsonType: "string" },
              telefono: { bsonType: "string" }
           }
       }
   }
})
db.createCollection("ventas", {
   validator: {
       $jsonSchema: {
           bsonType: "object",
           required: ["cliente_id", "tienda_id", "fecha_venta", "tipo", "productos", "precio_total"],
           properties: {
               tipo: {
                   enum: ["domicilio", "recogida"],
                   description: "Debe ser entrega a domicilio o recogida en tienda"
               },
               repartidor_id: {
                   bsonType: ["objectId", "null"]
               },
               fecha_entrega: {
                   bsonType: ["date", "null"]
               },
               precio_total: {
                  bsonType: "number",
                  minimum: 0
               },
               cliente_id: { bsonType: "objectId" },
               tienda_id: { bsonType: "objectId" },
               productos: {
                  bsonType: "array",
                  items: {
                     bsonType: "object",
                     required: ["cantidad", "producto_id"],
                     properties: {
                        cantidad: {
                           bsonType: "int",
                           minimum: 1
                        },
                        producto_id: {
                           bsonType: "objectId"
                        }
                     }
                  }
               }
           },
           oneOf: [
               {
                  properties: {
                     tipo: { enum: ["domicilio"] },
                     repartidor_id: { bsonType: "objectId" },
                     fecha_entrega: { bsonType: "date" }
                  },
                  required: ["repartidor_id", "fecha_entrega"]
               },
               {
                  properties: {
                     tipo: { enum: ["recogida"] },
                     repartidor_id: { bsonType: "null" },
                     fecha_entrega: { bsonType: "null" }
                  }
               }
           ]
       }
   }
})
db.createCollection("productos", {
   validator: {
       $jsonSchema: {
           bsonType: "object",
           required: ["tipo", "nombre", "precio"],
           properties: {
               tipo: {
                   enum: ["pizza", "hamburguesa", "bebida"],
                   description: "Debe ser pizza, hamburguesa o bebida"
               },
               nombre: { bsonType: "string" },
               precio: { bsonType: "double" },
               categoria_pizza_id: {
                   bsonType: ["objectId", "null"]
               }
           },
           oneOf: [
              {
                 properties: {
                    tipo: { enum: ["pizza"] },
                    categoria_pizza_id: { bsonType: "objectId" }
                 },
                 required: ["categoria_pizza_id"]
              },
              {
                 properties: {
                    tipo: { enum: ["bebida", "hamburguesa"] },
                    categoria_pizza_id: { bsonType: "null" }
                 }
              }
          ]
       }
   }
})
db.createCollection("tienda")
db.createCollection("empleado", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nif", "tipo"],
            properties: {
                tipo: {
                    enum: ["cocinero", "repartidor"],
                    description: "Debe ser cocinero o repartidor"
                },
                nombre: { bsonType: "string" },
                nif: { bsonType: "string" },
                telefono: { bsonType: "string" },
                tienda_id: { bsonType: "objectId" }
            }
        }
    }
})
db.createCollection("categoriaPizzas", {
     validator: {
         $jsonSchema: {
             bsonType: "object",
             required: ["nombre"]
         }
     }
 })

db.categoriaPizzas.insertOne({
    nombre: "categoria1"
})

db.productos.insertOne({
    tipo: "pizza",
    nombre: "producto1",
    descripcion: "descripcion producto1",
    imagen_url: "https://image1.url",
    precio: 7.99,
    categoria_pizza_id: ObjectId("65a1f2c8b9d123456789aaa3")
})
db.productos.insertOne({
    tipo: "bebida",
    nombre: "producto2",
    descripcion: "descripcion producto2",
    imagen_url: "https://image2.url",
    precio: 2.49,
    categoria_pizza_id: null
})

db.tienda.insertOne({
    direccion: "direccion1",
    codigo_postal: "09999",
    localidad: "localidad1",
    provincia: "provincia1"
})

db.empleado.insertOne({
    nombre: "empleado1",
    apellido1: "apellido1",
    apellido2: "apellido2",
    nif: "123456789A",
    telefono: "1234567890",
    tipo: "repartidor",
    tienda_id: ObjectId("65a1f2c8b9d123456789aaa1")
})
db.empleado.insertOne({
    nombre: "empleado2",
    apellido1: "apellido3",
    apellido2: "apellido4",
    nif: "123456789B",
    telefono: "1234567891",
    tipo: "cocinero",
    tienda_id: ObjectId("65a1f2c8b9d123456789aaa2")
})

db.clientes.insertOne({
    nombre: "Cliente1",
    apellido1: "apellido1",
    apellido2: "apellido2",
    direccion: "direccion1",
    codigo_postal: "08888",
    localidad: "localidad1",
    provincia: "provincia1",
    telefono: "123456789"
})

db.ventas.insertOne({
    cliente_id: ObjectId("65a1f2c8b9d123456789aaa5"),
    tienda_id: ObjectId("65a1f2c8b9d123456789aa12"),
    fecha_venta: new Date(),
    tipo: "domicilio",
    productos: [{
        cantidad: 5,
        producto_id: ObjectId("65a1f2c8b9d123456789aaa6")
    },
    {
        cantidad: 2,
        producto_id: ObjectId("65a1f2c8b9d123456789aaa7")
    }],
    precio_total: 50,
    notas: "notas1",
    repartidor_id: ObjectId("65a1f2c8b9d123456789aaa8"),
    fecha_entrega: new Date()
})
db.ventas.insertOne({
    cliente_id: ObjectId("65a1f2c8b9d123456789aaa9"),
    tienda_id: ObjectId("65a1f2c8b9d123456789aa13"),
    fecha_venta: new Date(),
    tipo: "recogida",
    productos: [{
        cantidad: 3,
        producto_id: ObjectId("65a1f2c8b9d123456789aa10")
    },
    {
        cantidad: 3,
        producto_id: ObjectId("65a1f2c8b9d123456789aa11")
    }],
    precio_total: 30,
    notas: "notas2",
    repartidor_id: null,
    fecha_entrega: null
})