<?php

namespace Tests\Feature;

use Tests\TestCase;

class FileModelTest extends TestCase
{
    use FinancularTestUtilsTrait;

    /**
     * Setting up the test.
     */
    public function setUp(): void {
        parent::setUp();
        $this->user = $this->createUser();
    }

    /**
     * Testing file creation.
     */
    public function testCreateFile() {
        $this->createFile($this->user);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('files', [
            'user_id' => $this->user->id,
        ]);
    }
}
