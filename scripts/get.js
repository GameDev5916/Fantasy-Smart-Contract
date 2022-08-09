const FinalFantasy7 = artifacts.require('FinalFantasy7')

module.exports = async callback => {
    const ff7 = await FinalFantasy7.deployed()
    console.log('Obtaining Player')
    const overview = await ff7.players(0)
    console.log(overview)
    callback(overview.tx)
}
