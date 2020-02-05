import React from 'react';
import Connect from './connect'
import Error from './Error'
import Web3 from 'web3'
import Loader from './loader'


class Compte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Page: <Loader />,
      web3: null
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    }

    async loadWeb3() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        await this.getConnect()
      } catch(e) {
        this.getError()
      }
      }
      else if (window.web3) {
      try {
        window.web3 = new Web3(window.web3.currentProvider)
        await this.getConnect()
      } catch(e) {
       this.getError()
      }
      }
      else {
      window.alert("Vous n'avez pas de Wallet connectée, vous devriez essayer Metamask!")
      this.getError()
      }
      }

      getError = () => {
        this.setState({
          Page: <Error />
        })
      }

      getConnect = () => {
        this.setState({
          Page: <Connect />
        })
      }
      

        sign = async () => {
          const web3 = window.web3
          const signature = await web3.eth.sign("0x5720ae429c392fa8866dae94fd5bbd610dcf18a572e00b70e85f0cde734edb09", "0x01571Cb736d23AB48931d2d24EbFf3D326db3E97")
          this.setState({
            signature: "signature: " + signature
          })
        }

  render() {
    return (


        <div>
          {this.state.Page}
        </div>
        
    
    )
  }
}

export default Compte;
