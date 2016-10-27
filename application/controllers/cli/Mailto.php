<?php

/**
 * Description of Compute_data
 *
 * @author Allen
 */
class Mailto extends CI_Controller {

    private $data_db = null;

    function __construct()
    {
        parent::__construct();
        if (php_sapi_name() !== 'cli') {
            die('must access via cli');
        }
       
    }

    public function test()
    {
        echo date("D", strtotime("2016-10-17"));
    }

  
    //自动发邮件测试函数
    /**
    *$to_email array() 接收人
    *$cc_email array() 抄送人
    *$subject string 邮件主题
    *$message string 邮件内容
    */
    public function email_to($to_email, $cc_email, $subject, $message)
    {
       
        $this->load->library('email');
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'smtp.exmail.qq.com';
        $config['smtp_user'] = 'allen.wang@gaopeng.com';
        $config['smtp_pass'] = '********';
        $config['newline'] = "\r\n";
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $config['crlf'] = "\r\n";

        $this->email->initialize($config);

        $this->email->from('发件人邮箱', '发件人昵称');
        $this->email->to($to_email);
        $this->email->cc($cc_email);
        $this->email->subject($subject . '-' . date("Y-m-d ", strtotime("-1 day")));
        $this->email->message($message);
        $this->email->send();
        $res = $this->email->print_debugger();
        echo $res;
    }

}
