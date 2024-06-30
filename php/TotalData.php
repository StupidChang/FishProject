<?php
    require_once("conn2SQL.php");
    //$sensorCode = $_POST['sensorCode'];
    $data = array();
    $sensorCode = 1;

    $sql = "SELECT COUNT(value) FROM fishdata A WHERE SensorCode=$sensorCode GROUP BY SensorCode";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $data[] = array('total' => $row['COUNT(value)']);
        }
    }

    $FinalData = json_encode($data);
    echo $FinalData;

    $result->free();
    $conn->close();
?>