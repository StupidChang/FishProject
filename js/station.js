var client = mqtt.connect("ws://broker.emqx.io:8083/mqtt") // add a {ws:// url} here example:{ws://broker.emqx.io:8083/mqtt}
//connect to mqtt broker
var sensorCode;
var x = [null]
var y = [null]
var bar_x = []
var bar_y = []
var serch_x = []
var serch_y = []

$(document).ready(function(){
    var ctx = document.getElementById('myChart').getContext("2d")
    var Chart1 = new Chart(ctx, {
        type:'line',
        plugins:[ChartDataLabels],
        data:{
            labels : x,
            datasets:[{
                label:'pH_vule',
                data:y,
                borderColor : "rgba(0,191,255,0.6)",//line
                backgroundColor : "rgba(0,191,255,0.6)",//point border
                tension:0.3
            }]
        },
        options: {
            scales: {
                x:{
                    grid:{
                        display:false
                    },
                },
                y: {
                    grid:{
                        display:false
                    },
                    max:12,
                    min:0
                }
            },
            
            plugins: {
                legend:{
                    display: true,
                    labels:{
                        color : 'rgba(0,0,0,1)'
                    }
                },
                datalabels:{
                    display:'auto',
                    color:'rgba(0,0,0,0.8)',
                    //backgroundColor:'rgb(210,210,210,0.8)',
                    labels:{
                        title:{
                            font:{
                                weight:"bold"
                            }
                        }
                    },
                    anchor:'end',
                    align:'end',
                }
            },
        }
    })

    var btx = document.getElementById('bar-chart').getContext("2d")
    var bar_chart = new Chart(btx,{
        type:'bar',
        plugins:[ChartDataLabels],
        data:{
            labels:bar_x,
            datasets:[{
                backgroundColor : 'rgba(20,173,255,1)',
                label:'temperature',
                data : bar_y 
            },
            
        ]
        },
        options:{
            plugins: {
                legend:{
                    display: true,
                    labels:{
                        color : 'rgb(0,0,0)'
                    }
                },
                datalabels:{
                    display:'auto',
                    color:"rgb(255,255,255)", //font color
                    //backgroundColor:'rgb(255,255,255,0.8)',
                    labels:{
                        title:{
                            font:{
                                weight:"bold"
                            }
                        }
                    },
                    anchor:'end',
                    align:'start',
                    
                }
            },
            scales:{
                x:{
                    grid:{
                        display:false
                    }
                },
                y:{
                    // grid : {
                    //     display:false
                    // },
                    max:10,
                    min:0

                }
            },
        }
    })

    console.log("get it")
    $.get('http://192.168.0.101/fish/month.php',function(data){
        var msg = JSON.parse(data.toString())
        console.log(msg[0])
        var s, a , c
        for(j = 1 ; j < 13 ; j++){
            s = 0
            a = 0
            c = 0
            bar_x.push(j)
            for(i = 0 ; i < msg.length ; i++){
                var day = msg[i].Time.split(" ")[0].split("-")[1]
                
                if(day == j){     
                    s = s+parseFloat(msg[i].ph)
                    c = c + 1 
                }
                
            }
            a = s/c
            if(!isNaN(a.toFixed(2))){
                bar_y[j-1] = a.toFixed(2)
            }
            bar_chart.update()
            
        }
    })

    var stx = document.getElementById('serch_chart').getContext("2d")
    var serch_Chart = new Chart(stx, {
        type:'line',
        plugins:[ChartDataLabels],
        data:{
            labels : serch_x,
            datasets:[{
                label:'pH_vule',
                data: serch_y,
                borderColor : "rgba(0,191,255,0.3)",//line
                backgroundColor : "rgba(0,191,255,0.3)",//point border
                tension:0
            }]
        },
        options: {
            scales: {
                x:{
                    grid:{
                        display:false
                    },
                },
                y: {
                    display:false,
                    grid:{
                        display:false
                    },
                    max:12,
                    min:0
                }
            },
            
            plugins: {
                legend:{
                    display: true,
                    labels:{
                        color : 'rgba(0,0,0,1)'
                    }
                },
                datalabels:{
                    display:'auto',
                    color:"rgba(0,0,0,1)",
                    //backgroundColor:'rgb(210,210,210,0.8)',
                    labels:{
                        title:{
                            font:{
                                weight:"bold"
                            }
                        }
                    },
                    anchor:'end',
                    align:'end',
                    
                }
            },
        }
    })
    
    console.log("ctx=" + ctx)

    const quertString = window.location.search;
    const urlParams = new URLSearchParams(quertString);
    sensorCode = urlParams.get('sensorCode')
    if(sensorCode != null){
        Get2SQL(sensorCode);
    }
    else{
        alert("無法獲取感測器!");
    }

    client.on('connect', ()=>{
        console.log('已成功連線!');
        client.subscribe("fishpond")
    });
    client.on('message',function(topic,msg){
        var str = msg.toString()
        var temp = str.toLowerCase()
        var data = JSON.parse(temp)
        console.log(data)
        
        var date = new Date()
        var time = date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds()
        if(x.length<=5){
            x.push(time)
            y.push(data['ph'])
        }else{
            x.shift()
            y.shift()
            x.push(time)
            y.push(data['ph'])
        }    
        Chart1.update()
    })
})

