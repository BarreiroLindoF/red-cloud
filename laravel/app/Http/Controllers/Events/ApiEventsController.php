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
            $date = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $event->getAttribute('dateHeureDebut'))->format('d-m-Y');
            $event->setAttribute('dateHeureDebut', $date);
            $event->setAttribute('msg_partage', $event->msg_partage_event_part1 . $event->getAttribute('titre') . $event->msg_partage_event_part2 );
        }

        return response()->json(new JsonResponse(true, $events , null));
    }

}
