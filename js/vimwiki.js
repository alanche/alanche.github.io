$(document).ready(function() {
  // fill in the welcome messages.
  var intro = function () {
    var code = '<h1>' + vimwiki.intro['brief'] + '</h1>';
    code += '<p>' + vimwiki.intro['detail'] + '</p>';
    code = '<div class="jumbotron" id="intro">' + code + '</div>';
    return code;
  };
  
  var navBars = function() {
    for (p in vimwiki.pages) {
      var code="";
      if (!vimwiki.pages.hasOwnProperty(p)) continue;
      code += '<li><a href="#">' + p + '</a></li>' + "\n";
      $(".nav-pills").append(code);
    }
  };
  navBars();
  
  // hold the original home contents.
  var home = intro(); 
  var vimwiki_path = '';
  if ($('#main-content').html().trim() == "") {
    $('#main-content').html(home);
    vimwiki_path = 'vimwiki/';
  }

  var subPageButton = function(items) {
    var html = '<ul>';
    for(var i=0;i<items.length;i++) {
      html += '<li class="subPageButton"><a href="' + vimwiki_path + items[i] + '.html">' + items[i] + '</a></li>';
    }
    html += "</ul>";
    return html;
  };

  // register the navigation bar buttons behavior
  $('.nav>li').click(function(event) {
    $('.nav li.active').removeClass('active');
    name = $(this).text().trim();
    if (name == 'HOME') {
      $('#main-content').html(home);
    } else {
      $('#main-content').html(subPageButton(vimwiki.pages[name]));
    }
    $(this).addClass("active");
  });
});
