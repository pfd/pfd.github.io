jQuery(function ($) {

    $.openMenu = false;

    landingOffserElements = [{
            id: "#mainLandingImg",
            class: "mainLandingImgMobileOffset"
        },
        {
            id: "#overMainImage",
            class: "overMainImageMobileOffset"
        },
        {
            id: "#split-content-container",
            class: "split-content-containerMobileOffser"
        }
    ];
    docsOffserElements = [{
            id: "#maincontent",
            class: "maincontentMobileOffset"
        },
        {
            id: ".side-bar",
            class: "side-barMobileOffset"
        },
        {
            id: ".sidebar",
            class: "sidebarMobileOffset"
        }
    ];

    function moveElements(applyOffset, layoutElements) {
        if (applyOffset) {
            // Opening menu, Add special offset class to all required elements
            layoutElements.forEach(element => {
                $(element.id).addClass(element.class);
            });
        } else {
            layoutElements.forEach(element => {
                $(element.id).removeClass(element.class);
            });
        }
    };

    $('#mobileMenuIcon').click(function () {
        const landingLayout = $('#mainLandingImg');
        const docsLayout = $('#maincontent');
        if (landingLayout.length) {
            moveElements(!$.openMenu, landingOffserElements);
        } else if (docsLayout.length) {
            moveElements(!$.openMenu, docsOffserElements);
        }
        $.openMenu = !$.openMenu;
    });
});

jQuery(function ($) {
    $('.navigation-list-toggle').on('click', function () {
        divHeight = $('.side-bar, #sidebar').height()
        if ($('.main-content').css('top') == "0px") {
            $('.main-content').css('top', divHeight);
            $('.right-side-bar').css('top', divHeight+126)
        } else {
            $('.main-content').css('top', '0');
            $('.right-side-bar').css('top', '9rem');
        }
    })
    $(window).resize(function(){
        if($(window).width() > 1120){
            $('.main-content').css('top','0');
            $('.right-side-bar').css('top', '9rem')
            $('.navigation').removeClass('nav-open');
            $('.js-main-nav-trigger').text('Menu');
        }
    })
})