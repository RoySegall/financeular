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
        // Create limitations.
        $first_limitation = $this->createLimitation($this->firstFile);
        $second_limitation = $this->createLimitation($this->secondFile);

        // Query the limitations by the files.
        $first_limitation_query = Limitation::where('file_id', $this->firstFile->id)->get()->first();
        $second_limitation_query = Limitation::where('file_id', $this->secondFile->id)->get()->first();

        // Limitations from fies reference.
        $limitations_from_first_file = $this->firstFile->limitations()->first();
        $limitations_from_second_file = $this->secondFile->limitations()->first();

        // Validate the correct limitation are pulled from the file.
        $this->assertEquals($first_limitation->id, $first_limitation_query->id);
        $this->assertNotEquals($first_limitation->id, $second_limitation_query->id);

        $this->assertEquals($second_limitation->id, $second_limitation_query->id);
        $this->assertNotEquals($first_limitation->id, $second_limitation_query->id);

        // Now, check the limitation form files.
        $this->assertNotEquals($limitations_from_first_file->id, $limitations_from_second_file->id);
        $this->assertEquals($limitations_from_first_file->id, $first_limitation->id);
        $this->assertEquals($limitations_from_second_file->id, $second_limitation->id);
    }
}
