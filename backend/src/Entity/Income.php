<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use \App\Validator\CheckTypeIfNotNull as CheckTypeIfNotNull;
use \App\Validator\WorkingPlaceReference as WorkingPlaceReference;
use \App\Entity\User;
use \App\Entity\Employee;

/**
 * @ORM\Entity(repositoryClass="App\Repository\IncomeRepository")
 */
class Income extends AbstractEntity
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="\App\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     * @Assert\Type("float")
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity="\App\Entity\Employee", inversedBy="incomes")
     * @WorkingPlaceReference()
     */
    private $work_place;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $current;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     * @Assert\Type("integer")
     */
    private $starting_date;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @CheckTypeIfNotNull("integer")
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

    public function setValue($value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getWorkPlace(): ?Employee
    {
        return $this->work_place;
    }

    public function setWorkPlace($work_place): self
    {
        $this->work_place = $work_place;

        return $this;
    }

    public function getCurrent(): ?bool
    {
        return $this->current;
    }

    public function setCurrent($current): self
    {
        $this->current = $current;

        return $this;
    }

    public function getStartingDate(): ?int
    {
        return $this->starting_date;
    }

    public function setStartingDate($starting_date): self
    {
        $this->starting_date = $starting_date;

        return $this;
    }

    public function getEndingDate(): ?int
    {
        return $this->ending_date;
    }

    public function setEndingDate($ending_date): self
    {
        $this->ending_date = $ending_date;

        return $this;
    }
}
