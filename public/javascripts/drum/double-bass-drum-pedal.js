/*ion.sound({
    sounds: [
        {
            name: "china1"
        },
        {
            name: "notify_sound",
            volume: 0.2
        },
        {
            name: "alert_sound",
            volume: 0.3,
            preload: false
        }
    ],
    volume: 0.5,
    path: "sounds/",
    preload: true
});*/

//var china1 = new Audio('./sounds/china1.ogg');
function volumeUp() {
    requestAnimationFrame(volumeUp),
    now = Date[_0xfe73[14]](),
    delta = now - then,
    delta > interval && (then = now - delta % interval,
    Mvol > Lvol && (Lvol += MvolAdd),
    Mvol > Rvol && (Rvol += MvolAdd),
    Mvol > KLvol && (KLvol += MvolAdd),
    Mvol > KRvol && (KRvol += MvolAdd))
}
function MM_jumpMenu(_0x2331x10, _0x2331x11, _0x2331x12) {
    eval(_0x2331x10 + _0xfe73[17] + _0x2331x11[_0xfe73[20]][_0x2331x11[_0xfe73[19]]][_0xfe73[18]] + _0xfe73[21]),
    _0x2331x12 && (_0x2331x11[_0xfe73[19]] = 0)
}
function resetVol() {
    document[_0xfe73[37]](_0xfe73[36])[_0xfe73[18]] = _0xfe73[38],
    document[_0xfe73[37]](_0xfe73[39])[_0xfe73[18]] = _0xfe73[40],
    document[_0xfe73[37]](_0xfe73[42])[_0xfe73[41]] = _0xfe73[38],
    document[_0xfe73[37]](_0xfe73[43])[_0xfe73[41]] = _0xfe73[40],
    Mdyn = .25,
    Mvol = 1,
    MvolMin = .25,
    MvolAdd = .05,
    MvolHelp = .6,
    Lvol = 1,
    Rvol = 1,
    KLvol = 1,
    KRvol = 1
}
function updateVolumeSet() {
    MvolMin = Mvol / 2 - Mdyn * Mvol,
    MvolAdd = (Mvol - MvolMin) / 15,
    MvolHelp = Mvol - 8 * MvolAdd
}
function updateVolume(e) {
    document[_0xfe73[37]](_0xfe73[42])[_0xfe73[41]] = e,
    Mvol = e / 100,
    updateVolumeSet(),
    Lvol = Mvol,
    Rvol = Mvol,
    KLvol = Mvol,
    KRvol = Mvol
}
function updateDynamics(e) {
    document[_0xfe73[37]](_0xfe73[43])[_0xfe73[41]] = e,
    Mdyn = e / 200,
    updateVolumeSet()
}
function strokeL(e, f) {
    var x = document[_0xfe73[37]](_0xfe73[44]);
    x[_0xfe73[47]][_0xfe73[46]](x[_0xfe73[45]]),
    void x[_0xfe73[48]],
    x[_0xfe73[47]][_0xfe73[50]](_0xfe73[49] + f),
    Lpos = e,
    Lvol = MvolMin
}
function strokeR(e, f) {
    var x = document[_0xfe73[37]](_0xfe73[51]);
    x[_0xfe73[47]][_0xfe73[46]](x[_0xfe73[45]]),
    void x[_0xfe73[48]],
    x[_0xfe73[47]][_0xfe73[50]](_0xfe73[52] + f),
    Rpos = e,c
    Rvol = MvolMin
}
function swing(e, f) {
    var x = document[_0xfe73[37]](e);
    x[_0xfe73[47]][_0xfe73[46]](f),
    void x[_0xfe73[48]],
    x[_0xfe73[47]][_0xfe73[50]](f)
}
function kikR() {
    console.log('Right');
    //china1.play();
    //ion.sound.play("tap");
    var e = document[_0xfe73[37]](_0xfe73[53]);
    e[_0xfe73[47]][_0xfe73[46]](_0xfe73[54]),
    void e[_0xfe73[48]],
    e[_0xfe73[47]][_0xfe73[50]](_0xfe73[54]);
    var f = document[_0xfe73[37]](_0xfe73[55]);
    f[_0xfe73[47]][_0xfe73[46]](_0xfe73[56]),
    void f[_0xfe73[48]],
    f[_0xfe73[47]][_0xfe73[50]](_0xfe73[56]),
    KRvol = MvolMin + 3 * MvolAdd
}
function kikL() {
    var e = document[_0xfe73[37]](_0xfe73[57]);
    e[_0xfe73[47]][_0xfe73[46]](_0xfe73[54]),
    void e[_0xfe73[48]],
    e[_0xfe73[47]][_0xfe73[50]](_0xfe73[54]);
    var f = document[_0xfe73[37]](_0xfe73[58]);
    f[_0xfe73[47]][_0xfe73[46]](_0xfe73[56]),
    void f[_0xfe73[48]],
    f[_0xfe73[47]][_0xfe73[50]](_0xfe73[56]),
    KLvol = MvolMin + 3 * MvolAdd
}
function keysReset() {
    for (var e = 65; e < keys[_0xfe73[5]]; e++)
        keys[e][2] = 0;
    for (var f = document[_0xfe73[60]](_0xfe73[59]), e = 0; e < f[_0xfe73[5]]; ++e)
        f[e][_0xfe73[41]] = _0xfe73[61];
    elemToChange = null
}
function fadeIn(e, f) {
    var x = e[_0xfe73[70]]
      , _ = 25 / (f || 300);
    x[_0xfe73[71]] = x[_0xfe73[71]] || 0,
    x[_0xfe73[72]] = _0xfe73[73],
    function o() {
        (x[_0xfe73[71]] = parseFloat(x[_0xfe73[71]]) + _) > 1 ? x[_0xfe73[71]] = 1 : setTimeout(o, 25)
    }()
}
function fadeOut(e, f) {
    var x = e[_0xfe73[70]]
      , _ = 25 / (f || 300);
    x[_0xfe73[71]] = x[_0xfe73[71]] || 1,
    function o() {
        (x[_0xfe73[71]] -= _) < 0 ? x[_0xfe73[72]] = _0xfe73[74] : setTimeout(o, 25)
    }()
}
function clearSet() {
    for (var e = 0; e < kslist[_0xfe73[5]]; ++e)
        kslist[e][_0xfe73[47]][_0xfe73[46]](_0xfe73[82])
}
function rollover(e) {
    var f = document[_0xfe73[37]](_0xfe73[109]);
    f[_0xfe73[47]][_0xfe73[46]](f[_0xfe73[45]]),
    f[_0xfe73[47]][_0xfe73[50]](e)
}
function resizing() {
    var e = document[_0xfe73[114]][_0xfe73[113]] || document[_0xfe73[65]][_0xfe73[113]] || window[_0xfe73[115]];
    if (980 > e) {
        document[_0xfe73[37]](_0xfe73[119])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 57.96) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[120])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 57.96) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[28])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 8.67) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[29])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 10.61) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[121])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 5.61) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[122])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 14.49) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[123])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 7.75) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[32])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 14.69) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[124])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 5.92) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[53])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 8.57) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[55])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 4.49) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[57])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 8.57) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[58])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 4.49) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[44])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 36.73) + _0xfe73[118]),
        document[_0xfe73[37]](_0xfe73[51])[_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 36.73) + _0xfe73[118]);
        for (var f = document[_0xfe73[60]](_0xfe73[125]), x = 0; x < f[_0xfe73[5]]; ++x)
            f[x][_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 9.8) + _0xfe73[118]);
        for (var _ = document[_0xfe73[60]](_0xfe73[126]), x = 0; x < _[_0xfe73[5]]; ++x)
            _[x][_0xfe73[79]](_0xfe73[70], _0xfe73[116] + Math[_0xfe73[117]](e / 100 * 7.35) + _0xfe73[118])
    } else {
        document[_0xfe73[37]](_0xfe73[119])[_0xfe73[79]](_0xfe73[70], _0xfe73[127]),
        document[_0xfe73[37]](_0xfe73[120])[_0xfe73[79]](_0xfe73[70], _0xfe73[127]),
        document[_0xfe73[37]](_0xfe73[28])[_0xfe73[79]](_0xfe73[70], _0xfe73[128]),
        document[_0xfe73[37]](_0xfe73[29])[_0xfe73[79]](_0xfe73[70], _0xfe73[129]),
        document[_0xfe73[37]](_0xfe73[121])[_0xfe73[79]](_0xfe73[70], _0xfe73[130]),
        document[_0xfe73[37]](_0xfe73[122])[_0xfe73[79]](_0xfe73[70], _0xfe73[131]),
        document[_0xfe73[37]](_0xfe73[123])[_0xfe73[79]](_0xfe73[70], _0xfe73[132]),
        document[_0xfe73[37]](_0xfe73[32])[_0xfe73[79]](_0xfe73[70], _0xfe73[133]),
        document[_0xfe73[37]](_0xfe73[124])[_0xfe73[79]](_0xfe73[70], _0xfe73[134]),
        document[_0xfe73[37]](_0xfe73[53])[_0xfe73[79]](_0xfe73[70], _0xfe73[135]),
        document[_0xfe73[37]](_0xfe73[55])[_0xfe73[79]](_0xfe73[70], _0xfe73[136]),
        document[_0xfe73[37]](_0xfe73[57])[_0xfe73[79]](_0xfe73[70], _0xfe73[135]),
        document[_0xfe73[37]](_0xfe73[58])[_0xfe73[79]](_0xfe73[70], _0xfe73[136]),
        document[_0xfe73[37]](_0xfe73[44])[_0xfe73[79]](_0xfe73[70], _0xfe73[137]),
        document[_0xfe73[37]](_0xfe73[51])[_0xfe73[79]](_0xfe73[70], _0xfe73[137]);
        for (var f = document[_0xfe73[60]](_0xfe73[125]), x = 0; x < f[_0xfe73[5]]; ++x)
            f[x][_0xfe73[79]](_0xfe73[70], _0xfe73[138]);
        for (var _ = document[_0xfe73[60]](_0xfe73[126]), x = 0; x < _[_0xfe73[5]]; ++x)
            _[x][_0xfe73[79]](_0xfe73[70], _0xfe73[139])
    }
}
function keysDefault() {
    keys[81] = [null, _0xfe73[179], 0],
    keys[87] = [null, _0xfe73[180], 0],
    keys[69] = [null, _0xfe73[181], 1],
    keys[82] = [null, _0xfe73[52], 5],
    keys[84] = [null, _0xfe73[182], 9],
    keys[89] = [null, _0xfe73[183], 11],
    keys[85] = [null, _0xfe73[184], 12],
    keys[73] = [null, _0xfe73[185], 14],
    keys[79] = [null, _0xfe73[186], 17],
    keys[80] = [null, _0xfe73[187], 0],
    keys[65] = [null, _0xfe73[188], 0],
    keys[83] = [null, _0xfe73[90], 0],
    keys[68] = [null, _0xfe73[189], 4],
    keys[70] = [null, _0xfe73[190], 6],
    keys[71] = [null, _0xfe73[191], 10],
    keys[72] = [null, _0xfe73[192], 13],
    keys[74] = [null, _0xfe73[193], 15],
    keys[75] = [null, _0xfe73[194], 16],
    keys[76] = [null, _0xfe73[49], 0],
    keys[90] = [null, _0xfe73[195], 0],
    keys[88] = [null, _0xfe73[196], 2],
    keys[65] = [null, _0xfe73[188], 2],
    keys[67] = [null, _0xfe73[197], 18],
    keys[86] = [null, _0xfe73[198], 8],
    keys[66] = [null, _0xfe73[199], 19],
    keys[78] = [null, _0xfe73[200], 7],
    keys[77] = [null, _0xfe73[201], 3];
    for (var e = 65; e < keys[_0xfe73[5]]; e++)
        0 != keys[e][2] && (document[_0xfe73[37]](_0xfe73[67] + keysPos[keys[e][2]])[_0xfe73[41]] = keys[e][1]);
    elemToChange = null
}
function stroke(e, f) {
    e == _0xfe73[77] ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[28], {
        volume: Mvol
    }),
    strokeL(e, keysPos[e]),
    swing(_0xfe73[28], _0xfe73[202])) : e == _0xfe73[203] ? e != Lpos && MvolHelp > Lvol ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[26], {
        volume: Rvol
    }),
    strokeR(3, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[26], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[204] ? e != Rpos && MvolHelp > Rvol ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[26], {
        volume: Lvol
    }),
    strokeL(2, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[26], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : e == _0xfe73[205] ? Lpos >= e || Rpos > e && Lvol >= MvolHelp ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[142], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[142], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : e == _0xfe73[206] ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[29], {
        volume: Mvol
    }),
    Lpos >= e || Rpos > e && Lvol >= MvolHelp ? strokeL(e, keysPos[e]) : strokeR(e, keysPos[e]),
    swing(_0xfe73[29], _0xfe73[202])) : e == _0xfe73[207] ? Lpos >= e || Rpos > e && Lvol >= MvolHelp ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[143], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : f ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[143], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[142], {
        volume: Rvol
    }),
    strokeR(e, keysPos[4])) : e == _0xfe73[208] ? e != Lpos && MvolHelp > Lvol ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[141], {
        volume: Rvol
    }),
    strokeR(8, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[141], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[209] ? e != Rpos && MvolHelp > Rvol ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[141], {
        volume: Lvol
    }),
    strokeL(7, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[141], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : e == _0xfe73[210] ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[27], {
        volume: Mvol
    }),
    e >= Rpos || e > Lpos && Rvol >= MvolHelp ? strokeR(e, keysPos[e]) : strokeL(e, keysPos[e]),
    swing(_0xfe73[121], _0xfe73[202])) : e == _0xfe73[211] ? e >= Rpos || e > Lpos && Rvol >= MvolHelp ? f ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[144], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[143], {
        volume: Rvol
    }),
    strokeR(e, keysPos[6])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[144], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[212] ? e >= Rpos || e > Lpos && Rvol >= MvolHelp ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[30], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[30], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[213] ? (e >= Rpos || e > Lpos && Rvol >= MvolHelp ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[31], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[31], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])),
    swing(_0xfe73[122], _0xfe73[214])) : e == _0xfe73[215] ? e >= Rpos || e > Lpos && Rvol >= MvolHelp ? f ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[145], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[144], {
        volume: Rvol
    }),
    strokeR(e, keysPos[10])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[145], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[216] ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[28], {
        volume: Mvol
    }),
    e >= Rpos || e > Lpos && Rvol >= MvolHelp ? strokeR(e, keysPos[e]) : strokeL(e, keysPos[e]),
    swing(_0xfe73[123], _0xfe73[202])) : e == _0xfe73[217] ? e >= Rpos || e > Lpos && Rvol >= MvolHelp ? f ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[146], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[145], {
        volume: Rvol
    }),
    strokeR(e, keysPos[13])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[146], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[218] ? e >= Rpos || e > Lpos && Rvol >= MvolHelp ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[146], {
        volume: Rvol
    }),
    strokeR(e, keysPos[e])) : (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[146], {
        volume: Lvol
    }),
    strokeL(e, keysPos[e])) : e == _0xfe73[219] ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[32], {
        volume: Mvol
    }),
    strokeR(e, keysPos[e]),
    swing(_0xfe73[32], _0xfe73[220])) : e == _0xfe73[221] ? (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[140], {
        volume: KRvol
    }),
    kikR()) : e == _0xfe73[222] && (ion[_0xfe73[34]][_0xfe73[93]](_0xfe73[140], {
        volume: KLvol
    }),
    kikL())
}
var _0xfe73 = ["use strict", "ms", "moz", "webkit", "o", "length", "requestAnimationFrame", "RequestAnimationFrame", "cancelAnimationFrame", "CancelAnimationFrame", "CancelRequestAnimationFrame", 
"getTime", "max", "setTimeout", "now", "href", "location", ".location='", "value", "selectedIndex", "options", 
"'", "onload", "onresize", "match", "userAgent", "hihat2", "splash2", "crash1", "crash2", "bell2", 
"ride3", "china1", "/sounds/drum/", "sound", "/sounds/drum/", "slider1", "getElementById", "100", "slider2", "50",
"innerHTML", "out1", "out2", "Lstick", "className", "remove", "classList", "offsetWidth", "L", "add",
"Rstick", "R", "pedalkik1", "hitPedal", "beaterkik1", "hitBeater", "pedalkik2", "beaterkik2", "key-led", "getElementsByClassName",
"&nbsp;", "onkeydown", "keyCode", "target", "body", "preventDefault", "DS", " is already assigned to ", "onkeyup", "style",
"opacity", "display", "block", "none", "onclick", "settings", "1", "visibility:visible", "setAttribute", "drum-menu-icon", 
"key-set", "key-red", "drum-game-menu", "drum-menu-hidden", "drum-menu-out", "onmouseover", "stopPropagation", "id", "getAttribute", "S",
 "reset", "default", "play", "key-settings", "close", "drum-settings", "close2", "vol-settings", "sets", "visibility:hidden",
  "keys", "volume", "visibility", "hidden", "visible", "drum-menu-in", "drum-set", "onmouseout", "virtual-drummer-icon", "drum-games-button", 
  "drum-games-zoom", "double-pedal", "clientWidth", "documentElement", "innerWidth", "height:", "round", "px", "online-drum-game", "drumset", 
  "splash1", "ride1", "crash3", "hihat1", "virtual-games-drums", "virtual-games-cymbals", "height:568px", "height:85px", "height:104px", "height:55px", 
  "height:142px", "height:76px", "height:144px", "height:58px", "height:84px", "height:44px", "height:360px", "height:96px", "height:72px", "kik",
   "snare1", "tom1", "tom2", "tom3", "tom4", "tom5", "/sounds/drum/", "/sounds/drum/", "onmousedown", "crash1-touch", 
   "crash2-touch", "splash1-touch", "bell1-touch", "ride1-touch", "crash3-touch", "tom1-touch", "tom2-touch", "tom3-touch", "tom4-touch", "tom5-touch",
    "china1-touch", "hihat1L-touch", "hihat1R-touch", "snare1L-touch", "snare1R-touch", "kik1-touch", "kik2-touch", "kik3-touch", "kik4-touch", "kik5-touch", 
    "hihat1L", "hihat1R", "snare1L", "snare1R", "bell1", "tom6", "kik1", "kik2", "Q", "W",
     "E", "T", "Y", "U", "I", "O", "P", "A", "D", "F",
      "G", "H", "J", "K", "Z", "X", "C", "V", "B", "N", "M", "hitCrash", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "hitRide", "13", "14", "15", "16", "17", "hitChina", "18", "19"];
