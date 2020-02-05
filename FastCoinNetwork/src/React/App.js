import React from 'react'
import Favicon from 'react-favicon'
import NavA from './NavA'
import Accueil from './Accueil'
import Tuto from './Tuto/Tuto'
import Compte from './Compte/compte'
import Decouvrir from './decouvrir/Decouvrir'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: <Accueil tuto={this.getTuto} compte={this.getCompte} decouvrir={this.getDecouvrir}/>,
      nav: <NavA tuto={this.getTuto} compte={this.getCompte} decouvrir={this.getDecouvrir} accueil={this.getAccueil}/>
    }
  }

  componentWillMount() {
    this.checkWeb3()
  }

  checkWeb3 = () => {
      if (window.web3) {
        this.getCompte()
      }
  }

  getTuto = () => {
    this.setState({
      page: <Tuto />
    })
  }

  getAccueil = () => {
    this.setState({
      page: <Accueil tuto={this.getTuto} compte={this.getCompte} decouvrir={this.getDecouvrir}/>
    })
  }

  getCompte = () => {
    this.setState ({
      page: <Compte tuto={this.getTuto}/>
    })
  }

  getDecouvrir = () => {
    this.setState ({
      page: <Decouvrir />
    })
  }

  render() {

  return (
    <div class ="container-fluid">
        <Favicon url="./Favicon.png"></Favicon>
        {this.state.nav}
        {this.state.page}
      </div>
  )
  }
}

export default App
