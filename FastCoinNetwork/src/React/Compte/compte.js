import React from 'react';
import RopSten from './RopSten'
import FastCoin from './FastCoin'
import Error from './Error'
import Web3 from 'web3'
// import sha256 from 'crypto-js/sha256'


class Compte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      Page: <Error />
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    }

    async loadWeb3() {
      if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      await this.loadBlockchainData()
      }
      else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      await this.loadBlockchainData()
      }
      else {
      window.alert("Vous n'avez pas de Wallet connectée, vous devriez essayer Metamask!")
      }
      }

      loadBlockchainData  = async () => {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        let networkId = await web3.eth.net.getId()
        let page
        if (networkId === 3) {
          networkId = "RopSten"
          page= <RopSten data={this.loadBlockchainData}/>
        } else if (networkId === 230) {
          networkId = "Fast Coin Network"
          page= <FastCoin data={this.loadBlockchainData}/>
        }
        let Balance = await web3.eth.getBalance(accounts[0])
        Balance = await web3.utils.fromWei(Balance, 'ether')
        this.setState({
          account: accounts[0],
          web3: web3,
          netId: networkId,
          balance: Balance,
          Page: page
          })
        }

  render() {
    return (

        <div class="container text-light">
          <div class="defil">
            <h2 class="my-3 text-center"><ins>Bienvenue dans votre espace</ins></h2>
            <hr class="my-4 bg-light"></hr>
            <h5 class="mt-3 text-center">Vos informations de connexions:</h5>
            <div class="row justify-content-center mt-3">
              <ul class="list-group">
            <li>network: {this.state.netId}</li>
            <li>Votre compte: {this.state.account}</li>
            <li>Votre balance: {this.state.balance} Ether</li>
            </ul>
            </div>
            <hr class="my-4 bg-light"></hr>
            {this.state.Page}
            </div>
            </div>
    
    )
  }
}

export default Compte;
