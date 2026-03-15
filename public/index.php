<?php

define('LARAVEL_BASE', __DIR__ . '/../repositories/new-portfolio');

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = LARAVEL_BASE.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require LARAVEL_BASE.'/vendor/autoload.php';

/** @var Application $app */
$app = require_once LARAVEL_BASE.'/bootstrap/app.php';

$app->handleRequest(Request::capture());