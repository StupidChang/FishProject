//var FishPondNumber = 1;
var CardHtml = "";
var data ;
var border = false;
//var CardData;
//var MyAjax = null;

$(function() {
    console.log("Hello");
    Get2SQL()
    //var fishdiv = document.getAttribute("fishdiv");

    /*document.body.onclick = function(event){    //冒泡处理
        console.log(event.target.parents('[name="Dad"]'));
        //console.log(event.target.style.attribute);
        console.log(event.target.closest('td[name="Dad"]'));
            
    }*/
});

function Get2SQL(){
    $.ajax({
        type:'GET', 
        url:'../php/FishPond.php',
        dataType:'json',        
        async: false,
        success: function(response){
            var data = response;
            //var CardData = JSON.stringify(response);
            generate(response);   
        },
        error: function (thrownError) {
            alert("php請求錯誤");
            console.log(JSON.stringify(thrownError));
            alert(JSON.stringify(thrownError));
        }
    });

    /*$.when(MyAjax).done(function(){
    })*/
}

function generate(CardData){
    for(var item in CardData){
        console.log(CardData[item].FishPondName);  
        CreateHTML(CardData[item].FishPondName, CardData[item].FishText, CardData[item].FishCode);
        //FishPondNumber++;
    }
    $("#FishPondList").html(CardHtml);
}

function CreateHTML(FishPondName, FishText, FishCode){
    CardHtml += '<a  onclick="FishPondData(' + FishCode + ')"><div id="' + FishCode + '" class="card mt-3 col-12 border-1 rounded-3 border border-secondary" style="max-height: 200px;" name="Dad" data-FishName="' + FishPondName + '">' +
                    '<div class="row g-0">' +   
                        '<div class="col-md-2" >' +
                            '<img src="../Img/fishpond.PNG" class="img-fluid rounded-start" style="height: 190px; width: 150px;"  alt="...">' +
                        '</div>' +
                        '<div class="col-md-10 bg-gray">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">' + FishPondName + '</h5>' +
                            '<p class="card-text">' + FishText + '</p>' +
                            '<p class="card-text"><small class="text-muted">歡迎使用魚塭系統</small></p>' +
                            '<div class="d-flex justify-content-end">' +
                                '<div class="shape-ex5 d-flex justify-content-center" name="fishdiv" id="' + FishPondName + '" onclick="MYfn(\'' + FishPondName + '\')"><p>前往漁塭</p></div></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '</div>'+
                '</a>';
}

function MYfn(Name){
    try{
        //StrName = JSON.stringify(Name); 
        //alert(typeof Name);
        var url = "FishPond2.html?Name=" + Name;
        //alert(url);
        var newWin = window.location.href = url;
        if(newWin == null){
            alert("彈出窗口被阻止");
        }
     } catch(e){
        alert("彈出窗口被阻止");
     }
}

function FishPondData(FishCode) {
    console.log("HI~")
    for(var item in data){
        if(data[item].FishCode = FishCode){
            $('FishPondName').html(data[item].FishCode)
            $('FishCode').html(data[item].FishPondName)
            $('FishPondCreateDate').html(data[item].CreateDate)
            $('FishPondX').html(data[item].X)
            $('FishPondY').html(data[item].Y)
        }
    }
}


/*function ClickFish(Tab){  onclick="ClickFish()"
    console.log("Tab")
    console.log(Tab)    
    let A = Tab.attr("class");
    if(A.indexOf("bg-primary") >= 0){
        Tab.classList.add("bg-primary");
    }
    else{
        Tab.classList.remove("bg-primary");
    }
}*/

$(document).on('click', '#FishSubmit', function(){//使用$(document).on()的原因是如果id為submit的按鈕是一開始沒有載入、透過ajax互動後才產生的DOM，那用$().click會抓不到，需以$(document).on()才行
    var FishSubmitName = $('#FishSubmitName').val();
    $('#FishSubmitName').val("");
    var FishSubmitX = $('#FishSubmitX').val();
    $('#FishSubmitX').val("");
    var FishSubmitY = $('#FishSubmitY').val();
    $('#FishSubmitY').val("");
    var FishSubmitText = $('#FishSubmitText').val();
    $('#FishSubmitText').val("");

    console.log(FishSubmitName);
    console.log(FishSubmitX);
    console.log(FishSubmitY);
    console.log(FishSubmitText);
    //console.log(FishPondNumber);

    $.ajax({
       url:'../php/FishPondSubmit.php',
       method:'POST',
       data:{
        FishSubmitName:FishSubmitName,
        FishSubmitX:FishSubmitX,
        FishSubmitY:FishSubmitY,
        FishSubmitText:FishSubmitText,
        //FishPondNumber:FishPondNumber
       },
       success:function(){
            console.log("Yeah!!")
            window.location.reload();
       },
       error: function (thrownError) {
            alert("php請求失敗");
            console.log(JSON.stringify(thrownError));
            alert(JSON.stringify(thrownError));
        }
    })
 });

 function borderFn(Name, id) {
    for(var item in data){
        if(data[item].FishCode = id){
            $('#FishPondY').html(data[item].Y)
            $('#FishPondX').html(data[item].X)
            $('#FishPondSensorNumber').html(data[item].FishPondName)
            $('#FishPondCreateDate').html(data[item].CreateDate)
            $('#FishPondName').html(data[item].FishPondName)
            $('#FishCode').html(data[item].FishCode)
        }
    }
 }