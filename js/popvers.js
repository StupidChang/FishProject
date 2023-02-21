var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

var popover = new bootstrap.Popover(document.querySelector('#test'), {
    container: 'body'
  })

  /*$("#test").popover({
    html: true,
    content:" <span>Task 1: 6h. Approved: False <button id='btn_worker1_date1' class='btn btn-success btn-sm'>Approve</button></span> <span>Task 2: 2h. Approved: True <button id='btn_worker1_date2' class='btn btn-danger btn-sm'> Disapprove</button></span>",
}).on('shown.bs.popover', () => {
	document.querySelector("#test").textContent = "Modified Text";
});*/



$(document).ready(function(){
        $("#test").popover({
            trigger : 'click',  
            placement : 'left', 
            html: true,
            template:   '<div class="popover" style="max-width: 300px">' +
                            '<div class="arrow"></div>' +
                            '<h3 class="popover-title">感測器列表</h3>' +
                            '<div class="popover-content"></div>' +
                            '<div class="popover-footer">' +
                                '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(../img/plus.PNG); width: 130px; height: 130px;"></div>' +
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
