const { spectatorEmbed, playingEmbed } = require('./embedHelper')
const { gamestates } = require('./gamestate')

async function _checkGamestateSpectator(dota2, msg, channel, gameEnd){
	try{
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
			const remnantEmbed = embed(dota2)
			await msg.edit({ content: "Current Game", embeds: [remnantEmbed]});

			
		} else if (dota2.map && dota2.map.game_state == gamestates["inprogress"]){
			gameEnd=false;
			const remnantEmbed = spectatorEmbed(dota2)
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

async function _checkGamestatePlaying(dota2, msg, channel, gameEnd){
	try{
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
			const remnantEmbed = embed(dota2)
			await msg.edit({ content: "Current Game", embeds: [remnantEmbed]});

			
		} else if (dota2.map && dota2.map.game_state == gamestates["inprogress"]){
			gameEnd=false;
			const remnantEmbed = playingEmbed(dota2)
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
module.exports = {_checkGamestatePlaying, _checkGamestateSpectator}