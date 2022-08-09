 const HDWalletProvider = require('@truffle/hdwallet-provider')
 require('dotenv').config()

 module.exports = {
   networks: {
     rinkeby: {
       provider: () => {
         return new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RINKEBY_RPC_URL)
       },
       network_id: '4',
       skipDryRun: true,
     },
     mainnet: {
       provider: () => {
         return new HDWalletProvider(process.env.MAINNET_MNEMONIC, process.env.MAINNET_RPC_URL)
       },
       network_id: '1',
       skipDryRun: true,
     },
   },
   compilers: {
     solc: {
       version: '0.8.0',
     },
   },
   api_keys: {
     etherscan: process.env.ETHERSCAN_API_KEY
   },
   plugins: [
     'truffle-plugin-verify'
   ]
 }