_0xfe73[0],
function() {
    for (var e = 0, f = [_0xfe73[1], _0xfe73[2], _0xfe73[3], _0xfe73[4]], x = 0; x < f[_0xfe73[5]] && !window[_0xfe73[6]]; ++x)
        window[_0xfe73[6]] = window[f[x] + _0xfe73[7]],
        window[_0xfe73[8]] = window[f[x] + _0xfe73[9]] || window[f[x] + _0xfe73[10]];
    window[_0xfe73[6]] || (window[_0xfe73[6]] = function(f) {
        var x = (new Date)[_0xfe73[11]]()
          , _ = Math[_0xfe73[12]](0, 16 - (x - e))
          , o = window[_0xfe73[13]](function() {
            f(x + _)
        }, _);
        return e = x + _,
        o
    }
    ),
    window[_0xfe73[8]] || (window[_0xfe73[8]] = function(e) {
        clearTimeout(e)
    }
    )
}();
var fps = 50, now, then = Date[_0xfe73[14]](), interval = 1e3 / fps, delta;
volumeUp(),
window != top && (top[_0xfe73[16]][_0xfe73[15]] = window[_0xfe73[16]][_0xfe73[15]]),
window[_0xfe73[22]] = function() {
    resizing(),
    keysDefault(),
    resetVol()
}
,
window[_0xfe73[23]] = function() {
    resizing()
}
;
var isIE = !!navigator[_0xfe73[25]][_0xfe73[24]](/Trident/g) || !!navigator[_0xfe73[25]][_0xfe73[24]](/MSIE/g);
isIE ? ion[_0xfe73[34]]({
    sounds: [{
        name: _0xfe73[26]
    }, {
        name: _0xfe73[27]
    }, {
        name: _0xfe73[28]
    }, {
        name: _0xfe73[29]
    }, {
        name: _0xfe73[30]
    }, {
        name: _0xfe73[31]
    }, {
        name: _0xfe73[32]
    }],
    path: _0xfe73[33],
    preload: !0,
    multiplay: !0
}) : ion[_0xfe73[34]]({
    sounds: [{
        name: _0xfe73[26]
    }, {
        name: _0xfe73[27]
    }, {
        name: _0xfe73[28]
    }, {
        name: _0xfe73[29]
    }, {
        name: _0xfe73[30]
    }, {
        name: _0xfe73[31]
    }, {
        name: _0xfe73[32]
    }],
    path: _0xfe73[35],
    preload: !0,
    multiplay: !0
});



