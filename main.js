

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
            borderColor : "rgba(20,173,255,0.6)",
            backgroundColor : "rgba(20,173,255,0.6)",
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
                color:"#005599",
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

var bar_x = []
var bar_y = []
for(var i = 0 ; i < 5 ; i++){
    var num = (Math.floor(Math.random()*50)+10)
    bar_y[i] = num
    bar_x[i] = i
}
var btx = document.getElementById('bar-chart').getContext("2d")
var bar_chart = new Chart(btx,{
    type:'bar',
    plugins:[ChartDataLabels],
    data:{
        labels:bar_x,
        datasets:[{
            backgroundColor : 'rgb(200,0,0,0.6)',
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
    //vm.$set(this.value,'pH',num)
    Chart1.update()
    vm.$set(vm.value,'pH',num)
}

setInterval(rand_number,2000)

function random(){
    for(var i = 0 ; i < bar_y.length ; i++){
        var num = (Math.floor(Math.random()*50)+10)
        bar_y[i] = num
    }
    bar_chart.update()
}

function add(){
    var num = (Math.floor(Math.random()*50)+10)
    bar_x.push(bar_y.length)
    bar_y.push(num)
    bar_chart.update()
}

function delet(){
    bar_x.pop()
    bar_y.pop()
    bar_chart.update()
}
/************************************************************************/

var vm = new Vue({
    el : "#app",
    data : {
        value:{}
    },
   
})