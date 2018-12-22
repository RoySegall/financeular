<?php

namespace App\Controller;

use App\Entity\AbstractEntity;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractTahiniController extends AbstractController
{

    /**
     * Processing a payload to entity object.
     *
     * @param \App\Entity\AbstractEntity $entity
     *  The entity object.
     * @param \Doctrine\Common\Collections\ArrayCollection $payload
     *  The pyalod to handle.
     * @param bool $set_when_not_exists
     *  When a field has no value in the payload and this set to true - we will
     *  skip setting any value to the field. Come in handy when updating an
     *  entity.
     */
    protected function processPayloadToEntity(
        AbstractEntity $entity,
        ArrayCollection $payload = null,
        bool $set_when_not_exists = true
    ) {
        $fields = $this
            ->getDoctrine()
            ->getManager()
            ->getClassMetadata(get_class($entity))
            ->getFieldNames();

        foreach ($fields as $field) {
            if ($field == 'id') {
                continue;
            }

            $names = explode('_', $field);

            foreach ($names as &$name) {
                $name = ucfirst($name);
            }

            $value = $payload->get($field);

            if ($value == null && !$set_when_not_exists) {
                continue;
            }

            $method = 'set' . implode('', $names);

            if (!method_exists($entity, $method)) {
                continue;
            }

            $entity->{'set' . implode('', $names)}($value);
        }
    }

    /**
     * Update the entity.
     *
     * @param AbstractEntity $entity
     *  The entity object.
     */
    protected function updateEntity(AbstractEntity $entity)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($entity);
        $entityManager->flush();
    }

    /**
     * Processing the payload.
     *
     * @return \Doctrine\Common\Collections\ArrayCollection
     *   Return the payload as an object.
     */
    protected function processPayload(Request $request)
    {
        $content = $request->getContent();

        if (!$decoded = json_decode($content, true)) {
            return;
        }

        return new ArrayCollection($decoded);
    }

    /**
     * Return a JSON error response.
     *
     * @param $error
     *  The error.
     * @param int $code
     *  The response code. Default to 404.
     *
     * @return JsonResponse
     */
    protected function error($error, $code = Response::HTTP_NOT_FOUND)
    {
        return $this->json(['error' => $error], $code);
    }
}
