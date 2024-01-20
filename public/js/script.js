$(document).ready(function () {
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
});