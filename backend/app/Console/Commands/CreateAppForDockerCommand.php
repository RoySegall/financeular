<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\Client;
use Laravel\Passport\PersonalAccessClient;

class CreateAppForDockerCommand extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'financeular:create-app {--client_id=} {--client_secret=}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Creating an app. Used for services deployment.';

  /**
   * Execute the console command.
   */
  public function handle() {
    try {
      Validator::make($this->options(), ['client_id' => 'required', 'client_secret' => 'required'])
        ->validate();
    } catch (ValidationException $e) {
      $this->error('The client ID or client secret are missing.');
      return;
    }

    // Get the client id and secret as an argument.
    [$id, $secret] = [$this->option('client_id'), $this->option('client_secret')];

    // Check an application with that arguments or if a docker application exists.
    $docker_app_exists = Client::where(['id' => $id])
      ->orWhere(['secret' => $secret])
      ->orWhere(['name' => 'Docker app'])
      ->exists();

    if ($docker_app_exists) {
      $this->error('A docker app already exists');
      return;
    }

    // Create a client and personal access token.
    $client = new Client();
    $client->name = 'Docker app';
    $client->id = $id;
    $client->secret = $secret;
    $client->redirect = 'http://loalhost';
    $client->personal_access_client = true;
    $client->password_client = false;
    $client->revoked = false;
    $client->save();

    $personal = new PersonalAccessClient();
    $personal->client_id = $client->id;
    $personal->save();

    $this->info('The app has been created');
  }
}
