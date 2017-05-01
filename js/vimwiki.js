$(document).ready(function() {
  var navBars = function() {
    for (p in vimwiki.pages) {
      var code="";
      if (!vimwiki.pages.hasOwnProperty(p)) continue;
      code += '<li><a href="#">' + p + '</a></li>' + "\n";
      $(".nav-pills").append(code);
    }
  };
  navBars();
  var intro = function () {
    var code = '<h1>' + vimwiki.intro['brief'] + '</h1>';
       code += '<p>' + vimwiki.intro['detail'] + '</p>';
    $('#intro').html(code);
  };
  intro();


  main = $('#main-content').html();
  $('.nav>li').click(function(event) {
    $('.nav li.active').removeClass('active');
    name = $(this).text().trim();
    if (name == 'HOME') {
      $('#main-content').html(main);
    } else {
      $('#main-content').html(subPageButton(vimwiki.pages[name]));
    }

    $(this).addClass("active");
    //console.log("clicking on" + this);
  });


  var subPageButton = function(items) {
    var html = '<ul>';
    for(var i=0;i<items.length;i++) {
      html += '<li class="subPageButton"><a href="' + items[i] + '.html">' + items[i] + '</a></li>';
    }
    html += "</ul>";
    return html;
  };



}
);
