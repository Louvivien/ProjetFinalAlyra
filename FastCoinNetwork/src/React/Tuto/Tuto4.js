import React from 'react';

class Tuto4 extends React.Component {
  

  render() {
    return (
        <div class="defil text-center mt-5">
            <h6 class="mt-1 mb-3">Vous êtes prêt à vous connecter au réseau!</h6>
            <p>Paramètrez les informations suivantes via l'interface Metamask:</p>
            <li>Nom du réseau: Fast Coin</li>
            <li>URL: http://104.197.226.48:80</li>
            <p>Félicitation! Vous pouvez maintenant commencer à utiliser le network Fast Coin pour envoyer ou recevoir de l'ether.</p>
            <div class="row justify-content-center mt-5 mb-1">
                <button class="btn btn-outline-danger mr-3" onClick={() => this.props.Tuto3()}>&lt; Précédent</button>
                <button class="btn btn-outline-success" onClick={() => this.props.Tuto5()}>Suivant ></button>

                
            </div>
            

        </div>
            
                
    
    )
  }
}

export default Tuto4;
