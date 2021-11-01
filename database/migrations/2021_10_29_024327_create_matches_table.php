<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matchups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player1_id')->constrained('members')->onDelete('cascade');
            $table->integer('player1_score');
            $table->foreignId('player2_id')->constrained('members')->onDelete('cascade');
            $table->integer('player2_score');
            $table->string('location');
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches');
    }
}
