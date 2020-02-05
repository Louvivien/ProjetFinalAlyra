import React from 'react'


class Decouvrir extends React.Component {

  render() {
    return (

        <div class="text-light mt-4 apparition">
            <ul>
                <li class="my-3"><h3 class="font-italic"><ins>Fast Coin Network</ins></h3></li>
                <p>Notre réseau se base sur la technologie Blockchain Ethereum, et a été créé depuis le client Geth. </p>
                <p>Il se base sur un principe de conscensus proof of authority, avec une durée de validation de blocks de 3 secondes, permettant la validation rapide des transactions.</p>
                <p>Il cherche à répondre au problème de scalabilité du réseau public Ethereum, et à améliorer la fluidité des transactions.</p>
                <p>L'objectif est de permettre aux utilisateurs de s'échanger de la valeur quasi-instantanément, en limitant les frais et les intermédiaires.</p>
                <li class="my-3"><h3 class="font-italic"><ins>Intéraction entre les réseaux</ins></h3></li>
                <p>
                  Un smart contracts a été développé, déployé sur le réseau principal et privé. 
                <br/>
                  Le transfert de valeur entre les deux réseaux, se fait via la signature de messages
                cryptographiques.
                </p>
                <p>
                En effet, lors d'un dépôt, c'est à dire l'envoie d'Ether vers un smart contract, l'utilisateur va pouvoir générer un message.<br/>
                Ce message est le hash de la concaténation de plusieurs paramètres, et doit être validé et signé par un validateur.<br/>
                </p>
                <p>
                Pour réaliser le transfert, la signature est vérifiée: le signataire doit être bien identifié comme validateur.
                </p>
                <p>
                Un message ou une signature ne peut être utilisée qu'une seule fois.
                </p>
                <p>
                  Enfin, sur le réseau privé, l'utilisateur peut librement envoyer ou recevoir des valeurs.
                </p>
                <li class="my-3"><h3 class="font-italic"><ins>Git</ins></h3></li>
                <p>https://github.com/hany-s/ProjetFinalAlyra</p>
                </ul>
        </div>

    )
  }
}

export default Decouvrir;
