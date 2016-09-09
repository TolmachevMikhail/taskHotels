<?php
$dbConn = pg_connect("host=ec2-54-163-248-218.compute-1.amazonaws.com
    port=5432
    dbname=ddu6qutb6a0ddo
    user=aciivkozwrifkd
    password=syfwLu14Yh0P2Aestfiwpanc-j");
if (!$dbConn) {
    die('Failed connection: ' . pg_last_error());
}
function dbQuery($sql) {
    global $dbConn;
    $result = pg_query($dbConn, $sql) or die(pg_error($dbConn));
    return $result;
}
function dbAffectedRows() {
    global $dbConn;
    return pg_affected_rows($dbConn);
}
function dbFetchArray($result, $resultType = MYSQLI_NUM) {
    return pg_fetch_array($result, $resultType);
}
function dbFetchAssoc($result) {
    return pg_fetch_assoc($result);
}
function dbFetchRow($result) {
    return pg_fetch_row($result);
}
function dbFreeResult($result) {
    return pg_free_result($result);
}
function dbNumRows($result) {
    return pg_num_rows( $result);
}
function dbNumFields($result) {
    return pg_num_fields($result);
}
function dbInsertId() {
    global $dbConn;
    return dbFetchAssoc(pg_query($dbConn,"SELECT lastval();"))["lastval"];
}
function closeConn() {
    global $dbConn;
    pg_close($dbConn);
}
/*
* End of file database.php
*/