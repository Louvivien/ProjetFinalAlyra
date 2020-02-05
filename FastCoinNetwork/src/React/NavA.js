import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    }
  }

  openMenu = (e) => {
    this.setState({
      menu: e.currentTarget
    })
  }

  closeMenu= () => {
    this.setState({
      menu: false
    })
  }



  render() {
    return (
        <nav class="navbar form-inline">
          <button class="btn-lg btn btn-outline-light apparition" onClick={e => this.openMenu(e)}>Menu</button>
          <Menu
            anchorEl={this.state.menu}
            open={this.state.menu}
            onClose={() => this.closeMenu()}>
                    <MenuItem onClick={()=> {
                      this.closeMenu()
                      this.props.accueil()
                    }}>Accueil</MenuItem>
                    <MenuItem onClick={()=> {
                      this.closeMenu()
                      this.props.compte()
                    }}>Se connecter</MenuItem>
                    <MenuItem onClick={() => {
                        this.closeMenu()
                        this.props.tuto()
                    } }>Guide</MenuItem>
                    <MenuItem onClick={() => {
                      this.closeMenu()
                      this.props.decouvrir()}}>A Propos</MenuItem>
            </Menu>
        </nav>
    )
  }
}

export default Nav;
