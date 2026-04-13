use youtube

db.createCollection("usuarios", {
   validator: {
       $jsonSchema: {
           bsonType: "object",
           required: ["email", "password", "username", "fecha_nacimiento", "sexo"],
           properties: {
              email: { bsonType: "string" },
              password: { bsonType: "string" },
              username: { bsonType: "string" },
              fecha_nacimiento: { bsonType: "date" },
              sexo: {
                  enum: ["H", "M"],
                  description: "Debe ser H-hombre o M-Mujer"
              },
              pais: { bsonType: "string" },
              codigo_postal: {bsonType: "string" }
           }
       }
   }
})

db.createCollection("videos", {
   validator: {
       $jsonSchema: {
           bsonType: "object",
           required: ["titulo", "espacio", "archivo", "duracion", "reproducciones", "likes", "dislikes",
            "estado", "etiquetas", "fecha_publicacion", "usuario_id"],
           properties: {
              titulo: { bsonType: "string" },
              descripcion: { bsonType: "string" },
              espacio: { bsonType: "number" },
              archivo: { bsonType: "string" },
              duracion: { bsonType: "int" },
              thumbnail: { bsonType: "string"},
              reproducciones: { bsonType: "number" },
              likes: { bsonType: "number" },
              dislikes: { bsonType: "number" },
              estado: {
                   enum: ["publico", "privado", "oculto"],
                   description: "Debe ser publico, privado u oculto"
              },
              etiquetas: {
                 bsonType: "array",
                 items: {
                    bsonType: "string",
                 }
              },
              usuario_id: { bsonType: "objectId" },
              fecha_publicacion: { bsonType: "date" }
           }
       }
   }
})

db.createCollection("canales", {
   validator: {
       $jsonSchema: {
           bsonType: "object",
           required: ["nombre", "fecha_creacion", "usuario_id"],
           properties: {
              nombre: { bsonType: "string" },
              descripcion: { bsonType: "string" },
              fecha_creacion: { bsonType: "date" },
              usuario_id: { bsonType: "objectId" }
           }
       }
   }
})

db.createCollection("suscripciones", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["usuario_id", "canal_id"],
         properties: {
            usuario_id: { bsonType: "objectId" },
            canal_id: { bsonType: "objectId" }
         }
      }
   }
})
db.createCollection("reacciones", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["usuario_id", "video_id", "tipo", "fecha"],
         properties: {
            usuario_id: { bsonType: "objectId" },
            video_id: { bsonType: "objectId" },
            tipo: {
               enum: ["like", "dislike"],
               description: "Debe ser like o dislike"
            },
            fecha: { bsonType: "date" }
         }
      }
   }
})
db.reacciones.createIndex(
   { usuario_id: 1, video_id: 1 },
   { unique: true }
)

db.createCollection("lista_reproduccion", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nombre", "fecha_creacion", "estado", "usuario_id", "videos"],
         properties: {
            nombre: { bsonType: "string" },
            fecha_creacion: { bsonType: "date" },
            estado: {
               enum: ["publico", "privado"],
               description: "Debe ser publico o privado"
            },
            usuario_id: { bsonType: "objectId" },
            videos: {
                bsonType: "array",
                items: {
                    bsonType: "objectId",
                }
            }
         }
      }
   }
})
db.createCollection("comentarios", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["texto", "fecha", "usuario_id", "video_id"],
         properties: {
            texto: { bsonType: "string" },
            fecha: { bsonType: "date" },
            usuario_id: { bsonType: "objectId" },
            video_id: { bsonType: "objectId" }
         }
      }
   }
})

db.usuarios.insertOne({
    email: "usuario1@example.com",
    password: "1234567890",
    username: "user1",
    fecha_nacimiento: new Date(),
    sexo: "H",
    pais: "España",
    codigo_postal: "11111"
})
db.usuarios.insertOne({
    email: "usuario2@example.com",
    password: "1234567890",
    username: "user2",
    fecha_nacimiento: new Date(),
    sexo: "M",
    pais: "España",
    codigo_postal: "11112"
})
db.canales.insertOne({
    nombre: "canal1",
    descripcion: "desc1",
    fecha_creacion: new Date(),
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa1")
})
db.suscripciones.insertOne({
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa2"),
    canal_id: ObjectId("507f1f77bcf86cd7994aaaa3")
})
db.videos.insertOne({
    titulo: "titulo1",
    descripcion: "desc1",
    espacio: 3000,
    duracion: 1463,
    archivo: "arhcivo1",
    thumbnail: "https://miweb.com/thumbs/video1.jpg",
    reproducciones: 103,
    likes: 1,
    dislikes: 0,
    estado: "oculto",
    etiquetas: ["etiqueta3","etiqueta4","etiqueta5"],
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa1"),
    fecha_publicacion: new Date()
})
db.videos.insertOne({
    titulo: "titulo2",
    descripcion: "desc2",
    espacio: 3500,
    duracion: 1873,
    archivo: "archivo2",
    thumbnail: "https://miweb.com/thumbs/video2.jpg",
    reproducciones: 50,
    likes: 0,
    dislikes: 1,
    estado: "publico",
    etiquetas: ["etiqueta1","etiqueta2","etiqueta3"],
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa2"),
    fecha_publicacion: new Date()
})

db.lista_reproduccion.insertOne({
    nombre: "lista1",
    fecha_creacion: new Date(),
    estado: "publico",
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa1"),
    videos: [
        ObjectId("507f1f77bcf86cd7994aaaa4"),
        ObjectId("507f1f77bcf86cd7994aaaa5")
    ]
})
db.reacciones.insertOne({
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa1"),
    video_id: ObjectId("507f1f77bcf86cd7994aaaa4"),
    tipo: "like",
    fecha: new Date()
})
db.reacciones.insertOne({
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa1"),
    video_id: ObjectId("507f1f77bcf86cd7994aaaa5"),
    tipo: "dislike",
    fecha: new Date()
})
db.comentarios.insertOne({
    texto: "comentario1",
    fecha: new Date(),
    usuario_id: ObjectId("507f1f77bcf86cd7994aaaa1"),
    video_id: ObjectId("507f1f77bcf86cd7994aaaa4")
})