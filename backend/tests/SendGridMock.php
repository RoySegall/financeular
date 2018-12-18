<?php

namespace App\Tests;

class SendGridMock extends \SendGrid
{
    /**
     * @var \SendGrid\Mail\Mail[]
     */
    protected $mails;

    /**
     * @return \SendGrid\Mail\Mail[]
     */
    public function getMails(): array
    {
        return $this->mails;
    }

    /**
     * {@inheritdoc}
     */
    public function send(\SendGrid\Mail\Mail $email)
    {
        $this->mails[] = $email;
    }
}
