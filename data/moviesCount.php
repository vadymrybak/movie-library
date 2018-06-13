<?php 

include_once("dbSetup.php");


$sql = "SELECT count(*) as count FROM movies";

$result = $conn->query($sql);

$results = array("payload" => array());

if ($result->num_rows > 0) {

    // output data of each row
    while($row = $result->fetch_assoc()) {
    	$results["payload"] = $row["count"];
    }


} else {
    echo "0 results";
    $conn->close();
    die();
}

echo json_encode($results, JSON_NUMERIC_CHECK);
$conn->close();

?> 