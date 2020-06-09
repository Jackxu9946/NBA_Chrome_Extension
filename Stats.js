class StatFrame {
    constructor(playerName) {
        //typeDisplayed 0 =basic
        // 1 = advanced
        this.basicPlayerInfo = "";
        this.typeDisplayed = 1;
        this.data = "initialData";
        this.perGameData = "perGameData";
        this.url = "http://127.0.0.1:5000/playerData";
        this.playerbasicInfoURL = "http://127.0.0.1:5000/basicPlayerInfo";
        this.playerStatPerGameURL = "http://127.0.0.1:5000/playerDataPerGame";
        this.statChoiceDiv = document.createElement("div");
        this.statChoiceDiv.id = "statChoiceDiv";
        this.outerDiv = document.createElement("div");
        this.outerDiv.id = "outerDiv";
        this.outerDiv.style.position = "absolute";
        this.outerDiv.style.zIndex = 9999;
        this.playerName = playerName;
        this.frame = document.createElement("iframe");
        this.frame.style.maxHeight = "600px";
        this.frame.style.maxWidth = "800px";
        this.frame.style.marginTop = "200px";
        this.frame.style.marginLeft = "300px";
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

        //this.exitHeader.innerText = "Exit";
        this.statTemplate = '<body>\n' +
            '<table style = "width:100%; border:1px solid black" id="statTable" \n' +
            '</table>\n'+
            '</body>\n';
        this.statChoiceDivTemplate = "<ul id = \"statChoice\" class=\"nav nav-tabs nav-justified\">\n" +
            "  <li id = \"totalStat\" class=\"active\"><a>Total Stats</a></li>\n" +
            "  <li id = \"perGame\"><a>Per Game</a></li>\n" +
            "  <li id = \"postSeason\"><a>Playoff</a></li>\n" +
            "  <li id = \"postSeasonPerGame\"><a>Playoff Per Game</a></li>\n" +
            "  <li id = \"accolades\"><a>Accolades</a></li>\n" +
            "</ul>";
        this.currentActiveTab = 0;
        this.teamLogoJsonLookup = "Ya yeet";
        this.setTeamLogoFunction(this);
        this.exitHeader.append(this.exitButton);
        this.statChoiceDiv.innerHTML = this.statChoiceDivTemplate;
        this.iframeContent.innerHTML = this.statTemplate;
        this.iframeOuterContent.append(this.statChoiceDiv);
        this.iframeOuterContent.append(this.iframeContent);
    }

    returnFrame() {
        return this.frame;
    }

    returnIFrameContent() {
        return this.iframeContent;
    }

    setFrameContent() {
        //this.frame.contentDocument.body.append(this.exitHeader);
        //this.frame.contentDocument.body.append(this.iframeHeaderDiv);
        //this.frame.contentDocument.body.append(this.iframeOuterContent);
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
        this.frame.contentDocument.head.append(myCSSLink);
        //this.frame.contentDocument.head.append(bootStrapJS);
        //this.frame.contentDocument.head.append(bootStrapLink);
        //this.frame.contentDocument.head.append(jQueryScript);
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

    // createHeaderDivContent(obj) {
    //     // let headerDiv = document.createElement("div");
    //     // obj.headerDiv = headerDiv;
    //     // headerDiv.id = "pictureHeader";
    //     // let imgElement = document.createElement("img");
    //     // imgElement.src = "https://d2cwpp38twqe55.cloudfront.net/req/202005142/images/players/jamesle01.jpg";
    //     // //imgElement.src = "https://stats.nba.com/media/img/teams/logos/BOS_logo.svg";
    //     // imgElement.style.width = "auto";
    //     // imgElement.style.height = "100%";
    //     // headerDiv.appendChild(imgElement);
    //     // headerDiv.style.height = "100%";
    //     // headerDiv.style.width = "25%";
    //     // headerDiv.style.maxWidth = "200px";
    //     // headerDiv.style.maxHeight = "150px";
    //     // let playerBasicInfoDiv = document.createElement("div");
    //     // obj.playerBasicInfoDiv = playerBasicInfoDiv;
    //     // playerBasicInfoDiv.id = "playerBasicInfo";
    //     // playerBasicInfoDiv.style.display = "grid";
    //     // playerBasicInfoDiv.style.gridTemplateRows = "repeat(3,1fr)";
    //     // playerBasicInfoDiv.style.gridTemplateColumns = "repeat(4,1fr)";
    //     // this.iframeHeaderDiv.append(headerDiv);
    //     // this.iframeHeaderDiv.append(playerBasicInfoDiv);
    //     this.populateBasicPlayerInfo(obj);
    // }

    populateBasicPlayerInfo(obj) {
        //Basic player info is in this order
        //DOB -> Country -> First Last Name -> Draft # -> Draft_Round -> Draft_Year -> Height -> Jersey -> Position -> Team Name -> Weight
        let playerBasicInfoDiv = obj.playerBasicInfoDiv;
        let basicPlayerInfo = obj.basicPlayerInfo;
        let x;
        for (x in basicPlayerInfo) {
            let basicNewHeaderDiv = document.createElement("div");
            let innerVal = x + ": " + basicPlayerInfo[x];
            if (x === "DOB") {
                //console.log(basicPlayerInfo[x].slice(0,10));
                innerVal = x + ": " + basicPlayerInfo[x].slice(0,10);
            }
            basicNewHeaderDiv.innerText = innerVal;
            basicNewHeaderDiv.style.fontSize = "10";
            playerBasicInfoDiv.append(basicNewHeaderDiv);
        }
    }


    processPlayerInfo(obj) {
        obj.populateBasicPlayerInfo(obj);
        //obj.createHeaderDivContent(obj);
    }

    processStatTable(obj) {
        let jsonData = JSON.parse(obj.data);
        obj.data = jsonData;
        let regularSeasonStat = jsonData.resultSets[0].rowSet;
        if (obj.typeDisplayed === 0) {
            // obj.addBasicStatHeader(obj);
        } else {
            obj.addAdvancedStatHeader(obj);
        }
        for (let i = 0; i < regularSeasonStat.length; i ++) {
            let ar = regularSeasonStat[i];
            let selectedData;
            if (obj.typeDisplayed === 0) {
                // selectedData = obj.selectBasicStat(ar);
            } else {
                selectedData = obj.selectAdvancedStat(ar);
            }
            obj.addStatTableRow(obj, selectedData);
        }
    }

    processStatTablePerGame(obj) {
        let jsonData = obj.perGameData;
        //obj.perGameData = jsonData;
        let regularSeasonPerGameStat = jsonData.resultSets[0].rowSet;
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i =0; i < regularSeasonPerGameStat.length; i ++) {
            let ar = regularSeasonPerGameStat[i];
            let selectedData = obj.selectAdvancedStat(ar);
            obj.addStatTableRow(obj, selectedData,newIframeContent);
        }
        //obj.iframeContent.remove();
        //obj.iframeContent = newIframeContent;
        obj.setTabActive(obj, 1);
        //obj.iframeOuterContent.append(obj.iframeContent);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    processTotalStatButton(obj) {
        let jsonData = obj.data;
        // console.log("TotalTabButton");
        // console.log(jsonData);
        //obj.data = jsonData;
        let regularSeasonPerGameStat = jsonData.resultSets[0].rowSet;
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i =0; i < regularSeasonPerGameStat.length; i ++) {
            let ar = regularSeasonPerGameStat[i];
            let selectedData = obj.selectAdvancedStat(ar);
            obj.addStatTableRow(obj, selectedData,newIframeContent);
        }
        //obj.iframeContent.remove();
        //obj.iframeContent = newIframeContent;
        obj.setTabActive(obj, 0);
        //obj.iframeOuterContent.append(obj.iframeContent);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    processPostSeasonButton(obj) {
        //let jsonData = JSON.parse(obj.data);
        //obj.data = jsonData;
        let jsonData = obj.data;
        let regularSeasonPerGameStat = jsonData.resultSets[2].rowSet;
        //console.log(regularSeasonPerGameStat);
        let newIframeContent = document.createElement("div");
        newIframeContent.id = "tableWrapperDiv";
        newIframeContent.style.overflow = "hidden";
        newIframeContent.style.overflowX = "scroll";
        newIframeContent.innerHTML = obj.statTemplate;
        obj.addAdvancedStatHeader(obj, newIframeContent);
        for (let i =0; i < regularSeasonPerGameStat.length; i ++) {
            let ar = regularSeasonPerGameStat[i];
            let selectedData = obj.selectAdvancedStat(ar);
            obj.addStatTableRow(obj, selectedData,newIframeContent);
        }
        //obj.iframeContent.remove();
        //obj.iframeContent = newIframeContent;
        obj.setTabActive(obj, 2);
        //obj.iframeOuterContent.append(obj.iframeContent);
        let iframeOuterContent = this.frame.contentDocument.getElementById("outerContainer");
        let oldIframeTable = this.frame.contentDocument.getElementById("tableWrapperDiv");
        oldIframeTable.remove();
        iframeOuterContent.append(newIframeContent);
    }

    setTabActive(obj,tabId) {
        // 0 = totalStat
        // 1 = perGame
        // 2 = postSeason
        // 3 = accolades
        let totalStatTab = this.frame.contentWindow.document.getElementById("totalStat");
        let perGameTab = this.frame.contentWindow.document.getElementById("perGame");
        let postSeasonTab = this.frame.contentWindow.document.getElementById("postSeason");
        let accoladesTab = this.frame.contentWindow.document.getElementById("accolades");
        let arrayOfTabs = [totalStatTab, perGameTab, postSeasonTab,accoladesTab];
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
        let advancedStatHeader = ['Season', 'Age', 'Team', "PTS", "AST", "BLK", "STL", "RBD", "TOV","GP", "GS", "MIN", "FGM", "FGA", "FG%", "3PA", "3P%", "FTM", "FTA", "FT%", "ORDB", "DRBD"];
        obj.addTableHeader(obj, advancedStatHeader, iframeContent);
    }

    addTableHeader(obj,ar,iframeContent) {
        let newTableRow = document.createElement("tr");
        let foundIframeContent = this.frame.contentDocument.getElementById("tableWrapperDiv");
        for (let i =0; i < ar.length; i ++) {
            let newTableHeader = document.createElement("th");
            // newTableHeader.style.border = "1px solid black";
            // newTableHeader.style.padding = "5px";
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
            let newTableData = document.createElement("td");
            newTableData.innerText = " " + ar[i] + "  ";
            newTableRow.appendChild(newTableData);
        }
        if (newIframeContent == null) {
            //obj.iframeContent.appendChild(newTableRow);
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
    

    async getPlayerStatFromAPI(obj){
        let d = {
            playerName: this.playerName
        };
        await $.post(this.url, d).done(function(data) {
            obj.data =(data);//func1(obj);
            obj.processStatTable(obj);
        });
    };

    //
    // async getPlayerTotalStatFromAPI(obj) {
    //     let d = {
    //         playerName: this.playerName
    //     };
    //     await $.post(this.url, d).done(function(data) {
    //         obj.data =(data);//func1(obj);
    //     });
    // };

    async getPlayerStatsPerGameFromAPI(obj) {
        let d = {
            playerName: this.playerName
        };
        await $.post(this.playerStatPerGameURL, d).done(function(data){
            obj.perGameData = JSON.parse(data);
        })
    }

    async getPlayerBasicInfoFromAPI(obj) {
        let d = {
            playerName: this.playerName
        };
        await $.post(this.playerbasicInfoURL,d).done(function(data) {
            obj.basicPlayerInfo = JSON.parse(data);
        });
    };

    async renderIFrame(obj) {
        await obj.getHtmlFromServer(obj);
    }

    async getHtmlFromServer(obj) {
        let urlToFetch = chrome.runtime.getURL("NBASearch.html");
        await $.get(urlToFetch).done(function(data) {
            obj.frame.contentDocument.body.innerHTML = data;
            obj.getPlayerStatFromAPI(obj);
            obj.getPlayerStatsPerGameFromAPI(obj);
        }, "text");
    }
}
