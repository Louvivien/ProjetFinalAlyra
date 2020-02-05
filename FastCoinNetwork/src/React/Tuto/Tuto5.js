import React from 'react';

class Tuto5 extends React.Component {
  

  render() {
    return (
        <div class="mt-5">
            <h6 class="text-center mt-1 mb-3">Comment créditer votre compte pour envoyer de l'argent:</h6>
            <div class="row justify-content-center">
              <ul>
                <li>Dans la plateforme Metamask, connectez-vous au réseau Ropsten</li>
                <li>Faites un dépôt du montant de votre choix vers l'adresse: 0xFe0F05c78479db8639E23cB34b2Bebb8BFfdcE70</li>
                <li>Une fois le dépôt validé, rendez-vous dans votre espace pour générer votre message secret</li>
                <li>Reconnectez-vous au réseau Fast Coin (cf menu Réseau)</li>
                <li>Demandez le retrait de votre dépôt en y indiquant le montant déposé et le message secret</li>
              </ul>
            </div>
            <p class="text-center mt-2">Votre compte est crédité!</p>
            <div class="row justify-content-center mt-5 mb-1">
                <button class="btn btn-outline-danger mr-3" onClick={() => this.props.Tuto4()}>&lt; Précédent</button>
                <button class="btn btn-outline-success" onClick={() => this.props.Tuto6()}>Suivant ></button>                
            </div>
        </div>
            
                
    
    )
  }
}

export default Tuto5;
