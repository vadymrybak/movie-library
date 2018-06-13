<?php 



include_once("dbSetup.php");

$startIndex = $_GET["startIndex"];
$endIndex = $_GET["endIndex"];

$sql = "SELECT * FROM movies LIMIT $startIndex, $endIndex";
$result = $conn->query($sql);
$results = array("payload" => array());

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {   
        if ($row["is_watched"] == "1")
            $row["is_watched"] = TRUE;
        else
            $row["is_watched"] = FALSE;   
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