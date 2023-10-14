<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function upload(Request $request): string
    {
        $file = $request->file('file');
        $databaseName = 'sqlite_' . time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('databases', $databaseName);
//        return $databaseName;
        return $path;
    }
}
