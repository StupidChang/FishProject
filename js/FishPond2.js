//const slider = $(document)  //  document.querySelector('.items');
//  var Name = UrlParm.parm("Name")
let HtmlString = "";
let ListHtml = "";
let positionArray = [];
let isDown = false;
let startX = 0;
let startY = 0;
let x = 0;
let x0 = 0;
let y = 0;
let y0 = 0;
let FinalPositionX = 0;
let FinalPositionY = 0;
let FishPondName = "";
var options;
var Data;
let selectOption = "";
let AddModalData = "";
let ModalOption ="";

$(function(){
    AddSensorList();
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
    GetFishData();
});

$(document).on('click', '#CreateBtn', function(){
    console.log("HelloCreateBtn");
    AddGroup();
    let Newicon = document.querySelector('#New')
    Newicon.addEventListener('mousedown', (e) => {
        isDown = true;
        //console.log(isDown);
        //startX = e.clientX - Newicon.offsetLeft;
        //startY = e.clientY - Newicon.offsetTop;
        startX = Newicon.offsetLeft;
        startY = Newicon.offsetTop;
        x0 = e.clientX;
        y0 = e.clientY;
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

        console.log(e.clientX);
        console.log(e.clientY);
        //console.log(e.clientLeft);
        //console.log(e.clientTop);
        
        //console.log(Newicon.offsetParent);    
        //console.log(Newicon.offsetLeft);
        //console.log(Newicon.offsetTop);
        //x = e.clientX - startX;
        //y = e.clientY - startY;
        x = startX + (e.clientX - x0)
        y = startY + (e.clientY - y0)
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
            Data = response;
            console.log("成功獲取魚塭ID!")
            CreateHTML(response);
        },
        error: function(e){
            console.log("error!")
            console.log(e);
        }
    })
}

function CancelPosition(){
    CreateHTML(Data);
}

function SuccessPosition(){
    let NewX = $('#New').position().top;
    console.log(NewX);
    let NewY = $('#New').position().left;
    console.log(NewY);
    /*$.ajax({
        method:'POST',
        url:"../php/PositionSubmit.php",
        type: "string",
        data:{
            FinalPositionX:FinalPositionX,
            FinalPositionY:FinalPositionY,
            FishPondName:FishPondName
        },
        success:function(response){
            console.log(response);
            //window.location.reload();
        },
        error:function(e){
            console.log(e);
        }
    });*/
}

function AddGroup(){
    HtmlString +=    
    '<div class="body-content" style="position: absolute; top: 750px; left: 750px;" id="New">' +
        '<a id="A" tabindex="0" class="btn-lg " role="button" data-bs-toggle="popover" title="感測器群組列表 " ><img src="../Img/icon.PNG" alt="" style="height: 40px;width: 40px"></a>' +
        '<img src="../Img/yes.png" onclick="SuccessPosition()" class="m-4">' +
        '<img src="../Img/no.png" onclick="CancelPosition()" class="m-4">' +
    '</div>' 
    $("#Father").html(HtmlString)
    //console.log("AddGroupHtml!!")
}

function CreateHTML(Data) {  
    selectOption = "";
    HtmlString = '<img src="../Img/fishpond.PNG" alt="" class="col-lg-8">' ;
    for(var item in Data){
        //positionArray += Data[item].PositionCode;
        console.log("item = " + item);
        HtmlString +=  
        '<div class="body-content" style="position: absolute; top: ' + Data[item].Y + 'px; left: ' + Data[item].X + 'px; color: goldenrod;">' +
       '     <div hidden >' +
       '         <div data-name="popover-content' + Data[item].PositionCode + '">' +
       '             <ul class="list-group list-group-numbered" id="Position' + Data[item].PositionCode + '">' +

       '             </ul>' +
       '         </div>' +
       '     </div>' +
       '     <a id="A' + Data[item].PositionCode + '" tabindex="0" class="btn-lg " role="button" data-bs-toggle="popover" title="感測器群組列表  ' + "編號: " + Data[item].PositionCode + '"><img src="../Img/icon.PNG" alt="" style="height: 40px;width: 40px"></a>' +
       ' </div>' 

       selectOption += '<option value="' + Data[item].PositionCode + '">群組編號: ' + Data[item].PositionCode + '</option>'
    }
    $("#Father").html(HtmlString);
    $("#inputGroupSelectGroupCode").html(selectOption);
    console.log("CreateHtml!!");
    AddList();
}

