let sensorCode;
let firstPage = 0;
let nowPage = 1;
let finalPage = 10;
let totalData;
let responseData;
let MaxError;
let minError;
let MaxData = 0;
let minData = 14;
let sumdata = 0.0;
let MainLineX = [];
let MainLineY = [];
let errorArray = [];
let errortime = 0;
let MainBarX = ['一月', '二月', '三月'];
let MainBarY = [60, 49, 72];
let tableString = "";
let back;
let fishName;

$(document).ready(function(){
    const quertString = window.location.search;
    const urlParams = new URLSearchParams(quertString);
    sensorCode = urlParams.get('sensorCode')
    back = urlParams.get('back')
    fishName = urlParams.get('Name')
    if(sensorCode != null){
        console.log(sensorCode);
    }
    else{
        alert("無法獲取感測器!");
    }

    TotalData()
    SensorData();
    updateLastView(sensorCode)

    $('#SetError').on('click', function(){  
        alert("123")
        console.log($('#SetMax').val())
        console.log($('#SetMin').val())
        console.log(sensorCode)
        $.ajax({
            url: "../php/SetSensorError.php",
            dataType: "json",
            type: "POST",
            data:{
                Max:$('#SetMax').val(),
                Min:$('#SetMin').val(),
                sensorCode:sensorCode
            },
            success: function (response) {
                console.log("修改成功");
            },
            error: function(response){
                console.log("修改失敗");
                console.log(response.text);
            }
        })
    })

    $('#SearchBtn').on('click', function(){
        //document.removeChild(document.getElementById('MainLineSearchChart'))
        //document.removeChild(document.getElementById('MainBarSearchChart'))
        console.log($('#start_time').val());
        console.log($('#start_date').val());
        console.log($('#end_time').val());
        console.log($('#end_date').val());
        console.log(sensorCode);        
        console.log($('#searchType').val());
        if($('#start_time').val() == "" || $('#start_date').val() == "" || $('#end_time').val() == "" || $('#end_date').val() == "" || $('#searchType').val() == ""){
            alert("請選擇開始日期或結束日期!")
            return
        }
        $.ajax({
            url: "../php/SearchData.php",
            dataType: "json",
            type: "POST",
            data:{
                start_time:$('#start_time').val(),
                start_date:$('#start_date').val(),
                end_time:$('#end_time').val(),
                end_date:$('#end_date').val(),
                sensorCode:sensorCode,
                searchType:$('#searchType').val()
            },
            success: function (response) {
                $('#SearchStart').html( $('#start_date').val() + " " + $('#start_time').val() );
                $('#SearchFinal').html( $('#end_date').val() + " " + $('#end_time').val() );
                $('#SearchStart').html(MaxData);
                responseData = response;
                totalData = Object.keys(response).length;
                MainLineX = [];
                MainLineY = [];
                sumdata = 0;
                for(let item in response){
                    sumdata += parseFloat(response[item].value);
                    MainLineX.push(response[item].Date);
                    MainLineY.push(response[item].value);
                    if(response[item].value > MaxError){
                        errorArray.push((response[item].value - MaxError));
                        errortime++
                    }
                    else if(response[item].value < minError){
                        errorArray.push((response[item].value - minError));
                        errortime++
                    }
                    else {
                        errorArray.push(0);
                    }

                    if(MaxData < response[item].value){
                        MaxData = response[item].value
                    }else if(minData > response[item].value){
                        minData = response[item].value
                    }
                }
                console.log(MainLineX)
                console.log(MainLineY)

                var LineSearchChart = document.getElementById('MainLineSearchChart');
                var LineChart = new Chart(LineSearchChart);
                LineChart.destroy();
                var LineChart = new Chart(LineSearchChart, {
                    options: {
                        scales: {
                            Left:{
                                position: "left",
                                ticks: {
                                    
                                    
                                  }
                              },
                            Right: {
                                position: "right",
                                ticks: {
                                  stepSize: 6,
                                  unitStepSize: 5
                                },
                                axisLabel: {
                                  rotate: 90
                                },
                            },
                            x: {
                                color: 'blue'
                            }
                        }
                    },
                    type: 'line',
                    display: true,
                    data: {
                        labels: MainLineX,
                        scaleFontColor: "rgba(235, 168, 25, 1)",
                        datasets: [{
                            yAxisID: "Left",
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1,
                            label: '感測器數值',
                            data: MainLineY
                        }, {
                            type: 'bar',
                            yAxisID: "Right",
                            backgroundColor: [
                                'rgba(255, 162, 235, 0.8)',
                            ],
                            borderColor: [
                                'rgba(255, 162, 235, 1)',
                            ],
                            label: '警告差距',
                            fill: true,
                            data: errorArray
                        }]
                    },
                });

                var BarSearchChart = document.getElementById('MainBarSearchChart');
                var BarChart = new Chart(BarSearchChart, {
                    type: 'bar',
                    display: false,
                    data: {
                        labels: MainLineX,
                        datasets: [{
                            type: 'bar',
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                            label: '感測器數值',
                            data: MainLineY
                        }, {
                            type: 'bar',
                            backgroundColor: [
                                'rgba(255, 162, 235, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                            label: '超出數值',
                            data: errorArray
                        }]
                    }
                });

                CreateListData();
                
                $('#SearchMax').html(MaxData);
                $('#Searchmin').html(minData);
                $('#Searchaverage').html((sumdata / totalData).toFixed(2));
                $('#SearchError').html(errortime);

            },
            error: function(response){
                alert("查詢圖表失敗")
                console.log(response.text)
            }
        })
    })
})

function SensorData(){
    $.ajax({
        url: "../php/GetSensorData.php",
        dataType: "json",
        type: "POST",
        data:{
            sensorCode:sensorCode
        },
        success: function(response){    
            console.log(response[0].SensorName)
            $('#Name').html(response[0].SensorName)
            $('#Type').html(response[0].SensorType)
            $('#Code').html(response[0].SensorCode)
            $('#CreateDate').html(response[0].CreateDate)
            $('#Last').html(response[0].Date)
            $('#Max').html(response[0].MaxError)
            $('#Min').html(response[0].minError)
            $('#ErrorTime').html(response[0].SensorError)
            MaxError = response[0].MaxError;
            minError = response[0].minError;
            console.log("獲取資料成功")
            //console.log(Object.keys(response).length)
        },
        error: function(response){
            alert("取得資料錯誤")
            alert(response.text)
        }
    })
}

function CreateListData(){ 
    tableString = "";
    tableString += '<table class="table table-striped table-hover">' +
                    '    <thead>' +
                    '    <tr>' +
                    '        <th scope="col">#</th>' +
                    '        <th scope="col">日期</th>' +
                    '        <th scope="col">數值</th>' +
                    '        <th scope="col">超過上限</th>' +
                    '    </tr>' +
                    '    </thead>' +
                    '    <tbody>' 
    for(var i = firstPage; i < finalPage; i++){
        if(i < totalData){
            tableString +=  '<tr>' +
                            '    <th scope="row">' + (i + 1) + '</th>' +
                            '    <td>' + responseData[i].Date +'</td>' +
                            '    <td>' + responseData[i].value +'</td>' 
            if(responseData[i].value > MaxError || responseData[i].value < minError){
                tableString += '    <td class="bg-danger text-white">是</td>' +
                                 '</tr>'
            }
            else{
                tableString += '    <td>否</td>' +
                                '</tr>'
            }
        }
    }

    tableString +=  '    </tbody>' + 
                    '</table>' +
                    '<div class="col-12 d-flex justify-content-center ">' +
                    '    <nav aria-label="Page navigation example">' +
                    '        <ul class="pagination">' 

    if(firstPage == 0){
        tableString +=    '        <li class="page-item disabled">' 
    }
    else{
        tableString +=    '        <li class="page-item">' 
    }

    tableString +=  '            <a class="page-link" href="#" aria-label="Previous" onclick="CaculatePage(' + (nowPage - 1) + ')">' +
                    '            <span aria-hidden="true">&laquo;</span>' +
                    '            </a>' +
                    '        </li>' 
    for(var j = 1; j < Math.ceil(totalData / 10) + 1; j++){
        console.log("Math.ceil(totalData / 10) = " + Math.ceil(totalData / 10))
        tableString +=  '<li class="page-item"><a class="page-link" href="#" onclick="CaculatePage(' + j + ')">' + j + '</a></li>'
    }

    if(finalPage == totalData){
        tableString +=    '        <li class="page-item disabled">' 
    }
    else{
        tableString +=    '        <li class="page-item">' 
    }

    tableString +=  
                    '            <a class="page-link" href="#" aria-label="Next" onclick="CaculatePage(' + (nowPage + 1) + ')">' + 
                    '            <span aria-hidden="true">&raquo;</span>' + 
                    '            </a>' + 
                    '        </li>' + 
                    '        </ul>' + 
                    '    </nav>' + 
                    '</div>'

    $('#TheTables').html(tableString);
    console.log("創建成功")
}

function CaculatePage(Page) {  
    nowPage = Page;
    firstPage = (Page - 1) * 10;
    if(Page * 10 - 1 < totalData){
        finalPage = Page * 10;
    }
    else{
        finalPage = totalData;
    }
    
    CreateListData();
}

function ErrorSetZero(){
    $.ajax({
        url: "../php/SensorSetZero.php",
        type: "POST",
        data:{
            sensorCode:sensorCode
        },
        success: function(response){    
            window.location.reload();
        },
        error: function(response){
            alert("取得資料錯誤")
            alert(response)
            alert(response.text)
        }
    })
}

function DeleteSensor(){
    $.ajax({
        url: "../php/SensorDelete.php",
        type: "POST",
        data:{
            sensorCode:sensorCode
        },
        success: function(response){    
            window.location.href = "../html/SensorManage.html"
        },
        error: function(response){
            alert("取得資料錯誤")
            alert(response.text)
        }
    })
}

function TotalData(){
    $.ajax({
        url: "../php/TotalData.php",
        dataType: 'json',
        type: "POST",
        data:{
            sensorCode:sensorCode
        },
        success: function(response){    
            $('#TotalData').html(response[0].total);
        },
        error: function(response){
            alert("取得資料錯誤")
            alert(response.text)
        }
    })
}

function Myfn2(){
    if(back == 1){
        window.location.href = "../html/FishPond2.html?Name=" + fishName 
    }else if(back == 2){
        window.location.href = "../html/SensorManage.html"
    }
}

function updateLastView(ID){
    console.log(ID);
    $.ajax({
        url: "../php/UpdateLastView.php",
        type: "POST",
        dataType: "json",
        data:{
            ID:ID
        },
        success: function(response){
            $('#total').html("感測器總數: " + response[0].total);
        }
    })
}
