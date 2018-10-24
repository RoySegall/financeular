<?php

namespace App\Plugins\Authentication;

use App\Plugins\Annotations\Authentication;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Authentication(
 *   id = "access_token",
 *   name = "Access Token",
 * )
 */
class AccessToken extends AuthenticationPluginBase
{

    /**
     * @var \Symfony\Component\HttpFoundation\Request
     */
    protected $request;

    /**
     * @var \App\Services\TahiniAccessToken
     */
    protected $tahiniAccessToken;

    /**
     * AccessToken constructor.
     *
     * @param \App\Services\TahiniAccessToken $tahini_access_token
     */
    public function __construct(\App\Services\TahiniAccessToken $tahini_access_token)
    {
        $this->request = new Request();
        $this->tahiniAccessToken = $tahini_access_token;
    }

    /**
     * Making sure the user is valid.
     */
    public function validateUser()
    {
        return true;
    }
}
