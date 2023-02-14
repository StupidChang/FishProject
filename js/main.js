// Vue.js
var vm = new Vue({
    el : "#app",
    data : {
        value:{
            pH: "null",
            average : "null",
            start_time : "null",
            end_time : "null"
        }
    },
   
})

//choice time
function serch_range(){
    var start = document.getElementById('start_time').value
    var end = document.getElementById('end_time').value
    
    if(start === "" && end != ""){
        alert("please choice start_time")
    }else if(end === "" && start != ""){
        alert("please choice end_time")
    }else if(start === "" && end === "" || start > end){
        alert("check your input")
    }
    
    vm.$set(vm.value,'start_time',start)
    vm.$set(vm.value,'end_time',end)

}
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
    vm.$set(vm.value,'pH',num)

}

//Average of Bar chart values 
function average(){
    var sumition = 0
    var average_value = 0.0
    for(var i = 0 ; i < bar_x.length ; i++){
        sumition = sumition + bar_y[i]
    }
    average_value = (sumition/bar_x.length).toFixed(1)
    vm.$set(vm.value,'average',average_value) //update bar_chart value at Vue.average.value
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




// $servername = "localhost";
    // $username = "root";
    // $password = "";
    // $dbname = "fishpond";
    // $conn = new mysqli($servername,$username,$password,$dbname);
    // if($conn->connect_error){
    //     die("Connetion failed: ". $conn->connect_error);
    // }
    
    // $sql = "SELECT * FROM ph";
    // $result = $conn->query($sql);
    // if($result ->num_rows > 0){
    //     while($row = $result->fetch_assoc()){
            
    //         $data[] = array('ph' => $row["value"],);
            
    //     }
        
    // }else{

    // }
    
    // echo json_encode($data);
    // mysqli_close($conn);