<?php
    require_once("conn2SQL.php");
    $DataArray = array();
    $sql = "SELECT A.SensorCode, A.CreateDate, A.SensorName, A.SensorType, A.SensorError, A.LastEdit, C.FishPondName FROM sensordata A LEFT JOIN sensorgroup B ON A.SensorCode = B.SensorCode LEFT JOIN fishpond C ON B.FishCode = C.FishCode;";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $DataArray[] = array('SensorCode' => $row['SensorCode'],
                                 'CreateDate' => $row['CreateDate'],
                                 'SensorName' => $row['SensorName'],
                                 'SensorType' => $row['SensorType'],
                                 'SensorError' => $row['SensorError'],
                                 'LastEdit' => $row['LastEdit'],
                                 'FishPondName' => $row['FishPondName']);
        }
    }

    $FinalData = json_encode($DataArray);
    echo $FinalData;

    $result->free();
    $conn->close();
?>      