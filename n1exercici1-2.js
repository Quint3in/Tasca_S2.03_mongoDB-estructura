use optica

db.createCollection("clientes")
db.createCollection("proveedores")
db.createCollection("gafas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipo_montura"],
            properties: {
                tipo_montura: {
                    enum: ["flotante", "pasta", "metalica"],
                    description: "Debe ser flotante, pasta o metalica"
                }
            }
        }
    }
})
db.createCollection("ventas")

db.proveedores.insertOne({
    nombre: "Rayban",
    direccion: {
        calle: "Gran Via",
        numero: 10,
        piso: null,
        puerta: null,
        ciudad: "Madrid",
        codigo_postal: "28001",
        pais: "España"
    },
    telefono: "123456789",
    fax: "123456789",
    nif: "123456789"
})

db.gafas.insertOne({
    marca: "Ray-Ban",
    graduacion: {
        izquierda: -1.5,
        derecha: -1.25
    },
    tipo_montura: "metalica",
    color_montura: "negro",
    color_cristales: {
        izquierda: "transparente",
        derecha: "transparente"
    },
    precio: 150
})

db.clientes.insertOne({
    nombre: "Cliente1",
    direccion: {
        calle: "calle",
        numero: 1,
        piso: 2,
        puerta: 3,
        ciudad: "Ripollet",
        codigo_postal: "08291",
        pais: "España"
    },
    telefono: "123456789",
    email: "example@gmail.com",
    fecha_registro: new Date(),
    recomendado_por: ObjectId("65a1f2c8b9d123456789abcd")
})

db.ventas.insertOne({
    cliente_id: ObjectId("65a1f2c8b9d123456789aaaa"),
    gafa_id: ObjectId("65a1f2c8b9d123456789cccc"),
    fecha_venta: new Date()
})