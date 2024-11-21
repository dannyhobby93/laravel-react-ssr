<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;

Route::redirect('/', '/dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified'])->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('/feature', FeatureController::class);

        Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])
            ->name('upvote.store');

        Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])
            ->name('upvote.destroy');

        Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            ->name('comment.store');

        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->name('comment.destroy');
    });
});

require __DIR__ . '/auth.php';
