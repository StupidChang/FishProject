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
let sensoralert = "";
let deletegroup = "";

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
    SensorAlert();
    GetdeleteGroup();
});

$(document).on('click', '#CreateBtn', function(){
    console.log("HelloCreateBtn");
    AddGroup();
    let Newicon = document.querySelector('#New')
    let FishPondImg = document.querySelector('#FishPondImg')    
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

        //console.log("e.clientX=" + e.clientX);
        //console.log("e.clientY=" + e.clientY);
        //console.log(e.clientLeft);
        //console.log(e.clientTop);
        
        //console.log(Newicon.offsetParent);        
        console.log("Newicon.offsetLeft= " + Newicon.offsetLeft);
        console.log("Newicon.offsetTop= " + Newicon.offsetTop);
        console.log("FishPondImg.Width= " + FishPondImg.offsetWidth);
        console.log("FishPondImg.Height= " + FishPondImg.offsetHeight);
        //x = e.clientX - startX;
        //y = e.clientY - startY;
        x = startX + (e.clientX - x0)
        y = startY + (e.clientY - y0)
        if(x / FishPondImg.offsetWidth * 100 > -10 && x / FishPondImg.offsetWidth * 100 < 95 && y / FishPondImg.offsetHeight * 100 > -10 && y / FishPondImg.offsetHeight * 100 < 100){
            console.log("x =" + x);
            console.log("y =" + y);
    
            console.log("x =" + ((x / FishPondImg.offsetWidth * 100) + "%"));
            console.log("y =" + ((y / FishPondImg.offsetHeight * 100) + "%"));
    
            Newicon.style.top = ((y / FishPondImg.offsetHeight * 100) + "%");
            FinalPositionY = (y / FishPondImg.offsetHeight * 100);
            Newicon.style.left = ((x / FishPondImg.offsetWidth * 100) + "%");
            FinalPositionX = (x / FishPondImg.offsetWidth * 100);
        }
        
    });

    Newicon.addEventListener('mouseup', (e) => {
        isDown = false;
        //console.log("is false!!")
    });
})

$(document).on('click', '#DeleteBtn', function(){
    console.log("HelloDeleteBtn")
})

/*$(document).on('click', '#DeleteFishPond', function(){
    console.log("HelloDeleteFishPond")
})*/

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
    $.ajax({
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
            window.location.reload();
        },
        error:function(e){
            console.log(e);
        }
    });
}

function AddGroup(){
    HtmlString +=    
    '<div class="body-content" style="position: absolute; top: 50%; left: 50%;" id="New">' +
        '<a id="A" tabindex="0" class="btn-lg " role="button" data-bs-toggle="popover" title="感測器群組列表 " ><img src="../Img/icon.PNG" alt="" style="height: 40px;width: 40px"></a>' +
        '<img style="position: absolute; top: 0px; left: 50px;" src="../Img/yes.png" onclick="SuccessPosition()" class="m-4">' +
        '<img style="position: absolute; top: 50px; left: 50px;" src="../Img/no.png" onclick="CancelPosition()" class="m-4">' +
    '</div>' 
    $("#FishPondImg").html(HtmlString)
    //console.log("AddGroupHtml!!")
}

function CreateHTML(Data) {  
    selectOption = "";
    HtmlString = "";
    //HtmlString = '<div id="FishPondImg" style="background-image: url(\'../Img/fishpond.PNG\'); background-repeat: no-repeat; background-size: 100% 100%; width: 65vh; height: 104vh;"></div>';
    for(var item in Data){
        //positionArray += Data[item].PositionCode;
        //console.log("item = " + item);
        HtmlString +=   
        '<div class="body-content" style="position: absolute; top: ' + Data[item].Y + '%; left: ' + Data[item].X + '%; color: goldenrod;">' +
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
    $("#FishPondImg").html(HtmlString);
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
                //console.log("ModalOption= " + ModalOption)
                        
                //console.log("item = " + parseInt(item, 10));
                //console.log("length = " + response.length)
                //console.log(typeof response[parseInt(item, 10) + 1].PositionCode);
                //console.log(item);
                //console.log(item+1);
                //console.log(response[parseInt(item, 10) + 1].PositionCode);
                //console.log(parseInt(item, 10));    
                //console.log(response[parseInt(item, 10)]);  
                //console.log(response[3].PositionCode);
                ListHtml +=     '<a href="../html/station.html?sensorCode=' + response[item].SensorCode + '&back=1&Name=' + FishPondName + '" class="list-group-item d-flex justify-content-between align-items-start list-group-item-action" onclick="Test()">' +
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
                                    '  <div class="modal-dialog">' +
                                    '    <div class="modal-content">' +
                                    '      <div class="modal-header">' +
                                    '        <h5 class="modal-title" id="exampleModalLabel" style="color: goldenrod;">從群組[' + response[item].PositionCode + ']移出感測器</h5>' +
                                    '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                    '      </div>' +
                                    '      <div class="modal-body">' +
                                    '        <label for="basic-url" class="form-label">將選擇的感測器移出群組。</label>' +
                                    '        <div class="input-group mb-3">' +
                                    '          <span class="input-group-text" id="basic-addon1">感測器編號</span>' +
                                    '          <select class="form-select" id="DeleteGroupSelectSensorCode">' +
                                    ModalOption +
                                    '          </select>' +
                                    '        </div>' +              
                                    '      </div>' +

                                    '      <div class="modal-footer">' +
                                    '        <div id="AddSensor2GroupErrorMsg" Style="color: red"></div>'+
                                    '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>' +
                                    '        <button type="button" class="btn btn-primary" onclick="DeleteSensor2Group(' + response[item].PositionCode + ')">確認移除</button>' +
                                    '      </div>' +
                                    '    </div>' +
                                    '  </div>' +
                                    '</div>' ;
                                    
                    //console.log("AddModalData= " + AddModalData)
                    //console.log(ListHtml);
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
                    AddModalData = "";
                }
            }
        },
        error: function(e){
            console.log("AddListerror!");
            console.log(e); 
        }
    });
}

