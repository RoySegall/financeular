<?php

namespace App\Command;

use App\Entity\Personal\AccessToken;
use App\Entity\Personal\User;
use App\Plugins\Authentication;
use App\Services\TahiniAccessToken;
use App\Services\TahiniEmailService;
use App\Services\TahiniUser;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\ManagerRegistry;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AppSandboxCommand extends Command
{
    protected static $defaultName = 'app:sandbox';

    /**
     * @var TahiniUser
     */
    protected $tahiniUser;

    /**
     * @var TahiniAccessToken
     */
    protected $accessToken;

    /**
     * @var ObjectManager
     */
    protected $entityManager;

    /**
     * @var TahiniEmailService
     */
    protected $tahiniEmailService;

    public function __construct(
        ?string $name = null,
        TahiniUser $tahiniUser,
        TahiniAccessToken $accessToken,
        \Doctrine\Common\Persistence\ManagerRegistry $registry,
        TahiniEmailService $tahiniEmailService
    ) {
        parent::__construct($name);

        $this->tahiniUser = $tahiniUser;
        $this->accessToken = $accessToken;
        $this->entityManager = $registry->getManager();
        $this->tahiniEmailService = $tahiniEmailService;
    }

    protected function configure()
    {
        $this->setDescription('This is a sandbox for testing stuff');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $foo = $this
            ->tahiniEmailService
            ->addTo('roy@segall.io', 'testing')
            ->setSubject('Verify registration.')
            ->addContent('<b>Welcome!</b>')
            ->addContent('In order to complete you registration you need to go the URL and verify you account.')
            ->addContent('<a href="http://google.com" target="_blank">Verify my account</a>')
            ->send();

        d($foo);
    }
}
