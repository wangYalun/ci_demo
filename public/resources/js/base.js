var base = {
    $: $,
    classNames: function () {
        var hasOwn = {}.hasOwnProperty;
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg)
                continue;
            var argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            } else if (Array.isArray(arg)) {
                classes.push(classNames.apply(null, arg));
            } else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
        return classes.join(' ');
    },
    //扩展方法
    extend: function () {
        var options, src, copy,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length;
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    copy = options[name];
                    target[name] = copy;
                }
            }
        }
        return target;
    },
    defineClass: function (initFun, obj) {
        var it = this;
        it.extend(obj);
        it.$(document).ready(function () {
            if (obj[initFun]) {
                it[initFun]();
            }
        });
    },
    getQueryStringArgs: function () {
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
    },
    doAjax: function (obj) {
        var config = {
            url: obj.url,
            method: obj.method || 'get',
            data: obj.data || {},
            dataType: 'json'
        };
        var doneCallback = obj.success;
        this.$.ajax(config).done(doneCallback).fail(function () {
            console.log('error');
        }).always(function () {

        });
    },
    pageList: function (obj) {
        var it = this;
    },
    getFormData: function (form) {
        var parts = {},
                field = null,
                i,
                len,
                j,
                optLen,
                option,
                optValue;
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            switch (field.type) {
                case "select-one":
                case "select-multiple":
                    if (field.name.length) {
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j];
                            if (option.selected) {
                                optValue = "";
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute("value") ? option.value : option.text);
                                } else {
                                    optValue = (option.attributes["value"].specified ? option.value : option.text);
                                }
                                //parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                                parts[encodeURIComponent(field.name)] = encodeURIComponent(field.value);
                            }
                        }
                    }
                    break;
                case undefined:
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;
                case "radio":
                case "checkbox":
                    if (!field.checked) {
                        break;
                    }
                default:
                    if (field.name.length) {
                        parts[encodeURIComponent(field.name)] = encodeURIComponent(field.value);
                        //parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }
            }
        }
        return parts;
    },
    dateFormat: function (day1) {
        var year = day1.getFullYear();
        var month = day1.getMonth() + 1;
        var day = day1.getDate();
        return year + "-" + (month >= 10 ? month : "0" + month) + "-" + (day >= 10 ? day : "0" + day);
    },
    numFormat: function (s, format) {
        var n = 0;
        if (format === void 0) {
            return s;
        }
        switch (format) {
            case 'money':
                n = 0;
                break;
            default:
                n = 0;
        }

        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++)
        {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    tableFormat: function (data, filter) {
        if (!filter.format) {
            return '<td>' + (data || '--') + (filter.postfix || '') + '</td>';
        }
        var tdValue = '';
        switch (filter.format) {
            case 'avatar':
                tdValue = '<td><img src="' + data + '" class="avatar"></td>';
                break;
            case 'img':
                tdValue = '<td><img src="' + data + '" class="table-img"></td>';
                break;
            case '%':
                tdValue = '<td>' + ((data * 100).toFixed(2) || '--') + '%' + '</td>';
                break;
            case 'title':
                tdValue = '<td title="' + data + '">' + this.delHtml(data, filter.limit, '...') + '</td>';
                break;
            default:
                tdValue = '<td>' + (data || '--') + (filter.postfix || '') + '</td>';
        }
        return tdValue;
    },
    exportCSV: function (fun, data) {
        window.location.href = 'http://' + document.domain + '/api/api_csv/' + fun + '?' + this.serialize(data);
    },
    serialize: function (obj) {
        var parts = [];
        for (var i in obj) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
        return parts.join("&");
    },
    delHtml: function (html, len, str) {
        var title = (html || "").replace(/<[^>]+>/g, "").replace(/\n/g, " "); //去掉所有的html标记
        if (title.length > len) {
            title = title.substring(0, len);
            if (str) {
                title = title + str;
            }
        }
        return title;
    }
};