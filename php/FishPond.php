<?php
    require_once('conn2SQL.php');
    $myarray = array();
    $sql = "SELECT * FROM fishpond ";

    $result = $conn->query($sql);   

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $myarray[] = array("FishCode" => $row["FishCode"],
                            "FishPondName" => $row["FishPondName"], 
                            "CreateDate" =>  $row['CreateDate'],
                            "FishText" =>  $row['FishText'],
                            "X" => $row['X'],
                            "Y" => $row['Y']);
        }
    } else {
        //echo "0 查找值";
    }

    $data_json_en = json_encode($myarray);

    $result->free(); // 釋放記憶體
    $conn->close();

    echo $data_json_en;
?>