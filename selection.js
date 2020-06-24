let injectedFrame = null;
let clicked;
let mouseX;
let mouseY;
let topHalf;
let timer = 0;

async function requestHandler(request,sender,sendResponse){
    if (injectedFrame !== null) {
        handleExitButton();
    }
    injectedFrame = new StatFrame(request.text);
    let currentDoc = document.body;
    currentDoc.append(injectedFrame.outerDiv);
    injectedFrame.setFramePosition(mouseX, mouseY);
    injectedFrame.setFrameContent();
    injectedFrame.outerDiv.style.display = "none";
    await injectedFrame.renderIFrame(injectedFrame);
    addEventListenerToTabs(injectedFrame);
    changeDisplay();
}
//injectedFrame.finishedRendering value meaning
// 0 = player does not exist
// 1 = an error occurred when loading player's stat
// 2 = an error occurred when loading the player's basic info
// 3 = success
async function changeDisplay() {
    // console.log(injectedFrame.finishedRendering);
    if (timer == 10) {
        injectedFrame.renderErrorMessage(injectedFrame);
    }
    else if (injectedFrame.finishedRendering === 3) {
        injectedFrame.outerDiv.style.display = "block";
    } else {
        timer += 1;
        setTimeout(changeDisplay, 100);
    }
}

function handlePerGameTab() {
    injectedFrame.handlePerGameTab();
}

function handleTotalStatTab() {
    injectedFrame.handleTotalStatTab();
}

function handlePostSeasonTab() {
    injectedFrame.handlePostSeasonTab();
}

function handleExitButton() {
    let elementToRemove = document.getElementById("nbaSearchOuterDiv");
    if (injectedFrame && injectedFrame.frame && injectedFrame.contentDocument) {
        // injectedFrame.hideErrorMessage(injectedFrame);
        // // let resetErrorContainer = injectedFrame.frame.contentDocument.getElementById("errorContainer");
        // // if (resetErrorContainer !== null) {
        // //     resetErrorContainer.style.display = "none";
        // // }
    }
    if (elementToRemove !== null) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function handlePostSeasonPerGameTab() {
    injectedFrame.handlePostSeasonPerGameTab()
}

function addEventListenerToTabs(obj) {
    let totalStatTab = obj.frame.contentWindow.document.getElementById("totalStat");
    let perGameTab = obj.frame.contentWindow.document.getElementById("perGame");
    let postSeasonTab = obj.frame.contentWindow.document.getElementById("postSeason");
    let postSeasonPerGameTab = obj.frame.contentWindow.document.getElementById("postSeasonPerGame");
    let exitButton = obj.frame.contentWindow.document.getElementById("exitButton");
    exitButton.addEventListener("click", this.handleExitButton);
    totalStatTab.addEventListener("click", this.handleTotalStatTab);
    perGameTab.addEventListener("click", this.handlePerGameTab);
    postSeasonTab.addEventListener("click", this.handlePostSeasonTab);
    postSeasonPerGameTab.addEventListener("click", this.handlePostSeasonPerGameTab)
}

document.oncontextmenu = function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
};

chrome.runtime.onMessage.addListener(requestHandler);

