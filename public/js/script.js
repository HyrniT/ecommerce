$(document).ready(function () {
    $("#googleSignInButton").click(function () {
        window.location.href = "/auth/google";
    });

    $('#category-link, #product-link, #user-link, #statistics-link').on('click', function (event) {
        event.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        loadContent($(this).attr('href'));
    });

    function loadContent(url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                $('#content').html(data);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    checkScreenSize(); // Load page

    $(window).resize(function () { // Resize page
        checkScreenSize();
    });

    function checkScreenSize() {
        if ($(window).width() >= 768) {
            $('#sidebar').addClass('fixed-top');
        } else {
            $('#sidebar').removeClass('fixed-top');
        }
    }
});