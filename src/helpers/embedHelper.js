const { EmbedBuilder } = require("discord.js")

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
        .addFields(
            { name: dota2.players[0].name, value: `${dota2.players[0].hero.name}\n${_kdaToStr(dota2.players[0])}`, inline: true },
            { name: dota2.players[5].name, value: `${dota2.players[5].hero.name}\n${_kdaToStr(dota2.players[5])}`, inline: true },
            { name: ' ', value: ' ' },
            { name: dota2.players[1].name, value: `${dota2.players[1].hero.name}\n${_kdaToStr(dota2.players[1])}`, inline: true },
            { name: dota2.players[6].name, value: `${dota2.players[6].hero.name}\n${_kdaToStr(dota2.players[6])}`, inline: true },
            { name: ' ', value: ' ' },
            { name: dota2.players[2].name, value: `${dota2.players[2].hero.name}\n${_kdaToStr(dota2.players[2])}`, inline: true },
            { name: dota2.players[7].name, value: `${dota2.players[7].hero.name}\n${_kdaToStr(dota2.players[7])}`, inline: true },
            { name: ' ', value: ' ' },
            { name: dota2.players[3].name, value: `${dota2.players[3].hero.name}\n${_kdaToStr(dota2.players[3])}`, inline: true },
            { name: dota2.players[8].name, value: `${dota2.players[8].hero.name}\n${_kdaToStr(dota2.players[8])}`, inline: true },
            { name: ' ', value: ' ' },
            { name: dota2.players[4].name, value: `${dota2.players[4].hero.name}\n${_kdaToStr(dota2.players[4])}`, inline: true },
            { name: dota2.players[9].name, value: `${dota2.players[9].hero.name}\n${_kdaToStr(dota2.players[9])}`, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Radiant', 	value: `Win Percentage: ${dota2.map.radiant_win_chance}\n Total Net Worth: ${_getTeamNetWorths(dota2.players).radiant}`, inline: true },
            { name: 'Dire', 	value: `Win Percentage: ${100 - dota2.map.radiant_win_chance}\n Total Net Worth: ${_getTeamNetWorths(dota2.players).dire}`, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Radiant Net Worth', value: `${_getNetWorths(dota2.players, 'radiant')}`, inline: true },
            { name: 'Dire Net Worth', value: `${_getNetWorths(dota2.players, 'dire')}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'https://github.com/Jonathan-Riso/dota-remnant', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
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

function _getNetWorths(players, faction){
    function compare(a, b){
        if (a.net_worth > b.net_worth) return -1;
        if (a.net_worth < b.net_worth) return 1;
        return 0;        
    }
    
    var res = '';
    const playersSorted = [...players].sort(compare);
    playersSorted.forEach((player) => {
        if (player.team_name == faction) {
            const player_str = `-------\n**${player.name}** - ${player.hero.name}\n${player.net_worth.toLocaleString()}\n`; //Markdown syntax
            res = res + player_str;
        }
    });
    return res;
}
module.exports = { inProgressEmbed, draftEmbed }