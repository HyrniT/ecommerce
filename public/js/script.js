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

    function editCategory(categoryId) {

    }

    function deleteCategory(categoryId) {

    }

    $("#addCategoryForm").submit(function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', $('#name').val());
        formData.append('desc', $('#desc').val());
        formData.append('image', $('#image')[0].files[0]);

        fetch('/admin/add-category', {  
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                $('#name').val('');
                $('#desc').val('');
                $('#image').val('');
            })
            .catch(error => console.error('Error:', error));
    });

});