<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class PasswordRecovery extends Model
{

    public function __construct(array $attributes = array())
    {
        parent::__construct($attributes);
    }

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
    protected $fillable = ['email', 'code', 'token', 'status', 'created_at'];

    public function delaiDepasse() {
        return $this->getAttribute('created_at') < Carbon::now()->subMinutes(15);
    }
}
