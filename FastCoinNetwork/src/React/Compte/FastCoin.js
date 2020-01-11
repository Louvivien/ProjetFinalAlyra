import React from 'react'
import jsonContract from '../abis/FastCoinSide.json'
import Modal from 'react-bootstrap/Modal'


class FastCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: window.web3
    }
  }

  async componentWillMount() {
    await this.getInfo()
    }

  getInfo = async () => {
    const {web3} = this.state
    const accounts = await web3.eth.getAccounts()
    const contrat = new web3.eth.Contract(jsonContract.abi, jsonContract.networks[230].address)
    let  Retrait = await contrat.methods.lastDepositAmount().call({from: accounts[0]})
    Retrait = await web3.utils.fromWei(Retrait, 'ether')
    let depot = await contrat.methods.lastWithdrawAmount().call({from: accounts[0]})
    depot = await web3.utils.fromWei(depot, 'ether')
    const Nonce = await contrat.methods.lastWithdrawNonce().call({from: accounts[0]})
    this.setState ({
      deposit: depot,
      account: accounts[0],
      retrait: Retrait,
      Contrat: contrat,
      nonce: Nonce
    })
  }

  actual = async () => {
    this.props.data()
    this.getInfo()
  }

  generMsg = async () => {
    const {account, Contrat, web3} = this.state
    let msg = await Contrat.methods.generateMessage().call({from: account})
    const Nonce = await Contrat.methods.lastWithdrawNonce().call({from: account})
    let Retrait = await Contrat.methods.lastWithdrawAmount().call({from: account})
    Retrait = await web3.utils.fromWei(Retrait, 'ether')
    this.setState ({
      Msg: msg,
      modal2: true,
      nonce: Nonce,
      retrait: Retrait
    })
  }

  ouvrirModal = async () => {
    const {account, Contrat} = this.state
    const nonc = await Contrat.methods.lastDepositNonce().call({from: account})
    this.setState ({
      modal: true,
      nonce2: nonc
    })
  }

  fermerModal = () => {
    this.setState ({
      modal: false
    })
  }

  transfert = async (msg, dRetrait, mRetrait) => {
    const {account, Contrat, web3, nonce2} = this.state
    const NonceRetrait = nonce2 * 1 + 1
    if (dRetrait != NonceRetrait) {
      alert("Le nonce n'est pas correct!\nVeuillez vérifier qu'il correspond à celui spécifié lors de la génération du message côté RopSten.\nPour cela reconnectez vous au réseau RopSten.")
    } else if (mRetrait === undefined) {
      alert("Merci de préciser le montant à retirer")
      } else {
        try { 
          const mt = await web3.utils.toWei(mRetrait, 'ether')
          await Contrat.methods.transfer(msg, mt).send({from: account})
          this.actual()
          this.fermerModal()
        } catch(e) {
          alert(e)
        }
      }
  }

  majNonce = async () => {
    const {account, Contrat} = this.state
    if (window.confirm("Attention, vous êtes sur le point de modifier le nonce, qui correspond au numéro de votre dernière opération.\nLa validation est irréversible et peut vous faire perdre les fonds retirés depuis le réseau Fast Coin.\nVous pouvez consulter l'aide accessible depuis la page d'accueil.")) {
      await Contrat.methods.updateDepositNonce().send({from: account})
      this.actual()
    }
  }

setadr = async () => {
  const {account, Contrat} = this.state
  await Contrat.methods.setContractAddress("0x1cB750245A3931A80552DAEDEDf5A32B14ad6E21").send({from: account})
  alert("ok")
}

  render() {
    return (
        <div>
          <h5 class="text-center">Vous êtes actuellement connecté au réseau Fast Coin</h5>
            <div class="row justify-content-center mt-3">
                  <label>Votre dernier dépôt: {this.state.deposit} Ether</label>
                  <label class="ml-5">Votre dernier retrait: {this.state.retrait} Ether</label>
                </div>
                <div class="row justify-content-center mt-2">
                <label>Nonce: {this.state.nonce}</label>
                </div>
            <div class="row justify-content-center mt-3">
              <button class="btn btn-outline-success" onClick={() => this.actual()}>Actualiser la page</button>
              <button class="btn btn-outline-info ml-2" onClick={() => this.generMsg()}>Générer un message secret</button>
              <Modal show={this.state.modal2} onHide={this.state.modal} size="lg" centered>
                <h3 class="text-center">Les informations à conserver:</h3>
                  <label class="text-center">Votre message:</label>
                  <label class="text-center">{this.state.Msg}</label>
                  <label class="text-center">Votre nonce:</label>
                  <label class="text-center">{this.state.nonce}</label>
                  <label class="text-center">Montant:</label>
                  <label class="text-center">{this.state.retrait}</label>
                <label class="text-center">Veillez à bien les conserver!</label>
                <div class="row justify-content-center">
                  <button class="btn btn-primary" onClick={() => this.setState({modal2: false})}>Valider</button>
                </div>
              </Modal>
              <button class="btn btn-outline-danger ml-2" onClick={() => this.ouvrirModal()}>faire un retrait</button>
              <Modal class="mb-1" show={this.state.modal} onHide={this.state.modal} centered>
                <h3 class="text-center">retrait</h3>
                <div class="row">
                <div class="col-1"></div>
                <div class="col">
                <label class="text-center">Indiquer votre message secret:</label>
                <input class="form-control" placeholder="Message secret" onChange={e => this.setState({msgSecret: e.target.value})}></input>
                </div>
                <div class="col-1"></div>
                </div>
                <div class="row mt-2">
                <div class="col-1"></div>
                <div class="col">
                <label class="text-center">Indiquer votre nonce:    <small>(Votre nonce actuel: {this.state.nonce2} )</small></label>
                <input class="form-control" placeholder="Nonce" onChange={e => this.setState({numRetrait: e.target.value})}></input>
                </div>
                <div class="col-1"></div>
                </div>
                <div class="row mt-2">
                <div class="col-1"></div>
                <div class="col">
                <label class="text-center">Indiquer le montant:</label>
                <input class="form-control" placeholder="Montant" onChange={e => this.setState({mtRetrait: e.target.value})}></input>
                </div>
                <div class="col-1"></div>
                </div>
                <div class="row justify-content-center mt-2 mb-2">
                  <button class="btn btn-primary" onClick={() => this.transfert(this.state.msgSecret, this.state.numRetrait, this.state.mtRetrait)}>Valider</button>
                  <button class="btn btn-secondary ml-2" onClick={() => this.fermerModal()}>Annuler</button>
                </div>
              </Modal>
              <button class="btn btn-outline-secondary ml-2" onClick={() => this.majNonce()} >MAJ Nonce</button>
            </div>
            <div class="row justify-content-center mt-4">
              <label>Vous souhaitez retirer votre argent et le récupérer sur le réseau principal?</label>
              </div>
              <div class="row justify-content-center">
              <label>Suivez le guide!</label>
              </div>
              <div class="row justify-content-center mt-2">
              <ul class="list-group">
              <li>Faites un virement à l'adresse suivante: 0x659432ab0e6324Df1dE5e1f5D2D664CECA6cEb69</li>
              <li>Actualisez la page, puis générer votre message secret.</li>
              <li>Attention! Conservez bien ce message, le numéro de ce dépôt, ainsi que le montant associé!<br/>
              <small>Ces informations vous seront demandées lors du retrait</small></li>
              </ul>
              </div>
              

        </div>

    
    )
  }
}

export default FastCoin;
