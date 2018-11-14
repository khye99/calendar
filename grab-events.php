<?php
require 'database.php';
session_start();
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json"); 

if (!isset($_SESSION['user_id'])) {
    echo json_encode(array(
        "message" => "user_id not set"
    ));
    exit;
}

$user_id = $_SESSION['user_id'];
$stmt = $mysqli->prepare("select * from events where user_id=?");
$stmt->bind_param("d", $user_id);
$stmt->execute();
$result = $stmt->get_result();
// echo json_encode(array(
//     "event" => $result->fetch_assoc()
// ));
// while ($story = $result->fetch_assoc()) {
//     echo json_encode(array(
//         "event" => "asd"
//   ));
// }
$answer = array();
while ($story = $result->fetch_assoc()) {
    array_push($answer, array(
        "id" => $story['id'],
        "title" => $story['title'],
        "startMonth" => $story['startMonth'],
        "startDay" => $story['startDay'],
        "startYear" => $story['startYear'],
        "endMonth" => $story['endMonth'],
        "endDay" => $story['endDay'],
        "endYear" => $story['endYear'],
        "startHour" => $story['startHour'],
        "startMinutes" => $story['startMinutes'],
        "endHour" => $story['startHour'],
        "endMinutes" => $story['startMinutes'],
        "tag" => $story['tag']
  ));
}
echo json_encode($answer);
$stmt->close();
?>