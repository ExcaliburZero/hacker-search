function resultsToLi(result)  {
    return "<li><a href=\"" + result.link + "\">" + result.title + "</a></li>";
}

// Returns the url variables
// From http://papermashup.com/read-url-get-variables-withjavascript/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var nextBox = 0;
var nextRow = 0;
function generateBox(results, name) {
    var box = '<div id="box' + nextBox + '" class="col-sm-6">';
    box = box + '<div class="panel panel-primary">';
    box = box + '<div class="panel-heading">' + name + '</div>';
    box = box + '<div id="listBox' + nextBox + '" class="panel-body">';
    box = box + generateListElements(results) + '</div>';
    box = box + "</div>";
    box = box + "</div>";

    $("#results-div").append(box);
    nextBox++;
}

function generateListElements(results) {
    var listElements = results.map( resultsToLi );
    var joinElements = listElements.join("");
    var htmlElements = "<ul>" + joinElements + "</ul>";
    return htmlElements
}

$.getScript('js/apis.js', function(){

    var urlValues = getUrlVars();
    var language = urlValues["language"];
    var query = urlValues["query"];

    var apis = [
          "Stack Overflow"
        , "Github Issues"
        , "Github Repositories"
    ];

    for (j = 0; j < apis.length; j++) {
        var api = apis[j];
        var id = "listBox" + (j + 1);
        var queryResults = queryAPI(api, language, query);
        if (queryResults.length > 0) {
            generateBox(queryResults, api);
        }
    }
});
