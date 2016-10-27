(function (window) {
    var document = window.document, h5_version = '1.0.0';
    //辅助函数
    function getLocalStorage() {
        if (typeof localStorage === 'object') {
            return localStorage;
        } else {
            throw new Error('Local storage not available.');
        }
    }

    function getQueryStringArgs() {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
                args = {},
                items = qs.length ? qs.split("&") : [],
                item = null,
                name = null,
                value = null,
                i = 0,
                len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    function UUID() {
        this.id = this.createUUID();
    }

    UUID.prototype.valueOf = function () {
        return this.id;
    };
    UUID.prototype.toString = function () {
        return this.id;
    };

    UUID.prototype.createUUID = function () {
        var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
        var dc = new Date();
        var t = dc.getTime() - dg.getTime();
        var tl = UUID.getIntegerBits(t, 0, 31);
        var tm = UUID.getIntegerBits(t, 32, 47);
        var thv = UUID.getIntegerBits(t, 48, 59) + '1';
        var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
        var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);

        var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
                UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
                UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
                UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
                UUID.getIntegerBits(UUID.rand(8191), 0, 15);
        return tl + tm + thv + csar + csl + n;
    };

    UUID.getIntegerBits = function (val, start, end) {
        var base16 = UUID.returnBase(val, 16);
        var quadArray = new Array();
        var quadString = '';
        var i = 0;
        for (i = 0; i < base16.length; i++) {
            quadArray.push(base16.substring(i, i + 1));
        }
        for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
            if (!quadArray[i] || quadArray[i] == '')
                quadString += '0';
            else
                quadString += quadArray[i];
        }
        return quadString;
    };


    UUID.returnBase = function (number, base) {
        return (number).toString(base).toUpperCase();
    };
    UUID.rand = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };

    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    function is_opened() {
        if (typeof sessionStorage === 'object' && sessionStorage.opened) {
            return true;
        } else {
            sessionStorage.setItem('opened', 'true');
            return false;
        }
    }

    function getText(elem) {
        var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

        if (!nodeType) {
            while ((node = elem[i++])) {
                ret += getText(node);
            }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    ret += elem.nodeValue;
                }
            }
        } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
        }

        return ret === null ? "" : (ret + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }

    function serialize(obj) {
        var parts = [];
        for (var i in obj) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
        return parts.join("&");
    }
    //数据采集
    var platform_id = is_weixin() ? 10001 : 10004;
    var channel_id = 10000;
    var storage = getLocalStorage();

    if (!storage.getItem('access_uuid')) {
        var uuid = new UUID();
        storage.setItem('access_uuid', uuid.id);
    }
    var userinfo = {};
    if (storage.getItem('userinfo')) {
        userinfo = JSON.parse(storage.getItem('userinfo'));
    }
    var b = window.screen || {width: "", height: "", colorDepth: ""};
    var postData = {
        title: document.title, //网页标题
        domain: document.domain, //网页域名
        url: document.URL, //网页URL
        referrer: document.referrer, //来源页面URL
        start_time: (new Date()).getTime() / 1000, //打开网页的时间
        uid: userinfo.uid || 0,
        username: userinfo.username || '',
        mobile: userinfo.mobile || '',
        platform_id: platform_id,
        channel_id: channel_id,
        track_id: storage.getItem('track') || getQueryStringArgs()['track'] || '',
        h5_version: h5_version,
        access_uuid: storage.getItem('access_uuid'),
        screen: b.width + "*" + b.height + "*" + b.colorDepth
    };
    var dataClient = {};
    dataClient.WEB_PATH = 'http://data.1.gaopeng.com';
    dataClient.init = function (window) {
        var it = this;
        window.dataClient = it;
        //检测是否支持DOM2级事件
        var isSupported = document.implementation.hasFeature('HTMLEvents', '2.0');
        if (!isSupported)
            return;

        var loadEvent = function () {
            postData.title = document.title;
            postData.end_time = (new Date()).getTime() / 1000; //离开网页时时间
            //判断用户是否打开页面还是刷新
            if (is_opened()) {
                postData.is_opened = 1;
            } else {
                postData.is_opened = 0;
            }

            it.post({
                url: it.WEB_PATH + '/api/api_receiver/access_h5',
                data: postData
            });
            //待body加载完
            document.body.addEventListener('click', function (event) {
                var postData = {
                    url: document.URL,
                    domain: document.domain,
                    custom: '',
                    node_name: '',
                    node_value: '',
                    href: '',
                    img_src: '',
                    parent_custom: '',
                    uid: userinfo.uid || 0,
                    username: userinfo.username || '',
                    mobile: userinfo.mobile || '',
                    client_time: (new Date()).getTime() / 1000,
                    h5_version: h5_version,
                    access_uuid: storage.getItem('access_uuid')
                };
                var target = event.target;
                //自定义内容，目标按钮的自定义事件
                postData.custom = target.getAttribute('data-custom') || '';
                postData.node_name = target.nodeName;
                postData.node_value = getText(target);

                //模拟冒泡
                var currentTarget = target;
                while (currentTarget !== this && currentTarget.getAttribute('data-custom') === null) {
                    if (currentTarget.nodeName === 'A') {
                        //获取链接
                        postData.href = currentTarget.getAttribute('href');
                    }
                    if (currentTarget.nodeName === 'IMG') {
                        postData.img_src = currentTarget.getAttribute('src');
                    }
                    currentTarget = currentTarget.parentNode;
                    if (!currentTarget || currentTarget.nodeType !== 1) {
                        break;
                    }
                }
                postData.parent_custom = currentTarget && currentTarget.getAttribute('data-custom') || '';

                if (postData.parent_custom != '' || postData.custom != '') {
                    it.post({
                        url: it.WEB_PATH + '/api/api_receiver/action_h5',
                        data: postData
                    });
                }


            }, false);
        };
        var unloadEvent = function () {
            postData.title = document.title;
            postData.end_time = (new Date()).getTime() / 1000; //离开网页时时间

            it.post({
                url: it.WEB_PATH + '/api/api_receiver/access_h5',
                data: postData
            });
        };
        //页面加载完成
        window.addEventListener('load', loadEvent, false);
        //页面卸载完成
        //window.addEventListener('unload', unloadEvent, false);

//        document.body.addEventListener('click', function (event) {
//            var target = event.target;
//            console.log(target);
//        }, false);


    };

    //数据发送到服务器
    dataClient.post = function (obj) {
        var img = new Image();
        img.src = obj.url + "?" + serialize(obj.data);
    };

    //用户注册数据
    dataClient.login = function (userinfo) {
        var it = this;
        postData.title = document.title;
        postData.end_time = (new Date()).getTime() / 1000; //离开网页时时间
        postData.uid = userinfo.uid || 0;
        postData.username = userinfo.username || '';
        postData.mobile = userinfo.mobile || '';
        it.post({
            url: it.WEB_PATH + '/api/api_receiver/access_h5',
            data: postData
        });
    };

    dataClient.pay_success = function (uid, money, pay_type, domain) {
        var it = this;
        var data = {
            platform_id: postData.platform_id,
            channel_id: postData.channel_id,
            track_id: postData.track_id,
            app_version: postData.h5_version,
            domain: domain || postData.domain,
            uid: uid,
            money: money,
            pay_type: pay_type
        };
        it.post({
            url: it.WEB_PATH + '/api/api_receiver/client_payment_h5',
            data: data
        });
    };
    dataClient.init(window);
})(window);



