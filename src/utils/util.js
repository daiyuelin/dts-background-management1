/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-23 13:33:50
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2022-04-24 10:45:56
 */

// 获取当前系统的语言
export function getLangFromUserAgent() {
    let LANGS = ['zh-CN', 'en', 'zh-rTW']
    // eslint-disable-next-line one-var
    var _userAgent = window.navigator.userAgent.toUpperCase(),
        _lang = 'en'

    for (var i = 0; i < LANGS.length; i++) {
        if (_userAgent.indexOf(LANGS[i].toUpperCase()) != -1) {
            _lang = LANGS[i]
            break
        }
    }
    return _lang
}

export function useTranslate(i18n) {
    let a = function (...vars) {
        // 根据手机语言环境对应显示中文还是英文
        let _lang = getLangFromUserAgent();
        if (vars.length === 1) {
            if (_lang === "en") {
                return i18n["en-US"][vars[0]];
            } else {
                return i18n["zh-CN"][vars[0]];
            }
        } else {
            if (_lang === "en") {
                return i18n["en-US"][vars[0]]([vars[1]]);
            } else {
                return i18n["zh-CN"][vars[0]]([vars[1]]);
            }
        }
    }
    return a
}
