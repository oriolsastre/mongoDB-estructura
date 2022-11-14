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
                titol: {bsonType: "string"},
                descripcio: {bsonType: "string"},
                publicacio: {
                    bsonType: "object",
                    required: ["usuari", "data_hora", "canal"],
                    properties: {
                        data_hora: {bsonType: "timestamp"}
                    }
                },
                estat: {enum: ["public","privat","ocult"]},
                propietats: {
                    bsonType: "object",
                    required: ["mida", "durada", "nom_fitxer"],
                    properties: {
                        mida: {bsonType: "int", description: "Mida en bytes"},
                        durada: {bsonType: "int", description: "Durada en segons"},
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
                            data_hora: {bsonType: "timestamp"}
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
                data_creacio: {bsonType: "timestamp"},
                estat: {enum: ["public","privat","ocult"]},
                video: {
                    bsonType: "array",
                    required: ["id"],
                    properties: {
                        posicio: {bsonType: "int"}
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
            required: ["usuari", "video", "text", "data_hora", "feedback"],
            properties: {
                text: {bsonType: "string"},
                data_hora: {bsonType: "timestamp"},
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
                            data_hora: {bsonType: "timestamp"}
                        },
                        uniqueItems: true
                    }
                }
            }
        }
    }
})