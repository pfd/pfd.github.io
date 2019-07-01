jQuery(function($){
    var DATA_BASE_URL = 'https://data.jsdelivr.com/v1/package/npm/@sheerid/jslib';
    var CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/@sheerid/jslib@latest/';

    var latestVersion;
    var integrityHashes = {};

    var nodes = $(".language-html.highlighter-rouge .s").filter(':contains("'+CDN_BASE_URL+'")');

    function getLatestVersion() {
        return $.getJSON(DATA_BASE_URL).done(function(packageInfo) {
            latestVersion = packageInfo.tags.latest;
        });
    }

    function getIntegrityHashes() {
        return $.getJSON(DATA_BASE_URL + '@' + latestVersion).done(function(latestInfo) {
            latestInfo.files.forEach(function(fileInfo) {
                integrityHashes[fileInfo.name] = 'sha256-' + fileInfo.hash;
            });
        });
    }

    function replaceSnippets() {
        nodes.each(function(i, element) {
            element = $(element);
            var text = element.text();
            var file = RegExp(CDN_BASE_URL + '([^"]+)"').exec(text)[1];
            element.text(text.replace('@latest','@' + latestVersion));
            element.after(
                " ",
                $('<span class="na">integrity=</span>'),
                $('<span class="s">"' + integrityHashes[file] + '"</span>')
            );
        });
    }

    if (nodes.length) {
        getLatestVersion().then(getIntegrityHashes).then(replaceSnippets);
    }
});
