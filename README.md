<h1>Projet de fin d'étude Alyra</h1>

<h2>Fast Coin Network</h2>

Side Chain Ethereum

<h4>Présentation</h4>

Notre réseau se base sur la technologie Blockchain Ethereum, et a été créé depuis le client Geth. 
Il se base sur un principe de conscensus proof of authority, avec une durée de validation de blocks de 3 secondes, permettant la validation rapide des transactions.
Il cherche à répondre au problème de scalabilité du réseau public Ethereum, et à améliorer la fluidité des transactions.
L'objectif est de permettre aux utilisateurs de s'échanger de la valeur quasi-instantanément, en limitant les frais et les intermédiaires.


<h4>Fonctionnement</h4>

Un smart contracts a été développé, déployé sur le réseau principal et privé. 
                
Le transfert de valeur entre les deux réseaux, se fait via la signature de messages
cryptographiques.
En effet, lors d'un dépôt, c'est à dire l'envoie d'Ether vers un smart contract, l'utilisateur va pouvoir générer un message.
Ce message est le hash de la concaténation de plusieurs paramètres, et doit être validé et signé par un validateur.
Pour réaliser le transfert, la signature est vérifiée: le signataire doit être bien identifié comme validateur.

Un message ou une signature ne peut être utilisée qu'une seule fois.

Enfin, sur le réseau privé, l'utilisateur peut librement envoyer ou recevoir des valeurs.

<h4>Partie test</h4>

Les tests ont été réalisés grâce à l'outil truffle.

<h4>interface utilisateur</h4>

URL: https://hany-s.github.io/ProjetFinalAlyra/

La DApp a été réalisée sous React et utilise la librairie web3, et Metamask pour se connecter au réseau.

Vous pouvez consulter l'aide dans la rubrique "Guide".


