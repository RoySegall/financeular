<?php

namespace App\Services;

/**
 * Tahini doctrine service.
 *
 * Since our entities can be located in different DBs, this service wrap for us
 * the way we get the repository of the entity. For example, each time we need
 * to access the job process repo we need to do something like this:
 *  $doctrine->getRepository(\App\Entity\User::class)
 *
 * What's the problem? in out case we know that the job process is in the
 * default repo but what about other entities? We need to keep in mind that our
 * code need to be context aware. Pretty sucks :\
 *
 * In order to use this service for get the job process we need to do this:
 *  $tahini_doctrine->getUserRepository()
 *
 * That's it! pretty easy, no?
 */
class TahiniDoctrine
{

    protected $doctrine;

    /**
     * TahiniDoctrine constructor.
     *
     * @param \Doctrine\Common\Persistence\ManagerRegistry $doctrine
     *  The doctrine manager.
     */
    public function __construct(\Doctrine\Common\Persistence\ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    /**
     * Get the user repository object.
     *
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getUserRepository(): \Doctrine\Common\Persistence\ObjectRepository
    {
        return $this->doctrine->getRepository(\App\Entity\User::class);
    }

    /**
     * Get the access token repository.
     *
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getAccessTokenRepository(): \Doctrine\Common\Persistence\ObjectRepository
    {
        return $this->doctrine->getRepository(\App\Entity\AccessToken::class);
    }

    /**
     * Get the default expenses repository.
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getDefaultExpensesRepository(): \Doctrine\Common\Persistence\ObjectRepository
    {
        return $this->doctrine->getRepository(\App\Entity\DefaultExpenses::class);
    }

    /**
     * Get the employee repository.
     *
     * @return \App\Repository\EmployeeRepository
     */
    public function getEmployeeRepository(): \App\Repository\EmployeeRepository
    {
        return $this->doctrine->getRepository(\App\Entity\Employee::class);
    }

    /**
     * Get the income repository.
     *
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getIncomeRepository(): \Doctrine\Common\Persistence\ObjectRepository
    {
        return $this->doctrine->getRepository(\App\Entity\Income::class);
    }

    /**
     * Get the recurring payment repository.
     *
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getRecurringPaymentRepository(): \Doctrine\Common\Persistence\ObjectRepository
    {
        return $this->doctrine->getRepository(\App\Entity\RecurringPayment::class);
    }

    /**
     * Get the user default repository.
     *
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getUserDefaultRepository(): \Doctrine\Common\Persistence\ObjectRepository
    {
        return $this->doctrine->getRepository(\App\Entity\UserDefault::class);
    }
}
