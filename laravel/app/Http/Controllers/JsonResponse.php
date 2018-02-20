<?php

namespace App\Http\Controllers;


class JsonResponse
{

    public $success;
    public $payload;
    public $message;

    /**
     * JsonResponse constructor.
     * @param $success
     * @param $payload
     * @param $message
     */
    public function __construct($success, $payload, $message)
    {
        $this->success = $success;
        $this->payload = $payload;
        $this->message = $message;
    }


}