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
            { name: 'Radiant', 	value: `***Win Percentage***: ${dota2.map.radiant_win_chance}%\n ***Total Net Worth***: ${_getTeamNetWorths(dota2.players).radiant}`, inline: true },
            { name: 'Dire', 	value: `***Win Percentage***: ${100 - dota2.map.radiant_win_chance}%\n ***Total Net Worth***: ${_getTeamNetWorths(dota2.players).dire}`, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Worths', value: `${_getWorths(dota2.players, 'radiant')}`, inline: true },
            { name: 'Worths', value: `${_getWorths(dota2.players, 'dire')}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'https://github.com/Jonathan-Riso/dota-remnant'});
}

function _playerHeroAndLevel(player){
    return `__${heroes[player.hero.name]}\tLvl ${player.hero.level}__`
}

function _kdaToStr(player){
    return `${player.kills}/${player.assists}/${player.deaths}`
}

function _getTeamNetWorths(players){
    var radiantNetworthSum = 0;
    var direNetworthSum = 0;
    players.forEach((player) => {
        if (player.team_name == 'radiant') radiantNetworthSum += player.net_worth;
        else direNetworthSum += player.net_worth;
    });
    return {'dire': direNetworthSum.toLocaleString(), 'radiant': radiantNetworthSum.toLocaleString()};
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
                ***GPM/XPM:*** ${player.gpm}/${player.xpm}
                ***Last Hits:*** ${player.last_hits}/${player.denies}\n
            `.trimStart(); //Markdown syntax // I don't know why it doesn't work without trimStart. I am actually clueless.
            res = res + player_str;
        }
    });
    console.log(res)
    return res;
}

function _getBackpack(player){
    var backpack = [];
    player.items.forEach( (item) => {
        if (item.name != 'empty') {
            console.log(item.name);
            backpack.push(items[item.name]);
        }
    });
    return backpack.toString()
}
module.exports = { inProgressEmbed, draftEmbed }