import React from 'react';

class Nav extends React.Component {

  render() {
    return (
        <nav class="navbar form-inline border-bottom">
          <button class="btn text-white" onClick={() => this.props.accueil()}>ACCUEIL</button>
          <div class="justify-content-end">
            <button class="ml-1 btn btn-outline-light" id="Rechercer">Rechercher</button>
          </div>
        </nav>
    )
  }
}

export default Nav;
