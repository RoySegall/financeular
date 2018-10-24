<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use \App\Entity\User;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecurringPaymentRepository")
 */
class RecurringPayment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="\App\Entity\User", inversedBy="recurringPayments", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="float")
     */
    private $value;

    /**
     * @ORM\Column(type="integer")
     */
    private $amount_of_recurring;

    /**
     * @ORM\Column(type="integer")
     */
    private $valid_from;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $valid_until;

    public function getId(): ?int {
        return $this->id;
    }

    public function getUser(): ?User {
        return $this->user;
    }

    public function setUser(User $user): self {
        $this->user = $user;

        return $this;
    }

    public function getValue(): ?float {
        return $this->value;
    }

    public function setValue(float $value): self {
        $this->value = $value;

        return $this;
    }

    public function getAmountOfRecurring(): ?int {
        return $this->amount_of_recurring;
    }

    public function setAmountOfRecurring(int $amount_of_recurring): self {
        $this->amount_of_recurring = $amount_of_recurring;

        return $this;
    }

    public function getValidFrom(): ?int {
        return $this->valid_from;
    }

    public function setValidFrom(int $valid_from): self {
        $this->valid_from = $valid_from;

        return $this;
    }

    public function getValidUntil(): ?int {
        return $this->valid_until;
    }

    public function setValidUntil(int $valid_until): self {
        $this->valid_until = $valid_until;

        return $this;
    }
}
