const fs = require("fs");
const solc = require('solc')
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let source = fs.readFileSync('voting.sol', 'utf8');
let compiledContract = solc.compile(source, 1);
let abi = compiledContract.contracts[':Voting'].interface;
let bytecode = compiledContract.contracts[':Voting'].bytecode;

let address = "WALLET_ADDRESS";

// Create an instance of the contract
let voting = new web3.eth.Contract(JSON.parse(abi));

web3.eth.estimateGas({data: bytecode, from: address}).then(function(gasAmount){
  // Deploy that contract, passing `arguments` to the constructor
  voting.deploy({data: bytecode, arguments: [[web3.utils.asciiToHex(' '), web3.utils.asciiToHex('Nick'),web3.utils.asciiToHex('Jose'),web3.utils.asciiToHex('Rama')]]}).send({
    from: address,
    gas: 1500000,
    gasPrice: '30000000000000'
  }).on('error', function(error){
      console.error(error);
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
});
// var deployedContract = new Voting(['Rama','Nick','Jose'],{data: bytecode, from: "0x3abfe07a458d513f95d3a4d258a63565ad5464f7", gas: 207631})
  // var myContractInstance = MyContract.new(param1, param2, {data: myContractCode, gas: 300000, from: mySenderAddress});
