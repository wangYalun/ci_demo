<?php

defined('BASEPATH') OR exit('No direct script access allowed');

//路由控制器基类，继承CI控制器类
class Base extends CI_Controller {
    
    public $data = array("version" => "0.1.0", "brand" => "", "title" => "测试页面");
    //默认需要登录
    public $need_login = TRUE;
    public $view_name = 'front';

    function __construct()
    {
        parent::__construct();

        $this->load->library("user_agent");
        $this->load->helper('url');
        $this->data['base_url'] = base_url(); //获取当前域名
        //$this->need_login = FALSE;
        if ($this->need_login) {
            //是否要登录。       
            if (!$this->session->has_userdata('uid')) {
                redirect('login');
            }
        }
        $this->data = array_merge($this->data, $this->session->userdata());
    }

    //加载视图
    public function load_view($view, $data = '')
    {
        if (empty($data)) {
            $data = $this->data;
        }
        $this->load->view($this->view_name . '/header', array("data" => $data));
        $this->load->view($this->view_name . '/' . $view, array("data" => $data));
        $this->load->view($this->view_name . '/footer', array("data" => $data));
    }
}
