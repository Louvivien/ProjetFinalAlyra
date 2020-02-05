import React from 'react';

class Tuto6 extends React.Component {
  

  render() {
    return (
        <div class="mt-5">
            <h6 class="text-center mt-1 mb-3">Vous souhaitez retirer vos deniers:</h6>
            <div class="row justify-content-center">
              <ul>
                <li>En étant connecté au réseau Fast Coin, envoyer le montant souhaité vers l'adresse: 0x8Cd4ec16D09600D2496629e66aC8F4D3BFd295A4</li>
                <li>Depuis votre espace, générez votre message secret</li>
                <li>Connectez-vous au réseau Ropsten et demandez un retrait en y indiquant le montant correspondant ainsi que le message secret</li>
              </ul>
            </div>
           <p class="text-center mt-2">Votre retrait s'est réalisé avec succès!</p>
            <div class="row justify-content-center mt-5 mb-1">
                <button class="btn btn-outline-danger mr-3" onClick={() => this.props.Tuto5()}>&lt; Précédent</button>
            </div>
        </div>            
    
    )
  }
}

export default Tuto6;
