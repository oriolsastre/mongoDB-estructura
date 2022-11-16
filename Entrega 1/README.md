# Entrega 1

## Nivell 1 - Exercici 1 - Òptica

![Diagrama](nivell1_optica_diagrama.png)


## Nivell 1 - Exercici 2 - Pizzeria

![Diagrama](nivell1_pizzeria_diagrama.png)

En la col·lecció productes hi ha 3 documents. 1 per pizzes, 1 per hamburgueses i 1 per begudes, especificat pel valor tipus.

En el cas de les pizzes, hi ha l'array categories, on cada item és una categoria diferent, i aleshores, un array dintre amb les diverses pizzes.

Pel cas de les begudes i hamburgueses, senzillament estaran tots al primer item de l'array categories, sense haver d'especificar ni cap id ni cap nom de categoria.

És cert que potser la col·lecció client podria estar dintre de la col·lecció botiga si es tractés d'una cadena humil de pizzeries on s'espera que un client només visiti una botiga regularment. Tanmateix, en una gran cadena on el client és més probable que visiti botigues diferents, crec que no interessaria tenir la informació repartida en documents diferents sense actualitzar-se fàcilment.

## Nivell 2 - Youtube

![Diagrama](nivell2_youtube_diagrama.png)

És en realitat tot una única col·lecció, el que passa és que s'em feia massa llarga i l'he separat en dos, però és la continuació. L'array comentaris està dins d'un objecte vídeo.

En vermell hi ha l'array resposta. Això en realitat pot ser iteratiu. Cada objecte comentari, pot contenir un array amb les respostes rebudes, i a la vegada cada resposta que tindria l'estructura d'un objecte comentari (amb id, usuari, text, data_hora, feedback), a la vegada pot contenir un array amb més respostes.

La idea és que un usuari pot crear canals, en els canals hi pot publicar vídeos, i els vídeos poden contenir comentaris. A més, un usuari també pot crear playlists.

## Nivell 3 - Spotify

![Diagrama](nivell3_spotify_diagrama.png)

Les subscripcions són un array en el qual es guarda per item, totes les renovacions consecutives. És a dir, per item, hi ha una data d'inici, i a dins un array amb les renovacions pertenint. Per cada renovació, es guarda la data i el mètode de pagament. Si deixes de renovar, i passes de premium a free, quan tornis a voler ser premium, es crearà un nou item a l'array subscripció. Així també controles d'alguna manera la _fidelitat_ i si un usuari ha anat passant de premium->free->premium que algun altre.

Els favorits, tant seguir artista, com fer favorit a un album o cançó es guarda tot a l'array favortis, en el qual cada item és un objecte on s'hi especifica, el tipus (és a dir, artista, àlbum, cançó) i l'ID pertinent de l'artista, àlbum, cançó.

En quant a les llistes de reproducció. Saber si està activa o eliminada se sap per si el camp data_eliminacio existeix i té un valor, o no.

La resta de l'estructura crec que s'entén força bé per si sola.