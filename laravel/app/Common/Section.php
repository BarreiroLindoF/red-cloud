<?php

namespace App\Common;


class Section
{
    private $data = array();
    private $title;

    public function addDataElement($title) {
        $this->data[] = new DataTitle($title);
    }

    public function setSectionTitle($title) {
        $this->title = $title;
    }
}