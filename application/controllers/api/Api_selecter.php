<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once APPPATH . '/controllers/api/Apibase.php';

/**
 * 数据查询通用接口类
 */
class Api_selecter extends Apibase {

    function __construct()
    {
        parent::__construct();
        //获取headers
        $test = $this->input->get_request_header('x-test', TRUE);

        //获取请求接口名
        $request_name = $this->uri->segment(3, 0);
    }

    public function test_get()
    {
        //获取参数
        $this->return_data(['haha', 'heihei'], 'success');
    }

    public function test_post()
    {
        //获取单个参数
        $this->post('test');

        //参数验证
        $request_data = $this->input->post(array('id', 'name', 'phone_num', 'department'), TRUE); //获取多个参数

        $this->form_validation->set_data($request_data);
        $this->form_validation->set_rules('name', '姓名', 'required', array('required' => '姓名不能为空'));
        $this->form_validation->set_rules('phone_num', '手机号', 'required|regex_match[/^1[0-9]{10}$/]', array('required' => '手机号码不能为空', 'regex_match' => '非法的手机号码'));

        $this->form_validation->set_rules('department', '', 'required', array('required' => '部门信息不能为空'));

        if (!$this->form_validation->run()) {
            $this->return_data(array("error" => trim(validation_errors(' ', ' '))), 'fail');
        }
    }

    public function test_delete()
    {
        //获取单个参数
        $test = $this->delete("test");

        $this->return_data(array("params" => $test));
    }

    public function test_put()
    {
        //获取单个参数
        $test = $this->put("test");
        echo $test;
    }

}
