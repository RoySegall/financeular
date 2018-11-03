<?php

namespace App\Controller\Incomes;

use App\Controller\AbstractTahiniController;
use App\Entity\Income;
use App\Entity\User;
use App\Services\TahiniAccessToken;
use App\Services\TahiniDoctrine;
use App\Services\TahiniValidator;
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
        return $this->json($tahini_doctrine->getIncomeRepository()->findBy(['user' => $user, 'id' => $entity_id]));
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

        // Check if we have an open income.
        if ($income = $this->incomeExists($tahini_doctrine, $access_token->getAccessTokenFromRequest($request)->user)) {
            // close the current income and set a new one.
            $income->setCurrent(false);
            $em = $this->getDoctrine()->getManager();
            $em->persist($income);
            $em->flush();
        }

        $income = new Income();
        $this->processPayloadToEntity($income, $payload);

        // Setting the user and the income as the default one.
        $income->setCurrent(1);
        $income->setUser($access_token->getAccessTokenFromRequest($request)->user);

        if ($work_place = $payload->get('work_place')) {
            $income->setWorkPlace($tahini_doctrine->getEmployeeRepository()->find($work_place));
        }

        if ($errors = $tahini_validator->validate($income)) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($income);
        $em->flush();

        // Add the income.
        return $this->json($income);
    }

    /**
     * Return the income.
     *
     * @return Income|null
     */
    protected function incomeExists(TahiniDoctrine $tahini_doctrine, User $user)
    {
        if ($income = $tahini_doctrine->getIncomeRepository()->findOneBy(['user' => $user, 'current' => true])) {
            return $income;
        }

        return;
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
        $item = $tahini_doctrine->getIncomeRepository()->findOneBy(['user' => $user, 'id' => $entity_id]);

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

        /** @var Income $item */
        $item = $tahini_doctrine->getIncomeRepository()->findOneBy(['user' => $user, 'id' => $entity_id]);

        if (!$item) {
            return $this->error('The requested item does not exists', Response::HTTP_NOT_FOUND);
        }

        if (!$payload = $this->processPayload($request)) {
            return $this->json(['error' => 'The payload seems to be empty'], Response::HTTP_BAD_REQUEST);
        }

        if ($work_place = $payload->get('work_place')) {
            $item->setWorkPlace($tahini_doctrine->getEmployeeRepository()->find($work_place));
        }

        $this->processPayloadToEntity($item, $payload, false);

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($item);
        $manager->flush();

        return $this->json($item);
    }
}
