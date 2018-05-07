<?php

namespace App\Common;


class DataFeatures
{
    public $title;
    public $prix;

    public function __construct($title, $prix) {
        $this->title = $title;
        $this->prix = $prix;
    }
}