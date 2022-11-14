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
                subscripcio: {bsonType: "array", uniqueItems: true}
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
                data_hora: {bsonType: "date"}
            }
        }
    }
});

db.createCollection('video', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["publicacio", "titol", "descripcio", "estat", "propietats", "thumbnail", "reproduccions", "etiquetes"],
            properties: {
                titol: {bsonType: "string"},
                descripcio: {bsonType: "string"},
                publicacio: {
                    bsonType: "object",
                    required: ["usuari", "data_hora", "canal"],
                    properties: {
                        data_hora: {bsonType: "date"}
                    }
                },
                estat: {enum: ["public","privat","ocult"]},
                propietats: {
                    bsonType: "object",
                    required: ["mida", "durada", "nom_fitxer"],
                    properties: {
                        mida: {bsonType: "number", description: "Mida en bytes"},
                        durada: {bsonType: "number", description: "Durada en segons"},
                        nom_fitxer: {bsonType: "string"}
                    }
                },
                feedback: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["like", "usuari", "data_hora"],
                        properties: {
                            like: {
                                bsonType: "int",
                                minimum: -1,
                                maximum: 1,
                                description: "-1 si fa dislike, 1 si fa like."
                            },
                            data_hora: {bsonType: "date"}
                        },
                        uniqueItems: true
                    }
                },
                reproduccions: {bsonType: "int"},
                etiquetes: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["etiquetaID", "etiqueta"],
                        properties: {
                            etiqueta: {bsonType: "string"}
                        }
                    }
                }
            }
        }
    }
});

db.createCollection('playlist', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "usuari", "data_creacio", "estat", "video"],
            properties: {
                nom: {bsonType: "string"},
                data_creacio: {bsonType: "date"},
                estat: {enum: ["public","privat","ocult"]},
                video: {
                    bsonType: "array",
                    items:{
                        bsonType: "object",
                        required: ["id"],
                        properties: {
                            posicio: {bsonType: "number"}
                        }
                    }
                }
            }
        }
    }
});

db.createCollection('comentari', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["usuari", "video", "text", "data_hora"],
            properties: {
                text: {bsonType: "string"},
                data_hora: {bsonType: "date"},
                feedback: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["like", "usuari", "data_hora"],
                        properties: {
                            like: {
                                bsonType: "int",
                                minimum: -1,
                                maximum: 1,
                                description: "-1 si fa dislike, 1 si fa like."
                            },
                            data_hora: {bsonType: "date"}
                        },
                        uniqueItems: true
                    }
                }
            }
        }
    }
});

//inserir valors
db.usuari.insertMany([{
    _id: 1,
    nom: "oriol.sastre",
    email: "oriol@itacademy.cat",
    contrasenya: "SDF456ASDF456SADF2A3SDF",
    data_naixement: new Date("1993-07-28"),
    sexe: "H",
    pais: "Catalunya"
},{
    _id: 2,
    nom: "jschroeder",
    email: "johannesDS@terra.de",
    contrasenya: "1234",
    data_naixement: new Date("1992-05-25"),
    sexe: "D",
    pais: "Deutschland",
    subscripcio: [1]
}]);

db.canal.insertOne({
    _id: 1,
    nom: "VLogs, crazy adventure on the subway.",
    descripcio: "Sabies que hi ha Kappas a Barcelona. Aventurat amb mi al laberint del metro de Barcelona a trobar-los",
    data_hora: new Date("2022-07-01 07:33:23"),
    usuari: 1
});

db.video.insertMany([{
    _id: 1,
    titol: "L5-L3, de Provença a Diagonal",
    descripcio: "Què s'amaga sota la diagonal? És veritat que s'han vist Kappas passejant per la Rambla Catalunya de nit? O s'amaguen de dia?",
    publicacio: {
        usuari: 1,
        data_hora: new Date(),
        canal: 1
    },
    estat: "public", propietats: {
        mida: 75898,
        durada: 1812,
        nom_fitxer: "f7sd89f7s89f77f9dsf9.mp4"
    },
    feedback: [{like: NumberInt(1), usuari: 2, data_hora: new Date()}],
    thumbnail: "f7sd89f7s89f77f9dsf9.png",
    reproduccions: NumberInt(23),
    etiquetes: [{etiquetaID: 1, etiqueta: "Viral"},{etiquetaID: 2, etiqueta: "Kappa"}]
},{
    _id: 2,
    titol: "L2, Paseig de Gràcia. La llum al final del túnel",
    descripcio: "Diuen que al final de tot del transbordament arribes a la L2. Però és aquest el camí més curt? Han muntat els Kappes una drecera però on arribar-hi abans lluny de les mirades de la gent? Diuen que darrera d'uns dels quioscs hi ha una entrada secreta... Vine amb mi a descobrir-ho.",
    publicacio: {
        usuari: 1,
        data_hora: new Date(),
        canal: 1
    },
    estat: "public", propietats: {
        mida: 789561,
        durada: 1529,
        nom_fitxer: "f7sd89f7s89f55f9dsf9.mp4"
    },
    feedback: [{like: NumberInt(-1), usuari: 2, data_hora: new Date()}],
    thumbnail: "f7sd89f7s89f55f9dsf9.png",
    reproduccions: NumberInt(31),
    etiquetes: [{etiquetaID: 1, etiqueta: "Viral"},{etiquetaID: 2, etiqueta: "Kappa"}]
}])

db.playlist.insertOne({
    nom: "Watch later",
    usuari: 2,
    data_creacio: new Date(),
    estat: "privat",
    video: [{id:1,posicio:1},{id:2, posicio: 2}]
});

db.comentari.insertMany([{
    usuari: 2,
    video: 1,
    text: "Jo també els he vist! Un dia que havia d'anar a Horta.",
    data_hora: new Date(),
    feedback: [{like: NumberInt(1), usuari: 1, data_hora: new Date()}]
},{
    _id: 2,
    usuari: 2,
    video: 2,
    text: "Quin flipat! Fake news. Jo tenia una tieta que treballava a aquell kiosk i mai ha vist cap Kappa. Tot i que ara que ho recordo la meva tieta tenia una mica cara de granota i era una mica calva... però això no vol dir res!",
    data_hora: new Date(),
    feedback: [{like: NumberInt(-1), usuari: 1, data_hora: new Date()},
    {like: NumberInt(1), usuari: 2, data_hora: new Date()}]
},{
    usuari: 1,
    video: 2,
    text: "A veure com t'ho dic... la teva tieta és un dels Kappas!",
    data_hora: new Date(),
    resposta: 2
}])