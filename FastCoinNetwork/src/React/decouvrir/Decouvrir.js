import React from 'react'


class Decouvrir extends React.Component {

  render() {
    return (

        <div class="text-light mt-4">
            <ul>
                <li><h3 class="font-italic"><ins>Le réseau</ins></h3></li>
                <p>Notre réseau se base sur la technologie Blockchain Ethereum, et a été créé depuis le client Geth. </p>
                <p>Il se base sur un principe de conscensus proof of authority, avec une durée de validation de blocks de 3 secondes, permettant la validation rapide des transactions.</p>
                <p>Il cherche à répondre au problème de scalabilité du réseau public Ethereum, et à améliorer la fluidité des transactions.</p>
                <li><h3 class="font-italic"><ins>Intéraction avec le réseau principal</ins></h3></li>
                <p>Notre réseau est une side chain qui communique avec le réseau principal grâce à un système de message cryptographique.<br/>
                Pour permettre cette interaction, deux smart contracts ont été développés. Un premier deployé sur le réseau principal, <br/>
                un second sur notre réseau Fast Coin. </p>
                <p>Les deux contrats présentent les mêmes caractéristiques: une fonction de dépôt et de retrait, la possibilité de générer un message</p>
            </ul>
        </div>

    )
  }
}

export default Decouvrir;
