<?php
    require 'database.php';
    ini_set("session.cookie_httponly", 1);
    session_start();

    header("Content-Type: application/json"); // Since we send JSON, set the MIME Type: application/json
    header('Access-Control-Allow-Origin: *');
    $_POST = json_decode(file_get_contents('php://input'), true);

    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $mysqli->prepare("select count(*), user_id, hashed_pass from users where username=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
    }
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($cnt, $user_id, $pwd_hash);
    $stmt->fetch();

    $pwd_guess = htmlentities($_POST['password']);

    if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
    	$_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username;
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));

        $previous_ua = @$_SESSION['username'];
        $current_ua = $_SERVER['HTTP_USER_AGENT'];
        
        if(isset($_SESSION['username']) && $previous_ua !== $current_ua){
            die("Session hijack detected");
        }else{
            $_SESSION['username'] = $current_ua;
        }

        echo json_encode(array(
            "success" => true,
            "username" => $username,
            "user-id" => $_SESSION['user_id'],
            "token" => $_SESSION['token'])
        );
        exit;
    } else{
        echo json_encode(array(
            "message" => "Incorrect Username or Password")
        );
        session_destroy();
        exit;
    }
?>
