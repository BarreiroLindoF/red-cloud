<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AnnulationInscriptionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $tournoi = 'Erreur !';

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
        return $this->view('mail.annulation-inscription')
            ->from('noreply@redcloud.com', 'RedCloud')
            ->subject('Annulation d\'inscription');
    }
}
