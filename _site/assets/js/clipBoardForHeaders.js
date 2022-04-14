jQuery(function($) {
    $( ":header" ).click(function(header) {
        const baseURI = header.target.baseURI.split('#')[0];
        const anchorLink = baseURI + "#" + header.target.id;
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(anchorLink).select();
        document.execCommand("copy");
        $temp.remove();

        alert('Link copied to clipboard ');
    });
});
