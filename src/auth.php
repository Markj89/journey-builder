<?php

/**
* Call the Pardot API and POST USER Data
* @param $url The user data
* @param method
* @param string the HTTP method, one of "GET", "POST"
* @param url
*/
class Pardot {
  require_once __DIR__ . './constants.php';
  private static $apiEmail = PARDOT_USER;
  private static $apiPswd = PARDOT_PWD;
  private static $apiUsrKy = PARDOT_USR_KEY;

  function __construct() {}

  function init() {
    // Takes raw data from the request
    $json = file_get_content('php://input');
    echo $json;
  }

  function callPardotAPI($url, $data, $method = 'GET') {
    $url = PARDOT_URL;

    // build out the full url, with the query string attached.
    $queryString = http_build_query($data, null, '&');

    if (strpos($url, '?') !== false) {
      $url = $url . '&' . $queryString;
    } else {
      $url = $url . '?' . $queryString;
    }

    echo $url;
  }
}

$pardot = new Pardot();
if ($pardot) {
  $pardot->init();
}
?>
