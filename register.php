<?php
    require 'database.php';
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json"); // Since we send JSON, set the MIME Type: application/json
    $_POST = json_decode(file_get_contents('php://input'), true);
        function checkexisting ($username){
          require 'database.php';
        	$stmt = $mysqli->prepare("select * from users where username=? ");
        	if(!$stmt){
        	     
        	exit;
          }
        	$stmt->bind_param("s", $username);
        	$stmt->execute();
        	$stmt->store_result();
        	if($stmt->num_rows > 0) {
            	echo json_encode(array(
            		"success" => false,
            		"message" => "Incorrect Username or Password")
              );
        	exit;
        	}
    }
    if(isset($_POST["username"]) && isset($_POST["password"])) {
          checkexisting($_POST['username']);
          $username = $_POST["username"];
          $password = $_POST["password"];
          $pwd_hash = password_hash($password, PASSWORD_DEFAULT);
          $stmt = $mysqli->prepare("insert into users(username, hashed_pass) values (?, ?)");
            if(!$stmt){
              	echo json_encode(array(
              		"success" => false,
              		"message" => "Incorrect Username or Password")
                );
            exit;
          	}
          $stmt->bind_param('ss', $username, $pwd_hash);
          $stmt->execute();
          $stmt->close();
          echo json_encode(array(
          		"success" => true)
          );
    exit;
    }
?>
