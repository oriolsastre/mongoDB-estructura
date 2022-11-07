db.createCollection('usuaris', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "email", "edat"],
            properties: {
                nom: {
                    bsonType: "string",
                    description: "El nom d'usuari ha de ser un string i és necessari"
                },
                email: {
                    bsonType: "string",
                    description: "El correu electrònic."
                },
                edat: {
                    bsonType: "int"
                }
            }
        }
    }
})