<?php

namespace App\Validator;

use App\Services\TahiniUser;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class EmailExistsValidator extends ConstraintValidator
{
    /**
     * @var TahiniUser
     */
    protected $tahiniUser;

    /**
     * EmailExistsValidator constructor.
     *
     * @param TahiniUser $tahini_user
     */
    public function __construct(TahiniUser $tahini_user)
    {
        $this->tahiniUser = $tahini_user;
    }

    public function validate($value, Constraint $constraint)
    {
        if (!$this->tahiniUser->findUserByMail($value)) {
            return;
        }

        /* @var $constraint \App\Validator\EmailExists */
        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ value }}', $value)
            ->addViolation();
    }
}
