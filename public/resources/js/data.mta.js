(function (e) {
    e.MtaH5 = e.MtaH5 || {};
    MtaH5.hack = function () {
        var c = document.getElementsByName("MTAH5"),
                e = {
                    conf: {
                        senseHash: !0,
                        autoReport: !0,
                        performanceMonitor: !0
                    }
                };
        if (0 == c.length)
            for (var h = document.getElementsByTagName("script"), g = 0; g < h.length; g++)
                if ("undefined" !== typeof h[g].attributes.name && "MTAH5" == h[g].attributes.name.nodeValue) {
                    c = [];
                    c.push(h[g]);
                    break
                }
        if (0 < c.length && ("undefined" !== typeof c[0].attributes.sid && (e.conf.sid = c[0].attributes.sid.nodeValue), "undefined" !== typeof c[0].attributes.cid && (e.conf.cid = c[0].attributes.cid.nodeValue), "undefined" !== typeof c[0].attributes.opts && "undefined" !== typeof JSON)) {
            var c = JSON.parse(c[0].attributes.opts.nodeValue),
                    l;
            for (l in c)
                c.hasOwnProperty(l) && (e.conf[l] = c[l])
        }
        return e
    }
})(this);
(function (e, c) {
    function r(a) {
        a = window.localStorage ? localStorage.getItem(a) || sessionStorage.getItem(a) : (a = document.cookie.match(new RegExp("(?:^|;\\s)" + a + "=(.*?)(?:;\\s|$)"))) ? a[1] : "";
        return a
    }
    function h(a, b, n) {
        if (window.localStorage)
            n ? localStorage.setItem(a, b) : sessionStorage.setItem(a, b);
        else {
            var d = window.location.host,
                    c = {
                        "com.cn": 1,
                        "js.cn": 1,
                        "net.cn": 1,
                        "gov.cn": 1,
                        "com.hk": 1,
                        "co.nz": 1
                    },
            f = d.split(".");
            2 < f.length && (d = (c[f.slice(-2).join(".")] ? f.slice(-3) : f.slice(-2)).join("."));
            document.cookie = a + "=" + b + ";path=/;domain=" + d + (n ? ";expires=" + n : "")
        }
    }
    function g(a) {
        var b, n, d, c = {};
        void 0 === a ? (d = window.location, a = d.host, b = d.pathname, n = d.search.substr(1), d = d.hash) : (d = a.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i) || [], a = d[1], b = d[2], n = d[3], d = d[4]);
        void 0 !== d && (d = d.replace(/\"|\'|\<|\>/ig, "M"));
        if (n)
            for (var f = n.split("&"), k = 0, y = f.length; k < y; k++)
                if (-1 != f[k].indexOf("=")) {
                    var e = f[k].indexOf("="),
                            m = f[k].slice(0, e),
                            e = f[k].slice(e + 1);
                    c[m] = e
                }
        return {
            host: a,
            path: b,
            search: n,
            hash: d,
            param: c
        }
    }
    function l(a) {
        return (a || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10
    }
    function t() {
        var a = g(),
                b = {
                    dm: a.host,
                    pvi: "",
                    si: "",
                    url: a.path,
                    arg: encodeURIComponent(a.search || ""),
                    ty: 1
                };
        b.pvi = function () {
            var a = r("pgv_pvi");
            a || (b.ty = 0, a = l(), h("pgv_pvi", a, "Sun, 18 Jan 2038 00:00:00 GMT;"));
            return a
        }();
        b.si = function () {
            var a = r("pgv_si");
            a || (a = l("s"), h("pgv_si", a));
            return a
        }();
        b.url = function () {
            var b = a.path;
            e.senseHash && (b = a.hash ? b + a.hash.replace(/#/i, "_") : b);
            return b
        }();
        return b
    }
    function u() {
        var a = g(document.referrer),
                b = g();
        return {
            rdm: a.host,
            rurl: a.path,
            rarg: encodeURIComponent(a.search || ""),
            adt: b.param.ADTAG || b.param.adtag || b.param.PTAG || b.param.ptag
        }
    }
    function v() {
        try {
            var a = navigator,
                    b = screen || {
                        width: "",
                        height: "",
                        colorDepth: ""
                    },
            c = {
                scr: b.width + "x" + b.height,
                scl: b.colorDepth + "-bit",
                lg: (a.language || a.userLanguage).toLowerCase(),
                tz: (new Date).getTimezoneOffset() / 60
            }
        } catch (d) {
            return {}
        }
        return c
    }
    function w(a) {
        a = a || {};
        for (var b in a)
            a.hasOwnProperty(b) && (e[b] = a[b]);
        if (e.sid) {
            var c = [];
            a = 0;
            for (var d = [t(), u(),
                {
                    r2: e.sid
                },
                v(),
                {
                    random: +new Date
                }], g = d.length; a < g; a++)
                for (b in d[a])
                    d[a].hasOwnProperty(b) && c.push(b + "=" + (d[a][b] || ""));
            var f = function (a) {
                a = Ta.src = ("https:" == document.location.protocol ? "https://pingtas" : "http://pingtcss") + ".qq.com/pingd?" + a.join("&");
                var b = new Image;
                Ta[e.sid] = b;
                b.onload = b.onerror = b.onabort = function () {
                    b = b.onload = b.onerror = b.onabort = null;
                    Ta[e.sid] = !0
                };
                b.src = a
            };
            e.performanceMonitor ? (b = function () {
                var a;
                if (window.performance) {
                    a = window.performance.timing;
                    var b = {
                        value: a.domainLookupEnd - a.domainLookupStart
                    },
                    d = {
                        value: a.connectEnd - a.connectStart
                    },
                    e = {
                        value: a.responseStart - (a.requestStart || a.responseStart + 1)
                    },
                    q = a.responseEnd - a.responseStart;
                    a.domContentLoadedEventStart ? 0 > q && (q = 0) : q = -1;
                    a = {
                        domainLookupTime: b,
                        connectTime: d,
                        requestTime: e,
                        resourcesLoadedTime: {
                            value: q
                        },
                        domParsingTime: {
                            value: a.domContentLoadedEventStart ? a.domInteractive - a.domLoading : -1
                        },
                        domContentLoadedTime: {
                            value: a.domContentLoadedEventStart ? a.domContentLoadedEventStart - a.fetchStart : -1
                        }
                    }
                } else
                    a = "";
                var b = [],
                        p;
                for (p in a)
                    a.hasOwnProperty(p) && ("domContentLoadedTime" == p ? c.push("r3=" + a[p].value) : b.push(a[p].value));
                c.push("ext=pfm=" + b.join("_"));
                f(c)
            }, "undefined" !== typeof window.performance && "undefined" !== typeof window.performance.timing && 0 != window.performance.timing.loadEventEnd ? b() : window.attachEvent ? window.attachEvent("onload", b) : window.addEventListener && window.addEventListener("load", b, !1)) : f(c)
        }
    }
    c.MtaH5 = c.MtaH5 || {};
    c.Ta = c.Ta || {};
    MtaH5.pgv = w;
    Ta.clickStat = MtaH5.clickStat = function (a, b) {
        var c = MtaH5.hack ? MtaH5.hack() : "",
                d = {};
        c.conf &&
                function () {
                    var a = c.conf,
                            b;
                    for (b in a)
                        a.hasOwnProperty(b) && (d[b] = a[b])
                }();
        if (d.cid) {
            var g = [],
                    f = t(),
                    k = {
                        r2: e.sid
                    };
            f.dm = "TACLICK";
            f.url = a;
            k.r2 = d.cid;
            k.r5 = function (a) {
                a = "undefined" === typeof a ? {} : a;
                var b = [],
                        c;
                for (c in a)
                    a.hasOwnProperty(c) && b.push(c + "=" + a[c]);
                return b.join(";")
            }(b);
            for (var h = 0, f = [f, u(), k, v(),
                {
                    random: +new Date
                }], k = f.length; h < k; h++)
                for (var l in f[h])
                    f[h].hasOwnProperty(l) && g.push(l + "=" + (f[h][l] || ""));
            var g = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas" : "http://pingtcss") + ".qq.com/pingd?" + g.join("&"),
                    m = new Image;
            MtaH5["click_" + d.sid] = m;
            m.onload = m.onerror = m.onabort = function () {
                m = m.onload = m.onerror = m.onabort = null;
                MtaH5[d.sid] = !0
            };
            m.src = g
        }
    };
    var x = MtaH5.hack ? MtaH5.hack() : {};
    x.conf &&
            function () {
                var a = x.conf,
                        b;
                for (b in a)
                    a.hasOwnProperty(b) && (e[b] = a[b])
            }();
    e.autoReport && w()
})({}, this);