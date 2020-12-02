<?php

namespace Tests\Feature\Models;

use App\Models\File;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class FileModelTest extends TestCase
{
    use FinancularTestUtilsTrait;

    /**
     * @var \App\Models\File
     */
    protected $file;

    /**
     * @var \App\Models\User
     */
    protected $user;

    /**
     * Setting up the test.
     */
    public function setUp(): void {
        parent::setUp();

        $this->user = $this->createUser();
        $this->file = $this->createFile($this->user);
    }

    /**
     * Testing file creation.
     */
    public function testCreateFile() {
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('files', [
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Testing references.
     */
    public function testFileReferences() {
        $this->assertDatabaseCount('files', 1);

        $this->assertEquals($this->file->user()->first()->id, $this->user->id);

        // Create another file and check the has multiple references.
        $second_file = $this->createFile($this->user);

        // Validate the amount of files.
        $this->assertDatabaseCount('files', 2);

        // Check the reference form the user to the files.
        $files = $this->user->files()->get()->all();

        $this->assertCount(2, $files);
        $files_ids = [$files[0]->id, $files[1]->id];

        $this->assertTrue(in_array($second_file->id, $files_ids));
        $this->assertTrue(in_array($this->file->id, $files_ids));
    }

    /**
     * Testing the reference of the files from two users.
     */
    public function testReferenceForTwoUsers() {
        $second_user = $this->createUser();
        $second_file = $this->createFile($second_user);

        $first_user_files_query = File::where('user_id', $this->user->id)->get()->first();
        $second_user_files_query = File::where('user_id', $second_user->id)->get()->first();

        // Load the files from the users.
        $first_user_files = $this->user->files()->first();
        $second_user_files = $second_user->files()->first();

        // First, check that the reference from the user returns the correct
        // files.
        $this->assertNotEquals($first_user_files->first()->id, $second_user_files->id);

        // Second, check the the query does not returned the same file.
        $this->assertNotEquals($first_user_files_query->id, $second_user_files_query->id);

        // Third, check the file object are different.
        $this->assertNotEquals($second_file->id, $this->file->id);

        // Last, check the reference are correct from the user and from the
        // query.
        $this->assertEquals($this->user->files()->first()->id, $first_user_files_query->id);
        $this->assertEquals($second_user->files()->first()->id, $second_user_files_query->id);
        $this->assertEquals($this->file->id, $first_user_files_query->id);
        $this->assertEquals($second_file->id, $second_user_files_query->id);
    }
}
