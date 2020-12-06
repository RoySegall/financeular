<?php

namespace Tests\Feature\Client;

use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class FileResolverTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * @var \App\Models\File
   */
  protected $firstFile;

  /**
   * @var \App\Models\File
   */
  protected $secondFile;

  /**
   * @var \App\Models\Limitation
   */
  protected $firstFileLimitations;

  /**
   * @var \App\Models\Expense
   */
  protected $firstFileExpenses;

  /**
   * @var \App\Models\Income
   */
  protected $firstFileIncomes;

  /**
   * @var \App\Models\Limitation
   */
  protected $secondFileLimitations;

  /**
   * @var \App\Models\Expense
   */
  protected $secondFileExpenses;

  /**
   * @var \App\Models\Income
   */
  protected $secondFileIncomes;

  /**
   * @var \App\Models\User
   */
  protected $user;

  /**
   * Setting the class and the assets.
   */
  protected function setUp(): void {
    parent::setUp();

    $this->user = $this->createUser();
    $this->firstFile = $this->createFile($this->user);
    $this->secondFile = $this->createFile($this->user);

    $this->firstFileLimitations = $this->createLimitation($this->firstFile);
    $this->firstFileExpenses = $this->createExpense($this->firstFile);
    $this->firstFileIncomes = $this->createIncome($this->firstFile);

    $this->secondFileLimitations = $this->createLimitation($this->secondFile);
    $this->secondFileExpenses = $this->createExpense($this->secondFile);
    $this->secondFileIncomes = $this->createIncome($this->secondFile);
  }

  /**
   * Testing all the files resolvers.
   */
  public function testGetAllFilesResolvers() {
    $query = " {
      me {
        files {
            name
            path
            limitations { id month year value_per_week description time_per_month title }
            expenses { id month year title value date }
            incomes { id month year title value }
          }
      }
    }";

    $this->graphQueryWithToken($query, $this->createAccessToken($this->user)->accessToken)->assertJson([
      'data' => [
        'me' => [
          'files' => [
            0 => [
              'name' => $this->firstFile->name,
              'path' => $this->firstFile->path,
              'limitations' => [
                0 => [
                  'id' => (string) $this->firstFileLimitations->id,
                  'month' => $this->firstFileLimitations->month,
                  'year' => $this->firstFileLimitations->year,
                  'value_per_week' => $this->firstFileLimitations->value_per_week,
                  'description' => $this->firstFileLimitations->description,
                  'time_per_month' => $this->firstFileLimitations->time_per_month,
                  'title' => $this->firstFileLimitations->title,
                ],
              ],
              'expenses' => [
                0 => [
                  'id' => (string) $this->firstFileExpenses->id,
                  'month' => $this->firstFileExpenses->month,
                  'year' => $this->firstFileExpenses->year,
                  'title' => $this->firstFileExpenses->title,
                  'value' => $this->firstFileExpenses->value,
                  'date' => $this->firstFileExpenses->date,
                ],
              ],
              'incomes' => [
                0 => [
                  'id' => (string) $this->firstFileIncomes->id,
                  'month' => $this->firstFileIncomes->month,
                  'year' => $this->firstFileIncomes->year,
                  'title' => $this->firstFileIncomes->title,
                  'value' => $this->firstFileIncomes->value,
                ],
              ],
            ],
            1 => [
              'name' => $this->secondFile->name,
              'path' => $this->secondFile->path,
              'limitations' => [
                0 => [
                  'id' => (string) $this->secondFileLimitations->id,
                  'month' => $this->secondFileLimitations->month,
                  'year' => $this->secondFileLimitations->year,
                  'value_per_week' => $this->secondFileLimitations->value_per_week,
                  'description' => $this->secondFileLimitations->description,
                  'time_per_month' => $this->secondFileLimitations->time_per_month,
                  'title' => $this->secondFileLimitations->title,
                ],
              ],
              'expenses' => [
                0 => [
                  'id' => (string) $this->secondFileExpenses->id,
                  'month' => $this->secondFileExpenses->month,
                  'year' => $this->secondFileExpenses->year,
                  'title' => $this->secondFileExpenses->title,
                  'value' => $this->secondFileExpenses->value,
                  'date' => $this->secondFileExpenses->date,
                ],
              ],
              'incomes' => [
                0 => [
                  'id' => (string) $this->secondFileIncomes->id,
                  'month' => $this->secondFileIncomes->month,
                  'year' => $this->secondFileIncomes->year,
                  'title' => $this->secondFileIncomes->title,
                  'value' => $this->secondFileIncomes->value,
                ],
              ],
            ],
          ],
        ],
      ],
    ]);
  }

  /**
   * Testing the resolver for a single file.
   */
  public function testSingleFileResolver() {

    $query = " {
      file(id: {$this->firstFile->id}) {
          name
          path
          limitations { id  }
          expenses { id }
          incomes { id }
      }
    }";

    $this->graphQueryWithToken($query, $this->createAccessToken($this->user)->accessToken)->assertJson([
      'data' => [
        'file' => [
          'name' => $this->firstFile->name,
          'path' => $this->firstFile->path,
          'limitations' => [
            0 => ['id' => $this->firstFileLimitations->id],
          ],
          'expenses' => [
            0 => ['id' => $this->firstFileExpenses->id],
          ],
          'incomes' => [
            0 => ['id' => $this->firstFileIncomes->id],
          ],
        ]
      ],
    ]);
  }

  /**
   * Testing the access of a user to a file which belong to another user.
   */
  public function testAccessToAnotherUserFile() {
    $second_user = $this->createuser();

    $query = " {
      file(id: {$this->firstFile->id}) {
          name
      }
    }";

    $errors = $this
      ->graphQueryWithToken($query, $this->createAccessToken($second_user)->accessToken)->json('errors');

    $this->assertEquals($errors[0]['message'], 'You are not authorized to access file');
  }

}
