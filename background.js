// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//         console.log('The color is green.');
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: {hostEquals: 'developer.chrome.com'},
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });

//chrome.contextMenus.create({title: "NBA Player", contexts:["selection"],onclick: function() {console.log("Huh")}});
// function logFunction(){
//     console.log("Sent this");
// }

// This function will send a message to the content script running on the tab


let sampleJson = {
    "2014": {
        "Year": 2014,
        "PTS": 100,
        "AST": 100,
        "BLK": 100
    }
};

function updateWindow(window) {
    let innerTable = window.document.getElementById("statTable");
    console.log(window);
    console.log(window.document);
    console.log(innerTable);

    // let newRow = innerTable.insertRow(1);
    // let newCell0 = newRow.insertCell(0);
    // let newCell1 = newRow.insertCell(1);
    // let newCell2 = newRow.insertCell(2);
    // let newCell3 = newRow.insertCell(3);
    // newCell0.innerText = sampleJson["2014"]["Year"];
    // newCell1.innerText = sampleJson["2014"]["PTS"];
    // newCell2.innerText = sampleJson["2014"]["AST"];
    // newCell3.innerText = sampleJson["2014"]["BLK"];
}

var props = {
    url: chrome.runtime.getURL("stats.html"),
    type: 'popup',
    focused: true
};

function createNewWindow() {
    chrome.windows.create(props, function(windowObj) {
        console.log(windowObj.tabs[0].id);
        chrome.runtime.sendMessage({text:"Hello"});
        console.log("Message fired");
    })
}

function sendMessage(message) {
    chrome.tabs.query(
        {currentWindow: true, active: true},
        function (tabArray) {
            //createNewWindow();
            //console.log("Sending a message");
            chrome.tabs.sendMessage(tabArray[0].id, {text: message, tabId:tabArray[0].id});
        }
    );
}


/*
function getCurrentlyHighlightedAndSend(){
    var text = "";
    if (window.getSelection()) {
        text = window.getSelection().toString();
        sendMessage(text);
    }
}*/

var contextMenuItem = {
    "id": "PlayerName",
    "title": "Search",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId = "playerName" && clickData.selectionText) {
        sendMessage(clickData.selectionText.toString());
    }
});

//setInterval(sendMessage, 500);
