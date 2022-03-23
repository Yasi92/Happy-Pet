/**
 * Please read the terms of the CLUF license attached to this module(cf "licences" folder)
 *
 * @author    Línea Gráfica E.C.E. S.L.
 * @copyright Lineagrafica.es - Línea Gráfica E.C.E. S.L. all rights reserved.
 * @license   https://www.lineagrafica.es/licenses/license_en.pdf
 *            https://www.lineagrafica.es/licenses/license_es.pdf
 *            https://www.lineagrafica.es/licenses/license_fr.pdf
 */

function enviarConsulta(file)
{
    nombre   = $('#nombre').val();
    email    = $('#emailaddress').val();
    consulta = $('#consulta').val().split("\n").join(" ");
    isocode  = $('#isocode').val();
    $.ajax({
        type: "POST",
        url: file,
        data: {
            'action': 'sendQuestion',
            'ajax': 1,
            'nombre': nombre,
            'email': email,
            'consulta': consulta,
            'isocode': isocode,
            'id_producto': typeof(id_product)=='undefined'?$('[name="id_product"]').val():id_product,
            'enviar_mensaje' : true,
            'token' : lgconsultas_token
        },
    }).done(function(status, data) {
        $( this ).addClass( "done" );
        if (typeof(data.status) != 'undefined' && data.status == 'ok') {
            $('#nombre').val('');
            $('#emailaddress').val('');
            $('#consulta').val('');
            $('#isocode').val('');
            $("#check_cond").prop('checked', false);
        }
        if (typeof(data.status) != 'undefined' && data.status == 'nok') {
            if (typeof(data.message) != 'undefined') {
                lgconsultas_display_error(data.message);
            } else {
                lgconsultas_display_error(lgconsultas_error_unknown);
            }
        }
    });
}

function abrir(url) {
    open(url,'','top=300,left=300,width=600,height=600,scrollbars=yes') ;
}

function acceptCondiciones()
{
    var email                = $('#emailaddress').val();
    var atcheck              = email.indexOf("@");
    var dotcheck             = email.lastIndexOf(".");
    var faq_captcha_response =
        $( ".g-recaptcha" ).length &&
        $( ".g-recaptcha" ).data("sitekey") !=""
        && typeof(grecaptcha) == 'object'
            ? grecaptcha.getResponse()
            : null;

    if ($('#nombre').val() == '' || $('#emailaddress').val() == '' || $('#consulta').val() == '') {
        lgconsultas_display_error(lgconsultas_messages_fields_mandatory);
    } else if (atcheck<1 || dotcheck<atcheck+2 || dotcheck+2>=x.length) {
        lgconsultas_display_error(lgconsultas_messages_email_invalid);
    } else if (lgconsultas_faqcondition > 0 && $('#check_cond').length && !$('input#check_cond:checked').length) {
        lgconsultas_display_error(lgconsultas_messages_accept_conditions);
    } else if (lgconsultas_faqcaptcha > 0 && faq_captcha_response != null && faq_captcha_response.length == 0) {
        lgconsultas_display_error(lgconsultas_messages_recaptcha);
    } else {
        enviarConsulta(lgconsultas_url_envio_consulta);
        if (typeof $.fancybox != 'undefined') {
            $.fancybox.close();
        } else {
            $(".fancybox-overlay").click();
        }
        lgconsultas_display_error(lgconsultas_messages_sended);
    }
}

function lgconsultas_display_error(message, title)
{
    if (message != '') {
        $('#lgconsultas_error_message span.message').text(message);
    }
    if (title != '') {
        $('#lgconsultas_error_message span.title').text(title);
    }
    $('#lgconsultas_error_message').show();
}

$(document).ready(function () {
    x=lgconsultas_default_display;
    numberQuestion = $("#idTab785 table").size();
    $('#idTab785 table:lt('+x+')').show();
    $("a#enviar_consulta").fancybox({
        'href'   : '#form_consulta',
        'autoSize':false,
        'autoScale':false,
        'maxWidth':500,
        'scrolling':'no',
    });

    $(document).on('click', '#displayMoreC', function () {
        x= (x+lgconsultas_extradisplay <= numberQuestion) ? x+lgconsultas_extradisplay : numberQuestion;
        $('#idTab785 table:lt('+x+')').show();
    });

    $(document).on('click', '#displayLessC', function () {
        x=lgconsultas_default_display;
        $('#idTab785 table').not(':lt('+x+')').hide();
    });

    $(document).on('click', '#cerrar_enviado', function() {
        $.fancybox.close;
    });

    $(document).on('click', '#lgconsultas_error_message_close_button', function(){
        $('#lgconsultas_error_message').hide();
    });
});
