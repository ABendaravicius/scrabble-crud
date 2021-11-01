<?php

namespace Database\Seeders;

use App\Models\Matchup;
use Illuminate\Database\Seeder;

class MatchupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Matchup::factory()->count(115)->create();
    }
}
