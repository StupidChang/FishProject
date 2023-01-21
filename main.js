

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
        scales: {
          y: {
            max:16,
            min:0
          }
        }
      }


})



function rand_number(){
    
    var num = (Math.random()*(2-10)+10).toFixed(2)
    console.log(num)
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
}

setInterval(rand_number,2000)