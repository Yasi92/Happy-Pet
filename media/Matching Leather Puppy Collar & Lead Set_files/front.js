/**
* 2007-2018 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2018 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

/**
 * Button manager
 */
$(document).on('click', '.button-theme_configurator div', function() {

    if ($(this).hasClass('close_theme_configurator_window')){
        $('.open_theme_configurator_window').show();
        $('.close_theme_configurator_window').hide();
        $('.panel-theme_configurator').slideUp();
    } else {
        $('.close_theme_configurator_window').show();
        $('.open_theme_configurator_window').hide();
        $('.panel-theme_configurator').slideDown();
    }
    
});

$(document).on('click', '.panel-themeconf_footer button', (event) => {
    let elem = event.target;
    let button = $(elem).attr('class');

    if (button == 'btn-themeconf-ok') {
        $('.panel-themeconf_footer .btn-themeconf-ok').hide();
        $('.panel-themeconf_footer .footer-confirmation').show();
    } 

    if (button == 'footer-btn-cancel') {
        $('.panel-themeconf_footer .btn-themeconf-ok').show();
        $('.panel-themeconf_footer .footer-confirmation').hide();
    } 
});

/**
 * Reset Colors
 */
$(document).on('click', '#reset-themeconf span', function(){
    $.each(aDefaultValues, (input, value) => {
        if (input == 'PS_THEME_MAIN_COLOR' || input == 'PS_THEME_CATEGORIE_COLOR' || input == 'PS_THEME_SLIDER_TITLE_COLOR' || input == 'PS_THEME_SLIDER_TEXT_COLOR') {
            $('#'+input+' .ps_colorpicker_input').val(value).trigger('ps_colorpicker_update');
            $('#'+input+' .ps_colorpicker').css('background', value);
        }
        if (input == 'PS_THEME_RADIUS_BUTTON' || input == 'PS_THEME_GHOST_BUTTON' || input == 'PS_THEME_SLIDER_OPACITY') {
            $('#'+input+' input').prop('checked', value);
            $('#'+input+' .checkmark').trigger('click');
        }
        if (input == 'PS_THEME_AUTO_CATEGORIE_TEXT_COLOR') {
            if (value == 'false') {
                input = 'PS_THEME_CATEGORIE_TEXT_COLOR';
            }
            $('#'+input+' input').prop('checked', value);
            $('#'+input+' .checkmark').trigger('click');
        }
        if (input == 'PS_THEME_PRIMARY_FONT' || input == 'PS_THEME_SECONDARY_FONT') {
            $('#'+input+' select option[value='+value+']').prop('selected', true);
            $('#'+input+' select').trigger('change');
        }
        
    });
});

/**
 * Save form
 */

$(document).on('click', '.panel-themeconf_footer .footer-btn-save', () => {
    
    let inputValues = $('.panel-theme_configurator input, .panel-theme_configurator select').map(function() {
        if ($(this).attr('type') == 'checkbox') {
            let checked =  $(this).prop('checked') ? 1 : 0;
            return $(this).attr('name')+':'+checked;
        }
        if ($(this).attr('type') == 'radio') {
            let checked =  $(this).prop('checked') ? 1 : 0;
            return $(this).val()+':'+checked;
        }
        return $(this).attr('name')+':'+$(this).val();
    }).toArray();

    $.ajax({
        type: 'POST',
        url: pstc_ajax,
        data: {
            action : 'SaveConfiguration',
            ajax : true,
            token : psthemeconf_token,
            values : inputValues
        },
        success: () => {
            $('.close_theme_configurator_window').hide();
            $('.panel-theme_configurator').slideUp();
            $('.footer-btn-cancel').trigger('click');
            let fontPrimary = $('#PS_THEME_PRIMARY_FONT select').val();
            let fontSecondary = $('#PS_THEME_SECONDARY_FONT select').val();
            $('#PS_THEME_PRIMARY_FONT select').attr('data-font_origin', fontPrimary);
            $('#PS_THEME_SECONDARY_FONT select').attr('data-font_origin', fontSecondary);
            $('.open_theme_configurator_window .material-icons').html('check');
            $('.open_theme_configurator_window').animate({
                backgroundColor: "#76BE8B",
                color: "#fff",
            }, 200 );

            $('.open_theme_configurator_window').show();

            setTimeout(function() {
                $('.open_theme_configurator_window').animate({
                    backgroundColor: "#ffffff",
                    color: "#000",
                }, 200 );
                
                setTimeout(function() {
                    $('.open_theme_configurator_window .material-icons').html('invert_colors');
                },100);
            }, 2000);
            $('.panel-themeconf_footer .btn-themeconf-ok').removeClass('btn-themeconf-ok').addClass('btn-themeconf');
        }
    });
});

/**
 * Color Picker
 */

 /* All colorpickers */
$(document).on('ps_colorpicker_update', '.ps_colorpicker_input', (event) => {
    let elem = event.target;
    let inputName = $(elem).attr('name');
    let inputColor = $(elem).val();

    switch (inputName) {
        case 'PS_THEME_MAIN_COLOR': changeThemeColor(inputColor, 'main_color'); break;
        case 'PS_THEME_CATEGORIE_COLOR': 
            changeThemeColor(inputColor, 'text_color_category'); 
            $('#PS_THEME_CATEGORIE_COLOR input').prop('checked', true); 
        break;
        case 'PS_THEME_SLIDER_TITLE_COLOR': changeThemeColor(inputColor, 'slider_title_color'); break;
        case 'PS_THEME_SLIDER_TEXT_COLOR': changeThemeColor(inputColor, 'slider_text_color'); break;
        default: break;
    }
});

