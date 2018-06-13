<?php 
include_once("dbSetup.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;
$watched = $request->watched == true ? TRUE : FALSE;

$stmt = $conn->prepare("UPDATE movies SET is_watched=?  WHERE id=?");
$stmt->bind_param("si", $watched, $id);

if ($stmt->execute() === TRUE) {
    
    $sql = "SELECT * FROM movies WHERE id=$id";

    $result = $conn->query($sql);
    $results = array("payload" => array());
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $results["payload"] = $row;
        }
    }
    echo json_encode($results, JSON_NUMERIC_CHECK);

} else {
    echo "Error updating record: " . $conn->error;
}

$stmt->close();
$conn->close();
?> 