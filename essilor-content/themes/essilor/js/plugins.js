! function() {
    for (var t, e = function() {}, i = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], n = i.length, s = window.console = window.console || {}; n--;) t = i[n], s[t] || (s[t] = e)
}(),
function(t) {
    t.fn.hoverIntent = function(e, i, n) {
        var s = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        s = "object" == typeof e ? t.extend(s, e) : t.isFunction(i) ? t.extend(s, {
            over: e,
            out: i,
            selector: n
        }) : t.extend(s, {
            over: e,
            out: e,
            selector: i
        });
        var o, r, a, l, c = function(t) {
                o = t.pageX, r = t.pageY
            },
            u = function(e, i) {
                return i.hoverIntent_t = clearTimeout(i.hoverIntent_t), Math.sqrt((a - o) * (a - o) + (l - r) * (l - r)) < s.sensitivity ? (t(i).off("mousemove.hoverIntent", c), i.hoverIntent_s = !0, s.over.apply(i, [e])) : (a = o, l = r, i.hoverIntent_t = setTimeout(function() {
                    u(e, i)
                }, s.interval), void 0)
            },
            p = function(t, e) {
                return e.hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = !1, s.out.apply(e, [t])
            },
            d = function(e) {
                var i = t.extend({}, e),
                    n = this;
                n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)), "mouseenter" === e.type ? (a = i.pageX, l = i.pageY, t(n).on("mousemove.hoverIntent", c), n.hoverIntent_s || (n.hoverIntent_t = setTimeout(function() {
                    u(i, n)
                }, s.interval))) : (t(n).off("mousemove.hoverIntent", c), n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function() {
                    p(i, n)
                }, s.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": d,
            "mouseleave.hoverIntent": d
        }, s.selector)
    }
}(jQuery),
function($) {
    function sc_setScroll(t, e, i) {
        return "transition" == i.transition && "swing" == e && (e = "ease"), {
            anims: [],
            duration: t,
            orgDuration: t,
            easing: e,
            startTime: getTime()
        }
    }

    function sc_startScroll(t, e) {
        for (var i = 0, n = t.anims.length; n > i; i++) {
            var s = t.anims[i];
            s && s[0][e.transition](s[1], t.duration, t.easing, s[2])
        }
    }

    function sc_stopScroll(t, e) {
        is_boolean(e) || (e = !0), is_object(t.pre) && sc_stopScroll(t.pre, e);
        for (var i = 0, n = t.anims.length; n > i; i++) {
            var s = t.anims[i];
            s[0].stop(!0), e && (s[0].css(s[1]), is_function(s[2]) && s[2]())
        }
        is_object(t.post) && sc_stopScroll(t.post, e)
    }

    function sc_afterScroll(t, e, i) {
        switch (e && e.remove(), i.fx) {
            case "fade":
            case "crossfade":
            case "cover-fade":
            case "uncover-fade":
                t.css("opacity", 1), t.css("filter", "")
        }
    }

    function sc_fireCallbacks(t, e, i, n, s) {
        if (e[i] && e[i].call(t, n), s[i].length)
            for (var o = 0, r = s[i].length; r > o; o++) s[i][o].call(t, n);
        return []
    }

    function sc_fireQueue(t, e, i) {
        return e.length && (t.trigger(cf_e(e[0][0], i), e[0][1]), e.shift()), e
    }

    function sc_hideHiddenItems(t) {
        t.each(function() {
            var t = $(this);
            t.data("_cfs_isHidden", t.is(":hidden")).hide()
        })
    }

    function sc_showHiddenItems(t) {
        t && t.each(function() {
            var t = $(this);
            t.data("_cfs_isHidden") || t.show()
        })
    }

    function sc_clearTimers(t) {
        return t.auto && clearTimeout(t.auto), t.progress && clearInterval(t.progress), t
    }

    function sc_mapCallbackArguments(t, e, i, n, s, o, r) {
        return {
            width: r.width,
            height: r.height,
            items: {
                old: t,
                skipped: e,
                visible: i
            },
            scroll: {
                items: n,
                direction: s,
                duration: o
            }
        }
    }

    function sc_getDuration(t, e, i, n) {
        var s = t.duration;
        return "none" == t.fx ? 0 : ("auto" == s ? s = e.scroll.duration / e.scroll.items * i : 10 > s && (s = n / s), 1 > s ? 0 : ("fade" == t.fx && (s /= 2), Math.round(s)))
    }

    function nv_showNavi(t, e, i) {
        var n = is_number(t.items.minimum) ? t.items.minimum : t.items.visible + 1;
        if ("show" == e || "hide" == e) var s = e;
        else if (n > e) {
            debug(i, "Not enough items (" + e + " total, " + n + " needed): Hiding navigation.");
            var s = "hide"
        } else var s = "show";
        var o = "show" == s ? "removeClass" : "addClass",
            r = cf_c("hidden", i);
        t.auto.button && t.auto.button[s]()[o](r), t.prev.button && t.prev.button[s]()[o](r), t.next.button && t.next.button[s]()[o](r), t.pagination.container && t.pagination.container[s]()[o](r)
    }

    function nv_enableNavi(t, e, i) {
        if (!t.circular && !t.infinite) {
            var n = "removeClass" == e || "addClass" == e ? e : !1,
                s = cf_c("disabled", i);
            if (t.auto.button && n && t.auto.button[n](s), t.prev.button) {
                var o = n || 0 == e ? "addClass" : "removeClass";
                t.prev.button[o](s)
            }
            if (t.next.button) {
                var o = n || e == t.items.visible ? "addClass" : "removeClass";
                t.next.button[o](s)
            }
        }
    }

    function go_getObject(t, e) {
        return is_function(e) ? e = e.call(t) : is_undefined(e) && (e = {}), e
    }

    function go_getItemsObject(t, e) {
        return e = go_getObject(t, e), is_number(e) ? e = {
            visible: e
        } : "variable" == e ? e = {
            visible: e,
            width: e,
            height: e
        } : is_object(e) || (e = {}), e
    }

    function go_getScrollObject(t, e) {
        return e = go_getObject(t, e), is_number(e) ? e = 50 >= e ? {
            items: e
        } : {
            duration: e
        } : is_string(e) ? e = {
            easing: e
        } : is_object(e) || (e = {}), e
    }

    function go_getNaviObject(t, e) {
        if (e = go_getObject(t, e), is_string(e)) {
            var i = cf_getKeyCode(e);
            e = -1 == i ? $(e) : i
        }
        return e
    }

    function go_getAutoObject(t, e) {
        return e = go_getNaviObject(t, e), is_jquery(e) ? e = {
            button: e
        } : is_boolean(e) ? e = {
            play: e
        } : is_number(e) && (e = {
            timeoutDuration: e
        }), e.progress && (is_string(e.progress) || is_jquery(e.progress)) && (e.progress = {
            bar: e.progress
        }), e
    }

    function go_complementAutoObject(t, e) {
        return is_function(e.button) && (e.button = e.button.call(t)), is_string(e.button) && (e.button = $(e.button)), is_boolean(e.play) || (e.play = !0), is_number(e.delay) || (e.delay = 0), is_undefined(e.pauseOnEvent) && (e.pauseOnEvent = !0), is_boolean(e.pauseOnResize) || (e.pauseOnResize = !0), is_number(e.timeoutDuration) || (e.timeoutDuration = 10 > e.duration ? 2500 : 5 * e.duration), e.progress && (is_function(e.progress.bar) && (e.progress.bar = e.progress.bar.call(t)), is_string(e.progress.bar) && (e.progress.bar = $(e.progress.bar)), e.progress.bar ? (is_function(e.progress.updater) || (e.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(e.progress.interval) || (e.progress.interval = 50)) : e.progress = !1), e
    }

    function go_getPrevNextObject(t, e) {
        return e = go_getNaviObject(t, e), is_jquery(e) ? e = {
            button: e
        } : is_number(e) && (e = {
            key: e
        }), e
    }

    function go_complementPrevNextObject(t, e) {
        return is_function(e.button) && (e.button = e.button.call(t)), is_string(e.button) && (e.button = $(e.button)), is_string(e.key) && (e.key = cf_getKeyCode(e.key)), e
    }

    function go_getPaginationObject(t, e) {
        return e = go_getNaviObject(t, e), is_jquery(e) ? e = {
            container: e
        } : is_boolean(e) && (e = {
            keys: e
        }), e
    }

    function go_complementPaginationObject(t, e) {
        return is_function(e.container) && (e.container = e.container.call(t)), is_string(e.container) && (e.container = $(e.container)), is_number(e.items) || (e.items = !1), is_boolean(e.keys) || (e.keys = !1), is_function(e.anchorBuilder) || is_false(e.anchorBuilder) || (e.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(e.deviation) || (e.deviation = 0), e
    }

    function go_getSwipeObject(t, e) {
        return is_function(e) && (e = e.call(t)), is_undefined(e) && (e = {
            onTouch: !1
        }), is_true(e) ? e = {
            onTouch: e
        } : is_number(e) && (e = {
            items: e
        }), e
    }

    function go_complementSwipeObject(t, e) {
        return is_boolean(e.onTouch) || (e.onTouch = !0), is_boolean(e.onMouse) || (e.onMouse = !1), is_object(e.options) || (e.options = {}), is_boolean(e.options.triggerOnTouchEnd) || (e.options.triggerOnTouchEnd = !1), e
    }

    function go_getMousewheelObject(t, e) {
        return is_function(e) && (e = e.call(t)), is_true(e) ? e = {} : is_number(e) ? e = {
            items: e
        } : is_undefined(e) && (e = !1), e
    }

    function go_complementMousewheelObject(t, e) {
        return e
    }

    function gn_getItemIndex(t, e, i, n, s) {
        if (is_string(t) && (t = $(t, s)), is_object(t) && (t = $(t, s)), is_jquery(t) ? (t = s.children().index(t), is_boolean(i) || (i = !1)) : is_boolean(i) || (i = !0), is_number(t) || (t = 0), is_number(e) || (e = 0), i && (t += n.first), t += e, n.total > 0) {
            for (; t >= n.total;) t -= n.total;
            for (; 0 > t;) t += n.total
        }
        return t
    }

    function gn_getVisibleItemsPrev(t, e, i) {
        for (var n = 0, s = 0, o = i; o >= 0; o--) {
            var r = t.eq(o);
            if (n += r.is(":visible") ? r[e.d.outerWidth](!0) : 0, n > e.maxDimension) return s;
            0 == o && (o = t.length), s++
        }
    }

    function gn_getVisibleItemsPrevFilter(t, e, i) {
        return gn_getItemsPrevFilter(t, e.items.filter, e.items.visibleConf.org, i)
    }

    function gn_getScrollItemsPrevFilter(t, e, i, n) {
        return gn_getItemsPrevFilter(t, e.items.filter, n, i)
    }

    function gn_getItemsPrevFilter(t, e, i, n) {
        for (var s = 0, o = 0, r = n, a = t.length; r >= 0; r--) {
            if (o++, o == a) return o;
            var l = t.eq(r);
            if (l.is(e) && (s++, s == i)) return o;
            0 == r && (r = a)
        }
    }

    function gn_getVisibleOrg(t, e) {
        return e.items.visibleConf.org || t.children().slice(0, e.items.visible).filter(e.items.filter).length
    }

    function gn_getVisibleItemsNext(t, e, i) {
        for (var n = 0, s = 0, o = i, r = t.length - 1; r >= o; o++) {
            var a = t.eq(o);
            if (n += a.is(":visible") ? a[e.d.outerWidth](!0) : 0, n > e.maxDimension) return s;
            if (s++, s == r + 1) return s;
            o == r && (o = -1)
        }
    }

    function gn_getVisibleItemsNextTestCircular(t, e, i, n) {
        var s = gn_getVisibleItemsNext(t, e, i);
        return e.circular || i + s > n && (s = n - i), s
    }

    function gn_getVisibleItemsNextFilter(t, e, i) {
        return gn_getItemsNextFilter(t, e.items.filter, e.items.visibleConf.org, i, e.circular)
    }

    function gn_getScrollItemsNextFilter(t, e, i, n) {
        return gn_getItemsNextFilter(t, e.items.filter, n + 1, i, e.circular) - 1
    }

    function gn_getItemsNextFilter(t, e, i, n) {
        for (var s = 0, o = 0, r = n, a = t.length - 1; a >= r; r++) {
            if (o++, o >= a) return o;
            var l = t.eq(r);
            if (l.is(e) && (s++, s == i)) return o;
            r == a && (r = -1)
        }
    }

    function gi_getCurrentItems(t, e) {
        return t.slice(0, e.items.visible)
    }

    function gi_getOldItemsPrev(t, e, i) {
        return t.slice(i, e.items.visibleConf.old + i)
    }

    function gi_getNewItemsPrev(t, e) {
        return t.slice(0, e.items.visible)
    }

    function gi_getOldItemsNext(t, e) {
        return t.slice(0, e.items.visibleConf.old)
    }

    function gi_getNewItemsNext(t, e, i) {
        return t.slice(i, e.items.visible + i)
    }

    function sz_storeMargin(t, e, i) {
        e.usePadding && (is_string(i) || (i = "_cfs_origCssMargin"), t.each(function() {
            var t = $(this),
                n = parseInt(t.css(e.d.marginRight), 10);
            is_number(n) || (n = 0), t.data(i, n)
        }))
    }

    function sz_resetMargin(t, e, i) {
        if (e.usePadding) {
            var n = is_boolean(i) ? i : !1;
            is_number(i) || (i = 0), sz_storeMargin(t, e, "_cfs_tempCssMargin"), t.each(function() {
                var t = $(this);
                t.css(e.d.marginRight, n ? t.data("_cfs_tempCssMargin") : i + t.data("_cfs_origCssMargin"))
            })
        }
    }

    function sz_storeOrigCss(t) {
        t.each(function() {
            var t = $(this);
            t.data("_cfs_origCss", t.attr("style") || "")
        })
    }

    function sz_restoreOrigCss(t) {
        t.each(function() {
            var t = $(this);
            t.attr("style", t.data("_cfs_origCss") || "")
        })
    }

    function sz_setResponsiveSizes(t, e) {
        var i = (t.items.visible, t.items[t.d.width]),
            n = t[t.d.height],
            s = is_percentage(n);
        e.each(function() {
            var e = $(this),
                o = i - ms_getPaddingBorderMargin(e, t, "Width");
            e[t.d.width](o), s && e[t.d.height](ms_getPercentage(o, n))
        })
    }

    function sz_setSizes(t, e) {
        var i = t.parent(),
            n = t.children(),
            s = gi_getCurrentItems(n, e),
            o = cf_mapWrapperSizes(ms_getSizes(s, e, !0), e, !1);
        if (i.css(o), e.usePadding) {
            var r = e.padding,
                a = r[e.d[1]];
            e.align && 0 > a && (a = 0);
            var l = s.last();
            l.css(e.d.marginRight, l.data("_cfs_origCssMargin") + a), t.css(e.d.top, r[e.d[0]]), t.css(e.d.left, r[e.d[3]])
        }
        return t.css(e.d.width, o[e.d.width] + 2 * ms_getTotalSize(n, e, "width")), t.css(e.d.height, ms_getLargestSize(n, e, "height")), o
    }

    function ms_getSizes(t, e, i) {
        return [ms_getTotalSize(t, e, "width", i), ms_getLargestSize(t, e, "height", i)]
    }

    function ms_getLargestSize(t, e, i, n) {
        return is_boolean(n) || (n = !1), is_number(e[e.d[i]]) && n ? e[e.d[i]] : is_number(e.items[e.d[i]]) ? e.items[e.d[i]] : (i = i.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(t, e, i))
    }

    function ms_getTrueLargestSize(t, e, i) {
        for (var n = 0, s = 0, o = t.length; o > s; s++) {
            var r = t.eq(s),
                a = r.is(":visible") ? r[e.d[i]](!0) : 0;
            a > n && (n = a)
        }
        return n
    }

    function ms_getTotalSize(t, e, i, n) {
        if (is_boolean(n) || (n = !1), is_number(e[e.d[i]]) && n) return e[e.d[i]];
        if (is_number(e.items[e.d[i]])) return e.items[e.d[i]] * t.length;
        for (var s = i.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", o = 0, r = 0, a = t.length; a > r; r++) {
            var l = t.eq(r);
            o += l.is(":visible") ? l[e.d[s]](!0) : 0
        }
        return o
    }

    function ms_getParentSize(t, e, i) {
        var n = t.is(":visible");
        n && t.hide();
        var s = t.parent()[e.d[i]]();
        return n && t.show(), s
    }

    function ms_getMaxDimension(t, e) {
        return is_number(t[t.d.width]) ? t[t.d.width] : e
    }

    function ms_hasVariableSizes(t, e, i) {
        for (var n = !1, s = !1, o = 0, r = t.length; r > o; o++) {
            var a = t.eq(o),
                l = a.is(":visible") ? a[e.d[i]](!0) : 0;
            n === !1 ? n = l : n != l && (s = !0), 0 == n && (s = !0)
        }
        return s
    }

    function ms_getPaddingBorderMargin(t, e, i) {
        return t[e.d["outer" + i]](!0) - t[e.d[i.toLowerCase()]]()
    }

    function ms_getPercentage(t, e) {
        if (is_percentage(e)) {
            if (e = parseInt(e.slice(0, -1), 10), !is_number(e)) return t;
            t *= e / 100
        }
        return t
    }

    function cf_e(t, e, i, n, s) {
        return is_boolean(i) || (i = !0), is_boolean(n) || (n = !0), is_boolean(s) || (s = !1), i && (t = e.events.prefix + t), n && (t = t + "." + e.events.namespace), n && s && (t += e.serialNumber), t
    }

    function cf_c(t, e) {
        return is_string(e.classnames[t]) ? e.classnames[t] : t
    }

    function cf_mapWrapperSizes(t, e, i) {
        is_boolean(i) || (i = !0);
        var n = e.usePadding && i ? e.padding : [0, 0, 0, 0],
            s = {};
        return s[e.d.width] = t[0] + n[1] + n[3], s[e.d.height] = t[1] + n[0] + n[2], s
    }

    function cf_sortParams(t, e) {
        for (var i = [], n = 0, s = t.length; s > n; n++)
            for (var o = 0, r = e.length; r > o; o++)
                if (e[o].indexOf(typeof t[n]) > -1 && is_undefined(i[o])) {
                    i[o] = t[n];
                    break
                }
        return i
    }

    function cf_getPadding(t) {
        if (is_undefined(t)) return [0, 0, 0, 0];
        if (is_number(t)) return [t, t, t, t];
        if (is_string(t) && (t = t.split("px").join("").split("em").join("").split(" ")), !is_array(t)) return [0, 0, 0, 0];
        for (var e = 0; 4 > e; e++) t[e] = parseInt(t[e], 10);
        switch (t.length) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                return [t[0], t[0], t[0], t[0]];
            case 2:
                return [t[0], t[1], t[0], t[1]];
            case 3:
                return [t[0], t[1], t[2], t[1]];
            default:
                return [t[0], t[1], t[2], t[3]]
        }
    }

    function cf_getAlignPadding(t, e) {
        var i = is_number(e[e.d.width]) ? Math.ceil(e[e.d.width] - ms_getTotalSize(t, e, "width")) : 0;
        switch (e.align) {
            case "left":
                return [0, i];
            case "right":
                return [i, 0];
            case "center":
            default:
                return [Math.ceil(i / 2), Math.floor(i / 2)]
        }
    }

    function cf_getDimensions(t) {
        for (var e = [
                ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
                ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
            ], i = e[0].length, n = "right" == t.direction || "left" == t.direction ? 0 : 1, s = {}, o = 0; i > o; o++) s[e[0][o]] = e[n][o];
        return s
    }

    function cf_getAdjust(t, e, i, n) {
        var s = t;
        if (is_function(i)) s = i.call(n, s);
        else if (is_string(i)) {
            var o = i.split("+"),
                r = i.split("-");
            if (r.length > o.length) var a = !0,
                l = r[0],
                c = r[1];
            else var a = !1,
                l = o[0],
                c = o[1];
            switch (l) {
                case "even":
                    s = 1 == t % 2 ? t - 1 : t;
                    break;
                case "odd":
                    s = 0 == t % 2 ? t - 1 : t;
                    break;
                default:
                    s = t
            }
            c = parseInt(c, 10), is_number(c) && (a && (c = -c), s += c)
        }
        return (!is_number(s) || 1 > s) && (s = 1), s
    }

    function cf_getItemsAdjust(t, e, i, n) {
        return cf_getItemAdjustMinMax(cf_getAdjust(t, e, i, n), e.items.visibleConf)
    }

    function cf_getItemAdjustMinMax(t, e) {
        return is_number(e.min) && e.min > t && (t = e.min), is_number(e.max) && t > e.max && (t = e.max), 1 > t && (t = 1), t
    }

    function cf_getSynchArr(t) {
        is_array(t) || (t = [
            [t]
        ]), is_array(t[0]) || (t = [t]);
        for (var e = 0, i = t.length; i > e; e++) is_string(t[e][0]) && (t[e][0] = $(t[e][0])), is_boolean(t[e][1]) || (t[e][1] = !0), is_boolean(t[e][2]) || (t[e][2] = !0), is_number(t[e][3]) || (t[e][3] = 0);
        return t
    }

    function cf_getKeyCode(t) {
        return "right" == t ? 39 : "left" == t ? 37 : "up" == t ? 38 : "down" == t ? 40 : -1
    }

    function cf_setCookie(t, e, i) {
        if (t) {
            var n = e.triggerHandler(cf_e("currentPosition", i));
            $.fn.carouFredSel.cookie.set(t, n)
        }
    }

    function cf_getCookie(t) {
        var e = $.fn.carouFredSel.cookie.get(t);
        return "" == e ? 0 : e
    }

    function in_mapCss(t, e) {
        for (var i = {}, n = 0, s = e.length; s > n; n++) i[e[n]] = t.css(e[n]);
        return i
    }

    function in_complementItems(t, e, i, n) {
        return is_object(t.visibleConf) || (t.visibleConf = {}), is_object(t.sizesConf) || (t.sizesConf = {}), 0 == t.start && is_number(n) && (t.start = n), is_object(t.visible) ? (t.visibleConf.min = t.visible.min, t.visibleConf.max = t.visible.max, t.visible = !1) : is_string(t.visible) ? ("variable" == t.visible ? t.visibleConf.variable = !0 : t.visibleConf.adjust = t.visible, t.visible = !1) : is_function(t.visible) && (t.visibleConf.adjust = t.visible, t.visible = !1), is_string(t.filter) || (t.filter = i.filter(":hidden").length > 0 ? ":visible" : "*"), t[e.d.width] || (e.responsive ? (debug(!0, "Set a " + e.d.width + " for the items!"), t[e.d.width] = ms_getTrueLargestSize(i, e, "outerWidth")) : t[e.d.width] = ms_hasVariableSizes(i, e, "outerWidth") ? "variable" : i[e.d.outerWidth](!0)), t[e.d.height] || (t[e.d.height] = ms_hasVariableSizes(i, e, "outerHeight") ? "variable" : i[e.d.outerHeight](!0)), t.sizesConf.width = t.width, t.sizesConf.height = t.height, t
    }

    function in_complementVisibleItems(t, e) {
        return "variable" == t.items[t.d.width] && (t.items.visibleConf.variable = !0), t.items.visibleConf.variable || (is_number(t[t.d.width]) ? t.items.visible = Math.floor(t[t.d.width] / t.items[t.d.width]) : (t.items.visible = Math.floor(e / t.items[t.d.width]), t[t.d.width] = t.items.visible * t.items[t.d.width], t.items.visibleConf.adjust || (t.align = !1)), ("Infinity" == t.items.visible || 1 > t.items.visible) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), t.items.visibleConf.variable = !0)), t
    }

    function in_complementPrimarySize(t, e, i) {
        return "auto" == t && (t = ms_getTrueLargestSize(i, e, "outerWidth")), t
    }

    function in_complementSecondarySize(t, e, i) {
        return "auto" == t && (t = ms_getTrueLargestSize(i, e, "outerHeight")), t || (t = e.items[e.d.height]), t
    }

    function in_getAlignPadding(t, e) {
        var i = cf_getAlignPadding(gi_getCurrentItems(e, t), t);
        return t.padding[t.d[1]] = i[1], t.padding[t.d[3]] = i[0], t
    }

    function in_getResponsiveValues(t, e) {
        var i = cf_getItemAdjustMinMax(Math.ceil(t[t.d.width] / t.items[t.d.width]), t.items.visibleConf);
        i > e.length && (i = e.length);
        var n = Math.floor(t[t.d.width] / i);
        return t.items.visible = i, t.items[t.d.width] = n, t[t.d.width] = i * n, t
    }

    function bt_pauseOnHoverConfig(t) {
        if (is_string(t)) var e = t.indexOf("immediate") > -1,
            i = t.indexOf("resume") > -1;
        else var e = i = !1;
        return [e, i]
    }

    function bt_mousesheelNumber(t) {
        return is_number(t) ? t : null
    }

    function is_null(t) {
        return null === t
    }

    function is_undefined(t) {
        return is_null(t) || void 0 === t || "" === t || "undefined" === t
    }

    function is_array(t) {
        return t instanceof Array
    }

    function is_jquery(t) {
        return t instanceof jQuery
    }

    function is_object(t) {
        return (t instanceof Object || "object" == typeof t) && !is_null(t) && !is_jquery(t) && !is_array(t) && !is_function(t)
    }

    function is_number(t) {
        return (t instanceof Number || "number" == typeof t) && !isNaN(t)
    }

    function is_string(t) {
        return (t instanceof String || "string" == typeof t) && !is_undefined(t) && !is_true(t) && !is_false(t)
    }

    function is_function(t) {
        return t instanceof Function || "function" == typeof t
    }

    function is_boolean(t) {
        return t instanceof Boolean || "boolean" == typeof t || is_true(t) || is_false(t)
    }

    function is_true(t) {
        return t === !0 || "true" === t
    }

    function is_false(t) {
        return t === !1 || "false" === t
    }

    function is_percentage(t) {
        return is_string(t) && "%" == t.slice(-1)
    }

    function getTime() {
        return (new Date).getTime()
    }

    function deprecated(t, e) {
        debug(!0, t + " is DEPRECATED, support for it will be removed. Use " + e + " instead.")
    }

    function debug(t, e) {
        if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
            if (is_object(t)) {
                var i = " (" + t.selector + ")";
                t = t.debug
            } else var i = "";
            if (!t) return !1;
            e = is_string(e) ? "carouFredSel" + i + ": " + e : ["carouFredSel" + i + ":", e], window.console.log(e)
        }
        return !1
    }
    $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
        if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this;
        if (this.length > 1) return this.each(function() {
            $(this).carouFredSel(options, configs)
        });
        var $cfs = this,
            $tt0 = this[0],
            starting_position = !1;
        $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {};
        FN._init = function(t, e, i) {
            t = go_getObject($tt0, t), t.items = go_getItemsObject($tt0, t.items), t.scroll = go_getScrollObject($tt0, t.scroll), t.auto = go_getAutoObject($tt0, t.auto), t.prev = go_getPrevNextObject($tt0, t.prev), t.next = go_getPrevNextObject($tt0, t.next), t.pagination = go_getPaginationObject($tt0, t.pagination), t.swipe = go_getSwipeObject($tt0, t.swipe), t.mousewheel = go_getMousewheelObject($tt0, t.mousewheel), e && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, t)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, t), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
            var n = $cfs.children(),
                s = ms_getParentSize($wrp, opts, "width");
            if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, s), opts.items = in_complementItems(opts.items, opts, n, i), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, n), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, n), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(s, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, s)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(n, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(n, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, n, s);
            else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
                case "center":
                case "left":
                case "right":
                    "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, n), opts.usePadding = !0);
                    break;
                default:
                    opts.align = !1, opts.usePadding = 0 != opts.padding[0] || 0 != opts.padding[1] || 0 != opts.padding[2] || 0 != opts.padding[3]
            }
            is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
        }, FN._build = function() {
            $cfs.data("_cfs_isCarousel", !0);
            var t = $cfs.children(),
                e = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
                i = "relative";
            switch (e.position) {
                case "absolute":
                case "fixed":
                    i = e.position
            }
            "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(e), $wrp.css({
                overflow: "hidden",
                position: i
            }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", e.zIndex), $cfs.css({
                textAlign: "left",
                "float": "none",
                position: "absolute",
                top: 0,
                right: "auto",
                bottom: "auto",
                left: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }), sz_storeMargin(t, opts), sz_storeOrigCss(t), opts.responsive && sz_setResponsiveSizes(opts, t)
        }, FN._bind_events = function() {
            FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function(t, e) {
                return t.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), e)), !0
            }), $cfs.bind(cf_e("finish", conf), function(t) {
                return t.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
            }), $cfs.bind(cf_e("pause", conf), function(t, e, i) {
                if (t.stopPropagation(), tmrs = sc_clearTimers(tmrs), e && crsl.isScrolling) {
                    scrl.isStopped = !0;
                    var n = getTime() - scrl.startTime;
                    scrl.duration -= n, scrl.pre && (scrl.pre.duration -= n), scrl.post && (scrl.post.duration -= n), sc_stopScroll(scrl, !1)
                }
                if (crsl.isPaused || crsl.isScrolling || i && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
                    var s = opts.auto.timeoutDuration - tmrs.timePassed,
                        o = 100 - Math.ceil(100 * s / opts.auto.timeoutDuration);
                    opts.auto.onTimeoutPause.call($tt0, o, s)
                }
                return !0
            }), $cfs.bind(cf_e("play", conf), function(t, e, i, n) {
                t.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                var s = [e, i, n],
                    o = ["string", "number", "boolean"],
                    r = cf_sortParams(s, o);
                if (e = r[0], i = r[1], n = r[2], "prev" != e && "next" != e && (e = crsl.direction), is_number(i) || (i = 0), is_boolean(n) || (n = !1), n && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return t.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
                crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
                var a = opts.auto.timeoutDuration + i;
                return dur2 = a - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / a), opts.auto.progress && (tmrs.progress = setInterval(function() {
                    var t = getTime() - tmrs.startTime + tmrs.timePassed,
                        e = Math.ceil(100 * t / a);
                    opts.auto.progress.updater.call(opts.auto.progress.bar[0], e)
                }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() {
                    opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), e) : $cfs.trigger(cf_e(e, conf), opts.auto)
                }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
            }), $cfs.bind(cf_e("resume", conf), function(t) {
                return t.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
            }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function(t, e, i, n, s) {
                if (t.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return t.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
                var o = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
                if (o > itms.total) return t.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + o + " needed): Not scrolling.");
                var r = [e, i, n, s],
                    a = ["object", "number/string", "function", "boolean"],
                    l = cf_sortParams(r, a);
                e = l[0], i = l[1], n = l[2], s = l[3];
                var c = t.type.slice(conf.events.prefix.length);
                if (is_object(e) || (e = {}), is_function(n) && (e.onAfter = n), is_boolean(s) && (e.queue = s), e = $.extend(!0, {}, opts[c], e), e.conditions && !e.conditions.call($tt0, c)) return t.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
                if (!is_number(i)) {
                    if ("*" != opts.items.filter) i = "visible";
                    else
                        for (var u = [i, e.items, opts[c].items], l = 0, p = u.length; p > l; l++)
                            if (is_number(u[l]) || "page" == u[l] || "visible" == u[l]) {
                                i = u[l];
                                break
                            } switch (i) {
                        case "page":
                            return t.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(c + "Page", conf), [e, n]);
                        case "visible":
                            opts.items.visibleConf.variable || "*" != opts.items.filter || (i = opts.items.visible)
                    }
                }
                if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [c, [e, i, n]]), t.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
                if (e.duration > 0 && crsl.isScrolling) return e.queue && ("last" == e.queue && (queu = []), ("first" != e.queue || 0 == queu.length) && $cfs.trigger(cf_e("queue", conf), [c, [e, i, n]])), t.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
                if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + c, conf), [e, i]), opts.synchronise)
                    for (var d = opts.synchronise, f = [e, i], h = 0, p = d.length; p > h; h++) {
                        var m = c;
                        d[h][2] || (m = "prev" == m ? "next" : "prev"), d[h][1] || (f[0] = d[h][0].triggerHandler("_cfs_triggerEvent", ["configuration", m])), f[1] = i + d[h][3], d[h][0].trigger("_cfs_triggerEvent", ["slide_" + m, f])
                    }
                return !0
            }), $cfs.bind(cf_e("slide_prev", conf), function(t, e, i) {
                t.stopPropagation();
                var n = $cfs.children();
                if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), t.stopImmediatePropagation();
                if (sz_resetMargin(n, opts), !is_number(i)) {
                    if (opts.items.visibleConf.variable) i = gn_getVisibleItemsPrev(n, opts, itms.total - 1);
                    else if ("*" != opts.items.filter) {
                        var s = is_number(e.items) ? e.items : gn_getVisibleOrg($cfs, opts);
                        i = gn_getScrollItemsPrevFilter(n, opts, itms.total - 1, s)
                    } else i = opts.items.visible;
                    i = cf_getAdjust(i, opts, e.items, $tt0)
                }
                if (opts.circular || itms.total - i < itms.first && (i = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                    var o = cf_getItemsAdjust(gn_getVisibleItemsNext(n, opts, itms.total - i), opts, opts.items.visibleConf.adjust, $tt0);
                    o >= opts.items.visible + i && itms.total > i && (i++, o = cf_getItemsAdjust(gn_getVisibleItemsNext(n, opts, itms.total - i), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = o
                } else if ("*" != opts.items.filter) {
                    var o = gn_getVisibleItemsNextFilter(n, opts, itms.total - i);
                    opts.items.visible = cf_getItemsAdjust(o, opts, opts.items.visibleConf.adjust, $tt0)
                }
                if (sz_resetMargin(n, opts, !0), 0 == i) return t.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                for (debug(conf, "Scrolling " + i + " items backward."), itms.first += i; itms.first >= itms.total;) itms.first -= itms.total;
                opts.circular || (0 == itms.first && e.onEnd && e.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - i, itms.total).prependTo($cfs), itms.total < opts.items.visible + i && $cfs.children().slice(0, opts.items.visible + i - itms.total).clone(!0).appendTo($cfs);
                var n = $cfs.children(),
                    r = gi_getOldItemsPrev(n, opts, i),
                    a = gi_getNewItemsPrev(n, opts),
                    l = n.eq(i - 1),
                    c = r.last(),
                    u = a.last();
                sz_resetMargin(n, opts);
                var p = 0,
                    d = 0;
                if (opts.align) {
                    var f = cf_getAlignPadding(a, opts);
                    p = f[0], d = f[1]
                }
                var h = 0 > p ? opts.padding[opts.d[3]] : 0,
                    m = !1,
                    g = $();
                if (i > opts.items.visible && (g = n.slice(opts.items.visibleConf.old, i), "directscroll" == e.fx)) {
                    var v = opts.items[opts.d.width];
                    m = g, l = u, sc_hideHiddenItems(m), opts.items[opts.d.width] = "variable"
                }
                var y = !1,
                    b = ms_getTotalSize(n.slice(0, i), opts, "width"),
                    _ = cf_mapWrapperSizes(ms_getSizes(a, opts, !0), opts, !opts.usePadding),
                    w = 0,
                    x = {},
                    S = {},
                    C = {},
                    I = {},
                    E = {},
                    j = {},
                    P = {},
                    T = sc_getDuration(e, opts, i, b);
                switch (e.fx) {
                    case "cover":
                    case "cover-fade":
                        w = ms_getTotalSize(n.slice(0, opts.items.visible), opts, "width")
                }
                m && (opts.items[opts.d.width] = v), sz_resetMargin(n, opts, !0), d >= 0 && sz_resetMargin(c, opts, opts.padding[opts.d[1]]), p >= 0 && sz_resetMargin(l, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = d, opts.padding[opts.d[3]] = p), j[opts.d.left] = -(b - h), P[opts.d.left] = -(w - h), S[opts.d.left] = _[opts.d.width];
                var k = function() {},
                    z = function() {},
                    D = function() {},
                    O = function() {},
                    N = function() {},
                    M = function() {},
                    A = function() {},
                    L = function() {},
                    F = function() {},
                    H = function() {},
                    R = function() {};
                switch (e.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                    case "uncover":
                    case "uncover-fade":
                        y = $cfs.clone(!0).appendTo($wrp)
                }
                switch (e.fx) {
                    case "crossfade":
                    case "uncover":
                    case "uncover-fade":
                        y.children().slice(0, i).remove(), y.children().slice(opts.items.visibleConf.old).remove();
                        break;
                    case "cover":
                    case "cover-fade":
                        y.children().slice(opts.items.visible).remove(), y.css(P)
                }
                if ($cfs.css(j), scrl = sc_setScroll(T, e.easing, conf), x[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (k = function() {
                        $wrp.css(_)
                    }, z = function() {
                        scrl.anims.push([$wrp, _])
                    }), opts.usePadding) {
                    switch (u.not(l).length && (C[opts.d.marginRight] = l.data("_cfs_origCssMargin"), 0 > p ? l.css(C) : (A = function() {
                        l.css(C)
                    }, L = function() {
                        scrl.anims.push([l, C])
                    })), e.fx) {
                        case "cover":
                        case "cover-fade":
                            y.children().eq(i - 1).css(C)
                    }
                    u.not(c).length && (I[opts.d.marginRight] = c.data("_cfs_origCssMargin"), D = function() {
                        c.css(I)
                    }, O = function() {
                        scrl.anims.push([c, I])
                    }), d >= 0 && (E[opts.d.marginRight] = u.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], N = function() {
                        u.css(E)
                    }, M = function() {
                        scrl.anims.push([u, E])
                    })
                }
                R = function() {
                    $cfs.css(x)
                };
                var W = opts.items.visible + i - itms.total;
                H = function() {
                    if (W > 0 && ($cfs.children().slice(itms.total).remove(), r = $($cfs.children().slice(itms.total - (opts.items.visible - W)).get().concat($cfs.children().slice(0, W).get()))), sc_showHiddenItems(m), opts.usePadding) {
                        var t = $cfs.children().eq(opts.items.visible + i - 1);
                        t.css(opts.d.marginRight, t.data("_cfs_origCssMargin"))
                    }
                };
                var q = sc_mapCallbackArguments(r, g, a, i, "prev", T, _);
                switch (F = function() {
                    sc_afterScroll($cfs, y, e), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, e, "onAfter", q, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, e, "onBefore", q, clbk), e.fx) {
                    case "none":
                        $cfs.css(x), k(), D(), N(), A(), R(), H(), F();
                        break;
                    case "fade":
                        scrl.anims.push([$cfs, {
                            opacity: 0
                        }, function() {
                            k(), D(), N(), A(), R(), H(), scrl = sc_setScroll(T, e.easing, conf), scrl.anims.push([$cfs, {
                                opacity: 1
                            }, F]), sc_startScroll(scrl, conf)
                        }]);
                        break;
                    case "crossfade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([y, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, {
                            opacity: 1
                        }, F]), z(), D(), N(), A(), R(), H();
                        break;
                    case "cover":
                        scrl.anims.push([y, x, function() {
                            D(), N(), A(), R(), H(), F()
                        }]), z();
                        break;
                    case "cover-fade":
                        scrl.anims.push([$cfs, {
                            opacity: 0
                        }]), scrl.anims.push([y, x, function() {
                            D(), N(), A(), R(), H(), F()
                        }]), z();
                        break;
                    case "uncover":
                        scrl.anims.push([y, S, F]), z(), D(), N(), A(), R(), H();
                        break;
                    case "uncover-fade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([$cfs, {
                            opacity: 1
                        }]), scrl.anims.push([y, S, F]), z(), D(), N(), A(), R(), H();
                        break;
                    default:
                        scrl.anims.push([$cfs, x, function() {
                            H(), F()
                        }]), z(), O(), M(), L()
                }
                return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, _]), !0
            }), $cfs.bind(cf_e("slide_next", conf), function(t, e, i) {
                t.stopPropagation();
                var n = $cfs.children();
                if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), t.stopImmediatePropagation();
                if (sz_resetMargin(n, opts), !is_number(i)) {
                    if ("*" != opts.items.filter) {
                        var s = is_number(e.items) ? e.items : gn_getVisibleOrg($cfs, opts);
                        i = gn_getScrollItemsNextFilter(n, opts, 0, s)
                    } else i = opts.items.visible;
                    i = cf_getAdjust(i, opts, e.items, $tt0)
                }
                var o = 0 == itms.first ? itms.total : itms.first;
                if (!opts.circular) {
                    if (opts.items.visibleConf.variable) var r = gn_getVisibleItemsNext(n, opts, i),
                        s = gn_getVisibleItemsPrev(n, opts, o - 1);
                    else var r = opts.items.visible,
                        s = opts.items.visible;
                    i + r > o && (i = o - s)
                }
                if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                    for (var r = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(n, opts, i, o), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - i >= r && itms.total > i;) i++, r = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(n, opts, i, o), opts, opts.items.visibleConf.adjust, $tt0);
                    opts.items.visible = r
                } else if ("*" != opts.items.filter) {
                    var r = gn_getVisibleItemsNextFilter(n, opts, i);
                    opts.items.visible = cf_getItemsAdjust(r, opts, opts.items.visibleConf.adjust, $tt0)
                }
                if (sz_resetMargin(n, opts, !0), 0 == i) return t.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                for (debug(conf, "Scrolling " + i + " items forward."), itms.first -= i; 0 > itms.first;) itms.first += itms.total;
                opts.circular || (itms.first == opts.items.visible && e.onEnd && e.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + i && $cfs.children().slice(0, opts.items.visible + i - itms.total).clone(!0).appendTo($cfs);
                var n = $cfs.children(),
                    a = gi_getOldItemsNext(n, opts),
                    l = gi_getNewItemsNext(n, opts, i),
                    c = n.eq(i - 1),
                    u = a.last(),
                    p = l.last();
                sz_resetMargin(n, opts);
                var d = 0,
                    f = 0;
                if (opts.align) {
                    var h = cf_getAlignPadding(l, opts);
                    d = h[0], f = h[1]
                }
                var m = !1,
                    g = $();
                if (i > opts.items.visibleConf.old && (g = n.slice(opts.items.visibleConf.old, i), "directscroll" == e.fx)) {
                    var v = opts.items[opts.d.width];
                    m = g, c = u, sc_hideHiddenItems(m), opts.items[opts.d.width] = "variable"
                }
                var y = !1,
                    b = ms_getTotalSize(n.slice(0, i), opts, "width"),
                    _ = cf_mapWrapperSizes(ms_getSizes(l, opts, !0), opts, !opts.usePadding),
                    w = 0,
                    x = {},
                    S = {},
                    C = {},
                    I = {},
                    E = {},
                    j = sc_getDuration(e, opts, i, b);
                switch (e.fx) {
                    case "uncover":
                    case "uncover-fade":
                        w = ms_getTotalSize(n.slice(0, opts.items.visibleConf.old), opts, "width")
                }
                m && (opts.items[opts.d.width] = v), opts.align && 0 > opts.padding[opts.d[1]] && (opts.padding[opts.d[1]] = 0), sz_resetMargin(n, opts, !0), sz_resetMargin(u, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = f, opts.padding[opts.d[3]] = d), E[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                var P = function() {},
                    T = function() {},
                    k = function() {},
                    z = function() {},
                    D = function() {},
                    O = function() {},
                    N = function() {},
                    M = function() {},
                    A = function() {};
                switch (e.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                    case "uncover":
                    case "uncover-fade":
                        y = $cfs.clone(!0).appendTo($wrp), y.children().slice(opts.items.visibleConf.old).remove()
                }
                switch (e.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                        $cfs.css("zIndex", 1), y.css("zIndex", 0)
                }
                if (scrl = sc_setScroll(j, e.easing, conf), x[opts.d.left] = -b, S[opts.d.left] = -w, 0 > d && (x[opts.d.left] += d), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (P = function() {
                        $wrp.css(_)
                    }, T = function() {
                        scrl.anims.push([$wrp, _])
                    }), opts.usePadding) {
                    var L = p.data("_cfs_origCssMargin");
                    f >= 0 && (L += opts.padding[opts.d[1]]), p.css(opts.d.marginRight, L), c.not(u).length && (I[opts.d.marginRight] = u.data("_cfs_origCssMargin")), k = function() {
                        u.css(I)
                    }, z = function() {
                        scrl.anims.push([u, I])
                    };
                    var F = c.data("_cfs_origCssMargin");
                    d > 0 && (F += opts.padding[opts.d[3]]), C[opts.d.marginRight] = F, D = function() {
                        c.css(C)
                    }, O = function() {
                        scrl.anims.push([c, C])
                    }
                }
                A = function() {
                    $cfs.css(E)
                };
                var H = opts.items.visible + i - itms.total;
                M = function() {
                    H > 0 && $cfs.children().slice(itms.total).remove();
                    var t = $cfs.children().slice(0, i).appendTo($cfs).last();
                    if (H > 0 && (l = gi_getCurrentItems(n, opts)), sc_showHiddenItems(m), opts.usePadding) {
                        if (itms.total < opts.items.visible + i) {
                            var e = $cfs.children().eq(opts.items.visible - 1);
                            e.css(opts.d.marginRight, e.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                        }
                        t.css(opts.d.marginRight, t.data("_cfs_origCssMargin"))
                    }
                };
                var R = sc_mapCallbackArguments(a, g, l, i, "next", j, _);
                switch (N = function() {
                    $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, y, e), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, e, "onAfter", R, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, e, "onBefore", R, clbk), e.fx) {
                    case "none":
                        $cfs.css(x), P(), k(), D(), A(), M(), N();
                        break;
                    case "fade":
                        scrl.anims.push([$cfs, {
                            opacity: 0
                        }, function() {
                            P(), k(), D(), A(), M(), scrl = sc_setScroll(j, e.easing, conf), scrl.anims.push([$cfs, {
                                opacity: 1
                            }, N]), sc_startScroll(scrl, conf)
                        }]);
                        break;
                    case "crossfade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([y, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, {
                            opacity: 1
                        }, N]), T(), k(), D(), A(), M();
                        break;
                    case "cover":
                        $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, E, N]), T(), k(), D(), M();
                        break;
                    case "cover-fade":
                        $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([y, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, E, N]), T(), k(), D(), M();
                        break;
                    case "uncover":
                        scrl.anims.push([y, S, N]), T(), k(), D(), A(), M();
                        break;
                    case "uncover-fade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([$cfs, {
                            opacity: 1
                        }]), scrl.anims.push([y, S, N]), T(), k(), D(), A(), M();
                        break;
                    default:
                        scrl.anims.push([$cfs, x, function() {
                            A(), M(), N()
                        }]), T(), z(), O()
                }
                return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, _]), !0
            }), $cfs.bind(cf_e("slideTo", conf), function(t, e, i, n, s, o, r) {
                t.stopPropagation();
                var a = [e, i, n, s, o, r],
                    l = ["string/number/object", "number", "boolean", "object", "string", "function"],
                    c = cf_sortParams(a, l);
                return s = c[3], o = c[4], r = c[5], e = gn_getItemIndex(c[0], c[1], c[2], itms, $cfs), 0 == e ? !1 : (is_object(s) || (s = !1), "prev" != o && "next" != o && (o = opts.circular ? itms.total / 2 >= e ? "next" : "prev" : 0 == itms.first || itms.first > e ? "next" : "prev"), "prev" == o && (e = itms.total - e), $cfs.trigger(cf_e(o, conf), [s, e, r]), !0)
            }), $cfs.bind(cf_e("prevPage", conf), function(t, e, i) {
                t.stopPropagation();
                var n = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [n - 1, e, "prev", i])
            }), $cfs.bind(cf_e("nextPage", conf), function(t, e, i) {
                t.stopPropagation();
                var n = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [n + 1, e, "next", i])
            }), $cfs.bind(cf_e("slideToPage", conf), function(t, e, i, n, s) {
                t.stopPropagation(), is_number(e) || (e = $cfs.triggerHandler(cf_e("currentPage", conf)));
                var o = opts.pagination.items || opts.items.visible,
                    r = Math.ceil(itms.total / o) - 1;
                return 0 > e && (e = r), e > r && (e = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [e * o, 0, !0, i, n, s])
            }), $cfs.bind(cf_e("jumpToStart", conf), function(t, e) {
                if (t.stopPropagation(), e = e ? gn_getItemIndex(e, 0, !0, itms, $cfs) : 0, e += itms.first, 0 != e) {
                    if (itms.total > 0)
                        for (; e > itms.total;) e -= itms.total;
                    $cfs.prepend($cfs.children().slice(e, itms.total))
                }
                return !0
            }), $cfs.bind(cf_e("synchronise", conf), function(t, e) {
                if (t.stopPropagation(), e) e = cf_getSynchArr(e);
                else {
                    if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                    e = opts.synchronise
                }
                for (var i = $cfs.triggerHandler(cf_e("currentPosition", conf)), n = !0, s = 0, o = e.length; o > s; s++) e[s][0].triggerHandler(cf_e("slideTo", conf), [i, e[s][3], !0]) || (n = !1);
                return n
            }), $cfs.bind(cf_e("queue", conf), function(t, e, i) {
                return t.stopPropagation(), is_function(e) ? e.call($tt0, queu) : is_array(e) ? queu = e : is_undefined(e) || queu.push([e, i]), queu
            }), $cfs.bind(cf_e("insertItem", conf), function(t, e, i, n, s) {
                t.stopPropagation();
                var o = [e, i, n, s],
                    r = ["string/object", "string/number/object", "boolean", "number"],
                    a = cf_sortParams(o, r);
                if (e = a[0], i = a[1], n = a[2], s = a[3], is_object(e) && !is_jquery(e) ? e = $(e) : is_string(e) && (e = $(e)), !is_jquery(e) || 0 == e.length) return debug(conf, "Not a valid object.");
                is_undefined(i) && (i = "end"), sz_storeMargin(e, opts), sz_storeOrigCss(e);
                var l = i,
                    c = "before";
                "end" == i ? n ? (0 == itms.first ? (i = itms.total - 1, c = "after") : (i = itms.first, itms.first += e.length), 0 > i && (i = 0)) : (i = itms.total - 1, c = "after") : i = gn_getItemIndex(i, s, n, itms, $cfs);
                var u = $cfs.children().eq(i);
                return u.length ? u[c](e) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(e)), "end" == l || n || itms.first > i && (itms.first += e.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
            }), $cfs.bind(cf_e("removeItem", conf), function(t, e, i, n) {
                t.stopPropagation();
                var s = [e, i, n],
                    o = ["string/number/object", "boolean", "number"],
                    r = cf_sortParams(s, o);
                if (e = r[0], i = r[1], n = r[2], e instanceof $ && e.length > 1) return a = $(), e.each(function() {
                    var t = $cfs.trigger(cf_e("removeItem", conf), [$(this), i, n]);
                    t && (a = a.add(t))
                }), a;
                if (is_undefined(e) || "end" == e) a = $cfs.children().last();
                else {
                    e = gn_getItemIndex(e, n, i, itms, $cfs);
                    var a = $cfs.children().eq(e);
                    a.length && itms.first > e && (itms.first -= a.length)
                }
                return a && a.length && (a.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), a
            }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(t, e) {
                t.stopPropagation();
                var i = t.type.slice(conf.events.prefix.length);
                return is_array(e) && (clbk[i] = e), is_function(e) && clbk[i].push(e), clbk[i]
            }), $cfs.bind(cf_e("currentPosition", conf), function(t, e) {
                if (t.stopPropagation(), 0 == itms.first) var i = 0;
                else var i = itms.total - itms.first;
                return is_function(e) && e.call($tt0, i), i
            }), $cfs.bind(cf_e("currentPage", conf), function(t, e) {
                t.stopPropagation();
                var i, n = opts.pagination.items || opts.items.visible,
                    s = Math.ceil(itms.total / n - 1);
                return i = 0 == itms.first ? 0 : itms.first < itms.total % n ? 0 : itms.first != n || opts.circular ? Math.round((itms.total - itms.first) / n) : s, 0 > i && (i = 0), i > s && (i = s), is_function(e) && e.call($tt0, i), i
            }), $cfs.bind(cf_e("currentVisible", conf), function(t, e) {
                t.stopPropagation();
                var i = gi_getCurrentItems($cfs.children(), opts);
                return is_function(e) && e.call($tt0, i), i
            }), $cfs.bind(cf_e("slice", conf), function(t, e, i, n) {
                if (t.stopPropagation(), 0 == itms.total) return !1;
                var s = [e, i, n],
                    o = ["number", "number", "function"],
                    r = cf_sortParams(s, o);
                if (e = is_number(r[0]) ? r[0] : 0, i = is_number(r[1]) ? r[1] : itms.total, n = r[2], e += itms.first, i += itms.first, items.total > 0) {
                    for (; e > itms.total;) e -= itms.total;
                    for (; i > itms.total;) i -= itms.total;
                    for (; 0 > e;) e += itms.total;
                    for (; 0 > i;) i += itms.total
                }
                var a, l = $cfs.children();
                return a = i > e ? l.slice(e, i) : $(l.slice(e, itms.total).get().concat(l.slice(0, i).get())), is_function(n) && n.call($tt0, a), a
            }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(t, e) {
                t.stopPropagation();
                var i = t.type.slice(conf.events.prefix.length),
                    n = crsl[i];
                return is_function(e) && e.call($tt0, n), n
            }), $cfs.bind(cf_e("configuration", conf), function(e, a, b, c) {
                e.stopPropagation();
                var reInit = !1;
                if (is_function(a)) a.call($tt0, opts);
                else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
                else if (!is_undefined(a))
                    if (is_function(b)) {
                        var val = eval("opts." + a);
                        is_undefined(val) && (val = ""), b.call($tt0, val)
                    } else {
                        if (is_undefined(b)) return eval("opts." + a);
                        "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
                    }
                if (reInit) {
                    sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
                    var sz = sz_setSizes($cfs, opts);
                    $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                }
                return opts
            }), $cfs.bind(cf_e("linkAnchors", conf), function(t, e, i) {
                return t.stopPropagation(), is_undefined(e) ? e = $("body") : is_string(e) && (e = $(e)), is_jquery(e) && 0 != e.length ? (is_string(i) || (i = "a.caroufredsel"), e.find(i).each(function() {
                    var t = this.hash || "";
                    t.length > 0 && -1 != $cfs.children().index($(t)) && $(this).unbind("click").click(function(e) {
                        e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), t)
                    })
                }), !0) : debug(conf, "Not a valid object.")
            }), $cfs.bind(cf_e("updatePageStatus", conf), function(t, e) {
                if (t.stopPropagation(), opts.pagination.container) {
                    var i = opts.pagination.items || opts.items.visible,
                        n = Math.ceil(itms.total / i);
                    e && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                        for (var t = 0; n > t; t++) {
                            var e = $cfs.children().eq(gn_getItemIndex(t * i, 0, !0, itms, $cfs));
                            $(this).append(opts.pagination.anchorBuilder.call(e[0], t + 1))
                        }
                    })), opts.pagination.container.each(function() {
                        $(this).children().unbind(opts.pagination.event).each(function(t) {
                            $(this).bind(opts.pagination.event, function(e) {
                                e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [t * i, -opts.pagination.deviation, !0, opts.pagination])
                            })
                        })
                    }));
                    var s = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                    return s >= n && (s = 0), 0 > s && (s = n - 1), opts.pagination.container.each(function() {
                        $(this).children().removeClass(cf_c("selected", conf)).eq(s).addClass(cf_c("selected", conf))
                    }), !0
                }
            }), $cfs.bind(cf_e("updateSizes", conf), function() {
                var t = opts.items.visible,
                    e = $cfs.children(),
                    i = ms_getParentSize($wrp, opts, "width");
                if (itms.total = e.length, crsl.primarySizePercentage ? (opts.maxDimension = i, opts[opts.d.width] = ms_getPercentage(i, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, i), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, e, i), t = opts.items.visible, sz_setResponsiveSizes(opts, e)) : opts.items.visibleConf.variable ? t = gn_getVisibleItemsNext(e, opts, 0) : "*" != opts.items.filter && (t = gn_getVisibleItemsNextFilter(e, opts, 0)), !opts.circular && 0 != itms.first && t > itms.first) {
                    if (opts.items.visibleConf.variable) var n = gn_getVisibleItemsPrev(e, opts, itms.first) - itms.first;
                    else if ("*" != opts.items.filter) var n = gn_getVisibleItemsPrevFilter(e, opts, itms.first) - itms.first;
                    else var n = opts.items.visible - itms.first;
                    debug(conf, "Preventing non-circular: sliding " + n + " items backward."), $cfs.trigger(cf_e("prev", conf), n)
                }
                opts.items.visible = cf_getItemsAdjust(t, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, e);
                var s = sz_setSizes($cfs, opts);
                return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, s]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), s
            }), $cfs.bind(cf_e("destroy", conf), function(t, e) {
                return t.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), e && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
            }), $cfs.bind(cf_e("debug", conf), function() {
                return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
            }), $cfs.bind("_cfs_triggerEvent", function(t, e, i) {
                return t.stopPropagation(), $cfs.triggerHandler(cf_e(e, conf), i)
            })
        }, FN._unbind_events = function() {
            $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
        }, FN._bind_buttons = function() {
            if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
                var t = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                $wrp.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), t)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function(t) {
                    t.preventDefault();
                    var e = !1,
                        i = null;
                    crsl.isPaused ? e = "play" : opts.auto.pauseOnEvent && (e = "pause", i = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), e && $cfs.trigger(cf_e(e, conf), i)
                }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function(t) {
                    t.preventDefault(), $cfs.trigger(cf_e("prev", conf))
                }), opts.prev.pauseOnHover)) {
                var t = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                opts.prev.button.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), t)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function(t) {
                    t.preventDefault(), $cfs.trigger(cf_e("next", conf))
                }), opts.next.pauseOnHover)) {
                var t = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                opts.next.button.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), t)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if (opts.pagination.container && opts.pagination.pauseOnHover) {
                var t = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), t)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(t) {
                    var e = t.keyCode;
                    e == opts.next.key && (t.preventDefault(), $cfs.trigger(cf_e("next", conf))), e == opts.prev.key && (t.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
                }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(t) {
                    var e = t.keyCode;
                    e >= 49 && 58 > e && (e = (e - 49) * opts.items.visible, itms.total >= e && (t.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [e, 0, !0, opts.pagination])))
                }), $.fn.swipe) {
                var e = "ontouchstart" in window;
                if (e && opts.swipe.onTouch || !e && opts.swipe.onMouse) {
                    var i = $.extend(!0, {}, opts.prev, opts.swipe),
                        n = $.extend(!0, {}, opts.next, opts.swipe),
                        s = function() {
                            $cfs.trigger(cf_e("prev", conf), [i])
                        },
                        o = function() {
                            $cfs.trigger(cf_e("next", conf), [n])
                        };
                    switch (opts.direction) {
                        case "up":
                        case "down":
                            opts.swipe.options.swipeUp = o, opts.swipe.options.swipeDown = s;
                            break;
                        default:
                            opts.swipe.options.swipeLeft = o, opts.swipe.options.swipeRight = s
                    }
                    crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
                }
            }
            if ($.fn.mousewheel && opts.mousewheel) {
                var r = $.extend(!0, {}, opts.prev, opts.mousewheel),
                    a = $.extend(!0, {}, opts.next, opts.mousewheel);
                crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function(t, e) {
                    t.preventDefault(), e > 0 ? $cfs.trigger(cf_e("prev", conf), [r]) : $cfs.trigger(cf_e("next", conf), [a])
                }), crsl.mousewheel = !0
            }
            if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                var l = function() {
                        $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
                    },
                    c = $(window),
                    u = null;
                if ($.debounce && "debounce" == conf.onWindowResize) u = $.debounce(200, l);
                else if ($.throttle && "throttle" == conf.onWindowResize) u = $.throttle(300, l);
                else {
                    var p = 0,
                        d = 0;
                    u = function() {
                        var t = c.width(),
                            e = c.height();
                        (t != p || e != d) && (l(), p = t, d = e)
                    }
                }
                c.bind(cf_e("resize", conf, !1, !0, !0), u)
            }
        }, FN._unbind_buttons = function() {
            var t = (cf_e("", conf), cf_e("", conf, !1));
            ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(t), opts.auto.button && opts.auto.button.unbind(t), opts.prev.button && opts.prev.button.unbind(t), opts.next.button && opts.next.button.unbind(t), opts.pagination.container && (opts.pagination.container.unbind(t), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
        }, is_boolean(configs) && (configs = {
            debug: configs
        });
        var crsl = {
                direction: "next",
                isPaused: !0,
                isScrolling: !1,
                isStopped: !1,
                mousewheel: !1,
                swipe: !1
            },
            itms = {
                total: $cfs.children().length,
                first: 0
            },
            tmrs = {
                auto: null,
                progress: null,
                startTime: getTime(),
                timePassed: 0
            },
            scrl = {
                isStopped: !1,
                duration: 0,
                startTime: 0,
                easing: "",
                anims: []
            },
            clbk = {
                onBefore: [],
                onAfter: []
            },
            queu = [],
            conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
            opts = {},
            opts_orig = $.extend(!0, {}, options),
            $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
        if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
        else {
            var start_arr = [];
            0 != opts.items.start && start_arr.push(opts.items.start)
        }
        if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)
            for (var a = 0, l = start_arr.length; l > a; a++) {
                var s = start_arr[a];
                if (0 != s) {
                    if (s === !0) {
                        if (s = window.location.hash, 1 > s.length) continue
                    } else "random" === s && (s = Math.floor(Math.random() * itms.total));
                    if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
                            fx: "none"
                        }])) break
                }
            }
        var siz = sz_setSizes($cfs, opts),
            itm = gi_getCurrentItems($cfs.children(), opts);
        return opts.onCreate && opts.onCreate.call($tt0, {
            width: siz.width,
            height: siz.height,
            items: itm
        }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
    }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
        synchronise: !1,
        infinite: !0,
        circular: !0,
        responsive: !1,
        direction: "left",
        items: {
            start: 0
        },
        scroll: {
            easing: "swing",
            duration: 500,
            pauseOnHover: !1,
            event: "click",
            queue: !1
        }
    }, $.fn.carouFredSel.configs = {
        debug: !1,
        transition: !1,
        onWindowResize: "throttle",
        events: {
            prefix: "",
            namespace: "cfs"
        },
        wrapper: {
            element: "div",
            classname: "caroufredsel_wrapper"
        },
        classnames: {}
    }, $.fn.carouFredSel.pageAnchorBuilder = function(t) {
        return '<a href="#"><span>' + t + "</span></a>"
    }, $.fn.carouFredSel.progressbarUpdater = function(t) {
        $(this).css("width", t + "%")
    }, $.fn.carouFredSel.cookie = {
        get: function(t) {
            t += "=";
            for (var e = document.cookie.split(";"), i = 0, n = e.length; n > i; i++) {
                for (var s = e[i];
                    " " == s.charAt(0);) s = s.slice(1);
                if (0 == s.indexOf(t)) return s.slice(t.length)
            }
            return 0
        },
        set: function(t, e, i) {
            var n = "";
            if (i) {
                var s = new Date;
                s.setTime(s.getTime() + 864e5 * i), n = "; expires=" + s.toGMTString()
            }
            document.cookie = t + "=" + e + n + "; path=/"
        },
        remove: function(t) {
            $.fn.carouFredSel.cookie.set(t, "", -1)
        }
    }, $.extend($.easing, {
        quadratic: function(t) {
            var e = t * t;
            return t * (-e * t + 4 * e - 6 * t + 4)
        },
        cubic: function(t) {
            return t * (4 * t * t - 9 * t + 6)
        },
        elastic: function(t) {
            var e = t * t;
            return t * (33 * e * e - 106 * e * t + 126 * e - 67 * t + 15)
        }
    }))
}(jQuery),
function(t) {
    function e(e) {
        return !e || void 0 !== e.allowPageScroll || void 0 === e.swipe && void 0 === e.swipeStatus || (e.allowPageScroll = a), e || (e = {}), e = t.extend({}, t.fn.swipe.defaults, e), this.each(function() {
            var n = t(this),
                s = n.data(v);
            s || (s = new i(this, e), n.data(v, s))
        })
    }

    function i(e, i) {
        function y(t) {
            var e, t = t.originalEvent,
                n = g ? t.touches[0] : t;
            return H = d, g ? R = t.touches.length : t.preventDefault(), M = 0, A = null, L = 0, g && R !== i.fingers && i.fingers !== p ? w(t) : (P = $ = n.pageX, T = j = n.pageY, W = (new Date).getTime(), i.swipeStatus && (e = x(t, H))), !1 === e ? (H = m, x(t, H), e) : (F.bind(D, b), void F.bind(O, _))
        }

        function b(t) {
            if (t = t.originalEvent, H !== h && H !== m) {
                var e, d = g ? t.touches[0] : t;
                $ = d.pageX, j = d.pageY, q = (new Date).getTime(), A = I(), g && (R = t.touches.length), H = f;
                var d = t,
                    v = A;
                if (i.allowPageScroll === a) d.preventDefault();
                else {
                    var y = i.allowPageScroll === l;
                    switch (v) {
                        case n:
                            (i.swipeLeft && y || !y && i.allowPageScroll != c) && d.preventDefault();
                            break;
                        case s:
                            (i.swipeRight && y || !y && i.allowPageScroll != c) && d.preventDefault();
                            break;
                        case o:
                            (i.swipeUp && y || !y && i.allowPageScroll != u) && d.preventDefault();
                            break;
                        case r:
                            (i.swipeDown && y || !y && i.allowPageScroll != u) && d.preventDefault()
                    }
                }
                R !== i.fingers && i.fingers !== p && g ? (H = m, x(t, H)) : (M = C(), L = q - W, i.swipeStatus && (e = x(t, H, A, M, L)), i.triggerOnTouchEnd || (d = !(i.maxTimeThreshold ? !(L >= i.maxTimeThreshold) : 1), !0 === S() ? (H = h, e = x(t, H)) : d && (H = m, x(t, H)))), !1 === e && (H = m, x(t, H))
            }
        }

        function _(t) {
            if (t = t.originalEvent, t.preventDefault(), q = (new Date).getTime(), M = C(), A = I(), L = q - W, i.triggerOnTouchEnd || !1 === i.triggerOnTouchEnd && H === f)
                if (H = h, R !== i.fingers && i.fingers !== p && g || 0 === $) H = m, x(t, H);
                else {
                    var e = !(i.maxTimeThreshold ? !(L >= i.maxTimeThreshold) : 1);
                    !0 !== S() && null !== S() || e ? (e || !1 === S()) && (H = m, x(t, H)) : x(t, H)
                }
            else H === f && (H = m, x(t, H));
            F.unbind(D, b, !1), F.unbind(O, _, !1)
        }

        function w() {
            W = q = j = $ = T = P = R = 0
        }

        function x(t, e) {
            var a = void 0;
            if (i.swipeStatus && (a = i.swipeStatus.call(F, t, e, A || null, M || 0, L || 0, R)), e !== m || !i.click || 1 !== R && g || !isNaN(M) && 0 !== M || (a = i.click.call(F, t, t.target)), e == h) switch (i.swipe && (a = i.swipe.call(F, t, A, M, L, R)), A) {
                case n:
                    i.swipeLeft && (a = i.swipeLeft.call(F, t, A, M, L, R));
                    break;
                case s:
                    i.swipeRight && (a = i.swipeRight.call(F, t, A, M, L, R));
                    break;
                case o:
                    i.swipeUp && (a = i.swipeUp.call(F, t, A, M, L, R));
                    break;
                case r:
                    i.swipeDown && (a = i.swipeDown.call(F, t, A, M, L, R))
            }
            return (e === m || e === h) && w(t), a
        }

        function S() {
            return null !== i.threshold ? M >= i.threshold : null
        }

        function C() {
            return Math.round(Math.sqrt(Math.pow($ - P, 2) + Math.pow(j - T, 2)))
        }

        function I() {
            var t;
            return t = Math.atan2(j - T, P - $), t = Math.round(180 * t / Math.PI), 0 > t && (t = 360 - Math.abs(t)), 45 >= t && t >= 0 ? n : 360 >= t && t >= 315 ? n : t >= 135 && 225 >= t ? s : t > 45 && 135 > t ? r : o
        }

        function E() {
            F.unbind(z, y), F.unbind(N, w), F.unbind(D, b), F.unbind(O, _)
        }
        var $, j, P, T, k = g || !i.fallbackToMouseEvents,
            z = k ? "touchstart" : "mousedown",
            D = k ? "touchmove" : "mousemove",
            O = k ? "touchend" : "mouseup",
            N = "touchcancel",
            M = 0,
            A = null,
            L = 0,
            F = t(e),
            H = "start",
            R = 0,
            W = j = $ = T = P = 0,
            q = 0;
        try {
            F.bind(z, y), F.bind(N, w)
        } catch (B) {
            t.error("events not supported " + z + "," + N + " on jQuery.swipe")
        }
        this.enable = function() {
            return F.bind(z, y), F.bind(N, w), F
        }, this.disable = function() {
            return E(), F
        }, this.destroy = function() {
            return E(), F.data(v, null), F
        }
    }
    var n = "left",
        s = "right",
        o = "up",
        r = "down",
        a = "none",
        l = "auto",
        c = "horizontal",
        u = "vertical",
        p = "all",
        d = "start",
        f = "move",
        h = "end",
        m = "cancel",
        g = "ontouchstart" in window,
        v = "TouchSwipe";
    t.fn.swipe = function(i) {
        var n = t(this),
            s = n.data(v);
        if (s && "string" == typeof i) {
            if (s[i]) return s[i].apply(this, Array.prototype.slice.call(arguments, 1));
            t.error("Method " + i + " does not exist on jQuery.swipe")
        } else if (!(s || "object" != typeof i && i)) return e.apply(this, arguments);
        return n
    }, t.fn.swipe.defaults = {
        fingers: 1,
        threshold: 75,
        maxTimeThreshold: null,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        click: null,
        triggerOnTouchEnd: !0,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0
    }, t.fn.swipe.phases = {
        PHASE_START: d,
        PHASE_MOVE: f,
        PHASE_END: h,
        PHASE_CANCEL: m
    }, t.fn.swipe.directions = {
        LEFT: n,
        RIGHT: s,
        UP: o,
        DOWN: r
    }, t.fn.swipe.pageScroll = {
        NONE: a,
        HORIZONTAL: c,
        VERTICAL: u,
        AUTO: l
    }, t.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: p
    }
}(jQuery), ! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = function(e, i) {
        return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(i), i
    } : t(jQuery)
}(function(t) {
    "use strict";
    var e = t(document),
        i = t(window),
        n = "selectric",
        s = "Input Items Open Disabled TempShow HideSelect Wrapper Hover Responsive Above Scroll Group GroupLabel",
        o = ".sl",
        r = ["a", "e", "i", "o", "u", "n", "c", "y"],
        a = [/[\xE0-\xE5]/g, /[\xE8-\xEB]/g, /[\xEC-\xEF]/g, /[\xF2-\xF6]/g, /[\xF9-\xFC]/g, /[\xF1]/g, /[\xE7]/g, /[\xFD-\xFF]/g],
        l = function(e, i) {
            var n = this;
            n.element = e, n.$element = t(e), n.state = {
                enabled: !1,
                opened: !1,
                currValue: -1,
                selectedIdx: -1
            }, n.eventTriggers = {
                open: n.open,
                close: n.close,
                destroy: n.destroy,
                refresh: n.refresh,
                init: n.init
            }, n.init(i)
        };
    l.prototype = {
        utils: {
            isMobile: function() {
                return /android|ip(hone|od|ad)/i.test(navigator.userAgent)
            },
            replaceDiacritics: function(t) {
                for (var e = a.length; e--;) t = t.toLowerCase().replace(a[e], r[e]);
                return t
            },
            format: function(t) {
                var e = arguments;
                return ("" + t).replace(/\{(?:(\d+)|(\w+))\}/g, function(t, i, n) {
                    return n && e[1] ? e[1][n] : e[i]
                })
            },
            nextEnabledItem: function(t, e) {
                for (; t[e = (e + 1) % t.length].disabled;);
                return e
            },
            previousEnabledItem: function(t, e) {
                for (; t[e = (e > 0 ? e : t.length) - 1].disabled;);
                return e
            },
            toDash: function(t) {
                return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
            },
            triggerCallback: function(e, i) {
                var s = i.element,
                    o = i.options["on" + e];
                t.isFunction(o) && o.call(s, s, i), t.fn[n].hooks[e] && t.each(t.fn[n].hooks[e], function() {
                    this.call(s, s, i)
                }), t(s).trigger(n + "-" + this.toDash(e), i)
            }
        },
        init: function(e) {
            var i = this;
            if (i.options = t.extend(!0, {}, t.fn[n].defaults, i.options, e), i.utils.triggerCallback("BeforeInit", i), i.destroy(!0), i.options.disableOnMobile && i.utils.isMobile()) return void(i.disableOnMobile = !0);
            i.classes = i.getClassNames();
            var s = t("<input/>", {
                    "class": i.classes.input,
                    readonly: i.utils.isMobile()
                }),
                o = t("<div/>", {
                    "class": i.classes.items,
                    tabindex: -1
                }),
                r = t("<div/>", {
                    "class": i.classes.scroll
                }),
                a = t("<div/>", {
                    "class": i.classes.prefix,
                    html: i.options.arrowButtonMarkup
                }),
                l = t("<p/>", {
                    "class": "label"
                }),
                c = i.$element.wrap("<div/>").parent().append(a.prepend(l), o, s);
            i.elements = {
                input: s,
                items: o,
                itemsScroll: r,
                wrapper: a,
                label: l,
                outerWrapper: c
            }, i.$element.on(i.eventTriggers).wrap('<div class="' + i.classes.hideselect + '"/>'), i.originalTabindex = i.$element.prop("tabindex"), i.$element.prop("tabindex", !1), i.populate(), i.activate(), i.utils.triggerCallback("Init", i)
        },
        activate: function() {
            var t = this,
                e = t.$element.width();
            t.utils.triggerCallback("BeforeActivate", t), t.elements.outerWrapper.prop("class", [t.classes.wrapper, t.$element.prop("class").replace(/\S+/g, t.classes.prefix + "-$&"), t.options.responsive ? t.classes.responsive : ""].join(" ")), t.options.inheritOriginalWidth && e > 0 && t.elements.outerWrapper.width(e), t.$element.prop("disabled") ? (t.elements.outerWrapper.addClass(t.classes.disabled), t.elements.input.prop("disabled", !0)) : (t.state.enabled = !0, t.elements.outerWrapper.removeClass(t.classes.disabled), t.$li = t.elements.items.removeAttr("style").find("li"), t.bindEvents()), t.utils.triggerCallback("Activate", t)
        },
        getClassNames: function() {
            var e = this,
                i = e.options.customClass,
                n = {};
            return t.each(s.split(" "), function(t, s) {
                var o = i.prefix + s;
                n[s.toLowerCase()] = i.camelCase ? o : e.utils.toDash(o)
            }), n.prefix = i.prefix, n
        },
        setLabel: function() {
            var e = this,
                i = e.options.labelBuilder,
                n = e.lookupItems[e.state.currValue];
            e.elements.label.html(t.isFunction(i) ? i(n) : e.utils.format(i, n))
        },
        populate: function() {
            var e = this,
                i = e.$element.children(),
                n = e.$element.find("option"),
                s = n.index(n.filter(":selected")),
                o = 0;
            e.state.currValue = e.state.selected = ~s ? s : 0, e.state.selectedIdx = e.state.currValue, e.items = [], e.lookupItems = [], i.length && (i.each(function(i) {
                var n = t(this);
                if (n.is("optgroup")) {
                    var s = {
                        element: n,
                        label: n.prop("label"),
                        groupDisabled: n.prop("disabled"),
                        items: []
                    };
                    n.children().each(function(i) {
                        var n = t(this),
                            r = n.html();
                        s.items[i] = {
                            index: o,
                            element: n,
                            value: n.val(),
                            text: r,
                            slug: e.utils.replaceDiacritics(r),
                            disabled: s.groupDisabled
                        }, e.lookupItems[o] = s.items[i], o++
                    }), e.items[i] = s
                } else {
                    var r = n.html();
                    e.items[i] = {
                        index: o,
                        element: n,
                        value: n.val(),
                        text: r,
                        slug: e.utils.replaceDiacritics(r),
                        disabled: n.prop("disabled")
                    }, e.lookupItems[o] = e.items[i], o++
                }
            }), e.setLabel(), e.elements.items.append(e.elements.itemsScroll.html(e.getItemsMarkup(e.items))))
        },
        getItemsMarkup: function(e) {
            var i = this,
                n = "<ul>";
            return t.each(e, function(e, s) {
                void 0 !== s.label ? (n += i.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', t.trim([i.classes.group, s.groupDisabled ? "disabled" : "", s.element.prop("class")].join(" ")), i.classes.grouplabel, s.element.prop("label")), t.each(s.items, function(t, e) {
                    n += i.getItemMarkup(e.index, e)
                }), n += "</ul>") : n += i.getItemMarkup(s.index, s)
            }), n + "</ul>"
        },
        getItemMarkup: function(e, i) {
            var n = this,
                s = n.options.optionsItemBuilder;
            return n.utils.format('<li data-index="{1}" class="{2}">{3}</li>', e, t.trim([e === n.state.currValue ? "selected" : "", e === n.items.length - 1 ? "last" : "", i.disabled ? "disabled" : ""].join(" ")), t.isFunction(s) ? s(i, i.element, e) : n.utils.format(s, i))
        },
        bindEvents: function() {
            var e = this;
            e.elements.wrapper.add(e.$element).add(e.elements.outerWrapper).add(e.elements.input).off(o), e.elements.outerWrapper.on("mouseenter" + o + " mouseleave" + o, function(i) {
                t(this).toggleClass(e.classes.hover, "mouseenter" === i.type), e.options.openOnHover && (clearTimeout(e.closeTimer), "mouseleave" === i.type ? e.closeTimer = setTimeout(t.proxy(e.close, e), e.options.hoverIntentTimeout) : e.open())
            }), e.elements.wrapper.on("click" + o, function(t) {
                e.state.opened ? e.close() : e.open(t)
            }), e.elements.input.prop({
                tabindex: e.originalTabindex,
                disabled: !1
            }).on("keypress" + o, e.handleSystemKeys).on("keydown" + o, function(t) {
                e.handleSystemKeys(t), clearTimeout(e.resetStr), e.resetStr = setTimeout(function() {
                    e.elements.input.val("")
                }, e.options.keySearchTimeout);
                var i = t.keyCode || t.which;
                if (i > 36 && 41 > i) {
                    if (!e.options.allowWrap && (39 > i && 0 === e.state.selectedIdx || i > 38 && e.state.selectedIdx + 1 === e.items.length)) return;
                    e.select(e.utils[(39 > i ? "previous" : "next") + "EnabledItem"](e.items, e.state.selectedIdx))
                }
            }).on("focusin" + o, function(t) {
                e.state.opened || e.open(t)
            }).on("oninput" in e.elements.input[0] ? "input" : "keyup", function() {
                e.elements.input.val().length && t.each(e.items, function(t, i) {
                    return RegExp("^" + e.elements.input.val(), "i").test(i.slug) && !i.disabled ? (e.select(t), !1) : void 0
                })
            }), e.$li.on({
                mousedown: function(t) {
                    t.preventDefault(), t.stopPropagation()
                },
                click: function() {
                    return e.select(t(this).data("index"), !0), !1
                }
            })
        },
        handleSystemKeys: function(t) {
            var e = this,
                i = t.keyCode || t.which;
            13 == i && t.preventDefault(), /^(9|13|27)$/.test(i) && (t.stopPropagation(), e.select(e.state.selectedIdx, !0))
        },
        refresh: function() {
            var t = this;
            t.populate(), t.activate(), t.utils.triggerCallback("Refresh", t)
        },
        setOptionsDimensions: function() {
            var t = this,
                e = t.elements.items.closest(":visible").children(":hidden").addClass(t.classes.tempshow),
                i = t.options.maxHeight,
                n = t.elements.items.outerWidth(),
                s = t.elements.wrapper.outerWidth() - (n - t.elements.items.width());
            !t.options.expandToItemText || s > n ? t.finalWidth = s : (t.elements.items.css("overflow", "scroll"), t.elements.outerWrapper.width(9e4), t.finalWidth = t.elements.items.width(), t.elements.items.css("overflow", ""), t.elements.outerWrapper.width("")), t.elements.items.width(t.finalWidth).height() > i && t.elements.items.height(i), e.removeClass(t.classes.tempshow)
        },
        isInViewport: function() {
            var t = this,
                e = i.scrollTop(),
                n = i.height(),
                s = t.elements.outerWrapper.offset().top,
                o = t.elements.outerWrapper.outerHeight(),
                r = s + o + t.itemsHeight <= e + n,
                a = s - t.itemsHeight > e,
                l = !r && a;
            t.elements.outerWrapper.toggleClass(t.classes.above, l)
        },
        detectItemVisibility: function(t) {
            var e = this,
                i = e.$li.eq(t).outerHeight(),
                n = e.$li[t].offsetTop,
                s = e.elements.itemsScroll.scrollTop(),
                o = n + 2 * i;
            e.elements.itemsScroll.scrollTop(o > s + e.itemsHeight ? o - e.itemsHeight : s > n - i ? n - i : s)
        },
        open: function(i) {
            var s = this;
            s.utils.triggerCallback("BeforeOpen", s), i && (i.preventDefault(), i.stopPropagation()), s.state.enabled && (s.setOptionsDimensions(), t("." + s.classes.hideselect, "." + s.classes.open).children()[n]("close"), s.state.opened = !0, s.itemsHeight = s.elements.items.outerHeight(), s.itemsInnerHeight = s.elements.items.height(), s.elements.outerWrapper.addClass(s.classes.open), s.elements.input.val(""), i && "focusin" !== i.type && s.elements.input.focus(), e.on("click" + o, t.proxy(s.close, s)).on("scroll" + o, t.proxy(s.isInViewport, s)), s.isInViewport(), s.options.preventWindowScroll && e.on("mousewheel" + o + " DOMMouseScroll" + o, "." + s.classes.scroll, function(e) {
                var i = e.originalEvent,
                    n = t(this).scrollTop(),
                    o = 0;
                "detail" in i && (o = -1 * i.detail), "wheelDelta" in i && (o = i.wheelDelta), "wheelDeltaY" in i && (o = i.wheelDeltaY), "deltaY" in i && (o = -1 * i.deltaY), (n === this.scrollHeight - s.itemsInnerHeight && 0 > o || 0 === n && o > 0) && e.preventDefault()
            }), s.detectItemVisibility(s.state.selectedIdx), s.utils.triggerCallback("Open", s))
        },
        close: function() {
            var t = this;
            t.utils.triggerCallback("BeforeClose", t), t.change(), e.off(o), t.elements.outerWrapper.removeClass(t.classes.open), t.state.opened = !1, t.utils.triggerCallback("Close", t)
        },
        change: function() {
            var t = this;
            t.utils.triggerCallback("BeforeChange", t), t.state.currValue !== t.state.selectedIdx && (t.$element.prop("selectedIndex", t.state.currValue = t.state.selectedIdx).data("value", t.lookupItems[t.state.selectedIdx].text), t.setLabel()), t.utils.triggerCallback("Change", t)
        },
        select: function(t, e) {
            var i = this;
            void 0 !== t && (i.lookupItems[t].disabled || (i.$li.filter("[data-index]").removeClass("selected").eq(i.state.selectedIdx = t).addClass("selected"), i.detectItemVisibility(t), e && i.close()))
        },
        destroy: function(t) {
            var e = this;
            e.state && e.state.enabled && (e.elements.items.add(e.elements.wrapper).add(e.elements.input).remove(), t || e.$element.removeData(n).removeData("value"), e.$element.prop("tabindex", e.originalTabindex).off(o).off(e.eventTriggers).unwrap().unwrap(), e.state.enabled = !1)
        }
    }, t.fn[n] = function(e) {
        return this.each(function() {
            var i = t.data(this, n);
            i && !i.disableOnMobile ? "string" == typeof e && i[e] ? i[e]() : i.init(e) : t.data(this, n, new l(this, e))
        })
    }, t.fn[n].hooks = {
        add: function(t, e, i) {
            this[t] || (this[t] = {}), this[t][e] = i
        },
        remove: function(t, e) {
            delete this[t][e]
        }
    }, t.fn[n].defaults = {
        onChange: function(e) {
            t(e).change()
        },
        maxHeight: 300,
        keySearchTimeout: 500,
        arrowButtonMarkup: '<b class="button">&#x25be;</b>',
        disableOnMobile: !0,
        openOnHover: !1,
        hoverIntentTimeout: 500,
        expandToItemText: !1,
        responsive: !1,
        preventWindowScroll: !0,
        inheritOriginalWidth: !1,
        allowWrap: !0,
        customClass: {
            prefix: n,
            camelCase: !1
        },
        optionsItemBuilder: "{text}",
        labelBuilder: "{text}"
    }
}), ! function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function s(e, i) {
            t.fn[e] = function(s) {
                if ("string" == typeof s) {
                    for (var r = n.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                        var c = this[a],
                            u = t.data(c, e);
                        if (u)
                            if (t.isFunction(u[s]) && "_" !== s.charAt(0)) {
                                var p = u[s].apply(u, r);
                                if (void 0 !== p) return p
                            } else o("no such method '" + s + "' for " + e + " instance");
                        else o("cannot call methods on " + e + " prior to initialization; attempted to call '" + s + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var n = t.data(this, e);
                    n ? (n.option(s), n._init()) : (n = new i(this, s), t.data(this, e, n))
                })
            }
        }
        if (t) {
            var o = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), s(t, e)
            }, t.bridget
        }
    }
    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : t.jQuery)
}(window),
function(t) {
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        n = function() {};
    i.addEventListener ? n = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (n = function(t, i, n) {
        t[i + n] = n.handleEvent ? function() {
            var i = e(t);
            n.handleEvent.call(n, i)
        } : function() {
            var i = e(t);
            n.call(t, i)
        }, t.attachEvent("on" + i, t[i + n])
    });
    var s = function() {};
    i.removeEventListener ? s = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (s = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (n) {
            t[e + i] = void 0
        }
    });
    var o = {
        bind: n,
        unbind: s
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : "object" == typeof exports ? module.exports = o : t.eventie = o
}(window),
function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var n = t.prototype,
        s = this,
        o = s.EventEmitter;
    n.getListeners = function(t) {
        var e, i, n = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else e = n[t] || (n[t] = []);
        return e
    }, n.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i
    }, n.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, n.addListener = function(t, i) {
        var n, s = this.getListenersAsObject(t),
            o = "object" == typeof i;
        for (n in s) s.hasOwnProperty(n) && -1 === e(s[n], i) && s[n].push(o ? i : {
            listener: i,
            once: !1
        });
        return this
    }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
        return this.getListeners(t), this
    }, n.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this
    }, n.removeListener = function(t, i) {
        var n, s, o = this.getListenersAsObject(t);
        for (s in o) o.hasOwnProperty(s) && (n = e(o[s], i), -1 !== n && o[s].splice(n, 1));
        return this
    }, n.off = i("removeListener"), n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, n.manipulateListeners = function(t, e, i) {
        var n, s, o = t ? this.removeListener : this.addListener,
            r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--;) o.call(this, e, i[n]);
        else
            for (n in e) e.hasOwnProperty(n) && (s = e[n]) && ("function" == typeof s ? o.call(this, n, s) : r.call(this, n, s));
        return this
    }, n.removeEvent = function(t) {
        var e, i = typeof t,
            n = this._getEvents();
        if ("string" === i) delete n[t];
        else if (t instanceof RegExp)
            for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this
    }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
        var i, n, s, o, r = this.getListenersAsObject(t);
        for (s in r)
            if (r.hasOwnProperty(s))
                for (n = r[s].length; n--;) i = r[s][n], i.once === !0 && this.removeListener(t, i.listener), o = i.listener.apply(this, e || []), o === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, n.trigger = i("emitEvent"), n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, n.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, n._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, n._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return s.EventEmitter = o, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : s.EventEmitter = t
}.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof n[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, s = 0, o = i.length; o > s; s++)
                    if (e = i[s] + t, "string" == typeof n[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t, e) {
        function i(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function n() {}

        function s() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = a.length; i > e; e++) {
                var n = a[e];
                t[n] = 0
            }
            return t
        }

        function o(e) {
            function n() {
                if (!d) {
                    d = !0;
                    var n = t.getComputedStyle;
                    if (c = function() {
                            var t = n ? function(t) {
                                return n(t, null)
                            } : function(t) {
                                return t.currentStyle
                            };
                            return function(e) {
                                var i = t(e);
                                return i || r("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                            }
                        }(), u = e("boxSizing")) {
                        var s = document.createElement("div");
                        s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style[u] = "border-box";
                        var o = document.body || document.documentElement;
                        o.appendChild(s);
                        var a = c(s);
                        p = 200 === i(a.width), o.removeChild(s)
                    }
                }
            }

            function o(t) {
                if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var e = c(t);
                    if ("none" === e.display) return s();
                    var o = {};
                    o.width = t.offsetWidth, o.height = t.offsetHeight;
                    for (var r = o.isBorderBox = !(!u || !e[u] || "border-box" !== e[u]), d = 0, f = a.length; f > d; d++) {
                        var h = a[d],
                            m = e[h];
                        m = l(t, m);
                        var g = parseFloat(m);
                        o[h] = isNaN(g) ? 0 : g
                    }
                    var v = o.paddingLeft + o.paddingRight,
                        y = o.paddingTop + o.paddingBottom,
                        b = o.marginLeft + o.marginRight,
                        _ = o.marginTop + o.marginBottom,
                        w = o.borderLeftWidth + o.borderRightWidth,
                        x = o.borderTopWidth + o.borderBottomWidth,
                        S = r && p,
                        C = i(e.width);
                    C !== !1 && (o.width = C + (S ? 0 : v + w));
                    var I = i(e.height);
                    return I !== !1 && (o.height = I + (S ? 0 : y + x)), o.innerWidth = o.width - (v + w), o.innerHeight = o.height - (y + x), o.outerWidth = o.width + b, o.outerHeight = o.height + _, o
                }
            }

            function l(e, i) {
                if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
                var n = e.style,
                    s = n.left,
                    o = e.runtimeStyle,
                    r = o && o.left;
                return r && (o.left = e.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = s, r && (o.left = r), i
            }
            var c, u, p, d = !1;
            return o
        }
        var r = "undefined" == typeof console ? n : function(t) {
                console.error(t)
            },
            a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("desandro-get-style-property")) : t.getSize = o(t.getStyleProperty)
    }(window),
    function(t) {
        function e(t) {
            "function" == typeof t && (e.isReady ? t() : r.push(t))
        }

        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== o.readyState;
            e.isReady || i || n()
        }

        function n() {
            e.isReady = !0;
            for (var t = 0, i = r.length; i > t; t++) {
                var n = r[t];
                n()
            }
        }

        function s(s) {
            return "complete" === o.readyState ? n() : (s.bind(o, "DOMContentLoaded", i), s.bind(o, "readystatechange", i), s.bind(t, "load", i)), e
        }
        var o = t.document,
            r = [];
        e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], s) : "object" == typeof exports ? module.exports = s(require("eventie")) : t.docReady = s(t.eventie)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            return t[r](e)
        }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function n(t, e) {
            i(t);
            for (var n = t.parentNode.querySelectorAll(e), s = 0, o = n.length; o > s; s++)
                if (n[s] === t) return !0;
            return !1
        }

        function s(t, n) {
            return i(t), e(t, n)
        }
        var o, r = function() {
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length; n > i; i++) {
                var s = e[i],
                    o = s + "MatchesSelector";
                if (t[o]) return o
            }
        }();
        if (r) {
            var a = document.createElement("div"),
                l = e(a, "div");
            o = l ? e : s
        } else o = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return o
        }) : "object" == typeof exports ? module.exports = o : window.matchesSelector = o
    }(Element.prototype),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("doc-ready"), require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector)
    }(window, function(t, e, i) {
        var n = {};
        n.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }, n.modulo = function(t, e) {
            return (t % e + e) % e
        };
        var s = Object.prototype.toString;
        n.isArray = function(t) {
            return "[object Array]" == s.call(t)
        }, n.makeArray = function(t) {
            var e = [];
            if (n.isArray(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var i = 0, s = t.length; s > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }, n.indexOf = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return i;
            return -1
        }, n.removeFrom = function(t, e) {
            var i = n.indexOf(t, e); - 1 != i && t.splice(i, 1)
        }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
            return t instanceof HTMLElement
        } : function(t) {
            return t && "object" == typeof t && 1 == t.nodeType && "string" == typeof t.nodeName
        }, n.setText = function() {
            function t(t, i) {
                e = e || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), t[e] = i
            }
            var e;
            return t
        }(), n.getParent = function(t, e) {
            for (; t != document.body;)
                if (t = t.parentNode, i(t, e)) return t
        }, n.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, n.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.filterFindElements = function(t, e) {
            t = n.makeArray(t);
            for (var s = [], o = 0, r = t.length; r > o; o++) {
                var a = t[o];
                if (n.isElement(a))
                    if (e) {
                        i(a, e) && s.push(a);
                        for (var l = a.querySelectorAll(e), c = 0, u = l.length; u > c; c++) s.push(l[c])
                    } else s.push(a)
            }
            return s
        }, n.debounceMethod = function(t, e, i) {
            var n = t.prototype[e],
                s = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[s];
                t && clearTimeout(t);
                var e = arguments,
                    o = this;
                this[s] = setTimeout(function() {
                    n.apply(o, e), delete o[s]
                }, i || 100)
            }
        }, n.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var o = t.console;
        return n.htmlInit = function(i, s) {
            e(function() {
                for (var e = n.toDashed(s), r = document.querySelectorAll(".js-" + e), a = "data-" + e + "-options", l = 0, c = r.length; c > l; l++) {
                    var u, p = r[l],
                        d = p.getAttribute(a);
                    try {
                        u = d && JSON.parse(d)
                    } catch (f) {
                        o && o.error("Error parsing " + a + " on " + p.nodeName.toLowerCase() + (p.id ? "#" + p.id : "") + ": " + f);
                        continue
                    }
                    var h = new i(p, u),
                        m = t.jQuery;
                    m && m.data(p, s, h)
                }
            })
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(i, n, s, o) {
            return e(t, i, n, s, o)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (t.Outlayer = {}, t.Outlayer.Item = e(t, t.EventEmitter, t.getSize, t.getStyleProperty, t.fizzyUIUtils))
    }(window, function(t, e, i, n, s) {
        "use strict";

        function o(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function r(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function a(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }
        var l = t.getComputedStyle,
            c = l ? function(t) {
                return l(t, null)
            } : function(t) {
                return t.currentStyle
            },
            u = n("transition"),
            p = n("transform"),
            d = u && p,
            f = !!n("perspective"),
            h = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[u],
            m = ["transform", "transition", "transitionDuration", "transitionProperty"],
            g = function() {
                for (var t = {}, e = 0, i = m.length; i > e; e++) {
                    var s = m[e],
                        o = n(s);
                    o && o !== s && (t[s] = o)
                }
                return t
            }();
        s.extend(r.prototype, e.prototype), r.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, r.prototype.getSize = function() {
            this.size = i(this.element)
        }, r.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var n = g[i] || i;
                e[n] = t[i]
            }
        }, r.prototype.getPosition = function() {
            var t = c(this.element),
                e = this.layout.options,
                i = e.isOriginLeft,
                n = e.isOriginTop,
                s = t[i ? "left" : "right"],
                o = t[n ? "top" : "bottom"],
                r = this.layout.size,
                a = -1 != s.indexOf("%") ? parseFloat(s) / 100 * r.width : parseInt(s, 10),
                l = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
            a = isNaN(a) ? 0 : a, l = isNaN(l) ? 0 : l, a -= i ? r.paddingLeft : r.paddingRight, l -= n ? r.paddingTop : r.paddingBottom, this.position.x = a, this.position.y = l
        }, r.prototype.layoutPosition = function() {
            var t = this.layout.size,
                e = this.layout.options,
                i = {},
                n = e.isOriginLeft ? "paddingLeft" : "paddingRight",
                s = e.isOriginLeft ? "left" : "right",
                o = e.isOriginLeft ? "right" : "left",
                r = this.position.x + t[n];
            i[s] = this.getXValue(r), i[o] = "";
            var a = e.isOriginTop ? "paddingTop" : "paddingBottom",
                l = e.isOriginTop ? "top" : "bottom",
                c = e.isOriginTop ? "bottom" : "top",
                u = this.position.y + t[a];
            i[l] = this.getYValue(u), i[c] = "", this.css(i), this.emitEvent("layout", [this])
        }, r.prototype.getXValue = function(t) {
            var e = this.layout.options;
            return e.percentPosition && !e.isHorizontal ? t / this.layout.size.width * 100 + "%" : t + "px"
        }, r.prototype.getYValue = function(t) {
            var e = this.layout.options;
            return e.percentPosition && e.isHorizontal ? t / this.layout.size.height * 100 + "%" : t + "px"
        }, r.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                s = parseInt(t, 10),
                o = parseInt(e, 10),
                r = s === this.position.x && o === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
            var a = t - i,
                l = e - n,
                c = {};
            c.transform = this.getTranslate(a, l), this.transition({
                to: c,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, r.prototype.getTranslate = function(t, e) {
            var i = this.layout.options;
            return t = i.isOriginLeft ? t : -t, e = i.isOriginTop ? e : -e, f ? "translate3d(" + t + "px, " + e + "px, 0)" : "translate(" + t + "px, " + e + "px)"
        }, r.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, r.prototype.moveTo = d ? r.prototype._transitionTo : r.prototype.goTo, r.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, r.prototype._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, r.prototype._transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var v = "opacity," + a(g.transform || "transform");
        r.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: v,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(h, this, !1))
        }, r.prototype.transition = r.prototype[u ? "_transition" : "_nonTransition"], r.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, r.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var y = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        r.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = y[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], o(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                    var n = e.onEnd[i];
                    n.call(this), delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, r.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
        }, r.prototype._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var b = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return r.prototype.removeTransitionStyles = function() {
            this.css(b)
        }, r.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, r.prototype.remove = function() {
            if (!u || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var t = this;
            this.once("transitionEnd", function() {
                t.removeElem()
            }), this.hide()
        }, r.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            e[i] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, r.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, r.prototype.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i
        }, r.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            e[i] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, r.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, r.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, r
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, s, o, r) {
            return e(t, i, n, s, o, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.eventie, t.EventEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, function(t, e, i, n, s, o) {
        "use strict";

        function r(t, e) {
            var i = s.getQueryElement(t);
            if (!i) return void(a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            this.element = i, l && (this.$element = l(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(e);
            var n = ++u;
            this.element.outlayerGUID = n, p[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var a = t.console,
            l = t.jQuery,
            c = function() {},
            u = 0,
            p = {};
        return r.namespace = "outlayer", r.Item = o, r.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, s.extend(r.prototype, i.prototype), r.prototype.option = function(t) {
            s.extend(this.options, t)
        }, r.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, r.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, r.prototype._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], s = 0, o = e.length; o > s; s++) {
                var r = e[s],
                    a = new i(r, this);
                n.push(a)
            }
            return n
        }, r.prototype._filterFindItemElements = function(t) {
            return s.filterFindElements(t, this.options.itemSelector)
        }, r.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
            return t
        }, r.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, r.prototype._init = r.prototype.layout, r.prototype._resetLayout = function() {
            this.getSize()
        }, r.prototype.getSize = function() {
            this.size = n(this.element)
        }, r.prototype._getMeasurement = function(t, e) {
            var i, o = this.options[t];
            o ? ("string" == typeof o ? i = this.element.querySelector(o) : s.isElement(o) && (i = o), this[t] = i ? n(i)[e] : o) : this[t] = 0
        }, r.prototype.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, r.prototype._getItemsForLayout = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s.isIgnored || e.push(s)
            }
            return e
        }, r.prototype._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                for (var i = [], n = 0, s = t.length; s > n; n++) {
                    var o = t[n],
                        r = this._getItemLayoutPosition(o);
                    r.item = o, r.isInstant = e || o.isLayoutInstant, i.push(r)
                }
                this._processLayoutQueue(i)
            }
        }, r.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, r.prototype._processLayoutQueue = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, r.prototype._positionItem = function(t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i)
        }, r.prototype._postLayout = function() {
            this.resizeContainer()
        }, r.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, r.prototype._getContainerSize = c, r.prototype._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, r.prototype._emitCompleteOnItems = function(t, e) {
            function i() {
                s.dispatchEvent(t + "Complete", null, [e])
            }

            function n() {
                r++, r === o && i()
            }
            var s = this,
                o = e.length;
            if (!e || !o) return void i();
            for (var r = 0, a = 0, l = e.length; l > a; a++) {
                var c = e[a];
                c.once(t, n)
            }
        }, r.prototype.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), l)
                if (this.$element = this.$element || l(this.element), e) {
                    var s = l.Event(e);
                    s.type = t, this.$element.trigger(s, i)
                } else this.$element.trigger(t, i)
        }, r.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, r.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, r.prototype.stamp = function(t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this.ignore(n)
                }
            }
        }, r.prototype.unstamp = function(t) {
            if (t = this._find(t))
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    s.removeFrom(this.stamps, n), this.unignore(n)
                }
        }, r.prototype._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = s.makeArray(t)) : void 0
        }, r.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, r.prototype._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(),
                e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, r.prototype._manageStamp = c, r.prototype._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(),
                i = this._boundingRect,
                s = n(t),
                o = {
                    left: e.left - i.left - s.marginLeft,
                    top: e.top - i.top - s.marginTop,
                    right: i.right - e.right - s.marginRight,
                    bottom: i.bottom - e.bottom - s.marginBottom
                };
            return o
        }, r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, r.prototype.bindResize = function() {
            this.isResizeBound || (e.bind(t, "resize", this), this.isResizeBound = !0)
        }, r.prototype.unbindResize = function() {
            this.isResizeBound && e.unbind(t, "resize", this), this.isResizeBound = !1
        }, r.prototype.onresize = function() {
            function t() {
                e.resize(), delete e.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, r.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, r.prototype.needsResizeLayout = function() {
            var t = n(this.element),
                e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, r.prototype.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, r.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, r.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, r.prototype.reveal = function(t) {
            this._emitCompleteOnItems("reveal", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.reveal()
            }
        }, r.prototype.hide = function(t) {
            this._emitCompleteOnItems("hide", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.hide()
            }
        }, r.prototype.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, r.prototype.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e)
        }, r.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t) return n
            }
        }, r.prototype.getItems = function(t) {
            t = s.makeArray(t);
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i],
                    r = this.getItem(o);
                r && e.push(r)
            }
            return e
        }, r.prototype.remove = function(t) {
            var e = this.getItems(t);
            if (this._emitCompleteOnItems("remove", e), e && e.length)
                for (var i = 0, n = e.length; n > i; i++) {
                    var o = e[i];
                    o.remove(), s.removeFrom(this.items, o)
                }
        }, r.prototype.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                n.destroy()
            }
            this.unbindResize();
            var s = this.element.outlayerGUID;
            delete p[s], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
        }, r.data = function(t) {
            t = s.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && p[e]
        }, r.create = function(t, e) {
            function i() {
                r.apply(this, arguments)
            }
            return Object.create ? i.prototype = Object.create(r.prototype) : s.extend(i.prototype, r.prototype), i.prototype.constructor = i, i.defaults = s.extend({}, r.defaults), s.extend(i.defaults, e), i.prototype.settings = {}, i.namespace = t, i.data = r.data, i.Item = function() {
                o.apply(this, arguments)
            }, i.Item.prototype = new o, s.htmlInit(i, t), l && l.bridget && l.bridget(t, i), i
        }, r.Item = o, r
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window, function(t) {
        "use strict";

        function e() {
            t.Item.apply(this, arguments)
        }
        e.prototype = new t.Item, e.prototype._create = function() {
            this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
        }, e.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var t = this.layout.options.getSortData,
                    e = this.layout._sorters;
                for (var i in t) {
                    var n = e[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var i = e.prototype.destroy;
        return e.prototype.destroy = function() {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window, function(t, e) {
        "use strict";

        function i(t) {
            this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
        }
        return function() {
            function t(t) {
                return function() {
                    return e.prototype[t].apply(this.isotope, arguments)
                }
            }
            for (var n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], s = 0, o = n.length; o > s; s++) {
                var r = n[s];
                i.prototype[r] = t(r)
            }
        }(), i.prototype.needsVerticalResizeLayout = function() {
            var e = t(this.isotope.element),
                i = this.isotope.size && e;
            return i && e.innerHeight != this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function(t, e) {
            var i = t + e,
                n = "outer" + e;
            if (this._getMeasurement(i, n), !this[i]) {
                var s = this.getFirstItemSize();
                this[i] = s && s[n] || this.isotope.size["inner" + e]
            }
        }, i.prototype.getFirstItemSize = function() {
            var e = this.isotope.filteredItems[0];
            return e && e.element && t(e.element)
        }, i.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(t, e) {
            function n() {
                i.apply(this, arguments)
            }
            return n.prototype = new i, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
        }, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils)
    }(window, function(t, e, i) {
        var n = t.create("masonry");
        return n.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;) this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0],
                    i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter,
                s = this.containerWidth + this.gutter,
                o = s / n,
                r = n - s % n,
                a = r && 1 > r ? "round" : "floor";
            o = Math[a](o), this.cols = Math.max(o, 1)
        }, n.prototype.getContainerWidth = function() {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                n = e && 1 > e ? "round" : "ceil",
                s = Math[n](t.size.outerWidth / this.columnWidth);
            s = Math.min(s, this.cols);
            for (var o = this._getColGroup(s), r = Math.min.apply(Math, o), a = i.indexOf(o, r), l = {
                    x: this.columnWidth * a,
                    y: r
                }, c = r + t.size.outerHeight, u = this.cols + 1 - o.length, p = 0; u > p; p++) this.colYs[a + p] = c;
            return l
        }, n.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var s = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, s)
            }
            return e
        }, n.prototype._manageStamp = function(t) {
            var i = e(t),
                n = this._getElementOffset(t),
                s = this.options.isOriginLeft ? n.left : n.right,
                o = s + i.outerWidth,
                r = Math.floor(s / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(o / this.columnWidth);
            a -= o % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, c = r; a >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
        }, n.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, n.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window, function(t, e) {
        "use strict";

        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }
        var n = t.create("masonry"),
            s = n.prototype._getElementOffset,
            o = n.prototype.layout,
            r = n.prototype._getMeasurement;
        i(n.prototype, e.prototype), n.prototype._getElementOffset = s, n.prototype.layout = o, n.prototype._getMeasurement = r;
        var a = n.prototype.measureColumns;
        n.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, a.call(this)
        };
        var l = n.prototype._manageStamp;
        return n.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, l.apply(this, arguments)
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("fitRows");
        return e.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("vertical", {
            horizontalAlignment: 0
        });
        return e.prototype._resetLayout = function() {
            this.y = 0
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += t.size.outerHeight, {
                x: e,
                y: i
            }
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, n, s, o, r, a) {
            return e(t, i, n, s, o, r, a)
        }) : "object" == typeof exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window, function(t, e, i, n, s, o, r) {
        function a(t, e) {
            return function(i, n) {
                for (var s = 0, o = t.length; o > s; s++) {
                    var r = t[s],
                        a = i.sortData[r],
                        l = n.sortData[r];
                    if (a > l || l > a) {
                        var c = void 0 !== e[r] ? e[r] : e,
                            u = c ? 1 : -1;
                        return (a > l ? 1 : -1) * u
                    }
                }
                return 0
            }
        }
        var l = t.jQuery,
            c = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            u = document.documentElement,
            p = u.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            d = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        d.Item = o, d.LayoutMode = r, d.prototype._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var t in r.modes) this._initLayoutMode(t)
        }, d.prototype.reloadItems = function() {
            this.itemGUID = 0, e.prototype.reloadItems.call(this)
        }, d.prototype._itemize = function() {
            for (var t = e.prototype._itemize.apply(this, arguments), i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s.id = this.itemGUID++
            }
            return this._updateItemsSortData(t), t
        }, d.prototype._initLayoutMode = function(t) {
            var e = r.modes[t],
                i = this.options[t] || {};
            this.options[t] = e.options ? s.extend(e.options, i) : i, this.modes[t] = new e(this)
        }, d.prototype.layout = function() {
            return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
        }, d.prototype._layout = function() {
            var t = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
        }, d.prototype.arrange = function(t) {
            function e() {
                n.reveal(i.needReveal), n.hide(i.needHide)
            }
            this.option(t), this._getIsInstant();
            var i = this._filter(this.items);
            this.filteredItems = i.matches;
            var n = this;
            this._bindArrangeComplete(), this._isInstant ? this._noTransition(e) : e(), this._sort(), this._layout()
        }, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function() {
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = t, t
        }, d.prototype._bindArrangeComplete = function() {
            function t() {
                e && i && n && s.dispatchEvent("arrangeComplete", null, [s.filteredItems])
            }
            var e, i, n, s = this;
            this.once("layoutComplete", function() {
                e = !0, t()
            }), this.once("hideComplete", function() {
                i = !0, t()
            }), this.once("revealComplete", function() {
                n = !0, t()
            })
        }, d.prototype._filter = function(t) {
            var e = this.options.filter;
            e = e || "*";
            for (var i = [], n = [], s = [], o = this._getFilterTest(e), r = 0, a = t.length; a > r; r++) {
                var l = t[r];
                if (!l.isIgnored) {
                    var c = o(l);
                    c && i.push(l), c && l.isHidden ? n.push(l) : c || l.isHidden || s.push(l)
                }
            }
            return {
                matches: i,
                needReveal: n,
                needHide: s
            }
        }, d.prototype._getFilterTest = function(t) {
            return l && this.options.isJQueryFiltering ? function(e) {
                return l(e.element).is(t)
            } : "function" == typeof t ? function(e) {
                return t(e.element)
            } : function(e) {
                return n(e.element, t)
            }
        }, d.prototype.updateSortData = function(t) {
            var e;
            t ? (t = s.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
        }, d.prototype._getSorters = function() {
            var t = this.options.getSortData;
            for (var e in t) {
                var i = t[e];
                this._sorters[e] = f(i)
            }
        }, d.prototype._updateItemsSortData = function(t) {
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.updateSortData()
            }
        };
        var f = function() {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = c(t).split(" "),
                    n = i[0],
                    s = n.match(/^\[(.+)\]$/),
                    o = s && s[1],
                    r = e(o, n),
                    a = d.sortDataParsers[i[1]];
                return t = a ? function(t) {
                    return t && a(r(t))
                } : function(t) {
                    return t && r(t)
                }
            }

            function e(t, e) {
                var i;
                return i = t ? function(e) {
                    return e.getAttribute(t)
                } : function(t) {
                    var i = t.querySelector(e);
                    return i && p(i)
                }
            }
            return t
        }();
        d.sortDataParsers = {
            parseInt: function(t) {
                return parseInt(t, 10)
            },
            parseFloat: function(t) {
                return parseFloat(t)
            }
        }, d.prototype._sort = function() {
            var t = this.options.sortBy;
            if (t) {
                var e = [].concat.apply(t, this.sortHistory),
                    i = a(e, this.options.sortAscending);
                this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
            }
        }, d.prototype._mode = function() {
            var t = this.options.layoutMode,
                e = this.modes[t];
            if (!e) throw new Error("No layout mode: " + t);
            return e.options = this.options[t], e
        }, d.prototype._resetLayout = function() {
            e.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, d.prototype._getItemLayoutPosition = function(t) {
            return this._mode()._getItemLayoutPosition(t)
        }, d.prototype._manageStamp = function(t) {
            this._mode()._manageStamp(t)
        }, d.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, d.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, d.prototype.appended = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i = this._filterRevealAdded(e);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, d.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(e);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
            }
        }, d.prototype._filterRevealAdded = function(t) {
            var e = this._filter(t);
            return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
        }, d.prototype.insert = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i, n, s = e.length;
                for (i = 0; s > i; i++) n = e[i], this.element.appendChild(n.element);
                var o = this._filter(e).matches;
                for (i = 0; s > i; i++) e[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; s > i; i++) delete e[i].isLayoutInstant;
                this.reveal(o)
            }
        };
        var h = d.prototype.remove;
        return d.prototype.remove = function(t) {
            t = s.makeArray(t);
            var e = this.getItems(t);
            h.call(this, t);
            var i = e && e.length;
            if (i)
                for (var n = 0; i > n; n++) {
                    var o = e[n];
                    s.removeFrom(this.filteredItems, o)
                }
        }, d.prototype.shuffle = function() {
            for (var t = 0, e = this.items.length; e > t; t++) {
                var i = this.items[t];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, d.prototype._noTransition = function(t) {
            var e = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = t.call(this);
            return this.options.transitionDuration = e, i
        }, d.prototype.getFilteredItemElements = function() {
            for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
            return t
        }, d
    }),
    function(t, e, i) {
        t.jRespond = function(t) {
            var e = [],
                n = [],
                s = t,
                o = "",
                r = "",
                a = 0,
                l = 100,
                c = 500,
                u = c,
                p = function() {
                    var t = 0;
                    return t = "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth
                },
                d = function(t) {
                    if (t.length === i) f(t);
                    else
                        for (var e = 0; e < t.length; e++) f(t[e])
                },
                f = function(t) {
                    var s = t.breakpoint,
                        a = t.enter || i;
                    e.push(t), n.push(!1), g(s) && (a !== i && a.call(null, {
                        entering: o,
                        exiting: r
                    }), n[e.length - 1] = !0)
                },
                h = function() {
                    for (var t = [], s = [], a = 0; a < e.length; a++) {
                        var l = e[a].breakpoint,
                            c = e[a].enter || i,
                            u = e[a].exit || i;
                        "*" === l ? (c !== i && t.push(c), u !== i && s.push(u)) : g(l) ? (c === i || n[a] || t.push(c), n[a] = !0) : (u !== i && n[a] && s.push(u), n[a] = !1)
                    }
                    for (var p = {
                            entering: o,
                            exiting: r
                        }, d = 0; d < s.length; d++) s[d].call(null, p);
                    for (var f = 0; f < t.length; f++) t[f].call(null, p)
                },
                m = function(t) {
                    for (var e = !1, i = 0; i < s.length; i++)
                        if (t >= s[i].enter && t <= s[i].exit) {
                            e = !0;
                            break
                        }
                    e && o !== s[i].label ? (r = o, o = s[i].label, h()) : e || "" === o || (o = "", h())
                },
                g = function(t) {
                    if ("object" == typeof t) {
                        if (t.join().indexOf(o) >= 0) return !0
                    } else {
                        if ("*" === t) return !0;
                        if ("string" == typeof t && o === t) return !0
                    }
                },
                v = function() {
                    var t = p();
                    t !== a ? (u = l, m(t)) : u = c, a = t, setTimeout(v, u)
                };
            return v(), {
                addFunc: function(t) {
                    d(t)
                },
                getBreakpoint: function() {
                    return o
                }
            }
        }
    }(this, this.document), ! function(t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }(this, function() {
        function t() {}
        var e = t.prototype;
        return e.on = function(t, e) {
            if (t && e) {
                var i = this._events = this._events || {},
                    n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e), this
            }
        }, e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {},
                    n = i[t] = i[t] || [];
                return n[e] = !0, this
            }
        }, e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this
            }
        }, e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0,
                    s = i[n];
                e = e || [];
                for (var o = this._onceEvents && this._onceEvents[t]; s;) {
                    var r = o && o[s];
                    r && (this.off(t, s), delete o[s]), s.apply(this, e), n += r ? 0 : 1, s = i[n]
                }
                return this
            }
        }, t
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }(window, function(t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function n(t) {
            var e = [];
            if (Array.isArray(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function s(t, e, o) {
            return this instanceof s ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? o = e : i(this.options, e), o && this.on("always", o), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function() {
                this.check()
            }.bind(this))) : new s(t, e, o)
        }

        function o(t) {
            this.img = t
        }

        function r(t, e) {
            this.url = t, this.element = e, this.img = new Image
        }
        var a = t.jQuery,
            l = t.console;
        s.prototype = Object.create(e.prototype), s.prototype.options = {}, s.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, s.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && c[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var s = i[n];
                    this.addImage(s)
                }
                if ("string" == typeof this.options.background) {
                    var o = t.querySelectorAll(this.options.background);
                    for (n = 0; n < o.length; n++) {
                        var r = o[n];
                        this.addElementBackgroundImages(r)
                    }
                }
            }
        };
        var c = {
            1: !0,
            9: !0,
            11: !0
        };
        return s.prototype.addElementBackgroundImages = function(t) {
            var e = getComputedStyle(t);
            if (e)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                    var s = n && n[2];
                    s && this.addBackground(s, t), n = i.exec(e.backgroundImage)
                }
        }, s.prototype.addImage = function(t) {
            var e = new o(t);
            this.images.push(e)
        }, s.prototype.addBackground = function(t, e) {
            var i = new r(t, e);
            this.images.push(i)
        }, s.prototype.check = function() {
            function t(t, i, n) {
                setTimeout(function() {
                    e.progress(t, i, n)
                })
            }
            var e = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
                e.once("progress", t), e.check()
            }) : void this.complete()
        }, s.prototype.progress = function(t, e, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
        }, s.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }, o.prototype = Object.create(e.prototype), o.prototype.check = function() {
            var t = this.getIsImageComplete();
            return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, o.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, o.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
        }, o.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, o.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, o.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, o.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, r.prototype = Object.create(o.prototype), r.prototype.check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
            var t = this.getIsImageComplete();
            t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, r.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, r.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
        }, s.makeJQueryPlugin = function(e) {
            e = e || t.jQuery, e && (a = e, a.fn.imagesLoaded = function(t, e) {
                var i = new s(this, t, e);
                return i.jqDeferred.promise(a(this))
            })
        }, s.makeJQueryPlugin(), s
    }), ! function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
    }(function(t) {
        function e(e) {
            var r = e || window.event,
                a = l.call(arguments, 1),
                c = 0,
                p = 0,
                d = 0,
                f = 0,
                h = 0,
                m = 0;
            if (e = t.event.fix(r), e.type = "mousewheel", "detail" in r && (d = -1 * r.detail), "wheelDelta" in r && (d = r.wheelDelta), "wheelDeltaY" in r && (d = r.wheelDeltaY), "wheelDeltaX" in r && (p = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (p = -1 * d, d = 0), c = 0 === d ? p : d, "deltaY" in r && (d = -1 * r.deltaY, c = d), "deltaX" in r && (p = r.deltaX, 0 === d && (c = -1 * p)), 0 !== d || 0 !== p) {
                if (1 === r.deltaMode) {
                    var g = t.data(this, "mousewheel-line-height");
                    c *= g, d *= g, p *= g
                } else if (2 === r.deltaMode) {
                    var v = t.data(this, "mousewheel-page-height");
                    c *= v, d *= v, p *= v
                }
                if (f = Math.max(Math.abs(d), Math.abs(p)), (!o || o > f) && (o = f, n(r, f) && (o /= 40)), n(r, f) && (c /= 40, p /= 40, d /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / o), p = Math[p >= 1 ? "floor" : "ceil"](p / o), d = Math[d >= 1 ? "floor" : "ceil"](d / o), u.settings.normalizeOffset && this.getBoundingClientRect) {
                    var y = this.getBoundingClientRect();
                    h = e.clientX - y.left, m = e.clientY - y.top
                }
                return e.deltaX = p, e.deltaY = d, e.deltaFactor = o, e.offsetX = h, e.offsetY = m, e.deltaMode = 0, a.unshift(e, c, p, d), s && clearTimeout(s), s = setTimeout(i, 200), (t.event.dispatch || t.event.handle).apply(this, a)
            }
        }

        function i() {
            o = null
        }

        function n(t, e) {
            return u.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 === 0
        }
        var s, o, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            l = Array.prototype.slice;
        if (t.event.fixHooks)
            for (var c = r.length; c;) t.event.fixHooks[r[--c]] = t.event.mouseHooks;
        var u = t.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var i = a.length; i;) this.addEventListener(a[--i], e, !1);
                else this.onmousewheel = e;
                t.data(this, "mousewheel-line-height", u.getLineHeight(this)), t.data(this, "mousewheel-page-height", u.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var i = a.length; i;) this.removeEventListener(a[--i], e, !1);
                else this.onmousewheel = null;
                t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(e) {
                var i = t(e),
                    n = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
                return n.length || (n = t("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
            },
            getPageHeight: function(e) {
                return t(e).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        t.fn.extend({
            mousewheel: function(t) {
                return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
            },
            unmousewheel: function(t) {
                return this.unbind("mousewheel", t)
            }
        })
    }), ! function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        t.fn.jScrollPane = function(e) {
            function i(e, i) {
                function n(i) {
                    var o, a, c, u, p, h, m = !1,
                        g = !1;
                    if (F = i, void 0 === H) p = e.scrollTop(), h = e.scrollLeft(), e.css({
                        overflow: "hidden",
                        padding: 0
                    }), R = e.innerWidth() + vt, W = e.innerHeight(), e.width(R), H = t('<div class="jspPane" />').css("padding", gt).append(e.children()), q = t('<div class="jspContainer" />').css({
                        width: R + "px",
                        height: W + "px"
                    }).append(H).appendTo(e);
                    else {
                        if (e.css("width", ""), m = F.stickToBottom && E(), g = F.stickToRight && $(), u = e.innerWidth() + vt != R || e.outerHeight() != W, u && (R = e.innerWidth() + vt, W = e.innerHeight(), q.css({
                                width: R + "px",
                                height: W + "px"
                            })), !u && yt == B && H.outerHeight() == U) return void e.width(R);
                        yt = B, H.css("width", ""), e.width(R), q.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                    }
                    H.css("overflow", "auto"), B = i.contentWidth ? i.contentWidth : H[0].scrollWidth, U = H[0].scrollHeight, H.css("overflow", ""), V = B / R, X = U / W, Y = X > 1, Q = V > 1, Q || Y ? (e.addClass("jspScrollable"), o = F.maintainPosition && (J || et), o && (a = C(), c = I()), s(), r(), l(), o && (x(g ? B - R : a, !1), w(m ? U - W : c, !1)), k(), j(), A(), F.enableKeyboardNavigation && D(), F.clickOnTrack && d(), N(), F.hijackInternalLinks && M()) : (e.removeClass("jspScrollable"), H.css({
                        top: 0,
                        left: 0,
                        width: q.width() - vt
                    }), P(), z(), O(), f()), F.autoReinitialise && !mt ? mt = setInterval(function() {
                        n(F)
                    }, F.autoReinitialiseDelay) : !F.autoReinitialise && mt && clearInterval(mt), p && e.scrollTop(0) && w(p, !1), h && e.scrollLeft(0) && x(h, !1), e.trigger("jsp-initialised", [Q || Y])
                }

                function s() {
                    Y && (q.append(t('<div class="jspVerticalBar" />').append(t('<div class="jspCap jspCapTop" />'), t('<div class="jspTrack" />').append(t('<div class="jspDrag" />').append(t('<div class="jspDragTop" />'), t('<div class="jspDragBottom" />'))), t('<div class="jspCap jspCapBottom" />'))), it = q.find(">.jspVerticalBar"), nt = it.find(">.jspTrack"), G = nt.find(">.jspDrag"), F.showArrows && (at = t('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", u(0, -1)).bind("click.jsp", T), lt = t('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", u(0, 1)).bind("click.jsp", T), F.arrowScrollOnHover && (at.bind("mouseover.jsp", u(0, -1, at)), lt.bind("mouseover.jsp", u(0, 1, lt))), c(nt, F.verticalArrowPositions, at, lt)), ot = W, q.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                        ot -= t(this).outerHeight()
                    }), G.hover(function() {
                        G.addClass("jspHover")
                    }, function() {
                        G.removeClass("jspHover")
                    }).bind("mousedown.jsp", function(e) {
                        t("html").bind("dragstart.jsp selectstart.jsp", T), G.addClass("jspActive");
                        var i = e.pageY - G.position().top;
                        return t("html").bind("mousemove.jsp", function(t) {
                            m(t.pageY - i, !1)
                        }).bind("mouseup.jsp mouseleave.jsp", h), !1
                    }), o())
                }

                function o() {
                    nt.height(ot + "px"), J = 0, st = F.verticalGutter + nt.outerWidth(), H.width(R - st - vt);
                    try {
                        0 === it.position().left && H.css("margin-left", st + "px")
                    } catch (t) {}
                }

                function r() {
                    Q && (q.append(t('<div class="jspHorizontalBar" />').append(t('<div class="jspCap jspCapLeft" />'), t('<div class="jspTrack" />').append(t('<div class="jspDrag" />').append(t('<div class="jspDragLeft" />'), t('<div class="jspDragRight" />'))), t('<div class="jspCap jspCapRight" />'))), ct = q.find(">.jspHorizontalBar"), ut = ct.find(">.jspTrack"), K = ut.find(">.jspDrag"), F.showArrows && (ft = t('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", u(-1, 0)).bind("click.jsp", T), ht = t('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", u(1, 0)).bind("click.jsp", T), F.arrowScrollOnHover && (ft.bind("mouseover.jsp", u(-1, 0, ft)), ht.bind("mouseover.jsp", u(1, 0, ht))), c(ut, F.horizontalArrowPositions, ft, ht)), K.hover(function() {
                        K.addClass("jspHover")
                    }, function() {
                        K.removeClass("jspHover")
                    }).bind("mousedown.jsp", function(e) {
                        t("html").bind("dragstart.jsp selectstart.jsp", T), K.addClass("jspActive");
                        var i = e.pageX - K.position().left;
                        return t("html").bind("mousemove.jsp", function(t) {
                            v(t.pageX - i, !1)
                        }).bind("mouseup.jsp mouseleave.jsp", h), !1
                    }), pt = q.innerWidth(), a())
                }

                function a() {
                    q.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                        pt -= t(this).outerWidth()
                    }), ut.width(pt + "px"), et = 0
                }

                function l() {
                    if (Q && Y) {
                        var e = ut.outerHeight(),
                            i = nt.outerWidth();
                        ot -= e, t(ct).find(">.jspCap:visible,>.jspArrow").each(function() {
                            pt += t(this).outerWidth()
                        }), pt -= i, W -= i, R -= e, ut.parent().append(t('<div class="jspCorner" />').css("width", e + "px")), o(), a()
                    }
                    Q && H.width(q.outerWidth() - vt + "px"), U = H.outerHeight(), X = U / W, Q && (dt = Math.ceil(1 / V * pt), dt > F.horizontalDragMaxWidth ? dt = F.horizontalDragMaxWidth : dt < F.horizontalDragMinWidth && (dt = F.horizontalDragMinWidth), K.width(dt + "px"), tt = pt - dt, y(et)), Y && (rt = Math.ceil(1 / X * ot), rt > F.verticalDragMaxHeight ? rt = F.verticalDragMaxHeight : rt < F.verticalDragMinHeight && (rt = F.verticalDragMinHeight), G.height(rt + "px"), Z = ot - rt, g(J))
                }

                function c(t, e, i, n) {
                    var s, o = "before",
                        r = "after";
                    "os" == e && (e = /Mac/.test(navigator.platform) ? "after" : "split"), e == o ? r = e : e == r && (o = e, s = i, i = n, n = s), t[o](i)[r](n)
                }

                function u(t, e, i) {
                    return function() {
                        return p(t, e, this, i), this.blur(), !1
                    }
                }

                function p(e, i, n, s) {
                    n = t(n).addClass("jspActive");
                    var o, r, a = !0,
                        l = function() {
                            0 !== e && bt.scrollByX(e * F.arrowButtonSpeed), 0 !== i && bt.scrollByY(i * F.arrowButtonSpeed), r = setTimeout(l, a ? F.initialDelay : F.arrowRepeatFreq), a = !1
                        };
                    l(), o = s ? "mouseout.jsp" : "mouseup.jsp", s = s || t("html"), s.bind(o, function() {
                        n.removeClass("jspActive"), r && clearTimeout(r), r = null, s.unbind(o)
                    })
                }

                function d() {
                    f(), Y && nt.bind("mousedown.jsp", function(e) {
                        if (void 0 === e.originalTarget || e.originalTarget == e.currentTarget) {
                            var i, n = t(this),
                                s = n.offset(),
                                o = e.pageY - s.top - J,
                                r = !0,
                                a = function() {
                                    var t = n.offset(),
                                        s = e.pageY - t.top - rt / 2,
                                        c = W * F.scrollPagePercent,
                                        u = Z * c / (U - W);
                                    if (0 > o) J - u > s ? bt.scrollByY(-c) : m(s);
                                    else {
                                        if (!(o > 0)) return void l();
                                        s > J + u ? bt.scrollByY(c) : m(s)
                                    }
                                    i = setTimeout(a, r ? F.initialDelay : F.trackClickRepeatFreq), r = !1
                                },
                                l = function() {
                                    i && clearTimeout(i), i = null, t(document).unbind("mouseup.jsp", l)
                                };
                            return a(), t(document).bind("mouseup.jsp", l), !1
                        }
                    }), Q && ut.bind("mousedown.jsp", function(e) {
                        if (void 0 === e.originalTarget || e.originalTarget == e.currentTarget) {
                            var i, n = t(this),
                                s = n.offset(),
                                o = e.pageX - s.left - et,
                                r = !0,
                                a = function() {
                                    var t = n.offset(),
                                        s = e.pageX - t.left - dt / 2,
                                        c = R * F.scrollPagePercent,
                                        u = tt * c / (B - R);
                                    if (0 > o) et - u > s ? bt.scrollByX(-c) : v(s);
                                    else {
                                        if (!(o > 0)) return void l();
                                        s > et + u ? bt.scrollByX(c) : v(s)
                                    }
                                    i = setTimeout(a, r ? F.initialDelay : F.trackClickRepeatFreq), r = !1
                                },
                                l = function() {
                                    i && clearTimeout(i), i = null, t(document).unbind("mouseup.jsp", l)
                                };
                            return a(), t(document).bind("mouseup.jsp", l), !1
                        }
                    })
                }

                function f() {
                    ut && ut.unbind("mousedown.jsp"), nt && nt.unbind("mousedown.jsp")
                }

                function h() {
                    t("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), G && G.removeClass("jspActive"), K && K.removeClass("jspActive")
                }

                function m(i, n) {
                    if (Y) {
                        0 > i ? i = 0 : i > Z && (i = Z);
                        var s = new t.Event("jsp-will-scroll-y");
                        if (e.trigger(s, [i]), !s.isDefaultPrevented()) {
                            var o = i || 0,
                                r = 0 === o,
                                a = o == Z,
                                l = i / Z,
                                c = -l * (U - W);
                            void 0 === n && (n = F.animateScroll), n ? bt.animate(G, "top", i, g, function() {
                                e.trigger("jsp-user-scroll-y", [-c, r, a])
                            }) : (G.css("top", i), g(i), e.trigger("jsp-user-scroll-y", [-c, r, a]))
                        }
                    }
                }

                function g(t) {
                    void 0 === t && (t = G.position().top), q.scrollTop(0), J = t || 0;
                    var i = 0 === J,
                        n = J == Z,
                        s = t / Z,
                        o = -s * (U - W);
                    (_t != i || xt != n) && (_t = i, xt = n, e.trigger("jsp-arrow-change", [_t, xt, wt, St])), b(i, n), H.css("top", o), e.trigger("jsp-scroll-y", [-o, i, n]).trigger("scroll")
                }

                function v(i, n) {
                    if (Q) {
                        0 > i ? i = 0 : i > tt && (i = tt);
                        var s = new t.Event("jsp-will-scroll-x");
                        if (e.trigger(s, [i]), !s.isDefaultPrevented()) {
                            var o = i || 0,
                                r = 0 === o,
                                a = o == tt,
                                l = i / tt,
                                c = -l * (B - R);
                            void 0 === n && (n = F.animateScroll), n ? bt.animate(K, "left", i, y, function() {
                                e.trigger("jsp-user-scroll-x", [-c, r, a])
                            }) : (K.css("left", i), y(i), e.trigger("jsp-user-scroll-x", [-c, r, a]))
                        }
                    }
                }

                function y(t) {
                    void 0 === t && (t = K.position().left), q.scrollTop(0), et = t || 0;
                    var i = 0 === et,
                        n = et == tt,
                        s = t / tt,
                        o = -s * (B - R);
                    (wt != i || St != n) && (wt = i, St = n, e.trigger("jsp-arrow-change", [_t, xt, wt, St])), _(i, n), H.css("left", o), e.trigger("jsp-scroll-x", [-o, i, n]).trigger("scroll")
                }

                function b(t, e) {
                    F.showArrows && (at[t ? "addClass" : "removeClass"]("jspDisabled"), lt[e ? "addClass" : "removeClass"]("jspDisabled"))
                }

                function _(t, e) {
                    F.showArrows && (ft[t ? "addClass" : "removeClass"]("jspDisabled"), ht[e ? "addClass" : "removeClass"]("jspDisabled"))
                }

                function w(t, e) {
                    var i = t / (U - W);
                    m(i * Z, e)
                }

                function x(t, e) {
                    var i = t / (B - R);
                    v(i * tt, e)
                }

                function S(e, i, n) {
                    var s, o, r, a, l, c, u, p, d, f = 0,
                        h = 0;
                    try {
                        s = t(e)
                    } catch (m) {
                        return
                    }
                    for (o = s.outerHeight(), r = s.outerWidth(), q.scrollTop(0), q.scrollLeft(0); !s.is(".jspPane");)
                        if (f += s.position().top, h += s.position().left, s = s.offsetParent(), /^body|html$/i.test(s[0].nodeName)) return;
                    a = I(), c = a + W, a > f || i ? p = f - F.horizontalGutter : f + o > c && (p = f - W + o + F.horizontalGutter), isNaN(p) || w(p, n), l = C(), u = l + R, l > h || i ? d = h - F.horizontalGutter : h + r > u && (d = h - R + r + F.horizontalGutter), isNaN(d) || x(d, n)
                }

                function C() {
                    return -H.position().left
                }

                function I() {
                    return -H.position().top
                }

                function E() {
                    var t = U - W;
                    return t > 20 && t - I() < 10
                }

                function $() {
                    var t = B - R;
                    return t > 20 && t - C() < 10
                }

                function j() {
                    q.unbind(It).bind(It, function(t, e, i, n) {
                        et || (et = 0), J || (J = 0);
                        var s = et,
                            o = J,
                            r = t.deltaFactor || F.mouseWheelSpeed;
                        return bt.scrollBy(i * r, -n * r, !1), s == et && o == J
                    })
                }

                function P() {
                    q.unbind(It)
                }

                function T() {
                    return !1
                }

                function k() {
                    H.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(t) {
                        S(t.target, !1)
                    })
                }

                function z() {
                    H.find(":input,a").unbind("focus.jsp")
                }

                function D() {
                    function i() {
                        var t = et,
                            e = J;
                        switch (n) {
                            case 40:
                                bt.scrollByY(F.keyboardSpeed, !1);
                                break;
                            case 38:
                                bt.scrollByY(-F.keyboardSpeed, !1);
                                break;
                            case 34:
                            case 32:
                                bt.scrollByY(W * F.scrollPagePercent, !1);
                                break;
                            case 33:
                                bt.scrollByY(-W * F.scrollPagePercent, !1);
                                break;
                            case 39:
                                bt.scrollByX(F.keyboardSpeed, !1);
                                break;
                            case 37:
                                bt.scrollByX(-F.keyboardSpeed, !1)
                        }
                        return s = t != et || e != J
                    }
                    var n, s, o = [];
                    Q && o.push(ct[0]), Y && o.push(it[0]), H.bind("focus.jsp", function() {
                        e.focus()
                    }), e.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(e) {
                        if (e.target === this || o.length && t(e.target).closest(o).length) {
                            var r = et,
                                a = J;
                            switch (e.keyCode) {
                                case 40:
                                case 38:
                                case 34:
                                case 32:
                                case 33:
                                case 39:
                                case 37:
                                    n = e.keyCode, i();
                                    break;
                                case 35:
                                    w(U - W), n = null;
                                    break;
                                case 36:
                                    w(0), n = null
                            }
                            return s = e.keyCode == n && r != et || a != J, !s
                        }
                    }).bind("keypress.jsp", function(e) {
                        return e.keyCode == n && i(), e.target === this || o.length && t(e.target).closest(o).length ? !s : void 0
                    }), F.hideFocus ? (e.css("outline", "none"), "hideFocus" in q[0] && e.attr("hideFocus", !0)) : (e.css("outline", ""), "hideFocus" in q[0] && e.attr("hideFocus", !1))
                }

                function O() {
                    e.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"), H.unbind(".jsp")
                }

                function N() {
                    if (location.hash && location.hash.length > 1) {
                        var e, i, n = escape(location.hash.substr(1));
                        try {
                            e = t("#" + n + ', a[name="' + n + '"]')
                        } catch (s) {
                            return
                        }
                        e.length && H.find(n) && (0 === q.scrollTop() ? i = setInterval(function() {
                            q.scrollTop() > 0 && (S(e, !0), t(document).scrollTop(q.position().top), clearInterval(i))
                        }, 50) : (S(e, !0), t(document).scrollTop(q.position().top)))
                    }
                }

                function M() {
                    t(document.body).data("jspHijack") || (t(document.body).data("jspHijack", !0), t(document.body).delegate('a[href*="#"]', "click", function(e) {
                        var i, n, s, o, r, a, l = this.href.substr(0, this.href.indexOf("#")),
                            c = location.href;
                        if (-1 !== location.href.indexOf("#") && (c = location.href.substr(0, location.href.indexOf("#"))), l === c) {
                            i = escape(this.href.substr(this.href.indexOf("#") + 1));
                            try {
                                n = t("#" + i + ', a[name="' + i + '"]')
                            } catch (u) {
                                return
                            }
                            n.length && (s = n.closest(".jspScrollable"), o = s.data("jsp"), o.scrollToElement(n, !0), s[0].scrollIntoView && (r = t(window).scrollTop(), a = n.offset().top, (r > a || a > r + t(window).height()) && s[0].scrollIntoView()), e.preventDefault())
                        }
                    }))
                }

                function A() {
                    var t, e, i, n, s, o = !1;
                    q.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(r) {
                        var a = r.originalEvent.touches[0];
                        t = C(), e = I(), i = a.pageX, n = a.pageY, s = !1, o = !0
                    }).bind("touchmove.jsp", function(r) {
                        if (o) {
                            var a = r.originalEvent.touches[0],
                                l = et,
                                c = J;
                            return bt.scrollTo(t + i - a.pageX, e + n - a.pageY), s = s || Math.abs(i - a.pageX) > 5 || Math.abs(n - a.pageY) > 5, l == et && c == J
                        }
                    }).bind("touchend.jsp", function() {
                        o = !1
                    }).bind("click.jsp-touchclick", function() {
                        return s ? (s = !1, !1) : void 0
                    })
                }

                function L() {
                    var t = I(),
                        i = C();
                    e.removeClass("jspScrollable").unbind(".jsp"), H.unbind(".jsp"), e.replaceWith(Ct.append(H.children())), Ct.scrollTop(t), Ct.scrollLeft(i), mt && clearInterval(mt)
                }
                var F, H, R, W, q, B, U, V, X, Y, Q, G, Z, J, K, tt, et, it, nt, st, ot, rt, at, lt, ct, ut, pt, dt, ft, ht, mt, gt, vt, yt, bt = this,
                    _t = !0,
                    wt = !0,
                    xt = !1,
                    St = !1,
                    Ct = e.clone(!1, !1).empty(),
                    It = t.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
                "border-box" === e.css("box-sizing") ? (gt = 0, vt = 0) : (gt = e.css("paddingTop") + " " + e.css("paddingRight") + " " + e.css("paddingBottom") + " " + e.css("paddingLeft"), vt = (parseInt(e.css("paddingLeft"), 10) || 0) + (parseInt(e.css("paddingRight"), 10) || 0)), t.extend(bt, {
                    reinitialise: function(e) {
                        e = t.extend({}, F, e), n(e)
                    },
                    scrollToElement: function(t, e, i) {
                        S(t, e, i)
                    },
                    scrollTo: function(t, e, i) {
                        x(t, i), w(e, i)
                    },
                    scrollToX: function(t, e) {
                        x(t, e)
                    },
                    scrollToY: function(t, e) {
                        w(t, e)
                    },
                    scrollToPercentX: function(t, e) {
                        x(t * (B - R), e)
                    },
                    scrollToPercentY: function(t, e) {
                        w(t * (U - W), e)
                    },
                    scrollBy: function(t, e, i) {
                        bt.scrollByX(t, i), bt.scrollByY(e, i)
                    },
                    scrollByX: function(t, e) {
                        var i = C() + Math[0 > t ? "floor" : "ceil"](t),
                            n = i / (B - R);
                        v(n * tt, e)
                    },
                    scrollByY: function(t, e) {
                        var i = I() + Math[0 > t ? "floor" : "ceil"](t),
                            n = i / (U - W);
                        m(n * Z, e)
                    },
                    positionDragX: function(t, e) {
                        v(t, e)
                    },
                    positionDragY: function(t, e) {
                        m(t, e)
                    },
                    animate: function(t, e, i, n, s) {
                        var o = {};
                        o[e] = i, t.animate(o, {
                            duration: F.animateDuration,
                            easing: F.animateEase,
                            queue: !1,
                            step: n,
                            complete: s
                        })
                    },
                    getContentPositionX: function() {
                        return C()
                    },
                    getContentPositionY: function() {
                        return I()
                    },
                    getContentWidth: function() {
                        return B
                    },
                    getContentHeight: function() {
                        return U
                    },
                    getPercentScrolledX: function() {
                        return C() / (B - R)
                    },
                    getPercentScrolledY: function() {
                        return I() / (U - W)
                    },
                    getIsScrollableH: function() {
                        return Q
                    },
                    getIsScrollableV: function() {
                        return Y
                    },
                    getContentPane: function() {
                        return H
                    },
                    scrollToBottom: function(t) {
                        m(Z, t)
                    },
                    hijackInternalLinks: t.noop,
                    destroy: function() {
                        L()
                    }
                }), n(i)
            }
            return e = t.extend({}, t.fn.jScrollPane.defaults, e), t.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
                e[this] = e[this] || e.speed
            }), this.each(function() {
                var n = t(this),
                    s = n.data("jsp");
                s ? s.reinitialise(e) : (t("script", n).filter('[type="text/javascript"],:not([type])').remove(), s = new i(n, e), n.data("jsp", s))
            })
        }, t.fn.jScrollPane.defaults = {
            showArrows: !1,
            maintainPosition: !0,
            stickToBottom: !1,
            stickToRight: !1,
            clickOnTrack: !0,
            autoReinitialise: !1,
            autoReinitialiseDelay: 500,
            verticalDragMinHeight: 0,
            verticalDragMaxHeight: 99999,
            horizontalDragMinWidth: 0,
            horizontalDragMaxWidth: 99999,
            contentWidth: void 0,
            animateScroll: !1,
            animateDuration: 300,
            animateEase: "linear",
            hijackInternalLinks: !1,
            verticalGutter: 4,
            horizontalGutter: 4,
            mouseWheelSpeed: 3,
            arrowButtonSpeed: 0,
            arrowRepeatFreq: 50,
            arrowScrollOnHover: !1,
            trackClickSpeed: 0,
            trackClickRepeatFreq: 70,
            verticalArrowPositions: "split",
            horizontalArrowPositions: "split",
            enableKeyboardNavigation: !0,
            hideFocus: !1,
            keyboardSpeed: 0,
            initialDelay: 300,
            speed: 30,
            scrollPagePercent: .8
        }
    }),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        var e = Array.prototype.slice,
            i = Array.prototype.splice,
            n = {
                topSpacing: 0,
                bottomSpacing: 0,
                className: "is-sticky",
                wrapperClassName: "sticky-wrapper",
                center: !1,
                getWidthFrom: "",
                widthFromWrapper: !0,
                responsiveWidth: !1
            },
            s = t(window),
            o = t(document),
            r = [],
            a = s.height(),
            l = function() {
                for (var e = s.scrollTop(), i = o.height(), n = i - a, l = e > n ? n - e : 0, c = 0, u = r.length; u > c; c++) {
                    var p = r[c],
                        d = p.stickyWrapper.offset().top,
                        f = d - p.topSpacing - l;
                    if (p.stickyWrapper.css("height", p.stickyElement.outerHeight()), f >= e) null !== p.currentTop && (p.stickyElement.css({
                        width: "",
                        position: "",
                        top: ""
                    }), p.stickyElement.parent().removeClass(p.className), p.stickyElement.trigger("sticky-end", [p]), p.currentTop = null);
                    else {
                        var h = i - p.stickyElement.outerHeight() - p.topSpacing - p.bottomSpacing - e - l;
                        if (0 > h ? h += p.topSpacing : h = p.topSpacing, p.currentTop !== h) {
                            var m;
                            p.getWidthFrom ? m = t(p.getWidthFrom).width() || null : p.widthFromWrapper && (m = p.stickyWrapper.width()), null == m && (m = p.stickyElement.width()), p.stickyElement.css("width", m).css("position", "fixed").css("top", h), p.stickyElement.parent().addClass(p.className), null === p.currentTop ? p.stickyElement.trigger("sticky-start", [p]) : p.stickyElement.trigger("sticky-update", [p]), p.currentTop === p.topSpacing && p.currentTop > h || null === p.currentTop && h < p.topSpacing ? p.stickyElement.trigger("sticky-bottom-reached", [p]) : null !== p.currentTop && h === p.topSpacing && p.currentTop < h && p.stickyElement.trigger("sticky-bottom-unreached", [p]), p.currentTop = h
                        }
                        var g = p.stickyWrapper.parent(),
                            v = p.stickyElement.offset().top + p.stickyElement.outerHeight() >= g.offset().top + g.outerHeight() && p.stickyElement.offset().top <= p.topSpacing;
                        v ? p.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0) : p.stickyElement.css("position", "fixed").css("top", h).css("bottom", "")
                    }
                }
            },
            c = function() {
                a = s.height();
                for (var e = 0, i = r.length; i > e; e++) {
                    var n = r[e],
                        o = null;
                    n.getWidthFrom ? n.responsiveWidth && (o = t(n.getWidthFrom).width()) : n.widthFromWrapper && (o = n.stickyWrapper.width()), null != o && n.stickyElement.css("width", o)
                }
            },
            u = {
                init: function(e) {
                    var i = t.extend({}, n, e);
                    return this.each(function() {
                        var e = t(this),
                            s = e.attr("id"),
                            o = s ? s + "-" + n.wrapperClassName : n.wrapperClassName,
                            a = t("<div></div>").attr("id", o).addClass(i.wrapperClassName);
                        e.wrapAll(a);
                        var l = e.parent();
                        i.center && l.css({
                            width: e.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), "right" === e.css("float") && e.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        }), i.stickyElement = e, i.stickyWrapper = l, i.currentTop = null, r.push(i), u.setWrapperHeight(this), u.setupChangeListeners(this)
                    })
                },
                setWrapperHeight: function(e) {
                    var i = t(e),
                        n = i.parent();
                    n && n.css("height", i.outerHeight())
                },
                setupChangeListeners: function(t) {
                    if (window.MutationObserver) {
                        var e = new window.MutationObserver(function(e) {
                            (e[0].addedNodes.length || e[0].removedNodes.length) && u.setWrapperHeight(t)
                        });
                        e.observe(t, {
                            subtree: !0,
                            childList: !0
                        })
                    } else t.addEventListener("DOMNodeInserted", function() {
                        u.setWrapperHeight(t)
                    }, !1), t.addEventListener("DOMNodeRemoved", function() {
                        u.setWrapperHeight(t)
                    }, !1)
                },
                update: l,
                unstick: function(e) {
                    return this.each(function() {
                        for (var e = this, n = t(e), s = -1, o = r.length; o-- > 0;) r[o].stickyElement.get(0) === e && (i.call(r, o, 1), s = o); - 1 !== s && (n.unwrap(), n.css({
                            width: "",
                            position: "",
                            top: "",
                            "float": ""
                        }))
                    })
                }
            };
        window.addEventListener ? (window.addEventListener("scroll", l, !1), window.addEventListener("resize", c, !1)) : window.attachEvent && (window.attachEvent("onscroll", l), window.attachEvent("onresize", c)), t.fn.sticky = function(i) {
            return u[i] ? u[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : u.init.apply(this, arguments)
        }, t.fn.unstick = function(i) {
            return u[i] ? u[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : u.unstick.apply(this, arguments)
        }, t(function() {
            setTimeout(l, 0)
        })
    }),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function(t) {
        function e(t) {
            return a.raw ? t : encodeURIComponent(t)
        }

        function i(t) {
            return a.raw ? t : decodeURIComponent(t)
        }

        function n(t) {
            return e(a.json ? JSON.stringify(t) : String(t))
        }

        function s(t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return t = decodeURIComponent(t.replace(r, " ")), a.json ? JSON.parse(t) : t
            } catch (e) {}
        }

        function o(e, i) {
            var n = a.raw ? e : s(e);
            return t.isFunction(i) ? i(n) : n
        }
        var r = /\+/g,
            a = t.cookie = function(s, r, l) {
                if (void 0 !== r && !t.isFunction(r)) {
                    if (l = t.extend({}, a.defaults, l), "number" == typeof l.expires) {
                        var c = l.expires,
                            u = l.expires = new Date;
                        u.setTime(+u + 864e5 * c)
                    }
                    return document.cookie = [e(s), "=", n(r), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var p = s ? void 0 : {}, d = document.cookie ? document.cookie.split("; ") : [], f = 0, h = d.length; h > f; f++) {
                    var m = d[f].split("="),
                        g = i(m.shift()),
                        v = m.join("=");
                    if (s && s === g) {
                        p = o(v, r);
                        break
                    }
                    s || void 0 === (v = o(v)) || (p[g] = v)
                }
                return p
            };
        a.defaults = {}, t.removeCookie = function(e, i) {
            return void 0 === t.cookie(e) ? !1 : (t.cookie(e, "", t.extend({}, i, {
                expires: -1
            })), !t.cookie(e))
        }
    }), ! function(t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
    }(function() {
        "use strict";

        function t(t) {
            return t.filter(function(t) {
                return this[t] ? !1 : this[t] = !0
            }, {})
        }

        function e(t, e) {
            return Math.round(t / e) * e
        }

        function i(t) {
            var e = t.getBoundingClientRect(),
                i = t.ownerDocument,
                n = i.documentElement,
                s = p();
            return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0), {
                top: e.top + s.y - n.clientTop,
                left: e.left + s.x - n.clientLeft
            }
        }

        function n(t) {
            return "number" == typeof t && !isNaN(t) && isFinite(t)
        }

        function s(t, e, i) {
            l(t, e), setTimeout(function() {
                c(t, e)
            }, i)
        }

        function o(t) {
            return Math.max(Math.min(t, 100), 0)
        }

        function r(t) {
            return Array.isArray(t) ? t : [t]
        }

        function a(t) {
            var e = t.split(".");
            return e.length > 1 ? e[1].length : 0
        }

        function l(t, e) {
            t.classList ? t.classList.add(e) : t.className += " " + e
        }

        function c(t, e) {
            t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
        }

        function u(t, e) {
            return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
        }

        function p() {
            var t = void 0 !== window.pageXOffset,
                e = "CSS1Compat" === (document.compatMode || ""),
                i = t ? window.pageXOffset : e ? document.documentElement.scrollLeft : document.body.scrollLeft,
                n = t ? window.pageYOffset : e ? document.documentElement.scrollTop : document.body.scrollTop;
            return {
                x: i,
                y: n
            }
        }

        function d() {
            return window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            }
        }

        function f(t, e) {
            return 100 / (e - t)
        }

        function h(t, e) {
            return 100 * e / (t[1] - t[0])
        }

        function m(t, e) {
            return h(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0])
        }

        function g(t, e) {
            return e * (t[1] - t[0]) / 100 + t[0]
        }

        function v(t, e) {
            for (var i = 1; t >= e[i];) i += 1;
            return i
        }

        function y(t, e, i) {
            if (i >= t.slice(-1)[0]) return 100;
            var n, s, o, r, a = v(i, t);
            return n = t[a - 1], s = t[a], o = e[a - 1], r = e[a], o + m([n, s], i) / f(o, r)
        }

        function b(t, e, i) {
            if (i >= 100) return t.slice(-1)[0];
            var n, s, o, r, a = v(i, e);
            return n = t[a - 1], s = t[a], o = e[a - 1], r = e[a], g([n, s], (i - o) * f(o, r))
        }

        function _(t, i, n, s) {
            if (100 === s) return s;
            var o, r, a = v(s, t);
            return n ? (o = t[a - 1], r = t[a], s - o > (r - o) / 2 ? r : o) : i[a - 1] ? t[a - 1] + e(s - t[a - 1], i[a - 1]) : s
        }

        function w(t, e, i) {
            var s;
            if ("number" == typeof e && (e = [e]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider: 'range' contains invalid value.");
            if (s = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t), !n(s) || !n(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            i.xPct.push(s), i.xVal.push(e[0]), s ? i.xSteps.push(isNaN(e[1]) ? !1 : e[1]) : isNaN(e[1]) || (i.xSteps[0] = e[1])
        }

        function x(t, e, i) {
            return e ? void(i.xSteps[t] = h([i.xVal[t], i.xVal[t + 1]], e) / f(i.xPct[t], i.xPct[t + 1])) : !0
        }

        function S(t, e, i, n) {
            this.xPct = [], this.xVal = [], this.xSteps = [n || !1], this.xNumSteps = [!1], this.snap = e, this.direction = i;
            var s, o = [];
            for (s in t) t.hasOwnProperty(s) && o.push([t[s], s]);
            for (o.length && "object" == typeof o[0][0] ? o.sort(function(t, e) {
                    return t[0][0] - e[0][0]
                }) : o.sort(function(t, e) {
                    return t[0] - e[0]
                }), s = 0; s < o.length; s++) w(o[s][1], o[s][0], this);
            for (this.xNumSteps = this.xSteps.slice(0), s = 0; s < this.xNumSteps.length; s++) x(s, this.xNumSteps[s], this)
        }

        function C(t, e) {
            if (!n(e)) throw new Error("noUiSlider: 'step' is not numeric.");
            t.singleStep = e
        }

        function I(t, e) {
            if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            if (e.min === e.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
            t.spectrum = new S(e, t.snap, t.dir, t.singleStep)
        }

        function E(t, e) {
            if (e = r(e), !Array.isArray(e) || !e.length || e.length > 2) throw new Error("noUiSlider: 'start' option is incorrect.");
            t.handles = e.length, t.start = e
        }

        function $(t, e) {
            if (t.snap = e, "boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.")
        }

        function j(t, e) {
            if (t.animate = e, "boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.")
        }

        function P(t, e) {
            if (t.animationDuration = e, "number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.")
        }

        function T(t, e) {
            if ("lower" === e && 1 === t.handles) t.connect = 1;
            else if ("upper" === e && 1 === t.handles) t.connect = 2;
            else if (e === !0 && 2 === t.handles) t.connect = 3;
            else {
                if (e !== !1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                t.connect = 0
            }
        }

        function k(t, e) {
            switch (e) {
                case "horizontal":
                    t.ort = 0;
                    break;
                case "vertical":
                    t.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.")
            }
        }

        function z(t, e) {
            if (!n(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")
        }

        function D(t, e) {
            if (!n(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (t.limit = t.spectrum.getMargin(e), !t.limit) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")
        }

        function O(t, e) {
            switch (e) {
                case "ltr":
                    t.dir = 0;
                    break;
                case "rtl":
                    t.dir = 1, t.connect = [0, 2, 1, 3][t.connect];
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.")
            }
        }

        function N(t, e) {
            if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var i = e.indexOf("tap") >= 0,
                n = e.indexOf("drag") >= 0,
                s = e.indexOf("fixed") >= 0,
                o = e.indexOf("snap") >= 0,
                r = e.indexOf("hover") >= 0;
            if (n && !t.connect) throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
            t.events = {
                tap: i || o,
                drag: n,
                fixed: s,
                snap: o,
                hover: r
            }
        }

        function M(t, e) {
            var i;
            if (e !== !1)
                if (e === !0)
                    for (t.tooltips = [], i = 0; i < t.handles; i++) t.tooltips.push(!0);
                else {
                    if (t.tooltips = r(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                    t.tooltips.forEach(function(t) {
                        if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")
                    })
                }
        }

        function A(t, e) {
            if (t.format = e, "function" == typeof e.to && "function" == typeof e.from) return !0;
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
        }

        function L(t, e) {
            if (void 0 !== e && "string" != typeof e && e !== !1) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            t.cssPrefix = e
        }

        function F(t, e) {
            if (void 0 !== e && "object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object.");
            if ("string" == typeof t.cssPrefix) {
                t.cssClasses = {};
                for (var i in e) e.hasOwnProperty(i) && (t.cssClasses[i] = t.cssPrefix + e[i])
            } else t.cssClasses = e
        }

        function H(t) {
            var e, i = {
                margin: 0,
                limit: 0,
                animate: !0,
                animationDuration: 300,
                format: q
            };
            e = {
                step: {
                    r: !1,
                    t: C
                },
                start: {
                    r: !0,
                    t: E
                },
                connect: {
                    r: !0,
                    t: T
                },
                direction: {
                    r: !0,
                    t: O
                },
                snap: {
                    r: !1,
                    t: $
                },
                animate: {
                    r: !1,
                    t: j
                },
                animationDuration: {
                    r: !1,
                    t: P
                },
                range: {
                    r: !0,
                    t: I
                },
                orientation: {
                    r: !1,
                    t: k
                },
                margin: {
                    r: !1,
                    t: z
                },
                limit: {
                    r: !1,
                    t: D
                },
                behaviour: {
                    r: !0,
                    t: N
                },
                format: {
                    r: !1,
                    t: A
                },
                tooltips: {
                    r: !1,
                    t: M
                },
                cssPrefix: {
                    r: !1,
                    t: L
                },
                cssClasses: {
                    r: !1,
                    t: F
                }
            };
            var n = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    stacking: "stacking",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                }
            };
            return Object.keys(e).forEach(function(s) {
                if (void 0 === t[s] && void 0 === n[s]) {
                    if (e[s].r) throw new Error("noUiSlider: '" + s + "' is required.");
                    return !0
                }
                e[s].t(i, void 0 === t[s] ? n[s] : t[s])
            }), i.pips = t.pips, i.style = i.ort ? "top" : "left", i
        }

        function R(e, n, f) {
            function h(t, e, i) {
                var n = t + e[0],
                    s = t + e[1];
                return i ? (0 > n && (s += Math.abs(n)), s > 100 && (n -= s - 100), [o(n), o(s)]) : [n, s]
            }

            function m(t, e) {
                t.preventDefault();
                var i, n, s = 0 === t.type.indexOf("touch"),
                    o = 0 === t.type.indexOf("mouse"),
                    r = 0 === t.type.indexOf("pointer"),
                    a = t;
                return 0 === t.type.indexOf("MSPointer") && (r = !0), s && (i = t.changedTouches[0].pageX, n = t.changedTouches[0].pageY), e = e || p(), (o || r) && (i = t.clientX + e.x, n = t.clientY + e.y), a.pageOffset = e, a.points = [i, n], a.cursor = o || r, a
            }

            function g(t, e) {
                var i = document.createElement("div"),
                    s = document.createElement("div"),
                    o = [n.cssClasses.handleLower, n.cssClasses.handleUpper];
                return t && o.reverse(), l(s, n.cssClasses.handle), l(s, o[e]), l(i, n.cssClasses.origin), i.appendChild(s), i
            }

            function v(t, e, i) {
                switch (t) {
                    case 1:
                        l(e, n.cssClasses.connect), l(i[0], n.cssClasses.background);
                        break;
                    case 3:
                        l(i[1], n.cssClasses.background);
                    case 2:
                        l(i[0], n.cssClasses.connect);
                    case 0:
                        l(e, n.cssClasses.background)
                }
            }

            function y(t, e, i) {
                var n, s = [];
                for (n = 0; t > n; n += 1) s.push(i.appendChild(g(e, n)));
                return s
            }

            function b(t, e, i) {
                l(i, n.cssClasses.target), 0 === t ? l(i, n.cssClasses.ltr) : l(i, n.cssClasses.rtl), 0 === e ? l(i, n.cssClasses.horizontal) : l(i, n.cssClasses.vertical);
                var s = document.createElement("div");
                return l(s, n.cssClasses.base), i.appendChild(s), s
            }

            function _(t, e) {
                if (!n.tooltips[e]) return !1;
                var i = document.createElement("div");
                return i.className = n.cssClasses.tooltip, t.firstChild.appendChild(i)
            }

            function w() {
                n.dir && n.tooltips.reverse();
                var t = Y.map(_);
                n.dir && (t.reverse(), n.tooltips.reverse()), B("update", function(e, i, s) {
                    t[i] && (t[i].innerHTML = n.tooltips[i] === !0 ? e[i] : n.tooltips[i].to(s[i]))
                })
            }

            function x(t, e, i) {
                if ("range" === t || "steps" === t) return K.xVal;
                if ("count" === t) {
                    var n, s = 100 / (e - 1),
                        o = 0;
                    for (e = [];
                        (n = o++ * s) <= 100;) e.push(n);
                    t = "positions"
                }
                return "positions" === t ? e.map(function(t) {
                    return K.fromStepping(i ? K.getStep(t) : t)
                }) : "values" === t ? i ? e.map(function(t) {
                    return K.fromStepping(K.getStep(K.toStepping(t)))
                }) : e : void 0
            }

            function S(e, i, n) {
                function s(t, e) {
                    return (t + e).toFixed(7) / 1
                }
                var o = K.direction,
                    r = {},
                    a = K.xVal[0],
                    l = K.xVal[K.xVal.length - 1],
                    c = !1,
                    u = !1,
                    p = 0;
                return K.direction = 0, n = t(n.slice().sort(function(t, e) {
                    return t - e
                })), n[0] !== a && (n.unshift(a), c = !0), n[n.length - 1] !== l && (n.push(l), u = !0), n.forEach(function(t, o) {
                    var a, l, d, f, h, m, g, v, y, b, _ = t,
                        w = n[o + 1];
                    if ("steps" === i && (a = K.xNumSteps[o]), a || (a = w - _), _ !== !1 && void 0 !== w)
                        for (l = _; w >= l; l = s(l, a)) {
                            for (f = K.toStepping(l), h = f - p, v = h / e, y = Math.round(v), b = h / y, d = 1; y >= d; d += 1) m = p + d * b, r[m.toFixed(5)] = ["x", 0];
                            g = n.indexOf(l) > -1 ? 1 : "steps" === i ? 2 : 0, !o && c && (g = 0), l === w && u || (r[f.toFixed(5)] = [l, g]), p = f
                        }
                }), K.direction = o, r
            }

            function C(t, e, i) {
                function s(t, e) {
                    var i = e === n.cssClasses.value,
                        s = i ? d : f,
                        o = i ? u : p;
                    return e + " " + s[n.ort] + " " + o[t]
                }

                function o(t, e, i) {
                    return 'class="' + s(i[1], e) + '" style="' + n.style + ": " + t + '%"'
                }

                function r(t, s) {
                    K.direction && (t = 100 - t), s[1] = s[1] && e ? e(s[0], s[1]) : s[1], c += "<div " + o(t, n.cssClasses.marker, s) + "></div>", s[1] && (c += "<div " + o(t, n.cssClasses.value, s) + ">" + i.to(s[0]) + "</div>")
                }
                var a = document.createElement("div"),
                    c = "",
                    u = [n.cssClasses.valueNormal, n.cssClasses.valueLarge, n.cssClasses.valueSub],
                    p = [n.cssClasses.markerNormal, n.cssClasses.markerLarge, n.cssClasses.markerSub],
                    d = [n.cssClasses.valueHorizontal, n.cssClasses.valueVertical],
                    f = [n.cssClasses.markerHorizontal, n.cssClasses.markerVertical];
                return l(a, n.cssClasses.pips), l(a, 0 === n.ort ? n.cssClasses.pipsHorizontal : n.cssClasses.pipsVertical), Object.keys(t).forEach(function(e) {
                    r(e, t[e])
                }), a.innerHTML = c, a
            }

            function I(t) {
                var e = t.mode,
                    i = t.density || 1,
                    n = t.filter || !1,
                    s = t.values || !1,
                    o = t.stepped || !1,
                    r = x(e, s, o),
                    a = S(i, e, r),
                    l = t.format || {
                        to: Math.round
                    };
                return Z.appendChild(C(a, n, l))
            }

            function E() {
                var t = X.getBoundingClientRect(),
                    e = "offset" + ["Width", "Height"][n.ort];
                return 0 === n.ort ? t.width || X[e] : t.height || X[e]
            }

            function $(t, e, i) {
                var s;
                for (s = 0; s < n.handles; s++)
                    if (-1 === J[s]) return;
                void 0 !== e && 1 !== n.handles && (e = Math.abs(e - n.dir)), Object.keys(et).forEach(function(n) {
                    var s = n.split(".")[0];
                    t === s && et[n].forEach(function(t) {
                        t.call(Q, r(R()), e, r(j(Array.prototype.slice.call(tt))), i || !1, J)
                    })
                })
            }

            function j(t) {
                return 1 === t.length ? t[0] : n.dir ? t.reverse() : t
            }

            function P(t, e, i, s) {
                var o = function(e) {
                        return Z.hasAttribute("disabled") ? !1 : u(Z, n.cssClasses.tap) ? !1 : (e = m(e, s.pageOffset), t === G.start && void 0 !== e.buttons && e.buttons > 1 ? !1 : s.hover && e.buttons ? !1 : (e.calcPoint = e.points[n.ort], void i(e, s)))
                    },
                    r = [];
                return t.split(" ").forEach(function(t) {
                    e.addEventListener(t, o, !1), r.push([t, o])
                }), r
            }

            function T(t, e) {
                if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return k(t, e);
                var i, n, s = e.handles || Y,
                    o = !1,
                    r = 100 * (t.calcPoint - e.start) / e.baseSize,
                    a = s[0] === Y[0] ? 0 : 1;
                if (i = h(r, e.positions, s.length > 1), o = A(s[0], i[a], 1 === s.length), s.length > 1) {
                    if (o = A(s[1], i[a ? 0 : 1], !1) || o)
                        for (n = 0; n < e.handles.length; n++) $("slide", n)
                } else o && $("slide", a)
            }

            function k(t, e) {
                var i = X.querySelector("." + n.cssClasses.active),
                    s = e.handles[0] === Y[0] ? 0 : 1;
                null !== i && c(i, n.cssClasses.active), t.cursor && (document.body.style.cursor = "", document.body.removeEventListener("selectstart", document.body.noUiListener));
                var o = document.documentElement;
                o.noUiListeners.forEach(function(t) {
                    o.removeEventListener(t[0], t[1])
                }), c(Z, n.cssClasses.drag), $("set", s), $("change", s), void 0 !== e.handleNumber && $("end", e.handleNumber)
            }

            function z(t, e) {
                "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && k(t, e)
            }

            function D(t, e) {
                var i = document.documentElement;
                if (1 === e.handles.length) {
                    if (e.handles[0].hasAttribute("disabled")) return !1;
                    l(e.handles[0].children[0], n.cssClasses.active)
                }
                t.preventDefault(), t.stopPropagation();
                var s = P(G.move, i, T, {
                        start: t.calcPoint,
                        baseSize: E(),
                        pageOffset: t.pageOffset,
                        handles: e.handles,
                        handleNumber: e.handleNumber,
                        buttonsProperty: t.buttons,
                        positions: [J[0], J[Y.length - 1]]
                    }),
                    o = P(G.end, i, k, {
                        handles: e.handles,
                        handleNumber: e.handleNumber
                    }),
                    r = P("mouseout", i, z, {
                        handles: e.handles,
                        handleNumber: e.handleNumber
                    });
                if (i.noUiListeners = s.concat(o, r), t.cursor) {
                    document.body.style.cursor = getComputedStyle(t.target).cursor, Y.length > 1 && l(Z, n.cssClasses.drag);
                    var a = function() {
                        return !1
                    };
                    document.body.noUiListener = a, document.body.addEventListener("selectstart", a, !1)
                }
                void 0 !== e.handleNumber && $("start", e.handleNumber)
            }

            function O(t) {
                var e, o, r = t.calcPoint,
                    a = 0;
                return t.stopPropagation(), Y.forEach(function(t) {
                    a += i(t)[n.style]
                }), e = a / 2 > r || 1 === Y.length ? 0 : 1, Y[e].hasAttribute("disabled") && (e = e ? 0 : 1), r -= i(X)[n.style], o = 100 * r / E(), n.events.snap || s(Z, n.cssClasses.tap, n.animationDuration), Y[e].hasAttribute("disabled") ? !1 : (A(Y[e], o), $("slide", e, !0), $("set", e, !0), $("change", e, !0), void(n.events.snap && D(t, {
                    handles: [Y[e]]
                })))
            }

            function N(t) {
                var e = t.calcPoint - i(X)[n.style],
                    s = K.getStep(100 * e / E()),
                    o = K.fromStepping(s);
                Object.keys(et).forEach(function(t) {
                    "hover" === t.split(".")[0] && et[t].forEach(function(t) {
                        t.call(Q, o)
                    })
                })
            }

            function M(t) {
                if (t.fixed || Y.forEach(function(t, e) {
                        P(G.start, t.children[0], D, {
                            handles: [t],
                            handleNumber: e
                        })
                    }), t.tap && P(G.start, X, O, {
                        handles: Y
                    }), t.hover && P(G.move, X, N, {
                        hover: !0
                    }), t.drag) {
                    var e = [X.querySelector("." + n.cssClasses.connect)];
                    l(e[0], n.cssClasses.draggable), t.fixed && e.push(Y[e[0] === Y[0] ? 1 : 0].children[0]), e.forEach(function(t) {
                        P(G.start, t, D, {
                            handles: Y
                        })
                    })
                }
            }

            function A(t, e, i) {
                var s = t !== Y[0] ? 1 : 0,
                    r = J[0] + n.margin,
                    a = J[1] - n.margin,
                    u = J[0] + n.limit,
                    p = J[1] - n.limit;
                return Y.length > 1 && (e = s ? Math.max(e, r) : Math.min(e, a)), i !== !1 && n.limit && Y.length > 1 && (e = s ? Math.min(e, u) : Math.max(e, p)), e = K.getStep(e), e = o(e), e === J[s] ? !1 : (window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                    t.style[n.style] = e + "%"
                }) : t.style[n.style] = e + "%", t.previousSibling || (c(t, n.cssClasses.stacking), e > 50 && l(t, n.cssClasses.stacking)), J[s] = e, tt[s] = K.fromStepping(e), $("update", s), !0)
            }

            function L(t, e) {
                var i, s, o;
                for (n.limit && (t += 1), i = 0; t > i; i += 1) s = i % 2, o = e[s], null !== o && o !== !1 && ("number" == typeof o && (o = String(o)), o = n.format.from(o), (o === !1 || isNaN(o) || A(Y[s], K.toStepping(o), i === 3 - n.dir) === !1) && $("update", s))
            }

            function F(t, e) {
                var i, o, a = r(t);
                for (e = void 0 === e ? !0 : !!e, n.dir && n.handles > 1 && a.reverse(), n.animate && -1 !== J[0] && s(Z, n.cssClasses.tap, n.animationDuration), i = Y.length > 1 ? 3 : 1, 1 === a.length && (i = 1), L(i, a), o = 0; o < Y.length; o++) null !== a[o] && e && $("set", o)
            }

            function R() {
                var t, e = [];
                for (t = 0; t < n.handles; t += 1) e[t] = n.format.to(tt[t]);
                return j(e)
            }

            function W() {
                for (var t in n.cssClasses) n.cssClasses.hasOwnProperty(t) && c(Z, n.cssClasses[t]);
                for (; Z.firstChild;) Z.removeChild(Z.firstChild);
                delete Z.noUiSlider
            }

            function q() {
                var t = J.map(function(t, e) {
                    var i = K.getApplicableStep(t),
                        n = a(String(i[2])),
                        s = tt[e],
                        o = 100 === t ? null : i[2],
                        r = Number((s - i[2]).toFixed(n)),
                        l = 0 === t ? null : r >= i[1] ? i[2] : i[0] || !1;
                    return [l, o]
                });
                return j(t)
            }

            function B(t, e) {
                et[t] = et[t] || [], et[t].push(e), "update" === t.split(".")[0] && Y.forEach(function(t, e) {
                    $("update", e)
                })
            }

            function U(t) {
                var e = t && t.split(".")[0],
                    i = e && t.substring(e.length);
                Object.keys(et).forEach(function(t) {
                    var n = t.split(".")[0],
                        s = t.substring(n.length);
                    e && e !== n || i && i !== s || delete et[t]
                })
            }

            function V(t, e) {
                var i = R(),
                    s = H({
                        start: [0, 0],
                        margin: t.margin,
                        limit: t.limit,
                        step: void 0 === t.step ? n.singleStep : t.step,
                        range: t.range,
                        animate: t.animate,
                        snap: void 0 === t.snap ? n.snap : t.snap
                    });
                ["margin", "limit", "range", "animate"].forEach(function(e) {
                    void 0 !== t[e] && (n[e] = t[e])
                }), s.spectrum.direction = K.direction, K = s.spectrum, J = [-1, -1], F(t.start || i, e)
            }
            var X, Y, Q, G = d(),
                Z = e,
                J = [-1, -1],
                K = n.spectrum,
                tt = [],
                et = {};
            if (Z.noUiSlider) throw new Error("Slider was already initialized.");
            return X = b(n.dir, n.ort, Z), Y = y(n.handles, n.dir, X), v(n.connect, Z, Y), n.pips && I(n.pips), n.tooltips && w(), Q = {
                destroy: W,
                steps: q,
                on: B,
                off: U,
                get: R,
                set: F,
                updateOptions: V,
                options: f,
                target: Z,
                pips: I
            }, M(n.events), Q
        }

        function W(t, e) {
            if (!t.nodeName) throw new Error("noUiSlider.create requires a single element.");
            var i = H(e, t),
                n = R(t, i, e);
            return n.set(i.start), t.noUiSlider = n, n
        }
        S.prototype.getMargin = function(t) {
            return 2 === this.xPct.length ? h(this.xVal, t) : !1
        }, S.prototype.toStepping = function(t) {
            return t = y(this.xVal, this.xPct, t), this.direction && (t = 100 - t), t
        }, S.prototype.fromStepping = function(t) {
            return this.direction && (t = 100 - t), b(this.xVal, this.xPct, t)
        }, S.prototype.getStep = function(t) {
            return this.direction && (t = 100 - t), t = _(this.xPct, this.xSteps, this.snap, t), this.direction && (t = 100 - t), t
        }, S.prototype.getApplicableStep = function(t) {
            var e = v(t, this.xPct),
                i = 100 === t ? 2 : 1;
            return [this.xNumSteps[e - 2], this.xVal[e - i], this.xNumSteps[e - i]]
        }, S.prototype.convert = function(t) {
            return this.getStep(this.toStepping(t))
        };
        var q = {
            to: function(t) {
                return void 0 !== t && t.toFixed(2)
            },
            from: Number
        };
        return {
            create: W
        }
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function e() {
            var t = document.createElement("input");
            return t.setAttribute("type", "range"), "text" !== t.type
        }

        function i(t, e) {
            var i = Array.prototype.slice.call(arguments, 2);
            return setTimeout(function() {
                return t.apply(null, i)
            }, e)
        }

        function n(t, e) {
            return e = e || 100,
                function() {
                    if (!t.debouncing) {
                        var i = Array.prototype.slice.apply(arguments);
                        t.lastReturnVal = t.apply(window, i), t.debouncing = !0
                    }
                    return clearTimeout(t.debounceTimeout), t.debounceTimeout = setTimeout(function() {
                        t.debouncing = !1
                    }, e), t.lastReturnVal
                }
        }

        function s(t) {
            return t && (0 === t.offsetWidth || 0 === t.offsetHeight || t.open === !1)
        }

        function o(t) {
            for (var e = [], i = t.parentNode; s(i);) e.push(i), i = i.parentNode;
            return e
        }

        function r(t, e) {
            function i(t) {
                "undefined" != typeof t.open && (t.open = !t.open)
            }
            var n = o(t),
                s = n.length,
                r = [],
                a = t[e];
            if (s) {
                for (var l = 0; s > l; l++) r[l] = n[l].style.cssText, n[l].style.setProperty ? n[l].style.setProperty("display", "block", "important") : n[l].style.cssText += ";display: block !important", n[l].style.height = "0", n[l].style.overflow = "hidden", n[l].style.visibility = "hidden", i(n[l]);
                a = t[e];
                for (var c = 0; s > c; c++) n[c].style.cssText = r[c], i(n[c])
            }
            return a
        }

        function a(t, e) {
            var i = parseFloat(t);
            return Number.isNaN(i) ? e : i
        }

        function l(t) {
            return t.charAt(0).toUpperCase() + t.substr(1)
        }

        function c(e, s) {
            if (this.$window = t(window), this.$document = t(document), this.$element = t(e), this.options = t.extend({}, f, s), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = h.orientation[this.orientation].dimension,
                this.DIRECTION = h.orientation[this.orientation].direction, this.DIRECTION_STYLE = h.orientation[this.orientation].directionStyle, this.COORDINATE = h.orientation[this.orientation].coordinate, this.polyfill && d) return !1;
            this.identifier = "js-" + u + "-" + p++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = t('<div class="' + this.options.fillClass + '" />'), this.$handle = t('<div class="' + this.options.handleClass + '" />'), this.$range = t('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: "0"
            }), this.handleDown = t.proxy(this.handleDown, this), this.handleMove = t.proxy(this.handleMove, this), this.handleEnd = t.proxy(this.handleEnd, this), this.init();
            var o = this;
            this.$window.on("resize." + this.identifier, n(function() {
                i(function() {
                    o.update(!1, !1)
                }, 300)
            }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function(t, e) {
                if (!e || e.origin !== o.identifier) {
                    var i = t.target.value,
                        n = o.getPositionFromValue(i);
                    o.setPosition(n)
                }
            })
        }
        Number.isNaN = Number.isNaN || function(t) {
            return "number" == typeof t && t !== t
        };
        var u = "rangeslider",
            p = 0,
            d = e(),
            f = {
                polyfill: !0,
                orientation: "horizontal",
                rangeClass: "rangeslider",
                disabledClass: "rangeslider--disabled",
                horizontalClass: "rangeslider--horizontal",
                verticalClass: "rangeslider--vertical",
                fillClass: "rangeslider__fill",
                handleClass: "rangeslider__handle",
                startEvent: ["mousedown", "touchstart", "pointerdown"],
                moveEvent: ["mousemove", "touchmove", "pointermove"],
                endEvent: ["mouseup", "touchend", "pointerup"]
            },
            h = {
                orientation: {
                    horizontal: {
                        dimension: "width",
                        direction: "left",
                        directionStyle: "left",
                        coordinate: "x"
                    },
                    vertical: {
                        dimension: "height",
                        direction: "top",
                        directionStyle: "bottom",
                        coordinate: "y"
                    }
                }
            };
        return c.prototype.init = function() {
            this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit()
        }, c.prototype.update = function(t, e) {
            t = t || !1, t && (this.min = a(this.$element[0].getAttribute("min"), 0), this.max = a(this.$element[0].getAttribute("max"), 100), this.value = a(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = a(this.$element[0].getAttribute("step"), 1)), this.handleDimension = r(this.$handle[0], "offset" + l(this.DIMENSION)), this.rangeDimension = r(this.$range[0], "offset" + l(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, e)
        }, c.prototype.handleDown = function(t) {
            if (this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), !((" " + t.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
                var e = this.getRelativePosition(t),
                    i = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                    n = this.getPositionFromNode(this.$handle[0]) - i,
                    s = "vertical" === this.orientation ? this.maxHandlePos - (e - this.grabPos) : e - this.grabPos;
                this.setPosition(s), e >= n && e < n + this.handleDimension && (this.grabPos = e - n)
            }
        }, c.prototype.handleMove = function(t) {
            t.preventDefault();
            var e = this.getRelativePosition(t),
                i = "vertical" === this.orientation ? this.maxHandlePos - (e - this.grabPos) : e - this.grabPos;
            this.setPosition(i)
        }, c.prototype.handleEnd = function(t) {
            t.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$element.trigger("change", {
                origin: this.identifier
            }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
        }, c.prototype.cap = function(t, e, i) {
            return e > t ? e : t > i ? i : t
        }, c.prototype.setPosition = function(t, e) {
            var i, n;
            void 0 === e && (e = !0), i = this.getValueFromPosition(this.cap(t, 0, this.maxHandlePos)), n = this.getPositionFromValue(i), this.$fill[0].style[this.DIMENSION] = n + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = n + "px", this.setValue(i), this.position = n, this.value = i, e && this.onSlide && "function" == typeof this.onSlide && this.onSlide(n, i)
        }, c.prototype.getPositionFromNode = function(t) {
            for (var e = 0; null !== t;) e += t.offsetLeft, t = t.offsetParent;
            return e
        }, c.prototype.getRelativePosition = function(t) {
            var e = l(this.COORDINATE),
                i = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                n = 0;
            return "undefined" != typeof t["page" + e] ? n = t["client" + e] : "undefined" != typeof t.originalEvent["client" + e] ? n = t.originalEvent["client" + e] : t.originalEvent.touches && t.originalEvent.touches[0] && "undefined" != typeof t.originalEvent.touches[0]["client" + e] ? n = t.originalEvent.touches[0]["client" + e] : t.currentPoint && "undefined" != typeof t.currentPoint[this.COORDINATE] && (n = t.currentPoint[this.COORDINATE]), n - i
        }, c.prototype.getPositionFromValue = function(t) {
            var e, i;
            return e = (t - this.min) / (this.max - this.min), i = Number.isNaN(e) ? 0 : e * this.maxHandlePos
        }, c.prototype.getValueFromPosition = function(t) {
            var e, i;
            return e = t / (this.maxHandlePos || 1), i = this.step * Math.round(e * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(this.toFixed))
        }, c.prototype.setValue = function(t) {
            (t !== this.value || "" === this.$element[0].value) && this.$element.val(t).trigger("input", {
                origin: this.identifier
            })
        }, c.prototype.destroy = function() {
            this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + u), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
        }, t.fn[u] = function(e) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var n = t(this),
                    s = n.data("plugin_" + u);
                s || n.data("plugin_" + u, s = new c(this, e)), "string" == typeof e && s[e].apply(s, i)
            })
        }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function e() {
            var t = document.createElement("input");
            return t.setAttribute("type", "range"), "text" !== t.type
        }

        function i(t, e) {
            var i = Array.prototype.slice.call(arguments, 2);
            return setTimeout(function() {
                return t.apply(null, i)
            }, e)
        }

        function n(t, e) {
            return e = e || 100,
                function() {
                    if (!t.debouncing) {
                        var i = Array.prototype.slice.apply(arguments);
                        t.lastReturnVal = t.apply(window, i), t.debouncing = !0
                    }
                    return clearTimeout(t.debounceTimeout), t.debounceTimeout = setTimeout(function() {
                        t.debouncing = !1
                    }, e), t.lastReturnVal
                }
        }

        function s(t) {
            return t && (0 === t.offsetWidth || 0 === t.offsetHeight || t.open === !1)
        }

        function o(t) {
            for (var e = [], i = t.parentNode; s(i);) e.push(i), i = i.parentNode;
            return e
        }

        function r(t, e) {
            function i(t) {
                "undefined" != typeof t.open && (t.open = !t.open)
            }
            var n = o(t),
                s = n.length,
                r = [],
                a = t[e];
            if (s) {
                for (var l = 0; s > l; l++) r[l] = n[l].style.cssText, n[l].style.setProperty ? n[l].style.setProperty("display", "block", "important") : n[l].style.cssText += ";display: block !important", n[l].style.height = "0", n[l].style.overflow = "hidden", n[l].style.visibility = "hidden", i(n[l]);
                a = t[e];
                for (var c = 0; s > c; c++) n[c].style.cssText = r[c], i(n[c])
            }
            return a
        }

        function a(t, e) {
            var i = parseFloat(t);
            return Number.isNaN(i) ? e : i
        }

        function l(t) {
            return t.charAt(0).toUpperCase() + t.substr(1)
        }

        function c(e, s) {
            if (this.$window = t(window), this.$document = t(document), this.$element = t(e), this.options = t.extend({}, f, s), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = h.orientation[this.orientation].dimension, this.DIRECTION = h.orientation[this.orientation].direction, this.DIRECTION_STYLE = h.orientation[this.orientation].directionStyle, this.COORDINATE = h.orientation[this.orientation].coordinate, this.polyfill && d) return !1;
            this.identifier = "js-" + u + "-" + p++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = t('<div class="' + this.options.fillClass + '" />'), this.$handle = t('<div class="' + this.options.handleClass + '" />'), this.$range = t('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: "0"
            }), this.handleDown = t.proxy(this.handleDown, this), this.handleMove = t.proxy(this.handleMove, this), this.handleEnd = t.proxy(this.handleEnd, this), this.init();
            var o = this;
            this.$window.on("resize." + this.identifier, n(function() {
                i(function() {
                    o.update(!1, !1)
                }, 300)
            }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function(t, e) {
                if (!e || e.origin !== o.identifier) {
                    var i = t.target.value,
                        n = o.getPositionFromValue(i);
                    o.setPosition(n)
                }
            })
        }
        Number.isNaN = Number.isNaN || function(t) {
            return "number" == typeof t && t !== t
        };
        var u = "rangeslider",
            p = 0,
            d = e(),
            f = {
                polyfill: !0,
                orientation: "horizontal",
                rangeClass: "rangeslider",
                disabledClass: "rangeslider--disabled",
                horizontalClass: "rangeslider--horizontal",
                verticalClass: "rangeslider--vertical",
                fillClass: "rangeslider__fill",
                handleClass: "rangeslider__handle",
                startEvent: ["mousedown", "touchstart", "pointerdown"],
                moveEvent: ["mousemove", "touchmove", "pointermove"],
                endEvent: ["mouseup", "touchend", "pointerup"]
            },
            h = {
                orientation: {
                    horizontal: {
                        dimension: "width",
                        direction: "left",
                        directionStyle: "left",
                        coordinate: "x"
                    },
                    vertical: {
                        dimension: "height",
                        direction: "top",
                        directionStyle: "bottom",
                        coordinate: "y"
                    }
                }
            };
        return c.prototype.init = function() {
            this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit()
        }, c.prototype.update = function(t, e) {
            t = t || !1, t && (this.min = a(this.$element[0].getAttribute("min"), 0), this.max = a(this.$element[0].getAttribute("max"), 100), this.value = a(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = a(this.$element[0].getAttribute("step"), 1)), this.handleDimension = r(this.$handle[0], "offset" + l(this.DIMENSION)), this.rangeDimension = r(this.$range[0], "offset" + l(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, e)
        }, c.prototype.handleDown = function(t) {
            if (this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), !((" " + t.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
                var e = this.getRelativePosition(t),
                    i = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                    n = this.getPositionFromNode(this.$handle[0]) - i,
                    s = "vertical" === this.orientation ? this.maxHandlePos - (e - this.grabPos) : e - this.grabPos;
                this.setPosition(s), e >= n && e < n + this.handleDimension && (this.grabPos = e - n)
            }
        }, c.prototype.handleMove = function(t) {
            t.preventDefault();
            var e = this.getRelativePosition(t),
                i = "vertical" === this.orientation ? this.maxHandlePos - (e - this.grabPos) : e - this.grabPos;
            this.setPosition(i)
        }, c.prototype.handleEnd = function(t) {
            t.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$element.trigger("change", {
                origin: this.identifier
            }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
        }, c.prototype.cap = function(t, e, i) {
            return e > t ? e : t > i ? i : t
        }, c.prototype.setPosition = function(t, e) {
            var i, n;
            void 0 === e && (e = !0), i = this.getValueFromPosition(this.cap(t, 0, this.maxHandlePos)), n = this.getPositionFromValue(i), this.$fill[0].style[this.DIMENSION] = n + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = n + "px", this.setValue(i), this.position = n, this.value = i, e && this.onSlide && "function" == typeof this.onSlide && this.onSlide(n, i)
        }, c.prototype.getPositionFromNode = function(t) {
            for (var e = 0; null !== t;) e += t.offsetLeft, t = t.offsetParent;
            return e
        }, c.prototype.getRelativePosition = function(t) {
            var e = l(this.COORDINATE),
                i = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                n = 0;
            return "undefined" != typeof t["page" + e] ? n = t["client" + e] : "undefined" != typeof t.originalEvent["client" + e] ? n = t.originalEvent["client" + e] : t.originalEvent.touches && t.originalEvent.touches[0] && "undefined" != typeof t.originalEvent.touches[0]["client" + e] ? n = t.originalEvent.touches[0]["client" + e] : t.currentPoint && "undefined" != typeof t.currentPoint[this.COORDINATE] && (n = t.currentPoint[this.COORDINATE]), n - i
        }, c.prototype.getPositionFromValue = function(t) {
            var e, i;
            return e = (t - this.min) / (this.max - this.min), i = Number.isNaN(e) ? 0 : e * this.maxHandlePos
        }, c.prototype.getValueFromPosition = function(t) {
            var e, i;
            return e = t / (this.maxHandlePos || 1), i = this.step * Math.round(e * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(this.toFixed))
        }, c.prototype.setValue = function(t) {
            (t !== this.value || "" === this.$element[0].value) && this.$element.val(t).trigger("input", {
                origin: this.identifier
            })
        }, c.prototype.destroy = function() {
            this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + u), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
        }, t.fn[u] = function(e) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var n = t(this),
                    s = n.data("plugin_" + u);
                s || n.data("plugin_" + u, s = new c(this, e)), "string" == typeof e && s[e].apply(s, i)
            })
        }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
    }),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function(t) {
        var e = 0,
            i = Array.prototype.slice;
        t.cleanData = function(e) {
            return function(i) {
                var n, s, o;
                for (o = 0; null != (s = i[o]); o++) try {
                    n = t._data(s, "events"), n && n.remove && t(s).triggerHandler("remove")
                } catch (r) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, n) {
            var s, o, r, a, l = {},
                c = e.split(".")[0];
            return e = e.split(".")[1], s = c + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }, t[c] = t[c] || {}, o = t[c][e], r = t[c][e] = function(t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new r(t, e)
            }, t.extend(r, o, {
                version: n.version,
                _proto: t.extend({}, n),
                _childConstructors: []
            }), a = new i, a.options = t.widget.extend({}, a.options), t.each(n, function(e, n) {
                return t.isFunction(n) ? void(l[e] = function() {
                    var t = function() {
                            return i.prototype[e].apply(this, arguments)
                        },
                        s = function(t) {
                            return i.prototype[e].apply(this, t)
                        };
                    return function() {
                        var e, i = this._super,
                            o = this._superApply;
                        return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = o, e
                    }
                }()) : void(l[e] = n)
            }), r.prototype = t.widget.extend(a, {
                widgetEventPrefix: o ? a.widgetEventPrefix || e : e
            }, l, {
                constructor: r,
                namespace: c,
                widgetName: e,
                widgetFullName: s
            }), o ? (t.each(o._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, r, i._proto)
            }), delete o._childConstructors) : i._childConstructors.push(r), t.widget.bridge(e, r), r
        }, t.widget.extend = function(e) {
            for (var n, s, o = i.call(arguments, 1), r = 0, a = o.length; a > r; r++)
                for (n in o[r]) s = o[r][n], o[r].hasOwnProperty(n) && void 0 !== s && (t.isPlainObject(s) ? e[n] = t.isPlainObject(e[n]) ? t.widget.extend({}, e[n], s) : t.widget.extend({}, s) : e[n] = s);
            return e
        }, t.widget.bridge = function(e, n) {
            var s = n.prototype.widgetFullName || e;
            t.fn[e] = function(o) {
                var r = "string" == typeof o,
                    a = i.call(arguments, 1),
                    l = this;
                return r ? this.each(function() {
                    var i, n = t.data(this, s);
                    return "instance" === o ? (l = n, !1) : n ? t.isFunction(n[o]) && "_" !== o.charAt(0) ? (i = n[o].apply(n, a), i !== n && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + o + "'")
                }) : (a.length && (o = t.widget.extend.apply(null, [o].concat(a))), this.each(function() {
                    var e = t.data(this, s);
                    e ? (e.option(o || {}), e._init && e._init()) : t.data(this, s, new n(o, this))
                })), l
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(i, n) {
                n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = e++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === n && this.destroy()
                    }
                }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var n, s, o, r = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (r = {}, n = e.split("."), e = n.shift(), n.length) {
                        for (s = r[e] = t.widget.extend({}, this.options[e]), o = 0; o < n.length - 1; o++) s[n[o]] = s[n[o]] || {}, s = s[n[o]];
                        if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                        s[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        r[e] = i
                    }
                return this._setOptions(r), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function(e, i, n) {
                var s, o = this;
                "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, r) {
                    function a() {
                        return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? o[r] : r).apply(o, arguments) : void 0
                    }
                    "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);
                    var l = n.match(/^([\w:-]*)\s*(.*)$/),
                        c = l[1] + o.eventNamespace,
                        u = l[2];
                    u ? s.delegate(u, c, a) : i.bind(c, a)
                })
            },
            _off: function(e, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(i).undelegate(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var s, o, r = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                    for (s in o) s in i || (i[s] = o[s]);
                return this.element.trigger(i, n), !(t.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, s, o) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var r, a = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), r = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), r && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, o) : n.queue(function(i) {
                    t(this)[e](), o && o.call(n[0]), i()
                })
            }
        });
        t.widget
    }),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery)
    }(function(t) {
        "use strict";
        var e = 0;
        t.ajaxTransport("iframe", function(i) {
            if (i.async) {
                var n, s, o, r = i.initialIframeSrc || "javascript:false;";
                return {
                    send: function(a, l) {
                        n = t('<form style="display:none;"></form>'), n.attr("accept-charset", i.formAcceptCharset), o = /\?/.test(i.url) ? "&" : "?", "DELETE" === i.type ? (i.url = i.url + o + "_method=DELETE", i.type = "POST") : "PUT" === i.type ? (i.url = i.url + o + "_method=PUT", i.type = "POST") : "PATCH" === i.type && (i.url = i.url + o + "_method=PATCH", i.type = "POST"), e += 1, s = t('<iframe src="' + r + '" name="iframe-transport-' + e + '"></iframe>').bind("load", function() {
                            var e, o = t.isArray(i.paramName) ? i.paramName : [i.paramName];
                            s.unbind("load").bind("load", function() {
                                var e;
                                try {
                                    if (e = s.contents(), !e.length || !e[0].firstChild) throw new Error
                                } catch (i) {
                                    e = void 0
                                }
                                l(200, "success", {
                                    iframe: e
                                }), t('<iframe src="' + r + '"></iframe>').appendTo(n), window.setTimeout(function() {
                                    n.remove()
                                }, 0)
                            }), n.prop("target", s.prop("name")).prop("action", i.url).prop("method", i.type), i.formData && t.each(i.formData, function(e, i) {
                                t('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(n)
                            }), i.fileInput && i.fileInput.length && "POST" === i.type && (e = i.fileInput.clone(), i.fileInput.after(function(t) {
                                return e[t]
                            }), i.paramName && i.fileInput.each(function(e) {
                                t(this).prop("name", o[e] || i.paramName)
                            }), n.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), i.fileInput.removeAttr("form")), n.submit(), e && e.length && i.fileInput.each(function(i, n) {
                                var s = t(e[i]);
                                t(n).prop("name", s.prop("name")).attr("form", s.attr("form")), s.replaceWith(n)
                            })
                        }), n.append(s).appendTo(document.body)
                    },
                    abort: function() {
                        s && s.unbind("load").prop("src", r), n && n.remove()
                    }
                }
            }
        }), t.ajaxSetup({
            converters: {
                "iframe text": function(e) {
                    return e && t(e[0].body).text()
                },
                "iframe json": function(e) {
                    return e && t.parseJSON(t(e[0].body).text())
                },
                "iframe html": function(e) {
                    return e && t(e[0].body).html()
                },
                "iframe xml": function(e) {
                    var i = e && e[0];
                    return i && t.isXMLDoc(i) ? i : t.parseXML(i.XMLDocument && i.XMLDocument.xml || t(i.body).html())
                },
                "iframe script": function(e) {
                    return e && t.globalEval(t(e[0].body).text())
                }
            }
        })
    }),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "jquery.ui.widget"], t) : "object" == typeof exports ? t(require("jquery"), require("./vendor/jquery.ui.widget")) : t(window.jQuery)
    }(function(t) {
        "use strict";

        function e(e) {
            var i = "dragover" === e;
            return function(n) {
                n.dataTransfer = n.originalEvent && n.originalEvent.dataTransfer;
                var s = n.dataTransfer;
                s && -1 !== t.inArray("Files", s.types) && this._trigger(e, t.Event(e, {
                    delegatedEvent: n
                })) !== !1 && (n.preventDefault(), i && (s.dropEffect = "copy"))
            }
        }
        t.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || t('<input type="file">').prop("disabled")), t.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), t.support.xhrFormDataFileUpload = !!window.FormData, t.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), t.widget("blueimp.fileupload", {
            options: {
                dropZone: t(document),
                pasteZone: void 0,
                fileInput: void 0,
                replaceFileInput: !0,
                paramName: void 0,
                singleFileUploads: !0,
                limitMultiFileUploads: void 0,
                limitMultiFileUploadSize: void 0,
                limitMultiFileUploadSizeOverhead: 512,
                sequentialUploads: !1,
                limitConcurrentUploads: void 0,
                forceIframeTransport: !1,
                redirect: void 0,
                redirectParamName: void 0,
                postMessage: void 0,
                multipart: !0,
                maxChunkSize: void 0,
                uploadedBytes: void 0,
                recalculateProgress: !0,
                progressInterval: 100,
                bitrateInterval: 500,
                autoUpload: !0,
                messages: {
                    uploadedBytes: "Uploaded bytes exceed file size"
                },
                i18n: function(e, i) {
                    return e = this.messages[e] || e.toString(), i && t.each(i, function(t, i) {
                        e = e.replace("{" + t + "}", i)
                    }), e
                },
                formData: function(t) {
                    return t.serializeArray()
                },
                add: function(e, i) {
                    return e.isDefaultPrevented() ? !1 : void((i.autoUpload || i.autoUpload !== !1 && t(this).fileupload("option", "autoUpload")) && i.process().done(function() {
                        i.submit()
                    }))
                },
                processData: !1,
                contentType: !1,
                cache: !1,
                timeout: 0
            },
            _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
            _blobSlice: t.support.blobSlice && function() {
                var t = this.slice || this.webkitSlice || this.mozSlice;
                return t.apply(this, arguments)
            },
            _BitrateTimer: function() {
                this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(t, e, i) {
                    var n = t - this.timestamp;
                    return (!this.bitrate || !i || n > i) && (this.bitrate = (e - this.loaded) * (1e3 / n) * 8, this.loaded = e, this.timestamp = t), this.bitrate
                }
            },
            _isXHRUpload: function(e) {
                return !e.forceIframeTransport && (!e.multipart && t.support.xhrFileUpload || t.support.xhrFormDataFileUpload)
            },
            _getFormData: function(e) {
                var i;
                return "function" === t.type(e.formData) ? e.formData(e.form) : t.isArray(e.formData) ? e.formData : "object" === t.type(e.formData) ? (i = [], t.each(e.formData, function(t, e) {
                    i.push({
                        name: t,
                        value: e
                    })
                }), i) : []
            },
            _getTotal: function(e) {
                var i = 0;
                return t.each(e, function(t, e) {
                    i += e.size || 1
                }), i
            },
            _initProgressObject: function(e) {
                var i = {
                    loaded: 0,
                    total: 0,
                    bitrate: 0
                };
                e._progress ? t.extend(e._progress, i) : e._progress = i
            },
            _initResponseObject: function(t) {
                var e;
                if (t._response)
                    for (e in t._response) t._response.hasOwnProperty(e) && delete t._response[e];
                else t._response = {}
            },
            _onProgress: function(e, i) {
                if (e.lengthComputable) {
                    var n, s = Date.now ? Date.now() : (new Date).getTime();
                    if (i._time && i.progressInterval && s - i._time < i.progressInterval && e.loaded !== e.total) return;
                    i._time = s, n = Math.floor(e.loaded / e.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0), this._progress.loaded += n - i._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(s, this._progress.loaded, i.bitrateInterval), i._progress.loaded = i.loaded = n, i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(s, n, i.bitrateInterval), this._trigger("progress", t.Event("progress", {
                        delegatedEvent: e
                    }), i), this._trigger("progressall", t.Event("progressall", {
                        delegatedEvent: e
                    }), this._progress)
                }
            },
            _initProgressListener: function(e) {
                var i = this,
                    n = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
                n.upload && (t(n.upload).bind("progress", function(t) {
                    var n = t.originalEvent;
                    t.lengthComputable = n.lengthComputable, t.loaded = n.loaded, t.total = n.total, i._onProgress(t, e)
                }), e.xhr = function() {
                    return n
                })
            },
            _isInstanceOf: function(t, e) {
                return Object.prototype.toString.call(e) === "[object " + t + "]"
            },
            _initXHRData: function(e) {
                var i, n = this,
                    s = e.files[0],
                    o = e.multipart || !t.support.xhrFileUpload,
                    r = "array" === t.type(e.paramName) ? e.paramName[0] : e.paramName;
                e.headers = t.extend({}, e.headers), e.contentRange && (e.headers["Content-Range"] = e.contentRange), o && !e.blob && this._isInstanceOf("File", s) || (e.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(s.name) + '"'), o ? t.support.xhrFormDataFileUpload && (e.postMessage ? (i = this._getFormData(e), e.blob ? i.push({
                    name: r,
                    value: e.blob
                }) : t.each(e.files, function(n, s) {
                    i.push({
                        name: "array" === t.type(e.paramName) && e.paramName[n] || r,
                        value: s
                    })
                })) : (n._isInstanceOf("FormData", e.formData) ? i = e.formData : (i = new FormData, t.each(this._getFormData(e), function(t, e) {
                    i.append(e.name, e.value)
                })), e.blob ? i.append(r, e.blob, s.name) : t.each(e.files, function(s, o) {
                    (n._isInstanceOf("File", o) || n._isInstanceOf("Blob", o)) && i.append("array" === t.type(e.paramName) && e.paramName[s] || r, o, o.uploadName || o.name)
                })), e.data = i) : (e.contentType = s.type || "application/octet-stream", e.data = e.blob || s), e.blob = null
            },
            _initIframeSettings: function(e) {
                var i = t("<a></a>").prop("href", e.url).prop("host");
                e.dataType = "iframe " + (e.dataType || ""), e.formData = this._getFormData(e), e.redirect && i && i !== location.host && e.formData.push({
                    name: e.redirectParamName || "redirect",
                    value: e.redirect
                })
            },
            _initDataSettings: function(t) {
                this._isXHRUpload(t) ? (this._chunkedUpload(t, !0) || (t.data || this._initXHRData(t), this._initProgressListener(t)), t.postMessage && (t.dataType = "postmessage " + (t.dataType || ""))) : this._initIframeSettings(t)
            },
            _getParamName: function(e) {
                var i = t(e.fileInput),
                    n = e.paramName;
                return n ? t.isArray(n) || (n = [n]) : (n = [], i.each(function() {
                    for (var e = t(this), i = e.prop("name") || "files[]", s = (e.prop("files") || [1]).length; s;) n.push(i), s -= 1
                }), n.length || (n = [i.prop("name") || "files[]"])), n
            },
            _initFormSettings: function(e) {
                e.form && e.form.length || (e.form = t(e.fileInput.prop("form")), e.form.length || (e.form = t(this.options.fileInput.prop("form")))), e.paramName = this._getParamName(e), e.url || (e.url = e.form.prop("action") || location.href), e.type = (e.type || "string" === t.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(), "POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"), e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"))
            },
            _getAJAXSettings: function(e) {
                var i = t.extend({}, this.options, e);
                return this._initFormSettings(i), this._initDataSettings(i), i
            },
            _getDeferredState: function(t) {
                return t.state ? t.state() : t.isResolved() ? "resolved" : t.isRejected() ? "rejected" : "pending"
            },
            _enhancePromise: function(t) {
                return t.success = t.done, t.error = t.fail, t.complete = t.always, t
            },
            _getXHRPromise: function(e, i, n) {
                var s = t.Deferred(),
                    o = s.promise();
                return i = i || this.options.context || o, e === !0 ? s.resolveWith(i, n) : e === !1 && s.rejectWith(i, n), o.abort = s.promise, this._enhancePromise(o)
            },
            _addConvenienceMethods: function(e, i) {
                var n = this,
                    s = function(e) {
                        return t.Deferred().resolveWith(n, e).promise()
                    };
                i.process = function(e, o) {
                    return (e || o) && (i._processQueue = this._processQueue = (this._processQueue || s([this])).then(function() {
                        return i.errorThrown ? t.Deferred().rejectWith(n, [i]).promise() : s(arguments)
                    }).then(e, o)), this._processQueue || s([this])
                }, i.submit = function() {
                    return "pending" !== this.state() && (i.jqXHR = this.jqXHR = n._trigger("submit", t.Event("submit", {
                        delegatedEvent: e
                    }), this) !== !1 && n._onSend(e, this)), this.jqXHR || n._getXHRPromise()
                }, i.abort = function() {
                    return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", n._trigger("fail", null, this), n._getXHRPromise(!1))
                }, i.state = function() {
                    return this.jqXHR ? n._getDeferredState(this.jqXHR) : this._processQueue ? n._getDeferredState(this._processQueue) : void 0
                }, i.processing = function() {
                    return !this.jqXHR && this._processQueue && "pending" === n._getDeferredState(this._processQueue)
                }, i.progress = function() {
                    return this._progress
                }, i.response = function() {
                    return this._response
                }
            },
            _getUploadedBytes: function(t) {
                var e = t.getResponseHeader("Range"),
                    i = e && e.split("-"),
                    n = i && i.length > 1 && parseInt(i[1], 10);
                return n && n + 1
            },
            _chunkedUpload: function(e, i) {
                e.uploadedBytes = e.uploadedBytes || 0;
                var n, s, o = this,
                    r = e.files[0],
                    a = r.size,
                    l = e.uploadedBytes,
                    c = e.maxChunkSize || a,
                    u = this._blobSlice,
                    p = t.Deferred(),
                    d = p.promise();
                return this._isXHRUpload(e) && u && (l || a > c) && !e.data ? i ? !0 : l >= a ? (r.error = e.i18n("uploadedBytes"), this._getXHRPromise(!1, e.context, [null, "error", r.error])) : (s = function() {
                    var i = t.extend({}, e),
                        d = i._progress.loaded;
                    i.blob = u.call(r, l, l + c, r.type), i.chunkSize = i.blob.size, i.contentRange = "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + a, o._initXHRData(i), o._initProgressListener(i), n = (o._trigger("chunksend", null, i) !== !1 && t.ajax(i) || o._getXHRPromise(!1, i.context)).done(function(n, r, c) {
                        l = o._getUploadedBytes(c) || l + i.chunkSize, d + i.chunkSize - i._progress.loaded && o._onProgress(t.Event("progress", {
                                lengthComputable: !0,
                                loaded: l - i.uploadedBytes,
                                total: l - i.uploadedBytes
                            }), i), e.uploadedBytes = i.uploadedBytes = l,
                            i.result = n, i.textStatus = r, i.jqXHR = c, o._trigger("chunkdone", null, i), o._trigger("chunkalways", null, i), a > l ? s() : p.resolveWith(i.context, [n, r, c])
                    }).fail(function(t, e, n) {
                        i.jqXHR = t, i.textStatus = e, i.errorThrown = n, o._trigger("chunkfail", null, i), o._trigger("chunkalways", null, i), p.rejectWith(i.context, [t, e, n])
                    })
                }, this._enhancePromise(d), d.abort = function() {
                    return n.abort()
                }, s(), d) : !1
            },
            _beforeSend: function(t, e) {
                0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(e), this._initProgressObject(e), e._progress.loaded = e.loaded = e.uploadedBytes || 0, e._progress.total = e.total = this._getTotal(e.files) || 1, e._progress.bitrate = e.bitrate = 0, this._active += 1, this._progress.loaded += e.loaded, this._progress.total += e.total
            },
            _onDone: function(e, i, n, s) {
                var o = s._progress.total,
                    r = s._response;
                s._progress.loaded < o && this._onProgress(t.Event("progress", {
                    lengthComputable: !0,
                    loaded: o,
                    total: o
                }), s), r.result = s.result = e, r.textStatus = s.textStatus = i, r.jqXHR = s.jqXHR = n, this._trigger("done", null, s)
            },
            _onFail: function(t, e, i, n) {
                var s = n._response;
                n.recalculateProgress && (this._progress.loaded -= n._progress.loaded, this._progress.total -= n._progress.total), s.jqXHR = n.jqXHR = t, s.textStatus = n.textStatus = e, s.errorThrown = n.errorThrown = i, this._trigger("fail", null, n)
            },
            _onAlways: function(t, e, i, n) {
                this._trigger("always", null, n)
            },
            _onSend: function(e, i) {
                i.submit || this._addConvenienceMethods(e, i);
                var n, s, o, r, a = this,
                    l = a._getAJAXSettings(i),
                    c = function() {
                        return a._sending += 1, l._bitrateTimer = new a._BitrateTimer, n = n || ((s || a._trigger("send", t.Event("send", {
                            delegatedEvent: e
                        }), l) === !1) && a._getXHRPromise(!1, l.context, s) || a._chunkedUpload(l) || t.ajax(l)).done(function(t, e, i) {
                            a._onDone(t, e, i, l)
                        }).fail(function(t, e, i) {
                            a._onFail(t, e, i, l)
                        }).always(function(t, e, i) {
                            if (a._onAlways(t, e, i, l), a._sending -= 1, a._active -= 1, l.limitConcurrentUploads && l.limitConcurrentUploads > a._sending)
                                for (var n = a._slots.shift(); n;) {
                                    if ("pending" === a._getDeferredState(n)) {
                                        n.resolve();
                                        break
                                    }
                                    n = a._slots.shift()
                                }
                            0 === a._active && a._trigger("stop")
                        })
                    };
                return this._beforeSend(e, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = t.Deferred(), this._slots.push(o), r = o.then(c)) : (this._sequence = this._sequence.then(c, c), r = this._sequence), r.abort = function() {
                    return s = [void 0, "abort", "abort"], n ? n.abort() : (o && o.rejectWith(l.context, s), c())
                }, this._enhancePromise(r)) : c()
            },
            _onAdd: function(e, i) {
                var n, s, o, r, a = this,
                    l = !0,
                    c = t.extend({}, this.options, i),
                    u = i.files,
                    p = u.length,
                    d = c.limitMultiFileUploads,
                    f = c.limitMultiFileUploadSize,
                    h = c.limitMultiFileUploadSizeOverhead,
                    m = 0,
                    g = this._getParamName(c),
                    v = 0;
                if (!p) return !1;
                if (f && void 0 === u[0].size && (f = void 0), (c.singleFileUploads || d || f) && this._isXHRUpload(c))
                    if (c.singleFileUploads || f || !d)
                        if (!c.singleFileUploads && f)
                            for (o = [], n = [], r = 0; p > r; r += 1) m += u[r].size + h, (r + 1 === p || m + u[r + 1].size + h > f || d && r + 1 - v >= d) && (o.push(u.slice(v, r + 1)), s = g.slice(v, r + 1), s.length || (s = g), n.push(s), v = r + 1, m = 0);
                        else n = g;
                else
                    for (o = [], n = [], r = 0; p > r; r += d) o.push(u.slice(r, r + d)), s = g.slice(r, r + d), s.length || (s = g), n.push(s);
                else o = [u], n = [g];
                return i.originalFiles = u, t.each(o || u, function(s, r) {
                    var c = t.extend({}, i);
                    return c.files = o ? r : [r], c.paramName = n[s], a._initResponseObject(c), a._initProgressObject(c), a._addConvenienceMethods(e, c), l = a._trigger("add", t.Event("add", {
                        delegatedEvent: e
                    }), c)
                }), l
            },
            _replaceFileInput: function(e) {
                var i = e.fileInput,
                    n = i.clone(!0),
                    s = i.is(document.activeElement);
                e.fileInputClone = n, t("<form></form>").append(n)[0].reset(), i.after(n).detach(), s && n.focus(), t.cleanData(i.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(t, e) {
                    return e === i[0] ? n[0] : e
                }), i[0] === this.element[0] && (this.element = n)
            },
            _handleFileTreeEntry: function(e, i) {
                var n, s = this,
                    o = t.Deferred(),
                    r = function(t) {
                        t && !t.entry && (t.entry = e), o.resolve([t])
                    },
                    a = function(t) {
                        s._handleFileTreeEntries(t, i + e.name + "/").done(function(t) {
                            o.resolve(t)
                        }).fail(r)
                    },
                    l = function() {
                        n.readEntries(function(t) {
                            t.length ? (c = c.concat(t), l()) : a(c)
                        }, r)
                    },
                    c = [];
                return i = i || "", e.isFile ? e._file ? (e._file.relativePath = i, o.resolve(e._file)) : e.file(function(t) {
                    t.relativePath = i, o.resolve(t)
                }, r) : e.isDirectory ? (n = e.createReader(), l()) : o.resolve([]), o.promise()
            },
            _handleFileTreeEntries: function(e, i) {
                var n = this;
                return t.when.apply(t, t.map(e, function(t) {
                    return n._handleFileTreeEntry(t, i)
                })).then(function() {
                    return Array.prototype.concat.apply([], arguments)
                })
            },
            _getDroppedFiles: function(e) {
                e = e || {};
                var i = e.items;
                return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(t.map(i, function(t) {
                    var e;
                    return t.webkitGetAsEntry ? (e = t.webkitGetAsEntry(), e && (e._file = t.getAsFile()), e) : t.getAsEntry()
                })) : t.Deferred().resolve(t.makeArray(e.files)).promise()
            },
            _getSingleFileInputFiles: function(e) {
                e = t(e);
                var i, n, s = e.prop("webkitEntries") || e.prop("entries");
                if (s && s.length) return this._handleFileTreeEntries(s);
                if (i = t.makeArray(e.prop("files")), i.length) void 0 === i[0].name && i[0].fileName && t.each(i, function(t, e) {
                    e.name = e.fileName, e.size = e.fileSize
                });
                else {
                    if (n = e.prop("value"), !n) return t.Deferred().resolve([]).promise();
                    i = [{
                        name: n.replace(/^.*\\/, "")
                    }]
                }
                return t.Deferred().resolve(i).promise()
            },
            _getFileInputFiles: function(e) {
                return e instanceof t && 1 !== e.length ? t.when.apply(t, t.map(e, this._getSingleFileInputFiles)).then(function() {
                    return Array.prototype.concat.apply([], arguments)
                }) : this._getSingleFileInputFiles(e)
            },
            _onChange: function(e) {
                var i = this,
                    n = {
                        fileInput: t(e.target),
                        form: t(e.target.form)
                    };
                this._getFileInputFiles(n.fileInput).always(function(s) {
                    n.files = s, i.options.replaceFileInput && i._replaceFileInput(n), i._trigger("change", t.Event("change", {
                        delegatedEvent: e
                    }), n) !== !1 && i._onAdd(e, n)
                })
            },
            _onPaste: function(e) {
                var i = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
                    n = {
                        files: []
                    };
                i && i.length && (t.each(i, function(t, e) {
                    var i = e.getAsFile && e.getAsFile();
                    i && n.files.push(i)
                }), this._trigger("paste", t.Event("paste", {
                    delegatedEvent: e
                }), n) !== !1 && this._onAdd(e, n))
            },
            _onDrop: function(e) {
                e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
                var i = this,
                    n = e.dataTransfer,
                    s = {};
                n && n.files && n.files.length && (e.preventDefault(), this._getDroppedFiles(n).always(function(n) {
                    s.files = n, i._trigger("drop", t.Event("drop", {
                        delegatedEvent: e
                    }), s) !== !1 && i._onAdd(e, s)
                }))
            },
            _onDragOver: e("dragover"),
            _onDragEnter: e("dragenter"),
            _onDragLeave: e("dragleave"),
            _initEventHandlers: function() {
                this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    dragenter: this._onDragEnter,
                    dragleave: this._onDragLeave
                }), this._on(this.options.pasteZone, {
                    paste: this._onPaste
                })), t.support.fileInput && this._on(this.options.fileInput, {
                    change: this._onChange
                })
            },
            _destroyEventHandlers: function() {
                this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
            },
            _setOption: function(e, i) {
                var n = -1 !== t.inArray(e, this._specialOptions);
                n && this._destroyEventHandlers(), this._super(e, i), n && (this._initSpecialOptions(), this._initEventHandlers())
            },
            _initSpecialOptions: function() {
                var e = this.options;
                void 0 === e.fileInput ? e.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : e.fileInput instanceof t || (e.fileInput = t(e.fileInput)), e.dropZone instanceof t || (e.dropZone = t(e.dropZone)), e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone))
            },
            _getRegExp: function(t) {
                var e = t.split("/"),
                    i = e.pop();
                return e.shift(), new RegExp(e.join("/"), i)
            },
            _isRegExpOption: function(e, i) {
                return "url" !== e && "string" === t.type(i) && /^\/.*\/[igm]{0,3}$/.test(i)
            },
            _initDataAttributes: function() {
                var e = this,
                    i = this.options,
                    n = this.element.data();
                t.each(this.element[0].attributes, function(t, s) {
                    var o, r = s.name.toLowerCase();
                    /^data-/.test(r) && (r = r.slice(5).replace(/-[a-z]/g, function(t) {
                        return t.charAt(1).toUpperCase()
                    }), o = n[r], e._isRegExpOption(r, o) && (o = e._getRegExp(o)), i[r] = o)
                })
            },
            _create: function() {
                this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
            },
            active: function() {
                return this._active
            },
            progress: function() {
                return this._progress
            },
            add: function(e) {
                var i = this;
                e && !this.options.disabled && (e.fileInput && !e.files ? this._getFileInputFiles(e.fileInput).always(function(t) {
                    e.files = t, i._onAdd(null, e)
                }) : (e.files = t.makeArray(e.files), this._onAdd(null, e)))
            },
            send: function(e) {
                if (e && !this.options.disabled) {
                    if (e.fileInput && !e.files) {
                        var i, n, s = this,
                            o = t.Deferred(),
                            r = o.promise();
                        return r.abort = function() {
                            return n = !0, i ? i.abort() : (o.reject(null, "abort", "abort"), r)
                        }, this._getFileInputFiles(e.fileInput).always(function(t) {
                            if (!n) {
                                if (!t.length) return void o.reject();
                                e.files = t, i = s._onSend(null, e), i.then(function(t, e, i) {
                                    o.resolve(t, e, i)
                                }, function(t, e, i) {
                                    o.reject(t, e, i)
                                })
                            }
                        }), this._enhancePromise(r)
                    }
                    if (e.files = t.makeArray(e.files), e.files.length) return this._onSend(null, e)
                }
                return this._getXHRPromise(!1, e && e.context)
            }
        })
    });