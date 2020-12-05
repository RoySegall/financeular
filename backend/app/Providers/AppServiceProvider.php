<?php

namespace App\Providers;

use App\Services\ExcelFileProcessorService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
  public function register() {
      $this->app->bind(
          'App\Services\ExcelFileProcessorService',
          function ($app) {
              return new ExcelFileProcessorService();
          }
      );

      $this->app->bind('App\Services\UserService', function ($app) {
          return new UserService();
      });
  }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
  public function boot() {
      //
  }
}
