function module(url) {
    
    this.url = url;

    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != 'undefined') {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }

        return xhr;
    }

    function sendRequest(method, data) {
        return new Promise(function(resolve,reject) {
            var parameters = JSON.stringify(data) || null;
            var xhr = createCORSRequest(method, url);
            if (xhr) {
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(console.log(xhr.statusText));
                    }
                };
            }

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(parameters);
        });
    };

    function loadArray(arr, page) {
        page = page || 1;
        var article = '';

        var limitBottom = arr.total_count / arr.total_pages * (parseInt(page) - 1);
        var limitTop = arr.total_count / arr.total_pages * parseInt(page);

        for (var i = 0; i < arr.places.length; i++) {
            if (arr.places[i].id >= limitBottom && arr.places[i].id < limitTop) {
                article += '<div class="row"><div class="col-md-3 col-md-offset-1 col-sm-3 col-xs-8"><img src="../public/img/gallery' + Math.floor(6 * Math.random() + 1) + '.jpg" alt="miejscowka"></div><div class="col-md-4 col-sm-6 col-xs-12"><article>';
                article += '<h1 class="news-title">' + arr.places[i].place + '</h1>';
                article += '<h2 class="news-details">' + arr.places[i].district + '</h2>';
                article += '<div class="grade">';
                for (var j = 0; j < parseInt(arr.places[i].starts); j++) {
                    article += '<span class="icon" data-icon="&#xe60c;"></span>';
                }
                article += '</div>';
                article += '<p class="description">' + arr.places[i].description + '</p>';
                article += '<a href="#" class="read-more"> Szczegóły </a>';
                article += '</article></div>';
                article += '<div class="col-md-1 col-sm-1 options">';
                if (arr.places[i].wifi) {
                    article += '<a href="#" data-toggle="tooltip" title="Wifi" class="icon" data-icon="&#xe600;"></a>';
                }
                if (arr.places[i].tv) {
                    article += '<a href="#" data-toggle="tooltip" title="TV" class="icon" data-icon="&#xe602;"></a>';
                }
                if (arr.places[i].food) {
                    article += '<a href="#" data-toggle="tooltip" title="Restauracje" class="icon" data-icon="&#xe60a;"></a>';
                }
                if (arr.places[i].paypas) {
                    article += '<a href="#" data-toggle="tooltip" title="Możliwośc płatności kartą debetową" class="icon" data-icon="&#xe601;"></a>';
                }
                if (arr.places[i].swimming) {
                    article += '<a href="#" data-toggle="tooltip" title="Kąpieliska" class="icon" data-icon="&#xe604;"></a>';
                }
                if (arr.places[i].airport) {
                    article += '<a href="#" data-toggle="tooltip" title="Lotnosko" class="icon" data-icon="&#xe603;"></a>';
                }
                if (arr.places[i].parking) {
                    article += '<a href="#" data-toggle="tooltip" title="Parking" class="icon"> P </a>';
                }
                article += '</div>';
                article += '<div class="col-md-2 col-sm-3 col-xs-6 price-details">'
                article += '<h1 class="rating">' + opinionRate(parseFloat(arr.places[i].score)) + ' ' + arr.places[i].score + '/10 </h1>'
                article += '<h2 class="opinions-number"> Ocena na podstawie ' + arr.places[i].opinion_count + ' opinii </h2>'
                article += '<h3 class="before-discount"> ' + arr.places[i].oldprice + ',00 PLN </h3>'
                article += '<h4 class="after-discount"> ' + arr.places[i].price + ',00 <span class="grey"> PLN </span> </h4>'
                article += '<h5 class="nights"> Cena za 3 noce </h5>'
                article += '<button class="btn"> Zarezerwuj teraz </button>'
                article += '</div>';
                article += '</div>';
            }
        }

        var content = document.querySelector('.information-table .container-fluid');
        content.innerHTML = article;
    }

    function opinionRate(num) {
        var opinion = '';

        if (num <= 3.0) {
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

    function paginate(arr, p) {
        var content = '';
        p = p || 1;
        content += '<ul>';
        var list = document.querySelector('.list');
        for (var i = 1; i <= parseInt(arr.total_pages); i++) {
            content += '<li class="page">' + i + '</li>';
        }
        content += '</ul>'
        list.innerHTML = content;

        var pages = document.querySelectorAll('.page');
        var prev = document.querySelector('.prev');
        var next = document.querySelector('.next');
        
        for(var i = 0; i < pages.length; i++) {
            (function(p){ 
                pages[p].addEventListener('click', function() {
                    loadArray(arr,p+1);
                });
            })(i);
        }
    }

    return {
        sendRequest: sendRequest,
        paginate: paginate,
        loadArray: loadArray
    }
}  
