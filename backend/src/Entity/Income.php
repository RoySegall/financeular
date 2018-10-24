<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use \App\Entity\User;
use \App\Entity\Employee;

/**
 * @ORM\Entity(repositoryClass="App\Repository\IncomeRepository")
 */
class Income
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="\App\Entity\User", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="float")
     */
    private $value;

    /**
     * @ORM\OneToOne(targetEntity="\App\Entity\Employee", inversedBy="incomes", cascade={"persist", "remove"})
     */
    private $work_place;

    /**
     * @ORM\Column(type="boolean")
     */
    private $current;

    /**
     * @ORM\Column(type="integer")
     */
    private $starting_date;

    /**
     * @ORM\Column(type="integer")
     */
    private $ending_date;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(float $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getWorkPlace(): ?Employee
    {
        return $this->work_place;
    }

    public function setWorkPlace(?Employee $work_place): self
    {
        $this->work_place = $work_place;

        return $this;
    }

    public function getCurrent(): ?bool
    {
        return $this->current;
    }

    public function setCurrent(bool $current): self
    {
        $this->current = $current;

        return $this;
    }

    public function getStartingDate(): ?int
    {
        return $this->starting_date;
    }

    public function setStartingDate(int $starting_date): self
    {
        $this->starting_date = $starting_date;

        return $this;
    }

    public function getEndingDate(): ?int
    {
        return $this->ending_date;
    }

    public function setEndingDate(int $ending_date): self
    {
        $this->ending_date = $ending_date;

        return $this;
    }
}
