/**
 * Created by kuyu2 on 2017/7/4.
 */
function A(e, n) {
    index.aq_object[e] = n
}
function initLocation(e) {
    index.current_error_dom = "load_location_begin",
        index.loadLocation(e),
        index.current_error_dom = "load_location_end"
}
function webnotice(e) {
    0 == e.ec && 1 == e.show && "" != e.c && ($("web_notice_text").innerHTML = e.c, $("web_notice").style.display = "block")
}
var component = {};
component.qzone = !!$("qzone"),
    component.lunar = 1,
    component.areaSearch = "chs" == $GLOBALS.lang ? 1 : 0,
    g_lang = "chs" == $GLOBALS.lang ? 1 : 0;
var index = {
    aq_js: "/chs/m.js?v=" + Math.random(),
    aq_cgi: "http://a.zc.qq.com/Cgi-bin/MoniKey?",
    aq_input: {
        nick: 1,
        phone_num: 2,
        self_email: 3,
        other_email: 4,
        password: 5,
        password_again: 6,
        sex_1: 7,
        sex_2: 8,
        birthday_type_value: 9,
        year_value: 10,
        month_value: 11,
        day_value: 12,
        country_value: 13,
        province_value: 14,
        city_value: 15,
        code: 16
    },
    aq_array: [],
    aq_object: {},
    initIndexType: 1 == g_lang ? 0 : 2,
    inited: !1,
    cellphoneE: [__("plz_input_phone_num", "请输入手机号码，以便接收验证码"), __("phone_num_illegal", "手机号码格式不正确"), __("send_phone_verify_failed_server_busy", "抱歉，服务器繁忙，请稍后再试"), __("reach_sms_limit_each_day_plz_try_other", "该手机号码今天接受验证码数目已达上限，建议尝试其他手机号码")],
    phoneE: ["请输入手机号码", "请输入有效的手机号码", "手机号不可以为空", "手机号不可以为空格", "请输入手机号码"],
    nickE: [__("e_nick_null", "昵称不可以为空"), __("e_nick_blank", "昵称不可以为空格"), __("e_nick_plz_input", "请输入昵称"), "", __("e_nick_max_is_12", "不能超过24个字母或12个汉字"), __("e_nick_is_invalid", "您不能使用该昵称注册")],
    otherEmailE: [__("e_other_mail_plz_input", "请输入邮箱"), __("e_other_mail_acc_exist", "帐号已被注册"), __("e_other_mail_illegal", "邮箱格式错误"), __("e_other_mail_ok", "帐号可用"), __("e_other_mail_plz_input_exist_email2", "请输入非QQ/Foxmail邮箱"), __("e_other_mail_cant_use_foxmail", "不能使用foxmail.com的Email帐号"), __("e_other_mail_cant_use_qqmail", "不能使用qq.com的Email帐号")],
    selfEmailE: [__("e_self_mail_plz_input", "请输入邮箱"), __("e_self_mail_length_limit", "长度为3-18个字符"), __("e_self_mail_start_limit", "必须以a-z的英文字母（不分大小写）开头"), __("e_self_mail_start_limit", "必须以a-z的英文字母（不分大小写）开头"), __("e_self_mail_char_limit2", "由3-16个英文、数字、点、减号、下划线组成"), __("e_self_mail_char_special_limit", "点、减号、下划线不能连续出现两次或两次以上"), __("e_self_mail_end_limit", "由英文字母、数字结尾"), __("e_self_mail_illegal", "Email帐号格式不正确"), __("e_self_mail_illegal2", "邮箱格式错误"), __("e_self_mail_acc_exist", "邮箱已被注册")],
    passE: [__("e_pwd_too_short", "您输入的密码过短"), __("e_pwd_pure_num", "密码不能为9位以下纯数字"), __("e_pwd_null", "密码不可以为空"), __("e_pwd_too_long", "您输入的密码过长")],
    passInfo: [__("e_pwd_level_low", "级别低"), __("e_pwd_level_high", "级别高")],
    passAgainE: [__("e_pwd_confirm_not_match", "密码不一致"), __("e_pwd_confirm_plz_input_ag", "请再次输入密码")],
    weakpassTips: [__("e_pwd_lianxu", "连续字符的密码易被破解"), __("e_pwd_same", "密码相同"), __("e_pwd_simple", "密码不一致")],
    birthE: [__("e_birth_null", "生日不可为空"), __("e_birth_invalid", "年龄不合法")],
    areaE: [__("e_location_null", "请选择正确的地区"), __("e_location_invalid", "不支持该地区")],
    termsE: [__("e_tos_plz_agree_terms", "请同意条款")],
    birthdayE: [__("e_birth_plz_choose_birthday", "请选择生日")],
    submitE: [__("e_submit_plz_agree_terms_first", "请先同意服务条款"), __("index_reg_submit", "立即注册")],
    codeE: [__("e_verfiy_code_err", "验证码错误"), __("e_verfiy_code_input_not_case_sensitive", "请输入图中的字母，不区分大小写"), __("e_verfiy_code_input_complete", "请输入完整验证码"), __("e_verfiy_code_plz_input", "请输入验证码")],
    inputSearchTipsArray: ["试试直接填写吧！例如1960", "试试直接填写吧！例如11", "试试直接填写吧！例如15", "试试快速搜索吧！例如中国或zg", "试试快速搜索吧！例如北京或bj", "试试快速搜索吧！例如朝阳或cy"],
    verimaTip: [__("u_can_resend_phone_verify", "可重新获取"), __("resend_phone_verify", "重新获取验证码"), __("send_sms_for_phone_verify", "向此手机发送验证码")],
    wording: [__("senconds_left", "秒后"), __("resend_phone_verify", "重新获取验证码")],
    maxPwdLen: 16,
    minPwdLen: 6,
    emailReg: /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i,
    enWordReg: /[a-zA-Z]/,
    alreadyUsedEmails: [],
    type: 0,
    selfEmail: "",
    selfType: 0,
    otherEmail: "",
    nick: "",
    password: "",
    passAgain: "",
    sex: "1",
    birthType: "0",
    isLeap: 1,
    year: "",
    month: "",
    day: "",
    country: "",
    province: "",
    city: "",
    verifycode: "",
    code: "",
    qzone: g.component.qzone,
    agreed: !0,
    showing: !1,
    host: "/",
    initInfo: null,
    totol: 2,
    errorId: "",
    needShowError: [1, 1, 1],
    location: null,
    showDate: {
        year: 0,
        month: 0,
        day: 0,
        isLeap: !1
    },
    maxDate: {
        year: 0,
        month: 0,
        day: 0
    },
    old_birthType: "0",
    number_init: "cgi-bin/" + __("_lang_cgi_prefix", "") + "numreg/init",
    number_init_simpl_chs: "cgi-bin/chs/numreg/init_new",
    phone_init: "cgi-bin/" + __("_lang_cgi_prefix", "") + "phonereg/init",
    qqmail_init: "cgi-bin/" + __("_lang_cgi_prefix", "") + "qqmailreg/init",
    other_init: "cgi-bin/" + __("_lang_cgi_prefix", "") + "othmailreg/init",
    number_url: "cgi-bin/" + __("_lang_cgi_prefix", "") + "numreg/get_acc" + ("chs" === $GLOBALS.lang ? "_safe" : ""),
    number_url_simpl_chs: "cgi-bin/chs/numreg/get_acc",
    phone_url: "cgi-bin/" + __("_lang_cgi_prefix", "") + "phonereg/get_acc",
    qqmail_url: "cgi-bin/" + __("_lang_cgi_prefix", "") + "qqmailreg/get_acc" + ("chs" === $GLOBALS.lang ? "_safe" : ""),
    othermail_url: "cgi-bin/" + __("_lang_cgi_prefix", "") + "othmailreg/get_acc",
    codeUrl: "https://ssl.captcha.qq.com/getimage?aid=1007901",
    otherChkUrl: "cgi-bin/" + __("_lang_cgi_prefix", "") + "othmailreg/check_mail",
    selfChkUrl: "cgi-bin/" + __("_lang_cgi_prefix", "") + "qqmailreg/check_mail",
    fromReportUrl: "/cgi-bin/common/attr",
    nickChkUrl: "/cgi-bin/" + __("_lang_cgi_prefix", "") + "common/dirty_check",
    nickChkUrl_simpl_chs: "/cgi-bin/chs/numreg/dirty_check",
    chkPwdUrl: "/cgi-bin/chs/numreg/pwd_check",
    areaSearchUrl: "/cgi-bin/" + __("_lang_cgi_prefix", "") + "common/area",
    smsSendUrl: "/cgi-bin/" + __("_lang_cgi_prefix", "") + "common/sms_send_safe",
    smsSendUrl_simpl_chs: "/cgi-bin/chs/numreg/sms_send",
    phoneChkUrl: "/cgi-bin/common/check_phone",
    secChkUrl: "/cgi-bin/" + __("_lang_cgi_prefix", "") + "common/safe_check",
    email_ok: "email_ok.html",
    phone_ok: "phone_ok.html",
    decimal_ok: "decimal_ok.html",
    max_selective_rate: 100,
    selective_rate: "chs" === $GLOBALS.lang ? 100 : 5,
    selective_decimal_ok: "selective_decimal_ok.html",
    send_ok: "send_ok.html",
    pwdLvClass: ["empty", "rankLow", "rankMiddle", "rankHigh"],
    pwdLvTips: [__("pwd_lv_tips_limit", "6-16个字符，不可以为9位以下纯数字"), __("pwd_lv_tips_weak", "弱：试试字母、数字、标点混搭"), __("pwd_lv_tips_medium", "中强：试试字母、数字、标点混搭"), __("pwd_lv_tips_strong", "强：请牢记您的密码"), __("pwd_lv_tips_weak_too_short", "弱：试试加长您的密码")],
    pwdLvWording: ["", __("pwd_lv_wording_weak", "弱"), __("pwd_lv_wording_medium", "中强"), __("pwd_lv_wording_strong", "强")],
    keyCode: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        BACK: 8,
        DEL: 46,
        F5: 116
    },
    listIndex: [0, 21, 0, 0, -1, -1, -1, 0, 0],
    selectListIndex: [0, 21, 0, 0, -1, -1, -1, 0, 0],
    selectListState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    searchTimeoutId: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    selectHasSelected: [!1, !1, !1, !1, !1, !1, !1, !1, !1],
    noAreaStr: "0",
    initAddress: __("default_location_address_code", ["1", "中国", "11", "北京", "1", "东城"]),
    noSelectTip: __("time_cant_select", "该时间不可选"),
    fromId: "",
    fromMap: {
        qq: 58029,
        pt: 58588,
        im: 58589,
        music: 58590,
        live: 58591,
        client: 61112,
        other: 58030
    },
    ptlang: "",
    ADUIN: "",
    ADSESSION: "",
    checkNickMap: {},
    checkPhoneMap: {},
    yearSearchArr: [],
    monthSearchArr: [],
    daySearchArr: [],
    birthdayTipsShow: !1,
    areaTipsShow: !1,
    pwd_valid: !1,
    phoneArea: "0086",
    phoneSubmit: "",
    phoneArea_autocomplete: null,
    huodongEnter: "a",
    safeCode: [0, 0, 0, 0, 0, 0, 0, 0],
    pwdTimeArray: [0, 0, 0, 0],
    pwdNum: 0,
    pwdTime: 0,
    current_error_dom: "",
    knownEmail: ["gmail.com", "hotmail.com", "yahoo.com", "sina.com", "163.com", "126.com", "vip.sina.com", "sina.cn", "sohu.com", "yahoo.cn", "yahoo.com.cn", "139.com", "wo.com.cn", "189.cn", "live.com", "msn.com", "live.hk", "live.cn", "hotmail.com.cn", "hinet.net", "msa.hinet.net", "cm1.hinet.net", "umail.hinet.net", "xuite.net", "yam.com", "yeah.net", "pchome.com.tw", "netvigator.com", "seed.net.tw", "anet.net.tw"],
    codeVerified: !1,
    isNewVCode: ["chs"],
    newVCodeData: {},
    countDownSec: 5,
    countDownObj: null,
    cgiRetry: 0,
    cgiRetryMax: 3,
    isNeedCapt: !1,
    captType: 0,
    captLevel: 0,
    isPwdChk: !1,
    ec_res: 0,
    last_stat_num: 0,
    clearAq: function () {
        index.aq_array = []
    },
    addAq: function (e, n) {
        var i = (new Date).getTime(),
            a = n + "|" + index.aq_input[e] + "|" + i;
        index.aq_array.push(a)
    },
    reportAq: function (e) {
        return
    },
    setAq: function (e, n) {
        index.aq_object[e] = n
    },
    setCode: function (e, n) {
        switch (e) {
            case index.keyCode.BACK:
                index.safeCode[n + 1]++,
                    index.safeCode[7]++;
            default:
                index.safeCode[n]++
        }
        index.safeCode[7]++
    },
    setCodeCookie: function () {
        var e = index.safeCode.join("-");
        $.cookie.setSessionCookie("uoc", e, "zc.qq.com", "/")
    },
    setFromId: function () {
        var e = $.bom.query("fromId");
        if (e);
        else {
            var n = $.bom.query("from");
            n || (n = "other"),
                e = index.fromMap[n]
        }
        index.fromId = e,
            index.ptlang = $.bom.query("ptlang"),
            index.ADUIN = $.bom.query("ADUIN"),
            index.ADSESSION = $.bom.query("ADSESSION");
        var i = $.bom.query("regkey"),
            a = $.bom.query("ADTAG");
        i && $.cookie.set("regkey", i, "zc.qq.com", "/", 17520),
        a && $.cookie.set("ADTAG", a, "zc.qq.com", "/", 17520);
        var t = $.bom.query("client");
        t && $.winName.set("client", t)
    },
    setCloseAppId: function () {
        var e = $.bom.query("app_id"),
            n = $.bom.query("app_param");
        $.winName.set("app_id", e),
            $.winName.set("app_param", n)
    },
    reportSource: function () {
        var e = document.createElement("img");
        e.src = index.fromReportUrl + "?id=" + index.fromId + "&timeused=0&seed=" + Math.random()
    },
    pushAlreadyUsedEmails: function (e) {
        for (var n = 0,
                 i = index.alreadyUsedEmails[0]; i; i = index.alreadyUsedEmails[++n]) if (e == i) return;
        index.alreadyUsedEmails.push(e)
    },
    emailHasAlreadyUsed: function (e) {
        for (var n = 0,
                 i = index.alreadyUsedEmails[0]; i; i = index.alreadyUsedEmails[++n]) if (e == i) return !0;
        return !1
    },
    json2str: function (e) {
        var n = [],
            i = function (e) {
                return "object" == typeof e && null != e ? json2str(e) : /^(string|number)$/.test(typeof e) ? '"' + e + '"' : e
            };
        for (var a in e) n.push('"' + a + '":' + i(e[a]));
        return "{" + n.join(",") + "}"
    },
    getInitUrl: function () {
        return 0 == index.type && 1 == g_lang ? index.host + index.number_init_simpl_chs + "?r=" + Math.random() : 0 == index.type ? index.host + index.number_init + "?r=" + Math.random() : 3 == index.type ? index.host + index.phone_init + "?r=" + Math.random() : index.host + (1 == index.type ? index.qqmail_init : index.other_init) + "?r=" + Math.random()
    },
    getSubmitUrl: function () {
        return 0 == index.type && 1 == g_lang ? index.host + index.number_url_simpl_chs + "?r=" + Math.random() : 0 == index.type ? index.host + index.number_url + "?r=" + Math.random() : 3 == index.type ? index.host + index.phone_url + "?r=" + Math.random() : index.host + (1 == index.type ? index.qqmail_url : index.othermail_url) + "?r=" + Math.random()
    },
    showCodeByElevel: function (e) {
        switch (0 == index.type && 1 == g_lang && (e = 0), e += "") {
            case "0":
                $("code_box").className = "box box_9 hide";
                break;
            case "6":
                location.href = "worst.html?ec=21";
                break;
            default:
                $("code_box").className = "box box_9",
                    index.showNewVCode() ? ($("code_area_new").className = "ipt_box nopadding nobg", $("code_area_img").className = "hide", $("code_tips_tbl").className = "hide", "undefined" == typeof capObj && capInit($("capt"), index.capCB)) : $("code_img").src = index.codeUrl + "&r=" + Math.random()
        }
    },
    getIndexFromId: function (e) {
        var n = 0;
        try {
            n = parseInt(e.split("_")[1])
        } catch (i) {
            n = 0
        }
        return n
    },
    updateShowdDate: function () {
        if (index.year && index.month && window.calendar) {
            var e = "" == index.day ? 1 : index.day,
                n = calendar.getDate(parseInt(index.year), parseInt(index.month), parseInt(e), parseInt(index.old_birthType), parseInt(index.isLeap)),
                i = n.split("-");
            index.showDate.year = parseInt(i[0]),
                index.showDate.month = parseInt(i[1]),
                index.showDate.day = "" == index.day ? 0 : parseInt(i[2]),
                index.showDate.isLeap = "0" == i[3],
                index.isLeap = index.showDate.isLeap ? 0 : 1
        }
        var a = new Date,
            t = a.getFullYear();
        index.showDate.year > t && (index.showDate.year = t, index.showDate.month = 1, index.showDate.day = 1, index.showDate.isLeap = !1),
        index.showDate.year == index.maxDate.year - 120 && (index.showDate.year = index.maxDate.year - 119, index.showDate.month = 1, index.showDate.day = 1, index.showDate.isLeap = !1),
            index.old_birthType = index.birthType
    },
    initMaxDate: function () {
        var e = new Date;
        try {
            var n = index.initInfo.localdate,
                i = n.split("-");
            index.maxDate.year = parseInt(i[0]),
                index.maxDate.month = parseInt(i[1]),
                index.maxDate.day = parseInt(i[2])
        } catch (a) {
            index.maxDate.year = e.getFullYear(),
                index.maxDate.month = e.getMonth() + 1,
                index.maxDate.day = e.getDate()
        }
    },
    inMaxDate: function (e, n, i, a, t) {
        var d = new Date(index.maxDate.year, index.maxDate.month, index.maxDate.day),
            o = new Date;
        switch (a + "") {
            case "0":
                o = new Date(e, n, i);
                break;
            case "1":
                var r = calendar.getDate(e, n, i, 1, t),
                    s = r.split("-");
                o = new Date(parseInt(s[0]), parseInt(s[1]), parseInt(s[2]))
        }
        var c = d.getTime(),
            l = o.getTime();
        return l <= c
    },
    getPwdRank: function (e) {
        var n = 0;
        return e.match(/[a-z]/g) && n++,
        e.match(/[A-Z]/g) && n++,
        e.match(/[0-9]/g) && n++,
        e.match(/[^a-zA-Z0-9]/g) && n++,
            n = n > 3 ? 3 : n,
        (e.length < 6 || /^\d{1,8}$/.test(e)) && (n = 0),
        e.length < 8 && n > 1 && (n = 1),
            n
    },
    showPwRank: function () {
        $("pwd_tips").className = "hide";
        var e = $("password").value;
        $("pwd_result");
        $("pwd_result").className = "";
        var n = $("password_info"),
            i = $("password_pic"),
            a = index.getPwdRank(e);
        i.innerHTML = index.pwdLvWording[a],
            i.className = index.pwdLvClass[a],
            a > 1 ? n.innerHTML = index.pwdLvTips[a] : 1 == a && (index.isLianxuPwd(e) ? n.innerHTML = index.weakpassTips[0] : index.isSamePwd(e) ? n.innerHTML = index.weakpassTips[1] : n.innerHTML = index.weakpassTips[2])
    },
    isLianxuPwd: function (e) {
        if (e.length < 2) return !0;
        var n = e.charCodeAt(0) - e.charCodeAt(1);
        if (0 == n) return !1;
        for (var i = 1,
                 a = e.length; i < a - 1; i++) if (e.charCodeAt(i) - e.charCodeAt(i + 1) != n) return !1;
        return !0
    },
    isSamePwd: function (e) {
        for (var n = 0,
                 i = e.length; n < i - 1; n++) if (e.charCodeAt(n) != e.charCodeAt(n + 1)) return !1;
        return !0
    },
    hidePwRank: function () {
        $("pwd_result").className = "hide",
            $("pwd_tips").className = "pwd_tips"
    },
    updateSelectListIndex: function (e, n) {
        index.selectListIndex[e] = n
    },
    updateListIndex: function (e, n) {
        index.selectListIndex[e] = n,
            index.listIndex[e] = n
    },
    getSelectScrollTop: function (e) {
        var n = index.selectListIndex[e],
            i = 0;
        switch (e) {
            case 0:
                i = 0;
                break;
            case 1:
            case 2:
            case 3:
                i = n > 5 ? 20 * (n - 5) : 0;
                break;
            case 4:
            case 5:
            case 6:
                i = n > 8 ? 20 * (n - 8) : 0
        }
        return i
    },
    getSelectListItem: function (e) {
        var n = index.selectListIndex[e],
            i = null;
        switch (e) {
            case 0:
                i = $("birthday_" + n);
                break;
            case 1:
                i = $("year_" + n);
                break;
            case 2:
                i = $("month_" + n);
                break;
            case 3:
                i = $("day_" + n);
                break;
            case 4:
                i = $("country_" + n);
                break;
            case 5:
                i = $("province_" + n);
                break;
            case 6:
                i = $("city_" + n);
                break;
            case 8:
                i = $("seaCountry_" + n)
        }
        return i
    },
    moveList: function (e, n, i, a) {
        var t = n.getElementsByTagName("li");
        switch (i.keyCode) {
            case index.keyCode.UP:
                i.stopPropagation(),
                    i.preventDefault(),
                index.listIndex[a] > 0 && (t[index.listIndex[a]].className = "", t[index.listIndex[a] - 1].className = "hover", a < 4 && a > 0 && (n.scrollTop = index.listIndex[a] > 6 ? 20 * (index.listIndex[a] - 6) : 0), a >= 4 && (n.scrollTop = index.listIndex[a] > 9 ? 20 * (index.listIndex[a] - 9) : 0), index.listIndex[a]--);
                break;
            case index.keyCode.DOWN:
                if (i.stopPropagation(), i.preventDefault(), n.className.indexOf("hide") > -1) {
                    switch (a) {
                        case 0:
                            index.switchBirtydayType();
                            break;
                        case 1:
                            index.switchYear();
                            break;
                        case 2:
                            index.switchMonth();
                            break;
                        case 3:
                            index.switchDay();
                            break;
                        case 4:
                            index.switchCountry();
                            break;
                        case 5:
                            index.switchProvince();
                            break;
                        case 6:
                            index.switchCity();
                            break;
                        case 8:
                            index.switchSeaCountry()
                    }
                    return
                }
                index.listIndex[a] < t.length - 1 && (index.listIndex[a] >= 0 && (t[index.listIndex[a]].className = ""), t[index.listIndex[a] + 1].className = "hover", a < 4 && a > 0 && (n.scrollTop = index.listIndex[a] > 5 ? 20 * (index.listIndex[a] - 5) : 0), a >= 4 && (n.scrollTop = index.listIndex[a] > 8 ? 20 * (index.listIndex[a] - 8) : 0), index.listIndex[a]++);
                break;
            case index.keyCode.ENTER:
                if (i.stopPropagation(), i.preventDefault(), index.listIndex[a] < 0 || !t[index.listIndex[a]]) return;
                var d = t[index.listIndex[a]].innerHTML;
                switch (d = $.html.decode(d), index.selectHasSelected[a] = !0, a) {
                    case 0:
                        e.innerHTML = $.html.encode(d);
                        var o = index.birthType;
                        index.birthType = t[index.listIndex[a]].getAttribute("value"),
                        o != index.birthType && (index.updateShowdDate(), index.changeYear(), index.changeMonth(), index.changeDay(), index.showBirthdayInfo()),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            index.hideBirtydayType();
                        break;
                    case 1:
                        e.value = d;
                        var r = index.year;
                        index.year = t[index.listIndex[a]].getAttribute("value"),
                            index.showDate.year = index.year,
                        r != index.year && (index.changeMonth(), index.changeDay(), index.showBirthdayInfo()),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            index.hideYear();
                        break;
                    case 2:
                        e.value = d;
                        var s = index.month;
                        index.month = t[index.listIndex[a]].getAttribute("value"),
                            index.isLeap = t[index.listIndex[a]].getAttribute("isLeap") ? t[index.listIndex[a]].getAttribute("isLeap") : 1,
                            index.showDate.month = index.month,
                            index.showDate.isLeap = 1 != index.isLeap,
                        s != index.month && (index.changeDay(), index.showBirthdayInfo()),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            index.hideMonth();
                        break;
                    case 3:
                        e.value = d;
                        var c = index.day;
                        index.day = t[index.listIndex[a]].getAttribute("value"),
                            index.showDate.day = index.day,
                        c != index.day && index.showBirthdayInfo(),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            index.hideDay();
                        break;
                    case 4:
                        e.value = d;
                        var l = index.country;
                        index.country = t[index.listIndex[a]].getAttribute("value"),
                        l != index.country && (index.changeProvince(), index.changeCity()),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            d.length > 6 ? (e.title = d, e.value = index.isEnglishWord(d) ? d.substring(0, 12) : d.substring(0, 6)) : e.title = "",
                            index.hideCountry();
                        break;
                    case 5:
                        e.value = d;
                        var x = index.province;
                        index.province = t[index.listIndex[a]].getAttribute("value"),
                        x != index.province && index.changeCity(),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            d.length > 6 ? (e.title = d, e.value = index.isEnglishWord(d) ? d.substring(0, 12) : d.substring(0, 6)) : e.title = "",
                            index.hideProvince();
                        break;
                    case 6:
                        e.value = d,
                            index.city = t[index.listIndex[a]].getAttribute("value"),
                            index.updateSelectListIndex(a, index.listIndex[a]),
                            d.length > 6 ? (e.title = d, e.value = index.isEnglishWord(d) ? d.substring(0, 12) : d.substring(0, 6)) : e.title = "",
                            index.hideCity();
                        break;
                    case 7:
                        e.value = d;
                        try {
                            $("nick").focus()
                        } catch (i) {
                        }
                        $.css.addClass(n, "hide");
                        break;
                    case 8:
                        e.value = d;
                        t[index.listIndex[a]].getAttribute("code");
                        index.updateSelectListIndex(a, index.listIndex[a])
                }
                break;
            case index.keyCode.TAB:
                switch (a) {
                    case 0:
                        index.hideBirtydayType();
                        break;
                    case 1:
                        index.hideYear();
                        break;
                    case 2:
                        index.hideMonth();
                        break;
                    case 3:
                        index.hideDay();
                        break;
                    case 4:
                        index.hideCountry();
                        break;
                    case 5:
                        index.hideProvince();
                        break;
                    case 6:
                        index.hideCity();
                        break;
                    case 7:
                        $.css.addClass(n, "hide");
                        break;
                    case 8:
                }
        }
        return !1
    },
    isChangingTab: function () {
        return $("nav_1").getAttribute("_hover") || $("nav_2").getAttribute("_hover") || $("nav_3") && $("nav_3").getAttribute("_hover") || $("email_info").getAttribute("_hover") || $("nick_info").getAttribute("_hover") || $("phone_info").getAttribute("_hover")
    },
    iptFocus: function (e) {
        try {
            var n = $(e);
            n.focus(),
                n.select()
        } catch (i) {
        }
    },
    mailRegReport: function (e) {
        2 == index.type && ($.report.monitor("otherMailReg"), index.otherMailRegReport = !0),
        1 == index.type && ($.report.monitor("QQMailReg"), index.QQMailRegReport = !0)
    },
    phoneRegReport: function () {
        index.phoneRegFlag || ($.report.monitor("phoneReg"), index.phoneRegFlag = !0)
    },
    numRegReport: function () {
        index.numRegFlag || ($.report.monitor("numReg"), index.numRegFlag = !0)
    },
    changeInit: function () {
        $.http.get(index.getInitUrl(), null,
            function (e) {
                index.initInfo = e,
                    index.showCodeByElevel(e.elevel),
                    index.codeVerified = !1,
                    $("code").disabled = !1,
                    $("code").value = "",
                    index.showError("code", "")
            })
    },
    getSessionMachineCookie: function () {
        var e = 0,
            n = $.cookie.get("sessionCookie"),
            i = $.cookie.get("machineCookie");
        return n || (e = 1),
        i || (e = 2),
            e
    },
    getParam: function () {
        var e = decodeURIComponent($.winName.get("param"));
        if (!e || e.length < 1) return $.report.monitor("no_param"),
            window.location.href = "error.html?ec=no",
            !1;
        var n = null;
        try {
            n = JSON.parse(e)
        } catch (i) {
        }
        return "object" == typeof n && null != n || ($.report.monitor("no_param"), window.location.href = "error.html?ec=no"),
            n
    },
    setParam: function (e) {
        $.winName.set("param", e)
    },
    initTab: function (e) {
        var n = $.bom.query("type");
        1 == g_lang && 3 == n ? (index.initIndexType = 3, $.report.monitor("phone_count"), index.initTab.hasInit = !0) : 1 == g_lang && 2 == n && (index.initIndexType = 2, $.report.monitor("email_count"), index.initTab.hasInit = !0)
    },
    phone_to: function (e) {
        1 != g_lang || 3 != index.initIndexType || index.phone_to.report || (index.phone_to.report = !0, $.report.monitor(e))
    },
    email_to: function (e) {
        1 != g_lang || 2 != index.initIndexType || index.email_to.report || (index.email_to.report = !0, $.report.monitor(e))
    },
    number_to: function (e) {
        1 != g_lang || 0 != index.initIndexType || index.number_to.report || (index.number_to.report = !0, $.report.monitor(e))
    },
    hideHaomaBox: function () {
        $.report.monitor("a_cover_close"),
            $("haomaBox").style.display = "none",
            $("cover").style.display = "none",
            $.report.monitor("a_p_pv");
        var e = $.cookie.get("isCloseEnter") || 0;
        e++,
            $.cookie.set("isCloseEnter", e, "zc.qq.com", "/", 24)
    },
    initGoodNum: function () {
        $.cookie.set("hmenter", "a", "zc.qq.com", "/", 17521);
        var e = $.cookie.get("hmenter");
        $.cookie.get("isCloseEnter");
        if ("" == e) {
            Math.random();
            index.huodongEnter = "c",
                $.cookie.set("hmenter", "c", "zc.qq.com", "/", 17520)
        }
        index.huodongEnter = "c",
            $.e.add($("old_reg"), "click",
                function () {
                    $.report.monitor("l_phone_has_join"),
                        $.report.monitor("b_p_pv"),
                        $("enterA").style.display = "block",
                        $("enterB").style.display = "none"
                })
    },
    reportBanner: function () {
        0 == index.type && $.report.monitor(index.huodongEnter + "_p_banner"),
        2 == index.type && $.report.monitor(index.huodongEnter + "_p_mail_banner"),
        3 == index.type && $.report.monitor(index.huodongEnter + "_p_phone_banner")
    },
    init: function () {
        function e() {
            $("phone_num").value.length ? $.css.show($("phone_del")) : $.css.hide($("phone_del"))
        }

        function n(e, n) {
            var i, a = e.clientHeight;
            !
                function t() {
                    i = e.clientHeight,
                    a != i && n(),
                        a = i,
                    e.onElementHeightChangeTimer && clearTimeout(e.onElementHeightChangeTimer),
                        e.onElementHeightChangeTimer = setTimeout(t, 200)
                }()
        }

        if (index.current_error_dom = "init_begin", !index.inited) {
            "chs" == $GLOBALS.lang && index.initGoodNum(),
                $.cookie.del("param"),
                index.initTab(10),
                index.setFromId(),
                index.setCloseAppId(),
                $("other_email").value = "",
                $("self_email").value = "",
                $("nick").value = "",
                $("code").value = "";
            var i = $.winName.get("type");
            index.type = "" == i ? index.initIndexType : i,
                index.type = 1 == index.type || 2 == index.type ? 2 : index.type;
            var a = $.bom.query("type");
            a && (index.type = a),
                index.changeTab(index.type),
                index.initIndexType = index.type,
                1 == g_lang && 0 == index.initIndexType ? (index.initIndexType = 0, "chs" == $GLOBALS.lang && $.report.monitor(index.huodongEnter + "_p_pv"), $.report.monitor("number_count")) : 1 != g_lang || 2 != index.initIndexType || index.initTab.hasInit ? 1 != g_lang || 3 != index.initIndexType || index.initTab.hasInit || ($.report.monitor("phone_count"), "chs" == $GLOBALS.lang && $.report.monitor(index.huodongEnter + "_p_phone_pv")) : ("chs" == $GLOBALS.lang && $.report.monitor(index.huodongEnter + "_p_mail_pv"), $.report.monitor("email_count")),
                $.http.get(index.getInitUrl(), {
                        cookieCode: index.getSessionMachineCookie()
                    },
                    function (e) {
                        index.current_error_dom = "init_cgi_begin",
                            index.initInfo = e,
                            index.country = e.countryid ? e.countryid : index.initAddress[0],
                            index.province = e.provinceid ? e.provinceid : index.initAddress[2],
                            index.city = e.cityid ? e.cityid : index.initAddress[4],
                            $("country_value").value = e.country ? e.country : index.initAddress[1],
                            $("province_value").value = e.province ? e.province : index.initAddress[3],
                            $("city_value").value = e.city ? e.city : index.initAddress[5],
                            index.showCodeByElevel(e.elevel),
                            index.captType = parseInt(e.elevel / 10),
                            index.captLevel = e.elevel % 10,
                            $.http.jsonp(__("_js_host_dir", "") + "js/" + __("_js_version", "") + "/location_" + $GLOBALS.lang + ".js"),
                            $.http.loadScript(__("_js_host_dir", "") + "js/" + __("_js_version", "") + "/calendar.js",
                                function () {
                                    index.current_error_dom = "load_birthday_begin",
                                        index.initMaxDate(),
                                        index.initBirthday(),
                                        index.current_error_dom = "load_birthday_end";
                                    var e = $.winName.get("phonereg_fillvalues");
                                    if (1 == e) {
                                        var n = index.getParam();
                                        index.setBirthday(n),
                                        index.locationSet && index.birthdaySet && $.winName.set("phonereg_fillvalues", 0)
                                    }
                                }),
                            window.setTimeout(function () {
                                    $.http.jsonp(index.aq_js)
                                },
                                3e3),
                        $.cookie.get("sessionCookie") || $.report.monitor("no_sessionCookie"),
                        navigator.cookieEnabled || $.report.monitor("cookie_disable"),
                            index.current_error_dom = "init_cgi_end"
                    }),
                index.current_error_dom = "init_bindEvent_start",
                $.e.add($("other_email"), "focus",
                    function (e) {
                        index.clearAq(),
                            index.current_error_dom = "other_email",
                            $("other_email_bg").className = "bg_txt bg_focus",
                        this.value == index.otherEmail && "" != this.value || index.showTip("email_info", index.otherEmailE[4])
                    }),
                $.e.add($("other_email"), "keyup",
                    function (e) {
                        var n = this.value,
                            i = e.keyCode;
                        i != index.keyCode.UP && i != index.keyCode.DOWN && i != index.keyCode.ENTER && i != index.keyCode.TAB && i != index.keyCode.F5 && index.createEmailTips(n);
                        return /^[^a-z0-9]/i.test(n) ? void index.showTip("email_info", index.otherEmailE[2]) : void index.showTip("email_info", index.otherEmailE[4])
                    }),
                $.e.add($("other_email"), "blur",
                    function (e) {
                        $("other_email_bg").className = "bg_txt",
                        index.isChangingTab() || index.chkOtherEMail(),
                            index.reportAq(this),
                        index.showNewVCode() && index.initNewVCodeParam()
                    }),
                $.e.add($("other_email"), "keydown",
                    function (e) {
                        var n = e.keyCode;
                        index.addAq(this.id, n)
                    }),
                $.e.add($("self_email"), "focus",
                    function (e) {
                        index.clearAq(),
                            index.current_error_dom = "self_email",
                            this.className = "txt focus",
                        this.value == index.selfEmail && "" != this.value || index.showTip("email_info", index.selfEmailE[4])
                    }),
                $.e.add($("self_email"), "keyup",
                    function (e) {
                        var n = this.value;
                        return /^[^a-z]+/i.test(n) ? void index.showTip("email_info", index.selfEmailE[2]) : /[^a-z0-9_.-]/i.test(n) ? void index.showTip("email_info", index.selfEmailE[4]) : /[._-]{2,}/.test(n) ? void index.showTip("email_info", index.selfEmailE[5]) : /[^a-z0-9]+$/i.test(n) ? void index.showTip("email_info", index.selfEmailE[6]) : void index.showTip("email_info", index.selfEmailE[4])
                    }),
                $.e.add($("self_email"), "keydown",
                    function (e) {
                        var n = e.keyCode;
                        index.addAq(this.id, n)
                    }),
                $.e.add($("self_email"), "blur",
                    function (e) {
                        this.className = "txt",
                        index.isChangingTab() || index.chkSelfEMail(),
                            index.reportAq(this)
                    }),
                $.e.add($("phone_info"), "mouseover",
                    function () {
                        this.setAttribute("_hover", "over")
                    }),
                $.e.add($("phone_info"), "mouseout",
                    function () {
                        this.removeAttribute("_hover")
                    }),
                $.e.add($("nick_info"), "mouseover",
                    function () {
                        this.setAttribute("_hover", "over")
                    }),
                $.e.add($("nick_info"), "mouseout",
                    function () {
                        this.removeAttribute("_hover")
                    }),
                $.e.add($("phone_del"), "click",
                    function (n) {
                        $("phone_num").value = "",
                            index.phoneSubmit = "",
                            e(),
                            setTimeout(function () {
                                    index.hideInfo("phone_info"),
                                        $("phone_num_bg").className = "bg_txt"
                                },
                                0)
                    }),
                $.e.add($("phone_num"), "focus",
                    function (e) {
                        index.clearAq(),
                            index.current_error_dom = "phone_num",
                            $("phone_num_bg").className = "bg_txt bg_focus",
                        26 != index.ec_res && $.css.show($("sms_box"))
                    }),
                $.e.add($("phone_num"), "keydown",
                    function (n) {
                        $("phone_num_placeholder") && ($("phone_num_placeholder").className = "hide");
                        var i = n.keyCode;
                        index.addAq(this.id, i),
                            e()
                    }),
                $.e.add($("phone_num"), "keyup",
                    function (n) {
                        if ("" == this.value && $("phone_num_placeholder") && ($("phone_num_placeholder").className = "phone_num_placeholder"), 13 === n.keyCode) {
                            if (n.stopPropagation(), !index.chkPhoneNum()) return !1;
                            index.clickGetverima()
                        }
                        e()
                    }),
                $.e.add($("phone_num"), "blur",
                    function (e) {
                        $("phone_num_bg").className = "bg_txt",
                        index.isChangingTab() || index.chkPhoneNum(),
                            index.reportAq(this)
                    }),
                $.e.add($("verima"), "focus",
                    function (e) {
                        $("verima_bg").className = "bg_txt bg_focus"
                    }),
                $.e.add($("getverima"), "click",
                    function (e) {
                        index.clickGetverima(),
                            e.stopPropagation(),
                        /^00/.test(index.phoneSubmit) && $.report.monitor("sea_phone_pv"),
                            $.report.monitor("index_get_vcode_btn")
                    }),
                $.e.add($("selfType"), "focus",
                    function (e) {
                        index.current_error_dom = "selfType",
                            $.css.addClass(this, "focus")
                    }),
                $.e.add($("selfType"), "blur",
                    function (e) {
                        $.css.removeClass(this, "focus")
                    }),
                $.e.add($("selfType"), "click",
                    function (e) {
                        e.stopPropagation(),
                            index.switchType()
                    }),
                $.e.add($("selfType0"), "click",
                    function (e) {
                        index.selfType = 0,
                            $("selfType").innerHTML = "@qq.com",
                            index.hideType()
                    }),
                $.e.add($("selfType1"), "click",
                    function (e) {
                        index.selfType = 1,
                            $("selfType").innerHTML = "@foxmail.com",
                            index.hideType()
                    }),
                $.e.add($("selfType0"), "mousemove",
                    function (e) {
                        this.className = "hover",
                            $("selfType1").className = "",
                            e.stopPropagation()
                    }),
                $.e.add($("selfType0"), "mouseout",
                    function (e) {
                        this.className = "",
                            e.stopPropagation()
                    }),
                $.e.add($("selfType1"), "mousemove",
                    function (e) {
                        this.className = "hover",
                            $("selfType0").className = "",
                            e.stopPropagation()
                    }),
                $.e.add($("selfType1"), "mouseout",
                    function (e) {
                        this.className = "",
                            e.stopPropagation()
                    }),
                $.e.add("selfType", "keydown",
                    function (e) {
                        e.stopPropagation();
                        $("selfTypeBox");
                        index.moveList(this, $("selfTypeBox"), e)
                    }),
                $.e.add($("password"), "paste",
                    function (e) {
                        return e.preventDefault(),
                            !1
                    }),
                $.e.add($("password_again"), "paste",
                    function (e) {
                        return e.preventDefault(),
                            !1
                    }),
                $.e.add($("nick"), "focus",
                    function (e) {
                        index.current_error_dom = "nick_focus_start",
                            index.clearAq(),
                            $("nick_bg").className = "bg_txt bg_focus",
                        0 == index.type && 1 == g_lang && index.showTip("nick_info", index.nickE[2]),
                            index.current_error_dom = "nick_focus_end"
                    }),
                $.e.add($("nick"), "blur",
                    function (e) {
                        if (index.current_error_dom = "nick_blur_start", $("nick_bg").className = "bg_txt", !index.isChangingTab()) {
                            index.hideInfo("nick_info");
                            var n = index.chkNick();
                            if (n) {
                                var i = indexType2RegType(index.type);
                                index.ajaxChkNick($("nick").value, i)
                            }
                        }
                        index.showNewVCode() && index.initNewVCodeParam(),
                            index.reportAq(this),
                            index.current_error_dom = "nick_blur_end"
                    }),
                $.e.add($("nick"), "keyup",
                    function (e) {
                        index.current_error_dom = "nick_keyup_start";
                        var n = this.value;
                        "" == n ? index.showTip("nick_info", index.nickE[2]) : "" == n.trim() ? index.showTip("nick_info", index.nickE[1]) : $.str.getBytes(n) > 24 || index.nickExceed ? ($("nick_info").className = "error", $("nick_info").innerHTML = index.nickE[4]) : index.showTip("nick_info", index.nickE[2]);
                        var e = e || window.event,
                            i = e.keyCode;
                        index.setCode(i, 0),
                            index.current_error_dom = "nick_keyup_end"
                    }),
                $.e.add($("nick"), "keydown",
                    function (e) {
                        index.current_error_dom = "nick_keydown_start";
                        var n = this.value,
                            i = e.keyCode;
                        24 == $.str.getBytes(n) && i != index.keyCode.DEL && i != index.keyCode.BACK ? index.nickExceed = !0 : index.nickExceed = !1,
                            index.addAq(this.id, i),
                            index.current_error_dom = "nick_keydown_end"
                    }),
                $.e.add($("password"), "focus",
                    function (e) {
                        index.current_error_dom = "password_focus_start",
                            index.clearAq(),
                            index.chkNick(),
                            $("password_bg").className = "bg_txt bg_focus",
                            index.hidePwRank(),
                            index.pwdTime = new Date,
                        index.showNewVCode() && index.initNewVCodeParam(),
                            index.current_error_dom = "password_focus_end"
                    }),
                $.e.add($("password"), "blur",
                    function (e) {
                        index.current_error_dom = "password_blur_start",
                            index.getPwdTips($("password").value),
                            $("password_bg").className = "bg_txt",
                            index.pwd_valid ? index.showPwRank() : (index.hidePwRank(), $("password_bg").className = "bg_error"),
                            index.pwdTimeArray[0] += new Date - index.pwdTime,
                            index.reportAq(this),
                            index.current_error_dom = "password_blur_end"
                    }),
                $.e.add($("password"), "keydown",
                    function (e) {
                        index.addAq(this.id, 56)
                    }),
                $.e.add($("password"), "keyup",
                    function (e) {
                        index.getPwdTips($("password").value);
                        var e = e || window.event,
                            n = e.keyCode;
                        index.setCode(n, 2),
                            index.pwdNum++
                    }),
                $.e.add($("password_again"), "focus",
                    function (e) {
                        index.clearAq(),
                            index.current_error_dom = "password_again",
                            $("password_again_bg").className = "bg_txt bg_focus",
                            index.chkNick(),
                            index.chkPassword(),
                        (this.value || this.value !== $("password").value) && index.showTip("password_again_info", index.passAgainE[1])
                    }),
                $.e.add($("password_again"), "blur",
                    function (e) {
                        $("password_again_bg").className = "bg_txt",
                            index.chkPasswordAgain(),
                            e.stopPropagation(),
                            index.reportAq(this)
                    }),
                $.e.add($("password_again"), "keyup",
                    function (e) {
                        var e = e || window.event,
                            n = e.keyCode;
                        return index.setCode(n, 4),
                            this.value || this.value !== $("password").value ? void(0 !== $("password").value.indexOf(this.value) && this.value ? (index.showTip("password_again_info", index.passAgainE[0]), $("password_again_info").className = "error") : index.showTip("password_again_info", index.passAgainE[1])) : ($("password_again_info").className = "ok", void($("password_again_info").innerHTML = ""))
                    }),
                $.e.add($("password_again"), "keydown",
                    function (e) {
                        index.addAq(this.id, 56)
                    }),
                $.e.add($("sex_1"), "click",
                    function (e) {
                        index.sex = 1,
                            $("sex_1").className = "checked_focus",
                            $("sex_2").className = "",
                            index.chkNick(),
                            index.chkPassword(),
                            index.chkPasswordAgain(),
                            index.chkSex()
                    }),
                $.e.add($("sex_2"), "click",
                    function (e) {
                        index.sex = 2,
                            $("sex_1").className = "",
                            $("sex_2").className = "checked_focus",
                            index.chkNick(),
                            index.chkPassword(),
                            index.chkPasswordAgain(),
                            index.chkSex()
                    }),
                $.e.add($("sex_1"), "keydown",
                    function (e) {
                        switch (e.keyCode) {
                            case index.keyCode.ENTER:
                                index.sex = 1,
                                    $("sex_1").className = "checked_focus",
                                    $("sex_2").className = "",
                                    index.chkNick(),
                                    index.chkPassword(),
                                    index.chkPasswordAgain(),
                                    index.chkSex(),
                                    e.stopPropagation(),
                                    e.preventDefault()
                        }
                        var n = e.keyCode;
                        index.addAq(this.id, n)
                    }),
                $.e.add($("sex_2"), "keydown",
                    function (e) {
                        switch (e.keyCode) {
                            case index.keyCode.ENTER:
                                index.sex = 2,
                                    $("sex_2").className = "checked_focus",
                                    $("sex_1").className = "",
                                    index.chkNick(),
                                    index.chkPassword(),
                                    index.chkPasswordAgain(),
                                    index.chkSex(),
                                    e.stopPropagation(),
                                    e.preventDefault()
                        }
                        var n = e.keyCode;
                        index.addAq(this.id, n)
                    }),
                $.e.add($("sex_1"), "focus",
                    function (e) {
                        index.clearAq(),
                            index.current_error_dom = "sex_1",
                            1 == index.sex ? $("sex_1").className = "checked_focus" : $("sex_1").className = "unchecked_focus"
                    }),
                $.e.add($("sex_1"), "blur",
                    function (e) {
                        1 == index.sex ? $("sex_1").className = "checked" : $("sex_1").className = "unchecked",
                            index.reportAq(this)
                    }),
                $.e.add($("sex_2"), "focus",
                    function (e) {
                        index.clearAq(),
                            index.current_error_dom = "sex_2",
                            2 == index.sex ? $("sex_2").className = "checked_focus" : $("sex_2").className = "unchecked_focus";
                    }),
                $.e.add($("sex_2"), "blur",
                    function (e) {
                        2 == index.sex ? $("sex_2").className = "checked" : $("sex_2").className = "unchecked",
                            index.reportAq(this)
                    }),
                !1 === index.showNewVCode() ? ($.e.add($("code"), "focus",
                    function (e) {
                        index.current_error_dom = "code_focus_start",
                            index.clearAq(),
                            index.chkNick(),
                            index.chkPassword(),
                            index.chkPasswordAgain(),
                            index.chkSex(),
                            index.chkBirthday(),
                            index.chkArea(),
                            this.className = "code_ipt focus",
                            index.showError("code", index.codeE[1]),
                            index.current_error_dom = "code_focus_end"
                    }), $.e.add($("code"), "blur",
                    function (e) {
                        index.current_error_dom = "code_blur_start",
                            this.className = "code_ipt",
                            index.checkSafe(),
                            index.reportAq(this),
                            index.current_error_dom = "code_blur_end"
                    }), $.e.add($("code"), "keyup",
                    function (e) {
                        index.current_error_dom = "code_keyup_start",
                            this.className = "code_ipt",
                        4 == this.value.length && index.checkSafe(),
                            index.reportAq(this),
                            index.current_error_dom = "code_keyup_end"
                    }), $.e.add($("code"), "keydown",
                    function (e) {
                        index.current_error_dom = "code_keydown_start",
                            index.showError("code", "");
                        var n = e.keyCode;
                        index.addAq(this.id, n),
                            index.current_error_dom = "code_keydown_end"
                    })) : 2 == index.type && 1 == g_lang && capInit($("capt"), index.capCB),
            g.component.qzone && ($.e.add($("qzone"), "click",
                function (e) {
                    index.qzone = !index.qzone,
                        this.className = index.qzone ? "checked_focus" : "unchecked_focus",
                        index.qzone ? index.showItem(2) : index.hideItem(2)
                }), $.e.add($("qzone"), "keydown",
                function (e) {
                    e.keyCode == index.keyCode.ENTER && (index.qzone = !index.qzone, this.className = index.qzone ? "checked_focus" : "unchecked_focus", index.qzone ? index.showItem(2) : index.hideItem(2), e.stopPropagation(), e.preventDefault())
                }), $.e.add($("qzone"), "focus",
                function (e) {
                    index.current_error_dom = "qzone",
                        this.className = index.qzone ? "checked_focus" : "unchecked_focus"
                }), $.e.add($("qzone"), "blur",
                function (e) {
                    this.className = index.qzone ? "checked" : "unchecked"
                })),
                $.e.add($("nav_1"), "click",
                    function (e) {
                        index.needShowError[2] = 0,
                            index.changeTab(0),
                            index.changeInit(),
                            index.numRegReport(),
                            index.phone_to("phone_to_number"),
                            index.email_to("email_to_number"),
                        "chs" == $GLOBALS.lang && (index.initGoodNum(), "undefined" != typeof capObj && index.capRefreshCtrl())
                    }),
                $.e.add($("nav_2"), "click",
                    function (e) {
                        index.needShowError[0] = 0,
                            index.changeTab(2),
                            index.changeInit(),
                            index.mailRegReport(2),
                            index.phone_to("phone_to_mail"),
                            index.number_to("number_to_mail"),
                        "chs" == $GLOBALS.lang && ($("enterA").style.display = "block", $("enterB").style.display = "none", "undefined" != typeof capObj && index.capRefreshCtrl())
                    }),
            $("nav_3") && $.e.add($("nav_3"), "click",
                function (e) {
                    index.changeTab(3),
                        $("sea_phone").style.display = "none",
                        index.isSeaPhone = !1,
                        index.initPhoneArea(),
                        index.changeInit(),
                        index.phoneRegReport(),
                        index.email_to("email_to_phone"),
                        index.number_to("number_to_phone"),
                    "chs" == $GLOBALS.lang && ($("enterA").style.display = "block", $("enterB").style.display = "none", "undefined" != typeof capObj && index.capRefreshCtrl())
                }),
                $.e.add($("agree"), "click",
                    function (e) {
                        index.agreed = !index.agreed,
                            this.className = index.agreed ? "a_1 checked_focus" : "a_1 unchecked_focus";
                        var n = $("submit");
                        index.agreed ? (n.className = "", n.disabled = "", n.title = index.submitE[1]) : (n.className = "disabled", n.disabled = "disabled", n.title = index.submitE[0])
                    }),
                $.e.add($("agree"), "keydown",
                    function (e) {
                        if (e.keyCode == index.keyCode.ENTER) {
                            index.agreed = !index.agreed,
                                this.className = index.agreed ? "a_1 checked_focus" : "a_1 unchecked_focus";
                            var n = $("submit");
                            index.agreed ? (n.className = "", n.disabled = "", n.title = index.submitE[1]) : (n.className = "disabled", n.disabled = "disabled", n.title = index.submitE[0]),
                                e.stopPropagation(),
                                e.preventDefault()
                        }
                    }),
                $.e.add($("agree"), "focus",
                    function (e) {
                        index.current_error_dom = "agree",
                            this.className = index.agreed ? "a_1 checked_focus" : "a_1 unchecked_focus"
                    }),
                $.e.add($("agree"), "blur",
                    function (e) {
                        this.className = index.agreed ? "a_1 checked" : "a_1 unchecked"
                    }),
                $.e.add($("x_switcher"), "click",
                    function (e) {
                        index.switchProvision(e)
                    }),
                $.e.add(document.body, "click",
                    function (e) {
                        index.hideProvision(),
                            index.hideCountry(),
                            index.hideProvince(),
                            index.hideCity(),
                            index.hideType(),
                            index.hideBirtydayType(),
                            index.hideYear(),
                            index.hideMonth(),
                            index.hideDay(),
                            index.hideEmailTips()
                    }),
                $.e.add($("email_code_ipt"), "keydown",
                    function () {
                        index.current_error_dom = "display_1",
                            $("email_code_ipt_err").innerHTML = "",
                            $("email_code_ipt_err").style.display = "none"
                    }),
                $.e.add($("email_code_ipt"), "blur",
                    function () {
                        index.chkEmailCode()
                    }),
                window.setTimeout(index.reportSource, 300),
                $.e.add($("email_1"), "click",
                    function () {
                        index.changeInit()
                    }),
                $.e.add($("email_2"), "click",
                    function () {
                        index.changeInit()
                    }),
            $.css.hasClass($("nav_1"), "cur") && index.numRegReport(),
                $.e.add($("email_info"), "click",
                    function () {
                        index.changeMethod(1)
                    }),
                $.e.add($("email_info"), "mouseover",
                    function () {
                        this.setAttribute("_hover", "over")
                    }),
                $.e.add($("email_info"), "mouseout",
                    function () {
                        this.removeAttribute("_hover")
                    }),
            "chs" == $GLOBALS.lang && $.e.add("haomaBox", "click",
                function () {
                    window.location.href = "/chs/new.html",
                        $.report.monitor("l_enter_a_click")
                }),
                index.current_error_dom = "init_bindEvent_end",
                0 == index.type ? ($("email_box").className = "hide", index.iptFocus("nick")) : 3 == index.type ? ($("email_box").className = "hide", index.iptFocus("phone_num"), index.phoneRegReport(3), $("phone_num_bg").className = "bg_txt bg_focus", index.showTip("phone_info", index.phoneE[0])) : 2 == index.type ? (index.changeMethod(2), $("email_box").className = "", index.iptFocus("other_email"), index.mailRegReport(2)) : (index.changeMethod(1), $("email_box").className = "", index.iptFocus("self_email"), index.mailRegReport(1)),
                index.inited = !0,
                index.bindEmailTipsEvent(),
                index.bindInputSearchEvent(),
                index.bind_sea_phone_event();
            try {
                if (external.SetSize && (document.body.style.backgroundImage = "none", $("hbg").style.backgroundImage = "none", $("hheader").style.display = "none", $("lleft").style.display = "none", $("ffooter").style.display = "none", $("phone_quick").style.display = "none", $("enterBanner").style.display = "none", $("rright").style.background = "none", $("rright").style.border = "none", $("rright").style.paddingBottom = "0px", $("rright").style.minHeight = "0px", $("hmtitle").style.display = "none", $("haoma-inner").style.marginTop = "20px", $("enterA").style.paddingTop = "20px", document.documentElement.style.overflow = "hidden", document.getElementsByClassName("container")[0].style.background = "none", document.body.style.overflow = "hidden", document.body.scroll = "no", n(document.body,
                        function () {
                            external.SetSize(746, document.body.clientHeight)
                        }), !external.SetSize(746, document.body.clientHeight))) try {
                    $("nick").focus(),
                        $("nick").select()
                } catch (t) {
                }
            } catch (t) {
            }
            if (1 === parseInt($.bom.query("hide_ad")) || /ipad/i.test(navigator.userAgent) || /Mac OS/i.test(navigator.userAgent)) {
                var d = $("search");
                $.css.hide(d);
                var o = $("enterBanner");
                o && $.css.hide(o);
                var r = $("hmtitle");
                r && $.css.hide(r)
            }
            index.current_error_dom = "init_end"
        }
    },
    chkSex: function () {
        $("sex_info").className = "info"
    },
    preCheckOtherEmail: function () {
        function e(e) {
            $("email_info").className = "error",
                $("other_email_bg").className = "bg_error",
                $("email_info").innerHTML = index.otherEmailE[e]
        }

        var n = $("other_email").value;
        return n ? index.emailReg.test(n) ? /[\.@]foxmail.com$/i.test(n) ? (e(5), !1) : !/[\.@]qq.com$/i.test(n) || (e(6), !1) : (e(2), !1) : (e(0), !1)
    },
    chkEmailCode: function () {
        var e = $("email_code_ipt").value;
        if (index.current_error_dom = "display_2", "" == e) $("email_code_ipt_err").innerHTML = index.codeE[3],
            $("email_code_ipt_err").style.display = "inline-block";
        else {
            if (!(e.length < 4)) return $("email_code_ipt_err").innerHTML = "",
                $("email_code_ipt_err").style.display = "none",
                e;
            $("email_code_ipt_err").innerHTML = index.codeE[2],
                $("email_code_ipt_err").style.display = "inline-block"
        }
        return !1
    },
    ajaxChkEmail: function (e, n, i) {
        if (!e) {
            var a = index.chkEmailCode();
            if (!a) {
                try {
                    $("email_code_ipt").select(),
                        $("email_code_ipt").focus()
                } catch (t) {
                }
                return
            }
            e = index.ajaxChkEmail.url + "&verifycode=" + a,
                n = index.ajaxChkEmail.isOther,
                i = index.ajaxChkEmail.str
        }
        $.get(e, null,
            function (a) {
                switch (index.hideEmailCode.needChange = !1, a.ec) {
                    case 0:
                        $("email_info").className = "ok",
                            $("email_info").innerHTML = 1 == index.type ? index.otherEmailE[3] : "",
                            n ? (index.otherEmail = i, $("other_email_bg").className = "bg_txt") : (index.selfEmail = i, $("self_email").className = "txt"),
                            index.hideEmailCode();
                        break;
                    case 2:
                        $("email_code_img").src = index.codeUrl + "?r=" + Math.random();
                        try {
                            $("email_code_ipt").focus(),
                                $("email_code_ipt").select()
                        } catch (t) {
                        }
                        index.current_error_dom = "display_3",
                            $("email_code_ipt_err").innerHTML = index.codeE[0],
                            $("email_code_ipt_err").style.display = "inline-block",
                            index.hideEmailCode.needChange = !0;
                        break;
                    case 7:
                        $("email_info").className = "error",
                            $("email_info").innerHTML = index.otherEmailE[2],
                            index.hideEmailCode();
                        break;
                    case 8:
                    case 9:
                        $("email_info").className = "error",
                            $("email_info").innerHTML = index.otherEmailE[1],
                            n ? $("other_email_bg").className = "bg_error" : $("self_email").className = "self_email_bg_error",
                            index.pushAlreadyUsedEmails(i),
                            index.hideEmailCode();
                        break;
                    case 12:
                        index.showEmailCode(),
                            index.ajaxChkEmail.url = e,
                            index.ajaxChkEmail.isOther = n,
                            index.ajaxChkEmail.str = i;
                        break;
                    default:
                        $("email_info").className = "error",
                            $("email_info").innerHTML = index.otherEmailE[1],
                            index.hideEmailCode()
                }
                0 !== a.ec && (index.otherEmail = "", index.selfEmail = "")
            }),
            $("code_img").src = index.codeUrl + "&r=" + Math.random()
    },
    preCheckSelfEmail: function () {
        function e(e) {
            index.chkSelfEMail.id = e,
                $("email_info").className = "error",
                $("self_email").className = "self_email_bg_error",
                $("email_info").innerHTML = index.selfEmailE[index.chkSelfEMail.id]
        }

        var n = $("self_email").value;
        return n ? n.length < 3 ? (e(1), !1) : /^\d+$/.test(n) ? (e(2), !1) : /^[^a-z]+/i.test(n) ? (e(3), !1) : /[^a-z0-9_.-]/i.test(n) ? (e(4), !1) : /[._-]{2,}/.test(n) ? (e(5), !1) : /[^A-Za-z0-9]+$/.test(n) ? (e(6), !1) : !index.emailHasAlreadyUsed(n) || ($("email_info").className = "error", $("email_info").innerHTML = index.otherEmailE[1], !1) : (e(0), !1)
    },
    chkSelfEMail: function () {
        if (1 == index.type && index.preCheckSelfEmail()) {
            var e = $("self_email").value,
                n = index.host + index.selfChkUrl + "?email=" + e + (0 == index.selfType ? "@qq.com" : "@foxmail.com") + "&r=" + Math.random();
            index.ajaxChkEmail(n, !1, e)
        }
    },
    ajaxChkNick: function (e, n) {
        var i = encodeURIComponent(e),
            a = (0 == index.type && 1 == g_lang ? index.nickChkUrl_simpl_chs : index.nickChkUrl) + "?nick=" + i + "&regType=" + n + "&r=" + Math.random();
        $.get(a, null,
            function (n) {
                if (n) switch (n.ec) {
                    case 0:
                        $("nick_info").className = "ok",
                            $("nick_info").innerHTML = index.nickE[3],
                            index.checkNickMap[e] = 0;
                        break;
                    case 1:
                        break;
                    case 15:
                        $("nick_info").className = "error",
                            $("nick_info").innerHTML = index.nickE[5],
                            index.checkNickMap[e] = 1
                }
            })
    },
    chkNick: function () {
        var e = $("nick").value;
        return e ? e.trim() ? $.str.getBytes(e) > 24 ? ($("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[4], !1) : 1 === index.checkNickMap[e] ? ($("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[5], !1) : 0 !== index.checkNickMap[e] || ($("nick_info").className = "ok", $("nick_info").innerHTML = index.nickE[3], !0) : ($("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[1], !1) : ($("nick_info").className = "error", $("nick_bg").className = "bg_error", $("nick_info").innerHTML = index.nickE[0], !1)
    },
    ajaxChkPhone: function (e) {
        var e = encodeURIComponent(e),
            n = index.phoneChkUrl + "?telphone=" + e + "&r=" + Math.random();
        $.get(n, null,
            function (n) {
                if (n) switch (n.ec) {
                    case 0:
                        $("phone_info").className = "ok",
                            $("phone_num_bg").className = "bg_txt",
                            $("phone_info").innerHTML = "",
                            index.checkPhoneMap[e] = 0,
                            index.switchPhone(1e3);
                        break;
                    case 4:
                    case 31:
                        $("phone_info").className = "error",
                            $("phone_num_bg").className = "bg_error",
                            $("phone_info").innerHTML = index.phoneE[1],
                            index.checkPhoneMap[e] = 1;
                        break;
                    default:
                        index.checkPhoneMap[e] = 0,
                            index.switchPhone(1e3)
                }
            })
    },
    chkPhoneNum: function () {
        var e = $("phone_num").value,
            n = $.html.decode($("sea_country_input").value);
        return !!(n = n.match(/[\w\W]+(00[\d]+)/)) && (n = n[1], index.phoneArea = n, e && e.trim() || !(index.initInfo.elevel <= 1 || index.initInfo.elevel >= 10) ? ("0086" == index.phoneArea ? index.phoneSubmit = e : index.phoneSubmit = n + e, isRegValidPhone(index.phoneSubmit) ? 1 === index.checkPhoneMap[index.phoneSubmit] ? ($("phone_info").className = "error", $("phone_num_bg").className = "bg_error", $("phone_info").innerHTML = index.phoneE[1], !1) : 0 === index.checkPhoneMap[index.phoneSubmit] ? ($("phone_info").className = "ok", $("phone_num_bg").className = "bg_txt", $("phone_info").innerHTML = "", "undefined" == typeof index.countDownObj && index.switchPhone(1e3), !0) : (void 0 === index.checkPhoneMap[index.phoneSubmit] && index.ajaxChkPhone(index.phoneSubmit), !0) : ($("phone_info").className = "error", $("phone_num_bg").className = "bg_error", $("phone_info").innerHTML = index.phoneE[1], !1)) : (index.phoneSubmit = "", index.isNeedCapt = !0, !0))
    },
    isValidPhone: function () {
        return 0 === index.checkPhoneMap[index.phoneSubmit]
    },
    chkPassword: function () {
        return index.pwd_valid && index.showPwRank(),
            index.pwd_valid
    },
    getPwdTips: function (e) {
        var n = !0,
            i = !1;
        return "" == e ? ($("pwd_tip1").className = "default", $("pwd_tip2").className = "default", $("pwd_tip3").className = "default", n = !1) : (e.length >= index.minPwdLen && e.length <= index.maxPwdLen ? $("pwd_tip1").className = "yes" : ($("pwd_tip1").className = "no red", n = !1), /^\d{1,8}$/.test(e) ? ($("pwd_tip2").className = "no red", n = !1) : $("pwd_tip2").className = "yes", /\s/.test(e) ? ($("pwd_tip3").className = "no red", $("pwd_tip3").innerHTML = "不能包含空格", n = !1, i = !0) : $("pwd_tip3").className = "yes", index.checkNickAndPwd() ? (i || ($("pwd_tip3").className = "yes"), i = !1) : ($("pwd_tip3").className = "no red", $("pwd_tip3").innerHTML = "密码不能与名称相同", n = !1)),
            index.pwd_valid = n,
            n
    },
    chkPasswordAgain: function () {
        var e = $("password").value,
            n = $("password_again").value;
        return $("password_again_info").className = "error",
            n ? n !== e ? ($("password_again_info").innerHTML = index.passAgainE[0], $("password_again_bg").className = "bg_error", !1) : e.length <= index.maxPwdLen && e.length >= index.minPwdLen && !/^\d{1,8}$/.test(e) ? ($("password_again_info").className = "ok", $("password_again_info").innerHTML = "", index.chkPwdLevel(), !0) : (index.hideInfo("password_again_info"), index.chkPwdLevel(), !0) : ($("password_again_info").innerHTML = index.passAgainE[1], $("password_again_bg").className = "bg_error", !1)
    },
    chkPwdLevel: function () {
        if (!0 === index.isPwdChk || 0 != index.type || 1 != g_lang) return !0;
        var e = {
            nick: encodeURIComponent($("nick").value.trim()),
            sex: index.sex,
            isleap: index.isLeap,
            year: index.year,
            month: index.month,
            day: index.day,
            country: index.country,
            province: index.province,
            city: index.city,
            mobile: $("phone_num").value.trim(),
            regType: indexType2RegType(index.type)
        };
        $.post(index.chkPwdUrl, e,
            function (e) {
                if (e) switch (index.initInfo.elevel = e.elevel, e.ec) {
                    case 0:
                        index.captType = parseInt(e.elevel / 10),
                            index.captLevel = e.elevel % 10
                }
            }),
            index.isPwdChk = !0
    },
    chkOtherEMail: function () {
        if (2 == index.type && index.preCheckOtherEmail()) {
            var e = $("other_email").value,
                n = index.host + index.otherChkUrl + "?other_email=" + e + "&r=" + Math.random();
            index.ajaxChkEmail(n, !0, e)
        }
    },
    chkBirthday: function () {
        return "" == index.birthType || "" == index.year || "" == index.month || "" == index.day ? ($("birthday_info").className = "error", $("birthday_info").innerHTML = index.birthdayE[0], "" == index.year && ($("year_bg").className = "year_bg_error"), "" == index.month && ($("month_value").className = "month_day_bg_error"), "" == index.day && ($("day_value").className = "month_day_bg_error"), !1) : (index.showBirthdayInfo(), !0)
    },
    chkArea: function () {
        return index.country == index.noAreaStr ? ($("area_info").className = "error", $("area_info").innerHTML = index.areaE[0], !1) : "1" == index.country && index.province == index.noAreaStr ? ($("area_info").className = "error", $("area_info").innerHTML = index.areaE[0], !1) : ($("area_info").className = "ok", $("area_info").innerHTML = "", !0)
    },
    chkCode: function () {
        if (index.initInfo && ("1" == index.initInfo.elevel || "2" == index.initInfo.elevel) && (0 != index.type || 1 != g_lang)) {
            if (!0 === index.showNewVCode()) return index.verifyImgCodeCheck();
            var e = $("code").value;
            if (e.length < 4) return index.showError("code", index.codeE[e ? 2 : 3], !1),
                !1
        }
        return !0
    },
    chkAgree: function () {
        return index.agreed
    },
    changeCode: function (e) {
        $("code_img").src = index.codeUrl + "&r=" + Math.random(),
            $("code").value = "",
            index.codeVerified = !1,
            $("code").disabled = !1;
        try {
            e && $("code").focus()
        } catch (n) {
        }
        index.setCode(null, 6)
    },
    changeEmailCode: function () {
        $("email_code_img").src = index.codeUrl + "&r=" + Math.random(),
            $("email_code_ipt").value = "";
        try {
            $("email_code_ipt").focus()
        } catch (e) {
        }
    },
    hideInfo: function (e) {
        $.css.addClass($(e), "hidden")
    },
    showTip: function (e, n) {
        $(e).innerHTML = n,
            $(e).className = "tip"
    },
    changeTab: function (e) {
        switch ($.winName.set("type", e), index.type = e, $("email_box").className = 2 != e && 1 != e ? "hide" : "", $("switcher") && ($("switcher").className = 3 == e ? "hide" : "normal"), $("nav_1").className = 0 == e ? "nav_box cur" : "nav_box", $("nav_2").className = 1 == e || 2 == e ? "nav_box cur" : "nav_box", $("nav_3") && ($("nav_3").className = 3 == e ? "nav_box cur" : "nav_box"), g.component.qzone && ($("qzone_box").className = 2 != e && 1 != e ? "box box_10" : "hide"), e) {
            case 0:
                "chs" == $GLOBALS.lang && ("b" != index.huodongEnter && $.report.monitor(index.huodongEnter + "_p_pv"), $("haoma-inner").innerHTML = "注册帐号", $.css.show($("phone_box")), $.css.hide($("sms_box")), $.css.hide($("up_msg_err"))),
                    $.css.removeClass($("phone_quick"), "hidden"),
                    window.setTimeout(function () {
                            try {
                                $("nick").focus(),
                                    $("nick").select()
                            } catch (e) {
                            }
                        },
                        0),
                g.component.qzone && (index.qzone ? index.showItem(2) : index.hideItem(2));
                break;
            case 1:
                "chs" == $GLOBALS.lang && ($.css.show($("phone_box")), $.css.hide($("up_msg_err")));
                break;
            case 2:
                "chs" == $GLOBALS.lang && ($("haoma-inner").innerHTML = "注册邮箱帐号", $.css.hide($("phone_box")), $.report.monitor(index.huodongEnter + "_p_mail_pv"), $.css.hide($("up_msg_err"))),
                    $.css.removeClass($("phone_quick"), "hidden"),
                    index.changeMethod(2),
                    index.hideItem(2),
                    index.hideInfo("nick_info"),
                    window.setTimeout(function () {
                            try {
                                $("other_email").focus(),
                                    $("other_email").select()
                            } catch (e) {
                            }
                        },
                        0);
                break;
            case 3:
                "chs" == $GLOBALS.lang && ($("haoma-inner").innerHTML = "注册手机帐号", $.report.monitor(index.huodongEnter + "_p_phone_pv"), $.css.hide($("up_msg_err"))),
                    $.css.addClass($("phone_quick"), "hidden"),
                    index.hideInfo("nick_info"),
                    window.setTimeout(function () {
                            try {
                                $("phone_num").focus(),
                                    $("phone_num").select()
                            } catch (e) {
                            }
                        },
                        0)
        }
    },
    hideItem: function (e) {
        var n = $("item_" + e);
        n && (index.current_error_dom = "display_4", n.style.display = "none")
    },
    showItem: function (e) {
        if (index.current_error_dom = "display_5", e) {
            var n = $("item_" + e);
            if (!n) return;
            n.style.display = "inline"
        } else for (var i = 1; i <= index.totol; i++) {
            var n = $("item_" + i);
            n && (n.style.display = "inline")
        }
    },
    changeMethod: function (e) {
        switch (e - 0) {
            case 1:
                $("mail_box").className = "ipt_box nobg self",
                    index.iptFocus("self_email");
                break;
            case 2:
                $("mail_box").className = "ipt_box nobg other",
                    index.iptFocus("other_email");
                break;
            case 3:
                $("phone_box").className = "phone_box_land",
                    index.iptFocus("phone_num");
                break;
            case 4:
                $("phone_box").className = "phone_box_sea"
        }
        4 == e && (e = 3),
            $.winName.set("type", e),
            index.type = e
    },
    changeQzone: function (e) {
    },
    agree: function (e) {
        index.agreed = !index.agreed,
            e.className = index.agreed ? "a_1 checked" : "a_1"
    },
    switchProvision: function (e) {
        index.showing = !index.showing,
            $("x_box").className = index.showing ? "x_box show" : "x_box",
            e.stopPropagation()
    },
    hideProvision: function () {
        index.showing = !1,
            $("x_box").className = "x_box"
    },
    submit: function () {
        index.current_error_dom = "submit_start",
            isd_t.push(new Date - 0);
        var e = index.chkAgree();
        if (e = index.chkCode() && e, e = index.chkBirthday() && e, e = index.chkArea() && e, e = index.chkPassword() && e, e = index.chkPasswordAgain() && e, e = index.chkNick() && e, "chs" === $GLOBALS.lang && (2 === index.type ? index.phoneSubmit = "" : (e = index.chkPhoneNum() && e, e = index.chkSmsVc() && e), !index.checkVerified() && (0 != index.type || 1 != g_lang))) return !1;
        if (e) {
            $.winName.set("fromId", index.fromId),
                index.setCodeCookie();
            var n = "";
            1 == index.birthType && (n = calendar.getDate(parseInt(index.year), parseInt(index.month), parseInt(index.day), 1, parseInt(index.isLeap)));
            var i = {
                    verifycode: $("code").value,
                    qzone_flag: 0 != index.type && 3 != index.type || !index.qzone ? 0 : 1,
                    country: index.country,
                    province: index.province,
                    city: index.city,
                    isnongli: index.birthType,
                    year: index.year,
                    month: index.month,
                    day: index.day,
                    isrunyue: "1" == index.isLeap ? 0 : 1,
                    password: index.rsaEncrypt($("password").value),
                    nick: $("nick").value,
                    email: 1 == index.type && $("self_email").value + (0 == index.selfType ? "@qq.com" : "@foxmail.com"),
                    other_email: 2 == index.type && $("other_email").value,
                    elevel: index.initInfo.elevel,
                    sex: index.sex,
                    qzdate: n,
                    jumpfrom: index.fromId,
                    telphone: index.phoneSubmit,
                    smsvc: index.smsVc ? index.smsVc : "",
                    tk: "undefined" != typeof index.newVCodeData.ticket ? index.newVCodeData.ticket : "",
                    capt_type: index.captType,
                    capt_level: index.captLevel,
                    lang_type: index.type,
                    huodong_enter: index.huodongEnter
                },
                a = $.winName.get("client");
            a && (i.client = a),
                i.nick = encodeURIComponent(i.nick),
                i.password = encodeURIComponent(i.password),
                i.email = encodeURIComponent(i.email),
                i.other_email = encodeURIComponent(i.other_email),
                i.csloginstatus = g.getQQnum(),
            index.ptlang && (i.ptlang = index.ptlang),
            index.ADUIN && (i.ADUIN = index.ADUIN),
            index.ADSESSION && (i.ADSESSION = index.ADSESSION);
            for (var t in index.aq_object) i[t] = index.aq_object[t];
            if (index.isNeedCapt && 0 == index.type && 1 == g_lang) {
                $.storage.setItem("_REG_DATA", i, !0);
                var d = index.getPwdRank($("password").value);
                switch (index.pwdTimeArray[d] = 1e3 * index.pwdNum, d) {
                    case 1:
                        $.report.monitor("weakPwd");
                        break;
                    case 2:
                        $.report.monitor("midPwd");
                        break;
                    case 3:
                        $.report.monitor("strongPwd")
                }
                return $.report.isdPwdTime(index.pwdTimeArray),
                    index.showNextStep(),
                    !1
            }
            "chs" === $GLOBALS.lang && (index.phoneSubmit ? 0 == index.type ? $.report.monitor("num_with_phone") : 1 == index.type && $.report.monitor("mail_with_phone") : 0 == index.type ? $.report.monitor("num_without_phone") : 1 == index.type && $.report.monitor("mail_without_phone")),
            3 == index.type && $.report.monitor("phoneRegSubmitBtn"),
            0 == index.initIndexType && 1 == g_lang && (index.number_to("number_to_submit"), $.report.monitor("init_number_to_submit")),
            2 == index.initIndexType && 1 == g_lang && (index.email_to("email_to_submit"), $.report.monitor("init_email_to_submit")),
            3 == index.initIndexType && 1 == g_lang && (index.phone_to("phone_to_submit"), $.report.monitor("init_phone_to_submit")),
                17 == index.last_stat_num || 26 == index.last_stat_num ? $.report.monitor("index_upmsg_btn") : $.report.monitor("index_reg_btn"),
                $.post(index.getSubmitUrl(), i,
                    function (e) {
                        if (index.current_error_dom = "submit_cgi_start", e) switch (isd_t.push(new Date - 0), $.report.isd(isd_t), $.cookie.set("index_ec", e.ec, "zc.qq.com", "/", .5), e.ec) {
                            case 0:
                                $.winName.set("temp_last_send", 0),
                                    $.winName.set("gurad_phone", ""),
                                    $.cookie.set("nick", i.nick, "zc.qq.com", "/", .5),
                                    $.winName.set("_new_uin", e.uin),
                                "chs" === $GLOBALS.lang && ($.winName.set("bindPhone", e.bind_result), $.winName.set("olduin", e.olduin), $.winName.set("mibao", e.mibao_result), $.winName.set("phone", e.telphone), $.winName.set("gurad_phone", e.telphone));
                                var n = index.getPwdRank($("password").value);
                                switch (index.pwdTimeArray[n] = 1e3 * index.pwdNum, n) {
                                    case 1:
                                        $.report.monitor("weakPwd");
                                        break;
                                    case 2:
                                        $.report.monitor("midPwd");
                                        break;
                                    case 3:
                                        $.report.monitor("strongPwd")
                                }
                                switch ($.report.isdPwdTime(index.pwdTimeArray), 17 == index.last_stat_num || 26 == index.last_stat_num ? $.report.monitor("reg_phone_upmsg_succ") : $.report.monitor("reg_phone_succ"), parseInt(index.type)) {
                                    case 0:
                                        if ("chs" == $GLOBALS.lang && (index.phoneSubmit && $.report.monitor("num_with_phone_succ"), $.report.monitor(index.huodongEnter + "_p_reg_num")), $.winName.set("last_page", 1), 1 === g_lang && Math.floor(Math.random() * index.max_selective_rate) < index.selective_rate) {
                                            var a, t = [];
                                            for (a in i) $.winName.set("user_" + a, i[a]),
                                                t.push(a);
                                            $.report.monitor("QQHuiyuan"),
                                                $.winName.set("user_attrs", t.join(",")),
                                                window.location = index.selective_decimal_ok
                                        } else $.winName.set("phone_flag", 0),
                                            window.location = index.decimal_ok;
                                        break;
                                    case 1:
                                        index.phoneSubmit && $.report.monitor("mail_with_phone_succ"),
                                            $.winName.set("_email", e.email),
                                            $.winName.set("last_page", 1),
                                            window.location = index.email_ok;
                                        break;
                                    case 2:
                                        window.location = index.send_ok
                                }
                                return;
                            case 2:
                                index.showError("code", index.codeE[0], !1);
                                break;
                            case 16:
                                $("verima_info").className = "error",
                                    $("verima_info").innerHTML = index.codeE[0],
                                    $("verima").value = "",
                                    $("verima_info").className = "error",
                                    $("verima_bg").className = "bg_error";
                                break;
                            case 17:
                                index.last_stat_num = 17,
                                    $.report.monitor("reg_phone_upmsg"),
                                    index.countDownResendMsg();
                                break;
                            case 31:
                                $("phone_info").className = "error",
                                    $("phone_num_bg").className = "bg_error",
                                    $("phone_info").innerHTML = index.phoneE[1];
                                break;
                            case 5:
                                $("birthday_info").className = "error",
                                    $("birthday_info").innerHTML = index.birthE[1];
                                break;
                            case 8:
                            case 9:
                                $("email_info").className = "error",
                                    $("email_info").innerHTML = index.otherEmailE[1],
                                    index.hideEmailCode();
                                break;
                            case 13:
                            case 15:
                                $("nick_info").className = "error",
                                    $("nick_info").innerHTML = index.nickE[5];
                                break;
                            case 20:
                                index.last_stat_num = 20,
                                    index.setParam(encodeURIComponent(index.json2str(i))),
                                    1 == g_lang && 2 == index.type || 1 != g_lang ? ($.winName.set("last_page", 1), window.location = "phone_verify.html?type=" + index.type) : ($.report.monitor("reg_phone_dwmsg"), index.switchPhone(2), index.showError("phone", index.phoneE[0], !1), 0 != index.type && 1 != g_lang && (index.initInfo.elevel = 3));
                                break;
                            case 26:
                                index.last_stat_num = 26,
                                    1 == g_lang ? 2 == index.type ? (index.setParam(encodeURIComponent(index.json2str(i))), $.winName.set("temp_cellphone", i.telphone), $.winName.set("last_page", 1), window.location = "phone_verify_up.html?type=" + index.type) : ($.report.monitor("reg_phone_upmsg"), index.switchPhone(3), index.ec_res = 26, 0 != index.type && 1 != g_lang && (index.initInfo.elevel = 4)) : window.location = "worst.html?ec=21";
                                break;
                            case 21:
                                1 == g_lang ? index.gotoErrorPage(e.reasoncode, 21, index.last_stat_num) : window.location = "worst.html?ec=21";
                                break;
                            case 30:
                                1 == g_lang ? index.gotoErrorPage(e.reasoncode, 30, index.last_stat_num) : window.location = "worst.html?ec=30";
                                break;
                            case 32:
                                window.location = "phone_tianyi.html?type=" + index.type;
                                break;
                            case 33:
                                $.winName.set("olduin", e.olduin),
                                    window.location = "phone_hasbind.html?type=" + index.type;
                                break;
                            default:
                                1 == g_lang ? index.gotoErrorPage(e.reasoncode, 0, index.last_stat_num) : window.location = "error.html?ec=" + e.ec
                        }
                        (1 != g_lang || 0 != index.type && 1 != index.type || !e || 20 != e.ec && 26 != e.ec) && (index.showNewVCode() ? null == index.countDownObj && 2 == index.type && index.capRefreshCtrl(1) : index.changeCode()),
                            index.current_error_dom = "submit_cgi_end"
                    })
        }
        return $.report.monitor("submit", {
            regType: index.type
        }),
            index.current_error_dom = "submit_end",
            !1
    },
    searchArea: function (e) {
        e = e ? e : "",
        window._areaList || (_areaList = [{
            c: "0086",
            n: "中国",
            p: "zhongguo"
        },
            {
                c: "00852",
                n: "中国香港特别行政区",
                p: "zhongguoxianggangtebiehangzhengqu"
            },
            {
                c: "00853",
                n: "中国澳门特别行政区",
                p: "zhongguoaomentebiehangzhengqu"
            },
            {
                c: "00886",
                n: "台湾",
                p: "taiwan"
            }]);
        var n = _areaList,
            i = [],
            a = e.split("");
        a = a.join("[\\w\\W]{0,}");
        for (var t = 0,
                 d = n.length; t < d; t++) {
            var o = "00" + n[t].c,
                r = n[t].n + " " + o,
                s = n[t].p,
                c = new RegExp(a, "i");
            if (!e || c.test(r) || c.test(s)) {
                var l = {};
                l.name = r,
                    l.value = r,
                    i.push(l)
            }
        }
        return i
    },
    initPhoneArea: function () {
        var e = index.searchArea(""),
            n = $.winName.get("phoneArea");
        1 == $.winName.get("phonereg_fillvalues") && n && isGanAoTaiPhone(n) ? (index.phoneArea_autocomplete.initList(e, n), index.phoneArea = n, index.seaPhone(), $.winName.set("phoneArea", ""), $("phone_num").value = $.winName.get("temp_cellphone").substr(5)) : (index.phoneArea_autocomplete.initList(e), index.phoneArea_autocomplete.setDefaultValue(e[0]), index.phoneArea = e[0].c, 1 == $.winName.get("phonereg_fillvalues") && ($("phone_num").value = $.winName.get("temp_cellphone")))
    },
    bind_sea_phone_event: function () {
        var e = $("sea_country_input"),
            n = $("sea_country_box");
        index.phoneArea_autocomplete = $.autocomplete(),
            index.phoneArea_autocomplete.init({
                domAppendTo: n,
                domInput: e,
                comboxModel: 2,
                needLine: !0,
                inputSelect: !0,
                preventTabDefault: !0,
                keyupCallback: function (e) {
                    var n = index.searchArea(e);
                    index.phoneArea_autocomplete.show(n)
                },
                changeCallback: function () {
                    try {
                        $("phone_num").focus()
                    } catch (e) {
                    }
                }
            }),
            index.initPhoneArea(),
            $.e.add(e, "focus",
                function () {
                    this.parentNode.className = "sea_area_value_bg_focus"
                }),
            $.e.add(e, "blur",
                function () {
                    this.parentNode.className = "sea_area_value_bg"
                })
    },
    loadLocation: function (e) {
        index.location = e;
        var n = ($("country_box"), $("country_value")),
            i = $("country_ul"),
            a = ($("province_box"), $("province_value")),
            t = $("province_ul"),
            d = $("city_value"),
            o = $("city_ul");
        $("city_box");
        index.changeCountry();
        var r = $.winName.get("phonereg_fillvalues");
        if (1 == r) {
            var s = index.getParam();
            $("nick").value = s.nick,
                1 == s.sex ? (index.sex = 1, $("sex_1").className = "checked_focus", $("sex_2").className = "") : 2 == s.sex && (index.sex = 2, $("sex_1").className = "", $("sex_2").className = "checked_focus"),
                index.setLocation(s),
            index.locationSet && index.birthdaySet && $.winName.set("phonereg_fillvalues", 0)
        }
        $.e.add(n, "click",
            function (e) {
                index.hideProvince(),
                    index.hideCity(),
                    index.hideBirtydayType(),
                    index.hideYear(),
                    index.hideMonth(),
                    index.hideDay(),
                    e.stopPropagation(),
                index.selectListState[4] && (index.changeCountry(), index.selectListState[4] = 0),
                    index.switchCountry()
            }),
            $.e.add(i, "click",
                function (e) {
                    var i = e.target;
                    if ("li" != i.nodeName.toLowerCase()) return void e.stopPropagation();
                    var a = index.country,
                        t = i.getAttribute("value");
                    index.country = t;
                    var d = $.html.decode(i.innerHTML);
                    d.length > 6 ? ($("country_value").title = d, $("country_value").value = index.isEnglishWord(d) ? d.substring(0, 12) : d.substring(0, 6)) : ($("country_value").title = "", $("country_value").value = d),
                        index.selectHasSelected[4] = !0,
                        index.hideCountry(),
                        e.stopPropagation(),
                    a != index.country && (index.changeProvince(), index.changeCity()),
                        index.updateSelectListIndex(4, index.listIndex[4]);
                    try {
                        n.focus()
                    } catch (e) {
                    }
                }),
            $.e.add(i, "mousemove",
                function (e) {
                    var n = e.target;
                    if ("li" == n.tagName.toLowerCase()) {
                        var i = $("country_" + index.listIndex[4]);
                        i && (i.className = ""),
                            n.className = "hover",
                            index.listIndex[4] = index.getIndexFromId(n.getAttribute("id")),
                            e.stopPropagation()
                    }
                }),
            $.e.add(i, "mouseout",
                function (e) {
                    "li" == e.target.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
                }),
        index.province != index.noAreaStr && index.changeProvince(index.province),
            $.e.add(a, "click",
                function (e) {
                    index.hideCountry(),
                        index.hideCity(),
                        index.hideBirtydayType(),
                        index.hideYear(),
                        index.hideMonth(),
                        index.hideDay(),
                        e.stopPropagation(),
                    a.className.indexOf("hide") > -1 || (index.selectListState[5] && (index.changeProvince(null, !0), index.selectListState[5] = 0), index.switchProvince())
                }),
            $.e.add(t, "click",
                function (e) {
                    var n = e.target;
                    if ("li" != n.nodeName.toLowerCase()) return void e.stopPropagation();
                    var i = index.province,
                        t = n.getAttribute("value");
                    index.province = t;
                    var d = $.html.decode(n.innerHTML);
                    d.length > 6 ? ($("province_value").title = d, $("province_value").value = index.isEnglishWord(d) ? d.substring(0, 12) : namprovinceNamee.substring(0, 6)) : ($("province_value").title = "", $("province_value").value = d),
                        index.selectHasSelected[5] = !0,
                        index.hideProvince(),
                        e.stopPropagation(),
                    i != index.province && index.changeCity(),
                        index.updateSelectListIndex(5, index.listIndex[5]);
                    try {
                        a.focus()
                    } catch (e) {
                    }
                }),
            $.e.add(t, "mousemove",
                function (e) {
                    var n = e.target;
                    if ("li" == n.tagName.toLowerCase()) {
                        var i = $("province_" + index.listIndex[5]);
                        i && (i.className = ""),
                            n.className = "hover",
                            index.listIndex[5] = index.getIndexFromId(n.getAttribute("id")),
                            e.stopPropagation()
                    }
                }),
            $.e.add(t, "mouseout",
                function (e) {
                    "li" == e.target.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
                }),
        index.city != index.noAreaStr && index.changeCity(index.city),
            $.e.add(d, "click",
                function (e) {
                    index.hideCountry(),
                        index.hideProvince(),
                        index.hideBirtydayType(),
                        index.hideYear(),
                        index.hideMonth(),
                        index.hideDay(),
                        e.stopPropagation(),
                    d.className.indexOf("hide") > -1 || (index.selectListState[6] && (index.changeCity(null, !0), index.selectListState[6] = 0), index.switchCity())
                }),
            $.e.add(o, "click",
                function (e) {
                    var n = e.target;
                    if ("li" != n.nodeName.toLowerCase()) return void e.stopPropagation();
                    var i = (index.city, n.getAttribute("value"));
                    index.city = i;
                    var a = $.html.decode(n.innerHTML);
                    a.length > 6 ? ($("city_value").title = a, $("city_value").value = index.isEnglishWord(a) ? a.substring(0, 12) : a.substring(0, 6)) : ($("city_value").title = "", $("city_value").value = a),
                        index.selectHasSelected[6] = !0,
                        index.hideCity(),
                        e.stopPropagation(),
                        index.updateSelectListIndex(6, index.listIndex[6]);
                    try {
                        d.focus()
                    } catch (e) {
                    }
                }),
            $.e.add(o, "mousemove",
                function (e) {
                    var n = e.target;
                    if ("li" == n.tagName.toLowerCase()) {
                        var i = $("city_" + index.listIndex[6]);
                        i && (i.className = ""),
                            n.className = "hover",
                            index.listIndex[6] = index.getIndexFromId(n.getAttribute("id")),
                            e.stopPropagation()
                    }
                }),
            $.e.add(o, "mouseout",
                function (e) {
                    "li" == e.target.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
                }),
            $.e.add(n, "keydown",
                function (e) {
                    index.moveList(n, i, e, 4);
                    var a = e.keyCode;
                    index.addAq(this.id, a)
                }),
            $.e.add(a, "keydown",
                function (e) {
                    index.moveList(a, t, e, 5);
                    var n = e.keyCode;
                    index.addAq(this.id, n)
                }),
            $.e.add(d, "keydown",
                function (e) {
                    index.moveList(d, o, e, 6);
                    var n = e.keyCode;
                    index.addAq(this.id, n)
                }),
            $.e.add(n, "focus",
                function (e) {
                    index.clearAq(),
                        index.current_error_dom = "country_value",
                        $("country_value_bg").className = "area_value_bg_focus",
                        window.setTimeout(function () {
                                n.select()
                            },
                            100)
                }),
            $.e.add(n, "blur",
                function (e) {
                    $("country_value_bg").className = "area_value_bg";
                    var a = index.country;
                    index.selectHasSelected[4] || (index.setSelectBlurValue(i, n, 4), a != index.country && (index.changeProvince(), index.changeCity())),
                        window.clearTimeout(index.searchTimeoutId[4]),
                        index.hideInputSearchTips(),
                        index.chkArea(),
                        index.reportAq(this)
                }),
            $.e.add(a, "focus",
                function (e) {
                    index.clearAq(),
                        index.current_error_dom = "province_value",
                        $("province_value_bg").className = "area_value_bg_focus",
                        window.setTimeout(function () {
                                a.select()
                            },
                            100)
                }),
            $.e.add(a, "blur",
                function (e) {
                    index.chkArea(),
                        $("province_value_bg").className = "area_value_bg";
                    var n = index.province;
                    index.selectHasSelected[5] || (index.setSelectBlurValue(t, a, 5), n != index.province && index.changeCity()),
                        window.clearTimeout(index.searchTimeoutId[5]),
                        index.hideInputSearchTips(),
                        index.reportAq(this)
                }),
            $.e.add(d, "focus",
                function (e) {
                    index.clearAq(),
                        index.current_error_dom = "city_value",
                        $("city_value_bg").className = "area_value_bg_focus",
                        window.setTimeout(function () {
                                d.select()
                            },
                            100)
                }),
            $.e.add(d, "blur",
                function (e) {
                    index.chkArea(),
                        $("city_value_bg").className = "area_value_bg",
                    index.selectHasSelected[6] || index.setSelectBlurValue(o, d, 6),
                        window.clearTimeout(index.searchTimeoutId[6]),
                        index.hideInputSearchTips(),
                        index.reportAq(this)
                }),
            index.bindTimeSearchEvent(),
            index.bindAreaSearchEvent()
    },
    switchType: function () {
        index.switchType.showing ? ($("selfTypeBox").className = "hide", index.switchType.showing = !1) : ($("selfTypeBox").className = "", index.switchType.showing = !0)
    },
    hideType: function () {
        $("selfTypeBox").className = "hide",
            index.switchType.showing = !1
    },
    changeCountry: function () {
        var e = $("country_ul"),
            n = "";
        n = "";
        var i = 0,
            a = 0,
            t = index.initAddress[0],
            d = index.location;
        for (var o in d) {
            o == index.country && index.updateListIndex(4, i),
            o == t && (a = i);
            var r = "country_" + i;
            d[o].n && "0" != d[o].n && (n += '<li value="' + o + '" id=' + r + ">" + d[o].n + "</li>", i++)
        }
        0 == i && index.updateListIndex(4, -1),
            e.innerHTML = n
    },
    changeProvince: function (e, n) {
        if (index.country == index.noAreaStr) return $("province_ul").innerHTML = "",
            index.updateListIndex(5, -1),
            !1;
        var i = index.location[index.country],
            a = "",
            t = "";
        if (!index.country || i[0]) return index.province = index.noAreaStr,
            $("province_value").className = "hide",
            $("province_ul").className = "hide",
            $("province_ul").innerHTML = "",
            void($("province_box").className = "disable_box");
        $("province_value").className = "province_value",
        e && (a = i[e] ? i[e].n : "", index.province = e);
        var d = 0;
        for (var o in i) if ("n" != o) {
            "" == a ? (a = i[o].n, n || (index.province = o, index.updateListIndex(5, 0))) : o == index.province && index.updateListIndex(5, d);
            var r = "province_" + d;
            t += '<li value="' + o + '" id=' + r + ">" + i[o].n + "</li>",
                d++
        }
        return 0 == d ? (index.updateListIndex(5, -1), index.province = index.noAreaStr, $("province_value").className = "hide", $("province_ul").className = "hide", $("province_ul").innerHTML = "", void($("province_box").className = "disable_box")) : (n || ($("province_value").value = a), void($("province_ul").innerHTML = t))
    },
    changeCity: function (e, n) {
        if (index.country == index.noAreaStr) return $("city_ul").innerHTML = "",
            index.updateListIndex(6, -1),
            !1;
        $("city_value").className = "city_value";
        var i = index.location[index.country],
            a = "",
            t = "",
            d = 0;
        for (var o in i) if (d++, d >= 3) break;
        switch (d) {
            case 1:
                i = null,
                    $("city_value").className = "hide",
                    $("city_ul").className = "hide",
                    $("city_ul").innerHTML = "";
                break;
            case 2:
                i = i[0];
                break;
            case 3:
                i = i[index.province]
        }
        e && (a = i[e] ? i[e].n : "", index.city = e);
        var r = 0;
        for (var o in i) if ("n" != o && i[o].n && "0" != i[o].n) {
            "" == a ? (a = i[o].n, n || (index.city = o, index.updateListIndex(6, 0))) : o == index.city && index.updateListIndex(6, r);
            var s = "city_" + r;
            t += '<li value="' + o + '" id=' + s + ">" + i[o].n + "</li>",
                r++
        }
        0 == r && (index.city = index.noAreaStr, $("city_value").className = "hide", $("city_box").className = "disable_box", index.updateListIndex(6, -1)),
        n || ($("city_value").value = a),
            $("city_ul").innerHTML = t
    },
    search_sea_area: function (e, n) {
        var i = index.searchResultToMap(["11:北京"]);
        index.selectHasSelected[n] = !1,
            index.showUl(e),
            e.scrollTop = 0;
        var a = "",
            t = 0;
        for (var d in i) {
            var o = "sea_country_" + t;
            a += 0 == t ? '<li class="hover" code="' + d + '" id=' + o + ">" + i[d] + "</li>" : '<li code="' + d + '" id=' + o + ">" + i[d] + "</li>",
                t++
        }
        t > 0 ? (index.updateListIndex(n, 0), e.className = "") : (a = '<p class="red_bg">' + index.areaE[1] + "</p>", index.updateListIndex(n, -1), e.className = "noSearchResult"),
            e.innerHTML = $.html.encode(a),
            index.selectListState[n] = 1
    },
    search_area: function (e, n, i) {
        $.get(e, null,
            function (e) {
                if (e && 0 == e.ec) {
                    var a = index.searchResultToMap(e.list);
                    index.selectHasSelected[i] = !1,
                        index.showUl(n),
                        n.scrollTop = 0;
                    var t = "",
                        d = 0;
                    for (var o in a) {
                        var r = "country_" + d;
                        t += 0 == d ? '<li class="hover" value="' + o + '" id=' + r + ">" + a[o] + "</li>" : '<li value="' + o + '" id=' + r + ">" + a[o] + "</li>",
                            d++
                    }
                    if (d > 0) index.updateListIndex(i, 0),
                        n.className = "";
                    else {
                        switch (t = '<p class="red_bg">' + index.areaE[1] + "</p>", i) {
                            case 4:
                                index.country = index.noAreaStr;
                                break;
                            case 5:
                                index.province = index.noAreaStr;
                                break;
                            case 6:
                                index.city = index.noAreaStr
                        }
                        index.updateListIndex(i, -1),
                            n.className = "noSearchResult"
                    }
                    n.innerHTML = t,
                        index.selectListState[i] = 1
                }
            })
    },
    hideCountry: function (e) {
        $("country_ul").className = "hide",
            index.switchCountry.isShow = !1
    },
    switchCountry: function (e) {
        if (index.switchCountry.isShow = !index.switchCountry.isShow, $("country_ul").className = index.switchCountry.isShow ? "" : "hide", index.switchCountry.isShow) {
            $("country_ul").scrollTop = index.getSelectScrollTop(4);
            var n = index.getSelectListItem(4);
            n && (n.className = "hover"),
                index.selectHasSelected[4] = !1
        }
    },
    hideProvince: function (e) {
        $("province_ul").className = "hide",
            index.switchProvince.isShow = !1
    },
    switchProvince: function (e) {
        if (index.switchProvince.isShow = !index.switchProvince.isShow, $("province_ul").className = index.switchProvince.isShow ? "" : "hide", index.switchProvince.isShow) {
            $("province_ul").scrollTop = index.getSelectScrollTop(5);
            var n = index.getSelectListItem(5);
            n && (n.className = "hover"),
                index.selectHasSelected[5] = !1
        }
    },
    hideCity: function (e) {
        $("city_ul").className = "hide",
            index.switchCity.isShow = !1
    },
    switchCity: function (e) {
        if (index.switchCity.isShow = !index.switchCity.isShow, $("city_ul").className = index.switchCity.isShow ? "" : "hide", index.switchCity.isShow) {
            $("city_ul").scrollTop = index.getSelectScrollTop(6);
            var n = index.getSelectListItem(6);
            n && (n.className = "hover"),
                index.selectHasSelected[6] = !1
        }
    },
    initBirthday: function () {
        if (g.component.lunar) var e = $("birthday_type_box"),
            n = $("birthday_type_value"),
            i = $("birthday_type_ul");
        var a = ($("year_box"), $("year_value")),
            t = $("year_ul"),
            d = ($("month_box"), $("month_value")),
            o = $("month_ul"),
            r = ($("day_box"), $("day_value")),
            s = $("day_ul");
        a.value = __("year", "年"),
            d.value = __("month", "月"),
            r.value = __("day", "日"),
            index.changeYear(),
        g.component.lunar && ($.e.add(e, "click",
            function (e) {
                index.hideCountry(),
                    index.hideProvince(),
                    index.hideCity(),
                    index.hideYear(),
                    index.hideMonth(),
                    index.hideDay(),
                    index.switchBirtydayType(),
                    e.stopPropagation()
            }), $.e.add(i, "click",
            function (e) {
                if ("li" != e.target.nodeName.toLowerCase()) return void e.stopPropagation();
                var i = index.birthType,
                    a = e.target.getAttribute("value");
                index.birthType = a,
                    $("birthday_type_value").innerHTML = e.target.innerHTML,
                    index.switchBirtydayType(),
                    index.switchBirtydayType.dom = e.target,
                    e.stopPropagation(),
                i != index.birthType && (index.updateShowdDate(), index.changeYear(), index.changeMonth(), index.changeDay(), index.showBirthdayInfo()),
                    index.updateSelectListIndex(0, index.listIndex[0]);
                try {
                    n.focus()
                } catch (e) {
                }
            }), $.e.add(i, "mousemove",
            function (e) {
                var n = e.target;
                if ("li" == n.tagName.toLowerCase()) {
                    index.switchBirtydayType.dom ? index.switchBirtydayType.dom.className = "" : "",
                        index.switchBirtydayType.dom = null;
                    var i = $("birthday_" + index.listIndex[0]);
                    i && (i.className = ""),
                        n.className = "hover",
                        index.listIndex[0] = index.getIndexFromId(n.getAttribute("id")),
                        e.stopPropagation()
                }
            }), $.e.add(i, "mouseout",
            function (e) {
                "li" == e.target.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
            }), $.e.add(n, "keydown",
            function (e) {
                index.moveList(n, i, e, 0);
                var a = e.keyCode;
                index.addAq(this.id, a)
            }), $.e.add(n, "focus",
            function (e) {
                index.clearAq(),
                    index.current_error_dom = "birthday_type_value",
                    $.css.addClass(n, "birthday_type_box_focus")
            }), $.e.add(n, "blur",
            function (e) {
                $.css.removeClass(n, "birthday_type_box_focus"),
                    index.reportAq(this)
            })),
            $.e.add(a, "keydown",
                function (e) {
                    index.moveList(a, t, e, 1);
                    var n = e.keyCode;
                    index.addAq(this.id, n)
                }),
            $.e.add(d, "keydown",
                function (e) {
                    index.moveList(d, o, e, 2);
                    var n = e.keyCode;
                    index.addAq(this.id, n)
                }),
            $.e.add(r, "keydown",
                function (e) {
                    index.moveList(r, s, e, 3);
                    var n = e.keyCode;
                    index.addAq(this.id, n)
                }),
            $.e.add(a, "focus",
                function (e) {
                    index.clearAq(),
                        index.current_error_dom = "year_value",
                        $("year_bg").className = "year_bg_focus",
                        window.setTimeout(function () {
                                a.select()
                            },
                            100)
                }),
            $.e.add(a, "blur",
                function (e) {
                    $("year_bg").className = "year_bg_txt",
                    index.selectHasSelected[1] || (index.setSelectBlurValue(t, a, 1), index.changeMonth(), index.changeDay(), index.showBirthdayInfo()),
                        window.clearTimeout(index.searchTimeoutId[1]),
                        index.hideInputSearchTips(),
                        index.reportAq(this)
                }),
            $.e.add(d, "focus",
                function (e) {
                    index.clearAq(),
                        index.current_error_dom = "month_value",
                        d.className = "month_value_focus",
                        window.setTimeout(function () {
                                d.select()
                            },
                            100)
                }),
            $.e.add(d, "blur",
                function (e) {
                    d.className = "month_value",
                    index.selectHasSelected[2] || (index.setSelectBlurValue(o, d, 2), index.changeDay(), index.showBirthdayInfo()),
                        window.clearTimeout(index.searchTimeoutId[2]),
                        index.hideInputSearchTips(),
                        index.reportAq(this)
                }),
            $.e.add(r, "focus",
                function (e) {
                    index.clearAq(),
                        index.current_error_dom = "day_value",
                        r.className = "day_value_focus",
                        window.setTimeout(function () {
                                r.select()
                            },
                            100)
                }),
            $.e.add(r, "blur",
                function (e) {
                    r.className = "day_value",
                    index.selectHasSelected[3] || (index.setSelectBlurValue(s, r, 3), index.showBirthdayInfo()),
                        window.clearTimeout(index.searchTimeoutId[3]),
                        index.chkBirthday(),
                        index.hideInputSearchTips(),
                        index.reportAq(this)
                }),
            $.e.add(a, "click",
                function (e) {
                    index.hideCountry(),
                        index.hideProvince(),
                        index.hideCity(),
                        index.hideBirtydayType(),
                        index.hideMonth(),
                        index.hideDay(),
                    index.selectListState[1] && (index.changeYear(), index.selectListState[1] = 0),
                        index.switchYear(),
                        e.stopPropagation()
                }),
            $.e.add(t, "click",
                function (e) {
                    var n = e.target;
                    if ("li" != n.nodeName.toLowerCase()) return void e.stopPropagation();
                    var i = index.year,
                        t = n.getAttribute("value");
                    index.year = t,
                        index.showDate.year = t,
                        a.value = $.html.decode(n.innerHTML),
                        index.switchYear(),
                        index.switchYear.dom = e.target,
                        e.stopPropagation(),
                    i != index.year && (index.changeMonth(), index.changeDay(), index.showBirthdayInfo()),
                        index.updateSelectListIndex(1, index.listIndex[1]),
                        index.selectHasSelected[1] = !0;
                    try {
                        a.focus()
                    } catch (e) {
                    }
                }),
            $.e.add(t, "mousemove",
                function (e) {
                    var n = e.target;
                    if ("li" == n.tagName.toLowerCase()) {
                        index.switchYear.dom ? index.switchYear.dom.className = "" : "",
                            index.switchYear.dom = null;
                        var i = $("year_" + index.listIndex[1]);
                        i && (i.className = ""),
                            index.listIndex[1] = index.getIndexFromId(n.getAttribute("id")),
                            n.className = "hover",
                            e.stopPropagation()
                    }
                }),
            $.e.add(t, "mouseout",
                function (e) {
                    "li" == e.target.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
                }),
            $.e.add(d, "click",
                function (e) {
                    index.hideCountry(),
                        index.hideProvince(),
                        index.hideCity(),
                        index.hideBirtydayType(),
                        index.hideYear(),
                        index.hideDay(),
                    index.selectListState[2] && (index.changeMonth(), index.selectListState[2] = 0),
                        index.switchMonth(),
                        e.stopPropagation()
                }),
            $.e.add(o, "click",
                function (e) {
                    var n = e.target;
                    if ("li" != n.nodeName.toLowerCase()) return void e.stopPropagation();
                    var i = index.month,
                        a = index.isLeap,
                        t = n.getAttribute("value");
                    index.month = t,
                        index.showDate.month = t,
                        index.isLeap = n.getAttribute("isLeap") ? n.getAttribute("isLeap") : 1,
                        index.showDate.isLeap = 1 != index.isLeap,
                        d.value = $.html.decode(n.innerHTML),
                        index.switchMonth(),
                        index.switchMonth.dom = n,
                        e.stopPropagation(),
                    i == index.month && a == index.leap || (index.changeDay(), index.showBirthdayInfo()),
                        index.updateSelectListIndex(2, index.listIndex[2]),
                        index.selectHasSelected[2] = !0;
                    try {
                        d.focus()
                    } catch (e) {
                    }
                }),
            $.e.add(o, "mousemove",
                function (e) {
                    var n = e.target;
                    if ("li" == n.tagName.toLowerCase()) {
                        index.switchMonth.dom ? index.switchMonth.dom.className = "" : "",
                            index.switchMonth.dom = null;
                        var i = $("month_" + index.listIndex[2]);
                        i && (i.className = ""),
                            index.listIndex[2] = index.getIndexFromId(n.getAttribute("id")),
                            n.className = "hover",
                            e.stopPropagation()
                    }
                }),
            $.e.add(o, "mouseout",
                function (e) {
                    var n = e.target;
                    "li" == n.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
                }),
            $.e.add(r, "click",
                function (e) {
                    index.hideCountry(),
                        index.hideProvince(),
                        index.hideCity(),
                        index.hideBirtydayType(),
                        index.hideYear(),
                        index.hideMonth(),
                    index.selectListState[3] && (index.changeDay(), index.selectListState[3] = 0),
                        index.switchDay(),
                        e.stopPropagation()
                }),
            $.e.add(s, "click",
                function (e) {
                    var n = e.target;
                    if ("li" != n.nodeName.toLowerCase()) return void e.stopPropagation();
                    var i = index.day,
                        a = n.getAttribute("value");
                    index.day = a,
                        index.showDate.day = a,
                        r.value = $.html.decode(n.innerHTML),
                        index.switchDay(),
                        index.switchDay.dom = n,
                        e.stopPropagation(),
                    i != index.day && index.showBirthdayInfo(),
                        index.updateSelectListIndex(3, index.listIndex[3]),
                        index.selectHasSelected[3] = !0;
                    try {
                        r.focus()
                    } catch (e) {
                    }
                }),
            $.e.add(s, "mousemove",
                function (e) {
                    var n = e.target;
                    if ("li" == n.tagName.toLowerCase()) {
                        index.switchDay.dom ? index.switchDay.dom.className = "" : "",
                            index.switchDay.dom = null;
                        var i = $("day_" + index.listIndex[3]);
                        i && (i.className = ""),
                            index.listIndex[3] = index.getIndexFromId(n.getAttribute("id")),
                            n.className = "hover",
                            e.stopPropagation()
                    }
                }),
            $.e.add(s, "mouseout",
                function (e) {
                    var n = e.target;
                    "li" == n.tagName.toLowerCase() && (n.className = "", e.stopPropagation())
                })
    },
    changeYear: function () {
        if (window.calendar) {
            var e = index.maxDate.year,
                n = index.showDate.year,
                i = e - 119;
            n > 0 && index.updateListIndex(1, e - n);
            var a = [];
            switch (index.birthType + "") {
                case "0":
                    for (var t = e; t >= i; t--) {
                        var d = "year_" + (e - t);
                        t == n && ($("year_value").value = n + __("cal_year_suffix", " ")),
                            a.push("<li value=" + t + " id=" + d + ">" + t + __("cal_year_suffix", " ") + "</li>")
                    }
                    break;
                case "1":
                    for (var t = e; t >= i; t--) {
                        var d = "year_" + (e - t),
                            o = calendar.getGanZhi(t + 1, 0, 0, 0);
                        t == n && ($("year_value").value = o + __("cal_year_suffix", " ") + "(" + t + ")"),
                            a.push("<li value=" + t + " id=" + d + ">" + o + __("cal_year_suffix", " ") + "(" + t + ")</li>")
                    }
            }
            $("year_ul").innerHTML = a.join(" "),
                index.ulToSelectArr($("year_ul"), 1),
                index.year = n
        }
    },
    changeMonth: function () {
        if ("" != index.year && window.calendar) {
            var e = parseInt(index.birthType),
                n = parseInt(index.year),
                i = index.showDate.month;
            i > 0 && index.updateListIndex(2, i - 1);
            var a = [];
            switch (index.month = i, index.birthType + "") {
                case "0":
                    for (var t = index.inMaxDate(n, i, 1, e, 1), d = 1; d <= 12; d++) {
                        var o = "month_" + (d - 1);
                        d == i && ($("month_value").value = d + __("cal_month_suffix", " ")),
                            index.inMaxDate(n, d, 1, e, 1) ? a.push("<li value=" + d + " id=" + o + ">" + d + __("cal_month_suffix", " ") + "</li>") : a.push("<p value=" + d + ' class="gray" title=' + index.noSelectTip + " id=" + o + ">" + d + __("cal_month_suffix", " ") + "</p>")
                    }
                    t || ($("month_value").value = 1 + __("cal_month_suffix", " "), index.month = 1, index.showDate.month = 1, index.updateListIndex(2, 0));
                    break;
                case "1":
                    var r = calendar.getChineseLunarMonth(index.year),
                        s = r.leap ? r.leap.m : 0,
                        c = index.inMaxDate(n, i, 1, e, index.showDate.isLeap ? 0 : 1);
                    (index.showDate.isLeap && i == s || s > 0 && i > s) && index.updateListIndex(2, i);
                    for (var d = 1,
                             l = 0; d <= 12; d++, l++) {
                        var o = "month_" + l;
                        d == i && ($("month_value").value = index.showDate.isLeap && i == s ? __("cal_intercalary", "闰") + r.m[d - 1] : r.m[d - 1], i != s && (index.isLeap = 1, index.showDate.isLeap = !1)),
                            d == s ? (index.inMaxDate(n, d, 1, e, 1) ? a.push("<li value=" + d + " isLeap=1 id=" + o + ">" + r.m[d - 1] + "</li>") : a.push("<p value=" + d + ' class="gray" title=' + index.noSelectTip + " isLeap=1 id=" + o + ">" + r.m[d - 1] + "</p>"), l++, o = "month_" + l, index.inMaxDate(n, d, 1, e, 0) ? a.push("<li value=" + d + " isLeap=0 id=" + o + ">" + r.leap.name + "</li>") : a.push("<p value=" + d + ' class="gray" title=' + index.noSelectTip + " isLeap=0 id=" + o + ">" + r.leap.name + "</p>")) : index.inMaxDate(n, d, 1, e, 1) ? a.push("<li value=" + d + " isLeap=1 id=" + o + ">" + r.m[d - 1] + "</li>") : a.push("<p value=" + d + ' class="gray" title=' + index.noSelectTip + " isLeap=1 id=" + o + ">" + r.m[d - 1] + "</p>")
                    }
                    c || ($("month_value").value = __("cal_month_1", "正月"), index.month = 1, index.showDate.month = 1, index.updateListIndex(2, 0), index.isLeap = 1, index.showDate.isLeap = !1)
            }
            $("month_ul").innerHTML = a.join(" "),
                index.ulToSelectArr($("month_ul"), 2)
        }
    },
    changeDay: function () {
        if ("" != index.month && window.calendar) {
            var e, n = parseInt(index.birthType),
                i = parseInt(index.year),
                a = parseInt(index.month),
                t = parseInt(index.showDate.day);
            t > 0 && index.updateListIndex(3, t - 1);
            var d = [];
            switch (index.day = t, index.birthType + "") {
                case "0":
                    e = calendar.getSolarMonthDays(index.year, index.month);
                    var o = index.inMaxDate(i, a, t, n, 1);
                    (t > e || !o) && ($("day_value").value = "1" + __("cal_day_suffix", " "), index.showDate.day = 1, index.day = 1, index.updateListIndex(3, 0));
                    for (var r = 1; r <= e; r++) {
                        var s = "day_" + (r - 1);
                        r == t && o && ($("day_value").value = r + __("cal_day_suffix", " ")),
                            index.inMaxDate(i, a, r, n, 1) ? d.push("<li value=" + r + "  id=" + s + ">" + r + __("cal_day_suffix", " ") + "</li>") : d.push("<p value=" + r + ' class="gray" title=' + index.noSelectTip + " id=" + s + ">" + r + __("cal_day_suffix", " ") + "</p>")
                    }
                    break;
                case "1":
                    e = calendar.getChineseLunarDay(i, a, index.showDate.isLeap ? 0 : 1);
                    var c = index.inMaxDate(i, a, t, n, index.showDate.isLeap ? 0 : 1);
                    (t > e.length || !c) && ($("day_value").value = e[0], index.showDate.day = 1, index.day = 1, index.updateListIndex(3, 0));
                    for (var r = 1,
                             l = e.length; r <= l; r++) {
                        var s = "day_" + (r - 1);
                        r == t && c && ($("day_value").value = e[r - 1]),
                            index.inMaxDate(i, a, r, n, index.showDate.isLeap ? 0 : 1) ? d.push("<li value=" + r + " id=" + s + ">" + e[r - 1] + "</li>") : d.push("<p value=" + r + ' class="gray" title=' + index.noSelectTip + " id=" + s + " >" + e[r - 1] + "</p>")
                    }
            }
            $("day_ul").innerHTML = d.join(" "),
                index.ulToSelectArr($("day_ul"), 3)
        }
    },
    switchBirtydayType: function () {
        if (g.component.lunar && (index.switchBirtydayType.isShow = !index.switchBirtydayType.isShow, $("birthday_type_ul").className = index.switchBirtydayType.isShow ? "" : "hide", index.switchBirtydayType.isShow)) {
            var e = index.getSelectListItem(0);
            e && (e.className = "hover")
        }
    },
    switchYear: function () {
        if (index.switchYear.isShow = !index.switchYear.isShow, $("year_ul").className = index.switchYear.isShow ? "" : "hide", index.switchYear.isShow) {
            $("year_ul").scrollTop = index.getSelectScrollTop(1);
            var e = index.getSelectListItem(1);
            e && (e.className = "hover"),
                index.selectHasSelected[1] = !1
        }
    },
    switchMonth: function () {
        if (index.switchMonth.isShow = !index.switchMonth.isShow, $("month_ul").className = index.switchMonth.isShow ? "" : "hide", index.switchMonth.isShow) {
            $("month_ul").scrollTop = index.getSelectScrollTop(2);
            var e = index.getSelectListItem(2);
            e && (e.className = "hover"),
                index.selectHasSelected[2] = !1
        }
    },
    switchDay: function () {
        if (index.switchDay.isShow = !index.switchDay.isShow, $("day_ul").className = index.switchDay.isShow ? "" : "hide", index.switchDay.isShow) {
            $("day_ul").scrollTop = index.getSelectScrollTop(3);
            var e = index.getSelectListItem(3);
            e && (e.className = "hover"),
                index.selectHasSelected[3] = !1
        }
    },
    hideBirtydayType: function () {
        g.component.lunar && ($("birthday_type_ul").className = "hide", index.switchBirtydayType.isShow = !1)
    },
    hideYear: function () {
        $("year_ul").className = "hide",
            index.switchYear.isShow = !1
    },
    hideMonth: function () {
        $("month_ul").className = "hide",
            index.switchMonth.isShow = !1
    },
    hideDay: function () {
        $("day_ul").className = "hide",
            index.switchDay.isShow = !1
    },
    showBirthdayInfo: function () {
        var e = "",
            n = "";
        if (index.year > 0 && index.month > 0 && index.day > 0) {
            e = calendar.getZodiac(index.year, index.month, index.day, index.birthType, index.isLeap),
                n = calendar.getConstellation(parseInt(index.year), parseInt(index.month), parseInt(index.day), parseInt(index.birthType), parseInt(index.isLeap));
            var i = __("cal_zodiac_prefix", "属"),
                a = __("cal_starsign_prefix", "");
            $("birthday_info").innerHTML = a + n,
            "cht" != $GLOBALS.lang && "chs" != $GLOBALS.lang || ($("birthday_info").innerHTML = i + e + " " + $("birthday_info").innerHTML),
                $("birthday_info").className = "birthdayTip"
        }
    },
    showEmailCode: function () {
        index.current_error_dom = "display_6",
            $("email_code_img").src = index.codeUrl + "?r=" + Math.random(),
            $("email_code_ipt").value = "",
            $("chk_email_code_box").style.display = "block",
            $("cover").style.display = "block"
    },
    hideEmailCode: function () {
        index.current_error_dom = "display_7",
            $("chk_email_code_box").style.display = "none",
            $("cover").style.display = "none",
        ("1" == index.initInfo.elevel || "2" == index.initInfo.elevel) & index.hideEmailCode.needChange && (index.showNewVCode() ? index.capRefreshCtrl(1) : ($("code_img").src = index.codeUrl + "?r=" + Math.random(), $("code").value = ""))
    },
    generateEmailTips: function (e) {
        var n = e.indexOf("@"),
            i = "";
        i = n == -1 ? e : e.substring(0, n);
        for (var a = [], t = 0, d = index.knownEmail.length; t < d; t++) a.push(i + "@" + index.knownEmail[t]);
        var o = [];
        o.push(e);
        for (var r = 0,
                 d = a.length; r < d; r++) a[r].indexOf(e) > -1 && o.push(a[r]);
        return o
    },
    hideEmailTips: function () {
        $("other_email_ul").className = "hide"
    },
    createEmailTips: function (e) {
        var n = __("select_email_type", "请选择邮箱类型");
        index.updateListIndex(7, 0);
        var i = index.generateEmailTips(e),
            a = [],
            t = "",
            d = 10;
        a.push("<p>" + n + "</p>");
        for (var o = 0,
                 r = i.length; o < r && o < d; o++) {
            if (0 != o && i[o] == $("other_email").value) return void index.hideEmailTips();
            t = "emailTips_" + o,
                0 == o ? a.push("<li id=" + t + " class='hover' >" + $.html.encode(i[o]) + "</li>") : a.push("<li id=" + t + ">" + $.html.encode(i[o]) + "</li>")
        }
        $("other_email_ul").className = "other_email_ul",
            $("other_email_ul").innerHTML = a.join(" ")
    },
    showUl: function (e) {
        e && (e.className = "")
    },
    hideUl: function (e) {
        e && (e.className = "hide")
    },
    bindEmailTipsEvent: function () {
        var e = $("other_email_ul"),
            n = $("other_email");
        $.e.add(e, "mousemove",
            function (e) {
                var n = e.target;
                if ("li" == n.tagName.toLowerCase()) {
                    var i = $("emailTips_" + index.listIndex[7]);
                    i && (i.className = ""),
                        n.className = "hover",
                        index.listIndex[7] = index.getIndexFromId(n.getAttribute("id")),
                        e.stopPropagation()
                }
            }),
            $.e.add(e, "mouseout",
                function (e) {
                    "li" == e.target.tagName.toLowerCase() && (e.target.className = "", e.stopPropagation())
                }),
            $.e.add(e, "click",
                function (i) {
                    if ("li" == i.target.nodeName.toLowerCase()) {
                        n.value = $.html.decode(i.target.innerHTML),
                            e.className = "hide",
                        index.isChangingTab() || index.chkOtherEMail();
                        try {
                            $("nick").focus()
                        } catch (i) {
                        }
                        i.stopPropagation()
                    }
                }),
            $.e.add(n, "keydown",
                function (n) {
                    index.moveList($("other_email"), e, n, 7)
                })
    },
    isEnglishWord: function (e) {
        return index.enWordReg.test(e)
    },
    searchResultToMap: function (e) {
        for (var n = e,
                 i = {},
                 a = n.length,
                 t = 0; t < a; t++) {
            var d = n[t],
                o = d.split(":"),
                r = o.length;
            2 == r && (i[o[0]] = o[1])
        }
        return i
    },
    bindAreaSearchEvent: function () {
        $.e.add($("country_value"), "keyup",
            function (e) {
                var n = e.keyCode;
                n != index.keyCode.UP && n != index.keyCode.DOWN && n != index.keyCode.ENTER && n != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[4]), index.searchTimeoutId[4] = window.setTimeout(function () {
                        var e = encodeURIComponent($("country_value").value.trim()),
                            n = index.areaSearchUrl + "?type=1&word=" + e;
                        e ? index.search_area(n, $("country_ul"), 4) : (index.changeCountry(), index.country = index.noAreaStr)
                    },
                    500))
            }),
            $.e.add($("province_value"), "keyup",
                function (e) {
                    var n = e.keyCode;
                    n != index.keyCode.UP && n != index.keyCode.DOWN && n != index.keyCode.ENTER && n != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[5]), index.searchTimeoutId[5] = window.setTimeout(function () {
                            var e = encodeURIComponent($("province_value").value.trim()),
                                n = index.areaSearchUrl + "?type=2&word=" + e + "&countryid=" + index.country;
                            e ? index.search_area(n, $("province_ul"), 5) : (index.changeProvince(null, !0), index.province = index.noAreaStr)
                        },
                        500))
                }),
            $.e.add($("city_value"), "keyup",
                function (e) {
                    var n = e.keyCode;
                    n != index.keyCode.UP && n != index.keyCode.DOWN && n != index.keyCode.ENTER && n != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[6]), index.searchTimeoutId[6] = window.setTimeout(function () {
                            var e = encodeURIComponent($("city_value").value.trim()),
                                n = index.areaSearchUrl + "?type=3&word=" + e + "&countryid=" + index.country + "&provinceid=" + index.province;
                            $("city_value").value ? index.search_area(n, $("city_ul"), 6) : (index.changeCity(null, !0), index.city = index.noAreaStr)
                        },
                        500))
                })
    },
    setSelectBlurValue: function (e, n, i) {
        var a = e.getElementsByTagName("li");
        if (index.listIndex[i] >= 0) {
            var t = a[index.listIndex[i]];
            if (!t) return;
            var d = t.getAttribute("value"),
                o = t.innerHTML;
            switch (n.value = $.html.decode(o), index.updateListIndex(i, index.listIndex[i]), i) {
                case 1:
                    index.year = d,
                        index.showDate.year = index.year;
                    break;
                case 2:
                    index.month = d;
                    var r = t.getAttribute("isLeap");
                    r = r ? r : "1",
                        index.isLeap = r,
                        index.showDate.month = index.month,
                        index.showDate.isLeap = 1 != index.isLeap;
                    break;
                case 3:
                    index.day = d,
                        index.showDate.day = index.day;
                    break;
                case 4:
                    index.country = d;
                    break;
                case 5:
                    index.province = d;
                    break;
                case 6:
                    index.city = d
            }
        }
    },
    bindTimeSearchEvent: function () {
        $.e.add($("year_value"), "keyup",
            function (e) {
                var n = e.keyCode;
                n != index.keyCode.UP && n != index.keyCode.DOWN && n != index.keyCode.ENTER && n != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[1]), index.searchTimeoutId[1] = window.setTimeout(function () {
                        var e = $("year_value").value;
                        index.search_time($("year_ul"), 1, e)
                    },
                    50))
            }),
            $.e.add($("month_value"), "keyup",
                function (e) {
                    var n = e.keyCode;
                    n != index.keyCode.UP && n != index.keyCode.DOWN && n != index.keyCode.ENTER && n != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[2]), index.searchTimeoutId[2] = window.setTimeout(function () {
                            var e = $("month_value").value;
                            index.search_time($("month_ul"), 2, e)
                        },
                        50))
                }),
            $.e.add($("day_value"), "keyup",
                function (e) {
                    var n = e.keyCode;
                    n != index.keyCode.UP && n != index.keyCode.DOWN && n != index.keyCode.ENTER && n != index.keyCode.TAB && (window.clearTimeout(index.searchTimeoutId[3]), index.searchTimeoutId[3] = window.setTimeout(function () {
                            var e = $("day_value").value;
                            index.search_time($("day_ul"), 3, e)
                        },
                        50))
                })
    },
    ulToSelectArr: function (e, n) {
        switch (n) {
            case 1:
                index.yearSearchArr = [];
                break;
            case 2:
                index.monthSearchArr = [];
                break;
            case 3:
                index.daySearchArr = []
        }
        for (var i = e.getElementsByTagName("li"), a = null, t = null, d = null, o = 1, r = 0, s = i.length; r < s; r++) {
            a = i[r],
                t = a.getAttribute("value"),
                d = a.innerHTML;
            var c = {
                id: t,
                name: d
            };
            switch (n) {
                case 1:
                    index.yearSearchArr.push(c);
                    break;
                case 2:
                    o = a.getAttribute("isleap"),
                        o = o ? o : 1,
                        c.isLeap = o,
                        index.monthSearchArr.push(c);
                    break;
                case 3:
                    index.daySearchArr.push(c)
            }
        }
    },
    arrayToUl: function (e, n, i) {
        for (var a = [], t = 0, d = e.length; t < d; t++) {
            var o = e[t],
                r = o.id,
                s = o.name,
                c = "",
                l = "";
            switch (i) {
                case 1:
                    c = "year_" + t,
                        l = 0 == t ? "<li value=" + r + ' class="hover" id=' + c + ">" + s + "</li>" : "<li value=" + r + " id=" + c + ">" + s + "</li>";
                    break;
                case 2:
                    c = "month_" + t;
                    var x = e[t].isLeap;
                    l = 0 == t ? "<li value=" + r + ' class="hover" isLeap=' + x + " id=" + c + ">" + s + "</li>" : "<li value=" + r + " isLeap=" + x + " id=" + c + ">" + s + "</li>";
                    break;
                case 3:
                    c = "day_" + t,
                        l = 0 == t ? "<li value=" + r + ' class="hover" id=' + c + ">" + s + "</li>" : "<li value=" + r + " id=" + c + ">" + s + "</li>"
            }
            a.push(l)
        }
        t > 0 ? index.updateListIndex(i, 0) : index.updateListIndex(i, -1),
            n.innerHTML = a.join(" ")
    },
    search_time: function (e, n, i) {
        i = i.trim(),
            e.scrollTop = 0,
            index.selectHasSelected[n] = !1;
        var a = [],
            t = [];
        switch (n) {
            case 1:
                t = index.yearSearchArr;
                break;
            case 2:
                t = index.monthSearchArr;
                break;
            case 3:
                t = index.daySearchArr
        }
        for (var d = 0,
                 o = t.length; d < o; d++)((t[d].id + "").indexOf(i) > -1 || (t[d].name + "").indexOf(i) > -1) && a.push(t[d]);
        0 == a.length && (a = t),
            index.arrayToUl(a, e, n),
            index.showUl(e),
            index.selectListState[n] = 1
    },
    bindInputSearchEvent: function () {
        "chs" == $GLOBALS.lang && ($.e.add($("year_ul"), "scroll",
            function () {
                index.showInputSearchTips(1)
            }), $.e.add($("month_ul"), "scroll",
            function () {
                index.showInputSearchTips(2)
            }), $.e.add($("day_ul"), "scroll",
            function () {
                index.showInputSearchTips(3)
            }), $.e.add($("country_ul"), "scroll",
            function () {
                index.showInputSearchTips(4)
            }), $.e.add($("province_ul"), "scroll",
            function () {
                index.showInputSearchTips(5)
            }), $.e.add($("city_ul"), "scroll",
            function () {
                index.showInputSearchTips(6)
            }))
    },
    showInputSearchTips: function (e) {
        index.current_error_dom = "display_8";
        var n = $("inptu_search_tips"),
            i = $("inptu_search_tips_wording");
        switch (i.innerHTML = index.inputSearchTipsArray[e - 1], index.birthdayTipsShow && e < 4 && (e = 0), index.areaTipsShow && e >= 4 && (e = 0), e) {
            case 1:
                n.style.display = "block",
                    n.style.top = "-31px",
                    n.style.left = "100px",
                    n.style.width = "158px",
                    index.birthdayTipsShow = !0;
                break;
            case 2:
                n.style.display = "block",
                    n.style.top = "-31px",
                    n.style.left = "180px",
                    n.style.width = "145px",
                    index.birthdayTipsShow = !0;
                break;
            case 3:
                n.style.display = "block",
                    n.style.top = "-31px",
                    n.style.left = "250px",
                    n.style.width = "145px",
                    index.birthdayTipsShow = !0;
                break;
            case 4:
                n.style.display = "block",
                    n.style.top = "9px",
                    n.style.left = "40px",
                    n.style.width = "181px",
                    index.areaTipsShow = !0;
                break;
            case 5:
                n.style.display = "block",
                    n.style.top = "9px",
                    n.style.left = "140px",
                    n.style.width = "181px",
                    index.areaTipsShow = !0;
                break;
            case 6:
                n.style.display = "block",
                    n.style.top = "9px",
                    n.style.left = "250px",
                    n.style.width = "181px",
                    index.areaTipsShow = !0
        }
    },
    hideInputSearchTips: function () {
        index.current_error_dom = "display_9";
        var e = $("inptu_search_tips");
        e && (e.style.display = "none")
    },
    rsaEncrypt: function (e) {
        var n = "C4D23C2DB0ECC904FE0CD0CBBCDC988C039D79E1BDA8ED4BFD4D43754EC9693460D15271AB43A59AD6D0F0EEE95424F70920F2C4A08DFDF03661300047CA3A6212E48204C1BE71A846E08DD2D9F1CBDDFF40CA00C10C62B1DD42486C70A09C454293BCA9ED4E7D6657E3F62076A14304943252A88EFA416770E0FBA270A141E7",
            i = new RSAKey;
        return i.setPublic(n, "10001"),
            i.encrypt(e)
    },
    hasNoEmail: function () {
        index.changeTab(1),
            index.changeInit(),
            index.mailRegReport(1),
            index.email_to("email_to_qqmail")
    },
    mailToNumber: function () {
        index.changeTab(0),
            index.changeInit(),
            index.email_to("email_to_number_wording")
    },
    hasNoPhone: function () {
        index.changeTab(0),
            index.changeInit(),
            index.phone_to("phone_to_noPhone"),
            $.report.monitor("noPhone")
    },
    seaPhone: function () {
        index.isSeaPhone = !0,
            $("sea_phone").style.display = "block",
            $("phone_info").innerHTML = index.phoneE[4],
            $("phone_info").removeAttribute("_hover"),
            $("sea_entry").style.display = "none";
        try {
            $("sea_country_input").focus()
        } catch (e) {
        }
    },
    numberToPhone: function () {
        index.changeTab(3),
            index.changeInit(),
            $.report.monitor("number_to_phone_wording")
    },
    setBirthday: function (e) {
        for (var n = $("birthday_type_ul").getElementsByTagName("li"), i = 0; i < n.length; i++) n[i].value == e.isnongli && (index.birthType = e.isnongli, $("birthday_type_value").innerHTML = n[i].innerHTML, index.selectListIndex[0] = n[i].id.split("_")[1], index.changeYear());
        n = $("year_ul").getElementsByTagName("li");
        for (var i = 0; i < n.length; i++) n[i].value == e.year && (index.year = e.year, $("year_value").value = n[i].innerHTML, index.selectListIndex[1] = n[i].id.split("_")[1], index.changeMonth());
        n = $("month_ul").getElementsByTagName("li");
        for (var i = 0; i < n.length; i++) n[i].value == e.month && (index.month = e.month, $("month_value").value = n[i].innerHTML, index.selectListIndex[2] = n[i].id.split("_")[1], index.changeDay());
        n = $("day_ul").getElementsByTagName("li");
        for (var i = 0; i < n.length; i++) n[i].value == e.day && (index.day = e.day, $("day_value").value = n[i].innerHTML, index.selectListIndex[3] = n[i].id.split("_")[1]);
        index.birthdaySet = !0
    },
    setLocation: function (e) {
        for (var n = $("country_ul").getElementsByTagName("li"), i = 0; i < n.length; i++) n[i].value == e.country && (index.country = e.country, e.country = n[i].innerHTML, index.selectListIndex[4] = n[i].id.split("_")[1], $("country_value").value = e.country, index.changeProvince());
        n = $("province_ul").getElementsByTagName("li");
        for (var i = 0; i < n.length; i++) n[i].value == e.province && (index.province = e.province, e.province = n[i].innerHTML, index.selectListIndex[5] = n[i].id.split("_")[1], $("province_value").value = e.province, index.changeCity());
        n = $("city_ul").getElementsByTagName("li");
        for (var i = 0; i < n.length; i++) n[i].value == e.city && (index.city = e.city, e.city = n[i].innerHTML, index.selectListIndex[6] = n[i].id.split("_")[1], $("city_value").value = e.city);
        index.locationSet = !0
    },
    clickGetverima: function () {
        if (index.verimaSended) return !1;
        if (!index.checkVerified() && (0 != index.type || 1 != g_lang)) return !1;
        if (!0 === index.checkPhone()) {
            index.verimaSended = !0,
                $("getverima").className = "sended";
            var e = index.phoneSubmit;
            $.winName.set("temp_cellphone", e);
            var n = $.winName.get("type") - 0,
                i = indexType2RegType(n);
            index.hideInfo("verima_info"),
                $.report.monitor("index_send_sms"),
                $.post((0 == index.type && 1 == g_lang ? index.smsSendUrl_simpl_chs : index.smsSendUrl) + "?r=" + Math.random(), {
                        telphone: e,
                        elevel: index.initInfo.elevel,
                        regType: i,
                        nick: $("nick").value
                    },
                    function (e) {
                        switch (e.ec) {
                            case 0:
                                $.report.monitor("index_send_sms_succ"),
                                    $("verima").disabled = !1,
                                    $("verima").value = "",
                                    $("verima").focus();
                                var n = 60,
                                    i = new Date - 0;
                                $.winName.set("temp_last_send", i),
                                    $.css.hide($("verimaTip")),
                                    $("timeLeft").innerHTML = n + index.wording[0],
                                    $("getverima").title = index.wording[1],
                                    setTimeout(function () {
                                            --n,
                                                $("timeLeft").innerHTML = n + index.wording[0],
                                                n >= 1 ? setTimeout(arguments.callee, 1e3) : ($("verimaTip").innerHTML = index.verimaTip[1], $("timeLeft").innerHTML = "", index.verimaSended = !1, $("getverima").className = "", $.css.show($("verimaTip")))
                                        },
                                        1e3),
                                    index.isNeedCapt = !1;
                                break;
                            case 1:
                                index.gotoErrorPage(e.reasoncode, 0, 0);
                                break;
                            case 14:
                                index.gotoErrorPage(e.reasoncode, 0, 0);
                                break;
                            case 31:
                                index.gotoErrorPage(e.reasoncode, 0, 0);
                                break;
                            case 3:
                                index.verimaSended = !1,
                                    index.switchPhone(2);
                                break;
                            case 4:
                            case 26:
                                index.verimaSended = !1,
                                    index.ec_res = 26,
                                    $.report.monitor("reg_phone_dw_up_msg"),
                                    index.switchPhone(3, e.reasoncode);
                                break;
                            case 6:
                                index.gotoErrorPage(e.reasoncode, 0, 0);
                                break;
                            default:
                                index.gotoErrorPage(e.reasoncode, 0, 0)
                        }
                    })
        }
        return !1
    },
    checkPhone: function () {
        var e = !0,
            n = ($("phone_num").value + "").trim(),
            i = n.length;
        return i <= 0 ? (setTimeout(function () {
                index.showError("phone", "请输入有效的手机号码", !1)
            },
            0), e = !1) : isRegValidPhone(n) || "0086" != index.phoneArea || (setTimeout(function () {
                    index.showError("phone", "请输入有效的手机号码", !1)
                },
                0), e = !1),
        !0 === e && $.report.monitor("reg_phone_pv"),
            e
    },
    chkSmsVc: function () {
        return index.phoneSubmit && (index.smsVc = $("verima").value),
            26 != index.ec_res && 0 == index.type && 1 == g_lang && index.phoneSubmit && !index.smsVc.length ? ($("verima_info").innerHTML = index.verimaSended ? "验证码错误" : "请点击获取验证码", $("verima_info").className = "error", $("verima_bg").className = "bg_error", !1) : (index.hideInfo("verima_info"), !0)
    },
    switchPhone: function (e, n) {
        switch ($.css.show($("phone_box")), e + "") {
            case "3":
                $.css.hide($("sms_box")),
                    $.css.show($("up_box")),
                    15 === n ? $("up_box_reason").innerHTML = "该手机号码今日验证短信下发次数已达到上限" : $("up_box_reason").innerHTML = "该手机号码存在安全风险";
                for (var i = $("phone_num").value, a = "", t = 0; t < i.length; t++) a += 3 == t || 7 == t ? " " + i[t] : i[t];
                $("up_box_mob").innerHTML = " " + a,
                    $("submit").value = "我已发送";
                break;
            case "2":
                $.css.show($("sms_box")),
                    $.css.hide($("up_box")),
                    $("submit").value = __("index_reg_submit", "立即注册");
                break;
            default:
                0 == index.type && 1 == g_lang ? ($.css.show($("sms_box")), $.css.hide($("up_box")), $("submit").value = "立即注册") : ($.css.show($("sms_box")), $.css.hide($("up_box")), $("submit").value = __("index_reg_submit", "立即注册"))
        }
    },
    isOnePage: function () {
        return (0 == index.type || 1 == index.type) && 1 == g_lang
    },
    checkVerified: function () {
        if (!(1 != g_lang || 0 != index.type && 1 != index.type || index.codeVerified || index.isNeedCapt)) {
            var e = 1 == g_lang ? "请先进行安全验证" : "请先输入正确的验证码";
            return index.showError("code", e, !1),
                !1
        }
        return !0
    },
    showError: function (e, n, i) {
        switch (e) {
            case "code":
                !0 === index.showNewVCode() && 2 == $("code_tips_tbl").rows.length && ($("code_tips_tbl").deleteRow(1), $("code_tips_tbl").style.height = "49px"),
                    "undefined" == typeof i ? ($("code_info").className = "", $("code").className = "", $("code_info_err").className = "tips") : i ? ($("code_info").className = "ok", $("code").className = "", $("code_info_err").className = "") : ($("code_info").className = "", $("code").className = "code_ipt_error", $("code_info_err").className = ""),
                    $("code_info_err").innerHTML = $.html.encode(n),
                    n ? $.css.removeClass($("code_info_err"), "hide") : "undefined" == typeof i ? $("code_info_err").innerHTML = index.codeE[1] : $.css.addClass($("code_info_err"), "hide");
                break;
            case "phone":
                "undefined" == typeof i ? ($("phone_info").className = "tip", $("phone_num_bg").className = "bg_txt") : i ? ($("phone_info").className = "ok", $("phone_num_bg").className = "bg_txt") : ($("phone_info").className = "error", $("phone_num_bg").className = "bg_error"),
                    $("phone_info").innerHTML = $.html.encode(n)
        }
    },
    checkingSafe: !1,
    checkSafe: function () {
        if (!index.checkingSafe && !index.codeVerified && index.isOnePage() && index.chkCode()) {
            index.checkingSafe = !0;
            var e = "";
            1 == index.birthType && (e = calendar.getDate(parseInt(index.year), parseInt(index.month), parseInt(index.day), 1, parseInt(index.isLeap)));
            var n = {
                verifycode: $("code").value,
                country: index.country,
                province: index.province,
                city: index.city,
                isnongli: index.birthType,
                year: index.year,
                month: index.month,
                day: index.day,
                isrunyue: "1" == index.isLeap ? 0 : 1,
                password: index.rsaEncrypt($("password").value),
                nick: $("nick").value,
                email: 1 == index.type && $("self_email").value + (0 == index.selfType ? "@qq.com" : "@foxmail.com"),
                other_email: 2 == index.type && $("other_email").value,
                elevel: index.initInfo.elevel,
                sex: index.sex,
                qzdate: e,
                jumpfrom: index.fromId,
                telphone: index.phoneSubmit,
                tk: index.newVCodeData.ticket
            };
            n.nick = encodeURIComponent(n.nick),
                n.password = encodeURIComponent(n.password),
                n.email = encodeURIComponent(n.email),
                n.other_email = encodeURIComponent(n.other_email),
                n.csloginstatus = g.getQQnum(),
            index.ptlang && (n.ptlang = index.ptlang),
            index.ADUIN && (n.ADUIN = index.ADUIN),
            index.ADSESSION && (n.ADSESSION = index.ADSESSION);
            for (var i in index.aq_object) n[i] = index.aq_object[i];
            $.post(index.secChkUrl + "?r=" + Math.random(), n,
                function (e) {
                    if (index.current_error_dom = "sec_check_cgi_start", e) {
                        if (isd_t.push(new Date - 0), $.report.isd(isd_t), $.cookie.set("index_ec", e.ec, "zc.qq.com", "/", .5), 0 != e.ec) return window.location = "error.html?ec=" + e.ec,
                            0;
                        switch (index.initInfo.elevel = e.elevel, e.elevel + "") {
                            case "3":
                                index.switchPhone(2);
                                break;
                            case "4":
                                index.switchPhone(3);
                                break;
                            case "6":
                                window.location = "error.html?ec=" + e.ec;
                                break;
                            default:
                                index.switchPhone(1)
                        }
                        2 != e.VerifyCodeResult ? (index.showError("code", index.codeE[0], !1), index.showNewVCode()) : (index.codeVerified = !0, index.showError("code", "", !0), $("code").disabled = !0)
                    }
                    index.current_error_dom = "sec_check_cgi_end",
                        index.checkingSafe = !1
                })
        }
    },
    showNewVCode: function () {
        return index.isNewVCode.indexOf($GLOBALS.lang) != -1
    },
    initNewVCodeParam: function (e) {
        $("bday_dt").style.position = "relative",
            $("bday_dt").style.zIndex = "18889",
            $("area_dt").style.posttion = "relative",
            $("area_dt").style.zIndex = "18888",
        index.codeVerified || ("undefined" == typeof e ? index.showError("code", "请先进行安全验证") : index.showError("code", "请先进行安全验证", !1)),
            $("code_tips_tbl").className = ""
    },
    verifyImgCodeCheck: function () {
        return index.newVCodeData = capGetTicket(),
            index.newVCodeData.randstr.length > 1 && index.newVCodeData.ticket.length > 1 ? ($("code_tips_tbl").className = "", index.verifycode = index.newVCodeData.randstr, $("code").value = index.newVCodeData.randstr, !0) : (index.initNewVCodeParam(1), !1)
    },
    capRefreshCtrl: function (e) {
        capRefresh(),
            index.codeVerified = !1,
            "undefined" == typeof e ? index.initNewVCodeParam() : index.initNewVCodeParam(e)
    },
    capCB: function () {
        !index.isOnePage() && index.showNewVCode() ? index.verifyImgCodeCheck() && (index.codeVerified = !0, index.showError("code", "", !0)) : index.checkSafe()
    },
    checkNickAndPwd: function () {
        var e = "",
            n = "";
        1 == index.type ? (e = $("self_email").value, n = e + index.selfType == 0 ? "qq.com" : "foxmail.com") : 2 == index.type ? (e = $("other_email").value, n = e, e = e.split("@"), e = void 0 == e[0] ? "" : e[0]) : e = $("nick").value;
        var i = $("password").value;
        return e != i && n != i
    },
    countDownResendMsg: function () {
        return null != index.countDownObj && "undefined" != typeof index.countDownObj || (index.countDownObj = window.setInterval("index.countDownResendMsg()", 1e3)),
        "chs" == $GLOBALS.lang && $.css.hide($("up_msg_err")),
            $("submit_box").style.height = "",
            index.countDownSec <= 0 ? (window.clearInterval(index.countDownObj), index.countDownSec = 5, index.countDownObj = null, index.switchPhone(3), $("submit").className = "", $("submit").disabled = !1, $("submit_box").style.height = "120px", "chs" == $GLOBALS.lang && ($("up_msg_err").innerHTML = "验证失败，请确认您编辑的短信和发送地址是否正确", $.css.show($("up_msg_err"))), !1) : ($("submit").className = "disabled", $("submit").disabled = !0, $("submit").value = "我已发送(" + index.countDownSec + "s)", 1 == index.countDownSec && index.submit(), index.countDownSec--, !0)
    },
    startRegStep: function () {
        var e = index.chkAgree();
        e = index.chkBirthday() && e,
            e = index.chkArea() && e,
            e = index.chkPassword() && e,
            e = index.chkPasswordAgain() && e,
            e = index.chkNick() && e,
        "chs" === $GLOBALS.lang && (2 === index.type ? index.phoneSubmit = "" : (e = index.chkPhoneNum() && e, e = index.chkSmsVc() && e)),
        e && (index.isNeedCapt ? index.showNextStep() : index.submit())
    },
    showNextStep: function () {
        0 == index.type && 1 == g_lang && (window.location.href = "check.html")
    },
    gotoErrorPage: function (e, n, i) {
        var a = (n > 0 ? "&lc=" + n : "") + (i > 0 ? "&ls=" + i : "");
        switch (e + "") {
            case "20":
                window.location.href = "error.html?ec=no_mob" + a;
                break;
            case "23":
            default:
                window.location.href = "error.html?ec=deny" + a
        }
    }
};
Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
    var n = this.length >>> 0,
        i = Number(arguments[1]) || 0;
    for (i = i < 0 ? Math.ceil(i) : Math.floor(i), i < 0 && (i += n); i < n; i++) if (i in this && this[i] === e) return i;
    return -1
}),
"cht" == $GLOBALS.lang && (index.knownEmail = ["yahoo.com.tw", "yahoo.com.hk", "hotmail.com.hk", "hotmail.com.tw"].concat(index.knownEmail)),
    index.current_error_dom = "index_begin",
    index.init(),
    isd_t.push(new Date - 0),
