const { EmbedBuilder } = require("discord.js")
const { heroes } = require("./heroes")
const { items } = require ("./items")

function playingEmbed(dota2){
    const playerObj = {
        "player": dota2.player,
        "hero": dota2.hero,
        "team_name": dota2.player.team_name,
        "items": dota2.items
    }
    const player_str = `
                **${playerObj.player.name}**
                ${_playerHeroAndLevel(playerObj)}
                ${_kdaToStr(playerObj)}
                ***GPM/XPM:***   ${playerObj.player.gpm}/${playerObj.player.xpm}
                ***LH/DN:***     ${playerObj.player.last_hits}/${playerObj.player.denies}\n
            `.trimStart();
    const remnantEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Dota2 Remnant')
    .addFields(
        { name: "Player Stats", value: player_str, inline: true},
        { name: "Current Inventory", value: _getBackpack(playerObj), inline: true},
    )
    .setTimestamp()
}

function spectatorEmbed(dota2){
    console.log(dota2)
    playersObj = _playerHeroArr(dota2);
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Dota2 Remnant')
        .addFields(
            { name: 'Radiant', 	value: `${_getTeamWorths(dota2, 'radiant')}`, inline: true },
            { name: 'Dire', 	value: `${_getTeamWorths(dota2, 'dire')}`, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Worths', value: `${_getWorths(playersObj, 'radiant')}`, inline: true },
            { name: 'Worths', value: `${_getWorths(playersObj, 'dire')}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'https://github.com/Jonathan-Riso/dota-remnant'});
}

function _playerHeroArr(dota2){
    players = [
        {"player": dota2.player.team2.player0, "hero": dota2.hero.team2.player0, "team_name": "radiant"},
        {"player": dota2.player.team2.player1, "hero": dota2.hero.team2.player1, "team_name": "radiant"},
        {"player": dota2.player.team2.player2, "hero": dota2.hero.team2.player2, "team_name": "radiant"},
        {"player": dota2.player.team2.player3, "hero": dota2.hero.team2.player3, "team_name": "radiant"},
        {"player": dota2.player.team2.player4, "hero": dota2.hero.team2.player4, "team_name": "radiant"},
        {"player": dota2.player.team3.player5, "hero": dota2.hero.team3.player5, "team_name": "dire"},
        {"player": dota2.player.team3.player6, "hero": dota2.hero.team3.player6, "team_name": "dire"},
        {"player": dota2.player.team3.player7, "hero": dota2.hero.team3.player7, "team_name": "dire"},
        {"player": dota2.player.team3.player8, "hero": dota2.hero.team3.player8, "team_name": "dire"},
        {"player": dota2.player.team3.player9, "hero": dota2.hero.team3.player9, "team_name": "dire"}
    ]
    return players
}

function _playerHeroAndLevel(playerObj){
    return `__${heroes[playerObj.hero.name]}\tLvl ${playerObj.hero.level}__`;
}

function _kdaToStr(playerObj){
    return `${playerObj.player.kills}/${playerObj.player.assists}/${playerObj.player.deaths}`;
}

function _getTeamWorths(dota2, faction){
    var NetWorthSum = 0;
    var totalKills = 0;
    const win_chance = (faction == 'radiant') ? dota2.map.radiant_win_chance : 100 - dota2.map.radiant_win_chance;
    players = _playerHeroArr(dota2);
    players.forEach((playerObj) => {
        if (playerObj.team_name == faction) {
            NetWorthSum += playerObj.player.net_worth;
            totalKills += playerObj.player.kills;
        }
    });
    res = `
        ***Total Kills***:      ${totalKills}
        ***Win Percentage***:   ${win_chance}%
        ***Total Net Worth***:  ${NetWorthSum.toLocaleString()}
    `;
    return res;
}

function _getWorths(playersObj, faction){
    function compare(a, b){
        if (a["player"].net_worth > b["player"].net_worth) return -1;
        if (a["player"].net_worth < b["player"].net_worth) return 1;
        return 0;        
    }
    var res = '';
    const playersSorted = [...playersObj].sort(compare);
    playersSorted.forEach((playerObj) => {
        if (playerObj.team_name == faction) {
            const player_str = `
                **${playerObj.player.name}**
                ${_playerHeroAndLevel(playerObj)}
                ${_kdaToStr(playerObj)}
                ***Net Worth:*** ${playerObj.player.net_worth.toLocaleString()}
                ***GPM/XPM:***   ${playerObj.player.gpm}/${playerObj.player.xpm}
                ***LH/DN:***     ${playerObj.player.last_hits}/${playerObj.player.denies}\n
            `.trimStart(); //Markdown syntax // I don't know why it doesn't work without trimStart. I am actually clueless.
            res = res + player_str;
        }
    });
    return res;
}

function _getBackpack(playerObj){
    var backpack = [];
    var stash = [];
    const slots = Object.keys(playerObj.items)
    const playerItems = playerObj.items
    slots.forEach( (slot) => {
        if (playerItems[slot].name != 'empty') {
            if(slot.startsWith("slot")){
                backpack.push(items[playerItems[slot].name]);
            } else if(slot.startsWith("stash")){
                stash.push(items[playerItems[slot].name]);
            }
        }
    });
    const inventory_string = `
        Backpack: ${backpack.toLocaleString()}
        Stash: ${stash.length > 0 ? stash.toString() : 'empty'}
        Neutral: ${items[playerItems.neutral0.name]}
        Teleport Scroll(s): ${playerItems.teleport0.item_charges}
        Aghanims Scepter: ${player.hero.aghanims_scepter ? 'Yes' : 'No'}
        Aghanims Shard: ${player.hero.aghanims_shard ? 'Yes' : 'No'}
    `.trimStart();
    return inventory_string;
}
module.exports = { spectatorEmbed, playingEmbed }