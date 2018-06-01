<?php

namespace App\Mail;

use App\Entreprise;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $code = 'Error code!';
    public $pseudo = 'Erreur dans le pseudonyme !';
    public $adresse = 'adresse !';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$entreprise = Entreprise::find(1);
        //$this->adresse = $entreprise->adresse;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.password-recovery')
            ->from('noreply@redcloud.com', 'RedCloud')
            ->subject('Récuperation de mot de passe');
    }
}
