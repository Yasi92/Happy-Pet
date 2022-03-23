/*
 *  NOTICE OF LICENSE
 *
 *  This product is licensed for one customer to use on one installation (test stores and multishop included).
 *  Site developer has the right to modify this module to suit their needs, but can not redistribute the module in
 *  whole or in part. Any other use of this module constitutes a violation of the user agreement.
 *
 *  DISCLAIMER
 *
 *  NO WARRANTIES OF DATA SAFETY OR MODULE SECURITY
 *  ARE EXPRESSED OR IMPLIED. USE THIS MODULE IN ACCORDANCE
 *  WITH YOUR MERCHANT AGREEMENT, KNOWING THAT VIOLATIONS OF
 *  PCI COMPLIANCY OR A DATA BREACH CAN COST THOUSANDS OF DOLLARS
 *  IN FINES AND DAMAGE A STORES REPUTATION. USE AT YOUR OWN RISK.
 *
 *   @author    idnovate.com <info@idnovate.com>
 *   @copyright 2020 idnovate.com
 *   @license   See above
 */


var cookieGdpr = {
    init: function () {
        // mode DIV before </body>
        $('#cookiesplus-overlay, #cookiesplus-modal-container').appendTo(document.body);

        //Check if user already saved cookies
        if (typeof C_P_DISPLAY_MODAL !== 'undefined'
            && C_P_DISPLAY_MODAL == 1
            && typeof C_P_COOKIE_VALUE !== 'undefined'
            && Object.keys(C_P_COOKIE_VALUE).length === 0
            && C_P_COOKIE_VALUE.constructor === Object) {
            this.displayModal();
        }

        /*$(document).on("change", "input:radio:not(:disabled)[name^=cookiesplus-finality-]", function(){
            cookieGdpr.displaySavePreferencesButton();
        });*/
    },
    displayModal: function () {
        if (typeof $.uniform !== "undefined") {
            $.uniform.restore(".cookiesplus-finality-checkbox");
        }

        if (C_P_FINALITIES_COUNT === 0) {
            return;
        }

        if (C_P_NOT_AVAILABLE === 0) {
            return;
        } else {
            this.displayOverlay();
            $('#cookiesplus-modal').show();
            $('#cookiesplus-modal .cookiesplus-close').hide();
            $('.cookiesplus-reject').hide();
            $('.cookiesplus-accept-all-label').hide();
        }

        this.checkEvenDimensions('#cookiesplus-modal');
        $(window).resize(function () {
            cookieGdpr.checkEvenDimensions('#cookiesplus-modal');
        });
    },
    displayModalAdvanced: function (modal) {
        if (typeof $.uniform !== "undefined") {
            $.uniform.restore(".cookiesplus-finality-checkbox");
        }

        if (C_P_FINALITIES_COUNT === 0) {
            return;
        }

        this.displayOverlay();

        if (C_P_NOT_AVAILABLE === 0) {
            $('#cookiesplus-modal-not-available').show();
             $('#cookiesplus-overlay').click(function() {
                cookieGdpr.close();
             })
        } else {
            $('#cookiesplus-modal').show();
            $('.cookiesplus-finalities').slideToggle();
            this.displaySavePreferencesButton();
            if (modal) {
                $('#cookiesplus-modal .cookiesplus-close').hide();
            }
        }

        this.checkEvenDimensions('#cookiesplus-modal');
    },
    save: function () {
        return cookieGdpr.sendForm();
    },
    acceptAllCookies: function () {
        $('input:radio:not(:disabled)[name^=cookiesplus-finality-][value=on]').prop('checked', true);

        return cookieGdpr.sendForm();
    },
    rejectAllCookies: function () {
        $('input:radio:not(:disabled)[name^=cookiesplus-finality-][value=off]').prop('checked', true);

        return cookieGdpr.sendForm();
    },
    displayOverlay: function () {
        if (C_P_OVERLAY === '1') {
            $('#cookiesplus-overlay').show();
            $('#cookiesplus-overlay').css('background-color', 'rgba(0, 0, 0, ' + C_P_OVERLAY_OPACITY + ')');
        }
        $('#cookiesplus-overlay').click(function(){
            cookieGdpr.shake($('#cookiesplus-modal'), 4, 2, 20);
        });
    },
    close: function () {
        $('#cookiesplus-modal, #cookiesplus-modal-not-available, #cookiesplus-overlay, .cookiesplus-finalities, .cookiesplus-save').fadeOut();
        //$('.cookiesplus-save').prop('disabled', true);
    },
    checkEvenDimensions: function (div) {
        return;
        //$(div).css('height', '');
        var styleObject = $(div).prop('style');
        styleObject.removeProperty('height');
        if ($(div).height() % 2 === 1) {
            $(div).height(2 * Math.round(($(div).height() - 1) / 2));
        }

        styleObject.removeProperty('width');
        $(div).css('width', '');
        if ($(div).width() % 2 === 1) {
            $(div).width(2 * Math.round(($(div).width() - 1) / 2));
        }
    },
    shake: function (div, shakes, distance, duration) {
        if (shakes > 0) {
            div.each(function () {
                var $el = $(this);
                var left = $el.css('left');
                $el.animate({left: "-=" + distance}, duration, function () {
                    $el.animate({left: "+=" + distance * 2}, duration, function () {
                        $el.animate({left: left}, duration, function () {
                            cookieGdpr.shake($el, shakes - 1, distance, duration);
                        });
                    });
                });
            });
        }
    },
    displaySavePreferencesButton: function() {
        $('.cookiesplus-save').show();
        $('.cookiesplus-reject').show();
        $('.cookiesplus-accept-all-label').show();
        $('.cookiesplus-accept-label').hide();

        /*if ($('input:radio:not(:disabled)[name^=cookiesplus-finality-][value=on]:checked').length > 0
            || $('input:radio:not(:disabled)[name^=cookiesplus-finality-][value=off]:checked').length > 0) {
            $('.cookiesplus-save').prop('disabled', false);
        }*/
    },
    sendForm : function() {
        if (!C_P_REFRESH) {
            $.ajax({
                type: "POST",
                data: 'saveCookiesPlusPreferences=&'+$('#cookiesplus-form').serialize(),
            });

            cookieGdpr.close();

            return false;
        } else {
            return true;
        }
    }
};

$(document).ready(function () {
    cookieGdpr.init();
});
