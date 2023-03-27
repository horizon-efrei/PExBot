<h1 align="center">PExBot</h1>
<p align="center">
    🦉 Le bot complémentaire du discord Ef'Réussite PEx !
</p>

## Rapport de bug et suggestions

- Vous avez aperçu un bug en utilisant PExBot ?
- Vous avez une idée ou une suggestion ?
- Vous souhaitez nous faire part de quelque chose ?

Vous pouvez vous rendre dans le [menu des issues] et en créer une ; nous y jetterons un œil dès que possible !\
Pour tout autre question, vous pouvez créer une [Discussion GitHub].

## Développement et contributions

Nos Pull Request (PR) sont ouvertes à toutes contributions ! Vous pouvez regarder notre [guide de contributions] avant de commencer à travailler sur PExBot : il vous aidera à tout mettre en place et à vous assurer que votre PR puisse être merge rapidement.

## Informations

PExBot est un bot Discord développé en TypeScript (un dérivé de JavaScript avec un typage plus fort). Il utilise la librairie [discord.js] pour les appels à l'API Discord.
Il utilise également le framework [Sapphire], par-dessus discord.js. Ce framework sert notamment à gérer les évènements, les commandes et les arguments...

Vous pouvez utiliser le bot pour votre propre serveur à condition de respecter la [License] ([MIT]).

## Organisation du projet

- **`config` :** Dossier où se trouvent tous les fichiers de configuration de PExBot.
- **`dist`** *(pas sur GitHub)* **:** Dossier où se trouve le code transpilé de PExBot, après avoir lancé `npm run build` (ou `npm start`).
- **`src` :**
  - **`commands` :** Dossier où se trouvent toutes les commandes, rangées dans des sous-dossiers correspondant à leurs catégories.
  - **`interaction-handlers` :** Dossier contenant les handlers qui gère les "Interactions" reçus.
  - **`lib` :** Dossier contenant plusieurs fichiers utiles dans le code.
    - **`database` :** Différents fichiers relatifs à la base de donnée (script de migration...).
    - **`decorators` :** Dossier contenant différents decorators utilisés à travers le code.
    - **`eclasses` :** Dossier contenant des classes et utilitaires relatifs aux e-classes.
    - **`models` :** Fichiers des schemas mongoose.
    - **`resolvers` :** Fichiers des resolvers customs pour les arguments.
    - **`structures` :** Différentes classes utilisées à travers PExBot.
    - **`types` :** Fichiers contenant les typings TypeScript nécessaires pour PExBot.
    - **`utils` :** Dossier contenant différentes fonctions utilitaires.
  - **`listeners` :** Dossier où se trouvent tous les gestionnaires d'évènement, rangés par émetteurs.
  - **`tasks` :** Dossier où se trouvent toutes les tâches.
- **`typings` :** Typings TypeScript pour les librairies externes.

## Crédits

#### Développeurs

- [noftaly] (noftaly#0359)

#### Contributeurs

- [Kethash]
- [David G.]

#### License

PExBot est sous license [MIT](./LICENSE).

<!-- Link Dump -->

[menu des issues]: https://github.com/horizon-teamdev/PExBot/issues
[Discussion GitHub]: https://github.com/horizon-teamdev/PExBot/discussions
[guide de contributions]: ./CONTRIBUTING.md
[discord.js]: https://npmjs.com/package/discord.js
[Sapphire]: https://www.npmjs.com/package/@sapphire/framework
[License]: https://github.com/horizon-teamdev/PExBot/blob/master/LICENSE
[MIT]: ./LICENSE

<!-- Contributors -->
[noftaly]: https://github.com/noftaly
[Kethash]: https://github.com/Kethash
[David G.]: https://github.com/gtedavid
