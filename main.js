
// Line chart setting 
var x = [null]
var y = [null]

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

// Bar chart setting
var bar_x = [1,2,3,4,5]
var bar_y = [15,20,35,55,30]

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
                max:60,
                min:0

            }
        },
        
        
    }
})
//serch_data chart
var serch_x = []
var serch_y = []
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

// Line chart value 
function rand_number(){
    var num = (Math.random()*(2-10)+10).toFixed(2)
    var date = new Date()
    var time = date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds()
    if(x.length<=5){
        x.push(time)
        y.push(num)
    }else{
        x.shift()
        y.shift()
        x.push(time)
        y.push(num)
    }
    Chart1.update()
    //vm.$set(vm.value,'pH',num)

}

//Average of Bar chart values 
function average(){
    var sumition = 0
    var average_value = 0.0
    for(var i = 0 ; i < bar_x.length ; i++){
        sumition = sumition + bar_y[i]
    }
    average_value = (sumition/bar_x.length).toFixed(1)
    //vm.$set(vm.value,'average',average_value) //update bar_chart value at Vue.average.value
}

average() //call function
setInterval(rand_number,2000) // call function every 2 seconds

//Bar chart random button function
function random(){
    for(var i = 0 ; i < bar_y.length ; i++){
        var num = (Math.floor(Math.random()*50)+10)
        bar_y[i] = num
    }
    bar_chart.update()
    average()
}
//Bar chart add button function
function add(){
    var num = (Math.floor(Math.random()*50)+10)
    bar_x.push(bar_y.length)
    bar_y.push(num)
    bar_chart.update()
    average()
}
//Bar chart delet button function
function delet(){
    bar_x.pop()
    bar_y.pop()
    bar_chart.update()
    average()
}

function calculate(){
    
    var average ,num, max , min
    var len = serch_y.length
    max = 0
    min = serch_y[0]
    sum = 0.00
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
    serch:{
        start_time:'',
        start_date: '',
        end_time:'',
        end_date: '',
        x : serch_x
    }
    

}
var serch = new Vue({
    el : "#serch",
    data: data,
    computed:{
        x_length(){
            return this.serch.x.length
        }
    },
    methods:{
        post_time(){
            var start_time = this.serch.start_time
            var start_date = this.serch.start_date
            var end_time = this.serch.end_time
            var end_date = this.serch.end_date
            
            if(start_date =='' | start_time =='' | end_time =='' | end_date==''){
                alert("check your choice")
            }else{
                if(start_date>end_date){
                    alert("請檢查您選擇的日期")
                }else{
                    
                    let post_data = {
                        stime : start_time,
                        sday: start_date,
                        etime : end_time,
                        eday:end_date
                    }
                    $.post('http://192.168.0.101/fish/serch.php',post_data,function(data){
                        
                        if(data =='null'){
                            alert("查無資料")
                        }else{
                            var value = JSON.parse(data)
                            var i = 0
                            
                            if(remove_array()){
                                while( i < value.length){
                                    serch_x.push(value[i].Time)
                                    serch_y.push(parseFloat(value[i].ph) )
                                    i++
                                }
                            }
                            
                            serch_Chart.update()
                            calculate()
                        }

                        /*
                        */
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