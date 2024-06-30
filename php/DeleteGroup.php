<?php
    require_once("conn2SQL.php");
    $positionCode = $_POST['positionCode'];
    //$positionCode = 5;
    $myarray = array();

    $sql = "DELETE FROM sensorposition WHERE PositionCode = $positionCode";
    $result = $conn->query($sql);   
    if($result === TRUE){
        echo "成功";
    } else{
        echo "失敗";
    }

    $conn->close();
?>