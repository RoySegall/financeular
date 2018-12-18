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
        $this->sendGrid = new \SendGrid\Mail\Mail();
        $this->sendGrid->setFrom(getenv('email_from_mail'), getenv('email_from_name'));
    }

    /**
     * @return \SendGrid\Mail\Mail
     */
    public function getSendGrid(): \SendGrid\Mail\Mail
    {
        return $this->sendGrid;
    }

    /**
     * Get the sendgrid object.
     *
     * @param \SendGrid\Mail\Mail $sendGrid
     *  The sendgrid object.
     *
     * @return self
     */
    public function setSendGrid(\SendGrid\Mail\Mail $sendGrid): self
    {
        $this->sendGrid = $sendGrid;

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
        $this->sendGrid->addTo($email, $name);
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
        $this->sendGrid->setSubject($subject);

        return $this;
    }

    /**
     * @return bool|\SendGrid\Response
     */
    public function send()
    {
        $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));

        $this
            ->sendGrid
            ->addContent('text/html', implode("<br />\n", $this->contents));

        return $sendgrid->send($this->sendGrid);
    }
}
