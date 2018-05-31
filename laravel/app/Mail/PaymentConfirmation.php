<?php

namespace App\Mail;

use App\Entreprise;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $pdfPath=' ';
    public $adresse = 'Erreur dans l\'adresse !';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct() {
        $entreprise = Entreprise::find(1);
        $this->adresse = $entreprise->adresse;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.payment-confirmation')
            ->from('noreply@redcloud.com', 'RedCloud')
            ->subject('Confirmation de paiement')
            ->attach($this->pdfPath, [
                'as' => 'Votre_confirmation.pdf',
                'mime' => 'application/pdf',
            ]);
    }

    public function setPath($path){
        $this->pdfPath = $path;
    }
}
