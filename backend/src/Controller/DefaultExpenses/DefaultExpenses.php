<?php

namespace App\Controller\DefaultExpenses;

use App\Controller\AbstractTahiniController;
use App\Services\TahiniAccessToken;
use App\Services\TahiniDoctrine;
use App\Services\TahiniValidator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\DefaultExpenses as DefaultExpense;

/**
 * Handle the user default - income and template.
 *
 * @Route("/api/default_expenses")
 */
class DefaultExpenses extends AbstractTahiniController
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
        return $this->json($tahini_doctrine->getDefaultExpensesRepository()->findBy(['user' => $user]));
    }

    /**
     * @Route("/{entity_id}", methods={"GET"})
     *
     * Get a single income.
     *
     * @return JsonResponse
     */
    public function getSingle(
        TahiniDoctrine $tahini_doctrine,
        Request $request,
        TahiniAccessToken $access_token,
        int $entity_id
    ) {
        $user = $access_token->getAccessTokenFromRequest($request)->user;

        // Get all the incomes of the current user.
        return $this
            ->json($tahini_doctrine->getDefaultExpensesRepository()
            ->findBy(['user' => $user, 'id' => $entity_id]));
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

        $default_expenses = new DefaultExpense();
        $this->processPayloadToEntity($default_expenses, $payload);

        // Setting the user and the income as the default one.
        $default_expenses->setUser($access_token->getAccessTokenFromRequest($request)->user);

        if ($errors = $tahini_validator->validate($default_expenses)) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($default_expenses);
        $em->flush();

        // Add the income.
        return $this->json($default_expenses);
    }

    /**
     * @Route("/{entity_id}", methods={"DELETE"})
     *
     * @return JsonResponse
     */
    public function delete(
        TahiniDoctrine $tahini_doctrine,
        Request $request,
        TahiniAccessToken $access_token,
        int $entity_id
    ) {

        $user = $access_token->getAccessTokenFromRequest($request)->user;

        // Get all the incomes of the current user.
        $item = $tahini_doctrine
            ->getDefaultExpensesRepository()
            ->findOneBy(['user' => $user, 'id' => $entity_id]);

        if (!$item) {
            return $this->error('The requested item does not exists', Response::HTTP_NOT_FOUND);
        }

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($item);
        $manager->flush();

        return $this->json(['message' => 'The entity has been removed']);
    }

    /**
     * @Route("/{entity_id}", methods={"PATCH"})
     *
     * Get all the incomes of the user.
     *
     * @return JsonResponse
     */
    public function update(
        TahiniDoctrine $tahini_doctrine,
        Request $request,
        TahiniAccessToken $access_token,
        int $entity_id
    ) {
        $user = $access_token->getAccessTokenFromRequest($request)->user;

        /** @var DefaultExpense $item */
        $item = $tahini_doctrine->getDefaultExpensesRepository()->findOneBy(['user' => $user, 'id' => $entity_id]);

        if (!$item) {
            return $this->error('The requested item does not exists', Response::HTTP_NOT_FOUND);
        }

        if (!$payload = $this->processPayload($request)) {
            return $this->json(['error' => 'The payload seems to be empty'], Response::HTTP_BAD_REQUEST);
        }

        $this->processPayloadToEntity($item, $payload, false);

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($item);
        $manager->flush();

        return $this->json($item);
    }
}
