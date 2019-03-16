## PasLeTemps.js

Parce que parfois j'ai juste envie de quelque chose qui marche avec un peu de JS et je ne veux pas perdre 2 heures à faire fonctionner le dernier framework à la mode.

![](https://media.giphy.com/media/w6xbAu4Vh94dy/giphy.gif)


### Objectifs

- Chaque module doit initialiser son comportement à l'éxécution de la fonction.
- Si un module a des dépendances, elles doivent être injectées ou récupérées depuis window (parce que jQuery peut déjà être importé par WordPress par exemple).
- Tant que possible le JS doit être du "progressive enhancement" avec une interface fonctionnelle sans le module (sauf dans le cas de slider évidemment).
- Aucune dépendance dans le package.json en dehors du dev.

### Idées 

- Peut être utiliser flow ou TypeScript pour capturer les bugs "évidents".
