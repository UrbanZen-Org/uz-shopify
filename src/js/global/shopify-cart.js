'use strict';

var $ = require('jquery');
var ShopifyBuy = require('shopify-buy');
var jsrender = require('jsrender');

var cart = {
  init: function(){
    
  },

  ready: function(){    

    $('form[action="/cart/add"]').submit(function(e){
      var self = this;
      e.preventDefault();
      // console.log($(this).serialize());
      var variantId;
      var productColor;
      var productSize
      variantId = $(e.target).find('[name=id]:checked').val();
      if (!variantId){
        variantId = $(e.target).find('input:checked').attr('variant-id');
        productColor = $(e.target).find('input:checked').attr('data-variant-color');
        productSize = $(e.target).find('input:checked').attr('data-variant-size');
      
        if (!$(this).find('[name=option-1]').length){
          variantId = $(this).find('[name=option-0]:checked').attr('variant-id');
          productSize = $(this).find('[name=option-0]:checked').val();
          productColor = undefined;
          if ($(this).find('[name=id]').attr('type') == 'hidden'){
            variantId = $(this).find('[name=id]').val();
            productSize = $(this).find('[name=id]:checked').val();
            productColor = undefined;
          }      
        }
      }
      var productId = $(this).find('input[name=productId]').val();
      var productHandle = $(this).find('input[name=productHandle]').val();
      console.log(variantId);
      console.log(productColor);
      console.log(productSize);
        
      window.cart.addToCart(productId, variantId, productHandle, productColor, productSize);
    }); 
  },

  resize:function(){
  },  

  scroll: function(){
  }
 
};

module.exports = cart;
