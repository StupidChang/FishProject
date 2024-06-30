<?php
    require_once("conn2SQL.php");
    $FishPondName = $_POST['FishPondName'];
    //$FishPondName = "魚塭戰艦號";
    $myarray = array();

    $sql = "SELECT A.SensorCode, A.SensorError, C.FishPondName FROM sensordata A INNER JOIN sensorgroup B ON A.SensorCode = B.SensorCode INNER JOIN fishpond C ON B.FishCode = C.FishCode WHERE C.FishPondName = '$FishPondName' AND A.SensorError > 0";
    $result = $conn->query($sql);   
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc() ) {
            $myarray[] = array('SensorCode' => $row["SensorCode"], 'SensorError' => $row["SensorError"], 'FishPondName' => $row["FishPondName"]);
        }
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free();
    $conn->close();
?>