<?php
    require_once('conn2SQL.php');
    $myarray = array();

    $sql = "SELECT A.SensorCode, A.SensorName, A.SensorType, A.SensorError FROM sensordata A LEFT JOIN sensorgroup B ON A.SensorCode = B.SensorCode Where B.SensorCode IS NULL";
    $result = $conn->query($sql);   
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc() ) {
            $myarray[] = array("SensorCode" => $row["SensorCode"],
                                "SensorName" => $row["SensorName"],
                                "SensorType" => $row["SensorType"],
                                "SensorError" => $row["SensorError"]);
        }
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free(); // 釋放記憶體
    $conn->close();
?>