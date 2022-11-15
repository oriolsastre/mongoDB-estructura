//com un delete if exists;
db.dropDatabase();

//crear les col·leccions
db.createCollection('client', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["dades_personals", "dades_contacte","data_registre"],
            properties: {
                dades_personals: {
                    bsonType: "object",
                    required: ["nom", "cognoms"],
                    properties: {
                        nom: {bsonType: "string"},
                        cognoms: {bsonType: "string"}
                    }
                },
                dades_contacte: {
                    bsonType: "object",
                    required: ["email", "telefon"],
                    properties: {
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
                        email: {bsonType: "string"},
                        telefon: {bsonType: "string"}
                    }
                },
                data_registre: {bsonType: "date"},
                ullera: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["marca", "graduacio", "color_vidre", "muntura"],
                        properties: {
                            marca: {bsonType: "string"},
                            graduacio: {
                                bsonType: "array",
                                minItems: 2,
                                maxItems: 2,
                                items: {bsonType: "double"},
                                description: "El primer element fa referència al vidre esquerra, el segon al vidre dret"
                            },
                            color_vidre: {
                                bsonType: "array",
                                minItems: 2,
                                maxItems: 2,
                                description: "El primer element fa referència al vidre esquerra, el segon al vidre dret. Null és sense color, és a dir, transparent."
                            },
                            muntura: {
                                bsonType: "object",
                                required: ["tipus"],
                                properties: {
                                    tipus: {enum: ["flotant", "pasta", "metàl·lica"]},
                                    color: {bsonType: "string"}
                                }
                            },
                            venda: {
                                bsonType: "object",
                                required: ["venedor", "data", "preu"],
                                properties: {
                                    venedor: {bsonType: "string"},
                                    data: {bsonType: "date"},
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

db.createCollection('proveidor', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "dades_contacte", "nif"],
            properties: {
                nom: {bsonType: "string"},
                dades_contacte: {
                    bsonType: "object",
                    required: ["telefon"],
                    properties: {
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
                        email: {bsonType: "string"},
                        telefon: {bsonType: "string"},
                        fax: {bsonType: "string"}
                    }
                },
                nif: {bsonType: "string"},
                marques: {
                    bsonType: "array",
                    items: {bsonType: "string"}
                }
            }
        }
    }
});

db.client.insertOne({
    _id: 1,
    dades_personals: {nom: "Oriol", cognoms: "Sastre Rienitz"},
    dades_contacte: {
        adreca: {
            carrer: "Gran Via de les Corts Catalanes",
            numero: "1 Escala A",
            pis: "1er",
            porta: "1era",
            ciutat: "Barcelona",
            codi_postal: "08040",
            pais: "Catalunya"
        }, telefon: "931010103", email: "oriol@ajuntament.cat"
    },
    data_registre: new Date(),
    ullera: [{
        marca: "Sehen & Sehnen",
        graduacio: [0.25,3.75],
        color_vidre: [null,null],
        muntura: {
            tipus: "pasta",
            color: "negre"
        },
        venda: {
            venedor: "Joan Petit",
            preu: 49.99,
            data: new Date()
        }
    },{
        marca: "RayBan",
        graduacio: [-0.25,-0.75],
        color_vidre: ["groc","groc"],
        muntura: {
            tipus: "metàl·lica",
            color: "verd"
        },
        venda: {
            venedor: "Joan Petit",
            preu: 178,
            data: new Date()
        }
    }]
});

db.proveidor.insertOne({
    nom: "Brillen S.A.",
    dades_contacte: {
        adreca: {
            carrer: "Hausestrasse",
            numero: "101B",
            ciutat: "Tuebingen",
            codi_postal: "10158",
            pais: "Alemanya"
        },
        telefon: "004955877963",
        fax: "004955877964"
    },
    nif: "X123456789DE",
    marques: ["RayBan", "Sehen & Sehnen"]
});