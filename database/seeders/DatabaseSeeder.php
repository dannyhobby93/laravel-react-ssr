<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionServiceProvider;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $commenterRole = Role::create(['name' => RolesEnum::Commenter->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $manageFeaturesPermissions = Permission::create([
            'name' => PermissionsEnum::ManageFeatures->value
        ]);
        $manageCommentsPermissions = Permission::create([
            'name' => PermissionsEnum::ManageComments->value
        ]);
        $manageUsersPermissions = Permission::create([
            'name' => PermissionsEnum::ManageUsers->value
        ]);
        $upvoteDownvotePermissions = Permission::create([
            'name' => PermissionsEnum::UpvoteDownvote->value
        ]);

        $userRole->syncPermissions([$upvoteDownvotePermissions]);
        $commenterRole->syncPermissions([
            $upvoteDownvotePermissions,
            $manageCommentsPermissions
        ]);
        $adminRole->syncPermissions([
            $upvoteDownvotePermissions,
            $manageCommentsPermissions,
            $manageUsersPermissions,
            $manageFeaturesPermissions
        ]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);


        User::factory()->create([
            'name' => 'Comment User',
            'email' => 'comment@example.com',
        ])->assignRole(RolesEnum::Commenter);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);

    }
}
