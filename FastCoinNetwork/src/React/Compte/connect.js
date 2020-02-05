import React from 'react'
import jsonContract from '../abis/FastCoinMain.json'
import GetAppIcon from '@material-ui/icons/GetApp'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from 'react-bootstrap/Modal'

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        page: null,
        menu:false,
        modal: false,
        modal2: false,
        bouton: <button class="btn btn-primary mb-1">Signer</button>,
        bouton2: <button class="btn btn-primary mb-1">Valider</button>
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

  async componentWillMount() {
    await this.loadBlockchainData()
    }

    loadBlockchainData  = async () => {
        this.closeMenu()
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        let networkId = await web3.eth.net.getId()
        const ContractAdress = jsonContract.networks[networkId].address
        const Contrat = new web3.eth.Contract(jsonContract.abi, ContractAdress)
        let Balance = await web3.eth.getBalance(accounts[0])
        Balance = await web3.utils.fromWei(Balance, 'ether')
        if (networkId === 3) {
          networkId = "Ropsten"
        } else if (networkId === 230) {
          networkId = "Fast Coin Network"
        } else {
            return alert("Réseau non identifié")
        }
        this.setState({
          account: accounts[0],
          web3: web3,
          netId: networkId,
          balance: Balance,
          contrat: Contrat,
          contractAdress: ContractAdress
          })
          this.loadAccount()
        }

        loadAccount = async () => {
            const {web3, contrat, account, netId} = this.state
            let Depot = await contrat.methods.lastDepositAmount().call({from: account})
            Depot = await web3.utils.fromWei(Depot, 'ether')
            const Nonce = await contrat.methods.lastDepositNonce().call({from: account})
            const Key = await contrat.methods.generateMessage(account).call({from: account})
            let Sign = await contrat.methods.lastDepositSig().call({from: account})
            let Signature
            if (Sign === null) {
                Signature = "En attente de signature"
                Sign = "En attente"
            } else {
                Signature = "Signé"
            }
            this.setState({
                depot: Depot,
                sign: Sign,
                signature: Signature,
                nonce: Nonce,
                key: Key
            })
            this.down(Depot, Sign, Nonce, Key, account, netId)
        }

        openModal = () => {
          this.closeMenu()
            this.setState({
                modal: true
            })
        }

        openModal2 = () => {
          this.closeMenu()
            this.setState({
                modal2: true
            })
        }

        closeModal = () => {
          this.setState({
            modal: false,
            modal2: false
          })
        }

        signer = async (message, addressUser) => {
            const {web3, contrat, account} = this.state
            this.setState({
              bouton: (
                <div class="spinner-border text-danger text-center">
                </div>
              )
            })
            try {
                const sign = await web3.eth.sign(message, account)
                await contrat.methods.sign(sign, addressUser).send({from: account})
                this.closeModal()
            } catch(e) {
                alert(e)
            }
            this.setState({
              bouton: <button class="btn btn-primary mb-1">Signer</button>
            })
        }

        down = (Depot, Sign, Nonce, Key, account, netId) => {
          const données = { réseau: netId,
                            compte: account,
                            depot: Depot,
                            signature: Sign,
                            nonce: Nonce,
                            clé: Key
          }

          let blob = new Blob([JSON.stringify(données, null, 2)], {type : 'application/json'})
          let url = URL.createObjectURL(blob)
          this.setState({
            lien: url
          })
        }

        transfer = async (cle, mt) => {
          const {contrat, account, web3} = this.state
          this.setState({
            bouton2: (
              <div class="spinner-border text-danger text-center">
                </div>
            )
          })
          try {
            const mtWei = await web3.utils.toWei(mt, 'ether')
            await contrat.methods.transfer(cle, mtWei).send({from: account})
            this.closeModal()
            this.loadAccount()
          } catch(e) {
            alert(e)
          }
          this.setState({
            bouton2: <button class="btn btn-primary mb-1">Valider</button>
          })
        }

        // setAdress = async () => {
        //   const {contrat, account} = this.state
        //   this.closeMenu()
        //   try {
        //     await contrat.methods.setContractAddress("0x8Cd4ec16D09600D2496629e66aC8F4D3BFd295A4").send({from: account})
        //     alert("ok")
        //   } catch(e){
        //     alert(e)
        //   }
        // }

  render() {
    return (
    <div class="text-white">
        <div class="apparition">
            <h4 class="text-center text-white mt-5"><ins>Votre espace:</ins></h4>
            <div class="row justify-content-center my-3">
                <button class="nav-item btn btn-outline-primary dropdown-toggle" onClick={e => this.openMenu(e)}>Mes options</button>
                <Menu
            anchorEl={this.state.menu}
            open={this.state.menu}
            onClose={() => this.closeMenu()}>
                <MenuItem onClick={() => this.loadBlockchainData()}>Actualiser mes données</MenuItem>
                <MenuItem onClick={() => this.openModal2()}>Valider un transfert</MenuItem>
                <hr></hr>
                <MenuItem onClick={() => this.openModal()}>Signer</MenuItem>
                {/* <MenuItem onClick={() => this.setAdress()}>Signer</MenuItem> */}
            </Menu>
            </div>
        </div>
            <div class = "row justify-content-center apparition">
                        <div class="my-2 mx-2">
                            <h4 class="text-center">Réseau: {this.state.netId}</h4>
                            <hr class="bg-light"></hr>
                            <label>Compte:</label>
                            <label class="ml-2">{this.state.account}</label><br/>
                            <label>Balance:</label>
                            <label class="ml-2">{this.state.balance} Ether</label><br/>
                            <label>Smart contract: </label>
                            <label class="ml-2">{this.state.contractAdress}</label><br/>
                        </div>                       
            </div>
            <div class="row justify-content-center mt-3 apparition">
                    <div class="my-2 mx-2">
                        <h4 class="text-center">Dernier dépôt:</h4>
                        <hr class="bg-light"></hr>
                        <label>Montant: {this.state.depot} Ether</label><br/>
                        <label>{this.state.signature}</label><br/>
                        <a href={this.state.lien} download="données.txt"><GetAppIcon /></a>
                    </div>
            </div>
              <Modal show={this.state.modal} onHide={this.state.modal} size="lg" centered>
              <Modal.Header closeButton onClick={() => this.closeModal()}>
              <Modal.Title>Signer un message:</Modal.Title>
            </Modal.Header>
              <form onSubmit={e => {e.preventDefault()
              this.signer(this.refs.msg.value, this.refs.user.value)}}>
                <div class="form-group mx-1">
                    <label class="text-center" for="msg">Clé de transfert:</label>
                    <input class="form-control" ref="msg" id="msg" required></input>
                  </div>
                  <div class="form-group mx-1">
                    <label class="text-center" for="user">Adresse utilisateur:</label>
                    <input class="form-control" ref="user" id="user" required></input>
                  </div>
                  <div class="row justify-content-center">
                    {this.state.bouton}
                  </div>
                </form>
              </Modal>
              <Modal show={this.state.modal2} onHide={this.state.modal2} size="lg" centered>
              <Modal.Header closeButton onClick={() => this.closeModal()}>
              <Modal.Title>Valider un transfert:</Modal.Title>
            </Modal.Header>
              <form onSubmit={e => {e.preventDefault()
              this.transfer(this.refs.msg2.value, this.refs.mt.value)}}>
                <div class="form-group mx-1">
                    <label class="text-center" for="msg2">Signature:</label>
                    <input class="form-control" ref="msg2" id="msg2" required></input>
                  </div>
                  <div class="form-group mx-1">
                    <label class="text-center" for="mt">Montant:</label>
                    <input class="form-control" ref="mt" id="mt" required></input>
                  </div>
                  <div class="row justify-content-center">
                    {this.state.bouton2}
                  </div>
                </form>
              </Modal>
    </div>
    
    )
  }
}

export default Connect;
