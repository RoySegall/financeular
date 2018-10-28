<?php

namespace App\Controller\Incomes;

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
 * @Route("/api/incomes")
 */
class Incomes extends AbstractTahiniController
{
    /**
     * Get all the incomes of the user.
     *
     * @return JsonResponse
     */
    public function getAll()
    {
        return $this->json([]);
    }

    /**
     * Adding an income.
     *
     * @return JsonResponse
     */
    public function add()
    {
        // Check if we have an open income.
        if (true) {
            // close the current income.
            return $this->json([]);
        }

        // Add the income.
        return $this->json([]);
    }

    /**
     * Delete a given income.
     *
     * @return JsonResponse
     */
    public function delete()
    {
        return $this->json([]);
    }

    /**
     * Updating a given income.
     *
     * @return JsonResponse
     */
    public function update()
    {
        return $this->json([]);
    }
}
