<?php
    require_once('conn2SQL.php');
    $ID = $_POST['ID'];
    $date = date('Y/m/d H:M:S');
    $myarray = array();

    $sql = "UPDATE sensordata SET LastEdit=$date WHERE SensorCode=$ID ";
    $result = $conn->query($sql);   
    if($result === TRUE){
        echo "yes";
    }else{
        echo "NO";
    }

    $conn->close();
?>