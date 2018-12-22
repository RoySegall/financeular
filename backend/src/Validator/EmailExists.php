<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EmailExists extends Constraint
{
    /**
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'The email "{{ value }}" already exists.';
}
