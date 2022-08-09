const FinalFantasy7 = artifacts.require('FinalFantasy7')

module.exports = async callback => {
  const ff7 = await FinalFantasy7.deployed()
  console.log('Building Player', ff7.address)
  const tx = await ff7.buildPlayer("Aeris Gainsborough")
  const tx2 = await ff7.buildPlayer("Cloud Strife")
  const tx3 = await ff7.buildPlayer("Tifa Lockhart")
  const tx4 = await ff7.buildPlayer("Yuffie Kisaragi")
  callback(tx.tx)
}