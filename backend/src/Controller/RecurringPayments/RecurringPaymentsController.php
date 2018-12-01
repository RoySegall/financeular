<?php

namespace App\Controller\RecurringPayments;

use App\Controller\AbstractTahiniController;
use App\Entity\RecurringPayment;
use App\Services\TahiniAccessToken;
use App\Services\TahiniDoctrine;
use App\Services\TahiniValidator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/recurring_payments")
 */
class RecurringPaymentsController extends AbstractTahiniController
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
        return $this->json($tahini_doctrine->getRecurringPaymentRepository()->findBy(['user' => $user]));
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

        $recurring = $tahini_doctrine
            ->getRecurringPaymentRepository()
            ->findBy([
                'user' => $user,
                'id' => $entity_id
            ]);

        // Get all the incomes of the current user.
        return $this->json($recurring);
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
        TahiniValidator $tahini_validator,
        TahiniAccessToken $access_token
    ) {
        if (!$payload = $this->processPayload($request)) {
            return $this->json(['error' => 'The payload seems to be empty'], Response::HTTP_BAD_REQUEST);
        }

        $recurring_payment = new RecurringPayment();
        $this->processPayloadToEntity($recurring_payment, $payload);

        // Setting the user and the recurring_payment as the default one.
        $recurring_payment->setUser($access_token->getAccessTokenFromRequest($request)->user);

        if ($errors = $tahini_validator->validate($recurring_payment)) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($recurring_payment);
        $em->flush();

        // Add the recurring_payment.
        return $this->json($recurring_payment);
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
        $item = $tahini_doctrine->getRecurringPaymentRepository()->findOneBy(['user' => $user, 'id' => $entity_id]);

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

        /** @var RecurringPayment $item */
        $item = $tahini_doctrine->getRecurringPaymentRepository()->findOneBy(['user' => $user, 'id' => $entity_id]);

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
