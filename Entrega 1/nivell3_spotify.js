db.dropDatabase();

db.createCollection('usuari', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "email", "contrasenya", "dades_personals", "adreca", "tipus"],
            properties: {
                nom: {bsonType: "string"},
                email: {bsonType: "string"},
                contrasenya: {bsonType: "string"},
                dades_personals: {
                    bsonType: "object",
                    properties: {
                        sexe: {bsonType: "string"},
                        data_naixement: {bsonType: "date"}
                    }
                }, adreca: {
                    bsonType: "object",
                    properties: {
                        codi_postal: {bsonType: "string"},
                        pais: {bsonType: "string"}
                    }
                }, tipus: {enum: ["free", "premium"]},
                subscripcio: {
                    bsonType: "array", uniqueItems: true, items: {
                        bsonType: "object",
                        required: ["data_inici", "pagament"],
                        properties: {
                            data_inici: {bsonType: "date"},
                            pagament: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["_id","data_renovacio", "preu"],
                                    properties: {
                                        _id: {bsonType: "number"},
                                        data_renovacio: {bsonType: "date"},
                                        preu: {bsonType: "number"},
                                        paypal: {bsonType: "string"},
                                        targeta: {
                                            bsonType: "object",
                                            required: ["num_targeta", "data_caducitat", "codi_seguretat"],
                                            properties: {
                                                num_targeta: {bsonType: "string"},
                                                data_caducitat: {bsonType: "date", description: "Només ens interessa el mes i l'any, segurament en el format MM/AA que ja el podem adaptar nosaltres. Però ens va bé tenir-ho en format date per saber quan caduca més fàcilment, suposo."},
                                                codi_seguretat: {bsonType: "string"}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, playlist: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["_id","nom", "data_creacio", "num_cancons", "cancons"],
                        properties: {
                            _id: {bsonType: "number"},
                            nom: {bsonType: "string"},
                            data_creacio: {bsonType: "date"},
                            num_cancons: {bsonType: "int"},
                            data_eliminacio: {bsonType: "date", description: "Si aquest valor és null, aleshores la llista està activa. Si té un valor, és que ha sigut eliminada. Només es conserva, per tant, l'últim cop que ha estat eliminada, no pas un historial de totes les eliminacions."},
                            cancons: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["canco", "usuari", "data_afegit"],
                                    properties: {
                                        canco: {bsonType: "number"},
                                        usuari: {bsonType: "number"},
                                        data_afegit: {bsonType: "date"},
                                        posicio: {bsonType: "number"}
                                    }
                                }
                            }
                        }
                    }
                    
                }, favorit: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["tipus", "ID"],
                        properties: {
                            tipus: {bsonType: "string"},
                            ID: {bsonType: "number"}
                        }
                    }
                }
            }
        }
    }
});

db.createCollection('artista', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "imatge"],
            properties: {
                nom: {bsonType: "string"},
                imatge: {bsonType: "string"},
                album: {
                    bsonType: "array",
                    required: ["_id", "titol", "any_publicacio", "portada", "canco"],
                    properties: {
                        _id: {bsonType: "number"},
                        titol: {bsonType: "string"},
                        any_publicacio: {bsonType: "date", description: "Per si també interessés el mes o una data més específica."},
                        portada: {bsonType: "string"},
                        canco: {
                            bsonType: "array",
                            items: {
                                bsonType: "object",
                                required: ["_id","titol", "durada", "reproduccions"],
                                properties: {
                                    _id: {bsonType: "number"},
                                    titol: {bsonType: "string"},
                                    durada: {bsonType: "number", description: "Durada en segons"},
                                    reproduccions: {bsonType: "number"}
                                }
                            }
                        }
                    }
                },
                similar: {
                    bsonType: "array",
                    items: {
                        bsonType: "number"
                    }
                }
            }
        }
    }
});

/* Inserir dades de prova */

