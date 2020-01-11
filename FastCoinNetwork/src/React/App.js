import React from 'react'
import Favicon from 'react-favicon'
import NavA from './NavA'
import Accueil from './Accueil'
import Tuto from './Tuto/Tuto'
import Compte from './Compte/compte'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: <Accueil tuto={this.getTuto} compte={this.getCompte}/>,
      nav: <NavA accueil={this.getAccueil} />
    }
  }

  getTuto = () => {
    this.setState({
      page: <Tuto />
    })
  }

  getAccueil = () => {
    this.setState({
      page: <Accueil tuto={this.getTuto} compte={this.getCompte}/>
    })
  }

  getCompte = () => {
    this.setState ({
      page: <Compte tuto={this.getTuto}/>
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
