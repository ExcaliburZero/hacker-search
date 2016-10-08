// Queries a link and returns the JSON response.
function queryAPI (link) {
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
        case "github-repositories":
            url = generateGitHubLink(language, query);
            break;
        case "github-issues":
            url = generateGitHubIssuesLink(language, query);
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
    switch (apiName) {
        case "stack-overflow":
            content = processStackOverFlowResponse(response);
            break;
        case "git-hub":
            content = processGitHubResponse(response);
            break;
        case "git-hub-issues":
            content = processGitHubIssuesResponse(response);
            break;
    }
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

function processGitHubResponse(response)    {
    var articleList = [];
    for (i = 0; i < 10; i++)    {
        var item = response.items[i];
        articleList.push({
            link: item.html_url,            
            title: item.name + ": " + item.description
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
                title: item.title
            });
      }
      return articleList;
}

