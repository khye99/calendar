<?php
    require 'database.php';
    ini_set("session.cookie_httponly", 1);
    session_start();
    header("Content-Type: application/json"); // Since we send JSON, set the MIME Type: application/json
    header('Access-Control-Allow-Origin: *');
    $_POST = json_decode(file_get_contents('php://input'), true);

    $event_id = $_POST["event-id"];

    $stmt = $mysqli->prepare("delete from events where id=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
    }
    $stmt->bind_param('d', $event_id);
    $stmt->execute();
    $stmt->close();
    echo json_encode(array(
        "success" => $_POST
    ));
?>
