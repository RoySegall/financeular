<?php

namespace App\Controller\UserDefault;

use App\Controller\AbstractTahiniController;
use App\Entity\UserDefault;
use App\Services\TahiniAccessToken;
use App\Services\TahiniDoctrine;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Handle the user default - income and template.
 *
 * @Route("/api/user-default/income")
 */
class Income extends AbstractTahiniController
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
    public function getIncome(Request $request, TahiniAccessToken $tahiniAccessToken)
    {
        // Get the current user.
        if (!$default = $tahiniAccessToken->getAccessTokenFromRequest($request)->user->getDefault()) {
            return $this->error('The user has no income');
        }

        // Print it.
        return $this->json(['income' => $default->getIncome()]);
    }

    /**
     * @Route("", methods={"POST"})
     *
     * @param Request $request
     *  The request service.
     * @param TahiniAccessToken $tahiniAccessToken
     *  The tahini access token service.
     *
     * @param ManagerRegistry $registry
     * @return JsonResponse
     */
    public function setIncome(Request $request, TahiniAccessToken $tahiniAccessToken, ManagerRegistry $registry)
    {

        if (!$income = $request->get('income')) {
            return $this->error('You need to provide the income.');
        }

        $user = $tahiniAccessToken->getAccessTokenFromRequest($request)->user;
        $manager = $registry->getManager();

        if (!$default = $user->getDefault()) {
            // Creating a new one.
            $user_default = new UserDefault();
            $user_default->setIncome($income);
            $user_default->setUser($user);

            $manager->persist($user_default);
            $manager->flush();

            return $this->json(['income' => $income]);
        }

        // Updating.
        $default->setIncome($income);

        $manager->persist($default);
        $manager->flush();

        return $this->json(['income' => $income]);
    }
}
