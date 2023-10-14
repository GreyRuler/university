<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConfigConnectionDB
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $connectionName = $request->query('connectionName');
        config(["database.connections.$connectionName" => [
            'driver' => 'sqlite',
            'database' => storage_path("app/databases/$connectionName"),
            'prefix' => '',
        ]]);
        return $next($request);
    }
}
