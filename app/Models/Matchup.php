<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchup extends Model
{
    protected $fillable = [
      'player1_id',
      'player1_score',
      'player2_id',
      'player2_score',
      'location',
      'date',
    ];

    use HasFactory;

    public function team1()
    {
        return $this->belongsTo(Member::class, 'player1_id');
    }

    public function team2()
    {
        return $this->belongsTo(Member::class, 'player2_id');
    }
}
