const { SlashCommandBuilder } = require('discord.js');
const { client_emiters } = require('../../index')
const { gamestates } = require('../../helpers/gamestate')
const { inProgressEmbed } = require('../../helpers/embedHelper')

var msg = null;
var channel = null;
var gameEnd = false;

async function beginBroadcast(dota2){
	try{
		if (dota2.player && dota2.player.team_name && dota2.player.team_name == "spectator") return;
		
		if (!dota2.map) {
			console.warn("Not in game");

		} else if (dota2.map && dota2.map.game_state == gamestates["draft"]){
			gameEnd=false;
			await msg.edit("In Draft");
			
			
		} else if (dota2.map && dota2.map.game_state == gamestates["maploading"]){
			gameEnd=false;
			await msg.edit("Map is Loading");
			
		} else if (dota2.map && dota2.map.game_state == gamestates["pregame"]){
			gameEnd=false;
			const remnantEmbed = inProgressEmbed(dota2)
			await msg.edit({ content: "Current Game", embeds: [remnantEmbed]});

			
		} else if (dota2.map && dota2.map.game_state == gamestates["inprogress"]){
			gameEnd=false;
			const remnantEmbed = inProgressEmbed(dota2)
			await msg.edit({ content: "Current Game", embeds: [remnantEmbed]});

		} else if (dota2.map && dota2.map.game_state == gamestates["postgame"] && !gameEnd){
			await channel.send(`Game is over, ${dota2.map.win_team} victory`);
			msg = await channel.send("Waiting for player to join game.");
			gameEnd = true;
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
			client = client_emiters["client"];
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