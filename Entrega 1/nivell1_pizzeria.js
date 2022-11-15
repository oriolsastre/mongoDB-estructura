db.dropDatabase();

db.createCollection('client', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["dades_personals", "dades_contacte"],
            properties: {
                dades_personals: {
                    bsonType: "object",
                    required: ["nom", "cognoms"],
                    properties: {
                        nom: {bsonType: "string"},
                        cognoms: {bsonType: "string"}
                    }
                }, dades_contacte: {
                    bsonType: "object",
                    properties: {
                        adreca: {
                            bsonType: "object",
                            required: ["carrer", "numero", "ciutat", "codi_postal", "provincia"],
                            properties: {
                                carrer: {bsonType: "string"},
                                numero: {bsonType: "string"},
                                ciutat: {bsonType: "string"},
                                codi_postal: {bsonType: "string"},
                                provincia: {bsonType: "string"}
                            }
                        }, telefon: {bsonType: "string"}
                    }
                }, comanda: {
                    bsonType: "array",
                    required: ["_id","botiga", "preu", "contingut"],
                    properties: {
                        botiga: {bsonType: "number"},
                        domicili: {
                            bsonType: "object",
                            required: ["repartidor", "data_hora"],
                            properties: {
                                data_hora: {bsonType: "date"}
                            }
                        }, preu: {bsonType: "double"},
                        contingut: {
                            bsonType: "array",
                            minItems: 1,
                            items: {
                                bsonType: "object",
                                required: ["producte", "quantitat"],
                                properties: {
                                    quantitat: {bsonType: "number"}
                                }
                            }
                        }
                    }
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
                    required: ["carrer", "numero", "codi_postal", "ciutat", "provincia"],
                    properties: {
                        carrer: {bsonType: "string"},
                        numero: {bsonType: "string"},
                        ciutat: {bsonType: "string"},
                        codi_postal: {bsonType: "string"},
                        provincia: {bsonType: "string"}
                    }
                }, empleat: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["_id", "nom", "cognoms", "nif", "posicio"],
                        properties: {
                            nom: {bsonType: "string"},
                            cognoms: {bsonType: "string"},
                            telefon: {bsonType: "string"},
                            nif: {bsonType: "string"},
                            posicio: {enum: ["repartidor","cuiner"]}
                        }
                    }
                }
            }
        }
    }
});

db.createCollection('producte', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipus","categoria"],
            properties: {
                tipus: {enum: ["hamburguesa", "pizza", "beguda"]},
                categoria: {
                    bsonType: "array",
                    required: ["productes"],
                    properties: {
                        nom: {bsonType: "string"},
                        productes: {
                            bsonType: "array",
                            items: {
                                bsonType: "object",
                                required: ["_id", "nom", "descripcio", "imatge", "preu"],
                                properties: {
                                    nom: {bsonType: "string"},
                                    descripcio: {bsonType: "string"},
                                    imatge: {bsonType: "string"},
                                    preu: {bsonType: "number"}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

/* Inserir dades de prova */

db.botiga.insertOne({
    _id: 1,
    adreca: {
        carrer: "Gran Via de les Corts Catalanes",
        numero: "1201",
        codi_postal: "08040",
        ciutat: "Barcelona",
        provincia: "Barcelona"
    }, empleat: [{
        _id: 1,
        nom: "Katherine",
        cognoms: "La Boeuf",
        nif: "123456789P",
        telefon: "934906616",
        posicio: "repartidor"
    },{
        _id: 2,
        nom: "Mateu",
        cognoms: "Yohashida",
        nif: "161895621P",
        telefon: "934906617",
        posicio: "cuiner"
    }]
});

db.producte.insertMany([{
    tipus: "hamburguesa",
    categoria: [{
        productes: [{
            _id: 4,
            nom: "BeefHQ",
            descripcio: "La recepta tradicional del Far West, portada directament a casa teva, amb totes les aromes. \n Sigues el primer en descobrir-la!",
            imatge: "/prodcuts/img/burguer01.jpg",
            preu: 5.99
        }]
    }]
},{
    tipus: "beguda",
    categoria: [{
        productes: [{
            _id: 5,
            nom: "GasTrina llimona 0.75L",
            descripcio: "Beguda refrescant amb gust a llimona.",
            imatge: "/prodcuts/img/beguda01.jpg",
            preu: 3
        },{
            _id: 6,
            nom: "GasTrina mango 0.75L",
            descripcio: "Beguda refrescant amb gust a mango.",
            imatge: "/prodcuts/img/beguda02.jpg",
            preu: 3
        }]
    }]
},{
    tipus: "pizza",
    categoria: [{
        _id: 1,
        nom: "Clàssics",
        productes: [{
            _id: 1,
            nom: "Quatre Estacions",
            descripcio: "La Pizza per excel·lència que va inspirar Vivaldi. Amb la recepta toscana de tota la vida, amb la millor massa i en forn de fusta d'olivera.",
            imatge: "/prodcuts/img/pizza01.jpg",
            preu: 7.99
        },{
            _id: 2,
            nom: "Quatre Formatges",
            descripcio: "Pels més gourmets de la casa. Feta amb mozzarella, gouda, feta, rocafort, emmental i babibel, la pizza 4 formatges és la favorita dels italians.",
            imatge: "/prodcuts/img/pizza02.jpg",
            preu: 7.99
        }]
    },{
        _id: 2,
        nom: "New Age",
        productes: [{
            _id: 3,
            nom: "Hawaiiana",
            descripcio: "La Pizza més polèmica. Pinya sí? Pinya no? Sigues tu mateix el jutge! Atreveix-t'hi!",
            imatge: "/prodcuts/img/pizza03.jpg",
            preu: 7.99
        }]
    }]
}])