/*
ion.sound({
    sounds: [
        {
            name: "my_cool_sound"
        },
        {
            name: "notify_sound",
            volume: 0.2
        },
        {
            name: "tap",
            volume: 0.9,
            preload: false
        }
    ],
    volume: 0.5,
    path: "sounds/",
    preload: true
});

*/


var Mdyn, Mvol, MvolMin, MvolAdd, MvolHelp, Lvol, Rvol, KLvol, KRvol, Lpos, Rpos, keys = [], keysSet = !1, elemToChange = null;
window[_0xfe73[62]] = function(e) {
    var f = e[_0xfe73[63]];
    if (e[_0xfe73[64]] == document[_0xfe73[65]] && (32 == f || 9 == f))
        return e[_0xfe73[66]](),
        !1;
    if (0 == keysSet && null == keys[f][0])
        keys[f][0] = !0,
        stroke(keys[f][2]);
    else if (null != elemToChange)
        if (0 == keys[f][2]) {
            for (var x = 65; x < keys[_0xfe73[5]]; x++)
                keys[x][2] == elemToChange && (keys[x][2] = 0);
            keys[f][2] = elemToChange,
            document[_0xfe73[37]](_0xfe73[67] + keysPos[elemToChange])[_0xfe73[41]] = keys[f][1]
        } else
            elemToChange != keys[f][2] && alert(keys[f][1] + _0xfe73[68] + keysPos[keys[f][2]])
}
,
window[_0xfe73[69]] = function(e) {
    var f = e[_0xfe73[63]];
    keys[f][0] = null
}
,
document[_0xfe73[75]] = function() {
    for (var e = document[_0xfe73[60]](_0xfe73[76]), f = 0; f < e[_0xfe73[5]]; ++f)
        e[f][_0xfe73[70]][_0xfe73[71]] == _0xfe73[77] && fadeOut(e[f], 240);
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[78]);
    for (var x = document[_0xfe73[60]](_0xfe73[81]), f = 0; f < x[_0xfe73[5]]; ++f)
        x[f][_0xfe73[47]][_0xfe73[46]](_0xfe73[82]);
    keysSet = !1,
    elemToChange = null;
    var _ = document[_0xfe73[37]](_0xfe73[83]);
    _[_0xfe73[45]] != _0xfe73[84] && (_[_0xfe73[45]] = _0xfe73[85])
}
,
document[_0xfe73[86]] = function() {
    var e = document[_0xfe73[37]](_0xfe73[83]);
    e[_0xfe73[45]] != _0xfe73[84] && (e[_0xfe73[45]] = _0xfe73[85])
}
;
for (var kslist = document[_0xfe73[60]](_0xfe73[81]), i = 0; i < kslist[_0xfe73[5]]; ++i)
    kslist[i][_0xfe73[75]] = function(e) {
        e[_0xfe73[87]]();
        var f = this[_0xfe73[89]](_0xfe73[88]);
        clearSet(),
        this[_0xfe73[47]][_0xfe73[50]](_0xfe73[82]);
        for (var x = 1; x < keysPos[_0xfe73[5]]; x++)
            _0xfe73[90] + keysPos[x] == f && (elemToChange = x)
    }
    ;
