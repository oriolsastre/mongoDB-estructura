db.dropDatabase();

db.createCollection('usuari', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "email", "contrasenya"],
            properties: {
                nom: {bsonType: "string"},
                email: {bsonType: "string"},
                contrasenya: {bsonType: "string"},
                data_naixement: {bsonType: "date"},
                sexe: {bsonType: "string"},
                pais: {bsonType: "string"},
                subscripcio: {bsonType: "array"}
            }
        }
    }
});

db.createCollection('canal', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "descripcio", "data_hora", "usuari"],
            properties: {
                nom: {bsonType: "string"},
                descripcio: {bsonType: "string"},
                data_hora: {bsonType: "timestamp"}
            }
        }
    }
});

db.createCollection('video', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["publicacio", "titol", "descripcio", "estat", "propietats", "thumbnail", "feedback", "reproduccions", "etiquetes"],
            properties: {
                titol: {bsonType: "object"}
            }
        }
    }
})