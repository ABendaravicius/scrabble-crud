<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMatchupRequest;
use App\Http\Resources\MatchupResource;
use App\Models\Matchup;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MatchupController extends Controller
{
    public function all()
    {
        return MatchupResource::collection(Matchup::all());
    }

    public function index ()
    {
        $matchups = Matchup::orderBy('date', 'desc')->paginate(10);
        return MatchupResource::collection($matchups);
    }

    public function store(StoreMatchupRequest $request)
    {
        $data = $request->validated();
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $matchup = Matchup::create($data);

        return new MatchupResource($matchup);
    }

    public function matches($id)
    {
        return Matchup::where('player1_id', $id)->orWhere('player2_id', $id)->get();
    }
}
