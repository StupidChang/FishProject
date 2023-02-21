//const slider = $(document)  //  document.querySelector('.items');
//  var Name = UrlParm.parm("Name")
let HtmlString;
let isDown = false;
let startX = 0;
let startY = 0;
let FinalPositionX = 0;
let FinalPositionY = 0;
let FishPondName = "";

$(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    FishPondName = urlParams.get('Name')
    if(FishPondName != null){
        Get2SQL(FishPondName);
    }
    else{
        alert("無法獲取魚塭名稱!");
    }
    console.log("Hello test");


});

$(document).on('click', '#CreateBtn', function(){
    console.log("HelloCreateBtn");
    AddGroup();
    let Newicon = document.querySelector('#New')
    Newicon.addEventListener('mousedown', (e) => {
        isDown = true;
        //console.log(isDown);
        startX = e.clientX - Newicon.offsetLeft;
        startY = e.clientY - Newicon.offsetTop;
        e.preventDefault();
    });
    
    Newicon.addEventListener('mousemove', (e) => {
        // 滑鼠有被按下才會繼續執行
        if(!isDown) return;
        //console.log("move");
        //console.log(isDown);
        // 阻止預設拖曳會選取的行為
        e.preventDefault();
        // 計算

        //console.log(e.clientX);
        //console.log(e.clientY);
        //console.log(e.clientLeft);
        //console.log(e.clientTop);
        
        //console.log(Newicon.offsetParent);    
        //console.log(Newicon.offsetLeft);
        //console.log(Newicon.offsetTop);
        let x = e.clientX - startX;
        let y = e.clientY - startY;
        //console.log("x =" + x);
        //console.log("y =" + y);

        Newicon.style.top = y + "px";
        FinalPositionY = y;
        Newicon.style.left = x + "px";
        FinalPositionX = x;
    });

    Newicon.addEventListener('mouseup', (e) => {
        isDown = false;
        //console.log("is false!!")
    });
})

$(document).on('click', '#DeleteBtn', function(){
    console.log("HelloDeleteBtn")
})

$(document).on('click', '#DeleteFishPond', function(){
    console.log("HelloDeleteFishPond")
})

function getPosition (element) {
    var x = 0;
    var y = 0;
    // 搭配上面的示意圖可比較輕鬆理解為何要這麼計算
    while ( element ) {
      x += element.offsetLeft - element.scrollLeft + element.clientLeft;
      y += element.offsetTop - element.scrollLeft + element.clientTop;
      element = element.offsetParent;
    }
    return { x: x, y: y };
}

function Get2SQL(Name){
    console.log("inSQL");
    $.ajax({
        Type:'GET',
        url:'../php/GetSensorPosition.php',
        dataType:'json',
        //async: false,
        data:{
            FishPondName:Name
        },
        success: function(response){
            console.log("成功獲取魚塭ID!")
            CreateHTML(response);
        },
        error: function(e){
            console.log("error!")
            console.log(e);
        }
    })
}

function SuccessPosition(){
    let NewX = $('#New').position().top;
    console.log(NewX);
    let NewY = $('#New').position().left;
    console.log(NewY);
    $.ajax({
        method:'POST',
        url:"../php/GetSensorPosition.php",
        type: "json",
        data:{
            FinalPositionX:FinalPositionX,
            FinalPositionY:FinalPositionY,
            FishPondName:FishPondName
        },
        success:function(response){
            window.location.reload();
        },
        error:function(e){
            console.log(e);
        }
    });
}

function AddGroup(){
    HtmlString +=   '<div type="button" class="btn btn-default" title="感測器列表"  data-html="true" data-container="body" data-toggle="popover" data-placement="left" data-content="" style="position: absolute; top: 500px; left: 450px;" id="New">' +
                        '<img src="../Img/icon.PNG" alt="" style="width: 40px; height: 40px; background-position: center">' +
                    '</div>' 
    $("#Father").html(HtmlString)
    console.log("AddGroupHtml!!")
}

function CreateHTML(Data) {  
    HtmlString = '<img src="../Img/fishpond.PNG" alt="" class="col-lg-8">' 
    for(var item in Data){
        console.log("item = " + item);
        HtmlString +=   '<div type="button" class="btn btn-default" title="感測器列表"  data-html="true" data-container="body" data-toggle="popover" data-placement="left" data-content="123456" style="position: absolute; top: ' + Data[item].Y + 'px; left: ' + Data[item].X + 'px;" id="' + Data[item].PositionCode + '">' +
                            '<img src="../Img/icon.PNG" alt="" style="width: 40px; height: 40px; background-position: center">' +
                        '</div>' 
    }
    $("#Father").html(HtmlString)
    console.log("CreateHtml!!")
    settingPopover();
}

function settingPopover(){
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    $("[data-toggle='popover']").popovers({
        trigger : 'click',  
        placement : 'left', 
        html: true,
        template:   '<div class="popover" style="max-width: 300px">' +
                        '<div class="arrow"></div>' +
                        '<h3 class="popover-title">感測器列表</h3>' +
                        '<div class="popover-content">123456789</div>' +
                        '<div class="popover-footer">' +
                            '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(../img/plus.PNG); width: 130px; height: 130px;"></div>' +
                            '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                            '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                            '<div onclick="Myfn()" class="btn rounded-3 m-3" style="background-image: url(./plus.PNG); width: 130px; height: 130px;"></div>' +
                        '</div>'+
                    '</div>'
    });
    console.log("settingPopover!!")
}



