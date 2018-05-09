<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $pdfPath=' ';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pdfPath)
    {
        $this->pdf = $pdfPath;
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
                'as' => 'test.pdf',
                'mime' => 'application/pdf',
            ]);    }
}
