
$(function() {
    var popoverList1 = [].slice.call(document.querySelectorAll('[data-bs-toggle = "popover"]'))  
    var popoverList2 = popoverList1.map(function (popoverTriggerfun) {  
        return new bootstrap.Popover(popoverTriggerfun)  
    })
});