const FinalFantasy7 = artifacts.require('FinalFantasy7')
const fs = require('fs')

const MetaTemp = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Level",
            "value": 0
        },
        {
            "trait_type": "Strength",
            "value": 0
        },
        {
            "trait_type": "Magic",
            "value": 0
        },
        {
            "trait_type": "Vitality",
            "value": 0
        },
        {
            "trait_type": "Spirit",
            "value": 0
        },
        {
            "trait_type": "Luck",
            "value": 0
        },
        {
            "trait_type": "Speed",
            "value": 0
        }
    ]
}
module.exports = async callback => {
    const ff7 = await FinalFantasy7.deployed()
    length = await ff7.obtainPlayers()
    index = 0 
    while (index < length) {
        console.log('Overview of players' + index + 'of' + length)
        let ff7meta = MetaTemp
        let obtainPlayer = await ff7.players(index)
        index++
        ff7meta['name'] = obtainPlayer['name']
        if(fs.existsSync('metadata/' + ff7meta['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue 
        }
        console.log(ff7meta['name'])
        ff7meta['attributes'][0]['value'] = obtainPlayer['Strength']['words'][0]
        ff7meta['attributes'][1]['value'] = obtainPlayer['Magic']['words'][0]
        ff7meta['attributes'][2]['value'] = obtainPlayer['Vitality']['words'][0]
        ff7meta['attributes'][3]['value'] = obtainPlayer['Spirit']['words'][0]
        ff7meta['attributes'][4]['value'] = obtainPlayer['Luck']['words'][0]
        ff7meta['attributes'][5]['value'] = obtainPlayer['Speed']['words'][0]
        filename = 'metadata/' + ff7meta['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(ff7meta)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(ff7)
}