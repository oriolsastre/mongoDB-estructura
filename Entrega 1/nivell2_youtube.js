db.dropDatabase();

db.createCollection('usuari', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "email", "contrasenya"],
            properties: {
                nom: {bsonType: "string"},
                contrasenya: {bsonType: "string"},
                email: {bsonType: "string"},
                dades_personals: {
                    bsonType: "object",
                    properties: {
                        data_naixement: {bsonType: "date"},
                        sexe: {bsonType: "string"},
                        codi_postal: {bsonType: "string"},
                        pais: {bsonType: "string"}
                    }
                },
                canals:{
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["_id", "nom", "descripcio", "data_creacio"],
                        properties: {
                            nom: {bsonType: "string"},
                            descripcio: {bsonType: "string"},
                            data_creacio: {bsonType: "date"},
                            videos: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["_id", "titol", "descripcio", "data_publicacio", "estat", "propietats", "reproduccions"],
                                    properties: {
                                        titol: {bsonType: "string"},
                                        descripcio: {bsonType: "string"},
                                        data_publicacio: {bsonType: "date"},
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
                                        },
                                        comentaris: {
                                            bsonType: "array",
                                            items: {
                                                bsonType: "object",
                                                required: ["_id", "usuari", "text", "data_hora"],
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
                                                    },
                                                    resposta: {
                                                        bsonType: "array",
                                                        items: {bsonType: "object"}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                subscripcio: {bsonType: "array", uniqueItems: true},
                playlist: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["_id", "nom", "descripcio", "data_creacio", "estat"],
                        properties: {
                            nom: {bsonType: "string"},
                            descripcio: {bsonType: "string"},
                            data_creacio: {bsonType: "date"},
                            estat: {enum: ["public","privat","ocult"]},
                            videos: {
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
            }
        }
    }
});

db.usuari.insertMany([{
    _id: 1,
    nom: "oriol.sastre",
    email: "oriol@itacademy.cat",
    contrasenya: "SDF456ASDF456SADF2A3SDF",
    dades_personals: {
        data_naixement: new Date("1993-07-28"),
        sexe: "H",
        pais: "Catalunya"
    },
    canals: [{
        _id: 1,
        nom: "VLogs, crazy adventure on the subway.",
        descripcio: "Sabies que hi ha Kappas a Barcelona. Aventurat amb mi al laberint del metro de Barcelona a trobar-los",
        data_creacio: new Date("2022-07-01 07:33:23"),
        videos: [{
            _id: 1,
            titol: "L5-L3, de Provença a Diagonal",
            descripcio: "Què s'amaga sota la diagonal? És veritat que s'han vist Kappas passejant per la Rambla Catalunya de nit? O s'amaguen de dia?",
            data_publicacio: new Date(),
            estat: "public", propietats: {
                mida: 75898,
                durada: 1812,
                nom_fitxer: "f7sd89f7s89f77f9dsf9.mp4"
            },
            feedback: [{like: NumberInt(1), usuari: 2, data_hora: new Date()}],
            thumbnail: "f7sd89f7s89f77f9dsf9.png",
            reproduccions: NumberInt(23),
            etiquetes: [{etiquetaID: 1, etiqueta: "Viral"},{etiquetaID: 2, etiqueta: "Kappa"}],
            comentaris: [{
                _id: 1, usuari: 2, text: "Jo també els he vist! Un dia que havia d'anar a Horta.",
                data_hora: new Date(),
                feedback: [{like: NumberInt(1), usuari: 1, data_hora: new Date()}]
            }]
        },{
            _id: 2,
            titol: "L2, Paseig de Gràcia. La llum al final del túnel",
            descripcio: "Diuen que al final de tot del transbordament arribes a la L2. Però és aquest el camí més curt? Han muntat els Kappes una drecera però on arribar-hi abans lluny de les mirades de la gent? Diuen que darrera d'uns dels quioscs hi ha una entrada secreta... Vine amb mi a descobrir-ho.",
            data_publicacio: new Date(),
            estat: "public", propietats: {
                mida: 789561,
                durada: 1529,
                nom_fitxer: "f7sd89f7s89f55f9dsf9.mp4"
            },
            feedback: [{like: NumberInt(-1), usuari: 2, data_hora: new Date()}],
            thumbnail: "f7sd89f7s89f55f9dsf9.png",
            reproduccions: NumberInt(31),
            etiquetes: [{etiquetaID: 1, etiqueta: "Viral"},{etiquetaID: 2, etiqueta: "Kappa"}],
            comentaris: [{
                _id: 2, usuari: 2, text: "Quin flipat! Fake news. Jo tenia una tieta que treballava a aquell kiosk i mai ha vist cap Kappa. Tot i que ara que ho recordo la meva tieta tenia una mica cara de granota i era una mica calva... però això no vol dir res!",
                data_hora: new Date(),
                feedback: [{like: NumberInt(-1), usuari: 1, data_hora: new Date()},
                {like: NumberInt(1), usuari: 2, data_hora: new Date()}],
                resposta: [{
                    _id: 3, usuari: 1, text: "A veure com t'ho dic... la teva tieta és un dels Kappas!",
                    data_hora: new Date()
                }]
            }]
        }]
    }]
},{
    _id: 2,
    nom: "jschroeder",
    email: "johannesDS@terra.de",
    contrasenya: "1234",
    dades_personals: {
        data_naixement: new Date("1992-05-25"),
        sexe: "D",
        pais: "Deutschland"
    },
    subscripcio: [1],
    playlist: [{
        _id: 1, nom: "Watch later", descripcio: "Vídeos per a veure quan tingui temps", data_creacio: new Date(),
        estat: "privat", videos: [{id:1,posicio:1},{id:2, posicio: 2}]
    }]
}])