<?php

namespace App\Repository;

use App\Entity\Employee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Employee|null find($id, $lockMode = null, $lockVersion = null)
 * @method Employee|null findOneBy(array $criteria, array $orderBy = null)
 * @method Employee[]    findAll()
 * @method Employee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EmployeeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Employee::class);
    }

    /**
     * Get elements by paging.
     *
     * @param $page
     * @param $per_page
     */
    public function paging($page, $per_page)
    {
        return $this
            ->createQueryBuilder('e')
            ->getQuery()
            ->getResult();
    }

    /**
     * Return the amount of pages.
     *
     * @param $per_page
     *  The amount of items per page.
     *
     * @return int
     *
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function countPages($per_page): int
    {
        $elements = $this->createQueryBuilder('e')
            ->select('count(e.id)')
            ->getQuery()
            ->getSingleScalarResult();

        return ceil($elements / $per_page);
    }

    /**
     * Get all the employees which matching the given search term.
     *
     * @param $search
     *  The matching terms.
     *
     * @return mixed
     */
    public function getMatchingEmployees($search)
    {
        return $this->createQueryBuilder('e')
            ->where('e.title LIKE :title')
            ->setParameter('title', '%' . $search . '%')
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return Employee[] Returns an array of Employee objects
    //     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Employee
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
