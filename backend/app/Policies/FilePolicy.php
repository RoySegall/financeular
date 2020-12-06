<?php

namespace App\Policies;

use App\Models\File;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FilePolicy
{
  use HandlesAuthorization;

  /**
   * Determine whether the user can view the model.
   *
   * @param \App\Models\User $user
   * @param \App\Models\File $file
   * @return mixed
   */
  public function view(User $user, $file = null) {
    return $user->id == $file->user_id;
  }

}
