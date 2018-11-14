<?php
    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json"); // Since we send JSON, set the MIME Type: application/json
    $_POST = json_decode(file_get_contents('php://input'), true);

    // $id = $_POST['id'];
    $title = $_POST['title'];
    $startMonth = $_POST['startMonth'];
    $startDay = $_POST['startDay'];
    $startYear = $_POST['startYear'];
    $endMonth = $_POST['endMonth'];
    $endDay = $_POST['endDay'];
    $endYear = $_POST['endYear'];
    $startHour = $_POST['startHour'];
    $startMinutes = $_POST['startMinutes'];
    $endHour = $_POST['endHour'];
    $endMinutes = $_POST['endMinutes'];
    $user_id = $_SESSION['user_id'];
    $tag = $_POST['tag'];

    $stmt = $mysqli->prepare("insert into events(title, startMonth, startDay, startYear, endMonth, endDay, endYear, startHour, startMinutes, endHour, endMinutes, user_id, tag) values (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => "Incorrect Username or Password")
        );
    exit;
    }
    $stmt->bind_param('sssssssssssds', $title, $startMonth, $startDay, $startYear, $endMonth, $endDay, $endYear, $startHour, $startMinutes, $endHour, $endMinutes, $user_id, $tag);
    $stmt->execute();
    $stmt->close();
    echo json_encode(array(
        "success" => $_POST)
    );
    exit;
    
?>
