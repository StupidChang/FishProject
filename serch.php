<?php
    include("config.php");
    $time = $_POST['stime'];
    $date = $_POST['sday'];
    $start = $date." ".$time;
    $eday = $_POST['eday'];
    $etime = $_POST['etime'];
    $end = $eday." ".$etime;
    //echo $start;
    
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die("Connetion failed: ". $conn->connect_error);
    }
    $table_key = false;
    $sql = "SELECT * FROM ph WHERE Time>'$start' AND TIME <='$end'";
    $result = $conn->query($sql);
    if($result->num_rows ==0){
        echo "null";
    }
    else if($result -> num_rows > 0){
        while($row = $result->fetch_assoc()){
            $data[] = array(
                "Time"=>$row["Time"],
                "ph"=>$row["value"],
            );
        }
        $json = json_encode($data);
        echo $json;
    }  
    $conn->close();
?>
