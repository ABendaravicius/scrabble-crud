<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
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
          'id'          => $this->id,
          'name'        => $this->name,
          'email'       => $this->email,
          'phone'       => $this->phone,
          'joined_at'   => Carbon::parse($this->joined_at)->format('d F Y'),
        ];
    }
}
