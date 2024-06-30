
/************************************************************************************/
var x=[]
var phy = []
var orpy = []
var ty = []
let phtx = document.getElementById("pH").getContext('2d')
let orptx = document.getElementById("orp").getContext('2d')

let set  = {
    type:'bar',
    plugins:[ChartDataLabels],
    data:{
        labels:x,
        datasets:[{
            borderColor : "rgba(0,191,255,0.8)",//line
            backgroundColor : "rgba(0,191,255,0.8)",//point border
            label:'酸鹼度',
            data : phy 
        },
        {
            borderColor : "rgba(0,200,0,1)",//line
            backgroundColor : "rgba(0,200,0,1)",//point border
            label:'溫度',
            data : ty 
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
                }
            },
            
            y:{
                display : false,
                // grid : {
                //     display:false
                // },
                max:40,
                min:0

            }
        },
        
        
    }
}
var chart_type = []
var chart1 = new Chart(phtx,set)
var chart2 = new Chart(orptx,{
    type:'bar',
    plugins:[ChartDataLabels],
    data:{
        labels:x,
        datasets:[{
            type:'line',
            borderColor : "rgba(0,191,255,0.8)",//line
            backgroundColor : "rgba(0,191,255,0.8)",//point border
            
            label:'氧化還原度',
            data : orpy, 
            tension:0.2
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
                max:1500,
                min:0

            }
        },
        
        
    }
})


var all = []
var chrat_d = new Vue({
    el:'#chart_data',
    data:{
        mon_type:""
    },
    methods:{
        
        
    },
    watch:{
        mon_type:(newval)=>{
            set.type = newval
            chart1.update()
            
        }
    }
})

var list = new Vue({
    el:"#list_data",
    data:{
        display:[]
    },
    mounted(){
        axios.get('http://localhost:8888/fishpond')
        .then((res)=>{
            //console.log(res.data)
            for(var i = 0 ; i < res.data.length;i++){
                
                var pmp = {
                    "type":"pH",
                    "time":res.data[i].time,
                    "value":res.data[i].ph_value
                }
                var tmp = {
                    "type":"temperature",
                    "time":res.data[i].time,
                    "value":res.data[i].temperature
                }
                all.push(pmp)
                all.push(tmp)
            }
            
            this.display = all

            
        }).catch((err)=>{
            console.log(err)
        })
    }
})

var control = new Vue({
    el:"#controler",
    data:{
        time:"nomal",
        type:"nomal",
        list_type:"nomal"
    },
    methods:{

    },
    watch:{
        time:(newVal)=>{
            var len = all.length
            var date = new Date()
            var mon = date.getMonth()+1
            var day = date.getDate()
            var today = date.getFullYear()+"/"+mon+"/"+day

            if(newVal == "week"){
                
                // day = date.getDate()-7
                var last_day = date.getFullYear()+"/"+mon+"/"+day
                var s = new Date(last_day) -30
                console.log(new Date(s))
                console.log(typeof(s))

            }else if(newVal =="month"){
                
            }else if(newVal =="there_month"){
                
            }else if(newVal =="year"){
                
            }else{
                
            }

        }
    }
    
})

