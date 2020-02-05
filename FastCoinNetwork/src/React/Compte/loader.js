import React from 'react'

class Loader extends React.Component {

  
  render() {
    return (
        <div>
            <h4 class="text-center text-white attente">En attente de connection Metamask</h4>
            <div class="spinner-border text-danger centrer">
                
            </div>
        </div>
            
        
    )
  }
}

export default Loader;
