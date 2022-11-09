db.dropDatabase();

db.createCollection('client', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "cognoms", "adreca", "telefon"],
            properties: {
                nom: {bsonType: "string"},
                cognoms: {bsonType: "string"},
                adreca: {
                    bsonType: "object",
                    required: ["carrer", "numero", "codi_postal", "localitat", "provincia"],
                    properties: {
                        bsonType: "string"
                    },
                telefon: {bsonType: "string"}
                }
            }
        }
    }
});

db.createCollection('botiga', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["adreca"],
            properties: {
                adreca: {
                    bsonType: "object",
                    required: ["carrer", "numero", "codi_postal", "localitat", "provincia"]
                }
            }
        }
    }
});

db.createCollection('empleat', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "cognoms", "nif", "telefon", "posicio", "botiga"],
            properties: {
                nom: {bsonType: "string"},
                cognoms: {bsonType: "string"},
                nif: {bsonType: "string"},
                telefon: {bsonType: "string"},
                posicio: {enum: ["repartidor", "cuiner"]}
            }
        }
    }
})

db.createCollection('categoria', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom"],
            properties: {
                nom: {bsonType: "string"}
            }
        }
    }
});

db.createCollection('producte', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipus", "nom", "descripcio", "imatge", "preu"],
            properties: {
                tipus: {enum: ["Pizza", "Hamburguesa", "Beguda"]},
                nom: {bsonType: "string"},
                descripcio: {bsonType: "string"},
                preu: {bsonType: "double"}
            }
        }
    }
});

db.createCollection('comanda', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["data", "botiga", "client", "preu", "contingut"],
            properties: {
                data: {bsonType: "timestamp"},
                preu: {bsonType: "double"},
                contingut: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["producte", "quantitat"],
                        properties: {quantitat: {bsonType: "integer"}}
                    }
                    
                },
                domicili: {
                    bsonType: "object",
                    required: ["repartidor"],
                    properties: {
                        data_hora: {bsonType: "timestamp"}
                    }
                }
            }
        }
    }
})

/* Inserir valors */

db.client.insertMany([{
    _id: 1,
    nom: "Oriol",
    cognoms: "Sastre Rienitz",
    adreca: {
        carrer: "Provença",
        numero: 1,
        codi_postal: "08140",
        localitat: "Barcelona",
        provincia: "Barcelona"
    },
    telefon: "934906614"
},{
    _id: 2,
    nom: "Carles",
    cognoms: "Ricando Molina",
    adreca: {
        carrer: "Provença",
        numero: 2,
        pis: "3er",
        porta: "2na",
        codi_postal: "08140",
        localitat: "Barcelona",
        provincia: "Barcelona"
    },
    telefon: "934906615" 
}]);

db.botiga.insertOne({
    _id: 1,
    adreca: {
        carrer: "Gran Via de les Corts Catalanes",
        numero: 1201,
        codi_postal: "08040",
        localitat: "Barcelona",
        provincia: "Barcelona"
    }
});

db.empleat.insertMany([{
    _id: 1,
    nom: "Katherine",
    cognoms: "La Boeuf",
    nif: "123456789P",
    telefon: "934906616",
    posicio: "repartidor",
    botiga: 1
},{
    _id: 2,
    nom: "Mateu",
    cognoms: "Yohashida",
    nif: "161895621P",
    telefon: "934906617",
    posicio: "cuiner",
    botiga: 1
}]);

db.categoria.insertMany([{
    _id: 1,
    nom: "Clàssics"
},{
    _id: 2,
    nom: "New Age"
}]);

db.producte.insertMany([{
    _id: 1,
    tipus: "Pizza",
    categoria: 1,
    nom: "Quatre Estacions",
    descripcio: "La Pizza per excel·lència que va inspirar Vivaldi. Amb la recepta toscana de tota la vida, amb la millor massa i en forn de fusta d'olivera.",
    imatge: "/prodcuts/img/pizza01.jpg",
    preu: 7.99
},{
    _id: 2,
    tipus: "Pizza",
    categoria: 1,
    nom: "Quatre Formatges",
    descripcio: "Pels més gourmets de la casa. Feta amb mozzarella, gouda, feta, rocafort, emmental i babibel, la pizza 4 formatges és la favorita dels italians.",
    imatge: "/prodcuts/img/pizza02.jpg",
    preu: 7.99
},{
    _id: 3,
    tipus: "Pizza",
    categoria: 2,
    nom: "Hawaiiana",
    descripcio: "La Pizza més polèmica. Pinya sí? Pinya no? Sigues tu mateix el jutge! Atreveix-t'hi!",
    imatge: "/prodcuts/img/pizza03.jpg",
    preu: 7.99
},{
    _id: 4,
    tipus: "Hamburguesa",
    nom: "BeefHQ",
    descripcio: "La recepta tradicional del Far West, portada directament a casa teva, amb totes les aromes. \n Sigues el primer en descobrir-la!",
    imatge: "/prodcuts/img/burguer01.jpg",
    preu: 5.99
},{
    _id: 5,
    tipus: "Beguda",
    nom: "GasTrina llimona 0.75L",
    descripcio: "Beguda refrescant amb gust a llimona.",
    imatge: "/prodcuts/img/beguda01.jpg",
    preu: 3
},{
    _id: 6,
    tipus: "Beguda",
    nom: "GasTrina mango 0.75L",
    descripcio: "Beguda refrescant amb gust a mango.",
    imatge: "/prodcuts/img/beguda02.jpg",
    preu: 3
}]);

db.comanda.insertMany([{
    data: new Date(),
    botiga: 1,
    client: 1,
    preu: 10.99,
    contingut: [{
        producte: 3,
        quantitat: NumberInt(1)
    },{
        producte: 6,
        quantitat: NumberInt(1)
    }]
},{
    data: new Date(),
    botiga: 1,
    client: 2,
    domicili: {
        repartidor:1,
        data_hora: new Date()
    },
    preu: 16.48,
    contingut: [{
        producte: 2,
        quantitat: NumberInt(1)
    },{
        producte: 4,
        quantitat: NumberInt(1)
    },{
        producte: 5,
        quantitat: NumberInt(2)
    }]
},{
    data: new Date(),
    botiga: 1,
    client: 1,
    domicili: {
        repartidor:1,
        data_hora: new Date()
    },
    preu: 15.98,
    contingut: [{
        producte: 1,
        quantitat: NumberInt(2)
    }]
}])