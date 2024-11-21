<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'comment' => 'required'
        ]);

        $data['feature_id'] = $feature->id;
        $data['user_id'] = auth()->id();

        Comment::create($data);

        return to_route('feature.show', $feature);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return to_route('feature.show', $comment->feature_id);
    }
}
