<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/controllers/Base.php';

class Login extends Base {

    public $need_login = FALSE;

    function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('admin');
    }

    public function index()
    {
        if ($this->session->has_userdata('uid')) {
            redirect('gpa/index');
        }
        $this->data['title'] = "登录";
        if ('get' == $this->input->method()) {
            $this->load->view('front/login', $this->data);
        } else if ('post' == $this->input->method()) {
            $this->form_validation->set_rules('username', '用户名', 'trim|required', array('required' => '%s 不能为空。'));
            $this->form_validation->set_rules('password', '密码', 'trim|required', array('required' => '%s 不能为空。'));

            $request_data = $this->input->post(array('username', 'password'), TRUE);
            $this->data['request_data'] = $request_data;
            //开始验证
            if ($this->form_validation->run() == FALSE) {
                $this->data['errors'] = validation_errors();
                $this->load->view('front/login', $this->data);
                return FALSE;
            }
            $userinfo = $this->admin->get_admin_by_up($request_data['username'], $request_data['password']);
            if ($userinfo != NULL) {
                //写入session
//                var_dump($this->session->userdata());
//                echo "登录成功";
                //写入session
                $userinfo['permission'] = $this->admin->get_permission($userinfo);
                $userinfo['cur_permission'] = current($userinfo['permission']);
                $userinfo['cur_channel'] = 0;
                $this->session->set_userdata($userinfo);
                redirect('gpa/index');
            } else {
                $this->data['errors'] = '用户名或密码错误';
                $this->load->view('front/login', $this->data);
            }
        }
    }

    public function logout()
    {
        $this->session->sess_destroy();
        redirect('login/index');
    }

}
