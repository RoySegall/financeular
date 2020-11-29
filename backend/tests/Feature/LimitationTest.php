<?php

namespace Tests\Feature;

use App\Models\Limitation;
use Tests\TestCase;

/**
 * Testing the limitation model.
 *
 * @package Tests\Feature
 */
class LimitationTest extends TestCase
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
     * Testing the model limitation.
     */
    public function testModelLimitation()
    {
        $limitation = $this->createLimitation($this->firstFile);
        $file_from_limitation = $limitation->file()->get()->first();
        $limitation_from_file = $this->firstFile->limitations()->first();

        $this->assertEquals($file_from_limitation->id, $this->firstFile->id);
        $this->assertEquals($limitation_from_file->id, $limitation->id);
    }

    /**
     * Testing reference from two files to two different limitations.
     */
    public function testLimitationFromTwoFiles() {
        $this->fail();
    }
}
