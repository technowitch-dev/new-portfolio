<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

echo "=== Tables in Database ===\n\n";

// Get all tables
$tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");

foreach ($tables as $table) {
    $tableName = $table->name;
    echo "Table: {$tableName}\n";
    echo str_repeat("-", 50) . "\n";
    
    // Get column information
    $columns = DB::select("PRAGMA table_info({$tableName})");
    
    printf("%-20s %-15s %-10s %s\n", "Column", "Type", "Nullable", "Default");
    echo str_repeat("-", 50) . "\n";
    
    foreach ($columns as $column) {
        $nullable = $column->notnull ? 'NO' : 'YES';
        $default = $column->dflt_value ?? 'NULL';
        printf("%-20s %-15s %-10s %s\n", 
            $column->name, 
            $column->type, 
            $nullable,
            $default
        );
    }
    
    // Get row count
    $count = DB::table($tableName)->count();
    echo "\nRow count: {$count}\n";
    echo "\n" . str_repeat("=", 50) . "\n\n";
}
