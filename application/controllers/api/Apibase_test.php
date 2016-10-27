<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require_once APPPATH . '/libraries/REST_Controller.php';

/**
 * 所有API的基类
 */
class Apibase_test extends REST_Controller {

    public $model = NULL;
    public $server = NULL;
    public $data = NULL;

    function __construct()
    {
        parent::__construct();
        $rest_auth = strtolower($this->config->item('rest_auth')); //获取验证配置
        echo $rest_auth;
        switch ($rest_auth) {
            case 'oauth2':
                $this->_prepare_oauth2_auth();
                break;
        }
    }

    /**
     * 具体执行oauth2验证的动作
     *
     * @access protected
     * @return void
     */
    protected function _prepare_oauth2_auth()
    {
        $this->server();
        if ('token' == $this->uri->segment(3)) {//获取token不走这个验证
            return TRUE;
        }
        if (!$this->server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
            $this->server->getResponse()->send();
            exit;
        }
    }

    /**
     * 构造Ouath2 server
     */
    private function server()
    {
        $oauth2_tables_config = $this->config->item('oauth2_tables'); //获取配置表
        $connection = ['dsn' => $this->db->dsn, 'username' => $this->db->username, 'password' => $this->db->password]; //获取数据库连接信息
        OAuth2\Autoloader::register();
        $storage = new OAuth2\Storage\Pdo($connection, $oauth2_tables_config);

        // 初始化server
        $this->server = new OAuth2\Server($storage);

        // 添加 "Client Credentials" 授权类型 (最简单的授权类型)
        $this->server->addGrantType(new OAuth2\GrantType\ClientCredentials($storage));
        // 添加 "RefreshToken" 授权类型 (最简单的授权类型)
        $this->server->addGrantType(new OAuth2\GrantType\RefreshToken($storage));
        // 添加 "Authorization Code" 授权类型 (this is where the oauth magic happens)
        $this->server->addGrantType(new OAuth2\GrantType\AuthorizationCode($storage));
    }

    public function token_post()
    {
        $this->return_data($this->uri->segment(3));
    }

    /**
     * 
     */
    public function authorize_post()
    {
        $request = OAuth2\Request::createFromGlobals();
        $response = new OAuth2\Response();

        // validate the authorize request
        if (!$this->server->validateAuthorizeRequest($request, $response)) {
            $response->send();
            die;
        }

        // print the authorization code if the user has authorized your client
        $is_authorized = ($_POST['authorized'] === 'yes');
        $this->server->handleAuthorizeRequest($request, $response, $is_authorized);
        if ($is_authorized) {
            // this is only here so that you get to see your code in the cURL request. Otherwise, we'd redirect back to the client
            $code = substr($response->getHttpHeader('Location'), strpos($response->getHttpHeader('Location'), 'code=') + 5, 40);
            exit("SUCCESS! Authorization Code: $code");
        }
        $response->send();
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

}
