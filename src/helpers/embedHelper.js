const { EmbedBuilder } = require("discord.js")
const { heroes } = require("./heroes")
const { items } = require ("./items")

function draftEmbed(dota2){
    const remnantEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Dota2 Remnant')
    .addFields()
    .setTimestamp()
}

function inProgressEmbed(dota2){
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Dota2 Remnant')
        .addFields(
            { name: 'Radiant', 	value: `${_getTeamWorths(dota2, 'radiant')}`, inline: true },
            { name: 'Dire', 	value: `${_getTeamWorths(dota2, 'dire')}`, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Worths', value: `${_getWorths(dota2.players, 'radiant')}`, inline: true },
            { name: 'Worths', value: `${_getWorths(dota2.players, 'dire')}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'https://github.com/Jonathan-Riso/dota-remnant'});
}

function _playerHeroAndLevel(player){
    return `__${heroes[player.hero.name]}\tLvl ${player.hero.level}__`;
}

function _kdaToStr(player){
    return `${player.kills}/${player.assists}/${player.deaths}`;
}

function _getTeamWorths(dota2, faction){
    var NetWorthSum = 0;
    var XPSum = 0;
    var totalKills = 0;
    const win_chance = (faction == 'radiant') ? dota2.map.radiant_win_chance : 100 - dota2.map.radiant_win_chance;
    dota2.players.forEach((player) => {
        if (player.team_name == faction) {
            NetWorthSum += player.net_worth;
            XPSum += player.hero.xp;
            totalKills += player.kills;
        }
    });
    res = `
        ***Total Kills***:      ${totalKills}
        ***Win Percentage***:   ${win_chance}%
        ***Total Net Worth***:  ${NetWorthSum.toLocaleString()}
        ***Total Experience***: ${XPSum.toLocaleString()}\n
    `;
    return res;
}

function _getWorths(players, faction){
    function compare(a, b){
        if (a.net_worth > b.net_worth) return -1;
        if (a.net_worth < b.net_worth) return 1;
        return 0;        
    }
    var res = '';
    const playersSorted = [...players].sort(compare);
    playersSorted.forEach((player) => {
        if (player.team_name == faction) {
            const player_str = `
                **${player.name}**
                ${_playerHeroAndLevel(player)}
                ${_kdaToStr(player)}
                ***Net Worth:*** ${player.net_worth.toLocaleString()}
                ***GPM/XPM:***   ${player.gpm}/${player.xpm}
                ***LH/DN:***     ${player.last_hits}/${player.denies}\n
            `.trimStart(); //Markdown syntax // I don't know why it doesn't work without trimStart. I am actually clueless.
            res = res + player_str;
        }
    });
    return res;
}

function _getBackpack(player){
    var backpack = [];
    player.items.forEach( (item) => {
        if (item.name != 'empty') {
            backpack.push(items[item.name]);
        }
    });
    return backpack.toString()
}
module.exports = { inProgressEmbed, draftEmbed }