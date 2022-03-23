/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */


 // Spectrum Colorpicker v1.8.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT



//////////////////////custom css for personalisation form////

var ADDED = false;

function submitPersonalisationSaver (){
     
      var availStr = $('#product-availability').html();
      if (availStr.indexOf('product-unavailable') > 0){
        
        return false;
      }
      
      return true;
  };

$(function() {

if ( $('#myModal').length && $('#size-tip2').length ) {
    var content = '<img class="size-icon" height="24px;" src="/themes/lifestyle/assets/img/sizeGuide.png"> ';
    $('#size-tip2').html(content);
};

if ( $('#myModal').length && $('#size-tip2-general').length ) {
    var content = '<img class="size-icon" height="24px;" src="/themes/lifestyle/assets/img/sizeIcon.png"> ';
    $('#size-tip2-general').html(content);
};

if ( $('#myModal').length && $('#size-tip2-de').length ) {
    var content = '<img class="size-icon" height="24px;" src="/themes/lifestyle/assets/img/sizeGuideDE.png"> ';
    $('#size-tip2-de').html(content);
};

if ( $('#myModal').length && $('#size-tip2-fr').length ) {
    var content = '<img class="size-icon" height="24px;" src="/themes/lifestyle/assets/img/sizeGuideFR.png"> ';
    $('#size-tip2-fr').html(content);
};

if ( $('#myModal').length && $('#size-tip2-es').length ) {
    var content = '<img class="size-icon" height="24px;" src="/themes/lifestyle/assets/img/sizeGuideES.png"> ';
    $('#size-tip2-es').html(content);
};

if ( $('#myModal').length && $('#size-tip2-it').length ) {
    var content = '<img class="size-icon" height="24px;" src="/themes/lifestyle/assets/img/sizeGuideIT.png"> ';
    $('#size-tip2-it').html(content);
};



});

$(function() {
ADDED = true;

//Updates the variant to what the url shows before adding to cart
updateSize();
});

function updateSize(){
    var xxx = $(location).attr('href');


    if (xxx.indexOf('#')>0){
        var attrArray = xxx.split('#')[1].split("/");
        variantSelectors = $('.clone-attributes');
        console.log(attrArray);

        if (attrArray.length == 3 && attrArray[1].split('-')[1] == 'personalisation') {
            attrArray = [attrArray[0], attrArray[2], attrArray[1]];
            console.log('updated size;');
        } else {
            console.log('here');
            console.log(attrArray[1].split('-')[1]);
        }

        for (i=0; i< variantSelectors.length ; i++) {
            var attributeValue  = variantSelectors[i].id.split('_')[2];
            

            var groupVal = attrArray[i+1].split('-')[0];
            var cloneVal = attrArray[i+1].split('-')[2];

            $('#group_' + attributeValue).val(groupVal).change();    
            $('#clone_group_' + attributeValue).val(cloneVal);
            
        }
    }
};

$('.custom-radio').click(function() {$('.fa-check').click()});

function hideAdditionalColors(){    
$('.swatch-intro').attr('onClick','toggleAdditionalColors()');  
$('#featured-category-products-block-center').attr('onClick','');  
$('.swatch-intro').addClass('form-control-select');   
$('.swatch-div').animate( { 'height':'0px' }, 1000);
}

function toggleAdditionalColors(){    
    if ( $('.swatch-div').height() == 0 ){        
        $('.swatch-div').height('auto'); 
    } else {
        $('.swatch-div').animate( { 'height':'0px' }, 1000);
        };    
}

$('#personalisationSave').on('submit',function(){
 $( "#savecustom" ).html('PLEASE WAIT...');
$( "#savecustom" ).attr('style', 'background: DarkRed!important');
});

