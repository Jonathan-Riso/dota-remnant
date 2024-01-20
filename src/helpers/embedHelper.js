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
            { name: dota2.players[0].realName, value: `${dota2.players[0].hero.name}\n${_kdaToStr(dota2.players[0])}`, inline: true },
            { name: dota2.players[5].realName, value: `${dota2.players[5].hero.name}\n${_kdaToStr(dota2.players[5])}`, inline: true },
            { name: '', value: '' },
            { name: dota2.players[1].realName, value: `${dota2.players[1].hero.name}\n${_kdaToStr(dota2.players[0])}`, inline: true },
            { name: dota2.players[6].realName, value: `${dota2.players[6].hero.name}\n${_kdaToStr(dota2.players[5])}`, inline: true },
            { name: '', value: '' },
            { name: dota2.players[2].realName, value: `${dota2.players[2].hero.name}\n${_kdaToStr(dota2.players[0])}`, inline: true },
            { name: dota2.players[7].realName, value: `${dota2.players[7].hero.name}\n${_kdaToStr(dota2.players[5])}`, inline: true },
            { name: '', value: '' },
            { name: dota2.players[3].realName, value: `${dota2.players[3].hero.name}\n${_kdaToStr(dota2.players[0])}`, inline: true },
            { name: dota2.players[8].realName, value: `${dota2.players[8].hero.name}\n${_kdaToStr(dota2.players[5])}`, inline: true },
            { name: '', value: '' },
            { name: dota2.players[4].realName, value: `${dota2.players[4].hero.name}\n${_kdaToStr(dota2.players[0])}`, inline: true },
            { name: dota2.players[9].realName, value: `${dota2.players[9].hero.name}\n${_kdaToStr(dota2.players[5])}`, inline: true },
            { name: '', value: '' },
            { name: 'Radiant', 	value: `Win Percentage: ${dota2.map.radiant_win_chance}\n Total Net Worth: ${_getTeamNetWorths(dota2.players).radiant}`, inline: true },
            { name: 'Dire', 	value: `Win Percentage: ${100 - dota2.map.radiant_win_chance}\n Total Net Worth: ${_getTeamNetWorths(dota2.players).dire}`, inline: true },
            { name: '', value: '' },
            { name: 'List of Net Worth', value: `${_getSortedNetWorths(dota2.players)}` },
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
    players.array.forEach(function (player, index) {
        if (index < 5) radiantNetworthSum += player.net_worth;
        else direNetworthSum += player.net_worth;
    });
    return {'dire': direNetworthSum, 'radiant': radiantNetworthSum};
}

function _getSortedNetWorths(players){
    function compare(a, b){
        if (a.net_worth < b.net_worth) return -1;
        if (a.net_worth > b.net_worth) return 1;
        return 0;        
    }
    var sortedPlayers = [...players].sort();
    var res = ''; 
    sortedPlayers.forEach(function (player) {
        var player_str = `**${player.realName}**\n${player.hero.name}\n${player.net_worth}`; //Markdown syntax
        res.concat(player_str);
    });
    return res;
}
module.exports = { inProgressEmbed, draftEmbed }