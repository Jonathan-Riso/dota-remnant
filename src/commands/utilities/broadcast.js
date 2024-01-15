const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { DOTA2GSI } = require('dotagsi')
const { GSI } = require('../../index')

var i = 0;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('broadcast')
		.setDescription('Begin streaming game state integration into the messaged chat.'),
	async execute(interaction) {
		await interaction.reply("Beginning Broadcast")
		const msg = await interaction.channel.send("loading");
		const j = setInterval( async function () {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Dota 2 Remnant')
                .addFields(
                    { name: 'Radiant/Dire Win Percentage', value: `${GSI.current.map.radiant_win_chance}/${1-GSI.current.map.radiant_win_chance}`, inline: true },
                    { name: 'Player GPM', value: `${GSI.current.player.gpm}`, inline: true }
                )
                .setTimestamp()
			await msg.edit({ embeds: [exampleEmbed] });
		}, 1 * 1000)
	},
};