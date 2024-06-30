$(document).ready(function() {
                    
    var options = {
        html: true,
        title: "Optional: HELLO(Will overide the default-the inline title)",
        //html element
        //content: $("#popover-content")
        content: $('[data-name="popover-content"]')
        //Doing below won't work. Shows title only
        //content: $("#popover-content").html()

    }
    
    var exampleEl = document.getElementById('example')
    var popover = new bootstrap.Popover(exampleEl, options)

    options = {
        html: true,
        title: "Optional: HELLO(Will overide the default-the inline title)",
        //html element
        //content: $("#popover-content")
        content: $('[data-name="popover-content1"]')
        //Doing below won't work. Shows title only
        //content: $("#popover-content").html()

    }
    var exampleEl = document.getElementById('example1')
    var popover1 = new bootstrap.Popover(exampleEl, options)
})

var A = "TEST";

function Test(){
    console.log("12345798")

}
function test2(){
    console.log("987654321");
    console.log(typeof A);
    console.log(typeof B)
    if(typeof B == "undefined"){
        console.log("yes")
    }
}


function SuccessPosition(){
    let Newicon = document.querySelector('#New')
    let Newicon1 = document.querySelector('#A')
    Newicon.addEventListener('mousedown', (e) => {
        console.log("New: " + Newicon.offsetLeft)
        console.log("New: " + Newicon.offsetTop)
        console.log("New: " + Newicon.clientX)
        console.log("New: " + Newicon.clientY)
    });
    Newicon1.addEventListener('mousedown', (e) => {
        console.log("A: " + Newicon1.offsetLeft)
        console.log("A: " + Newicon1.offsetTop)
        console.log("A: " + Newicon1.clientX)
        console.log("A: " + Newicon1.clientY)
    }); 




}