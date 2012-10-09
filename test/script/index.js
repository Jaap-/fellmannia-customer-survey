//jQuery Document Ready
$(document).ready(function(d) {

  // Asetukset
  var settings = {spheres:10, minsize: 50, maxsize: 350}
  
  // Tiedot
  $('.dimensions').append('<span class="sphere-details"></span> <span class="mouse-details"></span>')
  $('.sphere-details').text("Spheres ("+ settings["spheres"] +", ?)")
  
  // Pallokloonit
  var q = 0, w = 1;
  for (i = 0; i < settings["spheres"]; i++) {
    var source = (q == 0) ? '.source #sphere-small' : '.source #sphere-large';
    $(source).clone().hide().appendTo('.clones').fadeIn()
    q = [w, w = q][0];
  }

  // Jokaisen pallon funktiot
  $('.sphere').each(function() {
    
    // Sijainnit
    var x = Math.floor(Math.random() * ($(window).width() - (settings["maxsize"]) - 20))
    var y = Math.floor(Math.random() * ($(window).height() - (settings["maxsize"]) - 20))
    
    $(this).css({'position':'absolute', 'top':y, 'left':x})
    
    // Koot
    var size = rand(settings["minsize"], settings["maxsize"])
    $(this).css({'width':size + 'px', 'height':size + 'px', 'font-size': Math.floor(size / 10) + 'px'})
    
    // Pallon pyöristys
    var h = $(this).height(), w = $(this).width();
    
    
    // Fix
    if (w < h) { $(this).css({'width':h + 'px'}) } else if (h < w) { $(this).css({'height':w + 'px'}) }
    
    // Pallojen päällekkäisyyksien esto
    var area = $('.sphere').width()
    
    
    $(this).hover(function() {
      clearTimeout(shuffle)
      $('.sphere').each(function() {
        $(this).stop(true, false)
        $("p", this).each(function() {
          $(this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'})
          $(this).animate({'opacity':'1'}, 1000)
        })
      })
      $('.sphere-details').text("Spheres ("+ settings["spheres"] +", {Size:" + size + ", Width:" + $(this).width() +", Height:" + $(this).height() +", X:" + x + ", Y:" + y + "})")
    }, function() {
      //shuffle()
      $('.sphere-details').text("Spheres ("+ settings["spheres"] +", ?)")
    })
    
    // Värit
    var color = rand(1, 3)
    if (color == 1) { $(this).addClass('grey') } else if (color == 2) { $(this).addClass('yellow') } else if (color == 3) { $(this).addClass('green') }
    
  })
  
  // CSS-luokat
  $('.sphere p').each(function() {
    $(this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'})
  })
  
  
  var shuffle = function(s) {
    
    $('.sphere').delay(1000).each(function() {
      
      var x2 = Math.floor(Math.random() * ($(window).width() - (settings["maxsize"]) - 20))
      var y2 = Math.floor(Math.random() * ($(window).height() - (settings["maxsize"]) - 20))
      var size = rand(settings["minsize"], settings["maxsize"])
      var area =
      $("p", this).animate({'opacity':'0'}, 1000, function() {
      
        $(this).parent().animate({'position':'absolute', 'top':y2, 'left':x2, 'width':size + 'px', 'height':size + 'px', 'font-size': Math.floor(size / 10) + 'px'}, 3000, function() {
        
          
          $("p", this).each(function() {
            
            $(this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'})
            $(this).animate({'opacity':'1'}, 1000)
          
          })
        
        })
      })
      
    })
    
    setTimeout(shuffle, 10000);
  }
  
  shuffle()
  
})

$(document).mousemove(function(e) {
  x = e.clientX; y = e.clientY; $('.mouse-details').text("Mouse (X:" + x +" Y:" + y +")")
});

// Math.random() => rand()
function rand(a,b) {return Math.floor((Math.random()*b)+a);}

function isCollide(a, b) {
    return !( ((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width)) );
}
