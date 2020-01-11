import React from 'react';

class Tuto1 extends React.Component {
  

  render() {
    return (
        <div class="defil mt-5">
            <h6 class="text-center mt-1">télecharger Google Chrome:</h6>
            <div class="row mt-3 justify-content-center">
            <a class="btn btn-link text-primary" href="https://www.google.com/intl/fr_fr/chrome/" target="_blank" rel="noopener noreferrer">Google Chrome</a>
            </div>
            <div class="row mt-4 justify-content-center">
                <button class="btn btn-outline-success" onClick={() => this.props.Tuto2()}>Suivant ></button>
            </div>
            

        </div>
            
                
    
    )
  }
}

export default Tuto1;
