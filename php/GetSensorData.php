<?php
    require_once("conn2SQL.php");
    $data = array();
    $Code = $_POST['sensorCode'];
    //$Code = 1;
    $sql = "SELECT A.SensorCode, CreateDate, SensorName, SensorType, MaxError, minError, SensorError, Date FROM sensordata A LEFT JOIN fishdata B ON A.SensorCode = B.SensorCode WHERE  A.SensorCode = $Code ORDER BY B.Date DESC LIMIT 1";

    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $data[] = array('SensorCode' => $row['SensorCode'],
                            'CreateDate' => $row['CreateDate'],                    
                            'SensorName' => $row['SensorName'],
                            'SensorType' => $row['SensorType'],
                            'MaxError' => $row['MaxError'],
                            'minError' => $row['minError'],                
                            'SensorError' => $row['SensorError'],
                            'Date' => $row['Date'],
                        );
        }
    }

    $FinalData = json_encode($data);
    echo $FinalData;

    $result->free();
    $conn->close();
?>  