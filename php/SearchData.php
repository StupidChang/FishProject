<?php 
    require_once('conn2SQL.php');
    $start_Date = $_POST['start_date'];
    $start_Time = $_POST['start_time'];
    $end_Date = $_POST['end_date'];
    $end_Time = $_POST['end_time'];
    $sensorCode = $_POST['sensorCode'];
    $searchType = $_POST['searchType'];

    //$start_Date = "2023-03-05";
    //$start_Time = "00:00:00";
    //$end_Date = "2023-03-10";
    //$end_Time = "00:00:00";
    //$sensorCode = "1";     
    //$searchType = "1";
    $myarray = array();

    $sql = "SELECT value, Date FROM fishdata WHERE SensorCode = '$sensorCode' AND Date > '$start_Date $start_Time' AND Date < '$end_Date $end_Time'" ;
    $result = $conn->query($sql);

    if($result->num_rows > 0);{
        while($row = $result->fetch_assoc()){
            $myarray[] = array( "Date" => $row["Date"],
                                "value" => $row["value"]);
        }
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free(); // 釋放記憶體
    $conn->close();
?>