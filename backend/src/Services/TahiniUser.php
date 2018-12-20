<?php

namespace App\Services;

use ApiPlatform\Core\Validator\Exception\ValidationException;
use App\Entity\User;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\ConstraintViolationList;

/**
 * Tahini user service.
 *
 * The service manage all the user actions - creating, updating password.
 *
 * @package App\Services
 */
class TahiniUser
{

    /**
     * @var TahiniDoctrine
     */
    protected $doctrine;

    /**
     * @var UserPasswordEncoderInterface
     */
    protected $encoder;

    /**
     * @var TahiniValidator
     */
    protected $tahiniValidator;

    /**
     * @var \Doctrine\Common\Persistence\ObjectManager|object
     */
    protected $doctrineManager;

    /**
     * @var TahiniEmailService
     */
    protected $tahiniEmailService;

    /**
     * TahiniUser constructor.
     *
     * @param TahiniDoctrine $tahini_doctrine
     *  The tahini doctrine service.
     * @param UserPasswordEncoderInterface $encoder
     *  The password encoder.
     * @param TahiniValidator $tahini_validator
     *  The tahini validator service.
     * @param ManagerRegistry $registry
     *  The registry manager.
     * @param TahiniEmailService $tahini_email_service
     *  Tahini email service.
     */
    public function __construct(
        TahiniDoctrine $tahini_doctrine,
        UserPasswordEncoderInterface $encoder,
        TahiniValidator $tahini_validator,
        ManagerRegistry $registry,
        TahiniEmailService $tahini_email_service
    ) {
        $this->doctrine = $tahini_doctrine;
        $this->encoder = $encoder;
        $this->tahiniValidator = $tahini_validator;
        $this->doctrineManager = $registry->getManager();
        $this->tahiniEmailService = $tahini_email_service;
    }

    /**
     * Create a hashed password.
     *
     * @param $password
     *  The text to hash.
     *
     * @return string
     */
    public function hashPassword(string $password): string
    {
        return $this->encoder->encodePassword(new User(), $password);
    }

    /**
     * Finding the user which the match the username and password.
     *
     * @param string $username
     *  The username.
     * @param string $password
     *  The password, un-hashed.
     * @param string $email
     *  The email of the user.
     *
     * @return User|null
     *  The user object.
     */
    public function findUserByUsername(string $username, string $password = null)
    {
        $attributes = ['username' => $username,];

        if ($password) {
            $attributes['password'] = $this->hashPassword($password);
        }

        if ($results = $this->doctrine->getUserRepository()->findBy($attributes)) {
            return reset($results);
        }

        return null;
    }

    /**
     * Get user by mail.
     *
     * @param string $email
     *  The email address.
     *
     * @return array
     */
    public function findUserByMail(string $email)
    {
        $users = $this->doctrine->getUserRepository()->findBy(['email' => $email]);

        if ($user = reset($users)) {
            return $user;
        }

        return null;
    }

    /**
     * Creating the user.
     *
     * @param User $user
     *  The user object.
     * @param bool $send_email
     *  Determine if we need to send email or not.
     *
     * @return User|array
     *  The new user object.
     *
     * @throws \Exception
     */
    public function createUser(User $user, bool $send_email = false)
    {

        if ($errors = $this->tahiniValidator->validate($user, true)) {
            throw $errors;
        }

        // Check the username not exists in the system.
        if ($this->findUserByUsername($user->username)) {
            throw new \Exception('The username already exists');
        }

        // Check the email does not exists.
        if ($this->findUserByMail($user->email)) {
            throw new \Exception('The email already exists');
        }

        $user->setPassword($this->hashPassword($user->getPassword()));

        $this->doctrineManager->persist($user);
        $this->doctrineManager->flush();

        if ($send_email) {
            $this->sendUserEmail($user);
        }

        return $user;
    }

    /**
     * Send to the user a verification email.
     *
     * @param User $user
     *  The user object.
     */
    public function sendUserEmail(User $user)
    {
        // todo: if not 200. log it.
        $this
            ->tahiniEmailService
            ->setSubject("Welcome! one last step")
            ->addTo($user->getEmail())
            ->addContent("Hello " . $user->getUsername())
            ->addContent("You need to do one last thing before you are a valid user.")
            ->addContent("Please approve your account by clicking <a href='http://foo.com'>here</a>")
            ->send();
    }

    /**
     * Updating the user.
     *
     * @param User $user
     *  The user object.
     *
     * @return User $user
     *  The new user object.
     */
    public function updateUser(User $user): User
    {
        $this->doctrineManager->persist($user);
        $this->doctrineManager->flush();

        return $user;
    }

    /**
     * Delete the user.
     *
     * @param User $user
     *  The user object.
     */
    public function deleteUser(User $user)
    {
        $this->doctrineManager->remove($user);
        $this->doctrineManager->flush();
    }
}
