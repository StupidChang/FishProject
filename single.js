var ctx = document.getElementById('sensor_data').getContext('2d')
var date = new Date()
var mon = date.getMonth()+1
var day = date.getDate()+1
var t = date.getFullYear()+"/"+mon+"/"+day
var today =new Date(date.getFullYear()+"/"+mon+"/"+date.getDate())-0
var all = []
var x = []
var y = []
list_key = false //Don't remove
var set = {
    type:'bar',
    plugins:[ChartDataLabels],
    data:{
        labels:x,
        datasets:[{
            borderColor : "rgba(0,191,255,0.8)",//line
            backgroundColor : "rgba(0,191,255,0.8)",//point border
            label:'氧化還原度',
            data : y, 
        }]
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
                color:"rgba(0,0,0,0.5)", //font color
                //backgroundColor:'rgb(255,255,255,0.8)',
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
        scales:{
            x:{
                grid:{
                    display:false
                },
                
            },
            
            y:{
                display : false,
                // grid : {
                //     display:false
                // },
                max:10,
                min:0

            }
        },
        
        
    }
}
var chart1 = new Chart(ctx,set)
function change_display(start){
    
    list.display = []
    var i =0
    var xlen = x.length
    x.splice(0,xlen)
    y.splice(0,xlen)
    var len = all.length
    while(i<len){
        var data_time = new Date(all[i].time)-0
        if(data_time >=start){
            x.push(all[i].time)
            y.push(all[i].ph_value)
            var temp = {
                "time": all[i].time,
                "value":all[i].ph_value
            }
            list.display.push(temp)
            
        }    
        i++
    }
    chart1.update()
}
function over_display(start){
    list.display = []
    var i =0
    var xlen = x.length
    x.splice(0,xlen)
    y.splice(0,xlen)
    var len = all.length
    while(i<len){
        var data_time = new Date(all[i].time)-0
        if(all[i].ph_value>=7 && data_time >=start){
            x.push(all[i].time)
            y.push(all[i].ph_value)
            var temp = {
                "time": all[i].time,
                "value":all[i].ph_value
            }
            list.display.push(temp)
            
        }    
        i++
    }
    chart1.update()
}
var list = new Vue({
    el:'#list_data',
    data:{
        display:[]
    },
    mounted(){
        axios.get('http://localhost:8888/fishpond')
        .then((res)=>{
            all = res.data
            change_display(today)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
})
var contor = new Vue({
    el:'#controler',
    data:{
        time:"nomall",
        list_type:"nomall",
    },
    
    watch:{
        time:(newValue)=>{
            if(!list_key){
                if(newValue =="week"){
                    var week = today-7*60*60*24*1000
                    change_display(week)
                }else if (newValue =="month"){
                    
                    var month = today - 31*60*60*24*1000
                    change_display(month)
                }else if (newValue == "three_month"){
                    var three_month = today - 93*60*60*24*1000
                    change_display(three_month)
    
                }else if (newValue =="nomall"){
                    change_display(today)
                }
            }
            else{
                if(newValue =="week"){
                    var week = today-7*60*60*24*1000
                    over_display(week)
                }else if (newValue =="month"){
                    
                    var month = today - 31*60*60*24*1000
                    over_display(month)
                }else if (newValue == "three_month"){
                    var three_month = today - 93*60*60*24*1000
                    over_display(three_month)
    
                }else if (newValue =="nomall"){
                    over_display(today)
                }
            }
            
            
        },
        list_type:(newValue)=>{
            
            if(newValue == "over_data"){
                list_key = true
                contor.time = "nomall"
                over_display(today)
            }else{
                list_key = false
                contor.time = "nomall"
            }
        }
    }
})
var chart_type_setting = new Vue({
    el:"#chart_type",
    data:{
        type:"bar"
    },
    watch:{
        type:(newValue)=>{
            set.type = newValue
            chart1.update()
        }
    }

})