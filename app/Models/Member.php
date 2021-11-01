<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'joined_at',
    ];

    use HasFactory;

    public function matched1()
    {
        return $this->hasMany(Matchup::class, 'player1_id');
    }

    public function matched2()
    {
        return $this->hasMany(Matchup::class, 'player2_id');
    }

    public function matches()
    {
        return $this->matched1()->union($this->matched2());
    }
}
