$(document).ready(function () {
    $("#googleSignInButton").click(function () {
        window.location.href = "/auth/google";
    });
});
// $(document).ready(function () {
//     $("#googleSignInButton").click(function () {
//         // Gửi yêu cầu đến server khi nút được nhấn
//         $.ajax({
//             url: "/auth/google", // Đường dẫn tới endpoint trên server
//             method: "GET", // Hoặc "POST" tùy thuộc vào yêu cầu của bạn
//             success: function (data) {
//                 // Xử lý kết quả từ server nếu cần thiết
//                 console.log("Request sent successfully", data);
//             },
//             error: function (error) {
//                 // Xử lý lỗi nếu có
//                 console.error("Error sending request", error);
//             }
//         });
//     });
// });