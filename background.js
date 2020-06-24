function sendMessage(message) {
    chrome.tabs.query(
        {currentWindow: true, active: true},
        function (tabArray) {
            chrome.tabs.sendMessage(tabArray[0].id, {text: message, tabId:tabArray[0].id});
        }
    );
}

var contextMenuItem = {
    "id": "PlayerName",
    "title": "Search %s"+" with NBASearch",
    "contexts": ["selection"],

};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId = "playerName" && clickData.selectionText) {
        console.log(clickData);
        sendMessage(clickData.selectionText.toString());
    }
});
