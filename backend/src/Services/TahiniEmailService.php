<?php

namespace App\Services;

use App\Entity\AccessToken;
use App\Entity\User;
use App\Repository\AccessTokenRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

/**
 * Tahini email service.
 *
 * @package App\Services
 */
class TahiniEmailService
{

    /**
     * @var \SendGrid\Mail\Mail
     */
    protected $sendGridMail;

    /**
     * @var \SendGrid
     */
    protected $sendGrid;

    /**
     * @var array
     */
    protected $contents = [];

    /**
     * TahiniEmailService constructor.
     * @throws \SendGrid\Mail\TypeException
     */
    public function __construct()
    {
        $this->sendGridMail = new \SendGrid\Mail\Mail();
        $this->sendGridMail->setFrom(getenv('EMAIL_FROM_MAIL'), getenv('EMAIL_FROM_NAME'));
        $this->sendGrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
    }

    /**
     * @return \SendGrid\Mail\Mail
     */
    public function getSendGridMail(): \SendGrid\Mail\Mail
    {
        return $this->sendGridMail;
    }

    /**
     * Get the sendgrid object.
     *
     * @param \SendGrid\Mail\Mail $sendGridMail
     *  The sendgrid object.
     *
     * @return self
     */
    public function setSendGridMail(\SendGrid\Mail\Mail $sendGridMail): self
    {
        $this->sendGridMail = $sendGridMail;

        return $this;
    }

    /**
     * Get the sendgrid object.
     *
     * @return \SendGrid
     */
    public function getSendGrid(): \SendGrid
    {
        return $this->sendGrid;
    }

    /**
     * Set the sendgrid object.
     *
     * @param \SendGrid $sendGrid
     *  the sendgrid object.
     *
     * @return self
     */
    public function setSendGrid(\SendGrid $sendGrid): self
    {
        $this->sendGrid = $sendGrid;

        return $this;
    }

    /**
     * Get the contents.
     *
     * @return array
     */
    public function getContents(): array
    {
        return $this->contents;
    }

    /**
     * Set the contents.
     *
     * @param array $contents
     *  The content of the email.
     *
     * @return self
     */
    public function setContents(array $contents): self
    {
        $this->contents = $contents;

        return $this;
    }

    /**
     * Adding receiver.
     *
     * @param $email
     *  The email address.
     * @param string $name
     *  The name of the receiver. optional.
     *
     * @return TahiniEmailService
     */
    public function addTo($email, $name = ''): self
    {
        $this->sendGridMail->addTo($email, $name);

        return $this;
    }

    /**
     * Adding content to the mail.
     *
     * @param $content
     *  The content.
     *
     * @return TahiniEmailService
     */
    public function addContent($content): self
    {
        $this->contents[] = $content;

        return $this;
    }

    /**
     * Set the subject.
     *
     * @param string $subject
     *  The object.
     *
     * @return TahiniEmailService
     */
    public function setSubject(string $subject): self
    {
        $this->sendGridMail->setSubject($subject);

        return $this;
    }

    /**
     * @return bool|\SendGrid\Response
     */
    public function send()
    {
        $this
            ->sendGridMail
            ->addContent('text/html', implode("<br />\n", $this->contents));

        return $this->sendGrid->send($this->sendGridMail);
    }
}
