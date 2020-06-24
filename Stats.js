class StatFrame {
    constructor(playerName) {
        //typeDisplayed 0 =basic
        // 1 = advanced
        this.basicPlayerInfo = "";
        this.typeDisplayed = 1;
        this.data = "initialData";
        this.perGameData = "perGameData";
        this.playerID = -1;
        // this.findPlayerIDURL = "http://127.0.0.1:5000/findPlayerID";
        // this.url = "http://127.0.0.1:5000/playerData";
        // this.playerbasicInfoURL = "http://127.0.0.1:5000/basicPlayerInfo";
        // this.playerStatPerGameURL = "http://127.0.0.1:5000/playerDataPerGame";
        this.findPlayerIDURL = "https://nba-search.azurewebsites.net/findPlayerID";
        this.url = "https://nba-search.azurewebsites.net/playerData";
        this.playerbasicInfoURL = "https://nba-search.azurewebsites.net/basicPlayerInfo";
        // this.playerStatPerGameURL = "https://nbasearch-0406.herokuapp.com/playerDataPerGame";
        this.statChoiceDiv = document.createElement("div");
        this.statChoiceDiv.id = "statChoiceDiv";
        this.outerDiv = document.createElement("div");
        this.outerDiv.id = "nbaSearchOuterDiv";
        this.outerDiv.style.position = "absolute";
        this.outerDiv.style.zIndex = 9999;
        this.outerDiv.style.top = "0px";
        // this.outerDiv.style.display = "hidden";
        this.playerName = playerName;
        this.frame = document.createElement("iframe");
        this.frame.style.maxHeight = "300px";
        this.frame.style.maxWidth = "800px";
        // this.frame.style.marginTop = "200px";
        // this.frame.style.marginLeft = "300px";
        this.frame.style.minWidth = "400px";
        this.frame.id = "statFrame";
        this.frame.style.zIndex = 1;
        this.frame.style.position = "absolute";
        this.frame.style.height = "75vh";
        this.frame.style.width = "100vw";
        this.outerDiv.append(this.frame);
        this.iframeOuterContent = document.createElement("div");
        this.iframeOuterContent.id = "outerContainer";
        this.iframeContent = document.createElement("div");
        this.iframeContent.id = "tableWrapperDiv";
        this.iframeContent.style.overflow = "hidden";
        this.iframeContent.style.overflowX = "scroll";
        this.iframeHeaderDiv = document.createElement("div");
        this.iframeHeaderDiv.style.display = "flex";
        this.iframeHeaderDiv.style.height = "35vh";
        this.iframeHeaderDiv.style.width = "100vw";
        this.exitHeader = document.createElement("div");
        this.exitButton = document.createElement("button");
        this.exitButton.id = "exitButton";
        this.exitButton.style.borderRadius = "60%";
        this.exitButton.style.textAlign = "center";
        this.exitButton.style.border = "none";
        this.exitButton.style.cssFloat = "right";
        this.exitButton.style.color ="black";
        this.exitButton.innerText = "x";
        this.statTemplate = '<body>\n' +
            '<table style = "width:100%; border:1px solid black" id="statTable" \n' +
            '</table>\n'+
            '</body>\n';
        this.statChoiceDivTemplate = "<ul id = \"statChoice\" class=\"nav nav-tabs nav-justified\">\n" +
            "  <li id = \"totalStat\" class=\"active\"><a>Total Stats</a></li>\n" +
            "  <li id = \"perGame\"><a>Per Game</a></li>\n" +
            "  <li id = \"postSeason\"><a>Playoff</a></li>\n" +
            "  <li id = \"postSeasonPerGame\"><a>Playoff Per Game</a></li>\n" +
            // "  <li id = \"accolades\"><a>Accolades</a></li>\n" +
            "</ul>";
        this.currentActiveTab = 0;
        this.teamLogoJsonLookup = "Ya yeet";
        this.setTeamLogoFunction(this);
        this.exitHeader.append(this.exitButton);
        this.statChoiceDiv.innerHTML = this.statChoiceDivTemplate;
        this.iframeContent.innerHTML = this.statTemplate;
        this.iframeOuterContent.append(this.statChoiceDiv);
        this.iframeOuterContent.append(this.iframeContent);
        this.finishedRendering = 0;
    }

    showFrame(obj) {
        obj.outerDiv.style.display = "block";
    }

    returnFrame() {
        return this.frame;
    }

    returnIFrameContent() {
        return this.iframeContent;
    }

    setFramePosition(mouseX, mouseY) {
        mouseY += 20;
        this.frame.style.top = mouseY +'px';
        this.frame.style.left = mouseX + 'px';
    }

    setFrameContent() {
        let bootStrapLink = document.createElement("link");
        bootStrapLink.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
        bootStrapLink.rel = "stylesheet";
        let jQueryScript = document.createElement("script");
        jQueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
        let bootStrapJS = document.createElement("script");
        bootStrapJS.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
        let myCSSLink = document.createElement("link");
        myCSSLink.href = chrome.runtime.getURL("NBASearch.css");
        myCSSLink.rel = "stylesheet";
        let NBALogoCSSLink = document.createElement("link");
        NBALogoCSSLink.href = chrome.runtime.getURL("NBALogo.css");
        NBALogoCSSLink.rel = "stylesheet";
        this.frame.contentDocument.head.append(NBALogoCSSLink);
        this.frame.contentDocument.head.append(myCSSLink);
    }

    async setTeamLogoFunction(obj) {
        let urlToFetch = chrome.runtime.getURL("teamLogo.json");
        await $.get(urlToFetch).done(function(data) {
            obj.teamLogoJsonLookup = data;
        });
    }

    handlePerGameTab() {
        //this.getPlayerStatsPerGameFromAPI(this);
        this.processStatTablePerGame(this);
    }

    handleTotalStatTab() {
        //this.getPlayerTotalStatFromAPI(this);
        this.processTotalStatButton(this);
    }

    handlePostSeasonTab() {
        this.processPostSeasonButton(this);
    }

    handleExitButton() {
        this.frame.style.display = "none";
    }

    handlePostSeasonPerGameTab() {
        this.processPostSeasonPerGame(this);
    }

    populateBasicPlayerInfo(obj) {
        let basicPlayerInfo = obj.basicPlayerInfo;
        //Add player height
        let selectedDiv = obj.frame.contentDocument.getElementById("playerHeightValue");
        selectedDiv.innerText = basicPlayerInfo['Height'];
        //Team background
        selectedDiv = obj.frame.contentDocument.getElementById("playerBasicInformationContainer");
        let teamAbbrev = basicPlayerInfo['Team Abbreviation'];
        selectedDiv.classList = [teamAbbrev];
        //Weight
        selectedDiv = obj.frame.contentDocument.getElementById("playerWeightValue");
        selectedDiv.innerText = basicPlayerInfo['Weight'] + " lbs";
        //Draft
        selectedDiv = obj.frame.contentDocument.getElementById("playerDraftValue");
        let draftYear = basicPlayerInfo['Draft Year'];
        let draftPick = basicPlayerInfo['Draft Number'];
        let draftRound = basicPlayerInfo['Draft Round'];
        selectedDiv.innerText = draftYear + " Rnd " + draftRound + " Pick " + draftPick;
        //DOB
        selectedDiv = obj.frame.contentDocument.getElementById("playerDOBValue");
        selectedDiv.innerText = basicPlayerInfo['DOB'].slice(0,10);
        //Age
        let currentYear = new Date().getFullYear();
        let birthYear = parseInt(basicPlayerInfo['DOB'].slice(0,4));
        let age = currentYear - birthYear;
        selectedDiv = obj.frame.contentDocument.getElementById("playerAgeValue");
        selectedDiv.innerText = age;
        //Experience
        draftYear = parseInt(draftYear);
        let exp = currentYear - draftYear;
        selectedDiv = obj.frame.contentDocument.getElementById("playerExperienceValue");
        selectedDiv.innerText = exp + " years";
        //Team
        selectedDiv = obj.frame.contentDocument.getElementById("playerTeamValue");
        // console.log(basicPlayerInfo);
        let teamCity = basicPlayerInfo['Team City'];
        let teamName = basicPlayerInfo['Team Name'];
        selectedDiv.innerText = teamCity + " " + teamName;
        //Team Jersey
        selectedDiv = obj.frame.contentDocument.getElementById("playerJerseyNumber");
        selectedDiv.innerText = '#' + basicPlayerInfo['Jersey'];
        //Player Name
        selectedDiv = obj.frame.contentDocument.getElementById("playerName");
        selectedDiv.innerText = obj.playerName;
        //Player Headshot
        selectedDiv = obj.frame.contentDocument.getElementById("playerHeadShotImg");
        let teamId = basicPlayerInfo['Team ID'];
        let playerID = basicPlayerInfo['playerID'];
        let active = basicPlayerInfo['Active'];
        if (active) {
            let imageSrc = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/" + teamId + '/2019/260x190/' + playerID + '.png';
            selectedDiv.src = imageSrc;
        } else {
            let imageSrc = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +  playerID + ".png";
            selectedDiv.src = imageSrc;
        }
        //Add PTS
        selectedDiv = obj.frame.contentDocument.getElementById("playerPTSValue");
        selectedDiv.innerText = obj.data['regular_season_per_game'][0][3];
        //Add AST
        selectedDiv = obj.frame.contentDocument.getElementById("playerASTValue");
        selectedDiv.innerText = obj.data['regular_season_per_game'][0][4];
        //Add RB
        selectedDiv = obj.frame.contentDocument.getElementById("playerRBValue");
        selectedDiv.innerText = obj.data['regular_season_per_game'][0][7];
        obj.finishedRendering += 1;
    }

    checkIfImageExist(image_url) {

        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;
    }


    processPlayerInfo(obj) {
        obj.populateBasicPlayerInfo(obj);
    }

    processStatTable(obj) {
        obj.hideErrorMessage(obj);
        let jsonData = obj.data;
        let regularSeasonStat = jsonData['regular_season'];
        if (obj.typeDisplayed === 0) {
        } else {
            obj.addAdvancedStatHeader(obj);
        }
        for (let i = regularSeasonStat.length-1; i >= 0; i --) {
            let ar = regularSeasonStat[i];
            obj.addStatTableRow(obj, ar);
        }
        obj.finishedRendering += 2;
    }

    processPostSeasonPerGame(obj) {
        let postSeasonPerGameStat = obj.data['post_season_per_game']
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i = postSeasonPerGameStat.length -1; i >= 0; i--) {
            let ar = postSeasonPerGameStat[i];
            let selectedData = ar;
            obj.addStatTableRow(obj, selectedData, newIframeContent);
        }
        obj.setTabActive(obj, 3);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    processStatTablePerGame(obj) {
        // let jsonData = obj.perGameData;
        // let regularSeasonPerGameStat = jsonData.resultSets[0].rowSet;
        let regularSeasonPerGameStat = obj.data['regular_season_per_game'];
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i = regularSeasonPerGameStat.length-1; i >= 0; i --) {
            let ar = regularSeasonPerGameStat[i];
            // let selectedData = obj.selectAdvancedStat(ar);
            let selectedData = ar;
            obj.addStatTableRow(obj, selectedData,newIframeContent);
        }
        obj.setTabActive(obj, 1);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    processTotalStatButton(obj) {
        // let jsonData = obj.data;
        // let regularSeasonPerGameStat = jsonData.resultSets[0].rowSet;
        let regularSeasonPerGameStat = obj.data['regular_season'];
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i = regularSeasonPerGameStat.length-1; i >= 0; i --) {
            let ar = regularSeasonPerGameStat[i];
            // let selectedData = obj.selectAdvancedStat(ar);
            let selectedData = ar;
            obj.addStatTableRow(obj, selectedData,newIframeContent);
        }
        obj.setTabActive(obj, 0);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    processPostSeasonButton(obj) {
        // let jsonData = obj.data;
        // let regularSeasonPerGameStat = jsonData.resultSets[2].rowSet;
        let regularSeasonPerGameStat = obj.data['post_season'];
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i = regularSeasonPerGameStat.length-1; i >= 0; i --) {
            let ar = regularSeasonPerGameStat[i];
            // let selectedData = obj.selectAdvancedStat(ar);
            let selectedData = ar;
            obj.addStatTableRow(obj, selectedData,newIframeContent);
        }
        obj.setTabActive(obj, 2);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    setTabActive(obj,tabId) {
        // 0 = totalStat
        // 1 = perGame
        // 2 = postSeason
        // 3 = postSeason Per Game
        // 4 = Accolades
        let totalStatTab = this.frame.contentWindow.document.getElementById("totalStat");
        let perGameTab = this.frame.contentWindow.document.getElementById("perGame");
        let postSeasonTab = this.frame.contentWindow.document.getElementById("postSeason");
        // let accoladesTab = this.frame.contentWindow.document.getElementById("accolades");
        let postSeasonPerGameTab = this.frame.contentWindow.document.getElementById("postSeasonPerGame");
        // let arrayOfTabs = [totalStatTab, perGameTab, postSeasonTab, postSeasonPerGameTab, accoladesTab];
        let arrayOfTabs = [totalStatTab, perGameTab, postSeasonTab, postSeasonPerGameTab];
        arrayOfTabs[obj.currentActiveTab].classList.remove("active");
        arrayOfTabs[tabId].classList.add("active");
        obj.currentActiveTab = tabId;
    }

    selectAdvancedStat(ar) {
        let indexList = [1,5,4,26,21,23,22,20,24,6,7,8,9,10,11,13,14,15,16,17,18,19];
        let selectedStat = [];
        for (let i = 0; i < indexList.length; i ++) {
            selectedStat.push(ar[indexList[i]]);
        }
        return selectedStat;
    }

    addBasicStatHeader(obj) {
        let basicStatHeader = ['Season', 'Age', 'Team', 'PTS', 'AST', 'BLK', 'STL', 'RBD'];
        obj.addTableHeader(obj, basicStatHeader)
    }

    addAdvancedStatHeader(obj, iframeContent) {
        let advancedStatHeader = ['Season', 'Age', 'Team', "PTS", "AST", "BLK", "STL", "RBD", "TOV","GP", "GS", "MIN", "FGM", "FGA", "FG%", "3PA", "3P%", "FTM", "FTA", "FT%", "ORBD", "DRBD"];
        obj.addTableHeader(obj, advancedStatHeader, iframeContent);
    }

    addTableHeader(obj,ar,iframeContent) {
        let newTableRow = document.createElement("tr");
        let foundIframeContent = this.frame.contentDocument.getElementById("tableWrapperDiv");
        for (let i =0; i < ar.length; i ++) {
            let newTableHeader = document.createElement("th");
            newTableHeader.innerText = " " + ar[i] + "  ";
            newTableRow.appendChild(newTableHeader);
        }
        if (iframeContent == null) {
            foundIframeContent.appendChild(newTableRow);
        } else {
            iframeContent.appendChild(newTableRow);
        }
    }

    addStatTableRow(obj,ar,newIframeContent) {
        let newTableRow = document.createElement("tr");
        let iframeContent = this.frame.contentDocument.getElementById("tableWrapperDiv");
        newTableRow.style.border = "1px solid black";
        for (let i =0; i < ar.length; i++) {
            let innerTextData = ar[i];
            let newTableData = document.createElement("td");
            if (innerTextData === null) {
                innerTextData = 0;
            }
            newTableData.innerText = " " + innerTextData + "  ";
            newTableRow.appendChild(newTableData);
        }
        if (newIframeContent == null) {
            iframeContent.appendChild(newTableRow);
        } else {
            newIframeContent.appendChild(newTableRow);
        }
    }

    applyStyleSheet(obj) {
        obj.frame.contentDocument;
        let style = document.createElement("style");
        style.type = 'text/css';
    }

    renderErrorMessage(obj) {
        // let tableWrapperDiv = obj.frame.contentDocument.getElementById("tableWrapperDiv");
        let errorContainer = obj.frame.contentDocument.getElementById("errorContainer");
        if (obj.finishedRendering == 0) {
            // Player_id not found
            errorContainer.innerText = "Sorry this player do not exist. \n Please try to refresh the search."
        } else if (obj.finishedRendering == 1) {
            // error occurred loading player stats
            errorContainer.innerText = "There was a problem loading this player's stat. \nPlease try to refresh the search."
        } else if (obj.finishedRendering == 2) {
            //error occurred loading player basic information
            errorContainer.innerText = "There was a probme loading this player's career stat.\n Please try to refresh the search."
        } else {
            //Not sure what broke
        }
        errorContainer.style.display = "block";
        obj.outerDiv.style.display = "block";
    }

    hideErrorMessage(obj) {
        // let errorContainer = obj.frame.contentDocument.getElementById("errorContainer");
        let errorContainer = this.frame.contentDocument.getElementById("errorContainer");
        errorContainer.style.display = "none";    }
    

    async getPlayerStatFromAPI(obj){
        let d = {
            playerID: obj.playerID
        };
        await $.post(this.url, d).done(function(data) {
            obj.data =(data);
            obj.processStatTable(obj);
        });
    };

    async getPlayerStatsPerGameFromAPI(obj) {
        // let d = {
        //     playerName: this.playerName
        // };
        let d = {
            playerID: obj.playerID
        };
        await $.post(this.playerStatPerGameURL, d).done(function(data){
            obj.perGameData = JSON.parse(data);
        })
    }

    async getPlayerBasicInfoFromAPI(obj) {
        let d = {
            playerID: obj.playerID
        };
        await $.post(this.playerbasicInfoURL,d).done(function(data) {
            obj.basicPlayerInfo = (data);
            obj.populateBasicPlayerInfo(obj);
        });
    };

    async renderIFrame(obj) {
        await obj.getHtmlFromServer(obj);
    }

    async findPlayerID(obj) {
        let d = {
            playerName: obj.playerName
        };
        await $.post(this.findPlayerIDURL,d).done(function(data) {
            obj.playerID = data.playerID;
            obj.playerName = data.playerName;
            if (data !== null) {
                obj.getPlayerStatFromAPI(obj);
                obj.getPlayerBasicInfoFromAPI(obj);
            } else {
                obj.renderErrorMessage(obj);
            }
        });
    }

    async getHtmlFromServer(obj) {
        let urlToFetch = chrome.runtime.getURL("NBASearch.html");
        await $.get(urlToFetch).done(function(data) {
            obj.frame.contentDocument.body.innerHTML = data;
            // obj.hideErrorMessage(obj);
            obj.findPlayerID(obj);
        }, "text");
    }
}
