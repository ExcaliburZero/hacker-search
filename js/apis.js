// Queries an api using a language and query and returns the first ten results.
function queryAPI (apiName, language, query) {
    var link = generateAPIUrl(apiName, language, query);
    var response = queryLink(link);
    var results = processResponse(apiName, response);
    return results;
}

// Queries a link and returns the JSON response.
function queryLink (link) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", link, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

//
// API Request URL Generation Functions
//

function generateAPIUrl(apiName, language, query) {
    var url;
    switch (apiName) {
        case "stack-overflow":
            url = generateStackOverflowLink(language, query);
            break;
    }
    return url;
}

function generateStackOverflowLink (language, query) {
    return "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=" + language + "&intitle=" + query + "&site=stackoverflow";
}

//
// API Request Processing Functions
//

function processResponse(apiName, response) {
    var content;
    switch (apiName) {
        case "stack-overflow":
            content = processStackOverFlowResponse(response);
            break;
    }
    return content;
}

function processStackOverFlowResponse(response) {
    var articleList = [];
    for (i = 0; i < 10; i++) {
        var item = response.items[i];
        articleList.push({
            link: item.link,
            title: item.title
        });
    }
    return articleList;
}
