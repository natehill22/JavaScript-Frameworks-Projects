$(document).ready(function() { //Ensures DOM is fully loaded before running scripts
    $("ul li:first-child").click(function(){
        $(this).fadeOut("fast", function(){
            alert("First child is now hidden");
        });
    });

    $("p:first").hover(function(){
        $(this).hide();
    });

    $("*").dblclick(function(){
        $("p:first").fadeIn("slow");
    });

    $("input").focus(function(){
        $(this).css("background-color", "white");
    });

    $("input").blur(function(){
        $(this).css("background-color", "grey");
    });

    $("button").click(function(){
        $("#toggleTest").toggle();
    });

    $("#clicktrigger").click(function(){
        $("#panel").slideToggle();
    });

    $("#animatetrig").click(function(){
        var div = $("div");
        div.animate({height: '150px', opacity: '0.4'}, "slow");
        div.animate({width: '150px', opacity: '0.8'}, "slow");
        div.animate({height: '50px', opacity: '0.4'}, "slow");
        div.animate({width: '50px', opacity: '0.8'}, "slow");    
    });

    $("#stop").click(function(){
        $("div").stop(true);
    });

    $("#chaintest").click(function(){
        $("#secondpanel").slideUp(1000).css("color", "brown").slideDown(1000)
    });

    $("#texttrig").click(function(){
        alert("Text: " + $("#texttest").text());
    });

    $("#htmltrig").click(function(){
        alert("HTML: " + $("#texttest").html());
    });

    $("#linktrig").click(function(){
        alert("Href: " + $("#linktest").attr('href'));
    });
});