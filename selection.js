let statTemplate = '<body>\n' +
    '    <table style = "width:100%" id="statTable">\n' +
    '        <tr>\n' +
    '            <th>Year</th>'+
    '            <th>PTS</th>\n'+
    '            <th>AST</th>\n'+
    '            <th>BLK</th>\n'+
    '        </tr>\n'+
    '    </table>\n'+
    '</body>\n';
let injectedFrame = new StatFrame("Lebron James");

function requestHandler(request,sender,sendResponse){
    //console.log(1);
    let currentDoc = document.body;
    currentDoc.append(injectedFrame.outerDiv);
    injectedFrame.setFrameContent();
    injectedFrame.getPlayerStatFromAPI(injectedFrame);


}

 chrome.runtime.onMessage.addListener(requestHandler);


