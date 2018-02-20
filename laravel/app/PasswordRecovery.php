<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordRecovery extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'password_resets';

    protected $primaryKey = 'email';
    protected $keyType = 'string';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'code', 'token'];

    /**
     * PasswordRecovery constructor.
     * @param string $table
     */
    public function __construct(string $email, string $code, string $token)
    {
        $this->setAttribute('email', $email);
        $this->setAttribute('code', $code);
        $this->setAttribute('token', $token);
    }

    public function setEmailAttribute(string $email) {
        $this->setAttribute('email', $email);
    }

    public function getEmailAttribute() {
        return $this->getAttribute('email');
    }

    public function setCodeAttribute(string $code) {
        $this->setAttribute('code', $code);
    }

    public function getCodeAttribute() {
        return $this->getAttribute('code');
    }

    public function setTokenAttribute(string $token) {
        $this->setAttribute('token', $token);
    }

    public function getTokenAttribute() {
        return $this->getAttribute('token');
    }
}
