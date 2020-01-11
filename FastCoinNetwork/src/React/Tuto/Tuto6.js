import React from 'react';

class Tuto6 extends React.Component {
  

  render() {
    return (
        <div class="defil text-center mt-5">
            <h6 class="mt-1 mb-3">Vous souhaitez retirer vos deniers:</h6>
            <li>En étant connecté au réseau Fast Coin, envoyer le montant souhaité vers l'adresse: 0x79FADb528702a9C881389fE6Df1B37f03ACa0e90</li>
            <li>Depuis votre espace, générez votre message secret</li>
            <li>Connectez-vous au réseau Ropsten et demandez un retrait en y indiquant le montant correspondant ainsi que le message secret</li>
            <p class="mt-2">Votre retrait s'est réalisé avec succès!</p>
            <div class="row justify-content-center mt-5 mb-1">
                <button class="btn btn-outline-danger mr-3" onClick={() => this.props.Tuto5()}>&lt; Précédent</button>
            </div>
            

        </div>
            
                
    
    )
  }
}

export default Tuto6;
