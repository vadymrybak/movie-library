<?php 
include_once("dbSetup.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;
$rating = $request->rating;

$stmt = $conn->prepare("UPDATE movies SET my_rating=?  WHERE id=?");
$stmt->bind_param("ii", $rating, $id);

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