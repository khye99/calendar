<?php
        require 'database.php';
        header("Content-Type: application/json"); // Since we send JSON, set the MIME Type: application/json
        $_POST = json_decode(file_get_contents('php://input'), true);
        // function checkexisting ($username){
        //         require 'database.php';
        //         $stmt = $mysqli->prepare("select * from users where username=? ");
        //             if(!$stmt){
        //                 echo json_encode(array(
        //                     "success" => false,
        //                     "message" => "Your username is incorrect"
        //                     ));
        //                 exit;
        //             }
        //         $stmt->bind_param("s", $username);	
        //         $stmt->execute();

        //         if($stmt->num_rows == 0) {
        //             echo json_encode(array(
        //             "success" => false,
        //             "message" => "username not existed in the database "
        //         ));
        //         exit;
        //         }
        // }
        ini_set("session.cookie_httponly", 1);
        session_start();
        $sharee = htmlentities($_POST['share_username']);
        // checkexisting($sharee);

        $stmt2 = $mysqli->prepare("select user_id from users where username=? ");
        if (!$stmt2) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt2->bind_param('s', $sharee); // have sharee user id
        $stmt2->execute();
        $stmt2->bind_result($sharee_id);
        $stmt2->fetch();
        echo $sharee_id;
        $stmt2->close();

        $event_id=htmlentities($_POST['id']);

        $stmt = $mysqli->prepare("select title, startMonth, startDay, startYear, endMonth, endDay, endYear, startHour, startMinutes, endHour, endMinutes, user_id, tag from events where id=?");
        $stmt->bind_param('d', $event_id); // have event id
        $stmt->execute();
        $stmt->bind_result($title, $startMonth, $startDay, $startYear, $endMonth, $endDay, $endYear, $startHour, $startMinutes, $endHour, $endMinutes, $user_id, $tag);
        $stmt->fetch();
        $stmt->close();
         
        // echo $title;
        // echo $share_id

        $stmt = $mysqli->prepare("insert into events (title, startMonth, startDay, startYear, endMonth, endDay, endYear, startHour, startMinutes, endHour, endMinutes, user_id, tag) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if(!$stmt){
            echo json_encode(array(
                "success" => false,
                "message" => "Incorrect Username or Password"
            ));
            exit;
         }
        $stmt->bind_param('sssssssssssds', $title, $startMonth, $startDay, $startYear, $endMonth, $endDay, $endYear, $startHour, $startMinutes, $endHour, $endMinutes, $sharee_id, $tag);
 
        $stmt->execute();
        $stmt->close();
        echo json_encode(array(
                "success" => $title,
                "asljdn" => $_POST['share_username'],
                "sharee_id" => $sharee_id
            ));
        exit;
?>