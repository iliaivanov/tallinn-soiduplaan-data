var ti = {
    stops: 0,
    routes: 0,
    taxi: [],
    specialDates: {},
    specialWeekdays: {},
    asciiStops: {},
    FLD_ID: 0,
    FLD_CITY: 1,
    FLD_AREA: 2,
    FLD_STREET: 3,
    FLD_NAME: 4,
    FLD_INFO: 5,
    FLD_LNG: 6,
    FLD_LAT: 7,
    FLD_STOPS: 8,
    FLD_DIRS: 9,
    RT_ROUTEID: 0,
    RT_ORDER: 1,
    RT_ROUTENUM: 2,
    RT_AUTHORITY: 3,
    RT_CITY: 4,
    RT_TRANSPORT: 5,
    RT_OPERATOR: 6,
    RT_VALIDITYPERIODS: 7,
    RT_SPECIALDATES: 8,
    RT_ROUTETAG: 9,
    RT_ROUTETYPE: 10,
    RT_COMMERCIAL: 11,
    RT_ROUTENAME: 12,
    RT_WEEKDAYS: 13,
    RT_ENTRY: 14,
    RT_STREETS: 15,
    RT_ROUTESTOPS: 16,
    accent_map: {
        "ą": "a",
        "ä": "a",
        "ā": "a",
        "č": "c",
        "ę": "e",
        "ė": "e",
        "į": "i",
        "ų": "u",
        "ū": "u",
        "ü": "u",
        "ž": "z",
        "ē": "e",
        "ģ": "g",
        "ī": "i",
        "ķ": "k",
        "ļ": "l",
        "ņ": "n",
        "ö": "o",
        "õ": "o",
        "š": "s",
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ё": "e",
        "ж": "zh",
        "з": "z",
        "и": "i",
        "й": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "x",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "shh",
        "ъ": !0,
        "ы": "y",
        "ь": !0,
        "э": "je",
        "ю": "ju",
        "я": "ja",
        "–": "-",
        "—": "-",
        "̶": "-",
        "­": "-",
        "˗": "-",
        "“": !0,
        "”": !0,
        "„": !0,
        "'": !0,
        "\"": !0
    },
    wordSeparators: "–—̶­˗“”„ _-.()'\""
};
ti.SERVER = 1,
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
,
ti.dateToMinutes = function(a) {
    return Math.floor(+a / 6e4) - a.getTimezoneOffset()
}
,
ti.dateToDays = function(a) {
    return Math.floor(ti.dateToMinutes(a) / 1440)
}
,
ti.printTime = function(a, b, c) {
    if (a < 0)
        return "";
    !b && b !== "" && (b = ":");
    var d = ~~a
      , e = ~~(d / 60) % 24;
    d = d % 60;
    return (c && e < 10 ? c : "") + e + b + (d < 10 ? "0" : "") + d
}
,
ti.toMinutes = function(a) {
    var b = a.trim()
      , c = b.length
      , d = parseInt(b.substr(c - 2, 2), 10);
    return c > 2 ? d + parseInt(b.substr(0, c - 2), 10) * 60 : d * 60
}
,
ti.fDownloadUrl = function(a, b, c) {
    if (a && b && c) {
        var d;
        if (!window.XMLHttpRequest || window.location.protocol === "file:" && window.ActiveXObject) {
            try {
                d = new ActiveXObject("MSXML2.XMLHTTP.6.0")
            } catch (e) {}
            if (!d)
                try {
                    d = new ActiveXObject("MSXML2.XMLHTTP")
                } catch (e) {}
            if (!d)
                try {
                    d = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
        } else
            d = new XMLHttpRequest;
        d.open(a, b, !0),
        d.onreadystatechange = function() {
            if (d.readyState == 4)
                if (d.status == 200 || d.status == 0)
                    typeof d.responseText == "string" ? c(d.responseText) : typeof d.responseXML == "string" ? c(d.responseXML) : c(d.responseText)
        }
        ;
        try {
            d.send(null)
        } catch (f) {
            alert("Error: " + f.description)
        }
    }
}
,
ti.toAscii = function(a, b) {
    var c = a.toLowerCase(), d = c.split(""), e, f = ti.accent_map;
    for (var g = d.length; --g >= 0; )
        (e = f[d[g]]) ? (d[g] = e === !0 ? "" : e,
        c = !1) : b === !0 && d[g] === " " && (d[g] = "",
        c = !1);
    b === 2 && (c = d.join("").trim().replace(/\s+-/g, "-").replace(/-\s+/g, "-"));
    return c || d.join("")
}
,
ti.cloneObject = function(a) {
    var b = a instanceof Array ? [] : {};
    for (var c in a)
        a[c] && typeof a[c] == "object" ? b[c] = a[c].clone() : b[c] = a[c];
    return b
}
,
ti.naturalSort = function(a, b) {
    var c = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi
      , d = /(^[ ]*|[ ]*$)/g
      , e = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/
      , f = /^0x[0-9a-f]+$/i
      , g = /^0/
      , h = a.toString().replace(d, "") || ""
      , i = b.toString().replace(d, "") || ""
      , j = h.replace(c, "\u0000$1\u0000").replace(/\0$/, "").replace(/^\0/, "").split("\u0000")
      , k = i.replace(c, "\u0000$1\u0000").replace(/\0$/, "").replace(/^\0/, "").split("\u0000")
      , l = parseInt(h.match(f)) || j.length != 1 && h.match(e) && Date.parse(h)
      , m = parseInt(i.match(f)) || l && i.match(e) && Date.parse(i) || null;
    if (m) {
        if (l < m)
            return -1;
        if (l > m)
            return 1
    }
    for (var n = 0, o = Math.max(j.length, k.length); n < o; n++) {
        oFxNcL = !(j[n] || "").match(g) && parseFloat(j[n]) || j[n] || 0,
        oFyNcL = !(k[n] || "").match(g) && parseFloat(k[n]) || k[n] || 0;
        if (isNaN(oFxNcL) !== isNaN(oFyNcL))
            return isNaN(oFxNcL) ? 1 : -1;
        typeof oFxNcL !== typeof oFyNcL && (oFxNcL += "",
        oFyNcL += "");
        if (oFxNcL < oFyNcL)
            return -1;
        if (oFxNcL > oFyNcL)
            return 1
    }
    return 0
}
,
ti.loadData = function() {
    ti.fDownloadUrl("get", cfg.city.datadir + "/routes.txt", ti.loadRoutes),
    ti.fDownloadUrl("get", cfg.city.datadir + "/stops.txt", ti.loadStops)
}
,
ti.loadStops = function(a) {
    a = a.split("\n");
    var b = ""
      , c = ""
      , d = ""
      , e = ""
      , f = ""
      , g = ""
      , h = ""
      , i = {}
      , j = {}
      , k = []
      , l = a.length
      , m = a[0].toUpperCase().split(";")
      , n = {};
    for (var o = m.length; --o >= 0; )
        n[m[o]] = o;
    n.ID = 0,
    n.SIRIID = n.SIRIID || 0;
    for (var o = 1; o < l; o++)
        if (a[o].length > 1) {
            var p = a[o].split(";")
              , q = p[n.CITY];
            q && (c = q === "0" ? "" : q.trim());
            var r = b + ti.toAscii(p[n.ID], !0)
              , s = p[n.SIRIID];
            if (q = p[n.AREA])
                d = q === "0" ? "" : q.trim();
            if (q = p[n.STREET])
                e = q === "0" ? "" : q.trim();
            if (q = p[n.NAME]) {
                f = q === "0" ? "" : q,
                g = ti.toAscii(q);
                var t = j[g];
                j[g] = t ? t + "," + r : r
            } else
                j[g] += "," + r;
            if (q = p[n.INFO])
                h = q === "0" ? "" : q;
            b && (p[n.STOPS] = b + (p[n.STOPS] || "").replace(/,/g, "," + b));
            var u = {
                id: r,
                siriID: s,
                lat: +p[n.LAT] / 1e5,
                lng: +p[n.LNG] / 1e5,
                name: f,
                city: c,
                raw_data: [r, c, d, e, f, h, p[n.LNG], p[n.LAT], p[n.STOPS]].join(";")
            };
            ti.SERVER && (u.routes = [],
            u.neighbours = p[n.STOPS] ? p[n.STOPS].split(",") : []),
            i[r] = u,
            k.push(u)
        }
    ti.stops = i,
    ti.asciiStops = j,
    k.sort(function(a, b) {
        return a.lat < b.lat ? -1 : a.lat > b.lat ? 1 : 0
    });
    for (o = k.length; --o > 0; )
        if (k[o].city === "intercity") {
            var v = k[o].lat;
            for (var w = o - 1; --w >= 0; ) {
                var x = v - k[w].lat;
                if (x > .015)
                    break;
                var y = k[o].lng - k[w].lng;
                y > -.015 && y < .015 && (k[o].neighbours.push(k[w].id),
                k[w].neighbours.push(k[o].id))
            }
        }
    ti.routes && (ti.SERVER === !0 ? ti.loadRoutes(ti.routes) : window.setTimeout(function() {
        ti.loadRoutes(ti.routes)
    }, 10))
}
,
ti.loadRoutes = function(a) {
    if (typeof ti.stops !== "object")
        ti.routes = a;
    else {
        a = a.split("\n");
        var b = []
          , c = ti.stops
          , d = {}
          , e = ""
          , f = ""
          , g = ""
          , h = ""
          , i = ""
          , j = ""
          , k = ""
          , l = ""
          , m = ""
          , n = ""
          , o = ""
          , p = ""
          , q = 0
          , r = a[0].toUpperCase().split(";")
          , s = {};
        for (var t = r.length; --t >= 0; )
            s[r[t]] = t;
        s.ROUTENUM = 0;
        var u = -1
          , v = a.length;
        for (var t = 1; t < v; t++)
            if (a[t].charAt(0) === "#") {
                var w = a[t].split("#")
                  , x = null
                  , y = null
                  , z = new Date;
                w[1] !== "" && (x = new Date(w[1])),
                w[2] !== "" && (y = new Date(w[2]));
                if ((!x || x <= z) && (!y || y >= z)) {
                    var A = {
                        comment: w[3]
                    };
                    w[4] && (A.departures = w[4]),
                    w[5] && (A.weekdays = w[5]),
                    w[6] && (A.directions = w[6]);
                    var B = b[u];
                    B.comments ? B.comments.push(A) : B.comments = [A]
                }
            } else if (a[t].length > 1) {
                var w = a[t].split(";"), C;
                if (C = w[s.AUTHORITY])
                    g = C === "0" ? "" : C;
                if (g === "SpecialDates") {
                    var D = {}
                      , E = w[s.VALIDITYPERIODS].split(",")
                      , F = 0
                      , G = 0;
                    for (var H = -1, I = E.length; ++H < I; )
                        E[H] && (F = +E[H]),
                        G += F,
                        D[G] = !0;
                    ti.specialDates[w[s.ROUTENUM]] = D;
                    continue
                }
                ++q,
                ++u;
                if (C = w[s.ROUTENUM])
                    e = C === "0" ? "" : C,
                    q = 1;
                if (C = w[s.ROUTENAME])
                    f = C;
                if (C = w[s.CITY])
                    h = C === "0" ? "" : C,
                    k = h + "_" + j,
                    q = 1;
                if (C = w[s.TRANSPORT])
                    j = C === "0" ? "" : C,
                    k = h + "_" + j,
                    q = 1;
                k && (pg.cityTransportRoutes[h + "_" + j] = !0,
                k = "");
                if (C = w[s.OPERATOR])
                    l = C === "0" ? "" : C;
                if (C = w[s.VALIDITYPERIODS])
                    m = C === "0" ? "" : C;
                if (C = w[s.SPECIALDATES])
                    n = C === "0" ? "" : C;
                if (C = w[s.WEEKDAYS])
                    o = C === "0" ? "" : C;
                p = s.STREETS ? w[s.STREETS] : "";
                var J = ti.toAscii(w[s.ROUTESTOPS], !0).split(",")
                  , K = !1;
                for (var L = 0, M = J.length; L < M; ++L) {
                    var N = J[L];
                    N.charAt(0) === "e" ? (K || (K = []),
                    K[L] = "1",
                    N = N.substring(1),
                    J[L] = N) : N.charAt(0) === "x" ? (K || (K = []),
                    K[L] = "2",
                    N = N.substring(1),
                    J[L] = N) : K && (K[L] = "0"),
                    i && (N = J[L] = i + N);
                    var O = c[N];
                    O ? (d[N] = !0,
                    O.raw_data += ";" + u + ";" + L,
                    (!0 || ti.SERVER) && O.routes.push(u, L)) : (J.splice(L, 1),
                    --M,
                    --L)
                }
                var P = [u, q, e, g, h, j, l, m, n, w[s.ROUTETAG], ti.toAscii(w[s.ROUTETYPE]), w[s.COMMERCIAL], f, o, K && K.join("") || "", p, J.join(";")].join(";");
                ++t,
                ti.SERVER === !0 ? b[u] = {
                    id: u,
                    authority: g,
                    city: h,
                    transport: j,
                    num: e,
                    name: f,
                    stops: J,
                    entry: K && K.join("") || "",
                    specialDates: n.split(","),
                    times: a[t],
                    raw_data: P
                } : b[u] = {
                    id: u,
                    times: a[t],
                    raw_data: P
                }
            }
        ti.routes = b;
        if (cfg.defaultCity !== "helsinki" && cfg.defaultCity !== "intercity" && cfg.defaultCity !== "latvia")
            for (var N in c)
                d[N] || (c[N].name = "");
        pg.fCreateNavigation(),
        pg.fTabActivate()
    }
}
,
ti.fGetStopsByName = function(a) {
    if (typeof ti.stops !== "object")
        return [];
    var b = ti.toAscii(a)
      , c = b.replace(/\W/g, "")
      , d = a.toLowerCase().replace(/\W/g, "")
      , e = []
      , f = ti.wordSeparators
      , g = ti.asciiStops;
    for (var h in g) {
        var i = h.indexOf(b);
        if (i !== -1 && (i === 0 || f.indexOf(h.charAt(i - 1)) >= 0)) {
            var j = g[h].split(",");
            for (var k = j.length; --k >= 0; ) {
                var l = ti.fGetStopDetails(j[k]);
                l.name && (d === c || -1 !== l.name.toLowerCase().replace(/\W/g, "").indexOf(d)) && (l.indexOf = i,
                e.push(l))
            }
        }
    }
    var m = {};
    for (var k = 0; k < e.length; k++) {
        var l = e[k]
          , n = parseInt(l.id, 10) || l.id
          , o = m[n];
        o ? o.id += "," + l.id : (m[n] = o = l,
        o.streetIsIncluded = {}),
        l.street && l.street !== "-" && !o.streetIsIncluded[l.street] && (o.streetIsIncluded[l.street] = !0,
        o.streets = (o.streets ? o.streets + ", " : "") + l.street)
    }
    var p = {}
      , q = [];
    for (var r in m) {
        var l = m[r], n;
        cfg.defaultCity === "rostov" ? n = l.name + ";" + l.streets : n = l.name.replace(/\W/g, "") + ";" + l.streets;
        var o = p[n];
        o ? o.id += "," + l.id : (p[n] = l,
        q.push(l))
    }
    q.sort(function(a, b) {
        if (a.id.charAt(0) === "A" && b.id.charAt(0) !== "A")
            return -1;
        if (b.id.charAt(0) === "A" && a.id.charAt(0) !== "A")
            return 1;
        if (a.city === pg.city && b.city !== pg.city)
            return -1;
        if (a.city !== pg.city && b.city === pg.city)
            return 1;
        if (a.indexOf === 0 && b.indexOf !== 0)
            return -1;
        if (b.indexOf === 0 && a.indexOf !== 0)
            return 1;
        if (a.name < b.name)
            return -1;
        if (b.name < a.name)
            return 1;
        if (a.area < b.area)
            return -1;
        if (b.area < a.area)
            return 1;
        if (a.streets < b.streets)
            return -1;
        if (b.streets < a.streets)
            return 1;
        return 0
    });
    return q
}
,
ti.fGetAnyStopDetails = function(a) {
    if (typeof ti.stops !== "object" || !a)
        return {};
    var b = typeof a == "string" ? a.split(",") : a, c, d, e, f;
    d = e = f = 0;
    for (var g = 0; g < b.length; ++g) {
        var h = ti.fGetStopDetails(b[g]);
        !c && h.id && (c = h),
        h && h.lat && h.lng && (d += h.lat,
        e += h.lng,
        ++f)
    }
    f && (c.latAvg = d / f,
    c.lngAvg = e / f);
    return c || {}
}
,
ti.fGetStopDetails = function(a) {
    if (typeof ti.stops !== "object" || !a)
        return {};
    var b = ti.stops[a], c;
    if (!b) {
        var d = a.indexOf(";");
        if (d > 0) {
            c = {
                id: a,
                name: i18n.mapPoint,
                neighbours: "",
                lat: parseFloat(a.substr(0, d)),
                lng: parseFloat(a.substr(d + 1)),
                raw_data: ""
            };
            return c
        }
        return {}
    }
    var e = b.raw_data.split(";");
    c = {
        id: e[ti.FLD_ID],
        city: e[ti.FLD_CITY],
        area: e[ti.FLD_AREA],
        street: e[ti.FLD_STREET],
        name: b.name,
        info: e[ti.FLD_INFO],
        neighbours: e[ti.FLD_STOPS],
        lng: ti.stops[a].lng,
        lat: ti.stops[a].lat,
        raw_data: b.raw_data
    };
    return c
}
,
ti.fGetTransfersAtStop = function(a, b, c) {
    var d = ti.stops
      , e = [a]
      , f = parseInt(a, 10);
    if (f && "" + f !== "" + a && cfg.defaultCity !== "druskininkai")
        for (var g in d)
            f == parseInt(g, 10) && e.push(g);
    return ti.fGetRoutesAtStop(e, !1, b, c)
}
,
ti.fGetRoutesAtStop = function(a, b, c, d) {
    var e = d && d.dirType || "-"
      , f = d && d.id || null
      , g = []
      , h = typeof a == "string" ? a.split(",") : a
      , i = e.split("-")
      , j = i[0]
      , k = i[i.length - 1]
      , l = j.charAt(0)
      , m = k.charAt(0);
    for (var n = h.length; --n >= 0; ) {
        var o = (ti.stops[h[n]] || {
            raw_data: ""
        }).raw_data.split(";")
          , p = o.length;
        for (var q = ti.FLD_DIRS; q < p; q += 2) {
            var r = ti.fGetRoutes(o[q])
              , s = +o[q + 1] < r.stops.length - 1;
            (s || c) && (b || !r.routeTag || r.id === f) && (r.stopId = h[n],
            e && (r.dirType.indexOf(e) < 0 && e.indexOf(r.dirType) < 0 && r.dirType.indexOf("-d") < 0 && j !== k && (r.dirType.indexOf(k) == 0 || r.dirType.indexOf(j) == r.dirType.length - 1 || r.dirType.indexOf("-" + m) < 0 && r.dirType.indexOf(j + "-") < 0 && r.dirType.indexOf(l + "-") < 0 && (r.dirType.indexOf("c") < 0 || r.dirType.indexOf("c") >= r.dirType.length - 2))) ? r.sortKey = "1" : r.sortKey = "0",
            r.sortKey = [cfg.transportOrder[r.transport] || "Z", ("000000" + parseInt(r.num, 10)).slice(-6), ("000000" + parseInt(r.num.substr(1), 10)).slice(-6), (r.num + "00000000000000000000").substr(0, 20), n === 0 ? "0" : "1", s ? "0" : "1", r.sortKey, ("000000" + r.order).slice(-6)].join(""),
            g.push(r))
        }
    }
    g.sort(function(a, b) {
        if (a.sortKey < b.sortKey)
            return -1;
        if (a.sortKey > b.sortKey)
            return 1;
        return 0
    });
    return g
}
,
ti.fGetRoutes = function(a, b, c, d, e, f) {
    var g = [], h = {}, i = -1, j = 0, k, l, m, n, o = ti.wordSeparators;
    f && (f = ti.toAscii("" + f, 2)),
    isNaN(a) ? a && typeof a == "object" ? l = a : (k = ti.routes,
    i = 0,
    j = k.length,
    m = c && ti.toAscii(c, !0)) : l = ti.routes[+a];
    while (i < j) {
        i >= 0 && (l = k[i]);
        var p = l.raw_data.split(";")
          , q = p[ti.RT_CITY]
          , r = p[ti.RT_TRANSPORT]
          , s = p[ti.RT_ORDER]
          , t = ti.toAscii(p[ti.RT_ROUTENUM], !0)
          , u = p[ti.RT_ROUTETAG];
        if (i < 0 || a === q && (!b || b === r) && (!m || m === t && (!u || e === !0 || e === "0" && u.indexOf("0") < 0)) && (!d || d === p[ti.RT_ROUTETYPE])) {
            if (f) {
                var v = t.indexOf(f);
                v == 0 && t.length > f.length && "0123456789".indexOf(t.charAt(f.length)) >= 0 && (v = -1);
                if (v !== 0) {
                    var w = ti.toAscii(p[ti.RT_ROUTENAME], 2);
                    v = w.indexOf(f),
                    v > 0 && o.indexOf(w.charAt(v - 1)) < 0 && o.indexOf(f.charAt(0)) < 0 && (v = -1)
                }
                if (v >= 0) {
                    n = ti.toAscii(q + ";" + r + ";" + t + ";" + p[ti.RT_ROUTENAME], !0);
                    var x = h[n];
                    x && (v = -1,
                    x.weekdays += p[ti.RT_WEEKDAYS])
                }
                if (v < 0 || u) {
                    ++i;
                    continue
                }
            } else if (i >= 0 && !m) {
                n = ti.toAscii(q + ";" + r + ";" + t, !0);
                var x = h[n];
                x && (x && (x.weekdays += p[ti.RT_WEEKDAYS]));
                if (x && s !== "1") {
                    ++i;
                    continue
                }
            }
            var y = (p[ti.RT_VALIDITYPERIODS] || "").split(",");
            for (var z = 0; z < 7; ++z)
                y[z] = parseInt(y[z], 10) || 0,
                z > 0 && (y[z] += y[z - 1]);
            var A = [cfg.transportOrder[r] || "Z", ("000000" + parseInt(t, 10)).slice(-6), ("000000" + parseInt(t.substr(1), 10)).slice(-6), (t + "00000000000000000000").substr(0, 20), ("000000" + s).slice(-6)].join("");
            g.push({
                id: p[0],
                authority: p[ti.RT_AUTHORITY],
                city: q,
                transport: r,
                operator: p[ti.RT_OPERATOR],
                commercial: p[ti.RT_COMMERCIAL],
                num: p[ti.RT_ROUTENUM],
                numHTML: p[ti.RT_ROUTENUM],
                name: p[ti.RT_ROUTENAME],
                routeTag: u,
                dirType: p[ti.RT_ROUTETYPE],
                weekdays: p[ti.RT_WEEKDAYS],
                validityPeriods: y,
                specialDates: p[ti.RT_SPECIALDATES],
                entry: p[ti.RT_ENTRY],
                streets: p[ti.RT_STREETS],
                stops: p.slice(ti.RT_ROUTESTOPS),
                times: l.times,
                order: s,
                sortKey: A
            }),
            n && (h[n] = g[g.length - 1])
        }
        ++i
    }
    if (!j)
        return g[0];
    g.sort(function(a, b) {
        if (a.sortKey < b.sortKey)
            return -1;
        if (a.sortKey > b.sortKey)
            return 1;
        return ti.naturalSort(a.num, b.num) || (a.order < b.order ? -1 : a.order > b.order ? 1 : 0)
    });
    return g
}
,
ti.fOperatorDetails = function(a, b) {
    var c = cfg.operators[a || b];
    if (!c)
        return a;
    c = b && c[b] || c;
    return c[pg.language] || c.en || c
}
,
ti.explodeTimes = function(a) {
    var b = [], c = [], d = [], e = [], f = [], g = [], h = [], i = [], j, k, l = a.split(","), m, n, o = l.length, p = [], q = "+", r = "-";
    for (m = -1,
    j = 0,
    k = 0,
    n = 0; ++m < o; ) {
        var s = l[m];
        if (s == "")
            break;
        var t = s.charAt(0);
        t === q ? p[m] = s.charAt(1) === "0" && s !== "+0" ? "2" : "1" : t === r && s.charAt(1) === "0" && (p[m] = s.charAt(2) === "0" ? "2" : "1"),
        n += +s,
        b[j++] = n
    }
    for (var u = p.length; --u >= 0; )
        p[u] || (p[u] = "0");
    for (var u = 0; ++m < o; ) {
        var v = +l[m]
          , w = l[++m];
        w === "" ? (w = j - u,
        o = 0) : w = +w;
        while (w-- > 0)
            d[u++] = v
    }
    --m;
    for (var u = 0, o = l.length; ++m < o; ) {
        var v = +l[m]
          , w = l[++m];
        w === "" ? (w = j - u,
        o = 0) : w = +w;
        while (w-- > 0)
            e[u++] = v
    }
    --m;
    for (var u = 0, o = l.length; ++m < o; ) {
        var x = l[m]
          , w = l[++m];
        w === "" ? (w = j - u,
        o = 0) : w = +w;
        while (w-- > 0)
            c[u++] = x
    }
    if (ti.has_trips_ids) {
        --m;
        var o = l.length;
        for (var u = 0; ++m < o; ) {
            if (l[m] === "")
                break;
            f[u] = +l[m],
            u > 0 && (f[u] += f[u - 1]),
            ++u
        }
        for (var u = 0; ++m < o; ) {
            if (l[m] === "")
                break;
            g[u] = l[m],
            ++u
        }
        if (ti.has_trips_ids === 2) {
            for (var u = 0; ++m < o; ) {
                if (l[m] === "")
                    break;
                i[u] = l[m],
                ++u
            }
            for (var u = 0; ++m < o; ) {
                if (l[m] === "")
                    break;
                h[u] = l[m],
                ++u
            }
        }
        ++m
    }
    --m,
    k = 1;
    for (var u = j, y = j, z = 5, o = l.length; ++m < o; ) {
        z += +l[m] - 5;
        var w = l[++m];
        w !== "" ? (w = +w,
        y -= w) : (w = y,
        y = 0);
        while (w-- > 0)
            b[u] = z + b[u - j],
            ++u;
        y <= 0 && (y = j,
        z = 5,
        ++k)
    }
    final_data = {
        workdays: c,
        times: b,
        tag: p.join(""),
        valid_from: d,
        valid_to: e,
        trip_ids: f,
        trip_codes: g,
        trip_operators: h,
        trip_groups: i
    };
    return final_data
}
,
ti.fGetDirTag = function(a) {
    if (a.indexOf("-d") >= 0)
        return "0";
    if (a.indexOf("2") >= 0)
        return "2";
    if (a.indexOf("3") >= 0)
        return "3";
    var b = a.search(/[\dcefghijklmnopqrstuvwyz]/);
    if (b > 0) {
        var c = a.indexOf("_");
        if (c < 0 || c > b)
            return "1"
    }
    return ""
}
;
var Hash = function() {
    var a = this, b = document.documentMode, c = a.history, d = a.location, e, f, g, h = function() {
        var a = d.href.indexOf("#");
        return a == -1 ? "" : decodeURI(d.href.substr(a + 1))
    }, i = function() {
        var a = h();
        a != f && (f = a,
        e(a, !1),
        pg.timeOfActivity = (new Date).getTime())
    }, j = function(a) {
        try {
            var b = g.contentWindow.document;
            b.open(),
            b.write("<html><body>" + a + "</body></html>"),
            b.close(),
            f = a
        } catch (c) {
            setTimeout(function() {
                j(a)
            }, 10)
        }
    }, k = function() {
        try {
            g.contentWindow.document
        } catch (a) {
            setTimeout(k, 10);
            return
        }
        j(f);
        var b = f;
        setInterval(function() {
            var a, c;
            try {
                a = g.contentWindow.document.body.innerText,
                a != b ? (b = a,
                d.hash = f = a,
                e(a, !0)) : (c = h(),
                c != f && j(c))
            } catch (i) {}
        }, 50)
    };
    return {
        getHash: h,
        init: function(d, j) {
            e || (e = d,
            f = h(),
            d(f, !0),
            a.ActiveXObject ? !b || b < 8 ? (g = j,
            k()) : a.attachEvent("onhashchange", i) : (c.navigationMode && (c.navigationMode = "compatible"),
            setInterval(i, 50)))
        },
        go: function(a) {
            if (a != f) {
                if (top !== self) {
                    top.location.replace(self.location.href.split("#")[0] + "#" + a);
                    return
                }
                g ? j(a) : (d.hash = f = a,
                e(a, !1))
            }
        }
    }
}();
function pikasRoute(a, b) {
    a = a || {
        origin: "3540",
        destination: "54.68561;25.28670",
        departure_time: "1355295600",
        walk_max: "1000"
    };
    var c = ti.parseParams(a);
    c.callback = function(a) {
        if (b === "JSON" || b === "json")
            document.body.innerHTML = JSON.stringify(ti.ToGoogleFormat(a), null, 4);
        else if (typeof b === "string") {
            var c = "";
            a.timeStarted && (c += "Search took " + (+(new Date) - a.timeStarted) + "ms<br /><br />"),
            c += "Optimal routes:";
            var d = a.results || [];
            for (var e = 0; e < d.length; e++) {
                var f = d[e]
                  , g = d[e].legs;
                c += ["<br />Option", e + 1, "travel time: " + ti.printTime(f.travel_time), "<br />"].join("&nbsp;");
                for (var h = 0; h < g.length; h++) {
                    var i = g[h];
                    c += [i.start_stop.name, ti.printTime(i.start_time), ti.printTime(i.finish_time), i.finish_stop.name, " "].join(" "),
                    i.route ? c += [i.route.transport, i.route.num, i.route.name, i.weekdays, "<br />"].join(" ") : c += "walk<br />"
                }
            }
            document.body.innerHTML = c
        } else
            typeof b === "function" ? b(ti.ToGoogleFormat(a)) : window.JSClassObject.receiveResult(JSON.stringify(ti.ToGoogleFormat(a), null, 4))
    }
    ,
    ti.findTrips(c)
}
ti.findTrips = function(a) {
    if (a && a.callback) {
        if (a.status && a.status != "OK") {
            a.callback(a);
            return
        }
        a.no_just_walking = !1,
        a.reverseOriginal = a.reverse;
        if (!a.attempt) {
            if (typeof pg === "object") {
                if (pg.optimalSearchRunning)
                    return;
                pg.optimalSearchRunning = !0
            }
            a.timeStarted = +(new Date),
            ti.timeStarted = +(new Date),
            a.attempt = 1,
            a.direct_routes = [];
            var b = a.date;
            b || (b = new Date,
            b = new Date(b.getFullYear(),b.getMonth(),b.getDate()),
            a.date = b),
            a.transport || (a.transport = {}),
            a.transportOriginal = ti.cloneObject(a.transport),
            typeof a.reverse == "undefined" && (a.reverse = 1,
            a.reverseOriginal = a.reverse);
            if (typeof cfg === "object" && cfg.defaultCity === "latvia")
                a.transport.internationalbus = !1;
            else if (a.transport.bus || a.transport.trol || a.transport.tram)
                a.transport.regionalbus && (a.transport.regionalbus = !1,
                a.attempt = -1),
                a.transport.commercialbus && (a.transport.commercialbus = !1,
                a.attempt = -1),
                a.transport.train && (a.transport.train = !1,
                a.attempt = -1);
            dijkstra(a, a.start_time, a.reverse);
            return
        }
        if (a.attempt == -1) {
            a.attempt = 1;
            if (a.results.length <= 0) {
                a.transport = a.transportOriginal,
                dijkstra(a, a.start_time, a.reverse);
                return
            }
        }
        if (a.attempt == 1 && a.results.length <= 0) {
            a.attempt = 2,
            a.reverse = -a.reverse,
            a.sort = "no sort";
            if (typeof cfg !== "object" || cfg.defaultCity !== "intercity") {
                dijkstra(a, a.reverse == 1 ? 0 : 4320, a.reverse);
                return
            }
        }
        if (a.attempt == 2 && a.results.length > 0) {
            a.attempt = 999,
            a.reverse = -a.reverse;
            var c;
            for (var d = 0; d < a.results.length; d++)
                a.reverse == 1 && (d == 0 || c < a.results[d].start_time) && (c = a.results[d].start_time),
                a.reverse == -1 && (d == 0 || c > a.results[d].finish_time) && (c = a.results[d].finish_time);
            dijkstra(a, c, a.reverse);
            return
        }
        if (a.attempt == 1) {
            var c = null;
            for (var d = 0; d < a.results.length; d++) {
                if (a.results[d].code == "W")
                    continue;
                a.reverse == 1 && (!c || c > a.results[d].finish_time) && (c = a.results[d].finish_time),
                a.reverse == -1 && (!c || c < a.results[d].start_time) && (c = a.results[d].start_time)
            }
            a.results0 = ti.filterSearchResults(a.results, a.reverse),
            a.results = a.results0.slice(0, 1),
            a.results = ti.finalizeSearchResults(a),
            a.callback1 && a.callback1(a),
            a.attempt = 3,
            a.no_just_walking = !0;
            if (c) {
                dijkstra(a, c, -a.reverse, a.start_time);
                return
            }
            a.results = []
        }
        if (a.attempt >= 3 && a.attempt <= 5) {
            a.results.push.apply(a.results, a.results0),
            a.results = ti.filterSearchResults(a.results, a.reverse);
            if (a.results.length > 0)
                if (!0 || a.results.length == 1 || a.results0.length >= a.results.length)
                    if (a.results[0].legs.length != 1 || a.results[0].legs[0].route) {
                        a.attempt = 6,
                        a.results0 = a.results,
                        a.no_just_walking = !0,
                        dijkstra(a, a.reverse == 1 ? a.results[0].start_time + 1 : a.results[0].finish_time - 1, a.reverse);
                        return
                    }
        }
        a.attempt == 6 && a.results.push.apply(a.results, a.results0),
        a.results = ti.filterSearchResults(a.results, a.reverse);
        if (typeof cfg == "object" && cfg.defaultCity === "disable_temporary_latvia" && a.attempt <= 999) {
            typeof pg === "object" && (pg.optimalSearchRunning = !1,
            ($("online_results") || {}).innerHTML = ""),
            a.attempt = 1e3;
            var e = {};
            a.online_results = [],
            a.online_results_required_count = 0;
            for (var d = 0; d < a.results.length; d++) {
                var f = a.results[d]
                  , g = f.legs;
                for (var h = 0; h < g.length; h++) {
                    var i = g[h];
                    if (i.route) {
                        var j = i.start_stop && ti.fGetStopDetails(i.start_stop.id)
                          , k = i.finish_stop && ti.fGetStopDetails(i.finish_stop.id);
                        j && j.info && k && k.info && !e[j.info + ";separator;" + k.info] && (e[j.info + ";separator;" + k.info] = [j.info, k.info],
                        ++a.online_results_required_count)
                    }
                }
            }
            for (var d in e) {
                var j = e[d][0]
                  , k = e[d][1]
                  , l = "timetable" + a.date.yyyymmdd() + j + k;
                l += "7xk$n1Lp1*9E!3",
                l = SHA1(l);
                var m = "/api/ltc.php?action=timetable";
                m += "&date=" + a.date.yyyymmdd(),
                m += "&from=" + j,
                m += "&to=" + k,
                m += "&signature=" + l,
                ti.SERVER === !0 ? typeof http != "undefined" && http.get({
                    host: "bezrindas.lv",
                    port: 80,
                    path: m
                }, function(b) {
                    b.setEncoding("utf8");
                    var c = "";
                    b.on("data", function(a) {
                        c += a
                    }),
                    b.on("end", function() {
                        if (c) {
                            var b = JSON.parse(c);
                            b.contents && (b = b.contents),
                            b && b.length && a.online_results.push.apply(a.online_results, [].concat(b)),
                            --a.online_results_required_count == 0 && ti.findTrips(a)
                        }
                    })
                }) : (m = "http://bezrindas.lv" + m,
                a.online_query_url = m,
                m = "http://www.stops.lt/latviatest/proxy.php?url=" + encodeURIComponent(m),
                ($("online_results") || {}).innerHTML = "<br/>Waiting data from bezrindas.lv for stops pairs: " + a.online_results_required_count,
                ti.fDownloadUrl("get", m, function(b) {
                    if (b) {
                        a.online_results_JSON = b;
                        var c = JSON.parse(b);
                        c.contents && (c = c.contents),
                        c && c.length && a.online_results.push.apply(a.online_results, [].concat(c)),
                        ($("online_results") || {}).innerHTML = "<br/>Waiting data from bezrindas.lv for stops pairs: " + (a.online_results_required_count - 1),
                        --a.online_results_required_count == 0 && ti.findTrips(a)
                    }
                }, !0))
            }
            if (a.online_results_required_count > 0)
                return
        }
        a.results = ti.finalizeSearchResults(a, a.online_results),
        typeof pg === "object" && (pg.optimalSearchRunning = !1);
        if (a.callback)
            a.callback(a, !0);
        else {
            if (typeof pg === "object")
                return a;
            if (typeof window == "object")
                document.body.innerHTML = JSON.stringify(a.results);
            else
                return a
        }
    }
}
;
function dijkstra(a, b, c, d) {
    typeof cfg == "object" && cfg.defaultLanguage == "lt" && (ti.specialWeekdays[ti.dateToDays(new Date(2014,1,16))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,2,11))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,3,21))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,4,1))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,5,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,6,6))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,7,15))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,10,1))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,11,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,11,25))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,11,26))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,0,1))] = 7),
    typeof cfg == "object" && cfg.defaultLanguage == "ee" && (ti.specialWeekdays[ti.dateToDays(new Date(2016,5,23))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,5,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,7,20))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,11,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,11,25))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,11,26))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,0,1))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,1,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,2,25))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,2,27))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,4,1))] = 7);
    var e = ""
      , f = "a";
    typeof cfg == "object" && cfg.defaultCity == "latvia" && (e = ";bus;trol;tram;minibus;",
    f = "nothing");
    var g = !1
      , h = c == -1 ? a.finish_stops.split(",") : a.start_stops.split(",")
      , i = c == -1 ? a.start_stops.split(",") : a.finish_stops.split(",")
      , j = a.finish_stops === "0;0";
    c || (g = !0,
    c = 1,
    a.direct_routes = []),
    a.results = [],
    b = typeof b != "undefined" ? b * c : 0,
    d = typeof d != "undefined" ? d * c : 7200;
    var k = b
      , l = c == 1 ? "1" : "2"
      , m = c == 1 ? "2" : "1"
      , n = a.route_nums ? "," + a.route_nums.toLowerCase().replace(/\s/g, "") + "," : ""
      , o = a.lowFloor;
    n.indexOf(",z,") >= 0 && (o = !0,
    n = n.replace(/,z,/g, "")),
    a.date || (a.date = new Date);
    var p = ti.dateToDays(a.date)
      , q = "" + (ti.specialWeekdays[p] || a.date.getDay() || 7)
      , r = a.max_changes || Number.POSITIVE_INFINITY
      , s = a.change_time || 3
      , t = a.walk_speed_kmh || 4
      , u = a.walk_max || 500;
    u = g ? .05 : u / 1e3,
    u = u * u;
    var v = ti.stops
      , w = ti.routes
      , x = ti.specialDates
      , y = a.direct_routes || []
      , z = a.transport
      , A = a.operators
      , B = a.removed_trips ? "," + a.removed_trips.replace(/\s/g, "") + "," : ""
      , C = a.added_trips ? "," + a.added_trips.replace(/\s/g, "") + "," : ""
      , D = a.commercial
      , E = a.routetypes
      , F = E != 1
      , G = a.area
      , H = 0
      , I = a.middle_stops;
    if (I) {
        H = 10;
        for (var J in I) {
            var K = v[J].routes;
            for (var L = 0; L < K.length; L += 2)
                w[K[L]].available = 10
        }
    }
    var M, N, O = {}, P = {}, Q = {};
    for (var R = 1, S = h; R <= 2; ++R) {
        for (var L = S.length; --L >= 0; )
            if (S[L].charAt(0) == f) {
                var T = v[S[L]];
                if (T)
                    for (var U = T.neighbours.length; --U >= 0; )
                        S.push(T.neighbours[U]);
                S[L] = "removed stop"
            } else if (S[L].indexOf(";") > 0) {
                var V = S[L].split(";");
                R == 1 ? M = {
                    id: S[L],
                    lat: parseFloat(V[0]),
                    lng: parseFloat(V[1]),
                    neighbours: []
                } : (N = {
                    id: S[L],
                    lat: parseFloat(V[0]),
                    lng: parseFloat(V[1])
                },
                P[N.id] = !0,
                M && (Q[M.id] = !0))
            }
        S = i
    }
    var W = []
      , X = {};
    X[k] = [];
    for (var J in v) {
        var T = v[J];
        T.time = Number.POSITIVE_INFINITY,
        T.trip_date = null,
        j && (T.rideStart = T.rideEnd = 0);
        if (!T.lat || !T.lng)
            continue;
        if (M) {
            var Y = (M.lng - T.lng) * 58.1
              , Z = (M.lat - T.lat) * 111.2
              , $ = Y * Y + Z * Z;
            $ <= u && (M.neighbours.push(T.id),
            cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0))
        }
        if (N) {
            var Y = (N.lng - T.lng) * 58.1
              , Z = (N.lat - T.lat) * 111.2
              , $ = Y * Y + Z * Z;
            if ($ <= u) {
                Q[T.id] = !0,
                cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0);
                var _ = T.neighbours;
                for (var U = _.length; --U >= 0; )
                    T.name === v[_[U]].name && (Q[_[U]] = !0)
            }
        }
    }
    for (var U = h.length; --U >= -1; ) {
        var T = U >= 0 ? v[h[U]] : M;
        T && (T.prev_stop = !1,
        T.route = null,
        T.changes = 0,
        O[T.id] = !0,
        U == -1 && c == -1 && s ? (k -= s,
        X[k] = [M]) : X[k].push(T),
        T.time = k,
        typeof cfg == "object" && cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0))
    }
    for (var U = i.length; --U >= 0; ) {
        var J = i[U]
          , T = v[J];
        T && (P[J] = !0,
        typeof cfg == "object" && cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0))
    }
    if (!0 || g)
        for (var ba = w.length; --ba >= 0; ) {
            var bb = ti.fGetRoutes(ba)
              , bc = w[ba];
            bc.available = z && z[bb.transport] === !1 || H && H !== bc.available || n && n.indexOf("," + bb.num.toLowerCase() + ",") < 0 || D && D != bb.commercial || E && F != !_transport_data[bb.transport].region || G && G != bb.cities[0] ? 0 : 1
        }
    for (var U = y.length; --U >= 0; )
        y[U].available = 0;
    for (var ba in w) {
        var bc = w[ba];
        bc.trip_start_time = Number.POSITIVE_INFINITY
    }
    a.finish_stops || (i = !1);
    var bd = +(new Date), be, bf = 0, bg = function() {
        for (var b = 0; ; ) {
            for (var f; !(f = X[k]) || !f.length; )
                if (++k > d) {
                    if (!W.length) {
                        a.results = [];
                        if (g)
                            return [];
                        a.callback2 ? window.setTimeout(a.callback2, 10) : typeof window === "object" ? window.setTimeout(function() {
                            ti.findTrips(a)
                        }, 10) : ti.findTrips(a);
                        return
                    }
                    f = !1;
                    break
                }
            if (!f)
                break;
            f = f.pop();
            if (f.time < k || f.changes < 0)
                continue;
            if (++b == 3e3 && !g && typeof window == "object") {
                +(new Date) - bd > 3e4 ? (a.results = [],
                window.setTimeout(function() {
                    ti.findTrips(a)
                }, 10)) : window.setTimeout(bg, 100);
                return
            }
            if (P[f.id]) {
                d > k + 60 && (d = k + 60);
                continue
            }
            var h = f.changes || 0
              , n = null
              , y = null;
            if (!g) {
                var z = f;
                while (!z.route && z.prev_stop)
                    z = z.prev_stop;
                var D = z.lat
                  , E = z.lng
                  , F = f.neighbours;
                for (var G = F.length; --G >= -1; ) {
                    if (typeof cfg === "object" && cfg.defaultCity === "kaunas") {
                        if (({
                            805: !0,
                            786: !0,
                            787: !0,
                            "787a": !0,
                            397: !0,
                            398: !0,
                            403: !0,
                            404: !0,
                            405: !0,
                            641: !0
                        })[f.id] && ({
                            196: !0,
                            195: !0,
                            664: !0,
                            201: !0,
                            202: !0,
                            203: !0,
                            204: !0,
                            207: !0,
                            208: !0,
                            209: !0,
                            210: !0
                        })[F[G]])
                            continue;
                        if (({
                            805: !0,
                            786: !0,
                            787: !0,
                            "787a": !0,
                            397: !0,
                            398: !0,
                            403: !0,
                            404: !0,
                            405: !0,
                            641: !0
                        })[F[G]] && ({
                            196: !0,
                            195: !0,
                            664: !0,
                            201: !0,
                            202: !0,
                            203: !0,
                            204: !0,
                            207: !0,
                            208: !0,
                            209: !0,
                            210: !0
                        })[f.id])
                            continue
                    }
                    if (typeof cfg === "object" && cfg.defaultCity.indexOf("viln") == 0) {
                        if (({
                            "0906": !0,
                            "0905": !0,
                            "0904": !0,
                            "0903": !0,
                            "0902": !0,
                            "0901": !0,
                            2309: !0,
                            2308: !0,
                            2310: !0,
                            2311: !0,
                            2316: !0,
                            2317: !0
                        })[f.id] && ({
                            1103: !0,
                            1104: !0,
                            1107: !0,
                            1110: !0,
                            1113: !0,
                            1114: !0,
                            1115: !0,
                            1116: !0,
                            2314: !0,
                            2315: !0,
                            2318: !0,
                            2319: !0,
                            2320: !0
                        })[F[G]])
                            continue;
                        if (({
                            "0906": !0,
                            "0905": !0,
                            "0904": !0,
                            "0903": !0,
                            "0902": !0,
                            "0901": !0,
                            2309: !0,
                            2308: !0,
                            2310: !0,
                            2311: !0,
                            2316: !0,
                            2317: !0
                        })[F[G]] && ({
                            1103: !0,
                            1104: !0,
                            1107: !0,
                            1110: !0,
                            1113: !0,
                            1114: !0,
                            1115: !0,
                            1116: !0,
                            2314: !0,
                            2315: !0,
                            2318: !0,
                            2319: !0,
                            2320: !0
                        })[f.id])
                            continue
                    }
                    var H;
                    if (G < 0)
                        if (Q[f.id])
                            H = N;
                        else
                            break;
                    else
                        H = v[F[G]] || {
                            lat: 999,
                            lng: 999
                        };
                    var J = (E - H.lng) * 58.1
                      , K = (D - H.lat) * 111.2
                      , L = J * J + K * K;
                    if (H === z || H === f)
                        continue;
                    if (H === N) {
                        if (L > u && z === M && H.id.indexOf(";") > 0)
                            continue
                    } else if (L > u && (!f.name || H.name !== f.name))
                        continue;
                    L = Math.sqrt(L);
                    var R = Math.round(L / t * 60);
                    R += z.time,
                    z.route || !z.prev_stop && c < 0 || (R += s),
                    R < k && (R = k);
                    if (R > d)
                        continue;
                    if (P[H.id])
                        if (!1 && h === 1 && z.prev_stop && typeof cfg === "object" && cfg.defaultCity === "latvia")
                            f = z.prev_stop,
                            n = z.id,
                            y = z.prev_stop_start_time;
                        else {
                            if (R > H.time)
                                continue;
                            if (R == H.time && h >= H.changes)
                                continue;
                            var S = {
                                legs: [{
                                    start_stop: z,
                                    start_time: c * (z.time - (z.route ? s : 0)),
                                    finish_stop: H,
                                    finish_time: c * (R - s),
                                    route: null
                                }]
                            };
                            W.push(S)
                        }
                    else {
                        if (R > H.time)
                            continue;
                        if (R != H.time || h < H.changes)
                            H.route = !1,
                            H.prev_stop = z,
                            H.prev_stop_start_time = z.time - (z.route ? s : 0);
                        else
                            continue
                    }
                    j && z.route && (H.rideStart = z.rideStart,
                    H.rideEnd = z.rideEnd),
                    H.time = R,
                    H.changes = h;
                    var T = X[R];
                    T ? T[T.length] = H : X[R] = [H]
                }
            }
            h = f.changes || 0;
            if (h <= r) {
                var U = f.routes || [];
                for (var G = 0, V = U.length; G < V; G += 2) {
                    var Y = w[U[G]];
                    if (g) {
                        if (Y.available === 0 && i)
                            continue;
                        a.direct_routes.push(Y),
                        G + 2 < V && U[G + 2] == U[G] && (G += 2)
                    } else if (!Y.available)
                        continue;
                    if (typeof Y.times === "string") {
                        var Z = ti.fGetRoutes(Y.id);
                        Y.times = ti.explodeTimes(Y.times),
                        Y.city = Z.city,
                        Y.transport = Z.transport,
                        Y.num = Z.num,
                        Y.stops = Z.stops,
                        Y.platforms = Z.platforms,
                        Y.entry = Z.entry,
                        Y.specialDates = Z.specialDates
                    }
                    var $ = Y.times
                      , _ = "";
                    e && e.indexOf(Y.transport) < 0 && (f.city.indexOf("riga") < 0 ? f.city.indexOf("liep") < 0 ? f.city.indexOf("jelg") >= 0 && (_ = "jelg") : _ = "liep" : _ = "riga");
                    var ba = U[G + 1]
                      , bb = Y.stops || Y.raw_data.split(";").slice(ti.RT_ROUTESTOPS);
                    if (c == 1 && ba >= bb.length - 1 || c == -1 && ba == 0)
                        continue;
                    var bc;
                    if ((bc = Y.entry).charAt(ba) == m)
                        continue;
                    bb[ba] == bb[ba + c] && (ba += c);
                    if (!$)
                        continue;
                    var be = $.workdays
                      , bh = $.valid_from
                      , bi = $.valid_to
                      , bj = $.trip_operators
                      , bk = $.trip_groups
                      , bl = $.trip_ids
                      , bm = $.tag
                      , bn = $.times;
                    $ = null;
                    var bo = be.length, bp = bo, bq, br, bs = 0, bt = 0;
                    x = Y.specialDates;
                    for (var bu = 0, bv = x.length; bu < x.length; ++bu) {
                        if (!x[bu])
                            continue;
                        if (x[bu++][p]) {
                            (bq = x[bu]) === "*" && (bq = q);
                            break
                        }
                        x[bu] === "*" && (bq = "0")
                    }
                    var bw = y || k;
                    if (f.route && Y.num === f.route.num && Y.transport === f.route.transport && Y.city === f.route.city)
                        bw -= s;
                    else if (h > 0 && typeof cfg == "object" && cfg.defaultCity == "latvia" && !y) {
                        bw -= s;
                        var bx = Y;
                        c == -1 && (bx = f.route || f.prev_stop && f.prev_stop.route),
                        bx && (bx.transport == "internationalbus" ? bw += Math.max(s, 20) : bx.transport == "train" ? bw += Math.max(s, ({
                            1: 10,
                            2: 15,
                            3: 20
                        })[bx.num.charAt(1)] || 10) : bw += Math.max(s, ({
                            2: 5,
                            3: 5,
                            4: 10,
                            5: 10,
                            6: 10,
                            7: 15,
                            8: 20
                        })[bx.num.charAt(0)] || s))
                    }
                    var by = bw * c;
                    bw >= 1440 && (bs = bw - bw % 1440);
                    var bz = !1;
                    do {
                        var bA = -1, bB = Number.POSITIVE_INFINITY, bC, bD, bE = null, bF = !g || !I, bG = c * bo, bH = +(new Date);
                        for (var bI = bp + ba * bo; bp-- > 0; ) {
                            --bI;
                            if (A) {
                                var bJ = A[bj[bp]];
                                if (typeof bJ != "string")
                                    continue;
                                if (bJ != "" && ("," + bJ + ",").indexOf("," + bk[bp] + ",") < 0)
                                    continue
                            }
                            if (B && B.indexOf("," + bl[bp] + ",") >= 0)
                                continue;
                            bC = bD = bn[bI];
                            if (bC < 0)
                                continue;
                            if (bC - by >= 1440 || bC * c - bw >= 1440)
                                bC = by + (bC - by) % 1440;
                            bC < by == (c == 1) && bC != by && (bC = (bw + 1440) * c - (by - bC) % 1440),
                            bD = bC - bD,
                            bC *= c;
                            if (bC < bw)
                                continue;
                            bD ? (bq = ((+q + Math.floor(bD / 1440)) % 7 || 7).toString(),
                            br = p + bD / 1440) : (bq = q,
                            br = p);
                            if ((bC < bB || g || bz) && (!q || be[bp].indexOf(bq) >= 0 || C && C.indexOf("," + bl[bp] + ",") >= 0) && (!o || bm.charAt(bp) === "1") && (!bi[bp] || bi[bp] >= br) && bh[bp] <= br) {
                                if (bn[bI + bG] < 0)
                                    continue;
                                bA = bI,
                                bB = bC,
                                bt = bD;
                                if (bz || g) {
                                    if (!i) {
                                        var S = {
                                            route: ti.fGetRoutes(Y.id),
                                            start_time: bB,
                                            date: bE,
                                            trip_num: bA % bo
                                        };
                                        S.route.stopId = f.id,
                                        W.push(S),
                                        bA = -2;
                                        continue
                                    }
                                    break
                                }
                            }
                        }
                        bf += +(new Date) - bH;
                        if (bA < 0) {
                            if (bA != -2 && !i) {
                                var S = {
                                    route: ti.fGetRoutes(Y.id),
                                    start_time: -1,
                                    trip_num: -1
                                };
                                S.route.stopId = f.id,
                                W.push(S)
                            }
                            break
                        }
                        var bK, bL = c * bn[bA % bo];
                        if (bs || bt)
                            bE = new Date(a.date.valueOf()),
                            bE.setDate(bE.getDate() + Math.floor(bt / 1440));
                        g || bz || n ? bK = c === -1 ? 1 : bb.length : bL < Y.trip_start_time ? (bK = c == 1 ? bb.length : 1,
                        Y.trip_start_time = bL,
                        Y.pos_max = c * ba) : (bK = Y.pos_max,
                        bK > c * ba && bL == Y.trip_start_time && (Y.pos_max = c * ba));
                        var bG = c * bo;
                        for (var bM = ba; c * (bM += c) < bK; ) {
                            bA += bG;
                            if (bc.charAt(bM) == l)
                                continue;
                            var R;
                            if ((R = bn[bA]) >= 0) {
                                R = c * (R + bt) + s;
                                if (R > d && !bz)
                                    break;
                                if (R < k && !n)
                                    continue;
                                var H;
                                if (!(H = v[bb[bM]]))
                                    continue;
                                if (_ && H.city.indexOf(_) >= 0)
                                    continue;
                                var bN;
                                g && !bF && (bF = H.id in I);
                                if ((P[H.id] || H.id === n) && bF) {
                                    if (h > 0 && R > H.time)
                                        continue;
                                    if (h > 0 && R == H.time && h >= H.changes)
                                        continue;
                                    if (h == 0 && !bz && typeof cfg === "object" && cfg.defaultCity === "intercity") {
                                        bz = !0,
                                        bp = bo,
                                        a.direct_routes.push(Y);
                                        break
                                    }
                                    if (g || bz) {
                                        Y.available = 0;
                                        if (f.id.indexOf(";") < 0)
                                            for (var bO = 0; bO < bM; ++bO) {
                                                if (bc.charAt(bO) == l || bb[bO] == bb[bO + 1])
                                                    continue;
                                                if (O[bb[bO]] && bn[bA + bG * (bO - bM)] >= 0) {
                                                    f = v[bb[bO]],
                                                    bB = bn[bA + bG * (bO - bM)] + bt;
                                                    break
                                                }
                                            }
                                        for (var bO = bK; --bO > bM; ) {
                                            if (bc.charAt(bO) == l || bb[bO] == bb[bO - 1])
                                                continue;
                                            if (P[bb[bO]] && bn[bA + bG * (bO - bM)] >= 0) {
                                                H = v[bb[bO]],
                                                R = bn[bA + bG * (bO - bM)] + s + bt;
                                                break
                                            }
                                        }
                                    }
                                    var S = {
                                        direct_trip: bz || g,
                                        legs: [{
                                            start_stop: f,
                                            start_time: c * bB,
                                            trip_date: bE,
                                            finish_stop: H,
                                            finish_time: c * (R - s),
                                            route: Y,
                                            trip_num: bA % bG,
                                            start_pos: c >= 0 ? ba : bM,
                                            finish_pos: c >= 0 ? bM : ba
                                        }]
                                    };
                                    W.push(S),
                                    bM = bK;
                                    if (bz && R >= H.time)
                                        break
                                } else {
                                    if (g || bz || n)
                                        continue;
                                    if (R >= (bN = H.time)) {
                                        if (bN < k)
                                            break;
                                        continue
                                    }
                                    if (Y.available === 2) {
                                        H.time = R,
                                        H.changes = -1,
                                        H.trip_date = bE;
                                        continue
                                    }
                                    if (h < r)
                                        H.route = Y,
                                        H.prev_stop = f,
                                        H.prev_stop_start_time = bB,
                                        H.trip_num = bA % bG,
                                        H.start_pos = c >= 0 ? ba : bM,
                                        H.finish_pos = c >= 0 ? bM : ba;
                                    else
                                        continue
                                }
                                H.time = R,
                                H.trip_date = bE,
                                H.changes = h + 1,
                                j && (H.rideStart = h > 0 ? f.rideStart : bB,
                                H.rideEnd = R - s);
                                var T = X[R];
                                T ? T[T.length] = H : X[R] = [H]
                            }
                        }
                    } while (g || bz);bn = null
                }
            }
        }
        if (!i) {
            W.sort(function(a, b) {
                if (a.route.sortKey < b.route.sortKey)
                    return -1;
                if (a.route.sortKey > b.route.sortKey)
                    return 1;
                if (a.start_time < b.start_time)
                    return -1;
                if (a.start_time > b.start_time)
                    return 1;
                return 0
            });
            return W
        }
        var bP = {}
          , bQ = Number.POSITIVE_INFINITY;
        for (var G = W.length; --G >= 0; ) {
            var S = W[G]
              , bR = S.legs[0].route ? ";" + S.legs[0].route.id : ""
              , bS = S.legs[S.legs.length - 1];
            S.finish_time = bS.finish_time,
            S.walk_time = bS.route ? 0 : Math.abs(bS.finish_time - bS.start_time),
            R = S.departure_time;
            for (var bT = S.legs[0].start_stop; bT; bT = bT.prev_stop) {
                if (!bT.prev_stop)
                    break;
                bS = {
                    start_stop: bT.prev_stop,
                    start_time: c * bT.prev_stop_start_time,
                    finish_stop: bT,
                    finish_time: c * (bT.time - s),
                    route: bT.route,
                    trip_num: bT.trip_num,
                    trip_date: bT.trip_date,
                    start_pos: bT.start_pos,
                    finish_pos: bT.finish_pos
                },
                bT.route ? bR = c == 1 ? ";" + bT.route.id + bR : bR + ";" + bT.route.id : (c < 0 && (!bT.prev_stop || !bT.prev_stop.prev_stop) && (bS.finish_time -= s),
                S.walk_time += Math.abs(bS.finish_time - bS.start_time)),
                S.legs.splice(0, 0, bS)
            }
            if (c == -1) {
                var bU = S.legs[0];
                if (!bU.route) {
                    var bV = S.legs[1];
                    bV && bV.route ? (bU.start_time += bV.start_time - bU.finish_time,
                    bU.finish_time = bV.start_time) : (bU.start_time -= s,
                    bU.finish_time -= s)
                }
                S.finish_time = S.legs[0].start_time,
                S.legs = S.legs.reverse();
                for (var bW = -1, bX = S.legs.length; ++bW < bX; ) {
                    bS = S.legs[bW];
                    var R = bS.start_time - bS.finish_time;
                    !bS.route && bW > 0 ? (bS.start_time = S.legs[bW - 1].finish_time,
                    bS.finish_time = bS.start_time + R) : (bS.finish_time = bS.start_time,
                    bS.start_time -= R);
                    var f = bS.finish_stop;
                    bS.finish_stop = bS.start_stop,
                    bS.start_stop = f
                }
            }
            var bU = S.legs[0]
              , bV = S.legs[1];
            if (!bU.route)
                if (bV && bV.route)
                    bU.start_time += bV.start_time - s - bU.finish_time,
                    bU.finish_time = bV.start_time - s;
                else if (a.no_just_walking)
                    continue;
            S.start_time = S.legs[0].start_time,
            S.travel_time = S.finish_time - S.start_time,
            bR == "" ? (bR = "W",
            S.code = bR,
            bQ = S.walk_time) : (bR += ";",
            S.code = bR,
            S.direct_trip && (bR = S.legs[0].start_time + "T" + bR));
            var bY = bP[bR];
            if (!bY || c == 1 && S.finish_time < bY.finish_time || c != 1 && S.start_time > bY.start_time)
                bP[bR] = S
        }
        if (g)
            a.results = W;
        else {
            var bZ = [];
            for (var bR in bP) {
                var S = bP[bR]
                  , b$ = S.code;
                if (S.walk_time >= bQ && bR != "W")
                    continue;
                for (var G = bZ.length; --G >= 0; ) {
                    var b_ = bZ[G];
                    if (b_.code.indexOf(b$) >= 0 || b$.indexOf(b_.code) >= 0)
                        if (c == 1 && b_.finish_time <= S.finish_time || c != 1 && b_.start_time >= S.start_time) {
                            if (b_.walk_time + b_.travel_time <= S.walk_time + S.travel_time && b$.length >= b_.code.length)
                                break
                        } else
                            !b_.direct_trip && b_.walk_time + b_.travel_time >= S.walk_time + S.travel_time && bZ.splice(G, 1)
                }
                (G < 0 || S.direct_trip) && bZ.push(S)
            }
            for (var G = bZ.length; --G >= 0; ) {
                var S = bZ[G];
                a.reverseOriginal == -1 ? S.code = S.code + "T" + S.legs[S.legs.length - 1].finish_time : S.code = S.legs[0].start_time + "T" + S.code
            }
            a.results = bZ,
            typeof window === "object" ? window.setTimeout(function() {
                ti.findTrips(a)
            }, 10) : ti.findTrips(a)
        }
    };
    return bg()
}
ti.filterSearchResults = function(a, b) {
    for (var c = a.length; --c >= 0; ) {
        var d = a[c];
        if (d.remove)
            continue;
        for (j = a.length; --j >= 0; ) {
            if (c === j)
                continue;
            a[j].code.indexOf(d.code) < 0 ? d.direct_trip && !a[j].direct_trip && d.start_time >= a[j].start_time && d.finish_time <= a[j].finish_time && (a[j].remove = !0) : a[j].walk_time < d.walk_time ? d.remove = !0 : a[j].remove = !0
        }
    }
    if (cfg.defaultCity == "intercity") {
        for (var c = a.length; --c >= 0; ) {
            var d = a[c];
            if (d.remove)
                continue;
            for (j = a.length; --j >= 0; ) {
                if (c === j)
                    continue;
                if (a[j].remove || a[j].legs.length <= 1)
                    continue;
                d.legs.length <= a[j].legs.length && d.start_time > a[j].start_time && d.finish_time <= a[j].finish_time && (a[j].remove = !0),
                d.legs.length <= a[j].legs.length && d.start_time >= a[j].start_time && d.finish_time < a[j].finish_time && (a[j].remove = !0)
            }
        }
        for (var c = a.length; --c >= 0; ) {
            var d = a[c];
            d.start_time >= 1440 && (d.remove = !0)
        }
    }
    var e = {};
    for (var c = a.length; --c >= 0; ) {
        var d = a[c];
        if (d.remove)
            continue;
        if (d.start_time >= 1680 || d.finish_time < 0) {
            d.remove = !0;
            continue
        }
        d.penalty_time = d.travel_time + 5 * d.legs.length;
        var f = e[d.code];
        if (!f || f.penalty_time > d.penalty_time)
            e[d.code] = d
    }
    a = [];
    for (var g in e)
        a.push(e[g]);
    a.sort(function(a, b) {
        return a.penalty_time - b.penalty_time
    });
    var h = Number.POSITIVE_INFINITY;
    for (var c = a.length; --c >= 0; )
        a[c].ok = c < 5 ? 1 : 0,
        h > a[c].travel_time && (h = a[c].travel_time);
    a.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    });
    for (var c = a.length; --c >= 0; ) {
        if (a[c].direct_trip) {
            a[c].ok = 1;
            continue
        }
        var i = b == 1 ? a[c].finish_time - a[0].finish_time : a[0].start_time - a[c].start_time;
        i > a[0].travel_time / 2 + 60 ? a[c].ok = 0 : a[c].penalty_time > 2 * h && i > h && c >= 2 ? a[c].ok = 0 : a[c].walk_time > h ? a[c].ok = 0 : c < 3 && (a[c].ok = 1)
    }
    a.sort(function(a, b) {
        return b.ok - a.ok
    });
    for (var c = a.length; --c > 0; ) {
        if (a[c].ok == 1)
            break;
        a.pop()
    }
    a.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    });
    return a
}
,
ti.finalizeSearchResults = function(a, b) {
    var c = a.results
      , d = Array(c.length);
    for (var e = 0; e < c.length; e++) {
        var f = c[e]
          , g = f.legs
          , h = 0;
        d[e] = {
            start_time: f.start_time - h,
            finish_time: f.finish_time - h,
            travel_time: f.travel_time,
            walk_time: f.walk_time,
            direct_trip: f.direct_trip,
            legs: [],
            code: f.code
        };
        var i = Number.POSITIVE_INFINITY;
        for (var j = 0; j < g.length; j++) {
            var k = g[j]
              , l = k.route ? k.route.times.workdays[k.trip_num] : ""
              , m = k.route ? k.route.times.trip_ids[k.trip_num] : 0
              , n = k.route ? k.route.times.trip_codes[k.trip_num] : 0
              , o = k.route ? k.route.times.trip_operators[k.trip_num] : ""
              , p = k.route ? k.route.times.trip_groups[k.trip_num] : ""
              , q = k.start_stop && ti.fGetStopDetails(k.start_stop.id)
              , r = k.finish_stop && ti.fGetStopDetails(k.finish_stop.id)
              , s = k.route && k.route.platforms && k.route.platforms.split(",") || []
              , t = {
                trip_num: k.trip_num,
                trip_id: m,
                trip_code: n,
                trip_date: k.trip_date,
                trip_operator: o,
                trip_group: p,
                start_pos: k.start_pos,
                finish_pos: k.finish_pos,
                start_time: k.start_time - h,
                start_platform: s[k.start_pos || 0],
                finish_platform: s[k.finish_pos || 0],
                finish_time: k.finish_time - h,
                weekdays: l,
                start_stop: q && {
                    id: q.id,
                    name: q.name,
                    street: q.street,
                    lat: q.lat,
                    lng: q.lng
                },
                finish_stop: r && {
                    id: r.id,
                    name: r.name,
                    street: r.street,
                    lat: r.lat,
                    lng: r.lng
                }
            };
            if (k.route) {
                t.route = ti.fGetRoutes(k.route);
                if (b) {
                    var u = k.start_time - h
                      , v = Number.POSITIVE_INFINITY;
                    n = t.route.num + String("0000" + n).slice(-4);
                    for (var w = 0; w < b.length; ++w) {
                        var f = b[w];
                        if (f.code == n && f.fromStopId == q.info && f.toStopId == r.info) {
                            t.online_data = f;
                            break
                        }
                        if (!1 && f.code && f.code.indexOf(t.route.num) === 0) {
                            var x = Math.abs(u - ti.toMinutes(f.departureAsStr));
                            v > x && x <= 5 && (v = x,
                            t.online_data = f)
                        }
                    }
                }
            }
            if (ti.taxi)
                if (k.route && k.start_time - i > 30 && (j == g.length - 1 || j == g.length - 2 && !g[g.length - 1].route) || !k.route && k.finish_time - k.start_time >= 15 || j == 0 && k.start_time - a.start_time > 120) {
                    for (var w = 0; w < ti.taxi.length; ++w) {
                        var y = ti.taxi[w]
                          , z = (q.lng - y.lng) * 58.1
                          , A = (q.lat - y.lat) * 111.2
                          , B = z * z + A * A
                          , z = (r.lng - y.lng) * 58.1
                          , A = (r.lat - y.lat) * 111.2
                          , C = z * z + A * A;
                        B <= y.radius && C <= y.radius && (t.taxi || (t.taxi = []),
                        t.taxi.push({
                            name: y.name,
                            phone: y.phone,
                            km: Math.round(Math.sqrt(B))
                        }))
                    }
                    if (t.taxi) {
                        t.taxi.sort(function(a, b) {
                            return a.km - b.km
                        });
                        var D = t.taxi[0].km;
                        for (var w = 1; w < t.taxi.length; ++w)
                            if (t.taxi[w].km > D) {
                                t.taxi.length = w;
                                break
                            }
                    }
                }
            d[e].legs.push(t),
            k.route && (i = k.finish_time)
        }
    }
    typeof cfg === "object" && cfg.defaultCity === "intercity" ? (d.sort(function(a, b) {
        return a.start_time - b.start_time
    }),
    a.reverse == -1 && d.sort(function(a, b) {
        return -(a.finish_time - b.finish_time)
    })) : (d.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }),
    a.reverse == -1 && d.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    }));
    return d
}
;
function $(a) {
    return document.getElementById(a)
}
var pg = {
    urlPrevious: "",
    urlLoaded: "",
    urlUnderSchedulePane: "",
    language: "",
    languageUnderSchedulePane: "",
    city: "",
    transport: "",
    schedule: null,
    optimalResults: [],
    transfers: [],
    cityTransportRoutes: {},
    showDeparturesWithNumbers: "",
    GMap: null,
    hashForMap: "",
    map: {},
    mapOverlays: [],
    mapStops: {},
    mapStopForZones: "",
    inputActive: null,
    stopsSuggested: [],
    stopsSuggestedForText: "",
    realTimeDepartures: {},
    inputStop: "",
    inputStopText: "",
    inputStart: "",
    inputFinish: "",
    timerSuggestedStopsHide: 0,
    timerSuggestedStopsShow: 0,
    imagesFolder: "_imagesnew/",
    translationFolder: "_translation/",
    browserVersion: 999
};
(function() {
    navigator.appVersion.indexOf("MSIE") >= 0 && (pg.browserVersion = parseFloat(navigator.appVersion.split("MSIE")[1])),
    typeof document.body.style.transform != "undefined" ? pg.transformCSS = "transform" : typeof document.body.style.MozTransform != "undefined" ? pg.transformCSS = "-moz-transform" : typeof document.body.style.webkitTransform != "undefined" ? pg.transformCSS = "-webkit-transform" : typeof document.body.style.msTransform != "undefined" ? pg.transformCSS = "-ms-transform" : typeof document.body.style.OTransform != "undefined" && (pg.transformCSS = "-o-transform");
    var a = ["stops.lt", "ridebus.org", "marsruty.ru"];
    for (var b = 0; b < a.length; ++b)
        if (window.location.host.indexOf(a[b]) >= 0) {
            pg.imagesFolder = "../_images/",
            pg.translationFolder = "../_translation/";
            break
        }
})(),
pg.bodyKeyDown = function(a, b) {
    b || (b = window.event ? window.event.keyCode : a.keyCode);
    if (b == 27) {
        var c = $("ulScheduleDirectionsList");
        c && c.style && c.style.display != "none" ? c.style.display = "none" : pg.schedule && pg.aScheduleClose_Click(a)
    }
}
,
pg.fLang_Click = function(a) {
    var b = a && (a.target || a.srcElement);
    if (b && (b.tagName || "").toLowerCase() == "a") {
        if (b.innerHTML.length < 10) {
            pg.fUrlSet({
                schedule: pg.schedule,
                language: b.innerHTML
            });
            return pg.cancelEvent(a)
        }
    } else if (b && (b.tagName || "").toLowerCase() == "img") {
        pg.fUrlSet({
            schedule: pg.schedule,
            language: b.src.slice(-6, -4)
        });
        return pg.cancelEvent(a)
    }
    return !1
}
,
pg.divHeader_Click = function(a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    while (b && b.nodeName.toLowerCase() !== "a")
        b = b.parentNode;
    if (b && b.href && b.href.indexOf("http:") >= 0)
        return !0;
    pg.aScheduleClose_Click(a)
}
,
pg.aScheduleClose_Click = function(a) {
    a = a || window.event;
    if (pg.schedule)
        if (pg.urlUnderSchedulePane == "")
            pg.city = "nothing",
            pg.fUrlSet({
                city: pg.schedule.city,
                transport: pg.schedule.transport,
                schedule: null
            });
        else {
            var b = pg.fUrlParse(pg.urlUnderSchedulePane);
            b.language != pg.language && (b.language = pg.language,
            pg.city = "nothing"),
            b.schedule = null,
            pg.fUrlSet(b)
        }
    return pg.cancelEvent(a)
}
,
pg.fCreateLanguagesBar = function() {
    var a = $("divLang")
      , b = ""
      , c = cfg.city.languages.split(",");
    for (var d = 0; d < c.length; d++) {
        var e = c[d];
        cfg.city.languageFlags ? b += "<a title=\"" + cfg.languages[e] + "\"><img src=\"" + e + ".png\" style=\"width:32px; height:26px; padding:0 5px;\"></a>" : (b += "<a title=\"" + cfg.languages[e] + "\" class=\"underlined\">" + e + "</a>",
        cfg.city.navigation === "riga" && d % 3 === 2 ? b += " " : b += "&nbsp;")
    }
    a.innerHTML = b
}
,
pg.fTranslateStaticTexts = function() {
    if (cfg.defaultCity === "chelyabinsk" && (pg.language === "ru" || pg.language === "" && cfg.defaultLanguage === "ru")) {
        i18n.transport.minibus = i18n.transport1.minibus = cfg.city.minibus;
        var a = i18n.lowFloorVehicles.lastIndexOf(",");
        a > 1 && (i18n.lowFloorVehicles = i18n.lowFloorVehicles.substr(0, a)),
        a = i18n.lowFloorDepartures.lastIndexOf(","),
        a > 80 && (i18n.lowFloorDepartures = i18n.lowFloorDepartures.substr(0, a) + "."),
        a = i18n.checkHandicapped.lastIndexOf(",")
    }
    cfg.defaultCity === "klaipeda" && (i18n.lowFloorDepartures = i18n.miniBusDepartures || ""),
    document.title = i18n.headerTitle,
    ($("header") || {}).innerHTML = (cfg.city.logoInHeader || "") + i18n.headerTitle,
    ($("aBetaWebsite") || {}).innerHTML = pg.language == "ee" ? "Kasuta uut versiooni" : "Try new version",
    ($("spanYouAreHere") || {}).innerHTML = i18n.youAreHere,
    $("spanRoutesFromStop").innerHTML = i18n.departingRoutes + ":",
    $("spanPlan").innerHTML = cfg.city.navigation !== "top" ? i18n.tripPlanner : i18n.tripPlanner.replace("<br/>", " ").replace("<br>", " "),
    $("spanShowMap").innerHTML = i18n.showStopsMap,
    $("spanTickets").innerHTML = cfg.city.externalLinks.spanTickets[pg.language] || cfg.city.externalLinks.spanTicketsHarju.en,
    $("spanTicketsHarju").innerHTML = cfg.city.externalLinks.spanTicketsHarju[pg.language] || cfg.city.externalLinks.spanTicketsHarju.en,
    $("aTickets").href = cfg.city.externalLinks.aTickets[pg.language] || cfg.city.externalLinks.aTickets.en,
    $("aTicketsHarju").href = cfg.city.externalLinks.aTicketsHarju[pg.language] || cfg.city.externalLinks.aTicketsHarju.en,
    $("spanTransportNews").innerHTML = cfg.city.externalLinks.spanTransportNews[pg.language] || cfg.city.externalLinks.spanTransportNews.en,
    $("spanTransportNewsHarju").innerHTML = cfg.city.externalLinks.spanTransportNewsHarju[pg.language] || cfg.city.externalLinks.spanTransportNewsHarju.en,
    $("aTransportNews").href = cfg.city.externalLinks.aTransportNews[pg.language] || cfg.city.externalLinks.aTransportNews.en,
    $("aTransportNewsHarju").href = cfg.city.externalLinks.aTransportNewsHarju[pg.language] || cfg.city.externalLinks.aTransportNewsHarju.en,
    ($("aPlanShowMap") || {}).innerHTML = "<br/><br/>" + i18n.showStopsMap.toLowerCase(),
    $("spanPrintSchedule").innerHTML = i18n.print,
    $("spanReturnToRoutes").innerHTML = i18n.returnToRoutes,
    $("spanShowDirectionsMap").innerHTML = i18n.showInMap,
    $("buttonSearch").value = i18n.searchRoute,
    $("inputReverseDepart").text = i18n.depart,
    $("inputReverseArrive").text = i18n.arrive,
    $("labelDepartureDate").innerHTML = i18n.departuresFor,
    $("inputDepartureDate-1").text = i18n.fromNow,
    $("inputDate0").text = $("inputDepartureDate0").text = i18n.today,
    $("inputDate1").text = $("inputDepartureDate1").text = i18n.tomorrow,
    ($("mapShowAllStops") || {}).title = i18n.mapShowAllStops;
    var b = new Date;
    for (var a = 2; a <= 6; a++) {
        var c = new Date(b.getFullYear(),b.getMonth(),b.getDate() + a);
        $("inputDate" + a).text = pg.formatDate(c),
        $("inputDepartureDate" + a).text = pg.formatDate(c)
    }
    $("labelHandicapped").title = i18n.checkHandicapped,
    $("aExtendedOptions").innerHTML = $("divContentPlannerOptionsExtended").style.display ? i18n.extendedOptions : i18n.extendedOptionsHide,
    $("labelRoutes").innerHTML = i18n.rideOnlyRoutes + ":",
    $("labelChangeTimeText").innerHTML = i18n.timeForConnection + ":",
    $("labelWalkMaxText").innerHTML = i18n.walkingMax + ":",
    $("labelWalkSpeedText").innerHTML = i18n.walkingSpeed + ":";
    var d = $("inputStop");
    d.title = i18n.typeStartStop,
    d.className == "empty" && (d.value = i18n.startStop),
    d = $("inputStart"),
    d.title = i18n.typeStartStop,
    d.className == "empty" && (d.value = i18n.startStop),
    d = $("inputFinish"),
    d.title = i18n.typeFinishStop,
    d.className == "empty" && (d.value = i18n.finishStop),
    d = $("inputRoutes"),
    d.title = i18n.typeRouteNameOrNumber,
    d.className == "empty" && (d.value = i18n.typeRouteNameOrNumber),
    $("labelInputRoutes").innerHTML = i18n.filter + ":"
}
,
pg.fGetCity = function(a) {
    for (var b in cfg.cities)
        if (cfg.cities[b].region === a)
            return b;
    return a
}
,
pg.fCreateNavigation = function() {
    var a = "<dt class=\"splitter\"></dt><!-- -->"
      , b = pg.fGetCity(pg.city)
      , c = 0;
    if (cfg.cities[b]) {
        var d = ""
          , e = ""
          , f = {};
        for (var g = 1; g <= 2; g++) {
            var h = pg.fUrlSet({
                city: b,
                transport: null,
                hashForMap: null
            }, !0);
            if (!cfg.cities[b].goHomeTimeout) {
                d += "<dt class=\"routes\"><a id=\"" + (g == 1 ? "city" : "region") + "\" href=\"#" + h + "\">" + (cfg.cities[b].logo || "") + "<span class=\"hover\">";
                var i = cfg.cities[b].name;
                i ? d += i[pg.language] || i.en || (g == 1 ? i18n.cityRoutes : i18n.regionRoutes) : d += g == 1 ? i18n.cityRoutes : i18n.regionRoutes,
                d += "</span></a></dt>"
            }
            for (var j = 0; j < cfg.cities[b].transport.length; j++) {
                var k = cfg.cities[b].transport[j];
                if ((cfg.cities[b].transportTemporary || {})[k] && !pg.cityTransportRoutes[b + "_" + k])
                    continue;
                var l = " checked=\"checked\"";
                cfg.cities[b].transportPlannerUncheck && cfg.cities[b].transportPlannerUncheck[k] && (l = ""),
                h = pg.fUrlSet({
                    city: b,
                    transport: k,
                    hashForMap: null
                }, !0);
                var m = ((cfg.cities[b].transportTip || {})[k] || {})[pg.language];
                m && (m = " title=\"" + m + "\""),
                k == "ferry" ? (d += ("<dt class=\"transport\"><a id=\"" + b + "_{tr}\" target=\"_blank\" href=\"http://www.veeteed.com/index.php?moodul=100&idc=101106510001000&l=6&al=7&periood=356\"" + m + "><span class=\"icon icon_{tr}\"></span><span class=\"hover\">" + i18n.transport[k] + "</span></a></dt>").replace(/{tr}/g, k),
                f[k] = !0) : d += ("<dt class=\"transport\"><a id=\"" + b + "_{tr}\" href=\"#" + h + "\"" + m + "><span class=\"icon icon_{tr}\"></span><span class=\"hover\">" + i18n.transport[k] + "</span></a></dt>").replace(/{tr}/g, k),
                f[k] || (f[k] = !0,
                e += ("<label for=\"checkbox{tr}\"><input name=\"checkbox{tr}\" id=\"checkbox{tr}\" type=\"checkbox\" value=\"{tr}\"" + l + "/>").replace(/{tr}/g, k) + i18n.transport[k] + "</label> "),
                cfg.transportOrder[k] = ++c
            }
            b = cfg.cities[b].region;
            if (!b || !cfg.cities[b])
                break;
            d += a
        }
        $("listTransports").innerHTML = d,
        $("divContentPlannerOptionsTransport").innerHTML = i18n.optionsTransport + ":" + e
    }
    cfg.transportOrder.commercialbus && cfg.transportOrder.regionalbus && (cfg.transportOrder.commercialbus = cfg.transportOrder.regionalbus)
}
,
pg.fLoadPage = function() {
    cfg.city.languages = cfg.city.languages || "en,ru",
    cfg.defaultLanguage = cfg.city.defaultLanguage || cfg.city.languages.split(",")[0],
    pg.showDeparturesWithNumbers !== !0 && pg.showDeparturesWithNumbers !== !1 && (pg.showDeparturesWithNumbers = cfg.city.showDeparturesWithNumbers,
    pg.toggleClass($("divScheduleContentInner"), "HideNumbers", !pg.showDeparturesWithNumbers)),
    pg.fTranslateStaticTexts(),
    pg.fCreateLanguagesBar(),
    pg.loadedRoutesHash = null,
    pg.loadedDepartingRoutes = null,
    pg.loadedPlannerParams = null,
    pg.fCreateNavigation(),
    pg.fTabActivate();
    pg.schedule && pg.fScheduleLoad()
}
,
pg.fLoadLanguageScript = function(a) {
    var b = $("scriptLanguage");
    b && document.getElementsByTagName("head")[0].removeChild(b);
    var c = document.createElement("script");
    c.setAttribute("id", "scriptLanguage"),
    c.setAttribute("type", "text/javascript"),
    c.setAttribute("src", pg.translationFolder + a + ".js?20160518"),
    document.getElementsByTagName("head")[0].appendChild(c)
}
,
pg.fTogglePlannerOptions = function(a) {
    var b = $("divContentPlannerOptionsExtended");
    b.style.display && a !== !1 ? (b.style.display = "",
    $("aExtendedOptions").innerHTML = i18n.extendedOptionsHide) : (b.style.display = "none",
    $("aExtendedOptions").innerHTML = i18n.extendedOptions);
    if (a)
        return pg.cancelEvent(a)
}
,
pg.replaceHtml = function(a, b) {
    var c = a.nextSibling
      , d = a.parentNode;
    d.removeChild(a),
    a.innerHTML = b,
    c ? d.insertBefore(a, c) : d.appendChild(a)
}
,
pg.storeStyles = function() {
    pg.styles = {};
    var a = document.styleSheets || [];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b].rules || a[b].cssRules || [];
        for (var d = c.length; --d >= 0; ) {
            var e = c[d].selectorText;
            e && (pg.styles[e] = c[d].style)
        }
    }
}
,
pg.getStyle = function(a) {
    return pg.styles[a]
}
,
pg.addCSS = function(a) {
    var b = document.createElement("style");
    b.type = "text/css",
    b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)),
    document.getElementsByTagName("head")[0].appendChild(b)
}
,
pg.toggleClass = function(a, b, c) {
    var d = " " + (a.className || "") + " ";
    c && d.indexOf(" " + b + " ") < 0 ? a.className = (d + b).trim() : !c && d.indexOf(" " + b + " ") >= 0 && (a.className = d.replace(" " + b + " ", "").trim())
}
,
pg.cancelEvent = function(a) {
    a && (a.cancelBubble = !0,
    a.returnValue = !1,
    a.preventDefault && a.preventDefault(),
    a.stopPropagation && a.stopPropagation());
    return !1
}
,
pg.formatDate = function(a) {
    typeof a == "number" && (a = new Date(a * 1e3 * 60 * 60 * 24));
    var b = a.getDate()
      , c = 1 + a.getMonth()
      , d = a.getFullYear();
    if (pg.language == "ru" || pg.language == "ee")
        d = b,
        b = a.getFullYear();
    return (d < 10 ? "0" : "") + d + (c < 10 ? "-0" : "-") + c + (b < 10 ? "-0" : "-") + b
}
,
pg.nonEmptyCount = function(a) {
    var b = 0;
    for (var c in a)
        a.hasOwnProperty(c) && a[c] && ++b;
    return b
}
,
pg.fUrlSet = function(a, b) {
    if (a) {
        a.schedule && pg.schedule && (typeof a.schedule.city == "undefined" && (a.schedule.city = pg.schedule.city),
        typeof a.schedule.transport == "undefined" && (a.schedule.transport = pg.schedule.transport),
        typeof a.schedule.num == "undefined" && (a.schedule.num = pg.schedule.num),
        typeof a.schedule.dirType == "undefined" && (a.schedule.dirType = pg.schedule.dirType),
        typeof a.schedule.stopId == "undefined" && (a.schedule.stopId = pg.schedule.stopId));
        var c = ["city", "transport", "inputStop", "inputStart", "inputFinish", "hashForMap", "language"];
        for (var d = c.length; --d >= 0; )
            typeof a[c[d]] == "undefined" && (a[c[d]] = pg[c[d]])
    } else
        a = pg;
    var e = "";
    if (a.schedule)
        e = (a.schedule.tripNum || "") + (e ? "/" + e : ""),
        e = (a.schedule.stopId || "") + (e ? "/" + e : ""),
        e = (a.schedule.dirType || "") + (e ? "/" + e : ""),
        e = (a.schedule.num || "") + (e ? "/" + e : ""),
        e = (a.schedule.transport || "") + (e ? "/" + e : ""),
        a.schedule.city && a.schedule.city != cfg.defaultCity && (e = a.schedule.city + (e ? "/" + e : "")),
        e += a.hashForMap ? "/map" : "";
    else {
        a.transport == "stop" ? (a.city = pg.fGetCity(a.city),
        e = "stop" + (a.inputStop ? "/" + a.inputStop : "")) : a.transport == "plan" ? (a.city = pg.fGetCity(a.city),
        e = "plan/" + (a.inputStart || "") + (a.inputFinish ? "/" + a.inputFinish : "")) : e = (a.transport || "") + (e ? "/" + e : "");
        if (!e || a.city !== cfg.defaultCity)
            e = a.city + (e ? "/" + e : "");
        e += a.hashForMap ? "/" + a.hashForMap : ""
    }
    e += a.language != cfg.defaultLanguage ? "/" + a.language : "",
    e = ti.toAscii(e, !0);
    if (b)
        return e;
    Hash.go(e);
    return e
}
,
pg.fUrlSetMap = function(a, b) {
    var c = pg.hashForMap || "map";
    a ? (typeof a != "object" && (a = {}),
    a.optimalRoute && (c = "map,,," + a.optimalRoute),
    a.maximized && c.indexOf(",max") < 0 && (c += ",max"),
    a.maximized === !1 && (c = c.replace(",max", "")),
    a.clusters && c.indexOf(",stops") < 0 && (c += ",stops"),
    a.clusters === !1 && (c = c.replace(",stops", ""))) : c = "";
    if (b)
        return c;
    pg.hashForMap = c,
    c = pg.fUrlSet(null, !0),
    c != Hash.getHash() ? Hash.go(c) : pg.fMapShow()
}
,
pg.fUrlParse = function(a) {
    a = decodeURI(a);
    var b = {}
      , c = a.indexOf("#");
    c >= 0 && (a = a.substring(c + 1)),
    a = a ? a.split("/") : [],
    a.length && ("," + cfg.city.languages + ",").indexOf("," + a[a.length - 1] + ",") >= 0 ? b.language = a.pop() : b.language = cfg.defaultLanguage,
    a.length && "map" === a[a.length - 1].substring(0, 3) ? b.hashForMap = a.pop() : b.hashForMap = "",
    b.transport = "",
    a[0] || (b.transport = typeof cfg.city.defaultTransport != "undefined" ? cfg.city.defaultTransport : cfg.city.transport[0]),
    a.length && cfg.cities[a[0]] ? b.city = a.shift() : b.city = cfg.defaultCity,
    a[0] && (b.transport = a[0],
    a[0] === "stop" ? b.inputStop = a[1] || "" : a[0] === "plan" ? (b.inputStart = a[1] || "",
    b.inputFinish = a[2] || "") : a[1] && (b.schedule = {
        city: b.city,
        transport: a[0],
        num: a[1],
        dirType: a[2] || "",
        stopId: a[3] || "",
        tripNum: isNaN(a[4]) ? 0 : +a[4]
    }));
    return b
}
,
pg.fUrlExecute = function(a) {
    var b = pg.fUrlParse(a);
    $("divContent").className = "x" + b.transport;
    var c = pg.language;
    pg.language = b.language;
    var d = pg.city;
    pg.city = b.city;
    var e = pg.hashForMap;
    pg.hashForMap = b.hashForMap,
    pg.transport = b.transport,
    pg.inputStop = b.inputStop || pg.inputStop,
    pg.inputStart = b.inputStart || pg.inputStart,
    pg.inputFinish = b.inputFinish || pg.inputFinish,
    pg.urlPrevious = pg.urlLoaded,
    pg.urlLoaded = a,
    b.schedule ? pg.fScheduleShow(b.schedule) : (pg.fScheduleHide(),
    pg.fTabActivate()),
    c != pg.language && (c || pg.language != cfg.defaultLanguage) && pg.fLoadLanguageScript(pg.language),
    d !== pg.city && (cfg.cities[d] || {
        region: ""
    }).region !== pg.city && pg.fLoadPage(),
    pg.hashForMap ? (e !== pg.hashForMap,
    pg.fMapShow()) : document.body.className.indexOf("Map") >= 0 && pg.fMapHide()
}
,
pg.fTabShowMap_Click = function(a) {
    pg.mapShowAllStops = !0,
    pg.hashForMap == "map" ? pg.fMapShow() : (pg.hashForMap = "map",
    pg.fUrlSet());
    return pg.cancelEvent(a)
}
,
pg.fTabDrive_Click = function(a) {
    pg.mapShowAllStops = !1,
    pg.hashForMap === "map" ? (pg.hashForMap = "map,drive",
    pg.fMapShow()) : (pg.hashForMap = "map,drive",
    pg.fUrlSet());
    return pg.cancelEvent(a)
}
,
pg.fMapHide = function() {
    pg.mapShowVehiclesInterval && (clearInterval(pg.mapShowVehiclesInterval),
    pg.mapShowVehiclesInterval = 0),
    document.body.className = pg.schedule ? "ScheduleDisplayed" : "",
    pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML)
}
,
pg.fMapShow = function() {
    var a = pg.hashForMap.split(","), b, c = !1;
    a[a.length - 1] == "max" && (b = !0,
    a.pop()),
    a[a.length - 1] == "drive" && (b = !0,
    a.pop()),
    a[a.length - 1] == "stops" && (c = !0,
    a.pop());
    var d = a[1] || cfg.defaultCity, e, f, g, h;
    pg.schedule ? (document.body.className = b ? "ScheduleMapDisplayedMax" : "ScheduleMapDisplayed",
    d = pg.schedule.city,
    e = pg.schedule.transport,
    f = pg.schedule.num,
    g = pg.schedule.dirType,
    h = pg.schedule.stopId) : (document.body.className = b ? "MapDisplayedMax" : "MapDisplayed",
    pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML),
    d = a[1] || cfg.defaultCity,
    e = a[2] || "",
    f = a[3] || "",
    g = a[4] || "",
    h = a[5] || "");
    if (pg.GMap) {
        if (typeof ti.stops !== "object" || typeof ti.routes !== "object") {
            setTimeout(pg.fMapShow, 200);
            return
        }
        var i, j;
        pg.mapShowVehiclesInterval || (pg.mapShowVehiclesInterval = setInterval(pg.fShowVehicles, 2e3),
        pg.fShowVehicles());
        if (pg.transport == "plan")
            pg.stopLabelSelected.hide();
        else {
            h || pg.transport == "stop" && (h = pg.inputStop,
            pg.mapShowAllStops = !0);
            if (h) {
                j = ti.fGetAnyStopDetails(h),
                pg.schedule ? A = pg.fUrlSet({
                    schedule: {
                        stopId: j.id
                    }
                }, !0) : A = pg.fUrlSet({
                    transport: "stop",
                    stopId: j.id
                }, !0);
                if (typeof j.latAvg == "number" && typeof j.lngAvg == "number") {
                    i = new GLatLng(j.latAvg,j.lngAvg),
                    pg.stopLabelSelected.setContents(j.name, A),
                    pg.stopLabelSelected.setPoint(i),
                    pg.stopLabelSelected.show();
                    if (pg.transport == "stop" && cfg.defaultCity === "vilnius" && pg.mapStopForZones != h) {
                        pg.mapStopForZones = h;
                        var k = new Date
                          , l = k.getDay() || 7
                          , m = {
                            start_stops: h,
                            finish_stops: "0;0",
                            date: k,
                            weekday: l,
                            transport: {},
                            walk_max: 500,
                            callback2: function() {
                                pg.clusterManager.refresh()
                            }
                        };
                        setTimeout(function() {
                            dijkstra(m, 720, 1)
                        }, 100)
                    }
                } else
                    pg.stopLabelSelected.hide()
            } else
                pg.stopLabelSelected.hide()
        }
        if (f || pg.transport == "plan") {
            if (pg.map.city == d && pg.map.transport == e && pg.map.num == f && pg.map.dirType == g) {
                i && !pg.GMap.getBounds().containsLatLng(i) && pg.GMap.panTo(i);
                return
            }
            pg.map.city = d,
            pg.map.transport = e,
            pg.map.num = f,
            pg.map.dirType = g,
            pg.mapStops = {},
            pg.mapMarkerStart.hide(),
            pg.mapMarkerFinish.hide();
            while (pg.mapOverlays.length)
                pg.GMap.removeOverlay(pg.mapOverlays.pop());
            var n = 999
              , o = -999
              , p = 999
              , q = -999
              , r = ""
              , s = "";
            if (pg.transport == "plan") {
                var t;
                if (f && pg.optimalResults && pg.optimalResults.length) {
                    w = f ? +f - 1 : 0,
                    w >= pg.optimalResults.length && (w = 0),
                    t = pg.optimalResults[w].legs || [],
                    s = i18n.option + " " + (w + 1);
                    for (var u = 0; u < pg.optimalResults.length; ++u)
                        r += "<a href=\"#map,,," + (u + 1) + "\"><span class=\"icon icon_narrow" + (u == w ? " icon_checked" : "") + "\"></span>" + i18n.option + " " + (u + 1) + "</a>"
                } else
                    pg.mapShowAllStops = !0,
                    t = [{
                        start_stop: ti.fGetAnyStopDetails(pg.inputStart),
                        finish_stop: ti.fGetAnyStopDetails(pg.inputFinish)
                    }];
                var v;
                for (var w = 0; w <= t.length; ++w) {
                    var x, j, y, z;
                    w == t.length ? (x = t[w - 1],
                    j = x.finish_stop,
                    z = x.finish_time,
                    typeof j.lat == "number" && typeof j.lng == "number" && (pg.mapMarkerFinish.setPoint(new GLatLng(j.latAvg || j.lat,j.lngAvg || j.lng)),
                    pg.mapMarkerFinish.show())) : (x = t[w],
                    j = x.start_stop,
                    typeof j.lat == "number" && typeof j.lng == "number" && (w == 0 && (pg.mapMarkerStart.setPoint(new GLatLng(j.latAvg || j.lat,j.lngAvg || j.lng)),
                    pg.mapMarkerStart.show())),
                    z = x.start_time);
                    if (!j || !j.id)
                        continue;
                    n > j.lat && (n = j.lat),
                    p > j.lng && (p = j.lng),
                    o < j.lat && (o = j.lat),
                    q < j.lng && (q = j.lng);
                    var y = x.route || {}, A, B = v && y.num === v.num && y.transport === v.transport && y.city === v.city;
                    z = z && ti.printTime(z) + " " || "",
                    j.id.indexOf(";") < 0 && (x.route ? A = pg.fUrlSet({
                        schedule: {
                            city: y.city,
                            transport: y.transport,
                            num: y.num,
                            dirType: y.dirType,
                            stopId: j.id,
                            tripNum: (x.trip_num || -1) + 1
                        }
                    }, !0) : j.id ? A = "stop/" + j.id + "/map" : A = "map",
                    pg.mapStops[j.id] = {
                        lat: j.latAvg || j.lat,
                        lng: j.lngAvg || j.lng,
                        href: A,
                        img: !y.transport && f && (w == 0 || w == t.length) ? "stopGray" : B ? "stop" : "stopOnRoute",
                        name: z + j.name
                    });
                    if (!f || pg.optimalSearchRunning || !pg.optimalResults || !pg.optimalResults.length)
                        continue;
                    B || j.id.indexOf(";") < 0 && w !== t.length && (y.transport || w == t.length - 1) && (pg.mapStops["transport" + j.id] = {
                        lat: j.latAvg || j.lat,
                        lng: j.lngAvg || j.lng,
                        href: A,
                        img: "MarkerStart",
                        name: z + i18n.stop.toLowerCase() + "&nbsp;" + j.name,
                        transport: y.transport || "walk",
                        num: y.num || ""
                    });
                    if (w < t.length)
                        if (y.transport) {
                            var C = {};
                            C[y.dirType] = !0,
                            pg.loadPolyline(y.city, y.transport, y.num, C, x.start_stop.lat, x.start_stop.lng, x.finish_stop.lat, x.finish_stop.lng),
                            v = y;
                            if (!isNaN(x.start_pos) && !isNaN(x.finish_pos)) {
                                var D = typeof y.times === "string" ? ti.explodeTimes(y.times) : y.times
                                  , E = D.workdays.length;
                                D = D.times;
                                for (var F = x.start_pos; ++F < x.finish_pos; ) {
                                    var j = ti.fGetStopDetails(y.stops[F])
                                      , A = pg.fUrlSet({
                                        schedule: {
                                            city: y.city,
                                            transport: y.transport,
                                            num: y.num,
                                            dirType: y.dirType,
                                            stopId: j.id,
                                            tripNum: (x.trip_num || -1) + 1
                                        }
                                    }, !0);
                                    pg.mapStops[j.id] = {
                                        lat: j.lat,
                                        lng: j.lng,
                                        href: A,
                                        img: "stop",
                                        name: ti.printTime(D[x.trip_num + F * E]) + " " + j.name
                                    }
                                }
                            }
                        } else if (pg.optimalResults) {
                            v = null;
                            var G = new GPolyline([new GLatLng(x.start_stop.lat,x.start_stop.lng), new GLatLng(x.finish_stop.lat,x.finish_stop.lng)],"#000000",5,.8);
                            pg.GMap.addOverlay(G),
                            pg.mapOverlays.push(G)
                        }
                }
            } else if (e) {
                pg.fShowVehicles();
                var H = ti.fGetRoutes(d, e, f, pg.schedule ? g : !1, !0)
                  , C = {};
                if (H.length) {
                    var I = {};
                    for (var w = H.length; --w >= 0; ) {
                        var y = H[w];
                        if (y.routeTag && y.dirType != g)
                            continue;
                        C[y.dirType] = !g || y.dirType == g;
                        var J = "map," + y.city + "," + y.transport + "," + y.num + "," + y.dirType;
                        J = ti.toAscii(J, !0),
                        r = "<a href=\"#" + J + "\"><span class=\"icon icon_narrow" + (y.dirType == g ? " icon_checked" : "") + "\"></span>" + y.name + "</a>" + r;
                        if (!C[y.dirType])
                            continue;
                        var K = [];
                        for (var u = y.stops.length; --u >= 0; ) {
                            j = ti.fGetStopDetails(y.stops[u]);
                            if (!j.lat || !j.lng)
                                continue;
                            i = new GLatLng(j.lat,j.lng),
                            K.push(i);
                            var A = pg.fUrlSet({
                                schedule: {
                                    city: y.city,
                                    transport: y.transport,
                                    num: y.num,
                                    dirType: y.dirType,
                                    stopId: j.id
                                }
                            }, !0);
                            pg.mapStops[j.id] = {
                                lat: j.lat,
                                lng: j.lng,
                                href: A,
                                img: "stopOnRoute" + (!g && w ? "2" : ""),
                                name: j.name,
                                hidden: !0
                            },
                            I[j.name] = j.id,
                            n > j.lat && (n = j.lat),
                            p > j.lng && (p = j.lng),
                            o < j.lat && (o = j.lat),
                            q < j.lng && (q = j.lng),
                            (w == 0 || g) && (u == 0 || u == y.stops.length - 1) && (pg.mapStops[u == 0 ? "MarkerStart" : "MarkerFinish"] = {
                                lat: j.lat,
                                lng: j.lng,
                                href: A,
                                img: u == 0 ? "MarkerStart" : "MarkerRed",
                                transport: e,
                                num: y.num,
                                name: (u == 0 ? i18n.stop.toLowerCase() + "&nbsp;" : "") + j.name
                            })
                        }
                    }
                    for (var L in I)
                        pg.mapStops[I[L]].hidden = !1;
                    H.length > 1 && (J = "map," + y.city + "," + y.transport + "," + y.num,
                    r = "<a href=\"#" + J + "\"><span class=\"icon icon_narrow" + (g ? "" : " icon_checked") + "\"></span>" + i18n.mapShowAllDirections + "</a>" + r),
                    s = "<img class=\"icon icon_narrow\" src=\"" + pg.imagesFolder + e + ".png\"/><span class=\"transfer" + e + "\">&nbsp;" + H[0].num + "</span>";
                    if (cfg.defaultCity === "helsinki") {
                        var M = pg.getStyle("." + e)
                          , N = w > 0 ? .6 : .8
                          , O = M && M.backgroundColor || "#0000FF"
                          , P = 5
                          , G = new GPolyline(K,O,P,N);
                        pg.GMap.addOverlay(G),
                        pg.mapOverlays.push(G)
                    } else
                        pg.loadPolyline(d, e, f, C)
                }
            }
            r ? (r = "<div style=\"float:left; height:17px;\"><a href=\"#\">" + s + "&nbsp;<span class=\"arrow-down\"></span><!--[if gte IE 7]><!--></a><!--<![endif]--><table class=\"dropdown\" cellpadding=\"0\" cellspacing=\"0\"><tr><td>" + r + "<a id=\"mapShowStopsNames\" href=\"#map\" style=\"border-top:solid 1px #CCCCCC; margin-top:3px;\"><span class=\"icon icon_narrow stopsnames" + (pg.mapShowStopsNames ? " icon_checked" : "") + "\"></span>" + i18n.mapShowRouteStopsNames + "</a>" + (pg.schedule ? "" : "<a href=\"#map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapClearRoute + "</a>") + "</td></tr></table><!--[if lte IE 6]></a><![endif]--></div>",
            pg.$mapRoutesDropdown.innerHTML = r,
            pg.$mapRoutesDropdown.style.display = "") : pg.$mapRoutesDropdown.style.display = "none";
            var Q = new GLatLngBounds(new GLatLng(n,p),new GLatLng(o,q))
              , R = pg.GMap.getBoundsZoomLevel(Q);
            !cfg.firstZoom && pg.GMap.getBounds().containsBounds(Q) && (R >= pg.GMap.getZoom() && (R = 0)),
            R && f ? (!cfg.firstZoom && R == pg.GMap.getZoom() + 1 && --R,
            cfg.firstZoom || R != pg.GMap.getZoom() ? pg.GMap.setCenter(Q.getCenter(), R) : (pg.clusterManager.refresh(),
            pg.GMap.panTo(Q.getCenter()))) : pg.clusterManager.refresh(),
            cfg.firstZoom = !1,
            f && pg.clusterManager.hideMarkers()
        }
        if (!f) {
            pg.$mapRoutesDropdown.style.display = "none",
            pg.transport !== "plan" && (pg.mapMarkerStart.hide(),
            pg.mapMarkerFinish.hide(),
            pg.mapStops = {});
            while (pg.mapOverlays.length)
                pg.GMap.removeOverlay(pg.mapOverlays.pop());
            pg.map = {},
            pg.clusterManager.showMarkers(),
            h && j && j.id && j.id.indexOf(";") < 0 && typeof j.lat == "number" && typeof j.lng == "number" ? (pg.mapStops[h] = {
                lat: j.latAvg,
                lng: j.lngAvg,
                href: "stop/" + h,
                img: "stopOnRoute",
                name: j.name
            },
            i = new GLatLng(j.lat,j.lng)) : i = null,
            i && !pg.GMap.getBounds().contains(i) ? cfg.firstZoom ? pg.GMap.setCenter(i) : pg.GMap.panTo(i) : pg.clusterManager.refresh(),
            cfg.firstZoom = !1
        }
        setTimeout(function() {
            pg.GMap.checkResize()
        }, 100)
    } else if (pg.GMap === null) {
        pg.GMap = !1,
        $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + "</div>",
        $("preload").innerHTML = "<img src=\"" + pg.imagesFolder + "stop.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "cluster.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" />",
        cfg.firstZoom = !0;
        var S = String("." + window.location.host).split(".");
        S = S[S.length - 2] + "." + S[S.length - 1];
        var T = {
            "marsrutai.info": "ABQIAAAA1ScCs8FhCgcezEz08rROsxQju4QTY177ZUqtiHd-QtBfjDmWeBTlPLYbFmcJsp5WVjYOKK7pxhVUGA",
            "stops.lt": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhSFiohBI8HDKcqZbSL9Blnl2N0P6xQIY1qdKcarEC3K5F1xlRHMvP2zsw",
            "stops.lt:8001": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhRS_AytSF_iFi1JaeVfdJQz3w8fixRgzniHC4NzA78m-sHMkAVpJDQZPQ",
            "ridebus.org": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhQtcvUe0k-acda2umcpBWexvLqe7hTh8mwk-hjXKhW0nwqlbxJBU1WcfA",
            "marsrutai.lt": "ABQIAAAA1ScCs8FhCgcezEz08rROsxQGlT3sMZUx4ELiDsrzQfh3fbE5khQ-VtHZgCpCq3rMgF4qEPGT_fD-Yw",
            "marsruty.ru": "ABQIAAAA1ScCs8FhCgcezEz08rROsxTgEjs8cB5ffNAZuuA5xYZVRMEC_RSmeQpvGIjEAeBKsPO8v9KmXGeJdg",
            "marsruti.lv": "ABQIAAAA1ScCs8FhCgcezEz08rROsxTYmbSir-xnBQyBRKLAM3-zg8wZKhQcw0RK6Q3vOXEUtA6VwVQNO9N9hg",
            "rigassatiksme.lv": "ABQIAAAA1ScCs8FhCgcezEz08rROsxSSbFstyt1J_asSxeW1gR9mGgEedBTJBpX_QLqdBGmCpjyPTj8ODBn8oQ",
            "tallinn.ee": "ABQIAAAAY5IFnRsLfXSjZuFUXBlQxxRmcNvZLfb84ObGC-suP-X_C6yqjBSwz9_gsefSDa8JbazmtMODjhF-SQ",
            "mupatp1.ru": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhQtkVZq0yHlxGB1DBtmGoZBafDtWhSa1kgxMwsdoRr4QNd_h1rXefARdA",
            "muptu.ru": "ABQIAAAArqWDOAEUwW-f4DAlPS3CFhRG_nk74X5v3utE3dwuERMNPIBz4RRVfJ9UhZonHQJyljheWX-f5oBVhg",
            other: "AIzaSyA_6V_Khj4mysHNI15QGgHi0EgYlVUBIKM"
        }
          , U = T[S] || T.other;
        S !== "marsrutai.info" && cfg.defaultCity.indexOf("tallinn") >= 0 && (U = T["tallinn.ee"]);
        var V = document.createElement("script");
        V.type = "text/javascript",
        V.async = !0,
        !0 || pg.goHomeTimeout ? V.src = "gmap_en.js" : V.src = "//maps.google.com/maps?file=api&v=2&hl=" + pg.language + "&sensor=false&async=2&callback=pg.GMapScriptLoaded&key=" + U;
        if (V.onprogress) {
            var W = "";
            V.onprogress = function() {
                W += ".",
                $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + W + "</div>"
            }
        }
        var X = function() {
            typeof GBrowserIsCompatible != "function" && ($("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.failedMap + "</div>",
            pg.GMap = null),
            V.onload = V.onreadystatechange = V.onerror = null
        };
        V.onreadystatechange = function() {
            (this.readyState == "complete" || this.readyState == "loaded") && setTimeout(X, 10)
        }
        ,
        V.onload = V.onerror = X,
        document.getElementsByTagName("head")[0].appendChild(V)
    } else
        pg.GMap !== !1 && pg.GMapScriptLoaded()
}
,
pg.GMapScriptLoaded = function() {
    if (!GBrowserIsCompatible()) {
        alert("Sorry, the Google Maps API is not compatible with this browser");
        return !1
    }
    if (typeof ti.stops !== "object" || typeof ti.routes !== "object")
        setTimeout(pg.GMapScriptLoaded, 200);
    else {
        pg.storeStyles(),
        pg.GMap = 0;
        if ((document.body.className || "").indexOf("Map") < 0)
            return;
        var a, b = cfg.cities[pg.city] || {};
        b.streetMap = b.streetMap || "GMaps";
        var c = {
            googleBarOptions: {
                style: "new"
            }
        };
        c.logoPassive = "true",
        c.suppressCopyright = "true";
        var d = pg.GMap = new GMap2($("divMap"),c);
        d.options = c.googleBarOptions;
        var e = new GMapType(G_SATELLITE_MAP.getTileLayers(),G_SATELLITE_MAP.getProjection(),i18n.satelliteMap)
          , f = new GMapType(G_HYBRID_MAP.getTileLayers(),G_HYBRID_MAP.getProjection(),i18n.hybridMap);
        d.getMapTypes().length = 0;
        if (b.streetMap.indexOf("OSM") < 0)
            a = new GMapType(G_NORMAL_MAP.getTileLayers(),G_NORMAL_MAP.getProjection(),i18n.streetMap),
            d.addMapType(a),
            d.setMapType(a);
        else {
            var g = [new GTileLayer(new GCopyrightCollection("OpenStreetMap"),0,19)];
            g[0].getCopyright = function(a, b) {
                return {
                    prefix: "",
                    copyrightTexts: ["OpenStreetMap"]
                }
            }
            ,
            b.streetMap === "OSMlocal" ? g[0].getTileUrl = function(a, b) {
                return "osm/" + b + "/" + a.x + "/" + a.y + ".png"
            }
            : g[0].getTileUrl = function(a, b) {
                return "http://a.tile.openstreetmap.org/" + b + "/" + a.x + "/" + a.y + ".png"
            }
            ,
            a = new GMapType(g,G_NORMAL_MAP.getProjection(),i18n.streetMap),
            b.streetMap === "OSMlocal" && (a.getMinimumResolution = function() {
                return 10
            }
            ,
            a.getMaximumResolution = function() {
                return 16
            }
            ),
            d.addMapType(a),
            d.setMapType(a)
        }
        if (b.streetMap != "OSMlocal") {
            d.addMapType(e),
            d.addMapType(f);
            var h = new GHierarchicalMapTypeControl;
            h.addRelationship(e, f, null, !1),
            d.addControl(h, new GControlPosition(G_ANCHOR_TOP_RIGHT,new GSize(55,10)))
        }
        d.setCenter(new GLatLng(b.lat || 59.43923,b.lng || 24.7588), b.zoom || 12),
        d.enableDoubleClickZoom(),
        d.enableScrollWheelZoom(),
        d.enableContinuousZoom(),
        d.enablePinchToZoom();
        try {
            d.enableGoogleBar()
        } catch (j) {}
        d.addControl(new GLargeMapControl3D),
        d.addControl(new GScaleControl),
        ($("divMapHide") || {
            style: {}
        }).style.zIndex = ($("divMapMaximize") || {
            style: {}
        }).style.zIndex = ($("divMapRestore") || {
            style: {}
        }).style.zIndex = 999,
        pg.$mapShowAllStops = document.createElement("div"),
        pg.$mapShowAllStops.id = "divMapShowAllStops",
        pg.$mapShowAllStops.style.border = "solid 1px black",
        pg.$mapShowAllStops.style.height = "17px",
        pg.$mapShowAllStops.style.width = "17px",
        pg.$mapShowAllStops.innerHTML = "<div id=\"mapShowAllStops\" class=\"button icon_stops\" title=\"" + i18n.mapShowAllStops + "\"></div>",
        pg.$mapRoutesDropdown = document.createElement("div"),
        pg.$mapRoutesDropdown.className = "dropdown",
        b.streetMap === "OSMlocal" ? ((new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(82,10))).apply(pg.$mapShowAllStops),
        (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(106,10))).apply(pg.$mapRoutesDropdown)) : ((new GControlPosition(G_ANCHOR_TOP_RIGHT,new GSize(332,10))).apply(pg.$mapShowAllStops),
        (new GControlPosition(G_ANCHOR_TOP_RIGHT,new GSize(356,10))).apply(pg.$mapRoutesDropdown)),
        d.getContainer().appendChild(pg.$mapShowAllStops),
        pg.mapShowAllStops = !0,
        d.getContainer().appendChild(pg.$mapRoutesDropdown),
        pg.$mapMenu = document.createElement("div"),
        pg.$mapMenu.style.display = "none",
        pg.$mapMenu.className = "mapMenu",
        d.getContainer().appendChild(pg.$mapMenu),
        pg.$transportMenu = document.createElement("div"),
        pg.$transportMenu.style.display = "none",
        pg.$transportMenu.className = "transportMenu",
        d.getContainer().appendChild(pg.$transportMenu);
        var k;
        GEvent.addDomListener(d.getContainer(), "contextmenu", function(a) {
            k = null,
            $("divSuggestedStops").style.display = "none",
            a || (a = window.event);
            var b = a && (a.target || a.srcElement);
            if (!b || b.id == "mapShowAllStops")
                return pg.cancelEvent(a);
            var c = b && (b.tagName || "").toLowerCase() || "";
            b && c !== "a" && c !== "img" && (b = b.parentNode,
            c = b && (b.tagName || "").toLowerCase() || "");
            var d = b && (c === "a" && b.href || c === "img" && b.id || "") || "";
            if (b && b.parentNode && (b.parentNode.tagName || "").toLowerCase() == "td")
                return pg.cancelEvent(a);
            if (d && d.indexOf("#") >= d.length - 1)
                return pg.cancelEvent(a);
            d ? k = b : k = {}
        }),
        GEvent.addDomListener(d.getContainer(), "click", function(a) {
            pg.timeOfActivity = (new Date).getTime(),
            pg.inputSuggestedStops_Blur(),
            a = a || window.event;
            var b = a && (a.target || a.srcElement);
            pg.realTimeDepartures.vehicleID = b && b.getAttribute && b.getAttribute("data-vehicle-id");
            if (pg.realTimeDepartures.vehicleID) {
                pg.realTimeDepartures.mapStop = "",
                pg.realTimeDepartures.vehicleTransport = b.getAttribute("data-transport"),
                pg.realTimeDepartures.vehicleRouteNum = b.getAttribute("data-route"),
                pg.realTimeDepartures.$mapPopup = {},
                pg.fProcessVehicleDepartures();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowAllStops") {
                pg.mapShowAllStops = !pg.mapShowAllStops,
                pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowStopsNames") {
                pg.mapShowStopsNames = !pg.mapShowStopsNames;
                var c = pg.$mapRoutesDropdown.innerHTML.replace("stopsnames icon_checked", "stopsnames");
                pg.$mapRoutesDropdown.innerHTML = pg.mapShowStopsNames ? c.replace("stopsnames", "stopsnames icon_checked") : c,
                pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            var d = b && (b.tagName || "").toLowerCase() || "";
            b && d !== "a" && d !== "img" && (b = b.parentNode);
            var e = b && (d === "a" && b.href || d === "img" && b.id || "") || "";
            pg.$mapMenu && (pg.$mapMenu.style.display = "none"),
            pg.$transportMenu && (pg.$transportMenu.style.display = "none");
            if (e.indexOf("#") < 0 || e.indexOf("#") >= e.length - 1)
                return pg.cancelEvent(a);
            var f = pg.fUrlParse(e);
            if (f.schedule && d !== "img")
                e = pg.fUrlSet({
                    schedule: f.schedule
                });
            else if (f.transport == "stop" || f.schedule) {
                var g = f.schedule && f.schedule.stopId || f.inputStop
                  , h = ti.fGetAnyStopDetails(g);
                if ((b.className || "").toLowerCase().indexOf("cluster") < 0)
                    if (d === "img") {
                        if (g) {
                            var i = pg.fUrlSet({
                                transport: "plan",
                                inputStart: g,
                                hashForMap: "map"
                            }, !0)
                              , j = pg.fUrlSet({
                                transport: "plan",
                                inputFinish: g,
                                hashForMap: "map"
                            }, !0);
                            pg.realTimeDepartures.mapStop = g,
                            pg.realTimeDepartures.vehicleID = null;
                            var k = [];
                            k.push("<br/><a href=\"#stop/" + g + "/map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>"),
                            k.push("<br/><a href=\"#" + i + "\"><span class=\"icon icon_stopGreen\"></span>" + (e ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</a>"),
                            k.push("<br/><a href=\"#" + j + "\"><span class=\"icon icon_stopRed\"></span>" + (e ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</a>"),
                            k.push("<br/><a href=\"#stop/" + g + "/map\" class=\"cluster\"><span class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</a>");
                            var l = ti.fGetRoutesAtStop(g, !1, !0)
                              , c = []
                              , m = null
                              , n = 16
                              , o = 1
                              , p = null;
                            for (var q = 0; q < l.length; q++) {
                                route = l[q],
                                m != route.transport && (m = route.transport,
                                c.push("<br/><span class=\"icon icon_narrow icon_" + route.transport + "\"></span>"),
                                o = 1,
                                p = null);
                                var r = {
                                    id: route.id,
                                    city: route.city,
                                    transport: route.transport,
                                    num: ti.toAscii(route.num, !0),
                                    dirType: route.dirType,
                                    routeTag: route.stopId,
                                    stopId: route.stopId
                                };
                                if (r.num === p)
                                    continue;
                                p = r.num;
                                var s = pg.fUrlSet({
                                    schedule: r
                                }, !0)
                                  , t = "<a class=\"hover transfer" + route.transport + "\" href=\"#" + s + "\" title=\"" + (route.name || "").replace(/"/g, "") + "\">" + route.num.replace(/\s/g, "&nbsp;") + "</a> ";
                                c.push(t),
                                o % n || c.push("<br/><span style=\"margin-left:22px;\"></span>"),
                                o += 1
                            }
                            var u = ti.fGetAnyStopDetails(g).name
                              , v = "<div class=\"baloon_close\"></div><div class=\"baloon_content\"><span class=\"baloon_title\">" + u + "</span>" + c.join("") + k.join("") + "<br><div id=\"stop_data\"></div></div>";
                            pg.openMapInfoWindow(v)
                        }
                    } else
                        f.transport == "stop" && (pg.hashForMap = "map",
                        pg.map = {},
                        pg.fTabStop_Click(f.inputStop));
                else if (h.latAvg && h.lngAvg)
                    for (var w = pg.GMap.getZoom(); ; w++) {
                        pg.GMap.zoomIn(new GLatLng(h.latAvg,h.lngAvg), !1, !0);
                        if (w >= 12)
                            break
                    }
            } else
                f.transport == "plan" ? (pg.hashForMap = f.hashForMap,
                pg.map = {},
                pg.optimalResults = null,
                pg.fTabPlanner_Click(f.inputStart, f.inputFinish)) : (pg.hashForMap = f.hashForMap,
                pg.hashForMap == "map" && (pg.mapShowAllStops = !0),
                pg.fUrlSet(pg));
            return pg.cancelEvent(a)
        }),
        GEvent.addListener(d, "click", function(a, b, c) {
            pg.timeOfActivity = (new Date).getTime(),
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none";
            var e = d.fromLatLngToContainerPixel(b || c);
            (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(e.x,e.y))).apply(pg.$mapMenu),
            (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(e.x,e.y))).apply(pg.$transportMenu)
        }),
        GEvent.addDomListener(d.getContainer(), "mouseout", function(a) {
            a || (a = window.event);
            var b = a && (a.target || a.srcElement)
              , c = d.getContainer();
            b && b == c,
            b = a.relatedTarget || a.toElement;
            while (b && (b.tagName || "").toLowerCase() != "body") {
                if (b === c)
                    return;
                b = b.parentNode
            }
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none"
        }),
        GEvent.addListener(d, "movestart", function(a) {
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none"
        }),
        GEvent.addListener(d, "zoomstart", function(a) {
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none"
        }),
        GEvent.addListener(d, "singlerightclick", function(a, b, c) {
            if (k) {
                var d = a.x, e = a.y, f = [], g, h, i = (k.tagName || "").toLowerCase() || "", j = i === "a" && k.href || i === "img" && k.id || "";
                if (j) {
                    f.push();
                    var l = pg.fUrlParse(j);
                    if (l.schedule && l.schedule.stopId) {
                        f.push("<a href=\"" + j + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowTimetableFromStop + "</a>"),
                        g = pg.fUrlSet({
                            transport: "plan",
                            inputStart: l.schedule.stopId,
                            hashForMap: "map"
                        }, !0),
                        h = pg.fUrlSet({
                            transport: "plan",
                            inputFinish: l.schedule.stopId,
                            hashForMap: "map"
                        }, !0);
                        var j = pg.fUrlSet({
                            inputStop: l.schedule.stopId,
                            hashForMap: "map"
                        }, !0);
                        f.push("<a href=\"#stop/" + l.schedule.stopId + "/map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>")
                    } else
                        (k.className || "").toLowerCase().indexOf("cluster") < 0 ? cfg.searchOnly || f.push("<a href=\"" + j + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</a>") : f.push("<a href=\"" + j + "\" class=\"cluster\"><span class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</a>"),
                        g = pg.fUrlSet({
                            transport: "plan",
                            inputStart: l.inputStop,
                            hashForMap: "map"
                        }, !0),
                        h = pg.fUrlSet({
                            transport: "plan",
                            inputFinish: l.inputStop,
                            hashForMap: "map"
                        }, !0)
                } else {
                    var m = pg.GMap.fromContainerPixelToLatLng(new GPoint(d,e))
                      , n = ("" + m.lat()).substring(0, 8) + ";" + ("" + m.lng()).substring(0, 8);
                    g = pg.fUrlSet({
                        transport: "plan",
                        inputStart: n
                    }, !0),
                    h = pg.fUrlSet({
                        transport: "plan",
                        inputFinish: n
                    }, !0)
                }
                f.push("<a href=\"#" + g + "\"><span class=\"icon icon_stopGreen\"></span>" + (j ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</a>"),
                f.push("<a href=\"#" + h + "\"><span class=\"icon icon_stopRed\"></span>" + (j ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</a>"),
                pg.$mapMenu.innerHTML = f.join(""),
                pg.$mapMenu.style.display = "block",
                d - pg.$mapMenu.offsetWidth > 0 && (d -= pg.$mapMenu.offsetWidth),
                e - pg.$mapMenu.offsetHeight > 0 && (e -= pg.$mapMenu.offsetHeight),
                (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(d,e))).apply(pg.$mapMenu)
            }
        }),
        ELabel = function(a, b, c, d, e) {
            this.point = a,
            this.html = b,
            this.href = c,
            this.classname = d || "",
            this.pixelOffset = e || new GSize(0,0),
            this.hidden = !1
        }
        ,
        ELabel.prototype = new GOverlay,
        ELabel.prototype.initialize = function(a) {
            var b = document.createElement("a");
            b.style.position = "absolute",
            b.className = this.classname,
            b.href = "#" + this.href,
            b.innerHTML = this.html,
            a.getPane(G_MAP_MARKER_PANE).appendChild(b),
            this.map_ = a,
            this.div_ = b;
            if (this.overlap) {
                var c = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = c
            }
            this.hidden && this.hide()
        }
        ,
        ELabel.prototype.remove = function() {
            GEvent.clearInstanceListeners(this.div_),
            this.div_.parentNode.removeChild(this.div_)
        }
        ,
        ELabel.prototype.copy = function() {
            return new ELabel(this.point,this.html,this.href,this.classname,this.pixelOffset,this.percentOpacity,this.overlap)
        }
        ,
        ELabel.prototype.redraw = function(a) {
            if (this.point && this.point.x && this.point.y) {
                var b = this.map_.fromLatLngToDivPixel(this.point)
                  , c = parseInt(this.div_.clientHeight);
                this.div_.style.left = b.x + this.pixelOffset.width + "px",
                this.div_.style.top = b.y + this.pixelOffset.height - c + "px"
            }
        }
        ,
        ELabel.prototype.show = function() {
            this.div_ && (this.div_.style.display = "",
            this.redraw()),
            this.hidden = !1
        }
        ,
        ELabel.prototype.hide = function() {
            this.hidden || (this.div_ && (this.div_.style.display = "none"),
            this.hidden = !0)
        }
        ,
        ELabel.prototype.isHidden = function() {
            return this.hidden
        }
        ,
        ELabel.prototype.supportsHide = function() {
            return !0
        }
        ,
        ELabel.prototype.setContents = function(a, b) {
            this.div_.innerHTML = this.html = a,
            typeof b != "undefined" && (this.div_.href = "#" + b)
        }
        ,
        ELabel.prototype.setPoint = function(a) {
            this.point = a;
            if (this.overlap) {
                var b = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = b
            }
            this.redraw(!0)
        }
        ,
        ELabel.prototype.getPoint = ELabel.prototype.getLatLng = function() {
            return this.point
        }
        ,
        ClusterManager = function(a, b) {
            this._map = a,
            this._mapMarkers = [],
            this._markersHidden = !1,
            this._div = document.createElement("div"),
            this._div.id = "ClusterManagerStopsPane",
            this._map.getPane(G_MAP_MARKER_PANE).appendChild(this._div),
            b = b || {},
            this.fitMapToMarkers = b.fitMapToMarkers === !0,
            b.fitMapMaxZoom && (this.fitMapMaxZoom = b.fitMapMaxZoom),
            this.clusterMaxZoom = b.clusterMaxZoom ? b.clusterMaxZoom : 99,
            b.markers && this.addMarkers(b.markers),
            this.borderPadding = b.borderPadding || 256,
            this.intersectPadding = b.intersectPadding || 0,
            this.clusteringEnabled = b.clusteringEnabled !== !1,
            this.ZoomLevel = this._map.getZoom(),
            GEvent.bind(this._map, "moveend", this, this._moveEnd),
            GEvent.bind(this._map, "zoomend", this, this._zoomEnd),
            GEvent.bind(this._map, "maptypechanged", this, this._zoomEnd)
        }
        ,
        ClusterManager.prototype._zoomEnd = function() {
            pg.$mapVehicles.innerHTML = "",
            this.refresh(),
            pg.fShowVehicles()
        }
        ,
        ClusterManager.prototype._moveEnd = function() {
            this.ZoomLevel != this._map.getZoom() ? this.ZoomLevel = this._map.getZoom() : this.refresh()
        }
        ,
        ClusterManager.prototype.addMarkers = function(a) {
            if (this.fitMapToMarkers) {
                var b = new GLatLngBounds;
                for (var c = a.length; --c >= 0; )
                    b.extend(a[c].getLatLng());
                var d = this._map.getBoundsZoomLevel(b);
                this.fitMapMaxZoom && d > this.fitMapMaxZoom && (d = this.fitMapMaxZoom),
                this._map.setCenter(b.getCenter(), d)
            }
            var e = this._map.getCurrentMapType().getProjection();
            for (var c = a.length; --c >= 0; ) {
                var f = a[c]
                  , g = e.fromLatLngToPixel(new GLatLng(f.lat,f.lng), 19);
                f._x = g.x,
                f._y = g.y
            }
            a.sort(function(a, b) {
                return b._y - a._y
            }),
            this._mapMarkers = a
        }
        ,
        ClusterManager.prototype.refresh = function() {
            pg.timeOfActivity = (new Date).getTime(),
            pg.toggleClass($("mapShowAllStops"), "pressed", pg.mapShowAllStops),
            pg.$mapMenu.style.display = "none",
            pg.$transportMenu.style.display = "none";
            var a = this._markersHidden ? "Gray" : "", b = this._map, c = b.getCurrentMapType().getProjection(), d = [], e = c.fromLatLngToPixel(this._map.getBounds().getSouthWest(), 19), f = c.fromLatLngToPixel(this._map.getBounds().getNorthEast(), 19), g = this._mapMarkers, h = pg.mapStops, j, k, l, m = {};
            if (pg.mapShowAllStops) {
                var n = 19 - this._map.getZoom()
                  , o = 1 << n + 8
                  , p = e.x - o
                  , q = f.x + o
                  , r = e.y + o
                  , s = f.y - o
                  , t = cfg.defaultCity === "intercity" ? 1 : 12
                  , u = this._map.getZoom()
                  , v = this.clusteringEnabled && u <= this.clusterMaxZoom
                  , w = cfg.defaultCity === "vilnius" && pg.transport === "stop";
                o = 1 << n + 3 + (u < 12 ? 1 : 0);
                for (i = g.length; --i >= 0; ) {
                    j = g[i];
                    var x = j._y;
                    if (x < s || !j.name)
                        continue;
                    if (x > r)
                        break;
                    var y = j._x;
                    if (y >= p && y <= q) {
                        if (j.id in m)
                            continue;
                        var z = y
                          , A = x
                          , B = []
                          , C = []
                          , D = 1
                          , E = j.rideEnd - j.rideStart;
                        if (v) {
                            var F = h[j.id]
                              , G = j.name;
                            G.length > 1 && !isNaN(G.charAt(G.length - 1)) && (G = G.substring(0, G.length - 1));
                            for (var H = i; --H >= 0; ) {
                                var I = g[H];
                                if (I._y > A + o)
                                    break;
                                if (I.id in m)
                                    continue;
                                I._x <= z + o && I._x >= z - o && (u < t || I.name.indexOf(G) == 0) && (F = F || h[I.id],
                                m[I.id] = !0,
                                B.push(I.id),
                                C.push(I.name),
                                E < j.rideEnd - j.rideStart && I.time < 4320 && (E = j.rideEnd - j.rideStart),
                                D++,
                                z = (y += I._x) / D,
                                A = (x += I._y) / D)
                            }
                        }
                        if (D > 1) {
                            B.push(j.id),
                            k = c.fromPixelToLatLng(new GPoint(z,A), 19),
                            k = this._map.fromLatLngToDivPixel(k);
                            var J, K = 1;
                            if (u < 12) {
                                C.sort();
                                for (var H = C.length; --H > 0; )
                                    C[H] != C[H - 1] && ++K;
                                J = K > 2 ? i18n.totalStops + ": " + K : (C[0] + (K > 1 ? ", " + C[C.length - 1] : "")).replace(/"/g, "")
                            } else
                                J = G.replace(/"/g, "");
                            if (!F || K > 1)
                                w && (a = E <= 30 ? "30" : E <= 60 ? "60" : "",
                                J = J + ", " + i18n.ride + " " + E + " " + i18n.minutesShort),
                                d.push((K > 1 ? "<img class=\"cluster\" style=\"width:9px; height:9px;" : "<img style=\"width:8px; height:8px;") + " cursor:pointer; vertical-align:top; position:absolute;  top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" id=\"#stop/" + B.join(",") + "/map\" src=\"" + pg.imagesFolder + (K > 1 ? "cluster" : "stop") + a + ".png\" title=\"" + (window.chrome ? "" : J) + "\" />")
                        } else if (!F) {
                            var J = window.chrome ? "" : (j.name || "").replace(/"/g, "");
                            w && (a = E <= 30 ? "30" : E <= 60 ? "60" : "",
                            J = J + ", " + i18n.ride + " " + E + " " + i18n.minutesShort),
                            k = b.fromLatLngToDivPixel(new GLatLng(j.lat,j.lng)),
                            d.push("<img id=\"#stop/" + j.id + "/map\" style=\"cursor:pointer; vertical-align:top; position:absolute; width:8px; height:8px; top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" src=\"" + pg.imagesFolder + "stop" + a + ".png\" title=\"" + J + "\" />")
                        }
                    }
                }
            }
            pg.mapLabelHeight = pg.mapLabelHeight || parseInt(pg.stopLabelSelected.div_.clientHeight, 10);
            for (l in h) {
                j = h[l],
                k = b.fromLatLngToDivPixel(new GLatLng(j.lat,j.lng));
                var J = pg.browserVersion < 7 && (!pg.mapShowStopsNames || j.hidden) ? " title=\"" + j.name.replace(/"/g, "") + "\"" : "";
                j.img == "MarkerStart" ? d.push("<a href=\"#" + j.href + "\" class=\"label_transport\" style=\"position:absolute; left:" + (k.x + 11) + "px; top:" + (k.y - 29) + "px;\"><img src=\"" + pg.imagesFolder + j.transport + ".png\" />" + (j.num && "<span class=\"transfer" + j.transport + "\" style=\"line-height:18px; vertical-align:top;\">" + j.num + "</span>&nbsp;") + "<span" + (pg.mapShowStopsNames ? "" : " class=\"unhide\"") + " style=\"line-height:18px; vertical-align:top; border:0 none;\">" + j.name + "&nbsp;</span></a><img src=\"" + pg.imagesFolder + "tip.png\" style=\"position:absolute; z-index:105; left:" + (k.x + 4) + "px; top:" + (k.y - 11) + "px;\" />") : j.img == "MarkerRed" ? d.push("<a class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 6) + "px; top:" + (k.y - 20) + "px;\">") : (j.img || "").indexOf("stopOnRoute") < 0 ? j.img && d.push("<a class=\"mapStop\" href=\"#" + j.href + "/map\" style=\"position:absolute; left:" + (k.x - 4) + "px; top:" + (k.y - 4) + "px;\">") : d.push("<a class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 5) + "px; top:" + (k.y - 5) + "px;\">"),
                j.img != "MarkerStart" && (d.push("<img id=\"#" + j.href + "/map\" src=\"" + pg.imagesFolder + j.img + ".png\"" + J + " style=\"vertical-align:top;\" /></a>"),
                J || d.push("<a href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x + 4) + "px; top:" + (k.y - 4 - pg.mapLabelHeight) + "px;\" class=\"mapStopName" + (pg.mapShowStopsNames && !j.hidden ? "" : "Hidden") + "\">" + j.name + "</a>"))
            }
            this._div.innerHTML = d.join("")
        }
        ,
        ClusterManager.prototype.removeMarkers = function() {
            this._div.innerHTML = "",
            this._mapMarkers = []
        }
        ,
        ClusterManager.prototype.hideMarkers = function() {
            this._markersHidden || (this._markersHidden = !0,
            this.refresh())
        }
        ,
        ClusterManager.prototype.showMarkers = function() {
            this._markersHidden !== !1 && (this._markersHidden = !1,
            this.refresh())
        }
        ,
        pg.openMapInfoWindow = function(a) {
            pg.$transportMenu.innerHTML = a,
            pg.$transportMenu.style.display = "block";
            var b = d.getContainer()
              , c = pg.$transportMenu.offsetTop
              , e = pg.$transportMenu.offsetLeft
              , f = pg.$transportMenu.offsetWidth
              , g = pg.$transportMenu.offsetHeight;
            if (e + f / 2 > b.offsetWidth)
                e = e - f,
                c - g > 0 && (c -= g - 12),
                (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(e,c))).apply(pg.$transportMenu);
            else if (e - f / 2 < 0 && c - g > 0)
                c -= g - 12,
                (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(e,c))).apply(pg.$transportMenu);
            else if (c - g > 0) {
                c -= g;
                var h = f / 2
                  , e = e - h;
                (new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(e,c))).apply(pg.$transportMenu);
                var i = document.createElement("div");
                i.style.left = h - 7 + "px",
                i.className = "baloon_arrow",
                pg.$transportMenu.appendChild(i)
            }
        }
        ,
        pg.splitEncodedPolyline = function(a, b, c, d, e, f) {
            var g = a.length, h = 0, i = [], j = 0, k = 0, l = Number.POSITIVE_INFINITY, m, n, o = 0, p = 0, q = 0;
            c *= 1e5,
            e *= 1e5,
            d *= 1e5,
            f *= 1e5;
            while (h < g) {
                var r, s = 0, t = 0;
                do
                    r = a.charCodeAt(h++) - 63,
                    t |= (r & 31) << s,
                    s += 5;
                while (r >= 32);var u = t & 1 ? ~(t >> 1) : t >> 1;
                j += u,
                s = 0,
                t = 0;
                do
                    r = a.charCodeAt(h++) - 63,
                    t |= (r & 31) << s,
                    s += 5;
                while (r >= 32);var v = t & 1 ? ~(t >> 1) : t >> 1;
                k += v,
                m = (j - c) * (j - c) + (k - d) * (k - d),
                l > m && (l = m,
                o = p = q,
                n = Number.POSITIVE_INFINITY),
                m = (j - e) * (j - e) + (k - f) * (k - f),
                n > m && (n = m,
                p = q),
                i[q++] = j,
                i[q++] = k
            }
            var w = 0
              , x = 0
              , y = [];
            h = o;
            while (h <= p)
                j = i[h++],
                k = i[h++],
                y.push(pg.encodeNumber(j - w), pg.encodeNumber(k - x)),
                w = j,
                x = k;
            o /= 2,
            p /= 2;
            var z = "R" + (o < p ? b.substring(o + 1, p) + "R" : "");
            return {
                points: y.join(""),
                levels: z
            }
        }
        ,
        pg.encodeNumber = function(a) {
            a = a << 1,
            a < 0 && (a = ~a);
            var b = "";
            while (a >= 32)
                b += String.fromCharCode((32 | a & 31) + 63),
                a >>= 5;
            b += String.fromCharCode(a + 63);
            return b
        }
        ,
        pg.loadPolyline = function(a, b, c, d, e, f, g, h) {
            var i = cfg.city.datadir + "/" + ti.toAscii([a, b, c].join("_"), !0) + ".txt";
            ti.fDownloadUrl("get", i, function(a) {
                a.indexOf("\r\n") < 0 ? a = a.split("\n") : a = a.split("\r\n");
                var c = pg.getStyle("." + b)
                  , i = .8;
                for (var j = 2; j < a.length; j += 3) {
                    if (!d[a[j - 2]])
                        continue;
                    var k = {
                        points: a[j - 1],
                        levels: a[j]
                    };
                    e && f && (k = pg.splitEncodedPolyline(k.points, k.levels, e, f, g, h)),
                    k.color = c && c.backgroundColor || "#0000FF",
                    k.opacity = i,
                    i = .6,
                    k.weight = 5,
                    k.zoomFactor = 2,
                    k.numLevels = 20;
                    var l = GPolyline.fromEncoded(k);
                    pg.GMap.addOverlay(l),
                    pg.mapOverlays.push(l)
                }
            })
        }
        ,
        pg.stopLabelSelected = new ELabel(new GLatLng(b.lat,b.lng),cfg.defaultCity,"map","mapStopSelected",new GSize(4,-4)),
        pg.GMap.addOverlay(pg.stopLabelSelected),
        pg.mapLabelHeight = parseInt(pg.stopLabelSelected.div_.clientHeight, 10),
        pg.stopLabelSelected.hide();
        var l = new GIcon;
        l.image = pg.imagesFolder + "MarkerStart.png";
        var m = new GIcon;
        m.image = pg.imagesFolder + "MarkerFinish.png",
        l.shadow = m.shadow = "",
        l.iconSize = m.iconSize = new GSize(20,34),
        l.shadowSize = m.shadowSize = new GSize(0,0),
        l.iconAnchor = m.iconAnchor = new GPoint(10,34),
        l.infoWindowAnchor = m.infoWindowAnchor = new GPoint(9,2),
        l.dragCrossImage = m.dragCrossImage = pg.imagesFolder + "empty.png",
        l.dragCrossSize = m.dragCrossSize = GSize(1, 1),
        l.maxHeight = m.maxHeight = 0,
        pg.mapMarkerStart = new GMarker(new GLatLng(0,0),{
            icon: l,
            title: i18n.mapDragToChangeStart,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function(a, b) {
                return 104
            }
        }),
        pg.mapMarkerFinish = new GMarker(new GLatLng(0,0),{
            icon: m,
            title: i18n.mapDragToChangeFinish,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function(a, b) {
                return 104
            }
        }),
        pg.GMap.addOverlay(pg.mapMarkerStart),
        pg.mapMarkerStart.hide(),
        pg.GMap.addOverlay(pg.mapMarkerFinish),
        pg.mapMarkerFinish.hide(),
        GEvent.addListener(pg.mapMarkerStart, "dragend", function() {
            pg.map = {},
            pg.optimalResults = null;
            var a = pg.mapMarkerStart.getPoint()
              , b = n(a)
              , c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(c, pg.inputFinish)
        }),
        GEvent.addListener(pg.mapMarkerFinish, "dragend", function() {
            pg.map = {},
            pg.optimalResults = null;
            var a = pg.mapMarkerFinish.getPoint()
              , b = n(a)
              , c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(pg.inputStart, c)
        }),
        GEvent.addListener(pg.mapMarkerStart, "dragstart", function() {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0,
            setTimeout(function() {
                pg.clusterManager.refresh()
            }, 100))
        }),
        GEvent.addListener(pg.mapMarkerFinish, "dragstart", function() {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0,
            pg.clusterManager.refresh())
        });
        function n(a) {
            var b = pg.GMap.getCurrentMapType().getProjection()
              , c = b.fromLatLngToPixel(a, 19)
              , d = 19 - pg.GMap.getZoom()
              , e = 1 << d + 2
              , f = c.x - e
              , g = c.x + e
              , h = c.y - e
              , j = c.y + e
              , k = pg.clusterManager._mapMarkers
              , l = [];
            for (i = k.length; --i >= 0; ) {
                marker = k[i];
                var m = marker._x
                  , n = marker._y;
                if (n > j)
                    break;
                n >= h && m >= f && m <= g && l.push(marker.id)
            }
            return l
        }
        var o = []
          , p = ti.stops;
        for (var q in p)
            o.push(p[q]);
        pg.clusterManager = new ClusterManager(d,{
            markers: o,
            clusterMaxZoom: 14
        }),
        pg.$mapVehicles = document.createElement("div"),
        d.getPane(G_MAP_MARKER_PANE).appendChild(pg.$mapVehicles),
        pg.fMapShow()
    }
}
,
pg.divMapHide_Click = function() {
    pg.fMapHide(),
    pg.hashForMap = "",
    pg.fUrlSet()
}
,
pg.divMapMaximize_Click = function(a) {
    var b = pg.GMap && pg.GMap.getCenter();
    pg.fUrlSetMap({
        maximized: !0
    }),
    b && (pg.GMap.checkResize(),
    pg.GMap.setCenter(b, pg.GMap.getZoom()));
    return pg.cancelEvent(a)
}
,
pg.divMapRestore_Click = function(a) {
    var b = pg.GMap && pg.GMap.getCenter();
    pg.fUrlSetMap({
        maximized: !1
    }),
    b && (pg.GMap.checkResize(),
    pg.GMap.setCenter(b, pg.GMap.getZoom()));
    return pg.cancelEvent(a)
}
,
pg.fShowVehicles = function() {
    cfg.city.urlGPS && ti.fDownloadUrl("GET", cfg.city.urlGPS + "?" + +(new Date), pg.fProcessGPSData)
}
,
pg.fProcessVehicleDepartures = function(a) {
    pg.realTimeDepartures.timer && (clearTimeout(pg.realTimeDepartures.timer),
    pg.realTimeDepartures.timer = 0);
    if (cfg.city.urlVehicleDepartures) {
        if (typeof a !== "string") {
            var b = (pg.inputStop || "").split(",");
            pg.stopsBySiriID = {};
            for (var c = 0; c < b.length; ++c) {
                var d = (ti.stops[b[c]] || {}).siriID || 0;
                pg.stopsBySiriID[d] = b[c],
                b[c] = d
            }
            ti.fDownloadUrl("GET", cfg.city.urlVehicleDepartures + "?stopid=" + b.join(",") + "&time=" + +(new Date), pg.fProcessVehicleDepartures);
            return
        }
        a = a.split("\n");
        if (!a[1] || a[1].indexOf("stop,") < 0) {
            ($("divContentDepartingRoutesResults") || {}).innerHTML = "<br />" + i18n.stopNoRealtimeDepartures;
            return
        }
        if (pg.realTimeDepartures.$mapPopup)
            if (!pg.realTimeDepartures.mapStop)
                if (pg.realTimeDepartures.vehicleID) {
                    var e = {};
                    for (var c = 0; c < a.length; c++) {
                        var f = a[c].trim().split(",");
                        while (f[f.length - 1] == "")
                            f.pop();
                        if (f.length < 2)
                            continue;
                        e[f[3]] = {
                            transport_number: f[0],
                            route_number: f[1],
                            direction_type: f[2].replace(/>/g, "-"),
                            stops: f.slice(4)
                        }
                    }
                    var g = e[pg.realTimeDepartures.vehicleID]
                      , h = "<br/>No data available";
                    if (g) {
                        h = [];
                        for (var c = 0; c < g.stops.length - 1; c += 2)
                            h.push(ti.printTime(+g.stops[c + 1]) + "&nbsp;&nbsp;<a href=\"#stop/" + g.stops[c] + "/map\">" + ti.fGetStopDetails(g.stops[c]).name) + "</a>";
                        h = h.join("</br>")
                    }
                    var i = pg.realTimeDepartures.vehicleTransport
                      , j = pg.realTimeDepartures.vehicleRouteNum
                      , k = ti.fGetRoutes(cfg.defaultCity, i, j, g ? g.direction_type : !1)
                      , l = "";
                    k && k.length && k[0].name && (l = "<strong>" + k[0].name + "</strong></br>");
                    var m = "<div class=\"baloon_close\"></div><div class=\"baloon_content\"><span class=\"baloon_title\"><span class=\"icon icon_" + i + "\"></span><span class=\"num num3 " + i + "\">" + (j || "?") + "</span>" + pg.realTimeDepartures.vehicleID + "</span><br/>" + l + "<div style=\"padding:8px 20px 0 0; height:150px; overflow-y:auto; overflow-x:hidden;\">" + h + "</div></div>";
                    pg.openMapInfoWindow(m),
                    pg.realTimeDepartures.vehicleID = null
                }
        if (pg.transport === "stop" && pg.loadedDepartingRoutes && +($("inputDepartureDate") || {
            value: 0
        }).value === -1) {
            var n = {}
              , o = pg.loadedDepartingRoutes.split(",");
            for (var c = 0; c < o.length; ++c)
                n[o[c]] = !0;
            var p = [];
            p.push("<table id=\"tblDepartingRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            var q = {}
              , r = [];
            if (cfg.defaultCity === "tallinna-linn") {
                var s = ti.dateToMinutes(new Date) % 1440;
                for (var c = 1; c < a.length; c++) {
                    var f = a[c].trim().split(",");
                    if (f.length >= 2 && f[0] === "stop") {
                        y = pg.stopsBySiriID[f[1]];
                        continue
                    }
                    if (f.length <= 2)
                        continue;
                    var t = {
                        city: cfg.defaultCity,
                        transport: f[0],
                        num: f[1],
                        name: f[4] || ""
                    };
                    for (var u = 0; u < pg.transfers.length; ++u)
                        if (t.num === pg.transfers[u].num && t.transport === pg.transfers[u].transport && t.city === pg.transfers[u].city && y === pg.transfers[u].stopId) {
                            t = pg.transfers[u];
                            break
                        }
                    var v = ti.toAscii(t.city + ";" + t.transport + ";" + t.num + ";" + t.name, !0)
                      , w = q[v];
                    w ? +f[2] / 60 <= s + 30 && w.route.departures.push(Math.floor(+f[2] / 60)) : (t.departures = [Math.floor(+f[2] / 60)],
                    t.stopId = y,
                    q[v] = {
                        route: t
                    })
                }
                for (var v in q) {
                    var t = q[v];
                    r.push(t)
                }
            } else {
                for (var c = 0; c < a.length; c++) {
                    var f = a[c].trim().split(",")
                      , x = f.length - 1;
                    if (x < 4)
                        continue;
                    var t = {
                        city: cfg.defaultCity,
                        transport: f[0] == "1" ? "trol" : f[0] == "3" ? "tram" : "bus",
                        num: f[1],
                        name: f[2].replace(/>/g, "-")
                    }
                      , k = ti.fGetRoutes(t.city, t.transport, t.num, t.name) || [];
                    t = k[0] || t;
                    var v = ti.toAscii(t.city + ";" + t.transport + ";" + t.num + ";" + t.name, !0);
                    for (var u = 4; u < x; u += 2) {
                        var y = f[u];
                        if (n[y] && f[u + 1]) {
                            var w = q[v];
                            w ? w.route.departures.push(+f[u + 1]) : (t.departures = [+f[u + 1]],
                            t.stopId = y,
                            q[v] = {
                                route: t
                            })
                        }
                    }
                }
                for (var v in q) {
                    var t = q[v];
                    t.route.departures.sort(),
                    r.push(t)
                }
            }
            r.sort(function(a, b) {
                return ti.naturalSort(a.route.num, b.route.num)
            });
            for (var c = 0; c < r.length; c++)
                p.push(pg.fMakeRouteRowHTML(r[c].route, "tblDepartingRoutes", 0, -1));
            ($("divContentDepartingRoutesResults") || {}).innerHTML = p.join("") + "</tbody></table>",
            pg.realTimeDepartures.timer = setTimeout(pg.fProcessVehicleDepartures, 3e4)
        }
    }
}
,
pg.fProcessGPSData = function(a) {
    var b = pg.GMap.getZoom() >= 14;
    a = a.split("\n");
    var c = []
      , d = "," + pg.hashForMap + ","
      , e = pg.transport || pg.schedule && pg.schedule.transport;
    e === "stop" && (e = "");
    var f = pg.schedule && pg.schedule.num || ""
      , g = cfg.city.courseOrigin || 0
      , h = cfg.city.courseCounterClockwise ? -1 : 1;
    for (var i = a.length; i--; ) {
        var j = a[i].split(",");
        if (j.length >= 4) {
            var k = j[1];
            if (k === "0")
                continue;
            var l = ({
                1: "trol",
                3: "tram"
            })[j[0]] || "bus";
            if (pg.hashForMap === "map") {
                if (e && l !== e)
                    continue;
                if (f && k !== f)
                    continue
            } else if (d.indexOf("," + l + "," + ti.toAscii(k) + ",") < 0)
                continue;
            var m = j[6], n = j[4] ? " " + j[4] + "km/h" : "", o;
            j[5] && +j[5] < 999 && (o = g + +j[5] * h);
            var p = +j[2]
              , q = +j[3];
            if (cfg.defaultCity === "rostov" || cfg.defaultCity === "liepaja" || cfg.defaultCity === "tallinna-linn")
                p = p / 1e6,
                q = q / 1e6;
            else {
                p = p / 1e4,
                q = q / 1e4;
                var r = p | 0
                  , s = r / 100 | 0
                  , t = r - s * 100 + p - r;
                p = s + t / 60;
                var r = q | 0
                  , s = r / 100 | 0
                  , t = r - s * 100 + q - r;
                q = s + t / 60
            }
            var u = new GLatLng(q,p)
              , v = pg.GMap.fromLatLngToDivPixel(u)
              , w = pg.getStyle("." + l)
              , x = w && w.backgroundColor || "#0000FF";
            x.indexOf("rgb") < 0 && (x = "#" + x);
            var y = n
              , z = "";
            (cfg.city.lowFloorVehicles || "").indexOf("," + m + ",") >= 0 && (z = "; color:yellow; border-color:yellow;"),
            pg.transformCSS ? (o && c.push("<div class=\"arrow\" style=\"left:" + (v.x - 10) + "px; top:" + (v.y - 10) + "px; background-color:" + x + "; " + pg.transformCSS + ":rotate(" + (45 + o) + "deg);\"></div>"),
            c.push("<div class=\"circle\"  style=\"left:" + (v.x - 9) + "px; top:" + (v.y - 9) + "px; background-color:" + x + z + (k.length > 2 ? ";font-size:smaller" : "") + ";\" title=\"" + y + "\" data-vehicle-id=\"" + m + "\" data-transport=\"" + l + "\" data-route=\"" + k + "\">" + k + "</div>")) : (x = ({
                trol: "0064D7",
                tram: "FF601E"
            })[l] || "00c7b8",
            c.push("<img src=\"http://chart.apis.google.com/chart?cht=it&chs=20x20&chco=" + x + ",00000000,00000000&chx=ffffff&chf=bg,s,00000000&ext=.png&chl=" + k + "\" title=\"" + y + "\" style=\"z-index:110; position:absolute; width:20px; height:20px; left:" + (v.x - 10) + "px; top:" + (v.y - 10) + "px; cursor:pointer;\" />"))
        }
    }
    a = null,
    pg.$mapVehicles.innerHTML = c.join("")
}
,
pg.fScheduleShow = function(a) {
    pg.schedule || (pg.schedulePane = 1,
    $("spanReturnToRoutes").href = pg.urlPrevious,
    pg.urlUnderSchedulePane = pg.urlPrevious,
    pg.languageUnderSchedulePane = pg.language),
    document.body.className.indexOf("Schedule") < 0 && (document.body.className = "ScheduleDisplayed"),
    setTimeout(function() {
        try {
            $("aDir1").focus()
        } catch (a) {}
    }, 100);
    pg.schedule && pg.schedule.city == a.city && pg.schedule.transport == a.transport && pg.schedule.num == a.num && pg.schedule.dirType == a.dirType && pg.schedule.tripNum == a.tripNum ? (pg.schedule.dirType = a.dirType,
    pg.schedule.stopId = a.stopId,
    pg.fScheduleStopActivate()) : (pg.schedule = a,
    $("spanDir1").innerHTML = "&nbsp;",
    $("spanDir2").innerHTML = "&nbsp;",
    $("dlDirStops1").innerHTML = "&nbsp;",
    $("dlDirStops2").innerHTML = "&nbsp;",
    $("divScheduleContentInner").innerHTML = "<br/>" + i18n.loading,
    pg.fScheduleLoad())
}
,
pg.fScheduleHide = function() {
    pg.schedule = null,
    document.body.className.indexOf("Schedule") >= 0 && (document.body.className = "",
    $("divMap").style.width = "100%",
    $("divMap").style.height = "100%")
}
,
pg.fScheduleLoad = function() {
    pg.schedules = null,
    cfg.city.doNotShowTimetables = cfg.city.doNotShowTimetables || {},
    $("ulScheduleDirectionsList").style.display = "none";
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object")
        setTimeout(pg.fScheduleLoad, 200);
    else {
        var a = ti.fGetRoutes(pg.schedule.city, pg.schedule.transport, pg.schedule.num, null, "0", null);
        if (!a.length) {
            $("divScheduleContentInner").innerHTML = "Error: route not found.";
            return
        }
        var b = null
          , c = {}
          , d = {
            1: "",
            2: ""
        };
        for (var e = 0; e < a.length; e++) {
            var f = a[e]
              , g = f.name
              , h = "";
            !b && pg.schedule.dirType && pg.schedule.dirType == f.dirType && (b = f,
            h = "strong");
            if (!c[g + f.dirType]) {
                c[g + f.dirType] = !0;
                var i = f.dirType.split("-")
                  , j = i[0]
                  , k = i[i.length - 1];
                a.length > 1 && j !== "a" && k !== "b" ? j.charAt(0) === "b" || k.charAt(0) === "a" || j.charAt(0) !== "a" && k.charAt(0) !== "b" ? (f.dirNum = 2,
                h = "indented" + (h ? " " + h : "")) : f.dirNum = 1 : f.dirNum = 1;
                var l = pg.fUrlSet({
                    schedule: {
                        dirType: f.dirType
                    }
                }, !0);
                d[f.dirNum] += "<a href=\"#" + l + "\"" + (h ? " class=\"" + h + "\"" : "") + ">" + g + "</a>"
            }
        }
        $("ulScheduleDirectionsList").innerHTML = d[1] + d[2],
        b || (b = a[0]),
        pg.schedule.dirType = b.dirType,
        pg.schedule.dirTypes = {},
        pg.schedule.route = b;
        var m = pg.schedulePane == 2 ? 2 : 1
          , n = [];
        for (var o = 1; o <= 2; o++) {
            pg.schedule.dirTypes[b.dirType] = m,
            $("spanDir" + m).innerHTML = (b.num && b.num.length <= 5 ? "<span class=\"num num3 " + b.transport + "\">" + b.num + "</span>" : "") + b.name,
            n = [];
            var p = null, q = 0, r = (b.streets || "").split(",") || [], s, t = null, u, v = pg.schedule.tripNum && o == 1 && !cfg.city.doNotShowTimetables[pg.schedule.transport] ? pg.schedule.tripNum : 0;
            v && (s = typeof b.times === "string" ? ti.explodeTimes(b.times) : b.times,
            u = s.workdays.length,
            t = s.times);
            for (e = 0; e < b.stops.length; e++) {
                var w = ti.fGetStopDetails(b.stops[e])
                  , l = pg.fUrlSet({
                    schedule: {
                        dirType: b.dirType,
                        stopId: w.id,
                        tripNum: v
                    }
                }, !0);
                n.push("<dt><a class=\"hover\" href=\"#" + l + "\">" + (t ? ti.printTime(t[v - 1 + e * u], null, "&#x2007;") + "&nbsp;&nbsp;" : "") + w.name + "</a></dt>");
                if (o == 1 && w.street)
                    if (p != w.street) {
                        while (r[q])
                            r[q] = {
                                name: r[q],
                                stops: ""
                            },
                            ++q;
                        p = w.street,
                        r[q] = {
                            name: p,
                            stops: w.name,
                            hash: l
                        },
                        ++q
                    } else
                        r[q - 1].stops += ", " + w.name
            }
            $("dlDirStops" + m).innerHTML = n.join(""),
            $("dlDirStops" + m).style.display = "";
            if (o == 2)
                break;
            for (q = r.length; --q >= 0; )
                p = r[q],
                typeof p != "object" && (p = {
                    name: p
                }),
                p.name = p.name.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"),
                p.hash && (p.name = "<a href=\"#" + p.hash + "\" class=\"hover\" title=\"" + i18n.stops + ": " + p.stops.replace(/"/g, "") + "\">" + p.name + "</a>"),
                r[q] = p.name;
            var x = "";
            r.length && (x = i18n.routeStreets + ": " + r.join(", ")),
            $("divScheduleRoute").innerHTML = "<span class=\"icon icon_" + b.transport + "\"></span><span class=\"num num3 " + b.transport + "\">" + b.num + "</span>&nbsp;&nbsp; " + x + "<div class=\"RouteDetails\"" + (pg.scheduleDetailsExpanded ? "" : " style=\"display:none;\"") + ">" + i18n.operator + ": " + ti.fOperatorDetails(b.operator, b.transport) + "</div>";
            if (a.length <= 1)
                break;
            m = 3 - m;
            var i = b.dirType.split("-")
              , j = i[0]
              , k = i[i.length - 1]
              , y = k + "-" + j
              , z = b.dirNum;
            b = null;
            for (e = 0; e < a.length; e++) {
                if (!b || z == b.dirNum && z != a[e].dirNum)
                    b = a[e];
                if (a[e].dirType === y) {
                    b = a[e];
                    break
                }
            }
            if (!b || j == k) {
                $("dlDirStops2").style.display = "none";
                break
            }
        }
        pg.fScheduleStopActivate(),
        pg.schedule.tripNum || ($("divScheduleBody").scrollTop = 0)
    }
}
,
pg.aDir_Click = function(a) {
    setTimeout(function() {
        try {
            a.focus()
        } catch (b) {}
    }, 100);
    var b = $("ulScheduleDirectionsList");
    (a.id || "").indexOf("2") >= 0 && a.offsetLeft > 100 ? (pg.scheduleProposedPane = 2,
    b.style.right = "10px",
    b.style.left = "") : (pg.scheduleProposedPane = 1,
    b.style.left = a.offsetLeft + "px",
    b.style.right = ""),
    b.style.display = "block"
}
,
pg.aDir_Blur = function() {
    $("ulScheduleDirectionsList").style.display = "none"
}
,
pg.ulScheduleDirectionsList_Click = function(a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    if (b.nodeName.toLowerCase() == "a") {
        var c = b.href.split("#")[1]
          , d = pg.fUrlParse(c);
        pg.schedulePane = pg.scheduleProposedPane || 1,
        c = pg.fUrlSet({
            schedule: {
                dirType: d.schedule.dirType,
                stopId: null,
                tripNum: 0
            }
        }, !0),
        c != Hash.getHash() ? Hash.go(c) : pg.fScheduleLoad();
        return pg.cancelEvent(a)
    }
}
,
pg.fScheduleStops_Click = function(a, b) {
    a = a || window.event;
    var c = a.target || a.srcElement;
    if (c.nodeName.toLowerCase() == "a") {
        pg.schedulePane = b;
        var d = c.href.split("#")[1]
          , e = pg.fUrlParse(d);
        pg.fUrlSet({
            schedule: {
                dirType: e.schedule.dirType,
                stopId: e.schedule.stopId,
                tripNum: e.schedule.tripNum
            }
        });
        return pg.cancelEvent(a)
    }
}
,
pg.fTransferHideMenu = function() {
    if (pg.transfersMenuHide) {
        var a = $("divTransfersMenu");
        a.style.display = "none"
    }
}
,
pg.fTransfer_MouseOver = function(a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    if (b.id == "divTransfersMenu" || (b.parentNode || {}).id == "divTransfersMenu" || b.id == "checkTransfer" || b.id == "spanCheckTransfer")
        pg.transfersMenuHide = !1;
    else {
        var c = b.getAttribute("data-transport");
        pg.transfersMenuHide = !0;
        if (cfg.defaultCity != "tallinna-linn" && cfg.defaultCity != "riga" || typeof b.className != "string" || b.className.indexOf("transfer") < 0 || !b.href) {
            if (c && pg.transfersDisplayed) {
                pg.addSchedule = c;
                var d = !0;
                if (pg.schedules)
                    for (var e in pg.transfersDisplayed) {
                        d = pg.transfersDisplayed[e];
                        if (d && d.transport == c && !pg.schedules[e]) {
                            d = !0;
                            break
                        }
                    }
                $("checkTransfer").checked = d !== !0,
                $("spanCheckTransfer").innerHTML = i18n.transport[c.replace("-remove", "")],
                pg.transfersMenuHide = !1
            }
        } else {
            pg.addSchedule = pg.fUrlParse(b.href).schedule;
            if (pg.addSchedule) {
                var d = ti.fGetRoutes(pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num, pg.addSchedule.dirType, !0)[0];
                $("checkTransfer").checked = b.className.indexOf("active") >= 0,
                $("spanCheckTransfer").innerHTML = i18n.transport1[d.transport] + (d.num.length > 15 ? "" : " " + d.num) + " " + i18n.towards + " " + d.name,
                pg.transfersMenuHide = !1
            }
        }
        var f = $("divTransfersMenu");
        pg.transfersMenuHide ? f.style.display == "block" && pg.fTransfer_MouseOut() : (f.style.left = b.offsetLeft + "px",
        f.style.top = b.offsetTop + b.offsetHeight + "px",
        f.style.display = "block")
    }
}
,
pg.fTransfer_MouseOut = function() {
    pg.transfersMenuHide = !0,
    setTimeout(pg.fTransferHideMenu, 200)
}
,
pg.fScheduleStopActivate = function() {
    var a = "/" + pg.schedule.dirType + "/" + pg.schedule.stopId + "/", b = pg.schedule.dirTypes[pg.schedule.dirType], c;
    for (var d = 1; d <= 2; d++) {
        c = $("dlDirStops" + d).getElementsByTagName("a");
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            d == b && a && pg.schedule.stopId && ("/" + f.href + "/").indexOf(a) >= 0 ? (f.className = "current" + ti.fGetDirTag(pg.schedule.dirType),
            a = "") : f.className.indexOf("current") >= 0 && (f.className = "")
        }
    }
    if (a) {
        c = $("dlDirStops" + (b || 1)).getElementsByTagName("a");
        if (c && (c[0] || {}).href) {
            a = c[0].href.split("#")[1],
            pg.fUrlExecute(a);
            return
        }
    }
    $("aDir1").className = $("divScheduleLeft").className = b == 1 ? "active" : "",
    $("aDir2").className = $("divScheduleRight").className = b == 2 ? "active" : "",
    pg.browserVersion >= 8 && pg.toggleClass($("divScheduleContentInner"), "Right", b == 2),
    pg.fScheduleLoadTimetable()
}
,
pg.fScheduleLoadTimetable = function() {
    var a, b, c, d = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"), e = pg.schedules || {};
    pg.schedules || (e[d] = pg.schedule);
    var f = pg.nonEmptyCount(e) > (e[d] ? 1 : 0)
      , g = ti.fGetTransfersAtStop(pg.schedule.stopId, !0, pg.schedule.route);
    pg.transfersDisplayed = {};
    var h = null
      , i = null
      , j = []
      , k = [];
    for (c = 0; c < g.length; c++) {
        a = g[c],
        d = ti.toAscii([a.city, a.transport, a.num].join("_"), !0);
        if (pg.transfersDisplayed[d])
            continue;
        var l = {
            id: a.id,
            city: a.city,
            transport: a.transport,
            num: ti.toAscii(a.num, !0),
            dirType: a.dirType,
            routeTag: a.stopId,
            stopId: a.stopId
        };
        pg.transfersDisplayed[d] = l;
        if (pg.city === "druskininkai" || pg.city === "liepaja")
            parseInt(pg.schedule.num, 10) === parseInt(a.num, 10) && (e[d] = l,
            f = f || pg.schedule.num !== a.num);
        b = pg.fUrlSet({
            schedule: l
        }, !0),
        h !== a.transport && (h = a.transport,
        j.push(" <span class=\"icon icon_narrow icon_" + a.transport + "\" data-transport=\"" + a.transport + "\"></span>&nbsp;"));
        var m = "<a class=\"hover " + (e[d] ? "activetransfer " : "transfer") + h + "\" href=\"#" + b + "\" title=\"" + (a.name || "").replace(/"/g, "") + "\">" + g[c].num.replace(/\s/g, "&nbsp;") + "</a> ";
        j.push(m),
        e[d] && (i !== a.transport && (i = a.transport,
        m = " <span class=\"icon icon_narrow icon_" + a.transport + "\" data-transport=\"" + a.transport + "-remove\"></span>&nbsp;" + m),
        k.push(m),
        e[d].stopId = a.stopId)
    }
    j.push("<span style=\"display:inline-block; width:2px;\"></span>");
    var n = ti.fGetStopDetails(pg.schedule.stopId)
      , o = (n.street ? ", " + n.street : "") + (n.area && !cfg.cities[pg.city].skipStopArea ? ", " + n.area : "") + (n.city && !cfg.cities[pg.city].skipStopCity ? ", " + n.city : "");
    n[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (o += ", " + i18n.fareZone + " " + n[cfg.cities[pg.city].stopFareZone]),
    o = o.length > 0 ? "<span class=\"details\"> (" + o.substring(2) + ")</span>" : "",
    $("divScheduleStop").innerHTML = i18n.stop + "<strong> " + n.name + "</strong>" + o + "&nbsp;&nbsp; " + j.join("");
    if (n.street) {
        var p = n.street.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;")
          , q = $("divScheduleRoute").getElementsByTagName("a");
        for (c = q.length; --c >= 0; )
            q[c].innerHTML.indexOf(p) < 0 ? q[c].className == "hover strong" && (q[c].className = "hover") : q[c].className = "hover strong"
    }
    var r = []
      , s = 0
      , t = Number.POSITIVE_INFINITY
      , u = cfg.city.doNotMergeTimetables;
    pg.schedule.stopId != pg.schedule.route.stops[0] && cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[pg.transport] && (e = null);
    for (var d in e) {
        var l = e[d];
        if (!l || !l.stopId)
            continue;
        if (!pg.transfersDisplayed[d])
            continue;
        var v = ti.fGetStopDetails(l.stopId)
          , w = {}
          , x = (v || {
            raw_data: ""
        }).raw_data.split(";")
          , y = l.dirType.split("-")
          , z = y[0]
          , A = y[y.length - 1]
          , B = 2;
        z === "a" || A === "b" ? B = 1 : z.charAt(0) !== "b" && A.charAt(0) !== "a" && (z.charAt(0) === "a" || A.charAt(0) === "b") && (B = 1);
        var C = ti.toAscii(pg.schedule.route.name, !0);
        for (var c = ti.FLD_DIRS; c < x.length; c += 2) {
            a = ti.fGetRoutes(x[c]);
            if (a.city === l.city && a.transport === l.transport && ti.toAscii(a.num, !0) === l.num && a.times && (!pg.schedule.route.routeTag || a.id === pg.schedule.route.id || ti.toAscii(a.name, !0) === C)) {
                y = a.dirType.split("-"),
                z = y[0],
                A = y[y.length - 1];
                var D = 2;
                z === "a" || A === "b" ? D = 1 : z.charAt(0) !== "b" && A.charAt(0) !== "a" && (z.charAt(0) === "a" || A.charAt(0) === "b") && (D = 1);
                if (B !== D)
                    continue;
                if (w[a.id])
                    continue;
                w[a.id] = !0,
                a.tag = (!f && a.dirType != pg.schedule.dirType && ti.toAscii(a.name, !0) !== C ? "other" : "current") + ti.fGetDirTag(a.dirType);
                if (a.tag == "current" || a.tag == "other" && z.charAt(0) == "d")
                    a.tag = "";
                (pg.city === "druskininkai" || pg.city === "liepaja") && pg.schedule.num === a.num && (a.tag = "");
                var E = typeof a.times === "string" ? ti.explodeTimes(a.times) : a.times
                  , F = +x[c + 1]
                  , G = E.workdays
                  , H = E.tag
                  , I = E.times
                  , J = G.length
                  , K = J;
                for (var L = J + F * J; K--; ) {
                    var M = I[--L];
                    t > M && M >= 0 && (t = M);
                    var N = a.tag
                      , O = !1;
                    H.charAt(K) === "1" ? N = (N ? N + " " : "") + "highlighted" : H.charAt(K) === "2" && (O = !0),
                    pg.schedule.tripNum && a.dirType === pg.schedule.dirType && pg.schedule.tripNum - 1 == K && (N = (N ? N + " " : "") + "clicked");
                    if (u)
                        r[s++] = {
                            time: M,
                            workday: G[K],
                            route: a,
                            tag: N,
                            bicycle: O,
                            tripNum: K
                        };
                    else
                        for (var P = 1; P <= 7; P++)
                            G[K].indexOf(P) >= 0 && (r[s++] = {
                                time: M,
                                workday: P,
                                route: a,
                                tag: N,
                                bicycle: O,
                                tripNum: K
                            })
                }
            }
        }
    }
    r.sort(function(a, b) {
        if (a.workday < b.workday)
            return -1;
        if (a.workday > b.workday)
            return 1;
        if (a.time < b.time)
            return -1;
        if (a.time > b.time)
            return 1;
        if (a.route.id < b.route.id)
            return -1;
        if (a.route.id > b.route.id)
            return 1;
        return 0
    });
    var Q = "";
    f ? (Q = "<div style=\"width:100%; margin-top:10px;\">" + k.join(" &nbsp;") + " &nbsp;<label id=\"labelShowDeparturesWithNumbers\" for=\"showDeparturesWithNumbers\"><input name=\"showDeparturesWithNumbers\" id=\"showDeparturesWithNumbers\" type=\"checkbox\" value=\"showDeparturesWithNumbers\"" + (pg.showDeparturesWithNumbers ? " checked=\"checked\"" : "") + " onclick=\"pg.fToggleNumbersAtDepartures();\" />" + i18n.showDeparturesWithRouteNumbers + "</label></div>",
    $("divScheduleRoute").style.display = "none") : $("divScheduleRoute").style.display = "",
    j = [];
    if (r.length) {
        var R, S = t = ~~(t / 60) - 1, T = [], U = [], V;
        for (c = 0,
        L = r.length; c <= L; c++) {
            if (c > 0 && (c === L || r[c].workday != r[c - 1].workday)) {
                var V = j.join(";")
                  , J = r[c - 1].workday;
                for (kk = 1; kk <= 7; ++kk)
                    if (T[kk] === V) {
                        U[kk] += J;
                        break
                    }
                kk > 7 && (T[J] = V,
                U[J] = "" + J);
                if (c === L)
                    break;
                j = []
            }
            V = r[c];
            var a = V.route;
            j.push(V.time, a.city, a.transport, a.num, a.dirType)
        }
        j = [];
        for (c = 0,
        L = r.length; c <= L; c++) {
            if (c < L) {
                V = r[c];
                if (u)
                    U[V.workday] = V.workday;
                else if (!U[V.workday])
                    continue
            }
            if (c > 0 && (c === L || V.workday != r[c - 1].workday)) {
                S != -999 && j.push("</td></tr>"),
                j.push("</tbody></table>");
                if (c === L)
                    break
            }
            if (c == 0 || V.workday != r[c - 1].workday)
                S = t,
                j.push("<table class=\"timetable\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><th></th><th class=\"workdays\">" + pg.fWeekdaysName(U[r[c].workday]) + "</th></tr>");
            var W = V.time;
            if (W < 0)
                continue;
            var X = ~~(W / 60);
            W = W % 60;
            if (S !== X) {
                if (S != t) {
                    j.push("</td></tr>");
                    while (++S < X)
                        j.push("<tr><th>-</th><td></td></tr>")
                } else
                    while (++S < X)
                        j.push("<tr><th>&nbsp;</th><td></td></tr>");
                S = X,
                j.push("<tr><th>" + X % 24 + "</th><td" + (f ? " style=\"white-space:normal;\"" : "") + ">")
            }
            var Y = V.route;
            b = pg.fUrlSet({
                schedule: {
                    city: Y.city,
                    transport: Y.transport,
                    num: Y.num,
                    dirType: Y.dirType,
                    stopId: Y.stopId,
                    tripNum: V.tripNum + 1
                }
            }, !0),
            j.push("<a href=\"#" + b + "\" title=\"" + (f ? i18n.transport1[Y.transport] + (Y.num.length > 15 ? "" : " " + Y.num) + " " + i18n.towards + " " : "") + Y.name.replace(/"/g, "") + "\"" + (V.tag ? "class=\"" + V.tag + "\"" : "") + ">" + (W < 10 ? "0" : "") + W + (f ? "<span class=\"departure" + Y.transport + "\">\\" + Y.num + "</span>" : "") + (V.bicycle ? "<img class=\"icon\" style=\"margin:0 1px;\" src=\"" + pg.imagesFolder + "bicycle.png\">" : "") + (f ? "</a>&#x200A;" : "</a>"))
        }
    }
    Q += j.join("");
    if (pg.schedule.route && pg.schedule.route.transport) {
        a = pg.schedule.route,
        j = [];
        var Z = cfg.city["notes_" + a.transport + "_" + a.num] || cfg.city["notes_" + a.operator] || cfg.city["notes_" + a.transport];
        Z && (Q = "<div style=\"margin-top:10px; clear:both;\">" + (Z[pg.language] || Z.en || Z) + "</div>" + Q),
        Z = cfg.city.skipOperator ? "" : ti.fOperatorDetails(a.operator, a.transport),
        Z && j.push("<p class=\"noindent\"><strong>" + i18n.operator + ":</strong> " + Z + "</p>"),
        Z = (cfg.operators[a.operator] || cfg.operators[a.transport] || cfg.operators[a.transport + "_" + a.num] || {
            notes: ""
        }).notes,
        Z && j.push("<p>" + (Z[pg.language] || Z.en || Z).replace("%operator", a.operator) + "</p><br /><br />"),
        e && (j.push("<p class=\"noindent\"><strong>" + i18n.scheduleCommentsInfo + ":</strong>"),
        Q.indexOf("bicycle") >= 0 && j.push("<p>" + i18n.transferBicyclesDepartures),
        Q.indexOf("highlighted") >= 0 && j.push("<p>" + i18n.lowFloorDepartures),
        Q.indexOf("other") >= 0 && j.push("<p>" + i18n.scheduleChangedDepartures),
        Z = (cfg.operators[a.operator] || cfg.operators[a.transport] || {
            comments: ""
        }).comments,
        Z ? j.push("<p>" + (Z[pg.language] || Z.en || Z).replace("%operator", a.operator) + "</p>") : (i18n.scheduleDelaysWarning && i18n.scheduleDelaysWarning.length > 10 && j.push("<p>" + i18n.scheduleDelaysWarning),
        j.push("<p>" + i18n.scheduleComments))),
        $("divScheduleContentBottom").innerHTML = j.join("</p>") + "</p>"
    }
    pg.replaceHtml($("divScheduleContentInner"), Q + "<div style=\"clear:both;\"></div>")
}
,
pg.fCheckTransfer_Click = function() {
    if (!pg.addSchedule)
        return !1;
    $e = $("checkTransfer");
    var a;
    pg.schedules || (a = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"),
    pg.schedules = {},
    pg.schedules[a] = pg.schedule);
    if (typeof pg.addSchedule == "object")
        a = ti.toAscii([pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num].join("_")),
        pg.schedules[a] = $e.checked ? pg.addSchedule : null;
    else {
        pg.addSchedule = (pg.addSchedule || "").replace("-remove", "");
        for (var a in pg.transfersDisplayed) {
            var b = pg.transfersDisplayed[a];
            b.transport == pg.addSchedule && (pg.schedules[a] = $e.checked ? b : null)
        }
    }
    pg.fScheduleLoadTimetable();
    return
}
,
pg.fToggleNumbersAtDepartures = function() {
    pg.showDeparturesWithNumbers = $("showDeparturesWithNumbers").checked,
    pg.toggleClass($("divScheduleContentInner"), "HideNumbers", !pg.showDeparturesWithNumbers)
}
,
pg.fWeekdaysName = function(a) {
    var b = i18n["weekdays" + a] || "";
    if (b)
        return b;
    var c = a.split("");
    for (var d = c.length; --d >= 0; )
        b = c[d],
        c[d] = i18n["weekdays" + b] || b;
    b = c.join(", ");
    return b
}
;
function pikasRoute(a, b) {
    a = a || {
        origin: "3540",
        destination: "54.68561;25.28670",
        departure_time: "1355295600",
        walk_max: "1000"
    };
    var c = ti.parseParams(a);
    c.callback = function(a) {
        if (b === "JSON" || b === "json")
            document.body.innerHTML = JSON.stringify(ti.ToGoogleFormat(a), null, 4);
        else if (typeof b === "string") {
            var c = "";
            a.timeStarted && (c += "Search took " + (+(new Date) - a.timeStarted) + "ms<br /><br />"),
            c += "Optimal routes:";
            var d = a.results || [];
            for (var e = 0; e < d.length; e++) {
                var f = d[e]
                  , g = d[e].legs;
                c += ["<br />Option", e + 1, "travel time: " + ti.printTime(f.travel_time), "<br />"].join("&nbsp;");
                for (var h = 0; h < g.length; h++) {
                    var i = g[h];
                    c += [i.start_stop.name, ti.printTime(i.start_time), ti.printTime(i.finish_time), i.finish_stop.name, " "].join(" "),
                    i.route ? c += [i.route.transport, i.route.num, i.route.name, i.weekdays, "<br />"].join(" ") : c += "walk<br />"
                }
            }
            document.body.innerHTML = c
        } else
            typeof b === "function" ? b(ti.ToGoogleFormat(a)) : window.JSClassObject.receiveResult(JSON.stringify(ti.ToGoogleFormat(a), null, 4))
    }
    ,
    ti.findTrips(c)
}
ti.findTrips = function(a) {
    if (a && a.callback) {
        if (a.status && a.status != "OK") {
            a.callback(a);
            return
        }
        a.no_just_walking = !1,
        a.reverseOriginal = a.reverse;
        if (!a.attempt) {
            if (typeof pg === "object") {
                if (pg.optimalSearchRunning)
                    return;
                pg.optimalSearchRunning = !0
            }
            a.timeStarted = +(new Date),
            ti.timeStarted = +(new Date),
            a.attempt = 1,
            a.direct_routes = [];
            var b = a.date;
            b || (b = new Date,
            b = new Date(b.getFullYear(),b.getMonth(),b.getDate()),
            a.date = b),
            a.transport || (a.transport = {}),
            a.transportOriginal = ti.cloneObject(a.transport),
            typeof a.reverse == "undefined" && (a.reverse = 1,
            a.reverseOriginal = a.reverse);
            if (typeof cfg === "object" && cfg.defaultCity === "latvia")
                a.transport.internationalbus = !1;
            else if (a.transport.bus || a.transport.trol || a.transport.tram)
                a.transport.regionalbus && (a.transport.regionalbus = !1,
                a.attempt = -1),
                a.transport.commercialbus && (a.transport.commercialbus = !1,
                a.attempt = -1),
                a.transport.train && (a.transport.train = !1,
                a.attempt = -1);
            dijkstra(a, a.start_time, a.reverse);
            return
        }
        if (a.attempt == -1) {
            a.attempt = 1;
            if (a.results.length <= 0) {
                a.transport = a.transportOriginal,
                dijkstra(a, a.start_time, a.reverse);
                return
            }
        }
        if (a.attempt == 1 && a.results.length <= 0) {
            a.attempt = 2,
            a.reverse = -a.reverse,
            a.sort = "no sort";
            if (typeof cfg !== "object" || cfg.defaultCity !== "intercity") {
                dijkstra(a, a.reverse == 1 ? 0 : 4320, a.reverse);
                return
            }
        }
        if (a.attempt == 2 && a.results.length > 0) {
            a.attempt = 999,
            a.reverse = -a.reverse;
            var c;
            for (var d = 0; d < a.results.length; d++)
                a.reverse == 1 && (d == 0 || c < a.results[d].start_time) && (c = a.results[d].start_time),
                a.reverse == -1 && (d == 0 || c > a.results[d].finish_time) && (c = a.results[d].finish_time);
            dijkstra(a, c, a.reverse);
            return
        }
        if (a.attempt == 1) {
            var c = null;
            for (var d = 0; d < a.results.length; d++) {
                if (a.results[d].code == "W")
                    continue;
                a.reverse == 1 && (!c || c > a.results[d].finish_time) && (c = a.results[d].finish_time),
                a.reverse == -1 && (!c || c < a.results[d].start_time) && (c = a.results[d].start_time)
            }
            a.results0 = ti.filterSearchResults(a.results, a.reverse),
            a.results = a.results0.slice(0, 1),
            a.results = ti.finalizeSearchResults(a),
            a.callback1 && a.callback1(a),
            a.attempt = 3,
            a.no_just_walking = !0;
            if (c) {
                dijkstra(a, c, -a.reverse, a.start_time);
                return
            }
            a.results = []
        }
        if (a.attempt >= 3 && a.attempt <= 5) {
            a.results.push.apply(a.results, a.results0),
            a.results = ti.filterSearchResults(a.results, a.reverse);
            if (a.results.length > 0)
                if (!0 || a.results.length == 1 || a.results0.length >= a.results.length)
                    if (a.results[0].legs.length != 1 || a.results[0].legs[0].route) {
                        a.attempt = 6,
                        a.results0 = a.results,
                        a.no_just_walking = !0,
                        dijkstra(a, a.reverse == 1 ? a.results[0].start_time + 1 : a.results[0].finish_time - 1, a.reverse);
                        return
                    }
        }
        a.attempt == 6 && a.results.push.apply(a.results, a.results0),
        a.results = ti.filterSearchResults(a.results, a.reverse);
        if (typeof cfg == "object" && cfg.defaultCity === "disable_temporary_latvia" && a.attempt <= 999) {
            typeof pg === "object" && (pg.optimalSearchRunning = !1,
            ($("online_results") || {}).innerHTML = ""),
            a.attempt = 1e3;
            var e = {};
            a.online_results = [],
            a.online_results_required_count = 0;
            for (var d = 0; d < a.results.length; d++) {
                var f = a.results[d]
                  , g = f.legs;
                for (var h = 0; h < g.length; h++) {
                    var i = g[h];
                    if (i.route) {
                        var j = i.start_stop && ti.fGetStopDetails(i.start_stop.id)
                          , k = i.finish_stop && ti.fGetStopDetails(i.finish_stop.id);
                        j && j.info && k && k.info && !e[j.info + ";separator;" + k.info] && (e[j.info + ";separator;" + k.info] = [j.info, k.info],
                        ++a.online_results_required_count)
                    }
                }
            }
            for (var d in e) {
                var j = e[d][0]
                  , k = e[d][1]
                  , l = "timetable" + a.date.yyyymmdd() + j + k;
                l += "7xk$n1Lp1*9E!3",
                l = SHA1(l);
                var m = "/api/ltc.php?action=timetable";
                m += "&date=" + a.date.yyyymmdd(),
                m += "&from=" + j,
                m += "&to=" + k,
                m += "&signature=" + l,
                ti.SERVER === !0 ? typeof http != "undefined" && http.get({
                    host: "bezrindas.lv",
                    port: 80,
                    path: m
                }, function(b) {
                    b.setEncoding("utf8");
                    var c = "";
                    b.on("data", function(a) {
                        c += a
                    }),
                    b.on("end", function() {
                        if (c) {
                            var b = JSON.parse(c);
                            b.contents && (b = b.contents),
                            b && b.length && a.online_results.push.apply(a.online_results, [].concat(b)),
                            --a.online_results_required_count == 0 && ti.findTrips(a)
                        }
                    })
                }) : (m = "http://bezrindas.lv" + m,
                a.online_query_url = m,
                m = "http://www.stops.lt/latviatest/proxy.php?url=" + encodeURIComponent(m),
                ($("online_results") || {}).innerHTML = "<br/>Waiting data from bezrindas.lv for stops pairs: " + a.online_results_required_count,
                ti.fDownloadUrl("get", m, function(b) {
                    if (b) {
                        a.online_results_JSON = b;
                        var c = JSON.parse(b);
                        c.contents && (c = c.contents),
                        c && c.length && a.online_results.push.apply(a.online_results, [].concat(c)),
                        ($("online_results") || {}).innerHTML = "<br/>Waiting data from bezrindas.lv for stops pairs: " + (a.online_results_required_count - 1),
                        --a.online_results_required_count == 0 && ti.findTrips(a)
                    }
                }, !0))
            }
            if (a.online_results_required_count > 0)
                return
        }
        a.results = ti.finalizeSearchResults(a, a.online_results),
        typeof pg === "object" && (pg.optimalSearchRunning = !1);
        if (a.callback)
            a.callback(a, !0);
        else {
            if (typeof pg === "object")
                return a;
            if (typeof window == "object")
                document.body.innerHTML = JSON.stringify(a.results);
            else
                return a
        }
    }
}
;
function dijkstra(a, b, c, d) {
    typeof cfg == "object" && cfg.defaultLanguage == "lt" && (ti.specialWeekdays[ti.dateToDays(new Date(2014,1,16))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,2,11))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,3,21))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,4,1))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,5,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,6,6))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,7,15))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,10,1))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,11,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,11,25))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2014,11,26))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,0,1))] = 7),
    typeof cfg == "object" && cfg.defaultLanguage == "ee" && (ti.specialWeekdays[ti.dateToDays(new Date(2016,5,23))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,5,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,7,20))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,11,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,11,25))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2015,11,26))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,0,1))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,1,24))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,2,25))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,2,27))] = 7,
    ti.specialWeekdays[ti.dateToDays(new Date(2016,4,1))] = 7);
    var e = ""
      , f = "a";
    typeof cfg == "object" && cfg.defaultCity == "latvia" && (e = ";bus;trol;tram;minibus;",
    f = "nothing");
    var g = !1
      , h = c == -1 ? a.finish_stops.split(",") : a.start_stops.split(",")
      , i = c == -1 ? a.start_stops.split(",") : a.finish_stops.split(",")
      , j = a.finish_stops === "0;0";
    c || (g = !0,
    c = 1,
    a.direct_routes = []),
    a.results = [],
    b = typeof b != "undefined" ? b * c : 0,
    d = typeof d != "undefined" ? d * c : 7200;
    var k = b
      , l = c == 1 ? "1" : "2"
      , m = c == 1 ? "2" : "1"
      , n = a.route_nums ? "," + a.route_nums.toLowerCase().replace(/\s/g, "") + "," : ""
      , o = a.lowFloor;
    n.indexOf(",z,") >= 0 && (o = !0,
    n = n.replace(/,z,/g, "")),
    a.date || (a.date = new Date);
    var p = ti.dateToDays(a.date)
      , q = "" + (ti.specialWeekdays[p] || a.date.getDay() || 7)
      , r = a.max_changes || Number.POSITIVE_INFINITY
      , s = a.change_time || 3
      , t = a.walk_speed_kmh || 4
      , u = a.walk_max || 500;
    u = g ? .05 : u / 1e3,
    u = u * u;
    var v = ti.stops
      , w = ti.routes
      , x = ti.specialDates
      , y = a.direct_routes || []
      , z = a.transport
      , A = a.operators
      , B = a.removed_trips ? "," + a.removed_trips.replace(/\s/g, "") + "," : ""
      , C = a.added_trips ? "," + a.added_trips.replace(/\s/g, "") + "," : ""
      , D = a.commercial
      , E = a.routetypes
      , F = E != 1
      , G = a.area
      , H = 0
      , I = a.middle_stops;
    if (I) {
        H = 10;
        for (var J in I) {
            var K = v[J].routes;
            for (var L = 0; L < K.length; L += 2)
                w[K[L]].available = 10
        }
    }
    var M, N, O = {}, P = {}, Q = {};
    for (var R = 1, S = h; R <= 2; ++R) {
        for (var L = S.length; --L >= 0; )
            if (S[L].charAt(0) == f) {
                var T = v[S[L]];
                if (T)
                    for (var U = T.neighbours.length; --U >= 0; )
                        S.push(T.neighbours[U]);
                S[L] = "removed stop"
            } else if (S[L].indexOf(";") > 0) {
                var V = S[L].split(";");
                R == 1 ? M = {
                    id: S[L],
                    lat: parseFloat(V[0]),
                    lng: parseFloat(V[1]),
                    neighbours: []
                } : (N = {
                    id: S[L],
                    lat: parseFloat(V[0]),
                    lng: parseFloat(V[1])
                },
                P[N.id] = !0,
                M && (Q[M.id] = !0))
            }
        S = i
    }
    var W = []
      , X = {};
    X[k] = [];
    for (var J in v) {
        var T = v[J];
        T.time = Number.POSITIVE_INFINITY,
        T.trip_date = null,
        j && (T.rideStart = T.rideEnd = 0);
        if (!T.lat || !T.lng)
            continue;
        if (M) {
            var Y = (M.lng - T.lng) * 58.1
              , Z = (M.lat - T.lat) * 111.2
              , $ = Y * Y + Z * Z;
            $ <= u && (M.neighbours.push(T.id),
            cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0))
        }
        if (N) {
            var Y = (N.lng - T.lng) * 58.1
              , Z = (N.lat - T.lat) * 111.2
              , $ = Y * Y + Z * Z;
            if ($ <= u) {
                Q[T.id] = !0,
                cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0);
                var _ = T.neighbours;
                for (var U = _.length; --U >= 0; )
                    T.name === v[_[U]].name && (Q[_[U]] = !0)
            }
        }
    }
    for (var U = h.length; --U >= -1; ) {
        var T = U >= 0 ? v[h[U]] : M;
        T && (T.prev_stop = !1,
        T.route = null,
        T.changes = 0,
        O[T.id] = !0,
        U == -1 && c == -1 && s ? (k -= s,
        X[k] = [M]) : X[k].push(T),
        T.time = k,
        typeof cfg == "object" && cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0))
    }
    for (var U = i.length; --U >= 0; ) {
        var J = i[U]
          , T = v[J];
        T && (P[J] = !0,
        typeof cfg == "object" && cfg.defaultCity == "latvia" && T.city && T.city.toLowerCase().indexOf("latvija") < 0 && (z.internationalbus = !0))
    }
    if (!0 || g)
        for (var ba = w.length; --ba >= 0; ) {
            var bb = ti.fGetRoutes(ba)
              , bc = w[ba];
            bc.available = z && z[bb.transport] === !1 || H && H !== bc.available || n && n.indexOf("," + bb.num.toLowerCase() + ",") < 0 || D && D != bb.commercial || E && F != !_transport_data[bb.transport].region || G && G != bb.cities[0] ? 0 : 1
        }
    for (var U = y.length; --U >= 0; )
        y[U].available = 0;
    for (var ba in w) {
        var bc = w[ba];
        bc.trip_start_time = Number.POSITIVE_INFINITY
    }
    a.finish_stops || (i = !1);
    var bd = +(new Date), be, bf = 0, bg = function() {
        for (var b = 0; ; ) {
            for (var f; !(f = X[k]) || !f.length; )
                if (++k > d) {
                    if (!W.length) {
                        a.results = [];
                        if (g)
                            return [];
                        a.callback2 ? window.setTimeout(a.callback2, 10) : typeof window === "object" ? window.setTimeout(function() {
                            ti.findTrips(a)
                        }, 10) : ti.findTrips(a);
                        return
                    }
                    f = !1;
                    break
                }
            if (!f)
                break;
            f = f.pop();
            if (f.time < k || f.changes < 0)
                continue;
            if (++b == 3e3 && !g && typeof window == "object") {
                +(new Date) - bd > 3e4 ? (a.results = [],
                window.setTimeout(function() {
                    ti.findTrips(a)
                }, 10)) : window.setTimeout(bg, 100);
                return
            }
            if (P[f.id]) {
                d > k + 60 && (d = k + 60);
                continue
            }
            var h = f.changes || 0
              , n = null
              , y = null;
            if (!g) {
                var z = f;
                while (!z.route && z.prev_stop)
                    z = z.prev_stop;
                var D = z.lat
                  , E = z.lng
                  , F = f.neighbours;
                for (var G = F.length; --G >= -1; ) {
                    if (typeof cfg === "object" && cfg.defaultCity === "kaunas") {
                        if (({
                            805: !0,
                            786: !0,
                            787: !0,
                            "787a": !0,
                            397: !0,
                            398: !0,
                            403: !0,
                            404: !0,
                            405: !0,
                            641: !0
                        })[f.id] && ({
                            196: !0,
                            195: !0,
                            664: !0,
                            201: !0,
                            202: !0,
                            203: !0,
                            204: !0,
                            207: !0,
                            208: !0,
                            209: !0,
                            210: !0
                        })[F[G]])
                            continue;
                        if (({
                            805: !0,
                            786: !0,
                            787: !0,
                            "787a": !0,
                            397: !0,
                            398: !0,
                            403: !0,
                            404: !0,
                            405: !0,
                            641: !0
                        })[F[G]] && ({
                            196: !0,
                            195: !0,
                            664: !0,
                            201: !0,
                            202: !0,
                            203: !0,
                            204: !0,
                            207: !0,
                            208: !0,
                            209: !0,
                            210: !0
                        })[f.id])
                            continue
                    }
                    if (typeof cfg === "object" && cfg.defaultCity.indexOf("viln") == 0) {
                        if (({
                            "0906": !0,
                            "0905": !0,
                            "0904": !0,
                            "0903": !0,
                            "0902": !0,
                            "0901": !0,
                            2309: !0,
                            2308: !0,
                            2310: !0,
                            2311: !0,
                            2316: !0,
                            2317: !0
                        })[f.id] && ({
                            1103: !0,
                            1104: !0,
                            1107: !0,
                            1110: !0,
                            1113: !0,
                            1114: !0,
                            1115: !0,
                            1116: !0,
                            2314: !0,
                            2315: !0,
                            2318: !0,
                            2319: !0,
                            2320: !0
                        })[F[G]])
                            continue;
                        if (({
                            "0906": !0,
                            "0905": !0,
                            "0904": !0,
                            "0903": !0,
                            "0902": !0,
                            "0901": !0,
                            2309: !0,
                            2308: !0,
                            2310: !0,
                            2311: !0,
                            2316: !0,
                            2317: !0
                        })[F[G]] && ({
                            1103: !0,
                            1104: !0,
                            1107: !0,
                            1110: !0,
                            1113: !0,
                            1114: !0,
                            1115: !0,
                            1116: !0,
                            2314: !0,
                            2315: !0,
                            2318: !0,
                            2319: !0,
                            2320: !0
                        })[f.id])
                            continue
                    }
                    var H;
                    if (G < 0)
                        if (Q[f.id])
                            H = N;
                        else
                            break;
                    else
                        H = v[F[G]] || {
                            lat: 999,
                            lng: 999
                        };
                    var J = (E - H.lng) * 58.1
                      , K = (D - H.lat) * 111.2
                      , L = J * J + K * K;
                    if (H === z || H === f)
                        continue;
                    if (H === N) {
                        if (L > u && z === M && H.id.indexOf(";") > 0)
                            continue
                    } else if (L > u && (!f.name || H.name !== f.name))
                        continue;
                    L = Math.sqrt(L);
                    var R = Math.round(L / t * 60);
                    R += z.time,
                    z.route || !z.prev_stop && c < 0 || (R += s),
                    R < k && (R = k);
                    if (R > d)
                        continue;
                    if (P[H.id])
                        if (!1 && h === 1 && z.prev_stop && typeof cfg === "object" && cfg.defaultCity === "latvia")
                            f = z.prev_stop,
                            n = z.id,
                            y = z.prev_stop_start_time;
                        else {
                            if (R > H.time)
                                continue;
                            if (R == H.time && h >= H.changes)
                                continue;
                            var S = {
                                legs: [{
                                    start_stop: z,
                                    start_time: c * (z.time - (z.route ? s : 0)),
                                    finish_stop: H,
                                    finish_time: c * (R - s),
                                    route: null
                                }]
                            };
                            W.push(S)
                        }
                    else {
                        if (R > H.time)
                            continue;
                        if (R != H.time || h < H.changes)
                            H.route = !1,
                            H.prev_stop = z,
                            H.prev_stop_start_time = z.time - (z.route ? s : 0);
                        else
                            continue
                    }
                    j && z.route && (H.rideStart = z.rideStart,
                    H.rideEnd = z.rideEnd),
                    H.time = R,
                    H.changes = h;
                    var T = X[R];
                    T ? T[T.length] = H : X[R] = [H]
                }
            }
            h = f.changes || 0;
            if (h <= r) {
                var U = f.routes || [];
                for (var G = 0, V = U.length; G < V; G += 2) {
                    var Y = w[U[G]];
                    if (g) {
                        if (Y.available === 0 && i)
                            continue;
                        a.direct_routes.push(Y),
                        G + 2 < V && U[G + 2] == U[G] && (G += 2)
                    } else if (!Y.available)
                        continue;
                    if (typeof Y.times === "string") {
                        var Z = ti.fGetRoutes(Y.id);
                        Y.times = ti.explodeTimes(Y.times),
                        Y.city = Z.city,
                        Y.transport = Z.transport,
                        Y.num = Z.num,
                        Y.stops = Z.stops,
                        Y.platforms = Z.platforms,
                        Y.entry = Z.entry,
                        Y.specialDates = Z.specialDates
                    }
                    var $ = Y.times
                      , _ = "";
                    e && e.indexOf(Y.transport) < 0 && (f.city.indexOf("riga") < 0 ? f.city.indexOf("liep") < 0 ? f.city.indexOf("jelg") >= 0 && (_ = "jelg") : _ = "liep" : _ = "riga");
                    var ba = U[G + 1]
                      , bb = Y.stops || Y.raw_data.split(";").slice(ti.RT_ROUTESTOPS);
                    if (c == 1 && ba >= bb.length - 1 || c == -1 && ba == 0)
                        continue;
                    var bc;
                    if ((bc = Y.entry).charAt(ba) == m)
                        continue;
                    bb[ba] == bb[ba + c] && (ba += c);
                    if (!$)
                        continue;
                    var be = $.workdays
                      , bh = $.valid_from
                      , bi = $.valid_to
                      , bj = $.trip_operators
                      , bk = $.trip_groups
                      , bl = $.trip_ids
                      , bm = $.tag
                      , bn = $.times;
                    $ = null;
                    var bo = be.length, bp = bo, bq, br, bs = 0, bt = 0;
                    x = Y.specialDates;
                    for (var bu = 0, bv = x.length; bu < x.length; ++bu) {
                        if (!x[bu])
                            continue;
                        if (x[bu++][p]) {
                            (bq = x[bu]) === "*" && (bq = q);
                            break
                        }
                        x[bu] === "*" && (bq = "0")
                    }
                    var bw = y || k;
                    if (f.route && Y.num === f.route.num && Y.transport === f.route.transport && Y.city === f.route.city)
                        bw -= s;
                    else if (h > 0 && typeof cfg == "object" && cfg.defaultCity == "latvia" && !y) {
                        bw -= s;
                        var bx = Y;
                        c == -1 && (bx = f.route || f.prev_stop && f.prev_stop.route),
                        bx && (bx.transport == "internationalbus" ? bw += Math.max(s, 20) : bx.transport == "train" ? bw += Math.max(s, ({
                            1: 10,
                            2: 15,
                            3: 20
                        })[bx.num.charAt(1)] || 10) : bw += Math.max(s, ({
                            2: 5,
                            3: 5,
                            4: 10,
                            5: 10,
                            6: 10,
                            7: 15,
                            8: 20
                        })[bx.num.charAt(0)] || s))
                    }
                    var by = bw * c;
                    bw >= 1440 && (bs = bw - bw % 1440);
                    var bz = !1;
                    do {
                        var bA = -1, bB = Number.POSITIVE_INFINITY, bC, bD, bE = null, bF = !g || !I, bG = c * bo, bH = +(new Date);
                        for (var bI = bp + ba * bo; bp-- > 0; ) {
                            --bI;
                            if (A) {
                                var bJ = A[bj[bp]];
                                if (typeof bJ != "string")
                                    continue;
                                if (bJ != "" && ("," + bJ + ",").indexOf("," + bk[bp] + ",") < 0)
                                    continue
                            }
                            if (B && B.indexOf("," + bl[bp] + ",") >= 0)
                                continue;
                            bC = bD = bn[bI];
                            if (bC < 0)
                                continue;
                            if (bC - by >= 1440 || bC * c - bw >= 1440)
                                bC = by + (bC - by) % 1440;
                            bC < by == (c == 1) && bC != by && (bC = (bw + 1440) * c - (by - bC) % 1440),
                            bD = bC - bD,
                            bC *= c;
                            if (bC < bw)
                                continue;
                            bD ? (bq = ((+q + Math.floor(bD / 1440)) % 7 || 7).toString(),
                            br = p + bD / 1440) : (bq = q,
                            br = p);
                            if ((bC < bB || g || bz) && (!q || be[bp].indexOf(bq) >= 0 || C && C.indexOf("," + bl[bp] + ",") >= 0) && (!o || bm.charAt(bp) === "1") && (!bi[bp] || bi[bp] >= br) && bh[bp] <= br) {
                                if (bn[bI + bG] < 0)
                                    continue;
                                bA = bI,
                                bB = bC,
                                bt = bD;
                                if (bz || g) {
                                    if (!i) {
                                        var S = {
                                            route: ti.fGetRoutes(Y.id),
                                            start_time: bB,
                                            date: bE,
                                            trip_num: bA % bo
                                        };
                                        S.route.stopId = f.id,
                                        W.push(S),
                                        bA = -2;
                                        continue
                                    }
                                    break
                                }
                            }
                        }
                        bf += +(new Date) - bH;
                        if (bA < 0) {
                            if (bA != -2 && !i) {
                                var S = {
                                    route: ti.fGetRoutes(Y.id),
                                    start_time: -1,
                                    trip_num: -1
                                };
                                S.route.stopId = f.id,
                                W.push(S)
                            }
                            break
                        }
                        var bK, bL = c * bn[bA % bo];
                        if (bs || bt)
                            bE = new Date(a.date.valueOf()),
                            bE.setDate(bE.getDate() + Math.floor(bt / 1440));
                        g || bz || n ? bK = c === -1 ? 1 : bb.length : bL < Y.trip_start_time ? (bK = c == 1 ? bb.length : 1,
                        Y.trip_start_time = bL,
                        Y.pos_max = c * ba) : (bK = Y.pos_max,
                        bK > c * ba && bL == Y.trip_start_time && (Y.pos_max = c * ba));
                        var bG = c * bo;
                        for (var bM = ba; c * (bM += c) < bK; ) {
                            bA += bG;
                            if (bc.charAt(bM) == l)
                                continue;
                            var R;
                            if ((R = bn[bA]) >= 0) {
                                R = c * (R + bt) + s;
                                if (R > d && !bz)
                                    break;
                                if (R < k && !n)
                                    continue;
                                var H;
                                if (!(H = v[bb[bM]]))
                                    continue;
                                if (_ && H.city.indexOf(_) >= 0)
                                    continue;
                                var bN;
                                g && !bF && (bF = H.id in I);
                                if ((P[H.id] || H.id === n) && bF) {
                                    if (h > 0 && R > H.time)
                                        continue;
                                    if (h > 0 && R == H.time && h >= H.changes)
                                        continue;
                                    if (h == 0 && !bz && typeof cfg === "object" && cfg.defaultCity === "intercity") {
                                        bz = !0,
                                        bp = bo,
                                        a.direct_routes.push(Y);
                                        break
                                    }
                                    if (g || bz) {
                                        Y.available = 0;
                                        if (f.id.indexOf(";") < 0)
                                            for (var bO = 0; bO < bM; ++bO) {
                                                if (bc.charAt(bO) == l || bb[bO] == bb[bO + 1])
                                                    continue;
                                                if (O[bb[bO]] && bn[bA + bG * (bO - bM)] >= 0) {
                                                    f = v[bb[bO]],
                                                    bB = bn[bA + bG * (bO - bM)] + bt;
                                                    break
                                                }
                                            }
                                        for (var bO = bK; --bO > bM; ) {
                                            if (bc.charAt(bO) == l || bb[bO] == bb[bO - 1])
                                                continue;
                                            if (P[bb[bO]] && bn[bA + bG * (bO - bM)] >= 0) {
                                                H = v[bb[bO]],
                                                R = bn[bA + bG * (bO - bM)] + s + bt;
                                                break
                                            }
                                        }
                                    }
                                    var S = {
                                        direct_trip: bz || g,
                                        legs: [{
                                            start_stop: f,
                                            start_time: c * bB,
                                            trip_date: bE,
                                            finish_stop: H,
                                            finish_time: c * (R - s),
                                            route: Y,
                                            trip_num: bA % bG,
                                            start_pos: c >= 0 ? ba : bM,
                                            finish_pos: c >= 0 ? bM : ba
                                        }]
                                    };
                                    W.push(S),
                                    bM = bK;
                                    if (bz && R >= H.time)
                                        break
                                } else {
                                    if (g || bz || n)
                                        continue;
                                    if (R >= (bN = H.time)) {
                                        if (bN < k)
                                            break;
                                        continue
                                    }
                                    if (Y.available === 2) {
                                        H.time = R,
                                        H.changes = -1,
                                        H.trip_date = bE;
                                        continue
                                    }
                                    if (h < r)
                                        H.route = Y,
                                        H.prev_stop = f,
                                        H.prev_stop_start_time = bB,
                                        H.trip_num = bA % bG,
                                        H.start_pos = c >= 0 ? ba : bM,
                                        H.finish_pos = c >= 0 ? bM : ba;
                                    else
                                        continue
                                }
                                H.time = R,
                                H.trip_date = bE,
                                H.changes = h + 1,
                                j && (H.rideStart = h > 0 ? f.rideStart : bB,
                                H.rideEnd = R - s);
                                var T = X[R];
                                T ? T[T.length] = H : X[R] = [H]
                            }
                        }
                    } while (g || bz);bn = null
                }
            }
        }
        if (!i) {
            W.sort(function(a, b) {
                if (a.route.sortKey < b.route.sortKey)
                    return -1;
                if (a.route.sortKey > b.route.sortKey)
                    return 1;
                if (a.start_time < b.start_time)
                    return -1;
                if (a.start_time > b.start_time)
                    return 1;
                return 0
            });
            return W
        }
        var bP = {}
          , bQ = Number.POSITIVE_INFINITY;
        for (var G = W.length; --G >= 0; ) {
            var S = W[G]
              , bR = S.legs[0].route ? ";" + S.legs[0].route.id : ""
              , bS = S.legs[S.legs.length - 1];
            S.finish_time = bS.finish_time,
            S.walk_time = bS.route ? 0 : Math.abs(bS.finish_time - bS.start_time),
            R = S.departure_time;
            for (var bT = S.legs[0].start_stop; bT; bT = bT.prev_stop) {
                if (!bT.prev_stop)
                    break;
                bS = {
                    start_stop: bT.prev_stop,
                    start_time: c * bT.prev_stop_start_time,
                    finish_stop: bT,
                    finish_time: c * (bT.time - s),
                    route: bT.route,
                    trip_num: bT.trip_num,
                    trip_date: bT.trip_date,
                    start_pos: bT.start_pos,
                    finish_pos: bT.finish_pos
                },
                bT.route ? bR = c == 1 ? ";" + bT.route.id + bR : bR + ";" + bT.route.id : (c < 0 && (!bT.prev_stop || !bT.prev_stop.prev_stop) && (bS.finish_time -= s),
                S.walk_time += Math.abs(bS.finish_time - bS.start_time)),
                S.legs.splice(0, 0, bS)
            }
            if (c == -1) {
                var bU = S.legs[0];
                if (!bU.route) {
                    var bV = S.legs[1];
                    bV && bV.route ? (bU.start_time += bV.start_time - bU.finish_time,
                    bU.finish_time = bV.start_time) : (bU.start_time -= s,
                    bU.finish_time -= s)
                }
                S.finish_time = S.legs[0].start_time,
                S.legs = S.legs.reverse();
                for (var bW = -1, bX = S.legs.length; ++bW < bX; ) {
                    bS = S.legs[bW];
                    var R = bS.start_time - bS.finish_time;
                    !bS.route && bW > 0 ? (bS.start_time = S.legs[bW - 1].finish_time,
                    bS.finish_time = bS.start_time + R) : (bS.finish_time = bS.start_time,
                    bS.start_time -= R);
                    var f = bS.finish_stop;
                    bS.finish_stop = bS.start_stop,
                    bS.start_stop = f
                }
            }
            var bU = S.legs[0]
              , bV = S.legs[1];
            if (!bU.route)
                if (bV && bV.route)
                    bU.start_time += bV.start_time - s - bU.finish_time,
                    bU.finish_time = bV.start_time - s;
                else if (a.no_just_walking)
                    continue;
            S.start_time = S.legs[0].start_time,
            S.travel_time = S.finish_time - S.start_time,
            bR == "" ? (bR = "W",
            S.code = bR,
            bQ = S.walk_time) : (bR += ";",
            S.code = bR,
            S.direct_trip && (bR = S.legs[0].start_time + "T" + bR));
            var bY = bP[bR];
            if (!bY || c == 1 && S.finish_time < bY.finish_time || c != 1 && S.start_time > bY.start_time)
                bP[bR] = S
        }
        if (g)
            a.results = W;
        else {
            var bZ = [];
            for (var bR in bP) {
                var S = bP[bR]
                  , b$ = S.code;
                if (S.walk_time >= bQ && bR != "W")
                    continue;
                for (var G = bZ.length; --G >= 0; ) {
                    var b_ = bZ[G];
                    if (b_.code.indexOf(b$) >= 0 || b$.indexOf(b_.code) >= 0)
                        if (c == 1 && b_.finish_time <= S.finish_time || c != 1 && b_.start_time >= S.start_time) {
                            if (b_.walk_time + b_.travel_time <= S.walk_time + S.travel_time && b$.length >= b_.code.length)
                                break
                        } else
                            !b_.direct_trip && b_.walk_time + b_.travel_time >= S.walk_time + S.travel_time && bZ.splice(G, 1)
                }
                (G < 0 || S.direct_trip) && bZ.push(S)
            }
            for (var G = bZ.length; --G >= 0; ) {
                var S = bZ[G];
                a.reverseOriginal == -1 ? S.code = S.code + "T" + S.legs[S.legs.length - 1].finish_time : S.code = S.legs[0].start_time + "T" + S.code
            }
            a.results = bZ,
            typeof window === "object" ? window.setTimeout(function() {
                ti.findTrips(a)
            }, 10) : ti.findTrips(a)
        }
    };
    return bg()
}
ti.filterSearchResults = function(a, b) {
    for (var c = a.length; --c >= 0; ) {
        var d = a[c];
        if (d.remove)
            continue;
        for (j = a.length; --j >= 0; ) {
            if (c === j)
                continue;
            a[j].code.indexOf(d.code) < 0 ? d.direct_trip && !a[j].direct_trip && d.start_time >= a[j].start_time && d.finish_time <= a[j].finish_time && (a[j].remove = !0) : a[j].walk_time < d.walk_time ? d.remove = !0 : a[j].remove = !0
        }
    }
    if (cfg.defaultCity == "intercity") {
        for (var c = a.length; --c >= 0; ) {
            var d = a[c];
            if (d.remove)
                continue;
            for (j = a.length; --j >= 0; ) {
                if (c === j)
                    continue;
                if (a[j].remove || a[j].legs.length <= 1)
                    continue;
                d.legs.length <= a[j].legs.length && d.start_time > a[j].start_time && d.finish_time <= a[j].finish_time && (a[j].remove = !0),
                d.legs.length <= a[j].legs.length && d.start_time >= a[j].start_time && d.finish_time < a[j].finish_time && (a[j].remove = !0)
            }
        }
        for (var c = a.length; --c >= 0; ) {
            var d = a[c];
            d.start_time >= 1440 && (d.remove = !0)
        }
    }
    var e = {};
    for (var c = a.length; --c >= 0; ) {
        var d = a[c];
        if (d.remove)
            continue;
        if (d.start_time >= 1680 || d.finish_time < 0) {
            d.remove = !0;
            continue
        }
        d.penalty_time = d.travel_time + 5 * d.legs.length;
        var f = e[d.code];
        if (!f || f.penalty_time > d.penalty_time)
            e[d.code] = d
    }
    a = [];
    for (var g in e)
        a.push(e[g]);
    a.sort(function(a, b) {
        return a.penalty_time - b.penalty_time
    });
    var h = Number.POSITIVE_INFINITY;
    for (var c = a.length; --c >= 0; )
        a[c].ok = c < 5 ? 1 : 0,
        h > a[c].travel_time && (h = a[c].travel_time);
    a.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    });
    for (var c = a.length; --c >= 0; ) {
        if (a[c].direct_trip) {
            a[c].ok = 1;
            continue
        }
        var i = b == 1 ? a[c].finish_time - a[0].finish_time : a[0].start_time - a[c].start_time;
        i > a[0].travel_time / 2 + 60 ? a[c].ok = 0 : a[c].penalty_time > 2 * h && i > h && c >= 2 ? a[c].ok = 0 : a[c].walk_time > h ? a[c].ok = 0 : c < 3 && (a[c].ok = 1)
    }
    a.sort(function(a, b) {
        return b.ok - a.ok
    });
    for (var c = a.length; --c > 0; ) {
        if (a[c].ok == 1)
            break;
        a.pop()
    }
    a.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }),
    b == -1 && a.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    });
    return a
}
,
ti.finalizeSearchResults = function(a, b) {
    var c = a.results
      , d = Array(c.length);
    for (var e = 0; e < c.length; e++) {
        var f = c[e]
          , g = f.legs
          , h = 0;
        d[e] = {
            start_time: f.start_time - h,
            finish_time: f.finish_time - h,
            travel_time: f.travel_time,
            walk_time: f.walk_time,
            direct_trip: f.direct_trip,
            legs: [],
            code: f.code
        };
        var i = Number.POSITIVE_INFINITY;
        for (var j = 0; j < g.length; j++) {
            var k = g[j]
              , l = k.route ? k.route.times.workdays[k.trip_num] : ""
              , m = k.route ? k.route.times.trip_ids[k.trip_num] : 0
              , n = k.route ? k.route.times.trip_codes[k.trip_num] : 0
              , o = k.route ? k.route.times.trip_operators[k.trip_num] : ""
              , p = k.route ? k.route.times.trip_groups[k.trip_num] : ""
              , q = k.start_stop && ti.fGetStopDetails(k.start_stop.id)
              , r = k.finish_stop && ti.fGetStopDetails(k.finish_stop.id)
              , s = k.route && k.route.platforms && k.route.platforms.split(",") || []
              , t = {
                trip_num: k.trip_num,
                trip_id: m,
                trip_code: n,
                trip_date: k.trip_date,
                trip_operator: o,
                trip_group: p,
                start_pos: k.start_pos,
                finish_pos: k.finish_pos,
                start_time: k.start_time - h,
                start_platform: s[k.start_pos || 0],
                finish_platform: s[k.finish_pos || 0],
                finish_time: k.finish_time - h,
                weekdays: l,
                start_stop: q && {
                    id: q.id,
                    name: q.name,
                    street: q.street,
                    lat: q.lat,
                    lng: q.lng
                },
                finish_stop: r && {
                    id: r.id,
                    name: r.name,
                    street: r.street,
                    lat: r.lat,
                    lng: r.lng
                }
            };
            if (k.route) {
                t.route = ti.fGetRoutes(k.route);
                if (b) {
                    var u = k.start_time - h
                      , v = Number.POSITIVE_INFINITY;
                    n = t.route.num + String("0000" + n).slice(-4);
                    for (var w = 0; w < b.length; ++w) {
                        var f = b[w];
                        if (f.code == n && f.fromStopId == q.info && f.toStopId == r.info) {
                            t.online_data = f;
                            break
                        }
                        if (!1 && f.code && f.code.indexOf(t.route.num) === 0) {
                            var x = Math.abs(u - ti.toMinutes(f.departureAsStr));
                            v > x && x <= 5 && (v = x,
                            t.online_data = f)
                        }
                    }
                }
            }
            if (ti.taxi)
                if (k.route && k.start_time - i > 30 && (j == g.length - 1 || j == g.length - 2 && !g[g.length - 1].route) || !k.route && k.finish_time - k.start_time >= 15 || j == 0 && k.start_time - a.start_time > 120) {
                    for (var w = 0; w < ti.taxi.length; ++w) {
                        var y = ti.taxi[w]
                          , z = (q.lng - y.lng) * 58.1
                          , A = (q.lat - y.lat) * 111.2
                          , B = z * z + A * A
                          , z = (r.lng - y.lng) * 58.1
                          , A = (r.lat - y.lat) * 111.2
                          , C = z * z + A * A;
                        B <= y.radius && C <= y.radius && (t.taxi || (t.taxi = []),
                        t.taxi.push({
                            name: y.name,
                            phone: y.phone,
                            km: Math.round(Math.sqrt(B))
                        }))
                    }
                    if (t.taxi) {
                        t.taxi.sort(function(a, b) {
                            return a.km - b.km
                        });
                        var D = t.taxi[0].km;
                        for (var w = 1; w < t.taxi.length; ++w)
                            if (t.taxi[w].km > D) {
                                t.taxi.length = w;
                                break
                            }
                    }
                }
            d[e].legs.push(t),
            k.route && (i = k.finish_time)
        }
    }
    typeof cfg === "object" && cfg.defaultCity === "intercity" ? (d.sort(function(a, b) {
        return a.start_time - b.start_time
    }),
    a.reverse == -1 && d.sort(function(a, b) {
        return -(a.finish_time - b.finish_time)
    })) : (d.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }),
    a.reverse == -1 && d.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    }));
    return d
}
,
pg.inputSuggestedStops_Focus = function(a) {
    pg.inputActive !== a && (pg.inputActive = a,
    pg.stopsSuggestedForText = pg[pg.inputActive.id] ? pg.inputActive.value : null),
    pg.inputActive.className === "empty" && (pg.inputActive.className = "",
    pg.inputActive.value = "");
    pg.timerSuggestedStopsShow === !1 ? pg.timerSuggestedStopsShow = 0 : (pg.fSuggestedStopsShow(!0),
    pg.inputActive.select(),
    pg.timerSuggestedStopsShow === 0 && (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200)))
}
,
pg.inputSuggestedStops_Blur = function(a) {
    if (!document.activeElement || document.activeElement.id != "divSuggestedStops")
        pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow),
        pg.timerSuggestedStopsShow = 0,
        a && !a.value && (a.value = a.id == "inputFinish" ? i18n.finishStop : i18n.startStop,
        a.className = "empty"),
        pg.timerSuggestedStopsHide || (pg.timerSuggestedStopsHide = setTimeout(function() {
            pg.timerSuggestedStopsHide = 0,
            a && a.id == "inputStop" && a.value != pg.inputStopText && pg.fSuggestedStopsSelectFirst(a),
            pg.timerSuggestedStopsShow || pg.fSuggestedStopsHide()
        }, 200))
}
,
pg.divSuggestedStops_Blur = function() {
    (!document.activeElement || !pg.inputActive || document.activeElement.id !== pg.inputActive.id) && pg.inputSuggestedStops_Blur(pg.inputActive)
}
,
pg.fSuggestedStopsShow = function(a) {
    if (pg.inputActive) {
        var b = pg.inputActive.value
          , c = $("divSuggestedStops");
        if (a !== !0 && pg.stopsSuggestedForText === b && c.style.display === "block")
            return;
        if (a !== !0 && pg.stopLastTyped !== b) {
            pg.stopLastTyped = b;
            return
        }
        pg.stopsSuggestedForText != b && pg.inputStopText != pg.stopSuggestedForMap && (pg[pg.inputActive.id] = ""),
        pg.stopLastTyped = b,
        typeof ti.stops === "object" && (pg.stopsSuggestedForText = b);
        var d = [];
        if (b.length < 2 || typeof ti.stops != "object")
            d.push("<a id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + (typeof ti.stops != "object" ? i18n.receivingData : i18n.typeSomeChars) + "</a>");
        else {
            var e = ti.fGetStopsByName(pg.stopSuggestedForMap || b);
            if (e.length == 0)
                d.push("<a id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + i18n.noStopsFound + "</a>");
            else {
                var f = "," + pg[pg.inputActive.id] + ",";
                for (var g = 0; g < e.length; g++) {
                    var h = e[g]
                      , i = [];
                    h.city && !cfg.cities[pg.city].skipStopCity && i.push(h.city),
                    h.area && !cfg.cities[pg.city].skipStopArea && i.push(h.area),
                    h.streets && i.push(h.streets),
                    i = i.length > 0 ? "<span class=\"details\"> (" + i.join(", ") + ")</span>" : "",
                    i = "<a id=\"" + h.id + "\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></span>" + (f.indexOf("," + h.id + ",") >= 0 ? "<strong>" + h.name + "</strong>" : h.name) + i + "</a>",
                    !1 && f.indexOf("," + h.id + ",") >= 0 ? d.splice(0, 0, i) : d.push(i)
                }
            }
        }
        d.push("<a id=\"aSuggestShowMap\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_stops\"></span>" + i18n.selectFromMap + "</a>"),
        c.innerHTML = d.join("");
        if (pg.inputActive.offsetHeight) {
            var j = pg.getAbsoluteOffset(pg.inputActive);
            c.style.top = j.top + pg.inputActive.offsetHeight + 1 + "px",
            c.style.left = j.left + "px"
        }
        pg.inputActive.offsetWidth > 2 && (c.style.minWidth = pg.inputActive.offsetWidth - 2 + "px"),
        c.scrollTop = 0,
        c.style.overflowX = "hidden",
        c.style.overflowY = d.length > 6 ? "scroll" : "hidden",
        c.style.height = d.length > 6 ? "156px" : "auto",
        c.style.display = "block";
        var k = $("frameHideSelects");
        k && (k.style.left = c.style.left,
        k.style.width = c.offsetWidth + "px",
        k.style.top = c.style.top,
        k.style.height = c.offsetHeight + "px",
        k.style.display = "block")
    }
}
,
pg.getAbsoluteOffset = function(a) {
    var b = 0
      , c = 0;
    while (a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop))
        b += a.offsetLeft - a.scrollLeft,
        c += a.offsetTop - a.scrollTop,
        a = a.offsetParent;
    return {
        top: c,
        left: b
    }
}
,
pg.fSuggestedStopsHide = function() {
    pg.stopSuggestedForMap = "",
    $("divSuggestedStops").style.display != "none" && ($("divSuggestedStops").style.display = ($("frameHideSelects") || {
        style: {}
    }).style.display = "none")
}
,
pg.divSuggestedStops_MouseDown = function(a) {
    var b = a && (a.target || a.srcElement);
    return !b || b.id !== "divSuggestedStops"
}
,
pg.eSuggestedStops_Click = function(a) {
    pg.timerSuggestedStopsHide && (clearTimeout(pg.timerSuggestedStopsHide),
    pg.timerSuggestedStopsHide = 0);
    var b = a && (a.target || a.srcElement)
      , c = b && (b.className || "").toLowerCase();
    b && !b.id && (b = b.parentNode);
    if (!b)
        return pg.cancelEvent(a);
    if (c && c.indexOf("map") >= 0) {
        pg.inputStopText = pg.stopSuggestedForMap = pg.stopSuggestedForMap || pg.stopsSuggestedForText;
        if (pg.transport == "plan") {
            var d;
            pg.inputActive.id === "inputStart" ? (pg.loadedPlannerParams = "clear start",
            d = "plan/" + b.id + "/" + (pg.inputFinish || "")) : (pg.loadedPlannerParams = "clear finish",
            d = "plan/" + (pg.inputStart || "") + "/" + b.id),
            Hash.go(d + "/map")
        } else
            Hash.go("stop/" + b.id + "/map");
        setTimeout(function() {
            try {
                pg.inputActive.focus()
            } catch (a) {}
        }, 100)
    }
    if (b.id && b.id.indexOf("ShowMap") >= 0) {
        pg.fSuggestedStopsHide(),
        pg.fUrlSetMap({});
        return pg.cancelEvent(a)
    }
    if (b.id && b.id.indexOf("MoreChars") < 0) {
        var e = ti.fGetAnyStopDetails(b.id);
        pg.inputActive.value = e.name,
        pg.inputActive.className = "",
        pg.stopsSuggestedForText = e.name,
        pg[pg.inputActive.id] = b.id,
        pg.fSuggestedStopsHide(),
        pg.timerSuggestedStopsShow = !1,
        pg.inputSuggestedStops_KeyDown(null, -13)
    } else {
        try {
            pg.inputActive.focus()
        } catch (f) {}
        pg[pg.inputActive.id] = ""
    }
    return pg.cancelEvent(a)
}
,
pg.inputSuggestedStops_KeyDown = function(a, b) {
    pg.stopSuggestedForMap = "",
    b || (b = window.event ? window.event.keyCode : a.keyCode);
    b == 27 ? (pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow),
    pg.timerSuggestedStopsShow = 0,
    pg.fSuggestedStopsHide()) : b == 13 || b == -13 ? (pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow),
    pg.timerSuggestedStopsShow = 0,
    b == 13 && pg.fSuggestedStopsSelectFirst(),
    pg[pg.inputActive.id] && pg.fSuggestedStopsHide(),
    pg.inputActive.id === "inputStop" ? pg.inputStop && pg.fTabStop_Click(pg.inputStop) : (pg.loadedPlannerParams != pg.inputStart + "/" + pg.inputFinish && (pg.loadedPlannerParams = "clear results"),
    pg.fTabPlanner_Click(pg.inputStart, pg.inputFinish),
    pg.inputActive.id === "inputStart" && pg.inputStart && !pg.inputFinish ? setTimeout(function() {
        try {
            $("inputFinish").focus()
        } catch (a) {}
    }, 100) : pg.inputActive.id === "inputFinish" && pg.inputFinish && !pg.inputStart ? setTimeout(function() {
        try {
            $("inputStart").focus()
        } catch (a) {}
    }, 100) : pg.inputStart && pg.inputFinish && setTimeout(function() {
        try {
            $("buttonSearch").focus()
        } catch (a) {}
    }, 100))) : b != 9 && (pg.inputActive.className == "empty" && (pg.inputActive.value = "",
    pg.inputActive.className = ""),
    pg.fSuggestedStopsShow(),
    pg.timerSuggestedStopsShow || (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200)))
}
,
pg.fSuggestedStopsSelectFirst = function(a) {
    a = a || pg.inputActive;
    if (a) {
        pg[a.id] = "";
        if (a.value && a.value.length >= 2) {
            var b = ti.fGetStopsByName(a.value);
            b.length > 0 && (a.value != b[0].name && (a.value = b[0].name),
            pg.stopsSuggestedForText = b[0].name,
            pg[a.id] = b[0].id,
            a.id === "inputStop" && pg.fLoadDepartingRoutes())
        }
    }
}
,
pg.fTabStop_Click = function(a) {
    a && pg.fUrlSet({
        transport: "stop",
        inputStop: a || pg.inputStop
    });
    return !1
}
,
pg.fTabPlanner_Click = function(a, b) {
    pg.fUrlSet({
        transport: "plan",
        inputStart: a || pg.inputStart || pg.inputStop,
        inputFinish: b || pg.inputFinish
    });
    return !1
}
,
pg.fTabActivate = function() {
    var a = pg.city + "_" + pg.transport;
    pg.transport || (a = "city",
    cfg.cities[pg.city] && pg.city !== pg.fGetCity(pg.city) && (a = "region"));
    var b = $("divNav").getElementsByTagName("a");
    for (var c = b.length; --c >= 0; )
        b[c].id === a ? b[c].className = "active" : b[c].className.indexOf("active") >= 0 && (b[c].className = "");
    if (pg.transport === "stop")
        $("inputRoutes").value = pg.routesFilter = "",
        pg.inputRoutes_Blur(),
        setTimeout(pg.fLoadDepartingRoutes, 10);
    else if (pg.transport === "plan") {
        $("plan").className = "active",
        pg.loadedPlannerParams !== pg.inputStart + "/" + pg.inputFinish && setTimeout(pg.fLoadPlannerTab, 10);
        var d = "" + $("inputTime").value;
        d.trim() === "" && (d = ti.dateToMinutes(new Date) % 1440,
        $("inputTime").value = ti.printTime(d))
    } else if (!pg.loadedRoutesHash || pg.loadedRoutesHash.indexOf(pg.city + "/" + pg.transport + "/") != 0)
        $("inputRoutes").value = pg.routesFilter = "",
        pg.inputRoutes_Blur(),
        pg.fLoadRoutesList();
    $("divContentRoutes").style.display = pg.transport === "stop" || pg.transport === "plan" ? "none" : "block",
    $("divContentDepartingRoutes").style.display = pg.transport === "stop" ? "block" : "none",
    $("divContentPlanner").style.display = pg.transport === "plan" ? "block" : "none"
}
,
pg.fLoadRoutesList = function() {
    var a = $("divContentRoutesResults");
    if (typeof ti.routes !== "object")
        pg.loadedRoutesHash = "",
        a.innerHTML = "<br/>" + i18n.receivingData,
        setTimeout(pg.fLoadRoutesList, 200);
    else {
        if (pg.transport == "xferry") {
            a.innerHTML = "<br/><a href=\"http://www.veeteed.com/index.php?moodul=100&idc=101106510001000&l=6&al=7&periood=356\">Tallinn - Aegna (www.veeteed.com)</a>";
            return
        }
        var b = $("inputRoutes").className == "empty" ? "" : ti.toAscii($("inputRoutes").value, 2);
        if (b && pg.routesFilter != b) {
            pg.routesFilter = b,
            setTimeout(pg.fLoadRoutesList, 200);
            return
        }
        pg.routesFilter = b;
        if (pg.loadedRoutesHash == pg.city + "/" + pg.transport + "/" + b)
            return;
        pg.loadedRoutesHash = pg.city + "/" + pg.transport + "/" + b;
        var c = ti.fGetRoutes(pg.city, pg.transport, null, null, null, b);
        if (!c || !c.length) {
            pg.transport == "tram" ? a.innerHTML = "<br/>&nbsp;" + (cfg.city.msgNoTransport[pg.language] || cfg.city.msgNoTransport.en) : a.innerHTML = "<br/>&nbsp;" + i18n.noRoutesFound;
            return
        }
        var d = function() {
            var a = [];
            a.push("<table id=\"tblRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            for (var b = 0; b < c.length; b++)
                a.push(pg.fMakeRouteRowHTML(c[b], "tblRoutes", b));
            a.push("</tbody></table><br/>");
            var d = cfg.cities[pg.city].footer;
            d = d && (d[pg.language] || d.en),
            d && a.push(d);
            if (!cfg.isMobilePage) {
                cfg.programmedBy && a.push("<p id=\"programmedBy\" class=\"smalltext graytext\">" + (cfg.programmedBy[pg.language] || cfg.programmedBy.en || "") + "</p>");
                var e = cfg.cities[cfg.defaultCity].webcounter;
                e && (a.push("<a id=\"webcounter\" href=\"http://whos.amung.us/stats/" + e + "\" target=\"_blank\" style=\"float:right; position:relative; bottom:20px; padding:10px;\">"),
                a.push("<img width=\"80\" height=\"15\" border=\"0\" title=\"web tracker\" alt=\"web tracker\" src=\"http://whos.amung.us/swidget/" + e + ".gif\"></a>"))
            }
            pg.replaceHtml($("divContentRoutesResults"), a.join(""))
        };
        if (pg.browserVersion <= 8 && c.length > 25 && !b) {
            a.innerHTML = "<br/>" + i18n.loading,
            setTimeout(d, 100);
            return
        }
        d()
    }
}
,
pg.fLoadDepartingRoutes = function() {
    pg.loadedDepartingRoutes = null;
    var a = $("divContentDepartingRoutesResults")
      , b = ti.fGetAnyStopDetails(pg.inputStop);
    if (b.id) {
        $("inputStop").value = pg.inputStopText = b.name || "",
        $("inputStop").className = "",
        pg.startStop || (pg.startStop = pg.inputStop);
        var c = $("inputRoutes").className == "empty" ? "" : ti.toAscii($("inputRoutes").value, 2);
        if (c && pg.routesFilter != c) {
            pg.routesFilter = c,
            setTimeout(pg.fLoadDepartingRoutes, 200);
            return
        }
        pg.routesFilter = c
    } else if (!pg.inputStop && typeof ti.stops == "object") {
        var d = pg.fUrlSet({
            hashForMap: "map"
        }, !0);
        $("divContentDepartingRoutesHeader").style.display = "none",
        a.innerHTML = ("<p class=\"help\">" + i18n.searchDeparturesHelp + "<p/><p class=\"help\">" + i18n.tripPlannerHelpMap).replace(/<a>/g, "<a class=\"underlined map\" href=\"#" + d + "\">"),
        document.activeElement && document.activeElement.id !== "inputStop" && ($("inputStop").value = i18n.startStop,
        $("inputStop").className = "empty",
        setTimeout(function() {
            try {
                $("inputStop").focus()
            } catch (a) {}
        }, 100));
        return
    }
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object")
        a.innerHTML = "<br/>" + i18n.receivingData,
        setTimeout(pg.fLoadDepartingRoutes, 200);
    else {
        pg.loadedDepartingRoutes = pg.inputStop,
        pg.stopsSuggestedForText = b.name;
        var e = (b.street ? ", " + b.street : "") + (b.area && !cfg.cities[pg.city].skipStopArea ? ", " + b.area : "") + (b.city && !cfg.cities[pg.city].skipStopCity ? ", " + b.city : "");
        b[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (e += ", " + i18n.fareZone + " " + b[cfg.cities[pg.city].stopFareZone]),
        e = e.length > 0 ? "<span class=\"details\"> (" + e.substring(2) + ")</span>" : "";
        var f = []
          , d = pg.fUrlSet({
            hashForMap: "map"
        }, !0)
          , g = pg.transfers = ti.fGetRoutesAtStop(pg.inputStop, !1)
          , h = {}
          , i = null
          , f = [];
        for (var j = 0; j < g.length; j++) {
            var k = g[j]
              , l = ti.toAscii([k.city, k.transport, k.num].join(","), !0);
            if (h[l])
                continue;
            var m = {
                city: k.city,
                transport: k.transport,
                num: ti.toAscii(k.num, !0),
                dirType: k.dirType,
                stopId: k.stopId
            };
            h[l] = m;
            var n = pg.fUrlSet({
                schedule: m
            }, !0);
            i !== k.transport && (i = k.transport,
            f.push(" <span class=\"icon icon_narrow icon_" + k.transport + "\" data-transport=\"" + k.transport + "\"></span>&nbsp;"));
            var o = "<a class=\"hover transfer" + i + "\" href=\"#" + n + "\" title=\"" + (k.name || "").replace(/"/g, "") + "\">" + g[j].num.replace(/\s/g, "&nbsp;") + "</a> ";
            f.push(o)
        }
        f.push("<span style=\"display:inline-block; width:2px;\"></span>"),
        $("spanContentDepartingRoutesStop").innerHTML = "<a href=\"#" + d + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></a>" + i18n.stop + " <strong>" + b.name + "</strong>" + e + f.join("") + "<br />",
        f = [];
        var p = new Date
          , q = +$("inputDepartureDate").value;
        if (cfg.city.urlVehicleDepartures && q < 0) {
            $("divContentDepartingRoutesHeader").style.display = "",
            a.innerHTML = "<br/>" + i18n.loading,
            pg.fProcessVehicleDepartures();
            return
        }
        q < 0 ? (q = p,
        startTime = ti.dateToMinutes(p) % 1440) : (q = new Date(p.getFullYear(),p.getMonth(),p.getDate() + q),
        startTime = -1);
        var r = q.getDay() || 7;
        +q == +(new Date(2012,7,15)) && (r = 7);
        var s = {
            start_stops: pg.inputStop,
            finish_stops: "",
            date: q,
            weekdaydirect: r,
            transport: {}
        }
          , t = dijkstra(s, 0 * startTime, 0);
        if (!t || !t.length) {
            a.innerHTML = "<br/>" + i18n.noDepartingRoutes;
            return
        }
        f.push("<table id=\"tblDepartingRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
        for (var u = 0, v = 0, w = ""; u < t.length; u++) {
            var k = t[u].route
              , x = ti.toAscii(k.city + ";" + k.transport + ";" + k.num + ";" + k.name, !0);
            w != x ? (w = x,
            v = u,
            t[v].route.departures = [t[u].start_time],
            t[v].route.tripNums = [t[u].tripNum]) : (t[v].route.departures.push(t[u].start_time),
            t[v].route.tripNums.push(t[u].tripNum))
        }
        if (pg.routesFilter) {
            var y = [];
            for (var u = 0; u < t.length; u++) {
                if (t[u].route.num.toLowerCase().indexOf(pg.routesFilter.toLowerCase()) == -1 && t[u].route.name.toLowerCase().indexOf(pg.routesFilter.toLowerCase()) == -1)
                    continue;
                y.push(t[u])
            }
            t = y
        }
        for (var u = 0, v = 0; u < t.length; u++)
            t[u].route.departures && (t[u].route.departures[0] < 0 && t[u].route.num.indexOf("(") >= 0 ? u = u : (f.push(pg.fMakeRouteRowHTML(t[u].route, "tblDepartingRoutes", v, startTime)),
            ++v));
        a.innerHTML = f.join("") + "</tbody></table>",
        $("divContentDepartingRoutesHeader").style.display = ""
    }
}
,
pg.fLoadPlannerTab = function(a) {
    a === !0 && (pg.optimalResults = null,
    pg.loadedPlannerParams = null,
    pg.hashForMap = "");
    var b = "" + $("inputTime").value;
    b === "" ? (b = ti.dateToMinutes(new Date) % 1440,
    $("inputTime").value = ti.printTime(b)) : b = ti.toMinutes(b);
    var c = ti.fGetAnyStopDetails(pg.inputStart)
      , d = ti.fGetAnyStopDetails(pg.inputFinish);
    d.id ? ($("inputFinish").value = d.name || "",
    $("inputFinish").className = "") : !pg.inputFinish && typeof ti.stops == "object" && ($("divContentPlannerResults").innerHTML = i18n.typeFinishStop,
    document.activeElement && document.activeElement.id !== "inputFinish" && ($("inputFinish").value = i18n.finishStop,
    $("inputFinish").className = "empty"));
    if (c.id)
        $("inputStart").value = c.name || "",
        $("inputStart").className = "";
    else if (!pg.inputStart || typeof ti.stops == "object")
        $("divContentPlannerResults").innerHTML = i18n.typeStartStop,
        document.activeElement && document.activeElement.id !== "inputStart" && ($("inputStart").value = i18n.startStop,
        $("inputStart").className = "empty");
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object")
        $("divContentPlannerResults").innerHTML = "<br/>" + i18n.receivingData,
        setTimeout(pg.fLoadPlannerTab, 200);
    else {
        if (!pg.inputStart && !pg.inputFinish || (pg.loadedPlannerParams || "").indexOf("clear") >= 0) {
            pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish,
            pg.optimalResults = null,
            pg.hashForMap && pg.hashForMap != "map" && (pg.map = {},
            pg.hashForMap = "map",
            pg.fMapShow());
            var e = pg.fUrlSet({
                hashForMap: "map"
            }, !0);
            $("divContentPlannerResults").innerHTML = "<p class=\"help\">" + i18n.tripPlannerHelp + "</p><p class=\"help\">" + i18n.tripPlannerHelpMap.replace(/<a>/g, "<a class=\"underlined map\" href=\"#" + e + "\">") + "</p>";
            return
        }
        pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish;
        if (!c.id || !d.id)
            return;
        var f = new Date
          , g = new Date(f.getFullYear(),f.getMonth(),f.getDate() + +$("inputDate").value)
          , h = {
            start_stops: pg.inputStart,
            finish_stops: pg.inputFinish,
            reverse: parseInt($("inputReverse").value, 10),
            date: g,
            start_time: b,
            lowFloor: $("checkHandicapped").checked,
            transport: {},
            route_nums: ("" || $("inputRoutesFilter").value).trim(),
            walk_speed_kmh: parseInt($("inputWalkSpeed").value || 4, 10),
            walk_max: $("inputWalkMax").value,
            change_time: parseInt($("inputChangeTime").value || 3, 10),
            callback1: pg.fPrintOptimalTrips,
            callback: pg.fPrintOptimalTrips
        }
          , i = pg.fGetCity(pg.city);
        for (var j = 1; j <= 2; j++) {
            for (var k = 0, l = cfg.cities[i].transport; k < l.length; k++)
                h.transport[l[k]] = ($("checkbox" + l[k]) || {
                    checked: !0
                }).checked;
            i = cfg.cities[i].region;
            if (!i || !cfg.cities[i])
                break
        }
        $("divContentPlannerResults").innerHTML = "<br/>" + i18n.calculating,
        setTimeout(function() {
            ti.findTrips(h)
        }, 100)
    }
}
,
pg.fPrintOptimalTrips = function(a, b, c) {
    var d = pg.optimalResults = a.results;
    pg.map = {};
    var e = [];
    for (var f = 0; f < d.length; f++) {
        var g = d[f]
          , h = d[f].legs
          , i = []
          , j = [];
        for (var k = 0; k < h.length; k++) {
            var l = h[k]
              , m = l.route
              , n = (h[k + 1] || {
                route: null
            }).route;
            if (m && m.transport) {
                n && m.city === n.city && m.transport === n.transport && m.num === n.num && (l.finish_stop.name = h[k + 1].finish_stop.name,
                l.finish_time = h[k + 1].finish_time,
                ++k),
                j.push("<span class=\"icon icon_narrow icon_" + m.transport + "\" title=\"" + i18n.transport1[m.transport] + " " + m.num + " " + i18n.towards + " " + m.name + "\"></span>"),
                g.direct_trip && m.num.length <= 8 && (j.push("<span class=\"num num" + Math.min(l.route.num.length, 4) + " " + l.route.transport + "\">" + l.route.numHTML + "</span>"),
                l.online_data && j.push(" " + l.online_data.code + " " + l.online_data.departureAsStr + " &rarr; " + l.online_data.arrivalAsStr)),
                m.stopId = l.start_stop.id,
                m.tripNum = (l.trip_num || -1) + 1;
                var o = pg.fUrlSet({
                    schedule: m,
                    mapHash: ""
                }, !0)
                  , p = l.finish_time - l.start_time;
                p = p >= 60 ? ti.printTime(p) : p + "&nbsp;" + i18n.minutesShort,
                i.push("<p class=\"results\"><span class=\"icon icon_" + l.route.transport + "\"></span><span class=\"num num" + Math.min(l.route.num.length, 4) + " " + l.route.transport + "\">" + l.route.numHTML + "</span>" + (cfg.searchOnly ? "" : "<a class=\"hover\" href=\"#" + o + "\" title=\"" + i18n.showSchedule + "\">") + i18n.transport1[l.route.transport] + " " + i18n.towards + "&nbsp;" + l.route.name + (cfg.searchOnly ? "" : "</a>") + " <br/><strong>" + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.start_time)) + (l.online_data ? "(" + l.online_data.departureAsStr + ")" : "") + " " + l.start_stop.name + (l.start_platform && "(" + l.start_platform + ")" || "") + "</strong> &rarr; " + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.finish_time)) + (l.online_data ? "(" + l.online_data.arrivalAsStr + ")" : "") + " " + l.finish_stop.name + (l.finish_platform && "(" + l.finish_platform + ")" || "") + (cfg.defaultCity == "xxxvilnius2" ? "" : "<span class=\"graytext\"> (" + i18n.ride + " " + p + (cfg.city.has_trips_ids ? " trip ID=" + l.trip_id + ", trip num=" + l.trip_code + (l.online_data ? ", bezrindas trip ID=" + l.online_data.code : "") : "") + (cfg.city.has_trips_ids === 2 ? ", trip operator=" + l.trip_operator + ", trip group=" + l.trip_group : "") + ")</span>") + "</p>")
            } else {
                if (l.start_time == l.finish_time && parseInt(l.start_stop.id, 10) == parseInt(l.finish_stop.id, 10))
                    continue;
                j.push("<span class=\"icon icon_narrow icon_walk\" title=\"" + i18n.walk + " " + (l.finish_time - l.start_time) + "&nbsp;" + i18n.minutesShort + "\"></span>"),
                i.push("<p class=\"results\"><span class=\"icon icon_walk\"></span><strong>" + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.start_time)) + " " + l.start_stop.name + "</strong> &rarr; " + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.finish_time)) + " " + l.finish_stop.name + "<span class=\"graytext\"> (" + i18n.walk + " " + (l.finish_time - l.start_time) + "&nbsp;" + i18n.minutesShort + ")</span></p></a>")
            }
            if (l.taxi)
                for (var q = 0; q < l.taxi.length; ++q) {
                    var r = l.taxi[q];
                    i.push((q ? "<br />" : "") + "km: " + r.km + ", " + r.name + ", phone: " + r.phone)
                }
        }
        e.push("<div" + (f % 2 ? "" : " class=\"grey\"") + " style=\"border-bottom: solid 1px gray; padding:5px 0 5px 5px;\"><table><tbody><tr><td><a href=\"\" onclick=\"return false;\" title=\"" + (f ? i18n.showDetails : i18n.hideDetails) + "\" class=\"" + (f ? "expand" : "collapse") + "\"><span class=\"icon\"></span><strong class=\"hover\">" + i18n.option + "&nbsp;" + (f + 1) + ".</strong></a> <a href=\"#" + pg.city + "/" + pg.transport + "/map,,," + (f + 1) + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></a> " + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(g.start_time, null, "&#x2007;") + " &mdash; " + ti.printTime(g.finish_time, null, "&#x2007;")) + ",</td><td style=\"white-space:pre-wrap;\">" + (cfg.defaultCity == "xxxvilnius2" ? "" : i18n.travelDuration + "&nbsp;<strong>" + ti.printTime(g.travel_time)) + "</strong>  <span style=\"white-space:nowrap;\">" + j.join("") + "</span></td></tr></tbody></table><div class=\"RouteDetails\" style=\"" + (f ? "display:none;" : "") + "\">"),
        e.push(i.join("") + "</a></div></div>")
    }
    if (d.length > 0) {
        pg.fTogglePlannerOptions(!1),
        b && document.body.className.indexOf("Map") >= 0 && (pg.mapShowAllStops = !1,
        pg.fUrlSetMap({
            optimalRoute: 1
        }));
        if (cfg.defaultCity === "latvia") {
            ti.TimeZoneOffset = 2;
            var s = "http://routelatvia.azurewebsites.net/?";
            s += "origin=" + a.start_stops,
            s += "&destination=" + a.finish_stops,
            s += "&departure_time=" + ti.toUnixTime(a.date, a.start_time),
            e.push("<br/><a target=\"_blank\" href=\"" + s + "\">" + s + "</a>"),
            e.push("<div id=\"online_results\">"),
            a.online_query_url ? e.push("<a target=\"_blank\" href=\"" + a.online_query_url + "\">" + a.online_query_url + "</a>") : b || e.push("<br/>Calculating alternative routes...");
            if (a.online_results_JSON) {
                var d = JSON.parse(a.online_results_JSON);
                e.push("<div style=\"white-space:pre;\">", JSON.stringify(d, null, 4), "</div>")
            }
            e.push("</div>")
        }
    } else
        e.push("<br/>" + i18n.noOptimalRoutes);
    var t = $("divContentPlannerResults");
    (t || {}).innerHTML = e.join("")
}
,
pg.fMakeRouteRowHTML = function(a, b, c, d) {
    var e, f = "map," + a.city + "," + a.transport + "," + a.num;
    f = ti.toAscii(f, !0),
    b == "tblRoutes" ? (e = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType
        },
        hashForMap: ""
    }, !0),
    pg.routesFilter && (f += "," + a.dirType),
    f = pg.fUrlSet({
        hashForMap: f
    }, !0)) : (e = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType,
            stopId: a.stopId
        },
        hashForMap: ""
    }, !0),
    f = pg.fUrlSet({
        hashForMap: f + "," + a.dirType + "," + a.stopId
    }, !0));
    var g = "<a style=\"display:inline-block\" href=\"#" + e + "\" title=\"" + i18n.showSchedule + "\">"
      , h = "";
    for (var i = 1; i <= 7; i++)
        if ((a.weekdays || "").indexOf(i) < 0)
            h += "<span class=\"blankday\" title=\"" + i18n["weekdays" + i] + ": " + i18n.routeNotOperate + "\">" + i18n.weekdaysShort[i] + "</span>";
        else {
            var j = a.validityPeriods[i - 1];
            j = j ? ": " + i18n.validFrom + " " + pg.formatDate(j) : "",
            h += "<span" + (i >= 6 ? "" : " class=\"weekend\"") + " title=\"" + i18n["weekdays" + i] + j + "\">" + i18n.weekdaysShort[i] + "</span>"
        }
    cfg.city.planHandicappedOption !== !1 && (a.weekdays && a.weekdays.indexOf("z") >= 0 && (h += "<img src=\"" + pg.imagesFolder + "handicapped.png\" alt=\"low floor\" title=\"" + i18n.lowFloorVehicles + "\" />")),
    a.weekdays && a.weekdays.indexOf("b") >= 0 && (h += "<img src=\"" + pg.imagesFolder + "bicycle16.png\" alt=\"transfer bicycle\" title=\"" + i18n.transferBicycles + "\" />");
    var k = g + (!0 || b == "tblDepartingRoutes" ? "" : "<span class=\"icon icon_expand\" title=\"" + i18n.showDetails + "\"></span>") + "<span class=\"icon icon_" + a.transport + "\"></span>";
    a.transport == "train" || a.transport == "metro" ? k += "<span style=\"display:none;\">" + a.num + "</span>" : k += "<span class=\"num num" + Math.min(a.num.length, 4) + " " + a.transport + "\">" + a.num + "</span>";
    var l = "<span class=\"hover\">" + a.name + ((a.commercial || "").indexOf("E") >= 0 ? " (" + i18n.express + ")" : "") + "</span>";
    l = "<tr" + (b != "tblDepartingRoutes" && c % 2 != 0 ? " class=\"white\"" : "") + "><td class=\"routeName\"><a class=\"icon icon_map\" title=\"" + i18n.showInMap + "\" href=\"#" + f + "\"></a>" + k + l + "</a>",
    l += "</td><td class=\"weekdays\"><a href=\"#" + e + "\">" + h + "</a></td><td class=\"lastcol\"></td></tr>";
    if (b === "tblDepartingRoutes") {
        if (cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[a.transport] && a.departures.length && a.departures[0] >= 0)
            if (("," + pg.inputStop + ",").indexOf("," + a.stops[0] + ",") < 0) {
                l += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\">",
                l += "</td></tr>";
                return l
            }
        l += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\"><span><span class=\"icon icon_collapse\"></span><span class=\"icon";
        var m = Infinity
          , n = Infinity
          , o = 0
          , p = 18;
        for (var q = a.departures.length; --q >= 0; ) {
            var r = a.departures[q];
            if (r < 0)
                continue;
            if (r < d)
                break;
            ++o;
            var s = ~~(r / 60);
            if (m != s) {
                if (++o > p && r < d)
                    break;
                m = s
            }
            n = r
        }
        q < 0 && o < p ? l += "\">" : l += " icon_expand\" title=\"" + i18n.stopShowAllDepartures + "\">";
        var t = -1;
        o = 0;
        for (q = 0; q < a.departures.length; ++q) {
            var r = a.departures[q];
            if (r < 0)
                continue;
            var s = ~~(r / 60);
            r >= n && ++o,
            t != s && (t = s,
            r >= n && ++o,
            l += "</span></span><span style=\"display:inline-block;\"><span class=\"DeparturesHour" + (s < m || o > p ? " collapse\"" : "") + "\">&nbsp;" + s % 24 + "</span><span style=\"vertical-align:top\"" + (r < n || o > p ? " class=\"collapse\"" : "") + ">&#x200A;"),
            r == n && (l += "</span><span style=\"vertical-align:top\">"),
            o == p + 1 && (l += "</span><span style=\"vertical-align:top\" class=\"collapse\">"),
            r = r % 60,
            l += (r < 10 ? "0" : "") + r + " "
        }
        t === -1 ? l += "</span><span>" + i18n.routeNotOperate : o ? o > p && (l += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">...") : l += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">" + i18n.stopLatestDeparture + "&nbsp;" + ti.printTime(a.departures[a.departures.length - 1]),
        l += "</span></span></td></tr>",
        (t === -1 || !o) && a.dirType.indexOf("d") >= 0 && (l = "")
    }
    return l
}
,
pg.fContent_Click = function(a) {
    pg.stopSuggestedForMap && (pg.stopSuggestedForMap = "",
    pg.fSuggestedStopsHide());
    var b = a && (a.target || a.srcElement);
    if (!b)
        return !0;
    var c, d, e;
    for (var f = b; f; f = f.parentNode) {
        if ((f.tagName || "").toLowerCase() === "tr")
            break;
        if ((f.href || "").indexOf("www.peatus.ee") >= 0)
            break;
        d || (c = f && (f.className || "").toLowerCase(),
        c.indexOf("expand") < 0 ? c.indexOf("collapse") < 0 ? (f.href || "").indexOf("#") >= 0 && (e = pg.fUrlParse(f.href),
        f.className.indexOf("map") < 0 ? e.schedule ? d = pg.fUrlSet({
            schedule: e.schedule
        }, !0) : (d = "hash",
        e.hashForMap = e.hashForMap || pg.hashForMap,
        e.language = pg.language) : d = pg.fUrlSet({
            hashForMap: e.hashForMap
        }, !0)) : (d = "collapse",
        b = f) : (d = "expand",
        b = f));
        if ((f.tagName || "").toLowerCase() === "a")
            break;
        if ((f.className || "").toLowerCase() === "departuresrow" && d === "expand") {
            d = "",
            f.className = "DeparturesRowFull";
            break
        }
        if ((f.className || "").toLowerCase() === "departuresrowfull" && d === "collapse") {
            d = "",
            f.className = "DeparturesRow";
            break
        }
    }
    var g = [];
    while (f) {
        f = f.parentNode,
        g = f && f.getElementsByTagName("div") || [];
        if (g.length)
            break
    }
    d == "expand" ? (b.className = b.className.replace("expand", "collapse"),
    b.title = i18n.hideDetails,
    (g[0] || {
        style: {}
    }).style.display = "",
    pg.schedule && (pg.scheduleDetailsExpanded = !0),
    d = "") : d == "collapse" ? (b.className = b.className.replace("collapse", "expand"),
    b.title = i18n.showDetails,
    (g[0] || {
        style: {}
    }).style.display = "none",
    pg.schedule && (pg.scheduleDetailsExpanded = !1),
    d = "") : d == "hash" && (pg.fUrlSet(e),
    d = "");
    if (d || d === "") {
        d && Hash.go(d);
        return pg.cancelEvent(a)
    }
    return !0
}
,
pg.inputRoutes_KeyDown = function(a, b) {
    var c = $("inputRoutes");
    b || (b = window.event ? window.event.keyCode : a.keyCode),
    pg.transport == "stop" ? b == 27 ? (c.value = "",
    setTimeout(pg.fLoadDepartingRoutes, 200)) : b != 9 && (c.className == "empty" && (c.value = "",
    c.className = ""),
    pg.routesFilter = "",
    setTimeout(pg.fLoadDepartingRoutes, 200)) : b == 27 ? (c.value = "",
    setTimeout(pg.fLoadRoutesList, 200)) : b != 9 && (c.className == "empty" && (c.value = "",
    c.className = ""),
    pg.routesFilter = "",
    setTimeout(pg.fLoadRoutesList, 200))
}
,
pg.inputRoutes_Focus = function() {
    $e = $("inputRoutes"),
    $e.className === "empty" && ($e.className = "",
    $e.value = "")
}
,
pg.inputRoutes_Blur = function() {
    $e = $("inputRoutes"),
    $e && !$e.value && ($e.value = i18n.typeRouteNameOrNumber,
    $e.className = "empty")
}
