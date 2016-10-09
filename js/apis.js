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
        case "Stack Overflow":
            url = generateStackOverflowLink(language, query);
            break;
        case "Github Issues":
            url = generateGitHubIssuesLink(language, query);
            break;
        case "Github Repositories":
            url = generateGitHubLink(language, query);
            break;    
    }
    return url;
}

function generateStackOverflowLink (language, query) {
    return "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=" + language + "&intitle=" + query + "&site=stackoverflow";
}

function generateGitHubLink (language, query)   {
    return "https://api.github.com/search/repositories?q=" + query + "+language:" + language + "&sort=stars&order=desc";
}

function generateGitHubIssuesLink (language, query) {
    return "https://api.github.com/search/issues?q=" + query + "+language:" + language + "+state:open&sort=created&order=asc";
}
//
// API Request Processing Functions
//

function processResponse(apiName, response) {
    var content;
    var temp;
    switch (apiName) {
        case "Stack Overflow":
            content = processStackOverFlowResponse(response);
            break;
        case "Github Issues":
            content = processGitHubIssuesResponse(response);
            break;
        case "Github Repositories": 
            content = processGitHubResponse(response);
            break;    
    }
    return content;
}

function processStackOverFlowResponse(response) {
    var articleList = [];
    var items = response.items.length;
    if (items > 10) {
        items = 10;
    }
    for (i = 0; i < items; i++) {
        var item = response.items[i];
        articleList.push({
            link: item.link,
            title: ((item.title.length > 70) ? (item.title.substring(0, 70) + "...") : item.title)
        });
    }
    return articleList;
}

function processGitHubIssuesResponse(response)    {
        var articleList = [];
        for (i = 0; i < 10; i++)    {
            var item = response.items[i];
            articleList.push({
                link: item.html_url,
                title: ((item.title.length > 70) ? (item.title.substring(0, 70) + "...") : item.title)
            });
      }
      return articleList;
}

function processGitHubResponse(response)    {
    var articleList = [];
    var temp;
    var items = response.total_count;
    if (items > 10) {
        items = 10;
    }
    for (i = 0; i < items; i++)    {
        var item = response.items[i];
        articleList.push({
            link: item.html_url,
            title: (((item.name + ": " + item.description).length > 70) ? ((item.name + ": " + item.description).substring(0, 70) + "...") : (item.name + ": " + item.description))
        });
    }
    return articleList;
}
