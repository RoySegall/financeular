<?php

namespace App\Controller\Employee;

use App\Controller\AbstractTahiniController;
use App\Entity\UserDefault;
use App\Services\TahiniAccessToken;
use App\Services\TahiniDoctrine;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Handle the user default - income and template.
 *
 * @Route("/api/employee")
 */
class Employee extends AbstractTahiniController
{

    /**
     * @Route("", methods={"GET"})
     *
     * @param TahiniDoctrine $tahini_doctrine
     *  Tahini doctrine service.
     * @param Request $request
     *  Request service.
     *
     * @return JsonResponse
     *
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function all(TahiniDoctrine $tahini_doctrine, Request $request)
    {
        $page = $request->get('page', 0);
        $perpage = 25;

        $pages = $tahini_doctrine->getEmployeeRepository()->countPages($perpage);

        if ($page > $pages) {
            return $this->json(['error' => 'The requested page is out of index'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'data' => $tahini_doctrine->getEmployeeRepository()->findBy([], [], $perpage, $page * $perpage),
            'pages' => $pages,
        ]);
    }

    /**
     * @Route("", methods={"POST"})
     *
     * @param Request $request
     *  The request service.
     * @param ManagerRegistry $registry
     *  The registry service.
     * @param TahiniDoctrine $tahini_doctrine
     *  The tahini doctrine service.
     *
     * @return JsonResponse
     */
    public function add(Request $request, ManagerRegistry $registry, TahiniDoctrine $tahini_doctrine)
    {
        if (!$payload = $this->processPayload($request)) {
            return $this->json(['error' => 'The payload is wrong'], Response::HTTP_BAD_REQUEST);
        }

        if (!$title = $payload->get('title')) {
            return $this->json(['error' => 'You need to provide a title']);
        }

        // Check that the employee does not exists.
        if ($tahini_doctrine->getEmployeeRepository()->findBy(['title' => $title])) {
            return $this->json(['message' => 'The company ' . $title . ' already exists'], Response::HTTP_BAD_REQUEST);
        }

        $manager = $registry->getManager();

        $employee = new \App\Entity\Employee();
        $employee->setTitle($title);

        $manager->persist($employee);
        $manager->flush();

        return $this->json($employee);
    }

    /**
     * @Route("/search/{search}", methods={"GET"})
     *
     * @param string $search
     *  The key word for searching.
     * @param TahiniDoctrine $tahini_doctrine
     *  The tahini doctrine service.
     *
     * @return JsonResponse
     */
    public function search($search, TahiniDoctrine $tahini_doctrine)
    {
        if (strlen($search) < 3) {
            return $this->json([
                'error' => 'The search term need to be bigger more than 2 characters'
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json($tahini_doctrine->getEmployeeRepository()->getMatchingEmployees($search));
    }
}
