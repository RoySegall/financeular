<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class CheckTypeIfNotNullValidator extends \Symfony\Component\Validator\Constraints\TypeValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$value) {
            return;
        }

        parent::validate($value, $constraint);
    }
}
