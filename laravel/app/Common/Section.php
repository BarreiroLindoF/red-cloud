<?php

namespace App\Common;

class Section
{
    public $data;
    public $title;

    public function __construct() {
        $this->data = array();
    }

    public function addDataElement($title) {
        $this->data[] = new DataTitle($title);

    }

    public function setSectionTitle($title) {
        $this->title = $title;
    }
}