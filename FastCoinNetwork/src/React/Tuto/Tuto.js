import React from 'react';
import Tuto1 from './Tuto1';
import Tuto2 from './Tuto2';
import Tuto3 from './Tuto3'
import Tuto4 from './Tuto4'
import Tuto5 from './Tuto5'
import Tuto6 from './Tuto6'

class Tuto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: < Tuto1 Tuto2={this.getTuto2}/>
    }
  }

  getTuto1 = () => {
    this.setState ({
      page: < Tuto1 Tuto2={this.getTuto2}/>
    })
  }

  getTuto2 = () => {
    this.setState ({
      page: <Tuto2 Tuto1={this.getTuto1} Tuto3={this.getTuto3}/>
    })
  }

  getTuto3 = () => {
    this.setState ({
      page: <Tuto3 Tuto2={this.getTuto2} Tuto4={this.getTuto4}/>
    })
  }

  getTuto4 = () => {
    this.setState ({
      page: <Tuto4 Tuto3={this.getTuto3} Tuto5={this.getTuto5}/>
    })
  }

  getTuto5 = () => {
    this.setState ({
      page: <Tuto5 Tuto4={this.getTuto4} Tuto6={this.getTuto6} />
    })
  }

  getTuto6 = () => {
    this.setState ({
      page : <Tuto6 Tuto5={this.getTuto5}/>
    })
  }

  render() {
    return (
        <div class="container apparition">
            <div class="text-white mt-4">
              <div class="text-center">
                <h3 class><ins>Utiliser notre plateforme:</ins></h3>
                <small>Ce guide vous permet d'utiliser notre plateforme de la façon la plus optimale.</small>
                </div>
                <div class="row mt-4 justify-content-center">
                  <button class="btn btn-outline-info" onClick={() => this.getTuto1()}>Navigateur</button>
                  <button class="btn btn-outline-info" onClick={() => this.getTuto2()}>Wallet</button>
                  <button class="btn btn-outline-info" onClick={() => this.getTuto3()}>Compte</button>
                  <button class="btn btn-outline-info" onClick={() => this.getTuto4()}>Réseau</button>
                  <button class="btn btn-outline-info" onClick={() => this.getTuto5()}>Créditer</button>
                  <button class="btn btn-outline-info" onClick={() => this.getTuto6()}>Retirer</button>
                </div>
                <div class="apparition">
                  {this.state.page}
                </div>
                  
            </div>           
        </div>
        
        
    )
  }
}

export default Tuto;
