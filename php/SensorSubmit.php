<?php
    require_once("conn2SQL.php");
    $name = $_POST['Name'];
    $type = $_POST['Type'];
    $date = date('Y/m/d');
    $sql = "INSERT INTO sensordata (CreateDate, SensorName, SensorType, MaxError, minerror) VALUE ('$date', '$name', '$type', '0', '0')";

    $result = $conn->query($sql);
    if($result === TRUE){
        echo "成功";    
    }
    else{
        echo "失敗";
    }

    $conn->close();
?>