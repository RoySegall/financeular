<?php

namespace App\Entity;

use App\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany as OneToMany;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use \App\Validator\UsernameExists as UsernameExists;
use \App\Validator\EmailExists as EmailExists;

/**
 * User entity.
 *
 * @ApiResource
 * @ORM\Entity
 */
class User extends AbstractEntity implements UserInterface
{

    /**
     * @var int The id of the user.
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer", options={"unsigned":true})
     */
    public $id;

    /**
     * @var string The username.
     *
     * @Assert\NotNull()
     * @ORM\Column(type="string", nullable=false, unique=true)
     * @UsernameExists()
     */
    public $username;

    /**
     * @var string The password.
     *
     * @Assert\NotNull()
     * @ORM\Column(type="string", nullable=false)
     */
    protected $password;

    /**
     * @var string The user roles.
     *
     * @Assert\NotNull()
     */
    public $roles;

    /**
     * @var string The user type.
     *
     * @Assert\NotNull()
     * @ORM\Column(type="string", nullable=false)
     * @Assert\Choice(
     *     choices = {"app", "user"},
     *     message = "The allowed values are 'app' or 'user'"
     * )
     */
    public $type;

    /**
     * @var string The user's email.
     *
     * @Assert\NotNull()
     * @ORM\Column(type="string", nullable=false, unique=true)
     * @Assert\Email()
     * @EmailExists
     */
    public $email;

    /**
     * @var boolean When the record has created.
     *
     * @ORM\Column(type="datetime", nullable=true)
     */
    public $created;

    /**
     * @var boolean When the record has been updated.
     *
     * @ORM\Column(type="datetime", nullable=true)
     */
    public $updated;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\UserDefault", mappedBy="user", cascade={"persist", "remove"})
     */
    private $default;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    protected $status = false;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Setting the password for a user.
     *
     * @param string $password
     *  The new password.
     */
    public function setPassword(string $password = null)
    {
        $this->password = $password;
    }

    /**
     * Get the password of the user.
     *
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt()
    {
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     *
     * @return self
     */
    public function setUsername(string $username = null): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials()
    {
    }

    public function getDefault(): ?UserDefault
    {
        return $this->default;
    }

    public function setDefault(UserDefault $default): self
    {
        $this->default = $default;

        // set the owning side of the relation if necessary
        if ($this !== $default->getUser()) {
            $default->setUser($this);
        }

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     *
     * @return self
     */
    public function setEmail(string $email = null): self
    {
        $this->email = $email;

        return $this;
    }
}
