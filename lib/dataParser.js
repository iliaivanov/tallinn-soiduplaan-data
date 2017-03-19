const fs = require('fs');

const config = require('./../config/config');

var globalCachedData = [],
    stops = [],
    routs = [],
    gps = [];

// TODO: accept file name(s).
var readFilesData = () => {
    return new Promise((resolve, reject) => {
        var data = [];

        for (var i = 0; i < config.files.length; i++) {
            var fileName = config.files[i],
                filePath = `cache/${fileName}.txt`;

            if (fs.existsSync(filePath)) {
                data[fileName] = fs.readFileSync(filePath, {encoding: 'utf8'});
            } else {
                reject(`No route specified for ${fileName}`);
            }
        }

        resolve(data);
    });
};

// COPYPASTED CODE HERE

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
    }
};

ti.toAscii = function(a, b) {
    var c = a.toLowerCase(), d = c.split(""), e, f = ti.accent_map;
    for (var g = d.length; --g >= 0; )
        (e = f[d[g]]) ? (d[g] = e === !0 ? "" : e,
        c = !1) : b === !0 && d[g] === " " && (d[g] = "",
        c = !1);
    b === 2 && (c = d.join("").trim().replace(/\s+-/g, "-").replace(/-\s+/g, "-"));
    return c || d.join("")
}

var loadStops = function(a) {
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
};

loadRoutes = function(a) {
    if (typeof ti.stops !== "object") {
        ti.routes = a;
    } else {
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

        return b;
    }
};

// COPYPASTED CODE HERE

var parseGps = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading gps data...');
        // TODO: globalCachedData.gps
    });
};

var parseRoutes = () => {
    return new Promise((resolve, reject) => {
        parseStops().then((data) => {
            loadRoutes(globalCachedData.routes);
            resolve(ti.routes);
        }, (error) => {
            reject(error);
        });
    });
};

var parseStops = () => {
    return new Promise((resolve, reject) => {
        console.log('Loading stops...');
        loadStops(globalCachedData.stops);
        resolve(ti.stops);
    });
};

var getCachedData = (dataSet = undefined) => {
    return new Promise((resolve, reject) => {
        readFilesData().then((cachedData) => {
            globalCachedData = cachedData;

            // TODO: should be some better way...
            switch(dataSet) {
                case 'stops':
                    parseStops().then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                    break;

                case 'routes':
                    parseRoutes().then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                    break;

                case 'gps':
                    parseGps().then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                    break;

                default:
                    var agregatedData = [];

                    for (var i = 0; i < config.files.length; i++) {
                        var fileName = config.files[i];

                        parseStops(cachedData.stops).then((data) => {
                            agregatedData.push(data);

                            return parseRoutes(cachedData.routes);
                        }).then((data) => {
                            agregatedData.push(data);

                            return parseGps(cachedData.gps);
                        }).then((data) => {
                            agregatedData.push(data);

                            resolve(agregatedData);
                        }).catch((error) => {
                            reject(error);
                        });
                    }
                    break;
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = {
    getCachedData
};
