<?php

namespace App\Http\Resources;

use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'player1_id'    => $this->player1_id,
            'player1_score' => $this->player1_score,
            'player2_id'    => $this->player2_id,
            'player2_score' => $this->player2_score,
            'location'      => $this->location,
            'date'          => Carbon::parse($this->date)->format('d F Y'),
        ];
    }
}
