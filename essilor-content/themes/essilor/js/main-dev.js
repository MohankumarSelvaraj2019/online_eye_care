// Gestion du recaptcha multiple sur certaines pages (à cause du form contact dans le footer)
var recaptcha_contact;
var recaptcha2;
var myCallBackRecaptcha = function() {
    recaptcha_contact = grecaptcha.render('recaptcha_contact', {
        'sitekey': '6Lcn_h0TAAAAAFhueOaNASrzb7WMzWm5fYOMZcN8',
        'size': 'compact'
    });

    if ($("#recaptcha2").length) {
        recaptcha2 = grecaptcha.render('recaptcha2', {
            'sitekey': '6Lcn_h0TAAAAAFhueOaNASrzb7WMzWm5fYOMZcN8',
            'size': 'compact'
        });
    }
};

$(document).ready(function() {

    /*
		script load stock exchange
	   */
    $.ajax({
            url: '/essilor-content/uploads/stock-exchange/stock-exchange-values.json',
            method: "GET",
            dataType: "json",
            data: {}
        })
        .done(function(data) {
            $('.js_stock_exchange_value').text(data.valeur);
            $('.js_stock_exchange_variation').text(data.variation);
        })
        .fail(function() {
            console.log('stock exchange json load fail')
        })

    /*
		redirect on country selector in single marque
	   */
    $('#selector_country').on('change', function() {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });

    $('.filterFormCustomPost select').on('change', function() {
        $(this).parents('.filterFormCustomPost').submit();
    });

    /*
    	put good url in dtat-url-download
    	*/
    $('#selector_infos_reglementees').on('change', function() {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            $("#download_infos_reglementees").data("url-download", url);
        }
        return false;
    });

    /*
    	redirect to dl zip file
       */
    $('#download_infos_reglementees').on('click', function() {
        url = $("#download_infos_reglementees").data("url-download");
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });




    $("#inscription_newsletter").submit(function(event) {
        event.preventDefault();
        $('#div_home_newsletter').removeClass('form--error form--success');
        $('#p_home_msg_newsletter').empty();
        $(this).find('.form__fieldInput').removeClass('form__fieldInput--error');
        // envoi
        $.ajax({
            type: 'POST',
            url: config.inscription_newsletter,
            data: $("#inscription_newsletter").serialize(),
            success: function(jsonData) {
                // affichage message
                $('#p_home_msg_newsletter').html(jsonData.msg);

                if (jsonData.status === 'success') {
                    $("#inscription_newsletter")[0].reset();
                    $('#div_home_newsletter').addClass('form--success');
                } else {
                    // classe sur le conteneur
                    $('#div_home_newsletter').addClass('form--error');
                    // classe sur chaque input
                    if (jsonData.fields.length > 0) {
                        for (var i = 0; i < jsonData.fields.length; i++) {
                            $(jsonData.fields[i]).addClass('form__fieldInput--error');
                        }
                    }
                }
            }
        });
    });

    $('#objet').change(function() {
        // récupération en ajax des pays associés
        $.ajax({
            type: 'POST',
            url: config.contact_pays,
            data: 'objet=' + $(this).val() + '&lang_contact=' + $('#lang_contact').val(),
            success: function(jsonData) {
                if (jsonData.status === 'success') {
                    $("#pays").html(jsonData.html);

                    // reload du skin
                    $(".jsCustomSelect").selectric({
                        responsive: true
                    });
                }
            }
        });

        // candidature ?
        var selected = $(this).find('option:selected');

        if (1 === parseInt(selected.data('show_cv'))) {
            $("#bloc_cv").fadeIn("fast");
        } else {
            $("#bloc_cv").fadeOut("fast");
            // on cache, donc on vide les messages
            $('#cv_file_name').empty();
            $('#lm_file_name').empty();
        }
    });

    // Upload Ajax CV
    $('#my-cv').fileupload({
        url: config.upload,
        dataType: 'json',
        done: function(e, data) {
            if ('error' === data.result.status) {
                $('#cv_file_name').html('<span style="color:red;">' + data.result.msg + '</span>');
            } else {
                $('#cv_file_name').html(data.result.file);
            }
        }
    });

    // Upload Ajax Lettre de motivation
    $('#my-ldm').fileupload({
        url: config.upload,
        dataType: 'json',
        done: function(e, data) {
            if ('error' === data.result.status) {
                $('#lm_file_name').html('<span style="color:red;">' + data.result.msg + '</span>');
            } else {
                $('#lm_file_name').html(data.result.file);
            }
        }
    });


    $("#form_contact").submit(function(event) {
        event.preventDefault();
        $('#div_form_contact').removeClass('form--error form--success');
        $('#p_footer_msg_contact').empty();
        $(this).find('.form__fieldInput').removeClass('form__fieldInput--error');
        $(this).find('.form__fieldTextArea').removeClass('form__fieldInput--error');
        // envoi
        $.ajax({
            type: 'POST',
            url: config.contact,
            data: $("#form_contact").serialize(),
            success: function(jsonData) {
                // affichage message
                $('#p_footer_msg_contact').html(jsonData.msg);
                // reset du captcha
                grecaptcha.reset(recaptcha_contact);

                if (jsonData.status === 'success') {
                    $("#form_contact")[0].reset();
                    $('#div_form_contact').addClass('form--success');
                    $('#cv_file_name').empty();
                    $('#lm_file_name').empty();
                } else {
                    // classe sur le conteneur
                    $('#div_form_contact').addClass('form--error');
                    // classe sur chaque input
                    if (jsonData.fields.length > 0) {
                        for (var i = 0; i < jsonData.fields.length; i++) {
                            $(jsonData.fields[i]).addClass('form__fieldInput--error');
                        }
                    }
                }
            }
        });
    });

    $("#form_alerte").submit(function(event) {
        event.preventDefault();
        $('#div_form_alerte').removeClass('form--error form--success');
        $('#p_msg_alerte').empty();
        $(this).find('.form__fieldInput').removeClass('form__fieldInput--error');
        // envoi
        $.ajax({
            type: 'POST',
            url: config.alerte,
            data: $("#form_alerte").serialize(),
            success: function(jsonData) {
                // affichage message
                $('#p_msg_alerte').html(jsonData.msg);
                // reset du captcha
                grecaptcha.reset(recaptcha2);

                if (jsonData.status === 'success') {
                    $("#form_alerte")[0].reset();
                    $('#div_form_alerte').addClass('form--success');
                } else {
                    // classe sur le conteneur
                    $('#div_form_alerte').addClass('form--error');
                    // classe sur chaque input
                    if (jsonData.fields.length > 0) {
                        for (var i = 0; i < jsonData.fields.length; i++) {
                            $(jsonData.fields[i]).addClass('form__fieldInput--error');
                        }
                    }
                }
            }
        });
    });



    /*function show_next_hashtags() {
    	$('.AjaxNew').first().removeClass('AjaxNew').slideDown('fast', function() {
    		show_next_hashtags();
    	});
    }	*/



    $('#show_more_hashtags').click(function(e) {
        e.preventDefault();

        var url = $(this).data('url');

        var data = {
            page: $(this).data('page'),
            maxpage: $(this).data('maxpage'),
            lang: $(this).data('lang'),
            t: Date.now()
        };

        jQuery.post(url, data, function(jsonData) {
            if (jsonData.status === 'success') {
                // succès

                $(jsonData.html).filter(".gridWall__item").each(function() {
                    var item = $(this);
                    var isotop = $('#social-wall-grid-more').data("isotop");
                    isotop.append(item).isotope('appended', item);
                    isotop.imagesLoaded().progress(function() {
                        isotop.isotope('layout');
                    });
                });

                $('.btnLoadMore').removeClass('btnLoadMore__active');
                $('.btnLoadMore__bubble').removeClass('btnLoadMore__anim');

                //
                //$('#social-wall-grid-more').append(jsonData.html);

                //show_next_hashtags();

                if (jsonData.show_next) {
                    $('#show_more_hashtags').data('page', jsonData.page);
                } else {
                    $('#show_more_hashtags').hide();
                }
            }
        });
    });


    /* Forcer le formulaire de contact */
    if ($('.popinOverlay').hasClass('popinOverlay--forceContact')) {
        $('#popinFormContact').css("display", "block");
    }


});