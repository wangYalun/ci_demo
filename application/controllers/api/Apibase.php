<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require_once APPPATH . '/libraries/REST_Controller.php';

use League\Csv\Writer;

/**
 * 所有API的基类
 */
class Apibase extends REST_Controller {

    public $model = NULL;
    public $server = NULL;
    public $data = NULL;

    function __construct()
    {
        parent::__construct();

//配置用户访问限制
//$this->methods['user_get']['limit']=500;
        $this->methods['user_post']['limit'] = 500;
        $this->data = $this->session->userdata();
    }

    /**
     * api返回数据格式
     * @param type $data
     * @param type $msg
     * @param type $code
     */
    public function return_data($data, $msg = '', $code = self::HTTP_OK)
    {
        $ret_data = array(
            'code' => $code . '',
            'msg' => $msg,
            'data' => $data,
        );
        $http_code = $code; //新的api让code跟http_code保持一致
        $this->response($ret_data, $http_code);
    }

    /**
     * API返回列表数据格式
     * @param array $data
     * @param string $msg
     * @param string $code
     */
    public function return_list_data($data, $msg = '', $code = self::HTTP_OK)
    {
        $empty_data = [
            'page' => '1',
            'records' => '0',
            'rows' => [],
            'total' => '0',
            'query_sql' => '',
            'count_sql' => '',
            'querytime' => '',
            'counttime' => '',
        ];
// 将数据填入空数组
        foreach ((array) $data as $key => $val) {
            $empty_data[$key] = $val;
        }
        $ret_data = array(
            'code' => $code . '',
            'msg' => $msg,
            'data' => $empty_data,
        );
        $http_code = $code; //新的api让code跟http_code保持一致
        $this->response($ret_data, $http_code);
    }

    /**
     * 统一API参数检验方法
     * 调用示例 check_param(array('money' => array('required', 'integer', 'greater_than_equal_to[1]', 'less_than_equal_to[200]')));
     * @param   array       $arr
     * @return  boolean
     */
    public function check_param($arr, $data = array(), $method = 'get')
    {
        /**
         * 设置要验证的请求数据
         */
        if (!empty($arr)) {
            $key_arr = array();
            $rule_arr = array();
            foreach ($arr as $key => $value) {
                $temp_arr = explode(",", $key);
                if (!is_array($value)) {
                    $value = explode("|", $value);
                }
                $key_arr = array_merge($key_arr, $temp_arr);
                if (!empty($temp_arr)) {
                    foreach ($temp_arr as $temp_value) {
                        if (!empty($rule_arr[$temp_value])) {
                            $rule_arr[$temp_value] = array_merge($rule_arr[$temp_value], $value);
                        } else {
                            $rule_arr[$temp_value] = $value;
                        }
                    }
                }
            }
            $key_arr = array_unique($key_arr);
            if (!empty($rule_arr)) {
                foreach ($rule_arr as $rule_key => $rule_value) {
                    $rule_arr[$rule_key] = array_unique($rule_value);
                }
            }
        }
        if ($method === 'post' || $method === 'POST') {
            $request_data = $this->input->post($key_arr, TRUE);
        } else {
            $request_data = $this->input->get($key_arr, TRUE);
        }
        $this->form_validation->set_data($request_data);
        /**
         * 设置验证规则
         */
        if (!empty($rule_arr)) {
            foreach ($rule_arr as $rule_key => $rule_value) {
                $this->form_validation->set_rules($rule_key, '', $rule_value, array('required' => '%s 不能为空;'
                    , 'integer' => '%s 必须是数字;'
                    , 'regex_match' => '%s 格式有误;'
                    , 'greater_than' => '%s 有误;'
                    , 'max_length' => '%s 超过长度;'
                    , 'min_length' => '%s 长度不够;'
                ));
            }
        }
        /**
         * 开始验证
         */
        if (!$this->form_validation->run()) {
//验证失败处理逻辑            
            $errmsg = validation_errors(' ', ' ');
            if (!empty($arr) && !empty($data)) {
                foreach ($arr as $arr_key => $arr_value) {
                    $errmsg = str_replace($arr_key, $data[$arr_key], $errmsg);
                }
            }
            $this->returnError($errmsg . "请检查是否正确", '400');
            return FALSE;
        }
        return $request_data;
    }

    public function export_csv($res, $name)
    {
        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->setOutputBOM(Writer::BOM_UTF8);
        $head_title = array();
        foreach ($res as $key => $value) {
            $v_array = array();
            foreach ($value as $k => $v) {
                if ($key === 0) {
                    array_push($head_title, $k);
                }
                array_push($v_array, $v);
            }
            if ($key === 0) {
                $csv->insertOne($head_title);
            }
            $csv->insertOne($v_array);
        }
        $csv->output($name . '.csv');
    }

}
