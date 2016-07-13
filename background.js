var active = true;

chrome.browserAction.onClicked.addListener(
    function(tab) {
        active = !active;
        chrome.browserAction.setTitle({
            title: active ? 'Debugger is running - check the console' : 'Debugger is Off - click to activate'
        });
        chrome.browserAction.setIcon({
            path: active ? 'icon128.png' : 'icon128off.png'
        });
    }
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {   
        if (active) { 
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if( details.method === "POST"){
                    var post = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)));
                    var postData = prepData(post);
                    var data = { "url": details.url, "method": "POST", "data": postData };
                    chrome.tabs.sendMessage(tabs[0].id, data);
                } else {
                    var postData = prepData(details.url.split('?')[1]);
                    var data = { "url": details.url.split('?')[0], "method": "GET", "data": postData };
                    chrome.tabs.sendMessage(tabs[0].id, data);
                }
            });
        }
    },  
    { 
        urls: ["*://*/b/ss/*"] 
    },
    ['requestBody']
);

function prepData(input){
    var z = decodeURIComponent(input);
    var a = {};
    var b = z.split('&');
    for( i=0; i<b.length; i++ ){
        var c = b[i].split('=');
        a[c[0]] = c[1];
    }
    return a;
}