
$(document).ready(function () {

    $('#sections').change(function () {        
        $(".grid-container").show(800);
        $(".grid-container").css({ "display": "grid" });
    });

    $("#sections").change(function () {
        var valueSelected = $('#sections').find(":selected").text();
        alert(valueSelected);
    });
});