<a><img src="./images/logo.png"></a>
# NBA Search Chrome Extension
This extension allows user to search for NBA player's stats on any page.
For example, if you are new to watching the NBA and you read an article about an up and coming player such as 
Donovan Mitchell. You can simply highlight the player's name on the article and search for his stats with this extension.

## This extension is currently pending review on the Google App Store.


## Installation Locally
1. Clone this repo your local machine.
2. Enable developer mode for extension on Google Chrome.
3. Navigate to chrome://extensions.
4. Find "Load Unpacked Version" and click.
5. Navigate to where you save the repo and select it.
6. The extension should be in your chrome browser now.

## How to use
1. Highlight any NBA player's name
2. Right click and you should see an option to search with NBASearch
3. Click on the option and the result should be displayed on the same page.

[![Image from Gyazo](https://i.gyazo.com/9a40c90794cd63885c44c51b16ca76b6.gif)](https://gyazo.com/9a40c90794cd63885c44c51b16ca76b6)

## TroubleShooting
1. If you search a player that does not exist. The extension will return an error and ask you to refresh.
2. If you search only a player's first name, the extension will show a player that closely resembles that player.
For example, if you just search Michael, you would expect the extension to return Michael Jordan but it might returns 
Michael Finley. For accurate result, search the entire name
3. If the extension times out, it will return an error.

## P.S
This is a side project and the back-end is hosted on Azure with a free subscription. This application will slow down
when encountering too many requests.
