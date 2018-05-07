<?php

namespace App\Common;

class Section
{
    public $data;
    public $title;

    public function __construct() {
        $this->data = array();
    }

    public function addDataElement($title, $prix) {
        $this->data[] = new DataFeatures($title,$prix);

    }

    public function setSectionTitle($title) {
        $this->title = $title;
    }

}