function AddList(){
    $.ajax({
        url: "../php/GetSensor.php",
        type: "POST",
        dataType:'json',
        data: {
            FishPondName:FishPondName
        },
        success: function(response){
            //console.log("getdata!")
            for(var item in response){
                ModalOption += '<option value="' + response[item].SensorCode + '">'+ response[item].SensorName + '_  感測器代號:' + response[item].SensorCode + '</option>'

                        
                //console.log("item = " + parseInt(item, 10));
                //console.log("length = " + response.length)
                //console.log(typeof response[parseInt(item, 10) + 1].PositionCode);
                //console.log(item);
                //console.log(item+1);
                //console.log(response[parseInt(item, 10) + 1].PositionCode);
                //console.log(parseInt(item, 10));    
                //console.log(response[parseInt(item, 10)]);  
                //console.log(response[3].PositionCode);
                ListHtml +=     '<a href="../html/station.html?sensorCode=' + response[item].SensorCode + '" class="list-group-item d-flex justify-content-between align-items-start list-group-item-action" onclick="Test()">' +
                                    '<div class="ms-2 me-auto">' +
                                        '<div class="fw-bold">' + response[item].SensorName + '</div>' +
                                        '感測器代號: ' + response[item].SensorCode +
                                    '</div>' +
                                    '<span class="badge bg-danger rounded-pill">' + response[item].SensorError + '</span>' +
                                '</a>' 
                //console.log(ListHtml);
                //console.log(parseInt(item, 10) < response.length)
                //console.log(response[item].PositionCode != response[parseInt(item, 10) + 1].PositionCode)
                //console.log(response[item].PositionCode)
                //console.log(response[parseInt(item, 10) + 1].PositionCode)
                //console.log(parseInt(item, 10) == response.length - 1 || parseInt(item, 10) < response.length && response[item].PositionCode !== response[parseInt(item, 10) + 1].PositionCode);
                if(parseInt(item, 10) == response.length - 1 || parseInt(item, 10) < response.length && response[item].PositionCode !== response[parseInt(item, 10) + 1].PositionCode){
                    ListHtml +=     '<div class="d-flex justify-content-center mt-2">' +
                                            '<a tabindex="0" type="button" data-bs-target="#DeletePosition' + response[item].PositionCode + '" data-bs-toggle="modal" class="btn btn-danger" data-Position="' + response[item].PositionCode + '">刪除感測器</a>' +
                                    '</div>'  ;

                    
                    AddModalData += '<div class="modal fade" id="DeletePosition' + response[item].PositionCode + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                                    '  <div class="modal-dialog modal-dialog-centered">' +
                                    '    <div class="modal-content">' +
                                    '      <div class="modal-header">' +
                                    '        <h5 class="modal-title" id="exampleModalLabel" style="color: goldenrod;">從群組[' + response[item].PositionCode + ']移出感測器</h5>' +
                                    '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                    '      </div>' +
                                    '      <div class="modal-body">' +
                                    '        <label for="basic-url" class="form-label">將選擇的感測器移出群組。</label>' +
                                    '        <div class="input-group mb-3">' +
                                    '          <span class="input-group-text" id="basic-addon1">感測器編號</span>' +
                                    '          <select class="form-select" id="inputGroupSelectSensorCode">' +
                                    ModalOption +
                                    '          </select>' +
                                    '        </div>' +              
                                    '      </div>' +

                                    '      <div class="modal-footer">' +
                                    '        <div id="AddSensor2GroupErrorMsg" Style="color: red"></div>'+
                                    '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>' +
                                    '        <button type="button" class="btn btn-primary" onclick="AddSensor2Group()">確認移除</button>' +
                                    '      </div>' +
                                    '    </div>' +
                                    '  </div>' +
                                    '</div>'  ;
                                    

                    console.log(ListHtml);
                    $('#AddModalData').html(AddModalData);
                    $('#Position' + response[item].PositionCode + '').html(ListHtml);
                    options = {
                        html: true,
                        title: "Optional: HELLO(Will overide the default-the inline title)",
                        content: $('[data-name="popover-content' + response[item].PositionCode + '"]')
                    }
                    //console.log(options);
                    var exampleEl = document.getElementById('A' + response[item].PositionCode + '')
                    var popover = new bootstrap.Popover(exampleEl, options)

                    ListHtml = "";
                    ModalOption = "";
                }
            }
        },
        error: function(e){
            console.log("AddListerror!");
            console.log(e); 
        }
    });
}

$(document).on('click', '[name="AddSensor"]', function(e){
    console.log(e.target.getAttribute("id"));

});

