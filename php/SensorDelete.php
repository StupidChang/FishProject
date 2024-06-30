<?php
    require_once('conn2SQL.php');
    $myarray = array();
    $SensorCode = $_POST['sensorCode'];
    //$FishPondCoda = "123";
    $sql = "DELETE FROM `sensordata` WHERE `SensorCode`=$SensorCode";

    $result = $conn->query($sql);   

    if ($result === TRUE) {
        echo "成功";
    } else {
        echo "失敗";
    }

    $result->free(); // 釋放記憶體
    $conn->close();

?>