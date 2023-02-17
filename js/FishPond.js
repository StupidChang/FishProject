var FishPondNumber = 1;
var CardHtml = "";
//var CardData;
//var MyAjax = null;

$(function() {
    console.log("Hello");
    Get2SQL()
});

function Get2SQL(){
    $.ajax({
        type:'GET', 
        url:'../php/FishPond.php',
        dataType:'json',        
        async: false,
        success: function(response){
            var CardData = response;
            //var CardData = JSON.stringify(response);
            generate(CardData);   
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
        CreateHTML(CardData[item].FishPondName, CardData[item].FishText);
        FishPondNumber++;
    }
    $("#FishPondList").html(CardHtml);
}

function CreateHTML(FishPondName, FishText){
    CardHtml += '<div class="card mt-3 col-12 border-1 rounded-3 border border-secondary" onclick="ClickFish()" style="max-height: 200px;">' +
            '<div class="row g-0">' +
                '<div class="col-md-4" >' +
                    '<img src="../Img/fishpond.PNG" class="img-fluid rounded-start" style="height: 190px; width: 150px;"  alt="...">' +
                '</div>' +
                '<div class="col-md-8">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + FishPondName + '</h5>' +
                    '<p class="card-text">' + FishText + '</p>' +
                    '<p class="card-text"><small class="text-muted">歡迎使用魚塭系統</small></p>' +
                    '<div class="d-flex justify-content-end"><div class="shape-ex5 d-flex justify-content-center" id="' + 'FishNumber' + FishPondNumber + '"><p>前往漁塭</p></div></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
}

function ClickFish(Tab){
    console.log("Tab")
    console.log(Tab)
    let A = Tab.attr("class");
    if(A.indexOf("bg-primary") >= 0){
        Tab.classList.add("bg-primary");
    }
    else{
        Tab.classList.remove("bg-primary");
    }
}

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
    console.log(FishPondNumber);

    $.ajax({
       url:'../php/FishPondSubmit.php',
       method:'POST',
       data:{
        FishSubmitName:FishSubmitName,
        FishSubmitX:FishSubmitX,
        FishSubmitY:FishSubmitY,
        FishSubmitText:FishSubmitText,
        FishPondNumber:FishPondNumber
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

