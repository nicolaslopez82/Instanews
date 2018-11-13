
$(document).ready(function () {

    
    // Changes about layout.
    $('#sections').change(function () {
        $("#gc").css({ "display": "grid" });        
        $("#gc").show(800);        
        $("#footer").css({ "height": "100px" });
        $("#footer").css({ "vertical-align": "baseline" });
    });    

    //NYT API AJAX
    var apiKey = "e39450d32dde4bd6bb9f9b190ef0ecd3";
    var valueSelected = null;

    // $("#sections").change(function () {
    //     valueSelected = $('#sections').find(":selected").text();
    //     alert(valueSelected);
    // });

    $('#sections').on('change', function (e) {
        e.preventDefault();
        
        valueSelected = $('#sections').find(":selected").text();
                
        var url = "https://api.nytimes.com/svc/topstories/v2/" + valueSelected + ".json";
        url += '?' + $.param({
          'api-key': "e39450d32dde4bd6bb9f9b190ef0ecd3"
        });              
        
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(data) {
          console.log(data);	          
                    var results = data.results;             
                    var count = 0;                                               
                    $.each(results, function (index, value) {                          
                    var div = $('<div><h4 class="caption">' + value.title + '</h4>' + '</div>').addClass('module opp');
                    $(div).attr("id","item"+count);
                    //alert(value.multimedia[1].url);
                    $('#item'+count).css('background-image', 'url(' + value.multimedia[1].url + ')');                    
                    count++;
                    $('#gc').append(div);                                                             
                    });			 
        }).fail(function(err) {
            $('#gc').html('Sorry, article not found.')
          throw err;
        });
    
    });

});