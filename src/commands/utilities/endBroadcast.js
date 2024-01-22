const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GSI } = require('../../index')
const { beginBroadcast } = require('./broadcast')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('endbroadcast')
		.setDescription('Ends the current broadcast if it exists.'),
	async execute(interaction) {
        try{
            console.log(GSI.listenerCount('data'))
            if(GSI.listenerCount('data') > 0) {
                GSI.removeAllListeners('data'); // Temporary until I get removeListener working.
                await interaction.reply('Broadcast Ended');
            } else {
                await interaction.reply({ content: 'There are no active broadcasts, use the broadcast command to start one.', ephemeral: true });
            }
            console.log(GSI.listenerCount('data'))
        } catch (err){
            console.error(err);
        }
	},
};