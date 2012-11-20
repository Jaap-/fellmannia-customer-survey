//jQuery Document Ready
$(document).ready(function(d) {

  // Asetukset
  var settings = {
    
    // Pallojen minikoko pikselein?
    minsize: 100,
    
    // Pallojen maksimikoko pikselein?
    maxsize: 350,
    
    // Fonttien skaalautumisen kerroin
    fontscale: 12
  
  }
  
  // Laataan pallot
  $.post("../pallot.php", '', function(data) {
    
    // Lis?t??n pallot sivulle
    $(data).appendTo('.clones')
    
    // Jokaisen pallon funktiot
    $('.sphere').each(function() {
      
      
      // Pallojen sijaintien satunnaistaminen
      var x = Math.floor(Math.random() * ($(window).width() - (settings["maxsize"]) - 20))
      var y = Math.floor(Math.random() * ($(window).height() - (settings["maxsize"]) - 20))
      $(this).css({'position':'absolute', 'top':y, 'left':x})
      
      // Pallojen koot minimin ja maksimin v?lilt?
      var size = rand(settings["minsize"], settings["maxsize"])
      $(this).css({'width':size + 'px', 'height':size + 'px', 'font-size': Math.floor(size / settings["fontscale"]) + 'px'})
      
      // Pallon py?ristys (ei v?ltt?m?tt? tarvii en??)
      var h = $(this).height(), w = $(this).width();
      if (w < h) { $(this).css({'width':h + 'px'}) } else if (h < w) { $(this).css({'height':w + 'px'}) }
      
      // Peukuttaminen +1
      $('.like-icon', this).click(function() {
        var id = $(this).parent().parent().attr("data-id");
        $.post("pallot.php", {id:id, value:'plus', 'thumbs':true}, function(data) {})
      })
      
      // Peukuttaminen -1
      $('.dislike-icon', this).click(function() {
        var id = $(this).parent().parent().attr("data-id");
        $.post("pallot.php", {id:id, value:'minus', 'thumbs':true}, function(data) {})
      })
      
    })
    
    // Tekstikent?n keskitys pystysuunnassa
    $('.sphere p').each(function() {
      $(this).css({'position':'relative', 'top':'50%', 'overflow':'hidden', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'});
    })
    
    // Pallon valinta ja siirto keskelle
    $('.sphere').click(function() {
      var size = settings['maxsize'] + 'px', top = ($(window).height() / 2) - (settings['maxsize'] / 2) + 'px', left = ($(window).width() / 2) - (settings['maxsize'] / 2) + 'px';
      
      // Pallojen syvyyskorjaus
      $('.sphere').each(function() {
        $(this).css('z-index', '1')
      })
      
      // Pallon eteensiirtymisen animaatio
      $(this).animate({'position':'absolute', 'top':top, 'left':left, 'width':size, 'height':size, 'font-size': Math.floor(settings['maxsize'] / 10) + 'px', 'z-index':'100'}, 1000, function() {
        
        // Eteensiirretyn pallon tekstien keskitt?minen pystysuunnassa
        $('p', this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($('p', this).height() + 20) / 2) + 'px'})
        
        // Kuvakkeet skaalaaminen
        var scale = Math.round(((size - settings["minsize"]) / (settings["maxsize"] - settings["minsize"])) * 100);
        
        // Liian pieneksi skaalautumisen rajoitus
        scale = (scale < 10) ? '10%' : scale + '%';
        
        // Kuvan n?ytt?minen skaalautumisen j?lkeen
        $('.like-icon', this).css('background-size', scale).fadeIn(function() {
          $(this).css("cursor", "pointer")
        })
        
        // Kuvan n?ytt?minen skaalautumisen j?lkeen
        $('.dislike-icon', this).css('background-size', scale).fadeIn(function() {
          $(this).css("cursor", "pointer")
        })
      
      })
    
    })
    
    
    // Pallojen liikkumisen funktio
    var shuffle = function(s) {
      
      $('.sphere').delay(1000).each(function() {
        var x2 = Math.floor(Math.random() * ($(window).width() - (settings["maxsize"]) - 20)), y2 = Math.floor(Math.random() * ($(window).height() - (settings["maxsize"]) - 20));
        var size = rand(settings["minsize"], settings["maxsize"]), scale = Math.round(((size - settings["minsize"]) / (settings["maxsize"] - settings["minsize"])) * 100);
        scale = (scale < 10) ? '10%' : scale + '%';
        $('.like-icon, .dislike-icon').fadeOut()
        $("p", this).animate({'opacity':'0'}, 1000, function() {
          $(this).parent().animate({'position':'absolute', 'top':y2, 'left':x2, 'width':size + 'px', 'height':size + 'px', 'font-size': Math.floor(size / settings["fontscale"]) + 'px'}, 3000, function() {
            $("p", this).each(function() {
              $(this).css({'position':'relative', 'top':'50%', 'margin-top':-(parseInt($(this).height() + 20) / 2) + 'px'})
              $(this).animate({'opacity':'1'}, 1000)
            })
          })
        })
      })
      
      setTimeout(shuffle, 10000);
    }
    
    // Liikkumis-funktion suoritus
    shuffle()
  
  })
})


// Javascriptin Math.random() muutetaan php:n tavoin muotoon rand()
function rand(a,b) {return Math.floor((Math.random()*(b-a))+a);}

