$(function() {
    $(".reply_button").live('click', function(event) {
        event.preventDefault();
        var id = $(this).attr("id");
        if ($("#li_comment_" + id).find('ul').size() > 0) {
            $("#li_comment_" + id + " ul:first").prepend($("#comment_form_wrapper"));
        } else {
            $("#li_comment_" + id).append($("#comment_form_wrapper"));
        }
        var depth_level = $('#li_comment_' + id).data('depth-level');
        $("#reply_id").attr("value", id);
        $("#depth_level").attr("value", depth_level);
    });



    $(".delete_button").live('click', function(event) {
        event.preventDefault();
        var id = $(this).attr("id");
        $.ajax({
            type: "POST",
            //async: false,
            url: "del_comment.php",
            data: 'delete='+id,
            dataType: "text",
            cache: false,
            success: function(response) {
                var result = jQuery.parseJSON( response );
                for(i=0;i<result.length;i++) {
                    $('#li_comment_' + result[i]).fadeOut();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(textStatus, errorThrown);
                alert(textStatus + " " + errorThrown);
            }
        });
    });

    $("#comment_form").bind("submit", function(event) {
        event.preventDefault();
        if ($("#comment_text").val() == "")
        {
            alert("Please enter your comment");
            return false;
        }
        $.ajax({
            type: "POST",
            //async: false,
            url: "add_comment.php",
            data: $('#comment_form').serialize(),
            dataType: "html",
            cache: false,
            beforeSend: function() {
                $('#comment_wrapper').block({
                    message: 'Please wait....',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#ccc',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px'
                    },
                    overlayCSS: {
                        backgroundColor: '#ffe'
                    }
                });
            },
            success: function(comment) {
                var reply_id = $("#reply_id").val();
                if (reply_id == "") {
                    $("#comment_wrapper ul:first").prepend(comment);
                }
                else {
                    if ($("#li_comment_" + reply_id).find('ul').size() > 0) {
                        $("#li_comment_" + reply_id + " ul:first").prepend(comment);
                    }
                    else {
                        $("#li_comment_" + reply_id).append('<ul class="comment">' + comment + '</ul>');
                    }
                }
                $("#comment_text").attr("value", "");
                $("#reply_id").attr("value", "");
                $("#comment_wrapper").prepend($("#comment_form_wrapper"));
                $('#comment_wrapper').unblock();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(textStatus, errorThrown);
                alert(textStatus + " " + errorThrown);
            }
        });
    });
});