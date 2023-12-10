<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FileController extends Controller
{
    public function upload(Request $request): string
    {
        $file = $request->file('file');
        $databaseName = 'sqlite_' . time() . '_' . $file->getClientOriginalName();
        $file->storeAs('databases', $databaseName);
        return $databaseName;
    }

    public function download(Request $request): StreamedResponse
    {
        $filename = $request->query('connectionName');
        return Storage::download('databases/' . $filename);
    }
}
