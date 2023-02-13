var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

$(document).ready(function(){
        $("[data-toggle='popover']").popover({
            html: true,
            template:   '<div class="popover" style="max-width: 300px">' +
                            '<div class="arrow"></div>' +
                            '<h3 class="popover-title"></h3>' +
                            '<div class="popover-content"></div>' +
                            '<div class="popover-footer">' +
                                '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                                '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                                '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                                '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                            '</div>'+
                        '</div>'
        });
    });

function Myfn(){
    var A = 10
}
