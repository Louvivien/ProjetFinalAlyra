import React from 'react';

class Tuto2 extends React.Component {
  

  render() {
    return (
        <div class="defil text-center mt-5">
            <p>Pour pouvoir envoyer ou recevoir des unités vous
            aurez besoin d'un compte.<br/>
            Vous pouvez suivre le guide Metamask pour créer un compte.<br/>
            Ou, si vous en avez déjà un, Importez-le directement.<br/>
            Une fois connecté clquez sur suivant.</p>
            <div class="row justify-content-center mt-5 mb-1">
                <button class="btn btn-outline-danger mr-3" onClick={() => this.props.Tuto2()}>&lt; Précédent</button>
                <button class="btn btn-outline-success" onClick={() => this.props.Tuto4()}>Suivant ></button>

                
            </div>
            

        </div>
            
                
    
    )
  }
}

export default Tuto2;
