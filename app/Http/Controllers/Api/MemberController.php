<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function all()
    {
        return MemberResource::collection(Member::all());
    }

    public function index()
    {
        $sortField = request('sort_field', 'joined_at');
        if (!in_array($sortField, ['name', 'email', 'joined_at'])) {
          $sortField = 'joined_at';
        }
        $sortDirection = request('sort_direction', 'asc');
        if (!in_array($sortDirection, ['asc', 'desc'])) {
          $sortDirection = 'asc';
        }
        $members = Member::orderBy($sortField, $sortDirection)->paginate(10);
        return MemberResource::collection($members);
    }

    public function store(StoreMemberRequest $request)
    {
        $data = $request->validated();
        $data['joined_at'] = Carbon::parse($data['joined_at'])->format('Y-m-d');
        $member = Member::create($data);

        return new MemberResource($member);
    }

    public function show(Member $member)
    {
        return new MemberResource($member);
    }

    public function update(Member $member, StoreMemberRequest $request)
    {
        $data = $request->validated();
        $data['joined_at'] = Carbon::parse($data['joined_at'])->format('Y-m-d');
        $member->update($data);

        return new MemberResource($member);
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return response()->noContent();
    }
}
