import React from 'react';

class Nav extends React.Component {

  render() {
    return (
        <nav class="navbar form-inline border-bottom">
          <button class="btn text-white" onClick={() => this.props.accueil()}>ACCUEIL</button>
        </nav>
    )
  }
}

export default Nav;
