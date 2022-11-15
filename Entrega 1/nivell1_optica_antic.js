//com un delete if exists;
db.dropDatabase();

//crear les col·leccions
db.createCollection('client', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "cognom", "adreca", "telefon", "email", "data_registre"],
            properties: {
                nom: {bsonType: "string"},
                cognom: {bsonType: "string"},
                adreca: {
                    bsonType: "object",
                    required: ["carrer", "numero", "ciutat", "codi_postal", "pais"],
                    properties: {
                        carrer: {bsonType: "string"},
                        numero: {bsonType: "string"},
                        pis: {bsonType: "string"},
                        porta: {bsonType: "string"},
                        ciutat: {bsonType: "string"},
                        codi_postal: {bsonType: "string"},
                        pais: {bsonType: "string"}
                    }
                },
                telefon: {bsonType: "string"},
                email: {bsonType: "string"},
                data_registre: {bsonType: "date"}
            }
        }
    }
})

db.createCollection('proveidor', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "adreca", "telefon", "nif"],
            properties: {
                nom: {bsonType: "string"},
                adreca: {
                    bsonType: "object",
                    required: ["carrer", "numero", "ciutat", "codi_postal", "pais"],
                    properties: {
                        carrer: {bsonType: "string"},
                        numero: {bsonType: "string"},
                        pis: {bsonType: "string"},
                        porta: {bsonType: "string"},
                        ciutat: {bsonType: "string"},
                        codi_postal: {bsonType: "string"},
                        pais: {bsonType: "string"}
                    }
                },
                telefon: {bsonType: "string"},
                fax: {bsonType: "string"},
                nif: {bsonType: "string"}
            }
        }
    }
})

db.createCollection('marca', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "proveidor"],
            properties: {
                nom: {bsonType: "string"}
            }
        }
    }
})

db.createCollection('ullera', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["marca", "graduacio", "muntura", "color_muntura", "color_vidre", "preu"],
            properties: {
                marca: {bsonType: "int"},
                graduacio: {
                    bsonType: "array",
                    minItems: 2,
                    maxItems: 2,
                    items: {
                        bsonType: "double"
                    }
                },
                muntura: {enum: ["Flotant", "Pasta", "Metàl·lica"]},
                color_muntura: {bsonType: "string"},
                color_vidre: {
                    bsonType: "array",
                    minItems: 2,
                    maxItems: 2,
                },
                preu: {bsonType: "double"},
                venda: {
                    bsonType: "object",
                    properties: {
                        client: {bsonType: "int"},
                        venedor: {bsonType: "string"},
                        data: {bsonType: "date"}
                    }
                }
            }
        }
    }
});


//inserir dades
db.client.insertMany([{
    _id: NumberInt(1),
    nom: "Oriol", cognom: "Sastre Rienitz",
    adreca: {
        carrer: "Gran Via de les Corts Catalanes",
        numero: "1 Escala A",
        pis: "1er",
        porta: "1era",
        ciutat: "Barcelona",
        codi_postal: "08040",
        pais: "Catalunya"
    },
    telefon: "931010103",
    email: "oriol@ajuntament.cat",
    data_registre: new Date()
},{
    _id: NumberInt(2),
    nom: "Lev Mikhailovic", cognom: "Tolstoi",
    adreca: {
        carrer: "Roc Borinot",
        numero: "15",
        pis: "Àtic",
        porta: "B",
        ciutat: "Barcelona",
        codi_postal: "08040",
        pais: "Catalunya"
    },
    telefon: "00514478965858745236",
    email: "levtolstoi2@mail.ru",
    data_registre: new Date(),
    recomanat: NumberInt(1)
}])

db.proveidor.insertMany([{
    _id: 1,
    nom: "Brillen S.A",
    adreca: {
        carrer: "Hausestrasse",
        numero: "101B",
        ciutat: "Tuebingen",
        codi_postal: "10158",
        pais: "Alemanya"
    },
    telefon: "004955877963",
    fax: "004955877964",
    nif: "X123456789DE"
},{
    _id: 2,
    nom: "What(ch) you see",
    adreca: {
        carrer: "Down Street",
        numero: "221",
        ciutat: "London",
        codi_postal: "15858",
        pais: "United Kingdom"
    },
    telefon: "00245589623",
    nif: "X314159265UK"
}])

db.marca.insertMany([{
    _id: 1,
    nom: "Sehen & Sehnen",
    proveidor: 1
}, {
    _id: 2,
    nom: "RayBan",
    proveidor: 2
}])

db.ullera.insertMany([{
    marca: NumberInt(2),
    graduacio: [0.25,3.75],
    color_vidre: [null, null],
    muntura: "Pasta",
    color_muntura: "Negre",
    preu: 49.99,
    venda: {
        client: NumberInt(1),
        venedor: "Joan Petit",
        data: new Date("2022-09-01")
    }
},{
    marca: NumberInt(1),
    graduacio: [-0.25,-0.75],
    color_vidre: ["groc", "groc"],
    muntura: "Metàl·lica",
    color_muntura: "Verd",
    preu: 178,
    venda: {
        client: NumberInt(2),
        venedor: "Joan Petit",
        data: new Date("2022-08-25")
    }
}])