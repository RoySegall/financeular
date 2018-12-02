<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ValidField extends Constraint
{

    /**
     * @var string
     */
    public $period;

    /**
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'The value cannot be in the {{ time_period }}.';
}
