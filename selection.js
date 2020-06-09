let injectedFrame;

async function requestHandler(request,sender,sendResponse){
    injectedFrame = new StatFrame("Giannis Antetokounmpo");
    //injectedFrame = new StatFrame(request.text);
    let currentDoc = document.body;
    currentDoc.append(injectedFrame.outerDiv);
    injectedFrame.setFrameContent();
    await injectedFrame.renderIFrame(injectedFrame);
    addEventListenerToTabs(injectedFrame);
}

function handlePerGameTab() {
    console.log("This ran?");
    injectedFrame.handlePerGameTab();
}

function handleTotalStatTab() {
    injectedFrame.handleTotalStatTab();
}

function handlePostSeasonTab() {
    injectedFrame.handlePostSeasonTab();
}

function handleExitButton() {
    injectedFrame.handleExitButton();
}

async function addEventListenerToTabs(obj) {
    let totalStatTab = obj.frame.contentWindow.document.getElementById("totalStat");
    let perGameTab = obj.frame.contentWindow.document.getElementById("perGame");
    let postSeasonTab = obj.frame.contentWindow.document.getElementById("postSeason");
    let exitButton = obj.frame.contentWindow.document.getElementById("exitButton");
    totalStatTab.addEventListener("click", this.handleTotalStatTab);
    perGameTab.addEventListener("click", this.handlePerGameTab);
    postSeasonTab.addEventListener("click", this.handlePostSeasonTab);
    exitButton.addEventListener("click", this.handleExitButton);
}



chrome.runtime.onMessage.addListener(requestHandler);


