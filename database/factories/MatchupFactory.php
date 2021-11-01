<?php

namespace Database\Factories;

use App\Models\Matchup;
use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

class MatchupFactory extends Factory
{
    protected $model = Matchup::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'player1_id' => Member::all('id')->random(),
            'player1_score' => $this->faker->numberBetween(0,150),
            'player2_id' => Member::all('id')->random(),
            'player2_score' => $this->faker->numberBetween(0,150),
            'location' => $this->faker->city(),
            'date' => $this->faker->dateTimeBetween('-1 year'),
        ];
    }
}
