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

    $this->firstFileLimitations = $this->createLimitation($this->secondFile);
    $this->firstFileExpenses = $this->createExpense($this->secondFile);
    $this->firstFileIncomes = $this->createIncome($this->secondFile);
  }

  /**
   * Testing all the files resolvers.
   */
  public function testGetAllFilesResolvers() {
    $this->fail('a');
  }

  /**
   * Testing the resolver for a single file.
   */
  public function testSingleFileResolver() {
    $this->fail('a');
  }

}
