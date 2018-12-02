<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ValidFieldValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$value) {
            return;
        }

        /* @var $constraint \App\Validator\ValidField */
        if ($constraint->period == 'past') {
            if (time() > $value) {
                return;
            }
        } else {
            if (time() < $value) {
                return;
            }
        }

        $this->context
            ->buildViolation($constraint->message)
            ->setParameter('{{ time_period }}', $constraint->period)
            ->addViolation();
    }
}
