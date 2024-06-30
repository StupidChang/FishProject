<?php
    require_once("conn2SQL.php");
    $FishPondName = $_POST['FishPondName'];
    $SensorCode = $_POST['SensorCode'];
    $positionCode = $_POST['positionCode'];
    //$FishPondName = "魚塭戰艦號";
    //$SensorCode = 5;
    //$positionCode = 4;
    $myarray = array();

    $sql = "SELECT FishCode FROM fishpond Where FishPondName='$FishPondName'";
    $result = $conn->query($sql);   
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc() ) {
            $FishPondCode = $row["FishCode"];
        }
    }

    $sql = "DELETE FROM sensorgroup WHERE FishCode = $FishPondCode AND SensorCode = $SensorCode AND PositionCode = $positionCode";
    $result = $conn->query($sql);   
    if($result === TRUE){
        echo "OK!";
    }else{
        echo "失敗";
    }

    $conn->close();
?>