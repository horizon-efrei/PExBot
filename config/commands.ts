export const pexRoles = {
  descriptions: {
    name: 'pex-roles',
    command: 'Définir les rôles particuliers pour la guilde.',
    subcommands: {
      setRole: 'Définir un rôle.',
      list: 'Afficher la liste des salons et rôles définis pour la guilde.',
      remove: 'Supprimer un salon ou rôle défini.',
      see: 'Afficher un salon ou rôle défini.',
    },
    subcommandOptions: {
      name: 'Nom du champ.',
      role: 'Rôle à utiliser.',
    },
  },
  messages: {
    successfullyDefined: 'Entrée définie avec succès !',
    successfullyUndefined: 'Entrée déréférencé avec succès !',
    chooseOne: 'Choisissez une seule option à inspecter.',
    associatedKeys: 'Les clés associées à cette valeur sont : `{keys}`.',
    noAssociatedKey: "Cette valeur-là n'a pas de clé associée.",
    associatedValue: 'La valeur associée est : {value}.',
    noAssociatedValue: "Cette clé n'a aucune valeur associée",
    listTitle: 'Liste des valeurs',
    lineWithValue: '**{name}** : {value}',
    lineWithoutValue: '**{name}** : Aucune valeur associée',
  },
} as const;

export const ping = {
  descriptions: {
    name: 'ping',
    command: "Connaître la latence de PExBot et de l'API Discord.",
  },
  messages: {
    message: "Pong ! Latence de PExBot : {botPing}ms. Latence de l'API : {apiPing}ms.",
  },
} as const;

export const statistics = {
  descriptions: {
    name: 'statistics',
    command: 'Affiche des statistiques et diverses informations sur le bot.',
  },
  messages: {
    embed: {
      title: 'Statistiques de PExBot',
      description: 'Tapez `/` (sans envoyer le message) pour afficher la liste des commandes.',
      version: '❯ Version',
      versionContent: 'v{version}',
      uptime: '❯ Temps de fonctionnement',
      memory: '❯ Mémoire',
    },
  },
} as const;
