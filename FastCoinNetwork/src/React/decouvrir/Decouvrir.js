import React from 'react'


class Decouvrir extends React.Component {

  render() {
    return (

        <div class="text-light mt-4">
            <ul>
                <li class="my-3"><h3 class="font-italic"><ins>Fast Coin Network</ins></h3></li>
                <p>Notre réseau se base sur la technologie Blockchain Ethereum, et a été créé depuis le client Geth. </p>
                <p>Il se base sur un principe de conscensus proof of authority, avec une durée de validation de blocks de 3 secondes, permettant la validation rapide des transactions.</p>
                <p>Il cherche à répondre au problème de scalabilité du réseau public Ethereum, et à améliorer la fluidité des transactions.</p>
                <p>L'objectif est de permettre aux utilisateurs de s'échanger de la valeur quasi-instantanément, à des frais minimes, et sans intermédiaires.</p>
                <li class="my-3"><h3 class="font-italic"><ins>Intéraction entre les réseaux</ins></h3></li>
                <p>Tout l'enjeu est de pouvoir transférer ses valeurs entre les réseaux principal et secondaire.</p>
                <p>
                  Deux smart contracts ont été créés, un premier déployé sur le réseau principal, 
                et un second sur le réseau Fast Coin.<br/>
                  La communication entre ces deux smart contracts et donc entre les deux réseaux, se fait via la génération de messages
                cryptographiques.
                </p>
                <p>
                En effet, lors d'un dépôt, c'est à dire l'envoie d'Ether vers un smart contract, l'utilisateur va pouvoir générer un message.<br/>
                Ce message est le hash de la concaténation de plusieurs paramètres:<br/>
                l'adresse publique de l'utilisateur, le montant déposé, un nonce (qui correspond au nombre de dépôt effectué par l'utilisateur),<br/>
                l'adresse publique du contrat, ainsi qu'un message secret créé lors du déploiement du contrat.</p>
                <p>
                C'est ce message qui va permettre la communication entre les deux contrats et donc les deux réseaux.<br/>
                En effet, pour retirer ce même montant au niveau de l'autre réseau, c'est à dire demander au smart contrat d'envoyer<br/>
                à l'utilisateur cette somme d'Ether sur son compte, une fonction retrait a été créée.
                </p>
                <p>
                Pour lancer cette fonction, l'utilisateur va devoir indiquer le message généré précedemment ainsi que le montant correspondant.<br/>
                Une vérification va donc être enclenchée: si le hash de la concaténation des paramètres ci dessous est égal au message renseigné<br/>
                alors le paiement est réalisé. Paramètres:<br/>
                adresse publique de l'utilisateur, montant spécifié, le nonce + 1 (qui correspond au nombre de retrait déjà effectué),
                l'adresse publique du contrat mère, et le message secret qui est le même pour les deux contrats.
                </p>
                <p>
                A noter que pour chaque dépôt ou retrait, le nonce est incrémenter automatiquement. Ce qui ne permet pas à l'utilisateur 
                d'utiliser plusieurs fois le même message.
                </p>
                <li class="my-3"><h3 class="font-italic"><ins>A propos</ins></h3></li>
                <p>https://github.com/hany-s/ProjetFinalAlyra</p>
                </ul>
        </div>

    )
  }
}

export default Decouvrir;
