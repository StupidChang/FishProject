<?php
    require_once('conn2SQL.php');
    $FishPondName = $_POST['FishPondName'];
    $FishPondCode;
    //$FishPondName = "魚塭戰艦號";
    $myarray = array();

    $sql = "SELECT FishCode FROM fishpond Where FishPondName='$FishPondName'";
    $result = $conn->query($sql);   
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc() ) {
            $FishPondCode = $row["FishCode"];
        }
    }

    //echo $FishPondCode;

    $sql = "SELECT PositionCode, A.SensorCode, B.SensorName, B.SensorType, B.SensorError FROM sensorgroup A INNER JOIN sensordata B ON (A.SensorCode = B.SensorCode) WHERE A.FishCode='$FishPondCode' ORDER BY PositionCode ASC";
    $result = $conn->query($sql);   

    //echo $result->num_rows;

    if($result->num_rows > 0){  
        while($row = $result->fetch_assoc() ) {
            $myarray[] = array('PositionCode' => $row["PositionCode"],
                            'SensorCode' => $row["SensorCode"],
                            'SensorName' => $row["SensorName"],
                            'SensorType' => $row["SensorType"],
                            'SensorError' => $row["SensorError"],);
        }
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free(); // 釋放記憶體
    $conn->close();
?>