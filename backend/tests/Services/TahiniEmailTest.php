<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Tests\SendGridMock;
use App\Tests\TahiniBaseWebTestCase;

class TahiniEmailTest extends TahiniBaseWebTestCase
{

    /**
     * Testing mail sending service.
     */
    public function testMailSending()
    {
        $mail = $this->getTahiniEmail();
        $send_grid_mock = $mail->getSendGrid();

        $this->assertTrue($send_grid_mock instanceof SendGridMock);

        $mail
            ->addTo('dummy@gmail.com', 'testing')
            ->setSubject('Verify registration.')
            ->addContent('<b>Welcome!</b>')
            ->addContent('In order to complete you registration you need to go the URL and verify you account.')
            ->addContent('<a href="http://google.com" target="_blank">Verify my account</a>')
            ->send();


        foreach ($send_grid_mock->getMails() as $mail) {
            $this->assertEquals($mail->getFrom()->getEmail(), 'foo@gmail.com');

            $this->assertEquals($mail->getPersonalizations()[0]->getTos()[0]->getEmail(), 'dummy@gmail.com');
            $this->assertEquals($mail->getPersonalizations()[0]->getTos()[0]->getName(), 'testing');
        }
    }
}
