const { SlashCommandBuilder } = require('discord.js');
const { client_emitters: client_emitters } = require('../../index')
const {_checkGamestatePlaying, _checkGamestateSpectator} = require('../../helpers/gamestateHelper')

var msg = null;
var channel = null;
var gameEnd = false;

async function beginBroadcast(dota2){
	try{
		console.log(dota2)
		if (dota2.player && dota2.player.team2 && dota2.player.team3){
			_checkGamestateSpectator(dota2, msg, channel, gameEnd)
		}
		
		else if (dota2.player && dota2.player.team_name && dota2.player.activity == "playing"){
			_checkGamestatePlaying(dota2, msg, channel, gameEnd)
		}
		
	} catch (err){
		console.error(err);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('broadcast')
		.setDescription('Begin streaming game state integration into the current chat.'),
	async execute(interaction) {
		try {
			client = client_emitters["client"];
			if (client.listenerCount('newdata') > 0){
				await interaction.reply({ content: "Broadcast already started, to end the current broadcast use the EndBroadcast command.", ephemeral: true });
				return
			}
			await interaction.reply("Beginning Broadcast")
			channel = interaction.channel
			msg = await channel.send("Waiting for player to join game.");

			client.on('newdata', beginBroadcast);
		} catch (err) {
			console.error(err);
			await interaction.reply({content: "Please launch dota first before starting the broadcast.", ephemeral: true})
		}
	},
};