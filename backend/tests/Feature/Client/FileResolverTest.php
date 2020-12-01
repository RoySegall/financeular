<?php

namespace Tests\Feature\Client;

use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class FileResolverTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  protected $firstFile;
  protected $secondFile;

  protected $firstFileLimitations;
  protected $firstFileExpenses;
  protected $firstFileIncomes;

  protected $secondFileLimitations;
  protected $secondFileExpenses;
  protected $secondFileIncomes;

  /**
   * Setting the class and the assets.
   */
  protected function setUp(): void {
    parent::setUp();

    $this->firstFile = $this->createFile();
    $this->secondFile = $this->createFile();

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
      files {
        data {
          name
          path
          limitations { id month year value_per_week description time_per_month title }
          expenses { id month year title value date }
          incomes { id month year title value }
        }
      }
    }";

    $this->graphQL($query)->assertJson([
      'data' => [
        'files' => [
          'data' => [
            0 => [
              'name' => $this->firstFile->name,
              'path' => $this->firstFile->path,
              'limitations' => [
                0 => [
                  'id' => $this->firstFileLimitations->id,
                  'month' => $this->firstFileLimitations->month,
                  'year' => $this->firstFileLimitations->year,
                  'value_per_week' => $this->firstFileLimitations->value_per_week,
                  'description' => $this->firstFileLimitations->description,
                  'time_per_month' => $this->firstFileLimitations->time_per_month,
                  'title' => $this->firstFileLimitations->title,
                ],
              ],
              'expenses' => [
                0 => ['b' => 'b'],
              ],
              'incomes' => [
                0 => ['b' => 'b'],
              ],
            ],
            1 => [
              'name' => $this->secondFile->name,
              'path' => $this->secondFile->path,
              'limitations' => [
                0 => [
                  'id' => $this->firstFileLimitations->id,
                  'month' => $this->firstFileLimitations->month,
                  'year' => $this->firstFileLimitations->year,
                  'value_per_week' => $this->firstFileLimitations->value_per_week,
                  'description' => $this->firstFileLimitations->description,
                  'time_per_month' => $this->firstFileLimitations->time_per_month,
                  'title' => $this->firstFileLimitations->title,
                ],
              ],
              'expenses' => [
                0 => ['b' => 'b'],
              ],
              'incomes' => [
                0 => ['b' => 'b'],
              ],
            ],
          ],
        ],
      ]
    ]);
  }

//  /**
//   * Testing the resolver for a single file.
//   */
//  public function testSingleFileResolver() {
////    $this->fail('a');
//  }

}
