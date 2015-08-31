this.onload = function() {
  var url = 'http://camp.efigence.com/camp/api/places';

  function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != 'undefined'){ 
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
  }

     var xhr = createCORSRequest('GET', url);
     if(xhr) {
        xhr.onload = function() {
          if(xhr.status == 200) {
            var arr = JSON.parse(xhr.responseText);
            loadArray(arr);
            paginate(arr);

          } else if (xhr.status == 422) {
            console.log('Unprocessable entity ');
          } else if (xhr.status == 500) {
            console.log('Server crashed for some <%= reason %> ');
          }
        };
     }
      xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
      xhr.send(null);

  /********** LOAD CONTENT TO ARRAY ***************/

  function loadArray(arr) {
      var article = '';
      for(var i = 0; i < Object.keys(arr.places).length; i++) {
        article += '<div class="row"><div class="col-md-3 col-md-offset-1 col-sm-3 col-xs-8"><img src="../public/img/gallery' + Math.floor(6*Math.random() + 1) + '.jpg" alt="miejscowka"></div><div class="col-md-4 col-sm-6 col-xs-12"><article>';
        article += '<h1 class="news-title">' + arr.places[i].place + '</h1>';
        article += '<h2 class="news-details">' + arr.places[i].district + '</h2>';
        article += '<div class="grade">';
        for(var j = 0; j < parseInt(arr.places[i].starts); j++) {
          article += '<span class="icon" data-icon="&#xe60c;"></span>';
        }       
        article += '</div>';
        article += '<p class="description">' + arr.places[i].description + '</p>';
        article += '<a href="#" class="read-more"> Szczegóły </a>';
        article += '</article></div>';
        article += '<div class="col-md-1 col-sm-1 options">';
        if( arr.places[i].wifi) {
          article += '<a href="#" data-toggle="tooltip" title="Wifi" class="icon" data-icon="&#xe600;"></a>';
        }
        article += '</div>';
        article += '<div class="col-md-2 col-sm-3 col-xs-6 price-details">'
        article += '<h1 class="rating">' + opinionRate(parseInt(arr.places[i].score)) + ' '+ arr.places[i].score + '/10 </h1>'
        article += '<h2 class="opinions-number"> Ocena na podstawie ' + arr.places[i].opinion_count + ' opinii </h2>'
        article += '<h3 class="before-discount"> ' + arr.places[i].oldprice + '00,00 PLN </h3>'
        article += '<h4 class="after-discount"> ' + arr.places[i].price + '00,00 <span class="grey"> PLN </span> </h4>'
        article += '<h5 class="nights"> Cena za 3 noce </h5>'
        article += '<button class="btn"> Zarezerwuj teraz </button>'
        article += '</div>';
        article += '</div>';
      }

    var content =  document.querySelector('.information-table .container-fluid');
    content.innerHTML = article;

    function opinionRate(num) {
      var opinion = '';
      num = parseFloat(num);

      if(num <= 3.0) {
        opinion = 'Słaby';
      } else if (num > 3.0 && num <= 5.0) {
        opinion = 'Średni';
      } else if (num > 5.0 && num <= 7.0) {
        opinion = 'Dobry';
      } else if (num > 7.0 && num <= 9.0) {
        opinion = 'Bardzo dobry';
      } else if (num > 9.0) {
        opinion = 'Rewelacyjny';
      }

      return opinion;
    }
  }

  /********** PAGINATION ***************/
  function paginate(arr) {
    var content = '';
    content += '<ul>';
    var list = document.querySelector('.list');
    for(var i = 0; i < parseInt(arr.total_pages); i++) {
      content += '<li>' + (i+1) + '</li>';
    }
    content += '</ul>'
    list.innerHTML = content;
  }
  
};