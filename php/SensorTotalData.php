<?php
    require_once("conn2SQL.php");
    $data = array();
    $sql = "SELECT COUNT(SensorCode) FROM sensordata";

    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $data[] = array('total' => $row['COUNT(SensorCode)']);
        }
    }

    $FinalData = json_encode($data);
    echo $FinalData;

    $result->free();
    $conn->close();
?>