function calculate(){
    var average , max , min
    var len = serch_y.length
    max = 0
    min = serch_y[0]
    //sum = 0.00
    var sum = 0
    for(var i = 0 ; i < len ; i++){
        sum = sum + serch_y[i]
        
        if(serch_y[i]>max){
            max = serch_y[i]
        }
    }
    for(var j = 0 ; j < len ; j++){
        
        if(serch_y[j]<min){
            min = serch_y[j]
        }
    }
    average = sum/len
    
    kanban.$set(kanban.value,'ph_max',max) 
    kanban.$set(kanban.value,'ph_min',min) 
    kanban.$set(kanban.value,'ph_average',average.toFixed(2))
}

function remove_array(){
    while(serch_x.length){
        serch_x.pop()
        serch_y.pop()
    }
    return true
}

// Vue.js
let data = {
    search:{
        start_time:'',
        start_date: '',
        end_time:'',
        end_date: '',
        x : serch_x
    }
}

var search = new Vue({
    el : "#search",
    data: data,
    computed:{
        x_length(){
            return this.serch.x.length
        }
    },
    methods:{
        post_time(){
            var start_time = this.search.start_time
            var start_date = this.search.start_date
            var end_time = this.search.end_time
            var end_date = this.search.end_date
            
            if(start_date == '' || end_date == ''){
                alert("check your choice")
            }
            else{
                if(start_date > end_date){
                    alert("請檢查您選擇的日期")
                }
                else{
                    $.ajax({
                        url: "../php/SearchData.php",
                        dataType: "json",
                        type: "POST",
                        data:{
                            start_time:start_time,
                            start_date:start_date,
                            end_time:end_time,
                            end_date:end_date,
                            sensorCode:sensorCode
                        },
                        success: function (response) {
                            if(remove_array()){
                                for(var item in response){
                                    serch_x.push(value[item].Date)
                                    serch_y.push(parseFloat(value[item].FishData) )
                                }
                            }

                            serch_Chart.update()
                            calculate()
                        },
                        error: function(response){

                        }
                    })
                }
            }
        }
    }
})

let k_data = {
    value:{
        ph_max:'',
        ph_min:'',
        ph_average:'',
        temperature_max:'',
        temperature_min:'',
        temperature_average:'',
        o2_max:'',
        o2_min:'',
        o2_average:''
    }
}

var kanban = new Vue({
    el:'#kanban',
    data: k_data
})


// var all_month = []


// var month_test = [{"Time":"2023-02-01 19:56:52","ph":"9.78"},{"Time":"2023-02-09 19:56:57","ph":"7.73"},{"Time":"2023-02-09 19:57:02","ph":"6.93"},{"Time":"2023-02-09 19:57:07","ph":"4.05"},{"Time":"2023-02-09 19:57:12","ph":"4.3"},{"Time":"2023-03-01 19:24:32","ph":"7.3"}
// ,{"Time":"2023-03-02 19:24:32","ph":"4.3"},{"Time":"2023-03-21 19:54:02","ph":"3.3"},{"Time":"2023-03-31 19:44:12","ph":"6.4"}]

// for(j = 1 ; j < 13 ; j++){
    
//     var month = []
//     bar_x.push(j)
//     for(i = 0 ; i < month_test.length ; i++){
//         var day = month_test[i].Time.split(" ")[0].split("-")[1]
        
//         if(day == j){     
//             month.push(month_test[i].ph)
            
//         }
//     }
//     all_month.push(month)
    
// }



// var s, a 
// for(j = 1 ; j < 4 ; j++){
//     s = 0
//     a = 0
//     var len = all_month[j-1].length
//     console.log(all_month[j-1])
//     if(len>0){
//         for(i = 0 ; i < len ; i++){
//             s = s + parseFloat(all_month[j-1][i])
            
//         }
//     }
    
//     console.log(s)
//     a = s/len  
//     if(!isNaN(a.toFixed(2))){
//         bar_y[j-1] = a.toFixed(2)
//     }
//     bar_chart.update()
//     console.log(bar_y)
    
// }