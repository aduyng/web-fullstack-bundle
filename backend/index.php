<?php
define('DIR_ROOT', dirname(__FILE__) . DIRECTORY_SEPARATOR);

/**
 * database
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'faq');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');


set_include_path(implode(PATH_SEPARATOR, array(get_include_path(), DIR_ROOT, DIR_ROOT . 'libs')));
include_once 'utils.php';
include_once 'Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();

$pkgName = req('package');
$mName = req('method');

//sanitize packageName
if (!empty($pkgName)) {
    $packageName = preg_replace('/[^a-z-]/i', '', $pkgName);
    $packageName = ucfirst(preg_replace('/-([a-z])/e', "strtoupper('$1')", $packageName));
}
//sanitize methodName
if (!empty($mName)) {
    $methodName = preg_replace('/[^a-z-]/i', '', $mName);
    $methodName = preg_replace('/-([a-z])/e', "strtoupper('$1')", $methodName);
    if( !empty($methodName) ){
        $methodName = strtolower($methodName[0]) . substr($methodName, 1);
    }
}
if (empty($packageName) || empty($methodName)) {
    header('HTTP/1.1 400 Bad Request');
    die("Invalid package or method");
}

//initialize database adapter
$dbAdapter = new Zend_Db_Adapter_Pdo_Mysql(
    array(
        'host' => DB_HOST,
        'dbname' => DB_NAME,
        'username' => DB_USER,
        'password' => DB_PASSWORD,
        'charset' => 'utf8'
    )
);

Zend_Db_Table::setDefaultAdapter($dbAdapter);

session_start();
$userId = isset($_SESSION['userId']) ? $_SESSION['userId'] : null;
if (!empty($userId)) {
    $userTable = new Zend_Db_Table('User');
    $currentUser = $userTable->fetchRow(
        $userTable->select()->from($userTable, array('id', 'email', 'fullname', 'isSupporter'))
        ->where('id = ?', $userId)
    );
    if( !empty($currentUser)){
        Zend_Registry::set('currentUser', $currentUser);
    }
}

include_once 'acl.php';
$code = isAllowed($packageName, $methodName);
if ($code != 200) {
    header("HTTP/1.1 $code " . httpStatusCode($code));
    die();
}

//init the handler instance from packageName
$packagePath = implode(DIRECTORY_SEPARATOR, array(DIR_ROOT, 'handlers', $packageName)) . '.php';
if (!file_exists($packagePath)) {
    header('HTTP/1.1 404 Not Found');
    die("$pkgName is not found!");
}

include_once $packagePath;

$handlerClass = new $packageName();
$results = null;

if (!is_callable(array($handlerClass, $methodName))) {
    header('HTTP/1.1 404 Not Found');
    die("$pkgName/$mName is not found!");
}

$code = 200;
//try {
    $code = $handlerClass->{$methodName}($results);
    if( empty($code) ){
        $code = 200;
    }
//} catch (Exception $exception) {
//    $code = 500;
//}

$json = json_encode($results);

//jsonp handling
$callback = req('callback');
if (!empty($callback)) {
    $json = "{$callback}({$json})";
}
header("HTTP/1.1 $code " . httpStatusCode($code));
header('Content-Type: application/json');
header('Content-Length: ' . strlen($json));
die($json);


