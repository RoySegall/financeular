<?php

namespace App\Controller\User;

use App\Controller\AbstractTahiniController;
use App\Entity\User;
use App\Services\TahiniAccessToken;
use App\Services\TahiniUser;
use App\Services\TahiniValidator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Get the job processes in the system.
 *
 * @Route("/api/user/")
 */
class Register extends AbstractTahiniController
{

    const DATE_FORMAT = 'd/m/Y';

    /**
     * @Route("register", methods={"POST"})
     *
     * @param Request $request
     *  The request service.
     * @param TahiniUser $tahini_user
     *  The tahini user service.
     * @param TahiniValidator $tahini_validator
     *  The validator service.
     *
     * @return JsonResponse
     * @throws \Exception
     */
    public function registerController(
        Request $request,
        TahiniUser $tahini_user,
        TahiniValidator $tahini_validator,
        TahiniAccessToken $tahini_access_token
    ) {
        if (!$payload = $this->processPayload($request)) {
            return $this->error("The payload seems to be empty", Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user->roles = [];
        $user->type = 'user';
        $user->setStatus(0);

        $this->processPayloadToEntity($user, $payload);

        if ($errors = $tahini_validator->validate($user)) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $tahini_user->createUser($user, true);

        return $this->json(['access_token' => $tahini_access_token->getAccessToken($user)]);
    }
}
