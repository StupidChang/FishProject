<?php
    require_once('conn2SQL.php');
    $FishPondName = $_POST['FishPondName'];
    $SelectSensorCode = $_POST['SelectSensorCode'];
    $SelectGroupCode = $_POST['SelectGroupCode'];

    $sql = "SELECT FishCode FROM fishpond Where FishPondName='$FishPondName'";
    $result = $conn->query($sql);   
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc() ) {
            $FishPondCode = $row["FishCode"];
        }
    }

    echo $FishPondCode;

    $sql = "INSERT INTO sensorgroup (FishCode, PositionCode, SensorCode) VALUES ('$FishPondCode', '$SelectGroupCode', '$SelectSensorCode')";
    $result = $conn->query($sql);   
    if ($result === TRUE) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }

    //$result->free(); // 釋放記憶體
    $conn->close();
?>