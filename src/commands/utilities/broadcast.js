const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { DOTA2GSI } = require('dotagsi')
const { GSI } = require('../../index')
const { gamestates } = require('../../helpers/gamestate')
const { draftEmbed } = require('../../helpers/embedHelper')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('broadcast')
		.setDescription('Begin streaming game state integration into the messaged chat.'),
	async execute(interaction) {
		await interaction.reply("Beginning Broadcast")
		var msg = await interaction.channel.send("Waiting for player to join game.");
		// await msg.edit({ embeds: [remnantEmbed] });

		const listener = GSI.on('data', async dota2 => {
				const remnantEmbed = null
				if (!dota2.map) {
					console.log("Not in game")

				} else if (dota2.map && dota2.map.game_state == gamestates["draft"]){
					console.log("In Draft")
					await msg.edit("In Draft");

				} else if (dota2.map && dota2.map.game_state == gamestates["maploading"]){
					console.log("Map is loading")
					await msg.edit("Map is Loading");

				} else if (dota2.map && dota2.map.game_state == gamestates["pregame"]){
					console.log("In Pregame")
					await msg.edit("Map is Loading");

				} else if (dota2.map && dota2.map.game_state == gamestates["inprogress"]){
					console.log("In Progress")
					await msg.edit("Map is Loading");

				} else if (dota2.map && dota2.map.game_state == gamestates["postgame"]){
					console.log("Post game")
					await msg.edit(`Game is over, ${dota2.map.win_team} Victory`);
					msg = await interaction.channel.send("Waiting for player to join game.");
				}
		});
	},
};