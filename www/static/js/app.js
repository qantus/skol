$(function () {
    $(document).ajaxComplete(function (e, xhr, settings) {
        if (xhr.status == 278) {
            var location = xhr.getResponseHeader("Location");
            if (location) {
                window.location.href = xhr.getResponseHeader("Location");
            }
        }
    });

    $(document).on('click', 'a.mmodal', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.mmodal({
            width: $this.data('width')
        });
        return false;
    });

    $.mendless({
        appendStrategy: 'afterData'
    });

    $(document).foundation();

    $(document).on('submit', '.mmodal-form', function (e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            type: 'post',
            url: $this.attr('action'),
            data: $this.serialize(),
            success: function (data) {
                if (data.success) {
                    $.mnotify({title: data.title});
                    $this.find('input').val('');
                } else {
                    var message = '';
                    for (var fieldName in data.errors) {
                        message += "<br/>" + data.errors[fieldName].join("<br/>");
                    }
                    $.mnotify({
                        title: data.title,
                        message: message
                    });
                }
            }
        });
        return false;
    });

    /* Fancybox defaults */
    $('.lightview').attr('rel', 'gallery').fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        helpers : {
            buttons : {}
        }
    });

    $('.fancybox-media').fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        helpers : {
            media : {}
        }
    });

    var elements = [];
    $('.main-menu a').each(function(index){
        var $element = $($(this).attr('href'));
        if ($element.length){
            elements.push({
                'block': $element,
                'link': $(this)
            });
        }
    });

    if (!(navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/iPod/i))) {
        $(".main-menu a, .anchor-link").on('click', function (e) {
            e.preventDefault();

            var id = $(this).attr("href");
            var offset = $(id).offset();

            $("html, body").animate({
                scrollTop: offset.top - 84
            }, 300);

            return false;
        });
    }

    $(document).on('scroll',function(e){
        var $elem;
        var $link;
        var $key;
        var offset;
        var scroll = $(document).scrollTop();
        var margin = 300;
        var heightTop = 84 + margin;

        for($key in elements){
            $elem = elements[$key]['block'];
            $link = elements[$key]['link'];

            offset = $elem.offset();

            if (offset['top']){
                var top = offset['top'];
                var bottom = top + $elem.outerHeight(true);
            }


            if ((scroll + heightTop < bottom) && (scroll + heightTop >= top) ){
                if (!$link.hasClass('active')){
                    $link.addClass('active')
                }
            }else{
                if ($link.hasClass('active')){
                    $link.removeClass('active')
                }
            }
        }
    });

    $(document).on('scroll', function(e){
        var margin = 200;
        var scrolled = $(window).scrollTop() + $(window).height();

        $('.need-animation').each(function(){
            var offset = $(this).offset();
            var item_margin = margin;
            if ($(this).data('margin')){
                item_margin = $(this).data('margin');
            }
            if (offset.top && scrolled - margin >= offset.top){
                $(this).removeClass('need-animation');
                $(this).addClass('animate');
            }
        });

    });
});


$(document).ajaxComplete(function (data, textStatus, jqXHR) {
    if (jqXHR.status == 278) {
        window.location = jqXHR.getResponseHeader("Location");
    }
});