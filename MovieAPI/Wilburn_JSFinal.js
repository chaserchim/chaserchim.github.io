console.log("Loaded")

function StartSearch() {
    


    var text = document.getElementById('searchinput').value

    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=d679fde66f26446209b8cc73da013642&query=' + text)
    request.send()
    request.onload = function() {
    //console.log(request)
    if (request.status === 200) {
        var resultsdiv = document.getElementById('results')
        console.log(JSON.parse(request.response))

        var json = JSON.parse(request.response)
        
        if (json.total_results > 0) {
            document.getElementById('results').style.display = 'block'
            document.getElementById('error').style.display = 'none'
        }
        else {
            document.getElementById('results').style.display = 'none'
            document.getElementById('error').style.display = 'block'
        }

        for (const x in json['results'][0]){
            if (x == 'poster_path') {
                var image = document.createElement('img')
                document.getElementById('poster').setAttribute('src', 'http://image.tmdb.org/t/p/w500/' + json['results'][0][x])
            }

            if (x == 'vote_average') {
                document.getElementById('vote').innerText = json['results'][0][x]
            }

            if (x == 'id') {
                document.getElementById('id').innerText = json['results'][0][x]
            }

            if (x == 'original_language') {
                document.getElementById('lang').innerText = json['results'][0][x]
            }

            if (x == 'original_title') {
                document.getElementById('title').innerText = json['results'][0][x]
            }

            if (x == 'overview') {
                document.getElementById('desc').innerText = json['results'][0][x]
            }

            if (x == 'release_date') {
                document.getElementById('date').innerText = json['results'][0][x]
            }
        }
    }
    else {
        console.log('error ${request.status} ${request.statusText}')
        document.getElementById('results').style.display = 'none'
        document.getElementById('error').style.display = 'block'

    }

    }

}

var searchbutton = document.getElementById('searchbutton')
var searchinput = document.getElementById('searchinput')

searchinput.addEventListener('keyup' , function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        searchbutton.click();
    }
})