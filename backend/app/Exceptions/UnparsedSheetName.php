<?php

namespace App\Exceptions;

class UnparsedSheetName extends \Exception
{

    /**
     * Raising a proper message for an in valid sheet name.
     *
     * @param $sheet_name
     *  The sheet name.
     *
     * @throws UnparsedSheetName
     */
    public static function raiseFromSheetName($sheet_name)
    {
        throw new self("Cannot convert the sheet name {$sheet_name} to a valid key.");
    }
}
