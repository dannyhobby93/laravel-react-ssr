<?php

use Inertia\Inertia;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Verified Users
    Route::middleware(['verified'])->group(function () {
        // Dashboard
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        // Feature
        Route::resource('/feature', FeatureController::class)
            ->except('index', 'show')
            ->middleware('can:' . PermissionsEnum::ManageFeatures->value);
        Route::resource('/feature', FeatureController::class)
            ->only('index', 'show');

        // Upvote
        Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])
            ->name('upvote.store');
        Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])
            ->name('upvote.destroy');

        // Comments
        Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            ->name('comment.store')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);
        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->name('comment.destroy')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);

        Route::middleware(['role:' . RolesEnum::Admin->value])
            ->group(function () {
                Route::get('/users', [UserController::class, 'index'])
                    ->name('user.index');
                Route::get('/users/{user}/edit', [UserController::class, 'edit'])
                    ->name('user.edit');
                Route::put('/users/{user}/edit', [UserController::class, 'update'])
                    ->name('user.update');
            });
    });
});

require __DIR__ . '/auth.php';
