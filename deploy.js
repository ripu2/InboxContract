const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const { interface, bytecode } = require("./compile")

const provider = new HDWalletProvider(
    'zero idle knock obtain science cotton equal soon maid shy couple ability',
    'https://rinkeby.infura.io/v3/16d5d06c796f4d94aaa9bb8e5a93fa74'
)

const web3 = new Web3(provider)

const intialMessage = "Hii there !!"

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    if(accounts) {
        console.log("Attempting deployment from ==>", accounts[0])
        const response = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [intialMessage] })
        .send({ from: accounts[0], gas: '1000000' })
        
        if(response) {
            console.log('Contract deployed at ===>', response.options.address);
            provider.engine.stop()
        }
    }
}

deploy()