'use strict';

var $ = require('jquery');
var lazysizes = require('lazysizes');
var unveilhooks = require('unveilhooks');
var Cookies = require('js-cookie');
var slick = require('slick-carousel');

var global = {
  init: function(){
  },

  ready: function(){
    this.downArrow();
    this.lazyload();
    //this.newsletterPopup.init();
    this.menu();
    this.accordian();
    this.mailchimpSignup.init();
    //this.cross_sell();
  },
  
  resize:function(){
    
  },  
  scroll: function(){
    
  },
  cross_sell: function(){
    setTimeout(function(){
    if ($('.cross-sell').length){
            
      $('.cross-sell').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-arrow arrow-left"></div>',
        nextArrow: '<div class="slick-arrow arrow-right"></div>',
        mobileFirst: true,
        centerMode: true,
        responsive: 
        [
          {
            breakpoint: 768,
            settings: "unslick"
          }
        ],
        slide: 'li'
      });
    }
  },3000);
  },
  accordian : function(){
    if ($('.accordian-section').length) {
      
      $('.accordian-title').click(function(e) {
          var accordianParent = $(this).parent();
          var accordianText = accordianParent.find('.accordian-content').first();
          
          if(accordianParent.hasClass('open')) {
            accordianParent.removeClass('open');
            accordianParent.find('.accordian-content').slideUp(300);
            accordianParent.find('.accordian-section').removeClass('open')
          }else{
            accordianParent.addClass('open');
            accordianText.slideDown(300);
          }
          e.preventDefault();
      });
    }
  },
  menu:  function(){
    var nav_link = $('nav.top-menu li a');
    if ($(window).width() < 1023){
    
    
    nav_link.click(function(e){
      var link = $(this);
      if ($(this).parent().find('ul').length){
        e.preventDefault();

        var parent_ul = $(this).parent().find('ul');

        if (parent_ul.hasClass('open')){
          parent_ul.removeClass('open').slideUp(300);
          parent_ul.find('ul').removeClass('open');
          $(this).parent().find('ul li').removeClass('current-menu-parent');
        }else{
          parent_ul.first().addClass('open').slideDown(300);
          parent_ul.parent().siblings().find('ul').removeClass('open').slideDown(300);
          parent_ul.parent().siblings().removeClass('current-menu-parent');
          $('.main-menu').animate({
            scrollTop: link.parent().position().top - 80
          }, 400);
        }
        $(this).parent().toggleClass('current-menu-parent');
        
      }
    });
    }
    $('.menu-link').click(function(e){
      $('body').toggleClass('lock-scroll');
      $('body').toggleClass('menu-open');
      $('body').removeClass('cart-open');
    });
  },


  downArrow: function(){
    if ($('a[data-target]').length){
      $('a[data-target]').click(function() {
        var target = $(this).data('target');
        if ($(window).width > 1023 ){
          var nextSection = $(target).offset().top;  
        }else{
          var nextSection = $(target).offset().top - 50;  
        }
        
        $("html, body").animate({ scrollTop: nextSection });
      });
    }
  },
  lazyload: function(){
    document.addEventListener('lazybeforeunveil', function(e){
      var bg = e.target.getAttribute('data-bg');
      if(bg){
        e.target.style.backgroundImage = 'url(' + bg + ')';
      }
    });
  },
  newsletterPopup: {
    init: function(){
      var self = this;
      if($('.newsletter_popup').length){
        // if (!Cookies.get('newsletter')){
        //   Cookies.set('newsletter', 7, { expires: 7 });
        //   setTimeout(function(){
        //     self.open();
        //   },4000);          
        // }        
        this.actions();
      }    
    },
    actions: function(){
      var self = this;
      $('.newsletter_popup,.newsletter_popup .close').click(function(e){
        self.close();
      });
      $('.newsletter_popup .popup-body').click(function(e){
        e.stopPropagation();
      });
      $('.newsletter-callout').click(function(e){
        self.open();
      });
    },
    open: function(){
      $('.newsletter_popup').addClass('open');
      $('body').addClass('lock-scroll');
    },
    close: function(){
      $('.newsletter_popup').removeClass('open');
      $('body').removeClass('lock-scroll');
    }
  },
  
   mailchimpSignup :{
    init : function() {
      var self = this;
      $('.newsletter-signup').submit(function(e){
        self.subscribe(e, self);
      });
    },
    form : $('.newsletter-signup'),

    subscribe : function(e, self){
      e.preventDefault();
      var form = self.form,
          link = 'https://urbanzen.com/wp-content/themes/uz2017/assets/includes/mc_subscribe.php',
          request = $.ajax({
                      url: link,
                      type: 'POST',
                      data : $('.newsletter-signup').serialize()
                    });
      request.done(self.handleResponse);
    },

    handleResponse : function(response){
      function outputMessage(msg){
        $('.newsletter-signup').find('input[type=text]').val('');
        $('.newsletter-signup').find('input[type=text]').blur();
        $('.newsletter-signup').find('input[type=text]').attr('placeholder',msg);
      };
      var form = this.form;
      var resp = JSON.parse(response);          
      if (resp.title == 'Member Exists') {
        outputMessage('Already suscribed');        
      } else if (resp.title == 'Invalid Resource' || resp.title == 'Internal Server Error') {
        outputMessage('Invalid Email');
      } else if (resp.status == 'subscribed') {
        outputMessage('Thanks');
      }else{
        outputMessage('Invalid Response');
      }
    }
  }, // End mailchimpSignup
};

module.exports = global;


