<h1>Projet de fin d'étude Alyra</h1>

<h2>Fast Coin Network</h2>

Side Chain Ethereum

<h4>Présentation</h4>

Le réseau fast Coin est une Side Chain Ethereum basée sur un conscensus proof of authority clique de 3 secondes permettant 
la rapidité et la fluidité des opéraions.

L'objectif est de permettre aux utilisateurs d'échanger de la valeur rapidement en toute sécurité, sans intermédiaire, de manière la plus instantanée possible, et à coût minime.

Ce projet vise également à répondre au problème de scalabilité du réseau principal.


<h4>Fonctionnement</h4>

Deux smart contracts ont été créés, un premier déployé sur le réseau principal (ici Rop Sten), 
et un second sur le réseau Fast Coin.

Le but est de pouvoir intérargir entre les deux réseaux principal et secondaire, et ainsi transférer les valeurs détenues 
d'un réseau vers l'autre. Dans ce sens on suit le principe: "Les dépôts font les retraits."

La communication entre ces deux smart contracts et donc entre les deux réseaux, se fait via la génération de messages
cryptographiques.

En effet, lors d'un dépôt, c'est à dire l'envoie d'Ether vers un smart contract, l'utilisateur va pouvoir générer un message.
Ce message est le hash de la concaténation de plusieurs paramètres:
l'adresse publique de l'utilisateur, le montant déposé, un nonce (qui correspond au nombre de dépôt effectué par l'utilisateur), 
l'adresse publique du contrat, ainsi qu'un message secret créé lors du déploiement du contrat.

C'est ce message qui va permettre la communication entre les deux contrats et donc les deux réseaux. 
En effet, pour retirer ce même montant au niveau de l'autre réseau, c'est à dire demander au smart contrat d'envoyer
à l'utilisateur cette somme d'Ether sur son compte, une fonction retrait a été créée.

Pour lancer cette fonction, l'utilisateur va devoir indiquer le message généré précedemment ainsi que le montant correspondant.
Une vérification va donc être enclenchée: si le hash de la concaténation des paramètres ci dessous est égal au message renseigné
alors le paiement est réalisé. Paramètres:
adresse publique de l'utilisateur, montant spécifié, le nonce + 1 (qui correspond au nombre de retrait déjà effectué),
l'adresse publique du contrat mère, et le message secret qui est le même pour les deux contrats.

A noter que pour chaque dépôt ou retrait, le nonce est incrémenter automatiquement. Ce qui ne permet pas à l'utilisateur 
d'utiliser plusieurs fois le même message.

<h4>Mise en place du réseau Fast Coin</h4>

Le réseau Fast Coin a été configuré depuis le client geth.

- L'adresse coinbase a été créée depuis la commande geth account new
- Un genesis block a été défini grâce à l'outil Puppeth de geth
- Le fichier généré est placé dans un dossier dédié, dans lequel on initie geth
- La clé privée correspondant à l'adresse coinbase est importée
- Exemple de script permettant le lancement du réseau:
geth --identity "noeud3" --datadir "/home/hs_salah/reseau3" --syncmode 'full' --networkid "230" --port "30305" --rpc --rpcaddr '10.128.0.3' --rpcport "8548" --rpcapi 'personal,db,eth,net,web3,txpool,miner,clique,admin'  --nodiscover --gasprice '0' --ipcdisable --allow-insecure-unlock --unlock '0xcce00e06a27c04c2456177f85b0d25e565cf6d93' --password /home/hs_salah/reseau3/pwd.txt

- Les différents noeuds du réseau sont synchronisés entre eux via un fichier static-nodes.json reprenant 
l'adresse enode de tous les noeuds.

<h4>Partie test</h4>

Les tests ont été réalisés grâce à l'outil truffle.

=> Prérequis: installer node et truffle

- Dans un dossier dédié, lancer un git clone du dossier test:
https://github.com/hany-s/ProjetFinalAlyra/tree/master/testSmartContract

- Installer les bibliothèques chai et @openzeppelin/test-helpers:
npm install chai, npm install @openzeppelin/test-helpers

- lancer la commande truffle develop:
Le réseau s'ouvre en local

- Lancer la commande truffle test ./testSmartContract1.js


<h4>interface utilisateur</h4>

URL: https://hany-s.github.io/ProjetFinalAlyra/

La DAPP a été réalisée sous React et utilise la librairie web3, et Metamask pour se connecter au réseau.

Vous pouvez consulter l'aide dans la rubrique "comment utiliser Fast Coin Network".


<h4>Déploiement du réseau Fast Coin</h4>

Pour pouvoir réaliser vos tests, et déployer la side Chain, une machine virtuelle a été créée
afin de vous y connecter et de lancer le réseau.

Merci de suivre les étapes suivantes:

             1- Se connecter à la machine virtuelle:

    => Télécharger la clé SSH préalablement fournie

    => Ouvrez un terminal, que vous soyez sur windows ou autre système d'exploitation vérifier que la commande ssh existe.
            
    => Lancer la commande: ssh -i [chemin complet vers le fichier ssh] alyra@104.197.226.48
    exemple: ssh -i /c/Users/admin/.ssh/alyra-key alyra@104.197.226.48

    => Une passphrase vous sera demandée, entrer la valeur "alyra"

    => Vous devriez être connectée à la machine virtuelle linux sous le user alyra

            2- Lancer le réseau

    => lancer le premier noeud depuis la commande:
                 $ sudo /home/hs_salah/reseau3/scriptNoeud3.sh

    => Vous devriez voir les blocks défilés

    => Lancer le second noeud:
            ouvrez un nouveau terminal et reconnectez vous à la machine virtuelle (étape 1)

    => Une fois connecté, lancer la commande:
            sudo /home/hs_salah/reseau4/scriptNoeud4.sh

    => Patienter quelques secondes, vous devriez voir le second noeud se synchroniser

            3- Connexion au réseau

    => Pour vous connecter au réseau depuis une wallet: http://104.197.226.48:80


    N.B.: Vous retrouverez ces indications dans la rubrique "comment utiliser Fast Coin Network"
    de l'interface utilisateur.


