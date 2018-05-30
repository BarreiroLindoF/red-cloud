<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreationCompteMail extends Mailable
{
    use Queueable, SerializesModels;

    public $pseudo = 'Erreur dans le pseudonyme !';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.creation-compte')
            ->from('noreply@redcloud.com', 'RedCloud')
            ->subject('Confirmation de création de compte !');
    }
}