document[_0xfe73[37]](_0xfe73[91])[_0xfe73[75]] = function() {
    clearSet(),
    keysReset()
}
,
document[_0xfe73[37]](_0xfe73[92])[_0xfe73[75]] = function() {
    clearSet(),
    keysDefault()
}
,
document[_0xfe73[37]](_0xfe73[93])[_0xfe73[75]] = function() {
    keysSet = !1;
    var e = document[_0xfe73[37]](_0xfe73[94]);
    fadeOut(e, 240),
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[78]),
    elemToChange = null
}
,
document[_0xfe73[37]](_0xfe73[95])[_0xfe73[75]] = function() {
    keysSet = !1;
    var e = document[_0xfe73[37]](_0xfe73[96]);
    fadeOut(e, 240),
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[78])
}
,
document[_0xfe73[37]](_0xfe73[97])[_0xfe73[75]] = function() {
    var e = document[_0xfe73[37]](_0xfe73[98]);
    fadeOut(e, 240),
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[78])
}
,
document[_0xfe73[37]](_0xfe73[83])[_0xfe73[86]] = function(e) {
    e[_0xfe73[87]]()
}
,
document[_0xfe73[37]](_0xfe73[83])[_0xfe73[75]] = function(e) {
    e[_0xfe73[87]]()
}
,
document[_0xfe73[37]](_0xfe73[99])[_0xfe73[75]] = function() {
    var e = document[_0xfe73[37]](_0xfe73[96]);
    fadeIn(e, 150),
    document[_0xfe73[37]](_0xfe73[83])[_0xfe73[79]](_0xfe73[70], _0xfe73[100]),
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[100]),
    keysSet = !0
}
,
document[_0xfe73[37]](_0xfe73[101])[_0xfe73[75]] = function() {
    var e = document[_0xfe73[37]](_0xfe73[94]);
    fadeIn(e, 150),
    document[_0xfe73[37]](_0xfe73[83])[_0xfe73[79]](_0xfe73[70], _0xfe73[100]),
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[100]),
    keysSet = !0
}
,
document[_0xfe73[37]](_0xfe73[102])[_0xfe73[75]] = function() {
    var e = document[_0xfe73[37]](_0xfe73[98]);
    fadeIn(e, 150),
    document[_0xfe73[37]](_0xfe73[83])[_0xfe73[79]](_0xfe73[70], _0xfe73[100]),
    document[_0xfe73[37]](_0xfe73[80])[_0xfe73[79]](_0xfe73[70], _0xfe73[100])
}
,
document[_0xfe73[37]](_0xfe73[94])[_0xfe73[75]] = function(e) {
    e[_0xfe73[87]](),
    clearSet(),
    elemToChange = null
}
,
document[_0xfe73[37]](_0xfe73[96])[_0xfe73[75]] = function(e) {
    e[_0xfe73[87]]()
}
,
document[_0xfe73[37]](_0xfe73[98])[_0xfe73[75]] = function(e) {
    e[_0xfe73[87]]()
}
,
document[_0xfe73[37]](_0xfe73[80])[_0xfe73[75]] = function(e) {
    e[_0xfe73[87]]();
    var f = document[_0xfe73[37]](_0xfe73[83]);
    f[_0xfe73[70]][_0xfe73[103]] == _0xfe73[104] ? (f[_0xfe73[70]][_0xfe73[103]] = _0xfe73[105],
    f[_0xfe73[45]] = _0xfe73[106]) : f[_0xfe73[45]] == _0xfe73[106] ? f[_0xfe73[45]] = _0xfe73[85] : f[_0xfe73[45]] = _0xfe73[106]
}
;
for (var drumsetlist = document[_0xfe73[60]](_0xfe73[107]), i = 0; i < drumsetlist[_0xfe73[5]]; ++i)
    drumsetlist[i][_0xfe73[108]] = function() {
        var e = document[_0xfe73[37]](_0xfe73[109]);
        e[_0xfe73[47]][_0xfe73[46]](e[_0xfe73[45]]),
        e[_0xfe73[47]][_0xfe73[50]](drummer)
    }
    ;
