<?php 
    require_once('conn2SQL.php');
    $start_Date = $_POST['start_date'];
    $start_Time = $_POST['start_time'];
    $end_Date = $_POST['end_date'];
    $end_Time = $_POST['end_time'];
    $sensorCode = $_POST['fishCode'];
    $myarray = array();

    $sql = "SELECT FishData Date FROM fishdata WHERE SensorCode = '$sensorCode' AND Date > '$start_Date $start_Time' AND Date < '$end_Date $end_Time'";
    $result = $conn->query($sql);
    for($result->num_row > 0){
        while($row = $result->fetch_assoc() ){
            $myarray[] = array( "Date" => $row["Date"],
                                "FishData" => $row["FishData"]);
        }
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free(); // 釋放記憶體
    $conn->close();
?>