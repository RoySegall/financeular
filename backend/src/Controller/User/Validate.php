<?php

namespace App\Controller\User;

use App\Controller\AbstractTahiniController;
use App\Entity\User;
use App\Services\TahiniAccessToken;
use App\Services\TahiniEmailService;
use App\Services\TahiniUser;
use App\Services\TahiniValidator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Validate the user object.
 *
 * @Route("/api/user/")
 */
class Validate extends AbstractTahiniController
{

    /**
     * @Route("validate", methods={"GET"})
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
    public function loginController(
        Request $request,
        TahiniUser $tahini_user,
        TahiniAccessToken $tahini_access_token,
        TahiniEmailService $tahini_email_service
    ) {
        $bad_response = $this->json([
            'error' => 'whoops.. We cannot find a user by that access token'
        ], Response::HTTP_BAD_REQUEST);

        $access_token = $tahini_access_token->loadByAccessToken($request->get('access_token'));

        if (!$access_token->id) {
            return $bad_response;
        }

        if ($access_token->user->getStatus()) {
            return $bad_response;
        }

        $user = $access_token->user;
        $user->setStatus(true);
        $tahini_user->updateUser($user);

        $tahini_email_service
            ->addTo($user->getEmail())
            ->setSubject('You did it!')
            ->addContent('You are now a valid user')
            ->send();

        return $this->json(['message' => 'success', 'access_token' => $access_token]);
    }
}
