const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { DOTA2GSI } = require('dotagsi')
const { GSI } = require('../../index')
const { gamestates } = require('../../helpers/gamestate')
const { inProgressEmbed } = require('../../helpers/embedHelper')

var message = null;
async function beginBroadcast(dota2){
	try{
		var gameEnd = false;
		if (!dota2.map) {
			console.debug("Not in game");

		} else if (dota2.map && dota2.map.game_state == gamestates["draft"]){
			gameEnd=false;
			console.debug("In Draft");
			await msg.edit("In Draft");
			
			
		} else if (dota2.map && dota2.map.game_state == gamestates["maploading"]){
			gameEnd=false;
			console.debug("Map is loading");
			await msg.edit("Map is Loading");
			
		} else if (dota2.map && dota2.map.game_state == gamestates["pregame"]){
			gameEnd=false;
			console.debug("In Pregame");
			const remnantEmbed = inProgressEmbed(dota2)
			await msg.edit({ embeds: [remnantEmbed]});

			
		} else if (dota2.map && dota2.map.game_state == gamestates["inprogress"]){
			gameEnd=false;
			console.debug("In Progress");
			const remnantEmbed = inProgressEmbed(dota2)
			await msg.edit({ embeds: [remnantEmbed]});

		} else if (dota2.map && dota2.map.game_state == gamestates["postgame"] && !gameEnd){
			console.debug("Post game");
			await interaction.channel.send(`Game is over, ${dota2.map.win_team} Victory`);
			msg = await interaction.channel.send("Waiting for player to join game.");
			gameEnd = true;
		}
	} catch (err){
		console.error(err);
	}
}
exports.beginBroadcast = beginBroadcast;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('broadcast')
		.setDescription('Begin streaming game state integration into the messaged chat.'),
	async execute(interaction) {
		if (GSI.listenerCount('data') > 0){
			await interaction.reply({ content: "Broadcast already started, to end the current broadcast use the EndBroadcast command.", ephemeral: true });
			return
		}
		await interaction.reply("Beginning Broadcast")
		msg = await interaction.channel.send("Waiting for player to join game.");

		GSI.on('data', beginBroadcast);
	},
};