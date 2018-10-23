<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EmployeeRepository")
 */
class Employee
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $logo;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Incomes", mappedBy="work_place", cascade={"persist", "remove"})
     */
    private $incomes;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getIncomes(): ?Incomes
    {
        return $this->incomes;
    }

    public function setIncomes(?Incomes $incomes): self
    {
        $this->incomes = $incomes;

        // set (or unset) the owning side of the relation if necessary
        $newWork_place = $incomes === null ? null : $this;
        if ($newWork_place !== $incomes->getWorkPlace()) {
            $incomes->setWorkPlace($newWork_place);
        }

        return $this;
    }
}
