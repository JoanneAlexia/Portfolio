$(document).ready(function () {
  //Toggle menu with hamburger button
  $("#hamburgerBtn").click(function () {
    $(".navbar").toggleClass(function () {
      return $(this).is(".navbar--open") ? "navbar--close" : "navbar--open";
    });
  });
});