"chs" === $GLOBALS.lang && !
    function () {
        var e = {
                nick: "nick",
                nav_3: "phone",
                nav_2: "email",
                email_info: "other_mail",
                password: "password ",
                password_again: "password_again",
                sex_1: "sex_1",
                sex_2: "sex_2",
                brithday_1: "brithday_1",
                year_value: "year_value",
                month_value: "month_value",
                day_value: "day_value",
                country_value: "country_value",
                province_value: "province_value",
                city_value: "city_value",
                code_value: "code_value",
                code_ipt: "code_ipt"
            },
            n = {
                none: 0,
                nick: 1,
                nav_3: 2,
                nav_2: 3,
                email_info: 4,
                password: 5,
                password_again: 6,
                sex_1: 7,
                sex_2: 8,
                brithday_1: 9,
                year_value: 10,
                month_value: 11,
                day_value: 12,
                country_value: 13,
                province_value: 14,
                city_value: 15,
                code_value: 16,
                code_ipt: 17,
                other: 18
            },
            i = function () {
                var e = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                    n = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                    a = /[^-+\dA-Z]/g,
                    t = function (e, n) {
                        for (e = String(e), n = n || 2; e.length < n;) e = "0" + e;
                        return e
                    };
                return function (d, o, r) {
                    var s = i;
                    if (1 != arguments.length || "[object String]" != Object.prototype.toString.call(d) || /\d/.test(d) || (o = d, d = void 0), d = d ? new Date(d) : new Date, isNaN(d)) throw SyntaxError("invalid date");
                    o = String(s.masks[o] || o || s.masks["default"]),
                    "UTC:" == o.slice(0, 4) && (o = o.slice(4), r = !0);
                    var c = r ? "getUTC" : "get",
                        l = d[c + "Date"](),
                        x = d[c + "Day"](),
                        _ = d[c + "Month"](),
                        h = d[c + "FullYear"](),
                        u = d[c + "Hours"](),
                        m = d[c + "Minutes"](),
                        p = d[c + "Seconds"](),
                        y = d[c + "Milliseconds"](),
                        g = r ? 0 : d.getTimezoneOffset(),
                        f = {
                            d: l,
                            dd: t(l),
                            ddd: s.i18n.dayNames[x],
                            dddd: s.i18n.dayNames[x + 7],
                            m: _ + 1,
                            mm: t(_ + 1),
                            mmm: s.i18n.monthNames[_],
                            mmmm: s.i18n.monthNames[_ + 12],
                            yy: String(h).slice(2),
                            yyyy: h,
                            h: u % 12 || 12,
                            hh: t(u % 12 || 12),
                            H: u,
                            HH: t(u),
                            M: m,
                            MM: t(m),
                            s: p,
                            ss: t(p),
                            l: t(y, 3),
                            L: t(y > 99 ? Math.round(y / 10) : y),
                            t: u < 12 ? "a" : "p",
                            tt: u < 12 ? "am" : "pm",
                            T: u < 12 ? "A" : "P",
                            TT: u < 12 ? "AM" : "PM",
                            Z: r ? "UTC" : (String(d).match(n) || [""]).pop().replace(a, ""),
                            o: (g > 0 ? "-" : "+") + t(100 * Math.floor(Math.abs(g) / 60) + Math.abs(g) % 60, 4),
                            S: ["th", "st", "nd", "rd"][l % 10 > 3 ? 0 : (l % 100 - l % 10 != 10) * l % 10]
                        };
                    return o.replace(e,
                        function (e) {
                            return e in f ? f[e] : e.slice(1, e.length - 1)
                        })
                }
            }();
        i.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        },
            i.i18n = {
                dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            },
            Date.prototype.format = function (e, n) {
                return i(this, e, n)
            };
        var a = function (e) {
                return {
                    eventID: e,
                    recordCnt: 0,
                    opsStartTime: (new Date).getTime(),
                    xSeries: "",
                    ySeries: "",
                    elementIDSeries: "",
                    clickGapSeries: "",
                    browserHeightSeries: "",
                    browserWidthSeries: "",
                    gapLog: ""
                }
            },
            t = new Date,
            d = {
                xSeries: "xSeries",
                ySeries: "ySeries",
                elementIDSeries: "elementIDSeries",
                clickGapSeries: "clickGapSeries",
                browserHeightSeries: "browserHeightSeries",
                browserWidthSeries: "browserWidthSeries",
                gapLog: "gapLog"
            },
            o = new a(0),
            r = new a(1),
            s = new a(2),
            c = new a(3);
        dataSet = [o, r, s, c],
            dataArr0 = new Array,
            dataArr1 = new Array,
            dataArr2 = new Array,
            dataArr3 = new Array,
            dataArrSet = [dataArr0, dataArr1, dataArr2, dataArr3];
        var l = new Array,
            _ = new Date,
            h = !0,
            u = {
                getEvent: function (e) {
                    return e || window.event
                },
                addEventHandler: function (e, n, i) {
                    window.attachEvent ? e.attachEvent("on" + n, i) : window.addEventListener && e.addEventListener(n, i)
                },
                removeEventHandler: function (e, n, i) {
                    window.detachEvent ? e.detachEvent("on" + n, i) : window.removeEventListener && e.removeEventListener(n, i)
                },
                getMousePoint: function (e) {
                    var n = y = 0,
                        i = document.documentElement,
                        a = document.body;
                    return e || (e = window.event),
                        window.pageYoffset ? (n = window.pageXOffset, y = window.pageYOffset) : (n = (i && i.scrollLeft || a && a.scrollLeft || 0) - (i && i.clientLeft || a && a.clientLeft || 0), y = (i && i.scrollTop || a && a.scrollTop || 0) - (i && i.clientTop || a && a.clientTop || 0)),
                        n += e.clientX,
                        y += e.clientY,
                        {
                            x: n,
                            y: y
                        }
                },
                getBrowser: function () {
                    var e = 0,
                        n = 0;
                    return window.innerWidth ? e = window.innerWidth : document.body && document.body.clientWidth && (e = document.body.clientWidth),
                        window.innerHeight ? n = window.innerHeight : document.body && document.body.clientHeight && (n = document.body.clientHeight),
                    document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth && (n = document.documentElement.clientHeight, e = document.documentElement.clientWidth),
                        {
                            winWidth: e,
                            winHeight: n
                        }
                },
                isIE: function () {
                    return !window.addEventListener && ( !!window.attachEvent || void 0)
                },
                bindMouseClickEvent: function (i) {
                    document.onmousemove = function (e) {
                        e = e || window.event;
                        var n = new Date,
                            i = n - _;
                        i > 200 && (_ = new Date, u.addTargetData(e, 0, new a(0), 0, 0))
                    },
                        document.onmouseout = function (e) {
                            e = e || window.event;
                            var n = new Date,
                                i = n - _;
                            i > 200 && (_ = new Date, u.addTargetData(e, 0, new a(0), 0, 0))
                        },
                        document.onmouseover = function (e) {
                            e = e || window.event;
                            var n = new Date,
                                i = n - _;
                            i > 200 && (_ = new Date, u.addTargetData(e, 0, new a(0), 0, 0))
                        },
                        document.onclick = function (i) {
                            if (i = i || window.event, i.target = i.srcElement ? i.srcElement : i.target, l.length > 0) var t = new Date - l[l.length - 1];
                            i.target && e[i.target.id] ? u.addTargetData(i, 1, new a(1), n[i.target.id], t) : u.addTargetData(i, 1, new a(1), n.none, t)
                        },
                        document.ondblclick = function (i) {
                            i = i || window.event,
                                i.target = i.srcElement ? i.srcElement : i.target;
                            var t, d = u.isIE();
                            d ? (t = new Date - l[l.length - 1], l.pop(), dataArr1.pop()) : (t = new Date - l[l.length - 2], l.pop(), l.pop(), dataArr1.pop(), dataArr1.pop()),
                                i.target && "undefined" != typeof e[i.target.id] ? u.addTargetData(i, 2, new a(2), n[i.target.id], t) : u.addTargetData(i, 2, new a(2), n.none, t)
                        },
                        document.oncontextmenu = function (i) {
                            i = i || window.event,
                                i.target = i.srcElement ? i.srcElement : i.target;
                            var t = new Date - l[l.length - 1];
                            l.pop(),
                                dataArr1.pop(),
                                i.target && "undefined" != typeof e[i.target.id] ? u.addTargetData(i, 3, new a(3), n[i.target.id], t) : u.addTargetData(i, 3, new a(3), n.none, t)
                        },
                        document.onmousedown = function (e) {
                            e = e || window.event,
                                l.push(new Date)
                        },
                        document.onmouseup = function (e) {
                            e = e || window.event
                        }
                },
                addTargetData: function (e, n, i, a, d) {
                    e = e || window.event,
                        point = u.getMousePoint(e),
                        i.recordCnt += 1,
                        i.xSeries = point.x,
                        i.ySeries = point.y,
                        i.elementIDSeries = a,
                        i.clickGapSeries = d,
                        i.browserHeightSeries = u.getBrowser().winHeight,
                        i.browserWidthSeries = u.getBrowser().winWidth,
                        i.gapLog = (new Date).getTime() - t,
                        u.addTargetArrData(n, i)
                },
                addTargetArrData: function (e, n) {
                    switch (e) {
                        case 0:
                            dataArr0.push(n);
                            break;
                        case 1:
                            dataArr1.push(n);
                            break;
                        case 2:
                            dataArr2.push(n);
                            break;
                        case 3:
                            dataArr3.push(n)
                    }
                },
                dataToStrity: function (e, n) {
                    var i = new a(n);
                    if (!(e.length < 1)) {
                        for (var t = 0; t < e.length; t++) for (var o in e[t]) 0 != t || d[o] || (i[o] = e[t][o]),
                        "undefined" != typeof d[o] && (0 != t ? (i[o] += "-", i[o] += e[t][o].toString()) : i[o] = e[t][o].toString());
                        i.recordCnt = e.length;
                        var r = "|";
                        for (x in i) r += i[x],
                            r += "|";
                        return r
                    }
                },
                initData: function (e) {
                    e.recordCnt = 0,
                        e.opsStartTime = (new Date).getTime()
                },
                reportAq: function (e) {
                    return
                },
                init: function () {
                    u.bindMouseClickEvent(),
                    "chs" == $GLOBALS.lang && $.e.add($("haomaClose"), "click",
                        function (e) {
                            index.hideHaomaBox(),
                                e.stopPropagation()
                        }),
                        $.e.add($("submit"), "click",
                            function (e) {
                                if (h) {
                                    h = !1;
                                    var n = dataArr0.length,
                                        i = parseInt(n / 50),
                                        a = n % 50;
                                    if (i > 0) for (var d = 0; d < i; d++) u.reportAq(u.dataToStrity(dataArr0.slice(50 * d, 50 * d + 50), 0));
                                    a > 0 && u.reportAq(u.dataToStrity(dataArr0.slice(50 * i, n - 1), 0)),
                                    dataArr1.length && u.reportAq(u.dataToStrity(dataArr1, 1)),
                                    dataArr2.length && u.reportAq(u.dataToStrity(dataArr2, 2)),
                                    dataArr3.length && u.reportAq(u.dataToStrity(dataArr3, 3)),
                                        t = (new Date).getTime(),
                                        l.length = 0,
                                        _ = new Date;
                                    for (var o = 0; o < dataSet.length; o++) u.initData(dataSet[o]);
                                    for (var r = 0; r < dataArrSet.length; r++) dataArrSet[r].length = 0
                                }
                            })
                }
            };
        u.init()
    }();
//# sourceMappingURL=index.js.map
