$(document).ready(function() {
  // fill in the welcome messages.
  var intro = function () {
    var code = '<h1 class="nonumber">' + vimwiki.intro['brief'] + '</h1>';
    code += '<p>' + vimwiki.intro['detail'] + '</p>';
    code = '<div class="jumbotron" id="intro">' + code + '</div>';
    return code;
  };
  
  var initNavBars = function() {
    vimwiki.subPages = {}
    var data = vimwiki.pages
    vimwiki.pages.forEach(function(item) {
      var code = '<li><a href="#">' + item[0] + '</a></li>' + "\n";
      $(".nav-pills").append(code);
      vimwiki.subPages[item[0]] = subPageButton(item.slice(1))
    });
  };
  
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
      var result = items[i].split('|')
      var url = result[0]
      var text = result[1] || result[0]
      html += '<li class="subPageButton"><a href="' + vimwiki_path + url + '.html">' + text + '</a></li>';
    }
    html += "</ul>";
    return html;
  };

  // initialize the navigation bars and sub buttons.
  initNavBars(); 

  // register the navigation bar buttons behavior
  $('.nav>li').click(function(event) {
    $('.nav li.active').removeClass('active');
    name = $(this).text().trim();
    if (name == 'HOME') {
      $('#main-content').html(home);
    } else {
      $('#main-content').html(vimwiki.subPages[name]);
    }
    $(this).addClass("active");
  });
  // automatically numbering the h1 ~ h6 tags under #main-content
  (function(){
    var number = [0,0,0,0,0,0,0];
    var getIndex = function(elem) {
      return elem.tagName.slice(-1) - 1;
    };
    var collections = $("#main-content h1,#main-content h2,#main-content h3,#main-content h4,#main-content h5,#main-content h6");
    for (var i=0;i<collections.length;i++) {
      var obj = collections[i];
      // the digit location in number
      var idx = obj.tagName.slice(-1) - 1;
      if (obj.className.indexOf('justcenter') != -1) continue;
      if (obj.innerText == "Contents") continue
      if (obj.className.indexOf('nonumber') != -1) continue;
      // incremental current level digit
      number[idx++]++; 
      // clear the lower level digit
      while(idx < 6) {
        number[idx] = 0;
        idx++;
      }
      // conctat the levels
      var prefix = number.filter(function(i){return i}).join('.');
      // NOTE: disable the numbering. use the vimwiki native numbering mechanism.
      //obj.innerHTML = prefix + ' ' + obj.innerHTML;
    }
  })();
  // support the responsive images
  $('img').addClass('img-responsive');
  // remove the same count of leading space char at each line
  $('pre.code').each(function(i,block) {
    var txt = this.innerText
    lines = txt.split("\n")
    first = lines[0]
    space = 0
    while(first[space] == " ") space ++
    for (i=0;i<lines.length;i++) {
      lines[i] = lines[i].substring(space);
    }
    this.textContent = lines.join("\n")
  });
  // syntax highlighter
  $('pre.code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

});
