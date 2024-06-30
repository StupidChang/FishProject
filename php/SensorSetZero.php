<?php
    require_once("conn2SQL.php");
    //$sensorCode = $_POST['sensorCode'];
    $sensorCode = 7;
    $sql = "UPDATE sensordata SET SensorError=0 WHERE SensorCode=$sensorCode";

    $result = $conn->query($sql);
    if($result === TRUE){
        echo "成功";    
    }
    else{
        echo "失敗";
    }

    $conn->close();
?>