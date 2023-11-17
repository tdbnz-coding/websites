<?php

$dbhost = "sql306.infinityfree.com"
$dbuser = "epiz_33967205"
$dbpass = "4b54EqoaH1F"
$dbname = "epiz_33967205_login_sample_db"

if(!$con mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{

	die("Failed to connect!");
}

