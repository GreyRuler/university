<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TablesController extends Controller
{
    public function tables(Request $request) {
        $connectionName = $request->query('connectionName');
        $connection = DB::connection($connectionName);
        $tables = $connection->select("SELECT name FROM sqlite_master WHERE type='table'");
        return collect($tables)->reduce(function ($carry, $item) use ($connection) {
            $count = $connection->table($item->name)->count();
            $carry[] = [
                'name' => $item->name,
                'count' => $count,
            ];
            return $carry;
        }, []);
    }
}