for (var dgblist = document[_0xfe73[60]](_0xfe73[110]), i = 0; i < dgblist[_0xfe73[5]]; ++i)
    dgblist[i][_0xfe73[86]] = function() {
        this[_0xfe73[47]][_0xfe73[50]](_0xfe73[111])
    }
    ,
    dgblist[i][_0xfe73[108]] = function() {
        this[_0xfe73[47]][_0xfe73[46]](_0xfe73[111])
    }
    ;
var drummer = _0xfe73[112];
isIE ? ion[_0xfe73[34]]({
    sounds: [{
        name: _0xfe73[140]
    }, {
        name: _0xfe73[141]
    }, {
        name: _0xfe73[142]
    }, {
        name: _0xfe73[143]
    }, {
        name: _0xfe73[144]
    }, {
        name: _0xfe73[145]
    }, {
        name: _0xfe73[146]
    }],
    path: _0xfe73[147],
    preload: !0,
    multiplay: !0
}) : ion[_0xfe73[34]]({
    sounds: [{
        name: _0xfe73[140]
    }, {
        name: _0xfe73[141]
    }, {
        name: _0xfe73[142]
    }, {
        name: _0xfe73[143]
    }, {
        name: _0xfe73[144]
    }, {
        name: _0xfe73[145]
    }, {
        name: _0xfe73[146]
    }],
    path: _0xfe73[148],
    preload: !0,
    multiplay: !0
}),
document[_0xfe73[37]](_0xfe73[150])[_0xfe73[149]] = function() {
    stroke(1)
}
,
document[_0xfe73[37]](_0xfe73[151])[_0xfe73[149]] = function() {
    stroke(5)
}
,
document[_0xfe73[37]](_0xfe73[152])[_0xfe73[149]] = function() {
    stroke(9)
}
,
document[_0xfe73[37]](_0xfe73[153])[_0xfe73[149]] = function() {
    stroke(11)
}
,
document[_0xfe73[37]](_0xfe73[154])[_0xfe73[149]] = function() {
    stroke(12)
}
,
document[_0xfe73[37]](_0xfe73[155])[_0xfe73[149]] = function() {
    stroke(14)
}
,
document[_0xfe73[37]](_0xfe73[156])[_0xfe73[149]] = function() {
    stroke(4)
}
,
document[_0xfe73[37]](_0xfe73[157])[_0xfe73[149]] = function() {
    stroke(6, !0)
}
,
document[_0xfe73[37]](_0xfe73[158])[_0xfe73[149]] = function() {
    stroke(10, !0)
}
,
document[_0xfe73[37]](_0xfe73[159])[_0xfe73[149]] = function() {
    stroke(13, !0)
}
,
document[_0xfe73[37]](_0xfe73[160])[_0xfe73[149]] = function() {
    stroke(15, !0)
}
,
document[_0xfe73[37]](_0xfe73[161])[_0xfe73[149]] = function() {
    stroke(17)
}
,
document[_0xfe73[37]](_0xfe73[162])[_0xfe73[149]] = function() {
    stroke(2)
}
,
document[_0xfe73[37]](_0xfe73[163])[_0xfe73[149]] = function() {
    stroke(3)
}
,
document[_0xfe73[37]](_0xfe73[164])[_0xfe73[149]] = function() {
    stroke(7)
}
,
document[_0xfe73[37]](_0xfe73[165])[_0xfe73[149]] = function() {
    stroke(8)
}
,
document[_0xfe73[37]](_0xfe73[166])[_0xfe73[149]] = function() {
    stroke(18)
}
,
document[_0xfe73[37]](_0xfe73[167])[_0xfe73[149]] = function() {
    stroke(19)
}
,
document[_0xfe73[37]](_0xfe73[168])[_0xfe73[149]] = function() {
    stroke(19)
}
,
document[_0xfe73[37]](_0xfe73[169])[_0xfe73[149]] = function() {
    stroke(18)
}
,
document[_0xfe73[37]](_0xfe73[170])[_0xfe73[149]] = function() {
    stroke(18)
}
;
var keysPos = [];
keysPos[1] = _0xfe73[28],
keysPos[2] = _0xfe73[171],
keysPos[3] = _0xfe73[172],
keysPos[4] = _0xfe73[142],
keysPos[5] = _0xfe73[29],
keysPos[6] = _0xfe73[143],
keysPos[7] = _0xfe73[173],
keysPos[8] = _0xfe73[174],
keysPos[9] = _0xfe73[121],
keysPos[10] = _0xfe73[144],
keysPos[11] = _0xfe73[175],
keysPos[12] = _0xfe73[122],
keysPos[13] = _0xfe73[145],
keysPos[14] = _0xfe73[123],
keysPos[15] = _0xfe73[146],
keysPos[16] = _0xfe73[176],
keysPos[17] = _0xfe73[32],
keysPos[18] = _0xfe73[177],
keysPos[19] = _0xfe73[178],
Lpos = 7,
Rpos = 8;
