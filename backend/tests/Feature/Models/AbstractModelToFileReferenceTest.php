<?php

namespace Tests\Feature\Models;

use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

/**
 * Base class for all the tests for models which reference for a file.
 *
 * @package Tests\Feature
 */
abstract class AbstractModelToFileReferenceTest extends TestCase
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
}
