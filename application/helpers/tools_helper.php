<?php

defined('BASEPATH') OR exit('No direct script access allowed');

function post_curl($url, $params)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1); //post数据
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params); //post变量
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

function writelog($data, $func = NULL)
{
    $data['function'] = $func;
    $dir = APPPATH . "logs/";
    if (!is_dir($dir)) {
        @mkdir($dir);
    }
    $logname = $dir . date("Ymd") . ".log";
    $date = date("Y-m-d H:i:s") . "=>";
    file_put_contents($logname, $date . var_export($data, TRUE) . "\r\n", FILE_APPEND);
}

/**
 * 格式化日期
 * @param type $time
 */
function formatDateStr($time)
{
    $time = (int) $time;
    if ($time >= strtotime(date('Y-m-d'))) {
        return '今天 ' . date('H:i:s', $time);
    } else if (($time >= (strtotime(date('Y-m-d') . '00:00:00') - 86400)) && ($time < (strtotime(date('Y-m-d') . '23:59:59') - 86400))) {
        return '昨天 ' . date('H:i:s', $time);
    } else if (($time >= (strtotime(date('Y-m-d') . '00:00:00') - 86400 * 2)) && ($time < (strtotime(date('Y-m-d') . '23:59:59') - 86400 * 2))) {
        return '前天 ' . date('H:i:s', $time);
    } else {
        return date("Y-m-d H:i:s", $time);
    }
}

function day_diff($start, $end)
{
    $date_start = date('Y-m-d', $start);
    $date_end = date('Y-m-d', $end);
    return ceil((strtotime($date_end) - strtotime($date_start)) / 60 / 60 / 24);
}

// 获取客户端ip
function _get_ip()
{
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], "unknown")) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        if (strpos($ip, ',')) {
            $tmp_ips = explode(',', $ip);
            if (isset($tmp_ips[0])) {
                $ip = $tmp_ips[0];
            }
        }
        return $ip;
    } else if (isset($_SERVER['HTTP_CLIENT_IP']) && strcasecmp($_SERVER['HTTP_CLIENT_IP'], "unknown")) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['REMOTE_ADDR']) && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) {
        $ip = $_SERVER['REMOTE_ADDR'];
    } else {
        $ip = "";
    }
    return ($ip);
}

// 获取ip + 地址
function _get_ip_dizhi()
{
    /**
     * 百度查询结果
     */
    $baidu_ret = _get_ip_dizhi_by_baidu();
    if (!empty($baidu_ret)) {
        return $baidu_ret;
    }
    $ipmac = _get_ip();
    if (empty($ipmac) || strpos($ipmac, "127.0.0.") !== FALSE) {
        return '';
    }

    $opts = array(
        'http' => array(
            'method' => "GET",
            'timeout' => 5,)
    );
    $context = stream_context_create($opts);
    $url_ip = 'http://ip.taobao.com/service/getIpInfo.php?ip=' . $ipmac;
    $str = @file_get_contents($url_ip, false, $context);
    if (!$str) {
        return "";
    }

    $json = json_decode($str, true);
    if ($json['code'] == 0) {
        $ipcity = $json['data']['region'] . $json['data']['city'];
        $ip = $ipcity . ',' . $ipmac;
    } else {
        $ip = "";
    }
    return $ip;
}

// 通过百度接口获取ip + 地址
function _get_ip_dizhi_by_baidu($ipmac = NULL)
{
    if (NULL === $ipmac) {
        $ipmac = _get_ip();
    }
    if (empty($ipmac) || strpos($ipmac, "127.0.0.") !== FALSE) {
        return '';
    }

    //百度api的key
    $ak_array = ['4U7sWTgMZfXl371U2hvmnEO4', 'ytLeyXLISVu4VTGn7ExnI3zL', '8h0FthsqlebfLU4wQAKvVpMR', 'kSKxAm0cbiRtX3uZDBCxg9Rp', 'ERP1cTpdbwrlzVOuo6LOxCQN'];
    shuffle($ak_array);

    $opts = array(
        'http' => array(
            'method' => "GET",
            'timeout' => 5,)
    );
    $context = stream_context_create($opts);
    $url_ip = 'http://api.map.baidu.com/location/ip?ak=' . $ak_array[0] . '&ip=' . $ipmac . '&coor=bd09ll';
    $str = @file_get_contents($url_ip, false, $context);
    if (!$str) {
        return "";
    }

    $json = json_decode($str, true);
    if ($json['status'] == 0) {
        $ipcity = $json['content']['address'];
        $ip = $ipcity . ',' . $ipmac;
    } else {
        $ip = "";
    }
    return $ip;
}

function currency_con($fromCurrency, $toCurrency)
{
    $ch = curl_init();
    $url = "http://apis.baidu.com/apistore/currencyservice/currency?fromCurrency=$fromCurrency&toCurrency=$toCurrency&amount=1";
    $header = array(
        'apikey:24d5d35cdd109df3ba7d4b0bbccce202',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch, CURLOPT_URL, $url);
    $res = curl_exec($ch);
    $res_o = json_decode($res);
    if ($res_o->errMsg == "success") {
        return floatval($res_o->retData->currency);
    } else {
        $arr = array(
            "VND" => 0.0000445037,
            "IDR" => 0.0000715077,
            "THB" => 0.0278218282,
            "MYR" => 0.2347
        );
        return isset($arr[$fromCurrency]) ? $arr[$fromCurrency] : 1;
    }
}
