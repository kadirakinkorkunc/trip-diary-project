$("nav ul li").click(function () {
  var data = $(this).data("dedata");

  $("nav div").stop().animate({ marginLeft: data }, 500, "easeInOutExpo");

  $(this).addClass("active");

  $("nav ul li").not(this).removeClass("active");
});