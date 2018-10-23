<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use \App\Entity\User;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserDefaultRepository")
 */
class UserDefault
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="\App\Entity\User", inversedBy="income", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user_id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $income;

    /**
     * @ORM\Column(type="object", nullable=true)
     */
    private $template;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getIncome(): ?int
    {
        return $this->income;
    }

    public function setIncome(?int $income): self
    {
        $this->income = $income;

        return $this;
    }

    public function getTemplate()
    {
        return $this->template;
    }

    public function setTemplate($template): self
    {
        $this->template = $template;

        return $this;
    }
}