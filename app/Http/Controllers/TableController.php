<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): array
    {
        $connectionName = $request->query('connectionName');
        $tableName = $request->query('tableName');
        $connection = DB::connection($connectionName);
        return [
            'columns' => $connection->getSchemaBuilder()->getColumnListing($tableName),
            'data' => $connection->table($tableName)->get(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $connectionName = $request->query('connectionName');
        $tableName = $request->query('tableName');
        $connection = DB::connection($connectionName);

        // Проверка и валидация данных из $request
        $data = $request->except(['tableName', 'connectionName']);

        // Вставка данных в таблицу
        $insertedId = $connection->table($tableName)->insertGetId($data);

        if ($insertedId) {
            $record = $connection->table($tableName)->find($insertedId);
            return response()->json($record, 201);
        } else {
            return response()->json(['message' => 'Ошибка при создании записи'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $connectionName = $request->query('connectionName');
        $tableName = $request->query('tableName');
        $connection = DB::connection($connectionName);

        // Получение записи по ID
        $record = $connection->table($tableName)->find($id);

        if ($record) {
            return response()->json($record);
        } else {
            return response()->json(['message' => 'Запись не найдена'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $connectionName = $request->query('connectionName');
        $tableName = $request->query('tableName');
        $connection = DB::connection($connectionName);

        // Проверка и валидация данных из $request
        $data = $request->except(['tableName', 'connectionName', '_method']);

        // Обновление записи по ID
        $result = $connection->table($tableName)->where('id', $id)->update($data);

        if ($result) {
            $record = $connection->table($tableName)->find($id);
            return response()->json($record);
        } else {
            return response()->json(['message' => 'Ошибка при обновлении записи'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $connectionName = $request->query('connectionName');
        $tableName = $request->query('tableName');
        $connection = DB::connection($connectionName);

        // Удаление записи по ID
        $result = $connection->table($tableName)->where('id', $id)->delete();

        if ($result) {
            return response()->json($id);
        } else {
            return response()->json(['message' => 'Ошибка при удалении записи'], 500);
        }
    }
}
