<?php

namespace Tests\Feature;

use App\Models\Expense;

class ExpenseModelTest extends AbstractModelToFileReferenceTest
{

    /**
     * Testing the model expense.
     */
    public function testModelExpense()
    {
        $expense = $this->createExpense($this->firstFile);
        $file_from_expense = $expense->file()->get()->first();
        $expense_from_file = $this->firstFile->expenses()->first();

        $this->assertEquals($file_from_expense->id, $this->firstFile->id);
        $this->assertEquals($expense_from_file->id, $expense->id);
    }

    /**
     * Testing reference from two expenses to two different files.
     */
    public function testExpensesFromTwoFiles() {
        // Create expenses.
        $first_expense = $this->createExpense($this->firstFile);
        $second_expense = $this->createExpense($this->secondFile);

        // Query the expenses by the files.
        $first_expense_query = Expense::where('file_id', $this->firstFile->id)->get()->first();
        $second_expense_query = Expense::where('file_id', $this->secondFile->id)->get()->first();

        // Expenses from fies reference.
        $expense_from_first_file = $this->firstFile->expenses()->first();
        $expense_from_second_file = $this->secondFile->expenses()->first();

        // Validate the correct expenses are pulled from the file.
        $this->assertEquals($first_expense->id, $first_expense_query->id);
        $this->assertNotEquals($first_expense->id, $second_expense_query->id);

        $this->assertEquals($second_expense->id, $second_expense_query->id);
        $this->assertNotEquals($first_expense->id, $second_expense_query->id);

        // Now, check the expenses form files.
        $this->assertNotEquals($expense_from_first_file->id, $expense_from_second_file->id);
        $this->assertEquals($expense_from_first_file->id, $first_expense->id);
        $this->assertEquals($expense_from_second_file->id, $second_expense->id);
    }

}
