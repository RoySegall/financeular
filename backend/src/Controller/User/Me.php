<?php

namespace App\Controller\User;

use App\Controller\AbstractTahiniController;
use App\Services\TahiniAccessToken;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Get the job processes in the system.
 *
 * @Route("/api/me")
 */
class Me extends AbstractTahiniController
{

    /**
     * @Route("", methods={"GET"})
     *
     * @param Request $request
     *  The request service.
     * @param TahiniAccessToken $tahiniAccessToken
     *  The tahini access token service.
     *
     * @return JsonResponse
     */
    public function userDetails(Request $request, TahiniAccessToken $tahiniAccessToken) {
        return $this->json($tahiniAccessToken->getAccessTokenFromRequest($request)->user);
    }
}
