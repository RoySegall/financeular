<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 */
class UserRepository extends ServiceEntityRepository
{

    /**
     * {@inheritdoc}
     */
    public function __construct(RegistryInterface $registry)
    {
        $registry->resetManager();
        parent::__construct($registry, \App\Entity\User::class);
    }
}
