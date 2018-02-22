<?php

namespace App\Http\Controllers\Events;

use App\Event;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiEventsController extends Controller
{
    public function getEvents(Request $request) {
        $events = Event::all();

        foreach ($events as $event) {
            $event->setAttribute('imageUri', $request->root() . $event->pathToImages . $event->getAttribute('imageUri'));
        }

        return response()->json(new JsonResponse(true, $events , null));
    }

}
