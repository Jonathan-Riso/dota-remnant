const { SlashCommandBuilder } = require('discord.js');
const { GSI } = require("../../index.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ingame')
		.setDescription('Checks if connected client is ingame'),
	async execute(interaction) {
        if (GSI){
			if(GSI.current.players) await interaction.reply('Player is in game!');
			return
		}
		await interaction.reply('Player is NOT in game!');
	},
};