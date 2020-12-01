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
      ]
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

    $this->graphQL($query)->assertJson([
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

}
