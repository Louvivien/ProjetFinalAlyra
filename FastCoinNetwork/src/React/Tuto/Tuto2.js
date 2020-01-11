import React from 'react';

class Tuto2 extends React.Component {
  

  render() {
    return (
        <div class="defil mt-5">
            <h6 class="text-center mt-1">Ajouter l'extension Metamask au navigateur:</h6>
            <div class="row justify-content-center mt-3">
            <a class="btn btn-link text-primary" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noopener noreferrer">Extension Metamask</a>
            </div>
            <div class="row justify-content-center mt-4 mb-1">
                <button class="btn btn-outline-danger mr-3" onClick={() => this.props.Tuto1()}>&lt; Précédent</button>
                <button class="btn btn-outline-success" onClick={() => this.props.Tuto3()}>Suivant ></button>

                
            </div>
            

        </div>
            
                
    
    )
  }
}

export default Tuto2;
