
$(document).ready(() => {

    //Load section options dropdown.
    loadOptions();

    // Changes about layout.
    $('#sections').change(() => {
        $("#gc").css({ "display": "grid" });        
        $("#gc").show(800);                      
        $("#footer").css({ "height": "100%" });
        $("#footer").css({ "vertical-align": "baseline" });        
    });    

    //NYT API AJAX
    //const apiKey = "e39450d32dde4bd6bb9f9b190ef0ecd3";
    //const apiKey = "KmsBblecPJNYqq63HEUCCGErfmXvojSL";
	const apiKey = "sC16HimL1tCsCV47MyFbEn8w3fnnv7mF";
    let valueSelected = null;

    //Load of news.
    $('#sections').on('change', (e) => {
        e.preventDefault();

        $('#loading').show();
        
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
          let count = 0;
          let results = data.results;             
                 console.log(data);                                                                      
            $.each(results, (index, value) => {   
                if(count < 12){        

                    let caption = null;

                    //Validation for caption in null.
                    if(value.multimedia[1].caption == ""){
                        caption = value.title;
                    }else{
                        caption = value.multimedia[1].caption;
                    }
                    
                    //Load image, description and link for each new.
                    div = $('<div><h4 class="caption">' + caption + '</h4>' + '<a href="' + value.url + '" class="external">' + '</div>').addClass('module opp');
                    div.attr("id","item"+count);                                 
                    div.css('background-image', 'url(' + value.multimedia[1].url + ')');   
                    $('.external').attr('target', '_blank');      
                    count++;
                    $('#gc').append(div);

                    //Open the new selected in a new tab. 
                               
                    $('.module').click(function () {
                        window.open(value.url);
                    });                                                                                
                }else{
                    return false;
                }                                    
                $('#loading').hide();
                $("#footer").css({ "height": "100px" });
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

    $(".caption").on("click",function() {
        $(this).fadeOut("fast");
      }); 
});


