const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

const { interface, bytecode } = require('../compile')

let inbox
let account
let initialString = "Hi there"

beforeEach(async () => {

    // get the list of all accounts

    account = await web3.eth.getAccounts()
    if (account) {
        //use one of those account to deploy the contract
        inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode, arguments: [initialString] })
            .send({ from: account[0], gas: '1000000' })
    } else {
        throw new Error('No accounts found')
    }

});

describe('Inbox', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has an initial message', async () => {
        const intitalMessage = await inbox.methods.message().call()
        assert.equal(intitalMessage, initialString)
    });

    it('can change message', async () => {
        await inbox.methods.setMessage('Byeeee').send({ from: account[0] })
        const response = await inbox.methods.message().call()
        assert.equal(response, 'Byeeee')
    });

})