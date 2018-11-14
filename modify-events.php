<?php
    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json"); // Since we send JSON, set the MIME Type: application/json
    $_POST = json_decode(file_get_contents('php://input'), true);

    $id = $_POST['id'];
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

    $stmt = $mysqli->prepare("update events set title=?, startMonth=?, startDay=?, startYear=?, endMonth=?, endDay=?, endYear=?, startHour=?, startMinutes=?, endHour=?, endMinutes=? where id=?");
    if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => $mysqli->error)
        );
    exit;
    }
    $stmt->bind_param('sssssssssssd', $title, $startMonth, $startDay, $startYear, $endMonth, $endDay, $endYear, $startHour, $startMinutes, $endHour, $endMinutes, $id);
    $stmt->execute();
    $stmt->close();
    echo json_encode(array(
        "success" => $_POST)
    );
    exit;
    
?>
