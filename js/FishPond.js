

$(function() {
    var el = document.getElementById('FishPondList');

    el.innerHTML = 
    '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(../Img/plus.PNG); width: 130px; height: 130px;"></div>' + 
    '<div class="card" style="width: 18rem;">'+
        '<img src="..." class="card-img-top" alt="...">'+
        '<div class="card-body">'+
            '<h5 class="card-title">Card title</h5>'+
            '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>'+
            '<a href="#" class="btn btn-primary">Go somewhere</a>'+
        '</div>'+
    '</div>';
});

