<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MembersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Member::class, 30)->create();
    }
}
