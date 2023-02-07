<?php
    // create database
    function create($conn){
        $create = "CREATE DATABASE fishpond";
        if($conn->query($create)===TRUE){
            echo "create database successfully"; 
        }else{
            echo "Error creating database: " . $conn->error;
        }
        $conn->close();
    }
    // create table
    function create_table($conn){
        $create = "CREATE TABLE ph ( 
            Time TIMESTAMP PRIMARY KEY,
            Type char(2),
            value float(2)
        )";
        if ($conn->query($create) === TRUE) {
            echo "Table created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
        
        $conn->close();

    }
    //connect to database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $conn = new mysqli($servername,$username,$password);
    if($conn->connect_error){
        die("Connetion failed: ". $conn->connect_error);
    }
    //check database be there
    $key = false;
    $sql = "SHOW DATABASES";
    $result = $conn->query($sql);

    if($result ->num_rows > 0){
        while($row = $result->fetch_assoc()){
            //echo $row["Database"]."<br>";
            if($row["Database"] === "fishpond"){
                echo "database serch<br>";
                $key = true;
                $conn->close();
                break;
            }
        }
        if(!$key){
            create($conn);
        }
    }
    //when database has be there check Is table be there
    if($key){
        $dbname = "fishpond";
        $conn = new mysqli($servername,$username,$password,$dbname);
        if($conn->connect_error){
            die("Connetion failed: ". $conn->connect_error);
        }
        $table_key = false;
        $sql = "SHOW TABLES";
        $result = $conn->query($sql);
        if($result -> num_rows == 0){
            create_table($conn);
        }
        if($result ->num_rows > 0){
            while($row = $result->fetch_assoc()){
                if($row["Tables_in_fishpond"] == "ph"){
                    echo "talbe serch";
                    $table_key = true;
                    $conn->close();
                    break;
                }
            }
            if(!$table_key){
                create($conn);
            }
        }

    }



?>