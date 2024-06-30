let Sensor = "";
var Today=new Date();

$(function(){
    InsertSensor();
    SensorTotalData();

    console.log("today=" + Today)
})

function InsertSensor(){
    $.ajax({
        url: "../php/SensorList.php",
        type: "GET",
        dataType: "json",
        success: function(response){
            for(let item in response){
                console.log("response[item].FishPondName =" + response[item].FishPondName)
                if(response[item].FishPondName === null){
                    response[item].FishPondName = "無"
                }
                console.log(item)
                Sensor += '<div class="col">' +
                            '<div class="card border-secondary mb-3 mx-auto" style="max-width: 18rem;">' +
                                '<div class="card-header">感測器名稱:' +
                                    '<div class="d-flex justify-content-between">' +
                                        '<p class="text-pink m-0 ">' + response[item].SensorName + '</p>' +
                                        '<p class="text-orange m-0 ">編號: ' + response[item].SensorCode + '</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="card-body text-secondary">' +
                                    '<h5 class="text-orange card-title">[--感測器資訊--] </h5>' +
                                    '<div class="row">' +
                                    '    <p class="col-5 text-purple m-0">建立日期: </p>' +
                                    '    <p class="offset-1 col-7 text-primary m-0">' + response[item].CreateDate + '</p>' +
                                    '</div>' +
                                    '<div class="row">' +
                                    '    <p class="col-5 text-purple m-0">感測器類型: </p>' +
                                    '    <p class="offset-1 col-7 text-primary m-0">' + response[item].SensorType + '</p>' +
                                    '</div>' +
                                    '<div class="row">' +
                                    '    <p class="col-5 text-purple m-0">感測器錯誤: </p>' +
                                    '    <p class="offset-1 col-7 text-danger m-0"> ' + response[item].SensorError + '</p>' +
                                    '</div>' +
                                    '<div class="row">' +
                                    '    <p class="col-5 text-purple m-0">感測器所屬: </p>' +
                                    '    <p class="offset-1 col-7 text-primary m-0">' + response[item].FishPondName + '</p>' +
                                    '</div>' +
                                '</div>' +  
                                '<div class="card-footer">' +
                                    '<div class="d-flex justify-content-between align-items-center">' +
                                        '<small class="text-muted ">上次查看日期 \n' + response[item].LastEdit + ' ...</small>' +
                                        '<a type="button" data-SensorCode=""  class="btn btn-purple" href="../html/station.html?sensorCode=' + response[item].SensorCode + '&back=2" >檢視</a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' 
            }

            $('#SensorList').html(Sensor);
        }
    })
}



function SensorTotalData(){
    $.ajax({
        url: "../php/SensorTotalData.php",
        type: "GET",
        dataType: "json",
        success: function(response){
            $('#total').html("感測器總數: " + response[0].total);
        }
    })
}

function SensorSubmit(){
    console.log($('#SensorName').val())
    console.log($('#SensorType').val())
    /*$.ajax({
        url: "../php/SensorSubmit.php",
        type: "POST",
        dataType: "json",
        data:{
            Name:$('#SensorName').val(),
            Type:$('#SensorType').val(),
        },
        success: function(response){
            
        },
        error: function(response){
            alert("錯誤!");
            alert(response.text)
        }
    })*/
}