db.usuari.insertMany([{
    nom: "oriol.sastre",
    email: "oriol@terra.es",
    contrasenya: "BatteryHorseStaple",
    dades_personals: {
        sexe: "H",
        data_naixement: new Date("1993-05-19T14:00:00")
    }, adreca: {
        codi_postal: "08196",
        pais: "Catalunya"
    }, tipus: "premium",
    subscripcio: [{
        data_inici: new Date("2022-07-01"),
        pagament: [{
            _id: 1, data_renovacio: new Date("2022-07-01"), preu: 7.99, targeta: {
                num_targeta: "14887596325689",
                data_caducitat: new Date("2026-11-01"),
                codi_seguretat: "A tu te'l diré, home. Demana-me'l de nou quan el necessiti i ja el poso, però no vull que el guardis"
            }
        },{
            _id: 2, data_renovacio: new Date("2022-08-01"), preu: 7.99, paypal: "oriol.sastre19"
        }]
    }], favorit: [{tipus: "Artista", ID:1}, {tipus: "Artista", ID:2}, {tipus: "Album", ID:1},{tipus: "Canco", ID:7}]
},{
    nom: "OtElBruixot",
    email: "merli@magicmail.mg",
    contrasenya: "HoppityhoppityHop69",
    dades_personals: {
        sexe: "OT",
        data_naixement: new Date("1954-06-28")
    }, adreca: {
        codi_postal: "08014",
        pais: "Catalunya"
    }, tipus: "free",
    favorit: [{tipus: "Artista", ID:1}, {tipus: "Album", ID:2},{tipus: "Canco", ID:6}],
    playlist: [{
        _id: 1,
        nom: "Rondalles de Xesco Boix i altres",
        data_creacio: new Date("2022-09-25"),
        num_cancons: NumberInt(5),
        cancons: [{canco: 1, usuari: 1, data_afegit: new Date()},
                  {canco: 2, usuari: 2, data_afegit: new Date()},
                  {canco: 4, usuari: 2, data_afegit: new Date()},
                  {canco: 6, usuari: 2, data_afegit: new Date()},
                  {canco: 7, usuari: 1, data_afegit: new Date()},
                  {canco: 9, usuari: 2, data_afegit: new Date()}]
    }]
}]);

db.artista.insertMany([{
    _id: 1,
    nom: "Xesco Boix",
    imatge: "/img/artist/xboix_artist.png",
    album: [{
        _id: 1, titol: "La flor romanial", any_publicacio: new Date("1980-09-01"), portada: "/img/album/xboix_florromanial.png", canco: [
            {_id: 1, titol: "Flor Romanial", durada: 129, reproduccions: 8},
            {_id: 2, titol: "Pica ben fort", durada: 189, reproduccions: 9},
            {_id: 3, titol: "Flying free (feat. Billy Eillish)", durada: 175, reproduccions: 123456},
            {_id: 4, titol: "El Zoo d'en Pitus", durada: 89, reproduccions: 15}
        ]
    },{
        _id: 2, titol: "Sopa de pedres", any_publicacio: new Date("1987-05-01"), portada: "/img/album/xboix_sopadepedres.png", canco: [
            {_id: 5, titol: "Sopa de pedres", durada: 129, reproduccions: 8},
            {_id: 6, titol: "Puf, el drac màgic", durada: 189, reproduccions: 9},
            {_id: 7, titol: "Torna, torna, serrallonga", durada: 175, reproduccions: 123456},
            {_id: 8, titol: "Mori el mar govern", durada: 89, reproduccions: 15}
        ]
    }],
    similar: [2]
},{
    _id: 2,
    nom: "Esquirols",
    imatge: "/img/artist/esquirol_artist.png",
    album: [{
        _id: 1, titol: "Farem camí", any_publicacio: new Date("1987-09-01"), portada: "/img/album/esquirols_faremcami.png", canco: [
            {_id: 9, titol: "Farem camí", durada: 129, reproduccions: 8},
            {_id: 10, titol: "Collsacabra", durada: 189, reproduccions: 9},
            {_id: 11, titol: "El vals de l'obrer", durada: 175, reproduccions: 123456},
            {_id: 12, titol: "Any 2019", durada: 89, reproduccions: 15}
        ]
    },{
        _id: 2, titol: "Arrels", any_publicacio: new Date("1992-05-01"), portada: "/img/album/esquirols_arrels.png", canco: [
            {_id: 13, titol: "Arrels", durada: 129, reproduccions: 8},
            {_id: 14, titol: "Cucut, cucut", durada: 189, reproduccions: 9},
            {_id: 15, titol: "Jardí de flors", durada: 175, reproduccions: 123456},
            {_id: 16, titol: "L'any que va canviar tot", durada: 89, reproduccions: 15}
        ]
    }],
    similar: [1]
}])