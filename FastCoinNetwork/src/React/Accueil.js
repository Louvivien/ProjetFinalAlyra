import React from 'react'


class Accueil extends React.Component {

  render() {
    return (
<div class="container">
    <div class="jumbotron mt-4 bg-transparent text-white text-center  defil">
        <h1 class="display-4">Fast Coin Network</h1>
        <h3 class="lead">Le premier réseau de paiement instantané, gratuit, pour tous, partout dans le monde!</h3>
        <hr class="my-4 bg-light"></hr>
        <li class="mb-2">fast Coin Network est une plateforme permettant le paiement instantané sans frais, complètement décentralisé.</li>
        <li class="mb-2">Sécurisée, elle simplifie les échanges d'argent que ce soit entre particuliers ou par des professionnels.</li>
        <li class="mb-2">Anonyme, Fast Coin Network protège ses utilisateurs.</li>
        <li class="mb-2">Une nouvelle manière d'acheter et de vendre simplement, rapidement.</li>
        <li class="mb-2">La technologie Blockchain au service de tous!</li>
        <hr class="my-2 bg-light"></hr>
        <p class="lead"><ins>N'attendez plus, utilisez Fast Coin Network</ins></p>
        <div class="row">
            <div class="col"></div>
            <button class="btn btn-success col" onClick={() => this.props.compte()}>Se connecter au réseau</button>
            <div class="col"></div>
        </div>
        <div class="form-group mt-3">
            <p class="lead"><ins>Première fois? C'est par ici:</ins></p>
            <div class="row">
                <button class="btn btn-outline-primary col" onClick={() => this.props.tuto()}>Comment utiliser Fast Coin Network?</button>
                <div class="col"></div>
                <button class="btn btn-outline-warning col" onClick={() => this.props.decouvrir()}>Découvrir notre technologie</button>
            </div>
        </div>
    </div>
</div>
    )
  }
}

export default Accueil;
