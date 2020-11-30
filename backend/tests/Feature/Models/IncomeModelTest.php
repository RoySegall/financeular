<?php

namespace Tests\Feature\Models;

use App\Models\Income;

class IncomeModelTest extends AbstractModelToFileReferenceTest
{
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

    /**
     * Testing reference from two files to two different incomes.
     */
    public function testIncomesFromTwoFiles() {
        // Create incomes.
        $first_income = $this->createIncome($this->firstFile);
        $second_income = $this->createIncome($this->secondFile);

        // Query the incomes by the files.
        $first_income_query = Income::where('file_id', $this->firstFile->id)->get()->first();
        $second_income_query = Income::where('file_id', $this->secondFile->id)->get()->first();

        // incomes from fies reference.
        $incomes_from_first_file = $this->firstFile->incomes()->first();
        $incomes_from_second_file = $this->secondFile->incomes()->first();

        // Validate the correct income are pulled from the file.
        $this->assertEquals($first_income->id, $first_income_query->id);
        $this->assertNotEquals($first_income->id, $second_income_query->id);

        $this->assertEquals($second_income->id, $second_income_query->id);
        $this->assertNotEquals($first_income->id, $second_income_query->id);

        // Now, check the income form files.
        $this->assertNotEquals($incomes_from_first_file->id, $incomes_from_second_file->id);
        $this->assertEquals($incomes_from_first_file->id, $first_income->id);
        $this->assertEquals($incomes_from_second_file->id, $second_income->id);
    }
}
