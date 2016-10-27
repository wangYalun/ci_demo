<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use EasyWeChat\Foundation\Application;
use EasyWeChat\Message\Text;
use EasyWeChat\Message\News;

class Index extends CI_Controller {

    protected $app;

    public function __construct()
    {
        parent::__construct();
        $config = $this->config->item('wx_mp_config'); //获取微信配置文件
        $this->app = new Application($config);
    }

}
