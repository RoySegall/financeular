<?php

namespace App\Validator;

use App\Entity\Employee;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class WorkingPlaceReferenceValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$value) {
            return;
        }

        if ($value instanceof Employee) {
            return;
        }

        $this->context->buildViolation($constraint->message)->addViolation();
    }
}
