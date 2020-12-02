<?php

namespace App\Exceptions;

class UnparsedFileType extends \Exception
{

    /**
     * Raising an error regrading the file type.
     *
     * @param $file_type
     *  The file type.
     *
     * @throws UnparsedFileType
     */
    public static function raiseFromFileType($file_type)
    {
        throw new self("The file type, {$file_type}, is not supported");
    }
}
