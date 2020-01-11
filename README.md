<h1>Projet de fin d'étude Alyra</h1>

<h2>Fast Coin Network</h2>

Side Chain Ethereum

<h4>Présentation

Le réseau fast Coin est une Side Chain Ethereum basée sur un conscensus proof of authority clique de 3 secondes permettant 
la rapidité et la fluidité des opéraions.

L'objectif est de permettre aux utilisteurs d'échanger rapidement en toute sécurité, sans intermédiaire, de manière la plus instantanée possible, et à coût minime.

Ce projet vise également à répondre au problème de scalabilité du réseau principal.


<h4>Fonctionnement

Deux smart contracts ont été créés, un premier déployé sur le réseau principal (ici Rop Sten), 
et un second sur le réseau Fast Coin.

L'interaction entre ces deux smart contracts et donc entre les deux réseaux, se fait via la génération de messages
cryptographiques.

En effet, pour pouvoir utiliser le réseau Fast Coin, l'utilisateur doit pouvoir créditer son compte en Ether.
Pour cela il va devoir déposer la somme correspondante sur le réseau principal. Puis, un message, composé du hash
de plusieurs paramètres va être généré.
Ce message est à spécifié au niveau du deuxième smart contract déployé sur le réseau Fast Coin.
Le message est vérifié, et les fonds déposés sur le réseau principal, sont transférés depuis le smart contract
vers le compte de l'utilisateur sur le réseau secondaire.

A l'inverse, si l'utilisateur souhaite retirer ses Ether du réseau secondaire vers le réseau principal,
il réalise la même opération dans le sens opposé.
Un dépôt est effectué sur le smart contract du réseau secondaire, un message est généré.
Ce message doit être communiqué au smart contract du réseau principal, qui le vérifie,
et transfert les fonds le cas échéant.


<h4>interface utilisateur

URL: https://hany-s.github.io/ProjetFinalAlyra/

La DAPP a été réalisée sous React et utilise la librairie web3, et Metamask pour se connecter au réseau.

Vous pouvez consulter l'aide dans la rubrique "comment utiliser Fast Coin Network".


<h4>Déployer le réseau Fast Coin

Pour pouvoir réaliser vos tests, et déployer la side Chain, une machine virtuelle a été créée
pour vous permettre de vous y connecter et de lancer le réseau.

Merci de suivre les étapes suivantes:

             1- Se connecter à la machine virtuelle:

    => Télécharger la clé SSH fournie

    => Ouvrez un terminal, que vous soyez sur windows ou autre système d'exploitation vérifier que la commande ssh existe.
            
    => Lancer la commande: ssh -i [chemin complet vers le fichier ssh] alyra@104.197.226.48
    exemple: ssh -i /c/Users/admin/.ssh/alyra-key alyra@104.197.226.48

    => Une passphrase vous serez demandée, entrer la valeur "alyra"

    => Vous devriez être connectée à la machine virtuelle linux sous le user alyra

            2- Lancer le réseau

    => lancer le premier noeud depuis la commande:
                 $ sudo /home/hs_salah/reseau3/scriptNoeud3.sh

    => Vous devriez voir les blocks défilés

    => Lancer le second noeud:
            ouvrez un nouveau terminal et reconnectez vous à la machine virtuelle (étape 1)

    => Une fois connectée, lancer la commande:
            sudo /home/hs_salah/reseau4/scriptNoeud4.sh

    => Patienter quelques secondes, vous devriez voir le second noeud se synchroniser

            3- Connexion au réseau

    => Pour vous connecter au réseau depuis une wallet: http://104.197.226.48:80


    N.B.: Vous retrouverez ces indications dans la rubrique "comment utiliser Fast Coin Network"
    de l'interface utilisateur.


