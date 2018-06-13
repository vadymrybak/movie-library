<?php 

include_once("dbSetup.php");

$query = $_GET["query"];
$yearFrom = $_GET["from"];
$yearTo = $_GET["to"];



$sql = "SELECT * FROM movies WHERE name LIKE '%$query%'";

if ($yearFrom && $yearTo){
    $sql = "SELECT * FROM movies WHERE name LIKE '%$query%' AND year >= $yearFrom AND year <= $yearTo";
}

$result = $conn->query($sql);

$results = array("payload" => array());

if ($result->num_rows > 0) {

    // output data of each row
    while($row = $result->fetch_assoc()) {
    	$results["payload"][] = $row;
    }


} else {
    echo "0 results";
    $conn->close();
    die();
}

echo json_encode(utf8ize($results));
$conn->close();

?> 