<?php

namespace App\Controller\Incomes;

use App\Controller\AbstractTahiniController;
use App\Entity\Income;
use App\Entity\UserDefault;
use App\Services\TahiniAccessToken;
use App\Services\TahiniDoctrine;
use App\Services\TahiniValidator;
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
     * @Route("", methods={"GET"})
     *
     * Get all the incomes of the user.
     *
     * @return JsonResponse
     */
    public function getAll(TahiniDoctrine $tahini_doctrine, Request $request, TahiniAccessToken $access_token)
    {
        $user = $access_token->getAccessTokenFromRequest($request)->user;

        // Get all the incomes of the current user.
        return $this->json($tahini_doctrine->getIncomeRepository()->findBy(['user' => $user]));
    }

    /**
     * @Route("", methods={"POST"})
     *
     * Adding an income.
     *
     * @return JsonResponse
     */
    public function add(
        Request $request,
        TahiniDoctrine $tahini_doctrine,
        TahiniValidator $tahini_validator,
        TahiniAccessToken $access_token
    ) {
        if (!$payload = $this->processPayload($request)) {
            return $this->json(['error' => 'The payload seems to be empty'], Response::HTTP_BAD_REQUEST);
        }

        $income = new Income();

        $fields = $this
            ->getDoctrine()
            ->getManager()
            ->getClassMetadata(\App\Entity\Income::class)
            ->getFieldNames();

        foreach ($fields as $field) {
            if ($field == 'id') {
                continue;
            }

            $names = explode('_', $field);

            foreach ($names as &$name) {
                $name = ucfirst($name);
            }

            $income->{'set' . implode('', $names)}($payload->get($field));
        }

        // Setting the user.
        $income->setUser($access_token->getAccessTokenFromRequest($request)->user);

        if ($errors = $tahini_validator->validate($income)) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        // todo: add constaint for an open current income.
        // Check if we have an open income.
//        if ($this->incomeExists()) {
//            // close the current income and set a new one.
//            return $this->json([]);
//        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($income);
        $em->flush();

        // Add the income.
        return $this->json($income);
    }

    /**
     * Return the income.
     *
     * @return Income
     */
    protected function incomeExists(): Income
    {
        return new Income();
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