function DeleteSensor2Group(positionCode){
    console.log(FishPondName)
    console.log("value=" + $('#DeleteGroupSelectSensorCode').val())
    console.log(positionCode)
    $.ajax({
        url: "../php/DeleteSensor2Group.php",
        type: "POST",
        data:{
            FishPondName:FishPondName,
            SensorCode:$('#DeleteGroupSelectSensorCode').val(),
            positionCode:positionCode
        },
        success: function(response){
            window.location.reload();
        },
        error: function(response){
            console.log("刪除失敗4")
            console.log(response)
            console.log(response.Text)
        }
    })
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
                //console.log(response[item].SensorName)
                NotinList += '<div class="col-lg-11 my-2 d-flex justify-content-center border border-2 rounded-pill border-info" style="background-color: rgb(200, 248, 248);">' +
                                '<div class="ms-2 me-auto">' +
                                '<div class="fw-bold">'+ response[item].SensorName + '</div>' +
                                '感測器代號: ' + response[item].SensorCode + ',  感測器種類: ' + response[item].SensorType +
                                '</div>' +
                            '</div>'
                selectOption += '<option value="' + response[item].SensorCode + '">'+ response[item].SensorName + '_  感測器代號:' + response[item].SensorCode + '</option>'
            }
            NotinList +=  '<div class="d-flex justify-content-center my-3">' +
                '    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">加入感測器至群組</button>' +
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
            window.location.reload();
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
            $('#FishPondName').html(FishPondName);
            $('#FishPondCreateDate').html(response[0].CreateDate);
            $('#FishPondSensorNumber').html(response[0].FishCode);
            $('#FishPondX').html(response[0].X);
            $('#FishPondY').html(response[0].Y);
        },
        error:function(){
            console.log("GetFishDataError!!")
        }
    })
}

function GetdeleteGroup(){
    $.ajax({
        url: "../php/GetDeleteGeoup.php",
        type: "POST",
        dataType: "json",
        data:{
            FishPondName:FishPondName
        },
        success: function(response){
            console.log(response)
            deletegroup = "";
            for(var item in response){
                deletegroup += '<option value="' + response[item].PositionCode + '">位置代號:' + response[item].PositionCode + '</option>'
            }
            $('#deleteGroup1').html(deletegroup)
        },
        error:function(response){
            console.log("取得失敗1")
            console.log(response.Text)
        }
    })
}

function deleteGroup(){
    console.log($('#deleteGroup1').val())
    $.ajax({
        url: "../php/DeleteGroup.php",
        type: "POST",
        data:{
            positionCode:$('#deleteGroup1').val()
        },
        success: function(response){
            console.log("刪除position")
            window.location.reload();
        },
        error:function(response){
            console.log("刪除失敗2")
            console.log(response.Text)
        }
    })
}

function deleteFishPond(){
    console.log("deleteFishPond");
    console.log(FishPondName);
    $.ajax({
        url: "../php/FishPondDelete.php",
        type: "POST",
        dataType: "json",
        data:{
            FishPondName:FishPondName
        },
        success: function(response){
            MYfn();
        },
        error:function(response){
            console.log("刪除失敗3")
            console.log(response.Text)
        }
    })
}

function Myfn2(){
    try{
        var url = "FishPond.html"
        var newWin = window.location.href = url;
        if(newWin == null){
            alert("彈出窗口被阻止");
        }
     } catch(e){
        alert("彈出窗口被阻止");
     }
}

function Myfn(){
    try{
        alert("刪除成功，即將跳轉頁面...")
        var url = "FishPond.html"
        var newWin = window.location.href = url;
        if(newWin == null){
            alert("彈出窗口被阻止");
        }
     } catch(e){
        alert("彈出窗口被阻止");
     }
}

function SensorAlert(){
    $.ajax({
        url: "../php/SensorAlert.php",
        type: "POST",
        dataType: "json",
        data:{
            FishPondName:FishPondName
        },
        success: function(response){
            console.log("警告正常")
            //console.log(response)
            var count = Object.keys(response).length;
            console.log("count=" + count)
            sensoralert ="";
            if(count != 0){
                for(var item in response){
                    sensoralert += '<div class="alert alert-danger col-12 d-flex align-items-center" role="alert">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">' +
                        '<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>' +
                        '</svg>' +
                        '<div>' +
                       ' 感測器編號: ' + response[item].SensorCode + ' ，超出範圍共' + response[item].SensorError + '次!' +
                        '</div>' +
                    '</div>'
                }
                $('#warned').html(sensoralert)
            }
            else{
                sensoralert += '<div class="alert alert-success col-12 d-flex align-items-center" role="alert">'  +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="check-circle-fill:">' +
                        '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>' +
                      '</svg>' +
                      '<div>' +
                        '魚塭運作正常，並無錯誤。' +
                      '</div>' +
                    '</div>'

                $('#warned').html(sensoralert)
            }
            
        },
        error:function(response){
            console.log("警告失敗")
            console.log(response.Text)
        }
    })
    
}