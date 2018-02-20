<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom', 'prenom', 'pseudo', 'ville', 'npa', 'datenaissance', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function setNomAttribute($value) {
        $this->setAttribute('nom', $value);
    }

    public function getNomAttribute($value) {
        return $value;
    }

    public function setPrenomAttribute($value) {
        $this->setAttribute('prenom', $value);
    }

    public function getPrenomAttribute($value) {
        return $value;
    }

    public function setPseudoAttribute($value) {
        $this->setAttribute('pseudo', $value);
    }

    public function getPseudoAttribute($value) {
        return $value;
    }

    public function setVilleAttribute($value) {
        $this->setAttribute('ville', $value);
    }

    public function getVilleAttribute($value) {
        return $value;
    }

    public function setNpaAttribute($value) {
        $this->setAttribute('npa', $value);
    }

    public function getNpaAttribute($value) {
        return $value;
    }

    public function setDatenaissanceAttribute($value) {
        $this->setAttribute('datenaissance', $value);
    }

    public function getDatenaissanceAttribute($value) {
        return $value;
    }

    public function setEmailAttribute($value) {
        $this->setAttribute('email', $value);
    }

    public function getEmailAttribute($value) {
        return $value;
    }

    public function setPasswordAttribute($value) {
        $this->setAttribute('password', bcrypt($value));
    }

    public function getPasswordAttribute($value) {
        return $value;
    }
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'id' => $this->id,
             ]
        ];
    }
}
