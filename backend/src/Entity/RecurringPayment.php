<?php

namespace App\Entity;

use App\Validator\ValidField;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecurringPaymentRepository")
 */
class RecurringPayment extends AbstractEntity
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="\App\Entity\User", inversedBy="recurringPayments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $title;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     * @Assert\Type("float")
     */
    private $value;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     * @Assert\Type("int")
     */
    private $amount_of_recurring;

    /**
     * @ORM\Column(type="integer")
     * @ValidField(period="past")
     * @Assert\NotBlank()
     */
    private $valid_from;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @ValidField(period="future")
     */
    private $valid_until;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     *
     * @return RecurringPayment
     */
    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getValue(): float
    {
        return $this->value;
    }

    public function setValue($value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getAmountOfRecurring(): int
    {
        return $this->amount_of_recurring;
    }

    public function setAmountOfRecurring($amount_of_recurring): self
    {
        $this->amount_of_recurring = $amount_of_recurring;

        return $this;
    }

    public function getValidFrom(): ?int
    {
        return $this->valid_from;
    }

    public function setValidFrom($valid_from): self
    {
        $this->valid_from = $valid_from;

        return $this;
    }

    public function getValidUntil(): ?int
    {
        return $this->valid_until;
    }

    public function setValidUntil($valid_until): self
    {
        $this->valid_until = $valid_until;

        return $this;
    }
}
