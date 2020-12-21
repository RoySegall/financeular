<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    $status_options = [
      \App\Models\File::STATUS_NEW,
      \App\Models\File::STATUS_ERRORED,
      \App\Models\File::STATUS_PASSED
    ];

    Schema::create('files', function (Blueprint $table) use($status_options) {
      $table->id();
      $table->string('name');
      $table->string('path');
      $table->integer('user_id');
      $table->enum('status', $status_options)->default(\App\Models\File::STATUS_NEW);
      $table->string('errors')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('files');
  }
}
