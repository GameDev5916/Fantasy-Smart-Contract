const FinalFantasy7 = artifacts.require('FinalFantasy7')
const TOKENID = 0
module.exports = async callback => {
    const ff7 = await FinalFantasy7.deployed()
    console.log('tokenURI of your players')
    const tx = await ff7.setTokenURI(0, "https://ipfs.io/ipfs/QmYVxroSNSLoZmBJR6Z2wMpNpx5mtVbBxpy92iv4b2zb1d?filename=Aeris-Gainsborough.json")
    const tx1 = await ff7.setTokenURI(1, "https://ipfs.io/ipfs/QmYwbkHUs6C26X7T8Wi4tSnmhoqD8bjt3uUshx1rB72SB3?filename=Cloud-Strife.json")
    const tx2 = await ff7.setTokenURI(2, "https://ipfs.io/ipfs/QmVrWpaM8LbrLVnXPAHLLqeQqVXjMGq12f7J4ENNrMpQhu?filename=Tifa-Lockhart.json")
    const tx3 = await ff7.setTokenURI(3, "https://ipfs.io/ipfs/QmRx1f4EuE448WL9NhwDhopZ6Uq9MCznEfejMAwTxFtaxx?filename=Yuffie-Kisaragi.json")
    console.log(tx)
    callback(tx.tx)
}