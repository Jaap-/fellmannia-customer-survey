<?php

// Retrieve form data
$lahettaja = $_POST['lahettaja'];
$sposti = $_POST['sposti'];
$palautelaatikko = $_POST['palautelaatikko'];
$halu_palaute = $_POST['halu_palaute'];
$posit = $_POST['posit'];
$negat = $_POST['negat'];
$neutr = $_POST['neutr'];
if (!$lahettaja || !$palautelaatikko || !$neutr || !$posit || !$negat) // mitkä näistä pakolliset ja kuinka määritellä? {
	echo "save_failed";
	return;
}

// Convert sports array to a serialized string
$palaute_list = serialize($palaute);

$db = array(
	'host' => 'host_goes_here',
	'login' => 'login_goes_here',
	'password' => 'password_goes_here',
	'database' => 'database_goes_here',
);
$link = @mysql_connect($db['host'], $db['login'], $db['password']);
if (!$link) {
	echo "save_failed";
	return;	
}
mysql_select_db($db['database']);

// Clean variables before performing insert
$clean_lahettaja = mysql_real_escape_string($lahettaja);
$clean_sposti = mysql_real_escape_string($sposti);
$clean_palautelaatikko = mysql_real_escape_string($palautelaatikko);
$clean_halu_palaute = mysql_real_escape_string($halu_palaute);
$clean_negat = mysql_real_escape_string($negat);
$clean_posit = mysql_real_escape_string($posit);
$clean_neutr = mysql_real_escape_string($neutr);
$clean_sports_list = mysql_real_escape_string($palaute_list);

// Perform insert
// tähän jäätiin!!!
$sql = "INSERT INTO details (name, age_range_ID, sports) VALUES ('{$clean_name}', {$clean_age_range}, '{$clean_sports_list}')";
if (@mysql_query($sql, $link)) {
	echo "success";
	@mysql_close($link);
	return;
} else {
	echo "save_failed";
	@mysql_close($link);
	return;
}

?>