<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
use App\Entity\DefaultExpenses;
use App\Entity\Employee;
use App\Entity\Income;
use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing the registration controller.
 *
 * @4package App\Tests\Controller
 */
class RegisterUserTest extends TahiniBaseWebTestCase
{
    /**
     * Testing the registration controller.
     */
    public function testRegisterController()
    {
        $operations = [
            [
                'data' => '{}',
                'expected' => [
                    'error' => 'The payload seems to be empty',
                ],
            ],
            [
                'data' => '{"foo": "bar"}',
                'expected' => [
                    'username' => [
                        'This value should not be null.',
                    ],
                    'password' => [
                        'This value should not be null.',
                    ],
                    'email' => [
                        'This value should not be null.',
                    ],
                ],
            ],
            [
                'data' => '{"username": "testing"}',
                'expected' => [
                    'password' => [
                        'This value should not be null.',
                    ],
                    'email' => [
                        'This value should not be null.',
                    ],
                ],
            ],
            [
                'data' => '{"username": "testing", "password" : "pizza"}',
                'expected' => [
                    'email' => [
                        'This value should not be null.',
                    ],
                ],
            ],
            [
                'data' => '{"username": "testing", "password" : "pizza", "email": "foo"}',
                'expected' => [
                    'email' => [
                        'This value is not a valid email address.',
                    ],
                ],
            ],
            [
                'data' => '{"username": "testing", "password" : "pizza", "email": "pizza@gmail.com"}',
                'expected' => function ($value) {
                    $this->assertNotEmpty($this->getTahiniUser()->findUserByUsername('testing'));
                    $this->assertNotEmpty($this->getTahiniUser()->findUserByMail('pizza@gmail.com'));
                    $this->assertEquals($value, [
                        'message' => 'welcome',
                    ]);
                },
            ],
            [
                'data' => '{"username": "testing", "password" : "pizza", "email": "pizza@gmail.com"}',
                'expected' => [
                    'username' => [
                        'The username "testing" already exists.',
                    ],
                    'email' => [
                        'The email "pizza@gmail.com" already exists.',
                    ],
                ]
            ],
        ];

        foreach ($operations as $operation) {
            $client = static::createClient();
            $client->request(
                'POST',
                '/api/user/register',
                [],
                [],
                [],
                $operation['data']
            );

            $contents = json_decode($client->getResponse()->getContent(), true);

            if (is_callable($operation['expected'])) {
                $operation['expected']($contents);
            } else {
                $this->assertEquals($contents, $operation['expected']);
            }
        }

        // todo: test sendgrid.
    }
}
