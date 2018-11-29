
$(document).ready(function () {

    //Load section options dropdown.
    loadOptions();

    // Changes about layout.
    $('#sections').change(function () {
        $("#gc").css({ "display": "grid" });        
        $("#gc").show(800);                      
        $("#footer").css({ "height": "100px" });
        $("#footer").css({ "vertical-align": "baseline" });
        //$('#gc').empty();
    });    

    //NYT API AJAX
    var apiKey = "e39450d32dde4bd6bb9f9b190ef0ecd3";
    var valueSelected = null;

    //Load of news.
    $('#sections').on('change', function (e) {
        e.preventDefault();
        
        valueSelected = $('#sections').find(":selected").text();
        //$('#gc').empty();

        var url = "https://api.nytimes.com/svc/topstories/v2/" + valueSelected + ".json";
        url += '?' + $.param({
          'api-key': "e39450d32dde4bd6bb9f9b190ef0ecd3"
        });              
        
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(data) {
        
          console.log(data);	                                                      
          let count = 0;
          let results = data.results;             
                                                                                       
            $.each(results, function (index, value) {   
                if(count < 12){
                     div = $('<div><h4 class="caption">' + value.title + '</h4>' + '</div>').addClass('module opp');
                    $(div).attr("id","item"+count);                    
                    $('#item'+count).css('background-image', 'url(' + value.multimedia[1].url + ')');                    
                    count++;
                    $('#gc').append(div);                                                             
                }else{
                    return false;
                }                                           
            });			 
        }).fail(function(err) {
            $('#gc').html('Sorry, article not found.')
          throw err;
        });
    
    });

    function loadOptions(){
        var sectionList = ['Sections...', 'home', 'opinion', 'world', 'national', 'politics', 'upshot', 
                           'nyregion', 'business', 'technology', 'science', 'health', 'sports', 'arts',
                            'books', 'movies', 'theater', 'sundayreview', 'fashion', 'tmagazine', 'food',
                           'travel', 'magazine', 'realestate', 'automobiles', 'obituaries', 'insider', ];

        sectionList.forEach(element => {            
            $('#sections').append('<option>' + element + '</option>');
        });
        
    }

});


