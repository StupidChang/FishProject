<?php
    require_once("conn2SQL.php");
    $firstData;
    $LastData;
    $errorNum;

    $start_Date = $_POST['start_date'];
    $start_Time = $_POST['start_time'];
    $end_Date = $_POST['end_date'];
    $end_Time = $_POST['end_time'];
    $sensorCode = $_POST['fishCode'];
    $dateInterval = $_POST['dateInterval'];
    $myarray = array();

    function DataCalculate($finaldate, $dateInterval){
        if($dateInterval == 1){

        }
        if($dateInterval == 2){
            
        }
        if($dateInterval == 3){

        }
        if($dateInterval == 4){

        }
        if($dateInterval == 5){

        }
        $LastData = strtotime("+1 month",strtotime("2020-10-13"))
    }

    $sql = "SELECT Date INNER JOIN sensordata B ON A.SencorCode = B.SensorCode WHERE value > MaxError AND value < minError AND SensorCode = '$sensorCode' Date BETWEEN'$start_Date $start_Time' AND '$end_Date $end_Time'";
    $result = $conn->query($sql);
    if($result->num_row > 0){
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