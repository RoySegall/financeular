<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IncomeModelTest extends TestCase
{
    use FinancularTestUtilsTrait;

    /**
     * @var \App\Models\File
     */
    protected $firstFile;

    /**
     * @var \App\Models\File
     */
    protected $secondFile;

    /**
     * Setting up stuff for the test.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->firstFile = $this->createFile();
        $this->secondFile = $this->createFile();
    }

    /**
     * Creating an income model and check the basic reference.
     */
    public function testCreateIncomeAndTestReferenceFromFile() {
        $income = $this->createIncome($this->firstFile);

        $file_from_income = $income->file()->get()->first();
        $income_from_file = $this->firstFile->incomes()->first();

        $this->assertEquals($file_from_income->id, $this->firstFile->id);
        $this->assertEquals($income_from_file->id, $income->id);
    }
}
