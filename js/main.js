
$(document).ready(() => {

    //Load section options dropdown.
    loadOptions();

    // Changes about layout.
    $('#sections').change(() => {
        $("#gc").css({ "display": "grid" });        
        $("#gc").show(800);                      
        $("#footer").css({ "height": "100px" });
        $("#footer").css({ "vertical-align": "baseline" });        
    });    

    //NYT API AJAX
    const apiKey = "e39450d32dde4bd6bb9f9b190ef0ecd3";
    let valueSelected = null;

    //Load of news.
    $('#sections').on('change', (e) => {
        e.preventDefault();
        
        valueSelected = $('#sections').find(":selected").text();
        $('#gc').empty();

        let url = "https://api.nytimes.com/svc/topstories/v2/" + valueSelected + ".json";
        url += '?' + $.param({
          'api-key': apiKey
        });              
        
        $.ajax({
          url: url,
          method: 'GET',
        }).done((data) => {
        
          console.log(data);	                                                      
          let count = 0;
          let results = data.results;             
                                                                                       
            $.each(results, (index, value) => {   
                if(count < 12){
                    div = $('<div><h4 class="caption">' + value.title + '</h4>' + '</div>').addClass('module opp');
                    div.attr("id","item"+count);                    
                    div.css('background-image', 'url(' + value.multimedia[1].url + ')');                    
                    count++;
                    $('#gc').append(div);                                                             
                }else{
                    return false;
                }                                           
            });			 
        }).fail((err) => {
            $('#gc').html('Sorry, article not found.')
          throw err;
        });
    
    });

    function loadOptions(){
        const sectionList = ['Sections...', 'home', 'opinion', 'world', 'national', 'politics', 'upshot', 
                           'nyregion', 'business', 'technology', 'science', 'health', 'sports', 'arts',
                            'books', 'movies', 'theater', 'sundayreview', 'fashion', 'tmagazine', 'food',
                           'travel', 'magazine', 'realestate', 'automobiles', 'obituaries', 'insider', ];

        sectionList.forEach(element => {            
            $('#sections').append('<option>' + element + '</option>');
        });        
    }
});


