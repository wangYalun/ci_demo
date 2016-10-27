<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/Base.php';

//路由控制器类，继承Base类
class Gpa extends Base {

    public $userinfo = NULL;

    function __construct()
    {
        parent::__construct();
        $this->userinfo = $this->session->userdata();
    }

    public function index()
    {
        $this->load->view('welcome_message');
    }

    public function test()
    {
        if (NULL == 'testing') {
            echo 'haha';
        }
    }

   
}
