<?php
    require_once('conn.php');

    $search_array = array();
    $search_sql = "SELECT * FROM search";
    $result = $conn->query($search_sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          //echo "主鍵:" . $row["A"] . ', 溫度:' . $row['temp'] . ', 導電度:' . $row['B'] . '<br>';
          $search_array[] = array("Main" => $row["Main"], 
                                  "math" =>  $row['math']);
        }
    } else {
        //echo "0 查找值";
    }
    
    //$sql = "SELECT * FROM test1 WHERE A = 'kai'";
    //$sql = "Select temp ,B From test1";
    $myarray = array();
    $sql = "SELECT * FROM database_ ORDER BY Main LIMIT 0," . $search_array[0]['math'];

    $result = $conn->query($sql);       // 使用 query() 語法執行，同 mysql_query()，回傳執行語法的結果
    //$row = $result->fetch_assoc();      // 與 fetch_array()、 fetch_row() 不同，回傳該我們找到的那一 row 並放入 $row;

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          //echo "主鍵:" . $row["A"] . ', 溫度:' . $row['temp'] . ', 導電度:' . $row['B'] . '<br>';
          $myarray[] = array("Main" => $row["Main"], 
                            "Date" =>  $row['Date'],
                            "Temp" =>  $row['Temp'], 
                            "Ph" => $row['Ph'],
                            "Orp" => $row['Orp']);
        }
    } else {
        //echo "0 查找值";
    }

    $data_json_en = json_encode($myarray);

    echo $data_json_en;

    /*foreach ($myarray as $p => $k) { //$p代表外層索引鍵[0]，$k['姓名']代表接收Selena、Hebe、Ella
        echo  $p." - ".$k['Main']."，"
                .$k['temp']."，"
                .$k['B']."<br>";
    }*/

    $result->free(); // 釋放記憶體
    $conn->close();
?>