/* Buttons styles */
$(document).on('click', '#PS_THEME_RADIUS_BUTTON .checkmark, #PS_THEME_GHOST_BUTTON .checkmark', () => {
    let inputColor = $('#PS_THEME_MAIN_COLOR .ps_colorpicker_input').val();
    changeThemeColor(inputColor, 'main_color');
});

/* Category bloc color */
$(document).on('click', '#PS_THEME_AUTO_CATEGORIE_TEXT_COLOR .checkmark, #PS_THEME_CATEGORIE_COLOR .checkmark', (e) => {
    if ($(e.target).attr('data-active') == 0) {
        let bColorAutoChecked = $('#PS_THEME_AUTO_CATEGORIE_TEXT_COLOR input').prop('checked');
        let colorAuto = $('#PS_THEME_CATEGORIE_COLOR .ps_colorpicker_input').val();
        let colorInitial = '#fff';    
        let categoryColor = bColorAutoChecked? 'auto_text_color' : 'text_color_category';
        let inputColor = bColorAutoChecked? colorAuto : colorInitial;
        changeThemeColor(inputColor, categoryColor);
        $('#PS_THEME_CATEGORIES .checkmark').attr('data-active', 0);
        $(e.target).attr('data-active', 1);
    }
});

$(document).on('click', '#PS_THEME_SLIDER_OPACITY .checkmark', () => {
    let inputColor = $('#PS_THEME_SLIDER_TITLE_COLOR .ps_colorpicker_input').val();
    changeThemeColor(inputColor, 'slider_title_color');
});

/* Font change */
$(document).on('change', '#PS_THEME_PRIMARY_FONT select, #PS_THEME_SECONDARY_FONT select', (event) => {
    let fontPrimaryFamily = $('#PS_THEME_PRIMARY_FONT select').val();
    let fontSecondaryFamily = $('#PS_THEME_SECONDARY_FONT select').val();

    changeFontFamily(fontPrimaryFamily, fontSecondaryFamily);
});

/* This function is doing a loop for each element and create at each time a style tag */
changeThemeColor = (inputColor, categoryColor) => {
    setTimeout( () => {
        $('.'+categoryColor+'_general_style').remove();
        Object.keys(aThemeCss).forEach( (key, index) => {
            $.each( aThemeCss[key][categoryColor], (category, mainSelector) => {
                if (category != 'custom') {          
                    $('head').append('<style type="text/css" class="'+categoryColor+'_general_style">'+mainSelector+'{'+category+': '+inputColor+' !important;}</style>');
                } else {
                    $.each( aThemeCss[key][categoryColor]['custom'], (customCategory, customMainSelector) => {
                        if (categoryColor == 'main_color' || categoryColor == 'text_color_category')
                            changeThemeButtonsColor(categoryColor, inputColor);
                        if (categoryColor == 'slider_title_color')
                            changeSliderOpacity(categoryColor, inputColor);

                        createSpecificCss(aThemeCss[key][categoryColor]['custom']['other'], 'other_'+index, categoryColor, inputColor);
                    });
                }
            });
        });
    }, 70);
};

/* This function is doing the same as the previous one but is used to update the buttons style */
changeThemeButtonsColor = (categoryColor, inputColor) => {
    let ghost = $('#PS_THEME_GHOST_BUTTON input').prop('checked');
    let radius = $('#PS_THEME_RADIUS_BUTTON input').prop('checked');

    let radiusButton = radius ? 'radius_button_on' : 'radius_button_off';
    let ghostButton = ghost ? 'ghost_button_on' : 'ghost_button_off';

    Object.keys(aThemeCss).forEach( (key, index) => {
        createSpecificCss(aThemeCss[key][categoryColor]['custom'][radiusButton], 'radius_button_'+index, categoryColor, inputColor);
        createSpecificCss(aThemeCss[key][categoryColor]['custom'][ghostButton], 'ghost_button_'+index, categoryColor, inputColor);
    });
}

changeSliderOpacity = (categoryColor, inputColor) => {
    let opacity = $('#PS_THEME_SLIDER_OPACITY input').prop('checked');

    let sliderOpacity = opacity ? 'slider_opacity_on' : 'slider_opacity_off';

    Object.keys(aThemeCss).forEach( (key, index) => {
        if (aThemeCss[key][categoryColor]!= undefined) {
            createSpecificCss(aThemeCss[key][categoryColor]['custom'][sliderOpacity], 'slider_opacity_'+index, categoryColor, inputColor);
        }
    });
}

changeFontFamily = (fontPrimaryFamily, fontSecondaryFamily) => {
    Object.keys(aThemeCss).forEach( (key, index) => {
        createSpecificCss(aThemeCss[key]['primary_font']['custom']['other'], 'afont_'+index, 'primary_font', fontPrimaryFamily);
        createSpecificCss(aThemeCss[key]['secondary_font']['custom']['other'], 'bfont_'+index, 'secondary_font', fontSecondaryFamily);
    });
}

/* Remove the older stylesheet and create a new style sheet */
createSpecificCss = (themeLoop, styleName, category, replaceElement) => {
    $('.'+category+'_'+styleName+'-style').remove();
    $.each(themeLoop, (selector, rules) => {
        let updatedRule = rules.replace(/%1\$s/g, replaceElement);
        $('head').append('<style type="text/css" class="'+category+'_'+styleName+'-style">'+selector+'{'+updatedRule+'}</style>');
    });
    $('.panel-themeconf_footer .btn-themeconf').removeClass('btn-themeconf').addClass('btn-themeconf-ok');
}