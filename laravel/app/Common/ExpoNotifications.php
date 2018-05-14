<?php

namespace App\Common;

use phpDocumentor\Reflection\Types\Integer;
use GuzzleHttp\Client;

class ExpoNotifications
{
    const urlToExpoServer = 'https://exp.host/--/api/v2/push/send';

    private $to;
    private $title;
    private $body;
    private $sound;
    private $badge;

    public function __construct(Array $to, String $title, String $body, Integer $badge = null, String $sound = 'default')
    {
        $this->to = $to;
        $this->title = $title;
        $this->body = $body;
        $this->badge = ($badge == null ? 1 : $badge);
        $this->sound = $sound;
    }

    public function send() {
        $client = new Client();
        $payload = array();
        foreach($this->to as $expoToken) {
            $payload[] = [
                'to' => $expoToken,
                'title' => $this->title,
                'body' => $this->body,
                'badge' => $this->badge,
                'sound' => $this->sound
            ];
        }
        $response = $client->post($this::urlToExpoServer, [
            'json' => $payload,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept-Encoding' => 'gzip, deflate',
                'Accept' => 'application/json',
            ]
        ]);
        return $response->getStatusCode();
    }
}