const {ethers} = require('ethers')
const fs = require('fs')

const address = "0x0E556F5258130E5C8649aB0c2cA3F523aF8776F2"
const list_contracts = ['Context', 'ERC20', 'Ownable', 'Token']

const abi_ = {}
list_contracts.forEach((each) => {
    const abi_contract = fs.readFileSync(`${each}.json`)
    abi_[each] = JSON.parse(abi_contract)
})

const provider = new ethers.providers.EtherscanProvider("rinkeby");

const ERC20 = new ethers.Contract(address, abi_.ERC20, provider)
const Ownable = new ethers.Contract(address, abi_.Ownable, provider)
const Context = new ethers.Contract(address, abi_.Context, provider)
const Token = new ethers.Contract(address, abi_.Token, provider)
const contracts = {
    ERC20, Ownable, Context, Token
}
console.log(contracts)