function AddSensorList(){
    selectOption = "";
    var NotinList = "";
    $.ajax({
        url: "../php/SensorNotinPosition.php",
        method: 'GET',
        dataType: 'json',
        success(response){
            //console.log("success!")
            NotinList += '<div class="d-flex justify-content-center text-center fs-5" style="color: goldenrod;">感測器未分類列表</div>'
            for(var item in response){
                console.log(response[item].SensorName)
                NotinList += '<div class="col-lg-11 my-2 d-flex justify-content-center border border-2 rounded-pill border-info" style="background-color: rgb(200, 248, 248);">' +
                                '<div class="ms-2 me-auto">' +
                                '<div class="fw-bold">'+ response[item].SensorName + '</div>' +
                                '感測器代號: ' + response[item].SensorCode + ',  感測器種類: ' + response[item].SensorType +
                                '</div>' +
                            '</div>'
                selectOption += '<option value="' + response[item].SensorCode + '">'+ response[item].SensorName + '_  感測器代號:' + response[item].SensorCode + '</option>'
            }
            NotinList +=  '<div class="d-flex justify-content-center my-3">' +
                '    <button type="button" class="btn btn-pink" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">加入感測器至群組</button>' +
                '      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '        <div class="modal-dialog modal-dialog-centered">' +
                '          <div class="modal-content">' +
                '            <div class="modal-header">' +
                '              <h5 class="modal-title" id="exampleModalLabel" style="color: goldenrod;">加入感測器至群組</h5>' +
                '              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                '            </div>' +
                '            <div class="modal-body">' +
                '              <label for="basic-url" class="form-label">將選擇的感測器加入群組。</label>' +
                '              <div class="input-group mb-3">' +
                '                <span class="input-group-text" id="basic-addon1">感測器編號</span>' +
                '                <select class="form-select" id="inputGroupSelectSensorCode">' +
    
                '                </select>' +
                '              </div>' +
                '              <div class="mb-3 text-center">加入至</div>' +
                '              <div class="input-group mb-3">' +
                '                <span class="input-group-text" id="basic-addon2">群組編號</span>' +
                '                <select class="form-select" id="inputGroupSelectGroupCode">' +

                '                </select>' +
                '              </div>' +
                '            </div>' +

                '            <div class="modal-footer">' +
                '              <div id="AddSensor2GroupErrorMsg" Style="color: red"></div>'+
                '              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>' +
                '              <button type="button" class="btn btn-primary" onclick="AddSensor2Group()">確認加入</button>' +
                '            </div>' +
                '          </div>' +
                '        </div>' +
                '      </div>' +
                '  </div>' 
            //console.log(NotinList)
            $('#SensorList').html(NotinList);
            $('#inputGroupSelectSensorCode').html(selectOption);
            console.log("AddSensorList!!")
        },
        error(e){
            console.log("error!")
        }
    })
    
}

function AddSensor2Group(){
    var SelectSensorCode = $('#inputGroupSelectSensorCode').val();
    console.log(SelectSensorCode);
    var SelectGroupCode = $('#inputGroupSelectGroupCode').val();
    console.log(SelectGroupCode);
    $.ajax({
        url: "../php/AddSensor2Group.php",
        type: "POST",
        //dataType: "string",
        data: {
            FishPondName:FishPondName,
            SelectSensorCode:SelectSensorCode,
            SelectGroupCode:SelectGroupCode
        },
        success: function(response){
            console.log(response);
            console.log("AddSensor2Group  OK!");
            //window.location.reload();
        },
        error: function(response){
            $('#AddSensor2GroupErrorMsg').html("儲存失敗!")
            console.log(response);
            console.log("AddSensor2Group error");
        }
    })
}

function GetFishData(){
    $.ajax({
        url: "../php/FishPondData2.php",
        type: "POST",
        dataType: "json",
        data:{
            FishPondName:FishPondName
        },
        success: function(response){
            console.log("GetFishData!!")
            $('#FishPondName').html("魚塭名稱: " + FishPondName);
            $('#FishPondCreateDate').html("建立日期: " + response[0].CreateDate);
            $('#FishPondSensorNumber').html("魚塭感測器數量:  " + response[0].FishCode);
            $('#FishPondX').html("魚塭寬度:  " + response[0].X);
            $('#FishPondY').html("魚塭長度:  " + response[0].Y);
        },
        error:function(){
            console.log("GetFishDataError!!")
        }
    })
}

function Conversion(){

}