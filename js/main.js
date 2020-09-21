function setCenterPageBoxTop() {
    var centerPageBox = $('.center-page-box');

    if($(window).width() > 814) {
        centerPageBox.css('top', $(window).height() / 2 - $('.center-page-box').height() / 2);
    } else {
        centerPageBox.css('top', '0');
    }
}

function adjustBoxWidths() {
    if(window.localStorage.getItem('activePage') === '#education') {
        $('.extracurricular-grid').css('width', $('#education .large-box').innerWidth() + 'px');
    }
}

function setupCenterBoxes() {
    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#about';
    }

    $('.center-page-box').each(function(index, value) {
        if($(this).is($(activePage))) {
            $(this).css('left', '50%');
        }
    });
}

function goToDataLink() {
    window.open($(this).data('link'), '_blank');
}

$(document).ready(() => {
    setCenterPageBoxTop();
    adjustBoxWidths();
    setupCenterBoxes();

    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#about';
    }

    $('a[href="' + activePage + '"]').click();
});

$(window).resize(() => {
    setCenterPageBoxTop();
    adjustBoxWidths();

    if($(window).width() > 991) {
        $('.navbar').removeClass('expanded');
        $('.navbar-collapse').removeClass('expanded');
    } else if($('.navbar-collapse').hasClass('show')) {
        $('.navbar').addClass('expanded');
        $('.navbar-collapse').addClass('expanded');
    }
});

$('.navbar-collapse').on('show.bs.collapse', () => {
    $('.navbar').addClass('expanded');
});

$('.navbar-collapse').on('shown.bs.collapse', () => {
    $('.navbar-collapse').addClass('expanded');
});

$('.navbar-collapse').on('hide.bs.collapse', () => {
    $('.navbar').removeClass('expanded');
    $('.navbar-collapse').removeClass('expanded');    
});

$('.navbar-nav > li > a').click(() => {
    $('.navbar-collapse').collapse('hide');
});

$('.navbar-brand').click(() => {
    $('.navbar-collapse').collapse('hide');
});

$('.navbar a').click(function(e) {
    if($(this)[0].hash !== "") {
        e.preventDefault();

        var prevActivePage = window.localStorage.getItem('activePage');

        window.localStorage.setItem('activePage', $(this)[0].hash);

        var activePage = window.localStorage.getItem('activePage');

        $('.navbar a.active').removeClass('active');
        $(this).addClass('active');

        adjustBoxWidths();

        if(prevActivePage !== activePage) {
            if($('.center-page-box').index($(prevActivePage)) > $('.center-page-box').index($(activePage))) {
                $(activePage).css('left', '-150%');
                $(prevActivePage).animate({
                    left: '150%',
                    opacity: 0
                }, 500);
            } else {
                $(activePage).css('left', '150%');
                $(prevActivePage).animate({
                    left: '-150%',
                    opacity: 0
                }, 500);
            }

            $(activePage).animate({
                left: '50%',
                opacity: 1
            }, 500);
        }
    }
});

$('#education .large-box').click(goToDataLink);
$('#education .extracurricular-grid .small-box').click(goToDataLink);
$('#portfolio .portfolio-grid .portfolio-item').click(goToDataLink);
$('#press .press-grid .large-box').click(goToDataLink);