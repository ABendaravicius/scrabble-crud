<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMatchupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'player1_id'    => 'required',
            'player1_score' => 'required',
            'player2_id'    => 'required',
            'player2_score' => 'required',
            'location'      => 'required',
            'date'          => 'required'
        ];
    }
}
