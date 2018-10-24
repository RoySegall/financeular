<?php

namespace App\Entity;

use App\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany as OneToMany;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

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
     * @ORM\OneToOne(targetEntity="App\Entity\RecurringPayment", mappedBy="user", cascade={"persist", "remove"})
     */
    private $recurringPayments;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\DefaultExpenses", mappedBy="user", cascade={"persist", "remove"})
     */
    private $defaultExpenses;

    /**
     * Setting the password for a user.
     *
     * @param string $password
     *  The new password.
     */
    public function setPassword(string $password) {
        $this->password = $password;
    }

    /**
     * Get the password of the user.
     *
     * @return string
     */
    public function getPassword(): string {
        return $this->password;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles() {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt() {
    }

    /**
     * {@inheritdoc}
     */
    public function getUsername() {
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials() {
    }

    public function getDefault(): ?UserDefault {
        return $this->default;
    }

    public function setDefault(UserDefault $default): self {
        $this->default = $default;

        // set the owning side of the relation if necessary
        if ($this !== $default->getUser()) {
            $default->setUser($this);
        }

        return $this;
    }

    public function getRecurringPayments(): ?RecurringPayment {
        return $this->recurringPayments;
    }

    public function setRecurringPayments(RecurringPayment $recurringPayments): self {
        $this->recurringPayments = $recurringPayments;

        // set the owning side of the relation if necessary
        if ($this !== $recurringPayments->getUser()) {
            $recurringPayments->setUser($this);
        }

        return $this;
    }

    public function getDefaultExpenses(): ?DefaultExpenses {
        return $this->defaultExpenses;
    }

    public function setDefaultExpenses(DefaultExpenses $defaultExpenses): self {
        $this->defaultExpenses = $defaultExpenses;

        // set the owning side of the relation if necessary
        if ($this !== $defaultExpenses->getUser()) {
            $defaultExpenses->setUser($this);
        }

        return $this;
    }
}
