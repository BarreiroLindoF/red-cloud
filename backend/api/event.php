<?php
class Event
{
    public $id;
	public $uri;
	public $body;
	public $date;
	public $userInfo;
	public $title;
	
	public function __construct($id, $uri, $body, $date, $userInfo, $title) {
        $this->id = $id;
		$this->uri = $uri;
		$this->body = $body;
		$this->date = $date;
		$this->userInfo = $userInfo;
		$this->title = $title;
    }
}
?>
