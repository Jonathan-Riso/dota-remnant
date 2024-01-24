# Dota2Remant

A discord bot that utilizes the Dota 2 GSI to display information about your current game.

## Description

Dota2Remant is a discord bot that broadcasts information about the current game you are spectating or playing. It does through the game state integration which broadcasts updates about the game which the discord bot will use to dynamically update the discord embed in the channel of your choosing. At this time the bot must be deployed locally and information for the such can be found below.

## Getting Started

### Installing

* TODO: Information about setting up your own discord bot.
* Inside the `src/` folder create a file called `config.json` 
* Open the file and fill in the following
  ```json
    {
        "botToken": "your-token-goes-here",
        "clientId": "client-id-token-here"
    }
  ```
* For the docker installation, simply have docker installed and run docker-compose.
* For running it without docker simply run `npm i` inside the src folder
* Then run `node deploy-commands.js` to populate the slash commands.
* Finally run `node .` to start the discord bot.

### Executing program

* While the bot is running, use the `/broadcast` command to start the bot reacting to the dota2gsi
* Use `/endbroadcast` to stop the broadcast

## Known Issues

* At this time you need to be in game before you can begin broadcasting.

## Authors

* [Jonathan Riso](https://github.com/Jonathan-Riso)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Technology

* [dota2-gsi](https://github.com/xzion/dota2-gsi)
* [discord.js](https://discord.js.org/)

## Acknowledgments

* TODO