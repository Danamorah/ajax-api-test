$(function() {
    
    var $addMusic = $("#new_music"),
        $musicList = $("#music_list").find("tbody"),
        $deleteMusic = $(".music_delete"),
        $status = $(".status"),
        $noMusic = $(".no_music")
        addAPIPath = $addMusic.attr("action");
        
    var template = "<tr>";
        template += "<td>{{title}}</td>";
        template += "<td>{{artist}}</td>";
        template += "<td>{{year}}</td>";
        template += "<td>{{genre}}</td>";
        template += "<td><a class='music_delete' data-method='delete' href='/musics/{{id}}'>x</a></td>";
        template += "</tr>"
    
    var  manageStatus = function (message, doShow) {
        $status.text(message);
        doShow ? $status.fadeIn(10, "linear") : $status.fadeOut(4000, "linear");
    };
    

    var addSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        var song = {
            title: $("#music_title").val(),
            artist: $("#music_artist").val(),
            year: $("#music_year").val(),
            genre: $("#music_genre").val()
        };
        
        manageStatus("Status: Sending request...", true);


        // mi codigo//

        if(song.title == "" || song.title.lenght < 40){
            //mensajeError = mensajeError + "<p>Error: Invalid Title</p>";
            manageStatus("Invalid Title");
            return;
        }
        if(song.artist == "" || song.artist.lenght < 60){
            manageStatus("Invalid Artist");
            return;
        }
        if(song.year == "" || isNaN(song.year) || parseInt(song.year) < 1900 || parseInt(movie.year) > 2016){
            manageStatus("Invalid Year");
            return;
        }
        if(song.genre == "" || song.genre.lenght < 30){
            manageStatus("Invalid Genre");
            return;

        } 
        

        //fin de mi codigo    
        
        $.ajax({
            url: addAPIPath,
            type: 'post',
            dataType: 'json',
            data: song,
            success: function (response) {
                $musicList.append(template.replace("{{title}}", response.title)
                                          .replace("{{artist}}", response.artist)
                                          .replace("{{year}}", response.year)
                                          .replace("{{genre}}", response.genre)
                                          .replace("{{id}}", response.id));
                                          
                                          
                manageStatus("Status: OK", false);
            },
            error: function (error) {
                manageStatus("Status: Request Failed", false);
            }
        });
        
    };
    
    var deleteSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    };
    
    var init = function () {
        $addMusic.submit(addSong);
        $deleteMusic.click(deleteSong);
    };
    
    init();

    
// end jquery    
});