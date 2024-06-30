<?php
    require_once("conn2SQL.php");
    $Max = $_POST['Max'];
    $Min = $_POST['Min'];
    $sensorCode = $_POST['sensorCode'];

    //$Max = 10;
    //$Min = 5;
    //$sensorCode = 1;

    $sql = "UPDATE `sensordata` SET `MaxError`='$Max',`minError`='$Min' FROM sensordata WHERE SensorCode=$sensorCode;";
    $result = $conn->query($sql);
    if($result === TRUE){
        echo "OK!!";
    }
    else{
        echo "fail";
    }

    $conn->close();
?>