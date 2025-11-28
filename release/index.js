var jt = Object.defineProperty;
var zt = (U, h, F) => h in U ? jt(U, h, { enumerable: !0, configurable: !0, writable: !0, value: F }) : U[h] = F;
var te = (U, h, F) => (zt(U, typeof h != "symbol" ? h + "" : h, F), F);
(function() {
  var U, h, F, V, fe, he, me, ve, ne, re, ie, q = {}, ye = [], it = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, j = Array.isArray;
  function L(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function ae(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  function oe(t, e, n) {
    var r, i, a, l = {};
    for (a in e)
      a == "key" ? r = e[a] : a == "ref" ? i = e[a] : l[a] = e[a];
    if (arguments.length > 2 && (l.children = arguments.length > 3 ? U.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
      for (a in t.defaultProps)
        l[a] === void 0 && (l[a] = t.defaultProps[a]);
    return I(t, l, r, i, null);
  }
  function I(t, e, n, r, i) {
    var a = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++F, __i: -1, __u: 0 };
    return i == null && h.vnode != null && h.vnode(a), a;
  }
  function E(t) {
    return t.children;
  }
  function M(t, e) {
    this.props = t, this.context = e;
  }
  function H(t, e) {
    if (e == null)
      return t.__ ? H(t.__, t.__i + 1) : null;
    for (var n; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null)
        return n.__e;
    return typeof t.type == "function" ? H(t) : null;
  }
  function be(t) {
    var e, n;
    if ((t = t.__) != null && t.__c != null) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if ((n = t.__k[e]) != null && n.__e != null) {
          t.__e = t.__c.base = n.__e;
          break;
        }
      return be(t);
    }
  }
  function xe(t) {
    (!t.__d && (t.__d = !0) && V.push(t) && !J.__r++ || fe !== h.debounceRendering) && ((fe = h.debounceRendering) || he)(J);
  }
  function J() {
    for (var t, e, n, r, i, a, l, c = 1; V.length; )
      V.length > c && V.sort(me), t = V.shift(), c = V.length, t.__d && (n = void 0, i = (r = (e = t).__v).__e, a = [], l = [], e.__P && ((n = L({}, r)).__v = r.__v + 1, h.vnode && h.vnode(n), se(e.__P, n, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [i] : null, a, i ?? H(r), !!(32 & r.__u), l), n.__v = r.__v, n.__.__k[n.__i] = n, Se(a, n, l), n.__e != i && be(n)));
    J.__r = 0;
  }
  function we(t, e, n, r, i, a, l, c, d, u, _) {
    var s, p, g, f, y, v, m = r && r.__k || ye, b = e.length;
    for (d = at(n, e, m, d, b), s = 0; s < b; s++)
      (g = n.__k[s]) != null && (p = g.__i === -1 ? q : m[g.__i] || q, g.__i = s, v = se(t, g, p, i, a, l, c, d, u, _), f = g.__e, g.ref && p.ref != g.ref && (p.ref && le(p.ref, null, g), _.push(g.ref, g.__c || f, g)), y == null && f != null && (y = f), 4 & g.__u || p.__k === g.__k ? d = ke(g, d, t) : typeof g.type == "function" && v !== void 0 ? d = v : f && (d = f.nextSibling), g.__u &= -7);
    return n.__e = y, d;
  }
  function at(t, e, n, r, i) {
    var a, l, c, d, u, _ = n.length, s = _, p = 0;
    for (t.__k = new Array(i), a = 0; a < i; a++)
      (l = e[a]) != null && typeof l != "boolean" && typeof l != "function" ? (d = a + p, (l = t.__k[a] = typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? I(null, l, null, null, null) : j(l) ? I(E, { children: l }, null, null, null) : l.constructor === void 0 && l.__b > 0 ? I(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : l).__ = t, l.__b = t.__b + 1, c = null, (u = l.__i = ot(l, n, d, s)) !== -1 && (s--, (c = n[u]) && (c.__u |= 2)), c == null || c.__v === null ? (u == -1 && (i > _ ? p-- : i < _ && p++), typeof l.type != "function" && (l.__u |= 4)) : u != d && (u == d - 1 ? p-- : u == d + 1 ? p++ : (u > d ? p-- : p++, l.__u |= 4))) : t.__k[a] = null;
    if (s)
      for (a = 0; a < _; a++)
        (c = n[a]) != null && !(2 & c.__u) && (c.__e == r && (r = H(c)), Te(c, c));
    return r;
  }
  function ke(t, e, n) {
    var r, i;
    if (typeof t.type == "function") {
      for (r = t.__k, i = 0; r && i < r.length; i++)
        r[i] && (r[i].__ = t, e = ke(r[i], e, n));
      return e;
    }
    t.__e != e && (e && t.type && !n.contains(e) && (e = H(t)), n.insertBefore(t.__e, e || null), e = t.__e);
    do
      e = e && e.nextSibling;
    while (e != null && e.nodeType == 8);
    return e;
  }
  function Q(t, e) {
    return e = e || [], t == null || typeof t == "boolean" || (j(t) ? t.some(function(n) {
      Q(n, e);
    }) : e.push(t)), e;
  }
  function ot(t, e, n, r) {
    var i, a, l = t.key, c = t.type, d = e[n];
    if (d === null && t.key == null || d && l == d.key && c === d.type && !(2 & d.__u))
      return n;
    if (r > (d != null && !(2 & d.__u) ? 1 : 0))
      for (i = n - 1, a = n + 1; i >= 0 || a < e.length; ) {
        if (i >= 0) {
          if ((d = e[i]) && !(2 & d.__u) && l == d.key && c === d.type)
            return i;
          i--;
        }
        if (a < e.length) {
          if ((d = e[a]) && !(2 & d.__u) && l == d.key && c === d.type)
            return a;
          a++;
        }
      }
    return -1;
  }
  function Ne(t, e, n) {
    e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || it.test(e) ? n : n + "px";
  }
  function G(t, e, n, r, i) {
    var a;
    e:
      if (e == "style")
        if (typeof n == "string")
          t.style.cssText = n;
        else {
          if (typeof r == "string" && (t.style.cssText = r = ""), r)
            for (e in r)
              n && e in n || Ne(t.style, e, "");
          if (n)
            for (e in n)
              r && n[e] === r[e] || Ne(t.style, e, n[e]);
        }
      else if (e[0] == "o" && e[1] == "n")
        a = e != (e = e.replace(ve, "$1")), e = e.toLowerCase() in t || e == "onFocusOut" || e == "onFocusIn" ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + a] = n, n ? r ? n.t = r.t : (n.t = ne, t.addEventListener(e, a ? ie : re, a)) : t.removeEventListener(e, a ? ie : re, a);
      else {
        if (i == "http://www.w3.org/2000/svg")
          e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t)
          try {
            t[e] = n ?? "";
            break e;
          } catch {
          }
        typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
      }
  }
  function Ce(t) {
    return function(e) {
      if (this.l) {
        var n = this.l[e.type + t];
        if (e.u == null)
          e.u = ne++;
        else if (e.u < n.t)
          return;
        return n(h.event ? h.event(e) : e);
      }
    };
  }
  function se(t, e, n, r, i, a, l, c, d, u) {
    var _, s, p, g, f, y, v, m, b, w, N, $, C, D, x, k, A, P = e.type;
    if (e.constructor !== void 0)
      return null;
    128 & n.__u && (d = !!(32 & n.__u), a = [c = e.__e = n.__e]), (_ = h.__b) && _(e);
    e:
      if (typeof P == "function")
        try {
          if (m = e.props, b = "prototype" in P && P.prototype.render, w = (_ = P.contextType) && r[_.__c], N = _ ? w ? w.props.value : _.__ : r, n.__c ? v = (s = e.__c = n.__c).__ = s.__E : (b ? e.__c = s = new P(m, N) : (e.__c = s = new M(m, N), s.constructor = P, s.render = lt), w && w.sub(s), s.props = m, s.state || (s.state = {}), s.context = N, s.__n = r, p = s.__d = !0, s.__h = [], s._sb = []), b && s.__s == null && (s.__s = s.state), b && P.getDerivedStateFromProps != null && (s.__s == s.state && (s.__s = L({}, s.__s)), L(s.__s, P.getDerivedStateFromProps(m, s.__s))), g = s.props, f = s.state, s.__v = e, p)
            b && P.getDerivedStateFromProps == null && s.componentWillMount != null && s.componentWillMount(), b && s.componentDidMount != null && s.__h.push(s.componentDidMount);
          else {
            if (b && P.getDerivedStateFromProps == null && m !== g && s.componentWillReceiveProps != null && s.componentWillReceiveProps(m, N), !s.__e && (s.shouldComponentUpdate != null && s.shouldComponentUpdate(m, s.__s, N) === !1 || e.__v == n.__v)) {
              for (e.__v != n.__v && (s.props = m, s.state = s.__s, s.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(B) {
                B && (B.__ = e);
              }), $ = 0; $ < s._sb.length; $++)
                s.__h.push(s._sb[$]);
              s._sb = [], s.__h.length && l.push(s);
              break e;
            }
            s.componentWillUpdate != null && s.componentWillUpdate(m, s.__s, N), b && s.componentDidUpdate != null && s.__h.push(function() {
              s.componentDidUpdate(g, f, y);
            });
          }
          if (s.context = N, s.props = m, s.__P = t, s.__e = !1, C = h.__r, D = 0, b) {
            for (s.state = s.__s, s.__d = !1, C && C(e), _ = s.render(s.props, s.state, s.context), x = 0; x < s._sb.length; x++)
              s.__h.push(s._sb[x]);
            s._sb = [];
          } else
            do
              s.__d = !1, C && C(e), _ = s.render(s.props, s.state, s.context), s.state = s.__s;
            while (s.__d && ++D < 25);
          s.state = s.__s, s.getChildContext != null && (r = L(L({}, r), s.getChildContext())), b && !p && s.getSnapshotBeforeUpdate != null && (y = s.getSnapshotBeforeUpdate(g, f)), k = _, _ != null && _.type === E && _.key == null && (k = Re(_.props.children)), c = we(t, j(k) ? k : [k], e, n, r, i, a, l, c, d, u), s.base = e.__e, e.__u &= -161, s.__h.length && l.push(s), v && (s.__E = s.__ = null);
        } catch (B) {
          if (e.__v = null, d || a != null)
            if (B.then) {
              for (e.__u |= d ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; )
                c = c.nextSibling;
              a[a.indexOf(c)] = null, e.__e = c;
            } else
              for (A = a.length; A--; )
                ae(a[A]);
          else
            e.__e = n.__e, e.__k = n.__k;
          h.__e(B, e, n);
        }
      else
        a == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : c = e.__e = st(n.__e, e, n, r, i, a, l, d, u);
    return (_ = h.diffed) && _(e), 128 & e.__u ? void 0 : c;
  }
  function Se(t, e, n) {
    for (var r = 0; r < n.length; r++)
      le(n[r], n[++r], n[++r]);
    h.__c && h.__c(e, t), t.some(function(i) {
      try {
        t = i.__h, i.__h = [], t.some(function(a) {
          a.call(i);
        });
      } catch (a) {
        h.__e(a, i.__v);
      }
    });
  }
  function Re(t) {
    return typeof t != "object" || t == null ? t : j(t) ? t.map(Re) : L({}, t);
  }
  function st(t, e, n, r, i, a, l, c, d) {
    var u, _, s, p, g, f, y, v = n.props, m = e.props, b = e.type;
    if (b == "svg" ? i = "http://www.w3.org/2000/svg" : b == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), a != null) {
      for (u = 0; u < a.length; u++)
        if ((g = a[u]) && "setAttribute" in g == !!b && (b ? g.localName == b : g.nodeType == 3)) {
          t = g, a[u] = null;
          break;
        }
    }
    if (t == null) {
      if (b == null)
        return document.createTextNode(m);
      t = document.createElementNS(i, b, m.is && m), c && (h.__m && h.__m(e, a), c = !1), a = null;
    }
    if (b === null)
      v === m || c && t.data === m || (t.data = m);
    else {
      if (a = a && U.call(t.childNodes), v = n.props || q, !c && a != null)
        for (v = {}, u = 0; u < t.attributes.length; u++)
          v[(g = t.attributes[u]).name] = g.value;
      for (u in v)
        if (g = v[u], u != "children") {
          if (u == "dangerouslySetInnerHTML")
            s = g;
          else if (!(u in m)) {
            if (u == "value" && "defaultValue" in m || u == "checked" && "defaultChecked" in m)
              continue;
            G(t, u, null, g, i);
          }
        }
      for (u in m)
        g = m[u], u == "children" ? p = g : u == "dangerouslySetInnerHTML" ? _ = g : u == "value" ? f = g : u == "checked" ? y = g : c && typeof g != "function" || v[u] === g || G(t, u, g, v[u], i);
      if (_)
        c || s && (_.__html === s.__html || _.__html === t.innerHTML) || (t.innerHTML = _.__html), e.__k = [];
      else if (s && (t.innerHTML = ""), we(e.type === "template" ? t.content : t, j(p) ? p : [p], e, n, r, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, l, a ? a[0] : n.__k && H(n, 0), c, d), a != null)
        for (u = a.length; u--; )
          ae(a[u]);
      c || (u = "value", b == "progress" && f == null ? t.removeAttribute("value") : f !== void 0 && (f !== t[u] || b == "progress" && !f || b == "option" && f !== v[u]) && G(t, u, f, v[u], i), u = "checked", y !== void 0 && y !== t[u] && G(t, u, y, v[u], i));
    }
    return t;
  }
  function le(t, e, n) {
    try {
      if (typeof t == "function") {
        var r = typeof t.__u == "function";
        r && t.__u(), r && e == null || (t.__u = t(e));
      } else
        t.current = e;
    } catch (i) {
      h.__e(i, n);
    }
  }
  function Te(t, e, n) {
    var r, i;
    if (h.unmount && h.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || le(r, null, e)), (r = t.__c) != null) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (a) {
          h.__e(a, e);
        }
      r.base = r.__P = null;
    }
    if (r = t.__k)
      for (i = 0; i < r.length; i++)
        r[i] && Te(r[i], e, n || typeof t.type != "function");
    n || ae(t.__e), t.__c = t.__ = t.__e = void 0;
  }
  function lt(t, e, n) {
    return this.constructor(t, n);
  }
  function ct(t, e, n) {
    var r, i, a, l;
    e == document && (e = document.documentElement), h.__ && h.__(t, e), i = (r = typeof n == "function") ? null : n && n.__k || e.__k, a = [], l = [], se(e, t = (!r && n || e).__k = oe(E, null, [t]), i || q, q, e.namespaceURI, !r && n ? [n] : i ? null : e.firstChild ? U.call(e.childNodes) : null, a, !r && n ? n : i ? i.__e : e.firstChild, r, l), Se(a, t, l);
  }
  U = ye.slice, h = { __e: function(t, e, n, r) {
    for (var i, a, l; e = e.__; )
      if ((i = e.__c) && !i.__)
        try {
          if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(t)), l = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), l = i.__d), l)
            return i.__E = i;
        } catch (c) {
          t = c;
        }
    throw t;
  } }, F = 0, M.prototype.setState = function(t, e) {
    var n;
    n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = L({}, this.state), typeof t == "function" && (t = t(L({}, n), this.props)), t && L(n, t), t != null && this.__v && (e && this._sb.push(e), xe(this));
  }, M.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), xe(this));
  }, M.prototype.render = E, V = [], he = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, me = function(t, e) {
    return t.__v.__b - e.__v.__b;
  }, J.__r = 0, ve = /(PointerCapture)$|Capture$/i, ne = 0, re = Ce(!1), ie = Ce(!0);
  var dt = 0;
  function o(t, e, n, r, i, a) {
    e || (e = {});
    var l, c, d = e;
    if ("ref" in d)
      for (c in d = {}, e)
        c == "ref" ? l = e[c] : d[c] = e[c];
    var u = { type: t, props: d, key: n, ref: l, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --dt, __i: -1, __u: 0, __source: i, __self: a };
    if (typeof t == "function" && (l = t.defaultProps))
      for (c in l)
        d[c] === void 0 && (d[c] = l[c]);
    return h.vnode && h.vnode(u), u;
  }
  var z, S, ce, $e, Y = 0, Ae = [], R = h, Pe = R.__b, Be = R.__r, Ue = R.diffed, Ee = R.__c, Le = R.unmount, Me = R.__;
  function de(t, e) {
    R.__h && R.__h(S, t, Y || e), Y = 0;
    var n = S.__H || (S.__H = { __: [], __h: [] });
    return t >= n.__.length && n.__.push({}), n.__[t];
  }
  function T(t) {
    return Y = 1, ut(Oe, t);
  }
  function ut(t, e, n) {
    var r = de(z++, 2);
    if (r.t = t, !r.__c && (r.__ = [n ? n(e) : Oe(void 0, e), function(c) {
      var d = r.__N ? r.__N[0] : r.__[0], u = r.t(d, c);
      d !== u && (r.__N = [u, r.__[1]], r.__c.setState({}));
    }], r.__c = S, !S.__f)) {
      var i = function(c, d, u) {
        if (!r.__c.__H)
          return !0;
        var _ = r.__c.__H.__.filter(function(p) {
          return !!p.__c;
        });
        if (_.every(function(p) {
          return !p.__N;
        }))
          return !a || a.call(this, c, d, u);
        var s = r.__c.props !== c;
        return _.forEach(function(p) {
          if (p.__N) {
            var g = p.__[0];
            p.__ = p.__N, p.__N = void 0, g !== p.__[0] && (s = !0);
          }
        }), a && a.call(this, c, d, u) || s;
      };
      S.__f = !0;
      var a = S.shouldComponentUpdate, l = S.componentWillUpdate;
      S.componentWillUpdate = function(c, d, u) {
        if (this.__e) {
          var _ = a;
          a = void 0, i(c, d, u), a = _;
        }
        l && l.call(this, c, d, u);
      }, S.shouldComponentUpdate = i;
    }
    return r.__N || r.__;
  }
  function Fe(t, e) {
    var n = de(z++, 3);
    !R.__s && He(n.__H, e) && (n.__ = t, n.u = e, S.__H.__h.push(n));
  }
  function Z(t, e) {
    var n = de(z++, 7);
    return He(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__;
  }
  function Ve(t, e) {
    return Y = 8, Z(function() {
      return t;
    }, e);
  }
  function _t() {
    for (var t; t = Ae.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(K), t.__H.__h.forEach(ue), t.__H.__h = [];
        } catch (e) {
          t.__H.__h = [], R.__e(e, t.__v);
        }
  }
  R.__b = function(t) {
    S = null, Pe && Pe(t);
  }, R.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Me && Me(t, e);
  }, R.__r = function(t) {
    Be && Be(t), z = 0;
    var e = (S = t.__c).__H;
    e && (ce === S ? (e.__h = [], S.__h = [], e.__.forEach(function(n) {
      n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
    })) : (e.__h.forEach(K), e.__h.forEach(ue), e.__h = [], z = 0)), ce = S;
  }, R.diffed = function(t) {
    Ue && Ue(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (Ae.push(e) !== 1 && $e === R.requestAnimationFrame || (($e = R.requestAnimationFrame) || gt)(_t)), e.__H.__.forEach(function(n) {
      n.u && (n.__H = n.u), n.u = void 0;
    })), ce = S = null;
  }, R.__c = function(t, e) {
    e.some(function(n) {
      try {
        n.__h.forEach(K), n.__h = n.__h.filter(function(r) {
          return !r.__ || ue(r);
        });
      } catch (r) {
        e.some(function(i) {
          i.__h && (i.__h = []);
        }), e = [], R.__e(r, n.__v);
      }
    }), Ee && Ee(t, e);
  }, R.unmount = function(t) {
    Le && Le(t);
    var e, n = t.__c;
    n && n.__H && (n.__H.__.forEach(function(r) {
      try {
        K(r);
      } catch (i) {
        e = i;
      }
    }), n.__H = void 0, e && R.__e(e, n.__v));
  };
  var De = typeof requestAnimationFrame == "function";
  function gt(t) {
    var e, n = function() {
      clearTimeout(r), De && cancelAnimationFrame(e), setTimeout(t);
    }, r = setTimeout(n, 100);
    De && (e = requestAnimationFrame(n));
  }
  function K(t) {
    var e = S, n = t.__c;
    typeof n == "function" && (t.__c = void 0, n()), S = e;
  }
  function ue(t) {
    var e = S;
    t.__c = t.__(), S = e;
  }
  function He(t, e) {
    return !t || t.length !== e.length || e.some(function(n, r) {
      return n !== t[r];
    });
  }
  function Oe(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function pt(t, e) {
    for (var n in e)
      t[n] = e[n];
    return t;
  }
  function qe(t, e) {
    for (var n in t)
      if (n !== "__source" && !(n in e))
        return !0;
    for (var r in e)
      if (r !== "__source" && t[r] !== e[r])
        return !0;
    return !1;
  }
  function je(t, e) {
    this.props = t, this.context = e;
  }
  (je.prototype = new M()).isPureReactComponent = !0, je.prototype.shouldComponentUpdate = function(t, e) {
    return qe(this.props, t) || qe(this.state, e);
  };
  var ze = h.__b;
  h.__b = function(t) {
    t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), ze && ze(t);
  };
  var ft = h.__e;
  h.__e = function(t, e, n, r) {
    if (t.then) {
      for (var i, a = e; a = a.__; )
        if ((i = a.__c) && i.__c)
          return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
    }
    ft(t, e, n, r);
  };
  var We = h.unmount;
  function Ie(t, e, n) {
    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
      typeof r.__c == "function" && r.__c();
    }), t.__c.__H = null), (t = pt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
      return Ie(r, e, n);
    })), t;
  }
  function Je(t, e, n) {
    return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
      return Je(r, e, n);
    }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
  }
  function _e() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function Qe(t) {
    var e = t.__.__c;
    return e && e.__a && e.__a(t);
  }
  function X() {
    this.i = null, this.l = null;
  }
  h.unmount = function(t) {
    var e = t.__c;
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), We && We(t);
  }, (_e.prototype = new M()).__c = function(t, e) {
    var n = e.__c, r = this;
    r.o == null && (r.o = []), r.o.push(n);
    var i = Qe(r.__v), a = !1, l = function() {
      a || (a = !0, n.__R = null, i ? i(c) : c());
    };
    n.__R = l;
    var c = function() {
      if (!--r.__u) {
        if (r.state.__a) {
          var d = r.state.__a;
          r.__v.__k[0] = Je(d, d.__c.__P, d.__c.__O);
        }
        var u;
        for (r.setState({ __a: r.__b = null }); u = r.o.pop(); )
          u.forceUpdate();
      }
    };
    r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(l, l);
  }, _e.prototype.componentWillUnmount = function() {
    this.o = [];
  }, _e.prototype.render = function(t, e) {
    if (this.__b) {
      if (this.__v.__k) {
        var n = document.createElement("div"), r = this.__v.__k[0].__c;
        this.__v.__k[0] = Ie(this.__b, n, r.__O = r.__P);
      }
      this.__b = null;
    }
    var i = e.__a && oe(E, null, t.fallback);
    return i && (i.__u &= -33), [oe(E, null, e.__a ? null : t.children), i];
  };
  var Ge = function(t, e, n) {
    if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size))
      for (n = t.i; n; ) {
        for (; n.length > 3; )
          n.pop()();
        if (n[1] < n[0])
          break;
        t.i = n = n[2];
      }
  };
  (X.prototype = new M()).__a = function(t) {
    var e = this, n = Qe(e.__v), r = e.l.get(t);
    return r[0]++, function(i) {
      var a = function() {
        e.props.revealOrder ? (r.push(i), Ge(e, t, r)) : i();
      };
      n ? n(a) : a();
    };
  }, X.prototype.render = function(t) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var e = Q(t.children);
    t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
    for (var n = e.length; n--; )
      this.l.set(e[n], this.i = [1, 0, this.i]);
    return t.children;
  }, X.prototype.componentDidUpdate = X.prototype.componentDidMount = function() {
    var t = this;
    this.l.forEach(function(e, n) {
      Ge(t, n, e);
    });
  };
  var ht = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, mt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, vt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, yt = /[A-Z0-9]/g, bt = typeof document < "u", xt = function(t) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
  };
  function Ye(t, e, n) {
    return e.__k == null && (e.textContent = ""), ct(t, e), typeof n == "function" && n(), t ? t.__c : null;
  }
  M.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty(M.prototype, t, { configurable: !0, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(e) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
    } });
  });
  var Ze = h.event;
  function wt() {
  }
  function kt() {
    return this.cancelBubble;
  }
  function Nt() {
    return this.defaultPrevented;
  }
  h.event = function(t) {
    return Ze && (t = Ze(t)), t.persist = wt, t.isPropagationStopped = kt, t.isDefaultPrevented = Nt, t.nativeEvent = t;
  };
  var Ct = { enumerable: !1, configurable: !0, get: function() {
    return this.class;
  } }, Ke = h.vnode;
  h.vnode = function(t) {
    typeof t.type == "string" && function(e) {
      var n = e.props, r = e.type, i = {}, a = r.indexOf("-") === -1;
      for (var l in n) {
        var c = n[l];
        if (!(l === "value" && "defaultValue" in n && c == null || bt && l === "children" && r === "noscript" || l === "class" || l === "className")) {
          var d = l.toLowerCase();
          l === "defaultValue" && "value" in n && n.value == null ? l = "value" : l === "download" && c === !0 ? c = "" : d === "translate" && c === "no" ? c = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? l = "ondblclick" : d !== "onchange" || r !== "input" && r !== "textarea" || xt(n.type) ? d === "onfocus" ? l = "onfocusin" : d === "onblur" ? l = "onfocusout" : vt.test(l) && (l = d) : d = l = "oninput" : a && mt.test(l) ? l = l.replace(yt, "-$&").toLowerCase() : c === null && (c = void 0), d === "oninput" && i[l = d] && (l = "oninputCapture"), i[l] = c;
        }
      }
      r == "select" && i.multiple && Array.isArray(i.value) && (i.value = Q(n.children).forEach(function(u) {
        u.props.selected = i.value.indexOf(u.props.value) != -1;
      })), r == "select" && i.defaultValue != null && (i.value = Q(n.children).forEach(function(u) {
        u.props.selected = i.multiple ? i.defaultValue.indexOf(u.props.value) != -1 : i.defaultValue == u.props.value;
      })), n.class && !n.className ? (i.class = n.class, Object.defineProperty(i, "className", Ct)) : (n.className && !n.class || n.class && n.className) && (i.class = i.className = n.className), e.props = i;
    }(t), t.$$typeof = ht, Ke && Ke(t);
  };
  var Xe = h.__r;
  h.__r = function(t) {
    Xe && Xe(t), t.__c;
  };
  var et = h.diffed;
  h.diffed = function(t) {
    et && et(t);
    var e = t.props, n = t.__e;
    n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
  };
  class tt {
    constructor() {
      te(this, "config", {
        ratings: []
      });
    }
    async init() {
      await this.loadConfig(), window.addEventListener("blinko-rating-plugin-update", () => {
        this.loadConfig();
      });
    }
    getUserId() {
      const e = window.Blinko.store.userStore.id;
      return e ? e.toString() : "anonymous";
    }
    async loadConfig() {
      try {
        const e = await window.Blinko.api.config.getPluginConfig.query({
          pluginName: "blinko-rating-plugin"
        });
        if (e != null && e.ratings) {
          const n = JSON.parse(e.ratings);
          this.config = {
            ratings: Array.isArray(n.ratings) ? n.ratings : []
          };
        } else
          this.config = { ratings: [] };
      } catch {
        this.config = { ratings: [] };
      }
    }
    getAllConfigs() {
      var e;
      return ((e = this.config) == null ? void 0 : e.ratings) || [];
    }
    getConfig(e) {
      var n, r;
      return (r = (n = this.config) == null ? void 0 : n.ratings) == null ? void 0 : r.find((i) => i.guid === e);
    }
    addConfig(e) {
      this.config.ratings.push(e);
    }
    updateConfig(e, n) {
      const r = this.config.ratings.findIndex((i) => i.guid === e);
      r !== -1 && (this.config.ratings[r] = {
        ...this.config.ratings[r],
        ...n
      });
    }
    deleteConfig(e) {
      this.config.ratings = this.config.ratings.filter((n) => n.guid !== e);
    }
    async saveConfig() {
      try {
        await window.Blinko.api.config.setPluginConfig.mutate({
          pluginName: "blinko-rating-plugin",
          key: "ratings",
          value: JSON.stringify(this.config)
        }), window.dispatchEvent(new CustomEvent("blinko-rating-plugin-update"));
      } catch (e) {
        throw e;
      }
    }
    generateGuid(e) {
      const n = e.toLowerCase().replace(/[^a-z0-9]+/g, "").substring(0, 20), r = Math.floor(Math.random() * 1e8);
      return `${n}_${r}`;
    }
  }
  function nt(t, e) {
    return e.enabled ? !t.tags || t.tags.length === 0 ? e.mode === "blacklist" || e.tags.length === 0 : e.mode === "whitelist" ? e.tags.length === 0 ? !0 : t.tags.some((n) => e.tags.includes(n.tag.name)) : e.tags.length === 0 ? !0 : !t.tags.some((n) => e.tags.includes(n.tag.name)) : !1;
  }
  async function St(t) {
    var a, l;
    const e = ((a = window.Blinko.store.userStore.id) == null ? void 0 : a.toString()) || "anonymous", n = await window.Blinko.api.notes.list.mutate({
      searchText: "",
      isArchived: !1
    }), r = new Map(t.map((c) => [c.guid, c])), i = Array.isArray(n) ? n : (n == null ? void 0 : n.list) || [];
    for (const c of i) {
      const d = ((l = c.metadata) == null ? void 0 : l.ratingConfigs) || {}, u = {};
      for (const s in d) {
        const p = d[s], g = p.createdBy;
        if (g && g !== e) {
          u[s] = p;
          continue;
        }
        const f = r.get(s);
        f && nt(c, f) && (u[s] = {
          enabled: f.enabled,
          type: f.type,
          label: f.label,
          ratings: p.ratings || {},
          createdBy: e
        });
      }
      for (const s of t)
        !u[s.guid] && nt(c, s) && (u[s.guid] = {
          enabled: s.enabled,
          type: s.type,
          label: s.label,
          ratings: {},
          createdBy: e
        });
      const _ = c.id || c._id;
      _ && await window.Blinko.api.notes.upsert.mutate({
        id: typeof _ == "string" ? parseInt(_, 10) : _,
        metadata: {
          ...c.metadata,
          ratingConfigs: u
        }
      });
    }
  }
  function Rt({ mode: t, onModeChange: e }) {
    const n = window.Blinko.i18n;
    return /* @__PURE__ */ o("div", { className: "mb-4", children: [
      /* @__PURE__ */ o("label", { className: "block text-sm font-medium mb-2", children: n.t("ratings_settings.filterMode") }),
      /* @__PURE__ */ o("div", { className: "flex gap-0 border rounded-md overflow-hidden", children: [
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => e("whitelist"),
            className: `flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${t === "whitelist" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
            children: n.t("ratings_settings.whitelist")
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: () => e("blacklist"),
            className: `flex-1 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${t === "blacklist" ? "bg-red-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
            children: n.t("ratings_settings.blacklist")
          }
        )
      ] }),
      /* @__PURE__ */ o("p", { className: "text-xs text-desc mt-2", children: [
        /* @__PURE__ */ o("strong", { children: t === "whitelist" ? n.t("ratings_settings.whitelistLabel") : n.t("ratings_settings.blacklistLabel") }),
        " ",
        t === "whitelist" ? n.t("ratings_settings.whitelistText") : n.t("ratings_settings.blacklistText")
      ] })
    ] });
  }
  function Tt({
    availableTags: t,
    selectedTags: e,
    tagFilter: n,
    setTagFilter: r,
    mode: i,
    onToggleTag: a,
    onRefreshTags: l,
    isLoadingTags: c
  }) {
    const d = window.Blinko.i18n, u = t.filter(
      (_) => _.toLowerCase().includes(n.toLowerCase())
    );
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ o("label", { className: "block text-sm font-medium", children: i === "whitelist" ? d.t("ratings_settings.allowedTags") : d.t("ratings_settings.excludedTags") }),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: l,
            disabled: c,
            className: "text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:opacity-80",
            children: c ? d.t("ratings_settings.loading") : d.t("ratings_settings.refreshTags")
          }
        )
      ] }),
      t.length > 0 && /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          placeholder: d.t("ratings_settings.filterTagsPlaceholder"),
          value: n,
          onChange: (_) => r(_.target.value),
          className: "w-full px-3 py-2 mb-3 border rounded-md text-sm"
        }
      ),
      t.length > 0 ? /* @__PURE__ */ o(
        "div",
        {
          className: "border rounded-md p-3",
          style: { maxHeight: "200px", overflowY: "auto" },
          children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: u.map((_) => /* @__PURE__ */ o(
            "label",
            {
              className: "flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors",
              children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    type: "checkbox",
                    checked: e.includes(_),
                    onChange: () => a(_),
                    className: "w-4 h-4 cursor-pointer"
                  }
                ),
                /* @__PURE__ */ o("span", { className: "text-sm", children: [
                  "#",
                  _
                ] })
              ]
            },
            _
          )) })
        }
      ) : /* @__PURE__ */ o("div", { className: "text-xs text-desc p-4 border rounded-md text-center", children: d.t("ratings_settings.noTagsFound") }),
      e.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3 p-3 bg-secondary/50 rounded-md", children: [
        /* @__PURE__ */ o("p", { className: "text-xs font-medium mb-2", children: [
          i === "whitelist" ? d.t("ratings_settings.allowed") : d.t("ratings_settings.excluded"),
          " ",
          "(",
          e.length,
          "):"
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map((_) => /* @__PURE__ */ o(
          "span",
          {
            className: `text-xs px-2 py-1 rounded ${i === "whitelist" ? "bg-blue-500/20 text-blue-500" : "bg-red-500/20 text-red-500"}`,
            children: [
              "#",
              _
            ]
          },
          _
        )) })
      ] })
    ] });
  }
  function $t({
    config: t,
    availableTags: e,
    tagFilter: n,
    setTagFilter: r,
    isExpanded: i,
    onToggleExpand: a,
    onUpdate: l,
    onDelete: c,
    onToggleTag: d,
    onRefreshTags: u,
    isLoadingTags: _
  }) {
    const s = window.Blinko.i18n, p = (f) => f === "stars" ? s.t("ratings_settings.typeStars") : s.t("ratings_settings.typeUpvotes");
    return /* @__PURE__ */ o("div", { className: "border rounded-md p-4", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("span", { className: "text-2xl", children: ((f) => f === "stars" ? "⭐" : "👍")(t.type) }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "font-semibold", children: t.name }),
            /* @__PURE__ */ o("div", { className: "text-xs text-desc", children: p(t.type) })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ o("span", { className: "text-sm font-medium", children: t.enabled ? s.t("ratings_settings.enabled") : s.t("ratings_settings.disabled") }),
            /* @__PURE__ */ o(
              "input",
              {
                type: "checkbox",
                checked: t.enabled,
                onChange: (f) => l({
                  enabled: f.target.checked
                }),
                className: "w-4 h-4 cursor-pointer"
              }
            )
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: c,
              className: "ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer",
              children: s.t("ratings_settings.delete")
            }
          )
        ] })
      ] }),
      t.enabled && /* @__PURE__ */ o(E, { children: [
        /* @__PURE__ */ o(
          "button",
          {
            onClick: a,
            className: "text-sm text-blue-500 hover:underline mb-2 cursor-pointer",
            children: i ? s.t("ratings_settings.hideConfig") : s.t("ratings_settings.showConfig")
          }
        ),
        i && /* @__PURE__ */ o("div", { className: "mt-3 p-3 bg-secondary/30 rounded-md", children: [
          /* @__PURE__ */ o("div", { className: "mb-4", children: [
            /* @__PURE__ */ o("label", { className: "block text-sm font-medium mb-2", children: s.t("ratings_settings.ratingLabel") }),
            /* @__PURE__ */ o(
              "input",
              {
                type: "text",
                value: t.label || "",
                onChange: (f) => l({ label: f.target.value || void 0 }),
                placeholder: s.t("ratings_settings.ratingLabelPlaceholder"),
                className: "w-full px-3 py-2 border rounded-md text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ o(
            Rt,
            {
              mode: t.mode,
              onModeChange: (f) => l({ mode: f })
            }
          ),
          /* @__PURE__ */ o(
            Tt,
            {
              availableTags: e,
              selectedTags: t.tags,
              tagFilter: n,
              setTagFilter: r,
              mode: t.mode,
              onToggleTag: d,
              onRefreshTags: u,
              isLoadingTags: _
            }
          )
        ] })
      ] })
    ] }, t.guid);
  }
  function At({ show: t, onAdd: e, onCancel: n }) {
    const [r, i] = T(""), [a, l] = T("stars"), [c, d] = T(""), u = window.Blinko.i18n, _ = () => {
      if (!r.trim()) {
        window.Blinko.toast.error(u.t("ratings_settings.nameRequired"));
        return;
      }
      e(r.trim(), a, c.trim() || void 0), i(""), l("stars"), d("");
    }, s = () => {
      i(""), l("stars"), d(""), n();
    };
    return t ? /* @__PURE__ */ o("div", { className: "border-2 border-blue-500 rounded-md p-4", children: [
      /* @__PURE__ */ o("h3", { className: "font-semibold mb-3", children: u.t("ratings_settings.addNewRating") }),
      /* @__PURE__ */ o("div", { className: "mb-3", children: [
        /* @__PURE__ */ o("label", { className: "block text-sm font-medium mb-1", children: u.t("ratings_settings.ratingName") }),
        /* @__PURE__ */ o(
          "input",
          {
            type: "text",
            value: r,
            onChange: (p) => i(p.target.value),
            placeholder: u.t("ratings_settings.ratingNamePlaceholder"),
            className: "w-full px-3 py-2 border rounded-md text-sm",
            autoFocus: !0
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "mb-3", children: [
        /* @__PURE__ */ o("label", { className: "block text-sm font-medium mb-1", children: u.t("ratings_settings.ratingLabel") }),
        /* @__PURE__ */ o(
          "input",
          {
            type: "text",
            value: c,
            onChange: (p) => d(p.target.value),
            placeholder: u.t("ratings_settings.ratingLabelPlaceholder"),
            className: "w-full px-3 py-2 border rounded-md text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "mb-4", children: [
        /* @__PURE__ */ o("label", { className: "block text-sm font-medium mb-1", children: u.t("ratings_settings.ratingType") }),
        /* @__PURE__ */ o(
          "select",
          {
            value: a,
            onChange: (p) => l(p.target.value),
            className: "w-full px-3 py-2 border rounded-md text-sm cursor-pointer",
            children: [
              /* @__PURE__ */ o("option", { value: "stars", children: [
                "⭐ ",
                u.t("ratings_settings.typeStars")
              ] }),
              /* @__PURE__ */ o("option", { value: "upvotes", children: [
                "👍 ",
                u.t("ratings_settings.typeUpvotes")
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ o(
          "button",
          {
            onClick: _,
            className: "flex-1 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 cursor-pointer",
            children: u.t("ratings_settings.add")
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: s,
            className: "px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-80 cursor-pointer",
            children: u.t("ratings_settings.cancel")
          }
        )
      ] })
    ] }) : /* @__PURE__ */ o(
      "button",
      {
        onClick: () => n(),
        className: "w-full py-3 border-2 border-dashed rounded-md text-sm font-medium text-desc hover:bg-secondary/50 transition-colors cursor-pointer",
        children: [
          "+ ",
          u.t("ratings_settings.addNewRating")
        ]
      }
    );
  }
  function Pt({
    isSyncing: t,
    syncOnSave: e,
    onSave: n,
    onCancel: r,
    onToggleSyncOnSave: i
  }) {
    const a = window.Blinko.i18n;
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-6", children: [
      /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ o(
          "button",
          {
            onClick: n,
            disabled: t,
            className: `flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium transition-all ${t ? "opacity-50 cursor-wait" : "hover:opacity-90 cursor-pointer"}`,
            children: t ? a.t("ratings_settings.syncing") : e ? a.t("ratings_settings.saveAndSync") : a.t("ratings_settings.saveSettings")
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            onClick: r,
            disabled: t,
            className: "px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-80 cursor-pointer",
            children: a.t("ratings_settings.cancel")
          }
        )
      ] }),
      /* @__PURE__ */ o("label", { className: "flex items-center gap-2 cursor-pointer", children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            checked: !e,
            onChange: i,
            className: "w-4 h-4 cursor-pointer"
          }
        ),
        /* @__PURE__ */ o("span", { className: "text-sm", children: a.t("ratings_settings.doNotSyncOnSave") })
      ] })
    ] });
  }
  function Bt() {
    const [t, e] = T([]), [n, r] = T([]), [i, a] = T(!1), [l, c] = T(!1), [d, u] = T(""), [_, s] = T(null), [p, g] = T(!1), [f, y] = T(!0), v = window.Blinko.i18n, m = new tt(), b = async () => {
      a(!0);
      try {
        const x = await window.Blinko.api.tags.list.query();
        if (x && Array.isArray(x)) {
          const k = x.map((A) => A.name);
          r(k);
        }
      } catch {
      }
      a(!1);
    };
    Fe(() => {
      b(), window.Blinko.api.config.getPluginConfig.query({
        pluginName: "blinko-rating-plugin"
      }).then((x) => {
        if (x != null && x.ratings)
          try {
            const k = JSON.parse(x.ratings);
            e(k.ratings || []);
          } catch {
          }
      });
    }, []);
    const w = async () => {
      c(!0);
      try {
        const x = { ratings: t };
        await window.Blinko.api.config.setPluginConfig.mutate({
          pluginName: "blinko-rating-plugin",
          key: "ratings",
          value: JSON.stringify(x)
        }), window.dispatchEvent(new CustomEvent("blinko-rating-plugin-update")), f ? (await St(t), window.Blinko.toast.success(v.t("ratings_settings.savedAndSynced"))) : window.Blinko.toast.success(v.t("ratings_settings.settingsSaved")), window.Blinko.closeDialog();
      } catch (x) {
        console.error("Save/sync error:", x), window.Blinko.toast.error(v.t("ratings_settings.failedToSave"));
      } finally {
        c(!1);
      }
    }, N = (x, k, A) => {
      const B = {
        guid: m.generateGuid(x),
        name: x,
        type: k,
        enabled: !0,
        mode: "whitelist",
        tags: [],
        label: A
      };
      e([...t, B]), g(!1), window.Blinko.toast.success(v.t("ratings_settings.ratingAdded"));
    }, $ = (x) => {
      e(t.filter((k) => k.guid !== x));
    }, C = (x, k) => {
      e(t.map((A) => A.guid === x ? { ...A, ...k } : A));
    }, D = (x, k) => {
      const A = t.find((B) => B.guid === x);
      if (!A)
        return;
      const P = A.tags.includes(k) ? A.tags.filter((B) => B !== k) : [...A.tags, k];
      C(x, { tags: P });
    };
    return /* @__PURE__ */ o(
      "div",
      {
        className: "max-w-2xl mx-auto p-4 rounded-lg",
        style: { maxHeight: "80vh", overflowY: "auto" },
        children: [
          t.length > 0 && /* @__PURE__ */ o("div", { className: "space-y-4 mb-6", children: t.map((x) => /* @__PURE__ */ o(
            $t,
            {
              config: x,
              availableTags: n,
              tagFilter: d,
              setTagFilter: u,
              isExpanded: _ === x.guid,
              onToggleExpand: () => s(_ === x.guid ? null : x.guid),
              onUpdate: (k) => C(x.guid, k),
              onDelete: () => $(x.guid),
              onToggleTag: (k) => D(x.guid, k),
              onRefreshTags: b,
              isLoadingTags: i
            },
            x.guid
          )) }),
          /* @__PURE__ */ o(
            At,
            {
              show: p,
              onAdd: N,
              onCancel: () => g(!p)
            }
          ),
          /* @__PURE__ */ o(
            Pt,
            {
              isSyncing: l,
              syncOnSave: f,
              onSave: w,
              onCancel: () => window.Blinko.closeDialog(),
              onToggleSyncOnSave: () => y(!f)
            }
          )
        ]
      }
    );
  }
  const Ut = {
    name: "blinko-rating-plugin",
    author: "blinko-community",
    url: "https://github.com/francoislg/blinko-rating-plugin",
    version: "0.1.0",
    minAppVersion: "0.0.0",
    displayName: {
      default: "Rating Plugin",
      zh: "评分插件"
    },
    description: {
      default: "Rate your notes and blinks with a 1-5 star rating system. Supports both personal and collaborative team ratings.",
      zh: "使用1-5星评分系统为您的笔记和想法评分。支持个人评分和团队协作评分。"
    },
    readme: {
      default: "README.md",
      zh: "README_zh.md"
    }
  }, Et = {
    ratings_settings: {
      noRatings: "No ratings configured. Click 'Add New Rating' to get started.",
      enabled: "Enabled",
      disabled: "Disabled",
      delete: "Delete",
      showConfig: "Show Configuration",
      hideConfig: "Hide Configuration",
      filterMode: "Filter Mode",
      whitelist: "Whitelist",
      blacklist: "Blacklist",
      whitelistLabel: "Whitelist:",
      whitelistText: "Only show rating on notes with selected tags.",
      blacklistLabel: "Blacklist:",
      blacklistText: "Show rating on all notes except those with selected tags.",
      allowedTags: "Allowed Tags",
      excludedTags: "Excluded Tags",
      refreshTags: "Refresh Tags",
      loading: "Loading...",
      filterTagsPlaceholder: "Filter tags...",
      noTagsFound: "No tags found. Tags will appear here once you create some in Blinko.",
      allowed: "Allowed",
      excluded: "Excluded",
      addNewRating: "Add New Rating",
      ratingName: "Rating Name",
      ratingNamePlaceholder: "e.g., I Like, Quality, Importance...",
      ratingLabel: "Label (Optional)",
      ratingLabelPlaceholder: "e.g., Rate this note, Quality rating...",
      ratingType: "Rating Type",
      typeStars: "Stars (1-5)",
      typeUpvotes: "Upvote/Downvote",
      add: "Add",
      nameRequired: "Rating name is required",
      ratingAdded: "Rating added successfully!",
      saveSettings: "Save Settings",
      saveAndSync: "Save and Sync Notes",
      doNotSyncOnSave: "Do not sync on save",
      cancel: "Cancel",
      settingsSaved: "Settings saved!",
      savedAndSynced: "Settings saved and notes synced!",
      failedToSave: "Failed to save settings",
      failedToFetchTags: "Failed to fetch tags:",
      failedToParseConfig: "Failed to parse config:",
      syncCardsButton: "Sync Cards to All Notes",
      syncing: "Syncing...",
      syncingCards: "Syncing rating configurations to all notes...",
      cardsSynced: "Successfully synced rating configurations to all notes!",
      failedToSync: "Failed to sync cards"
    },
    ratings_rating: {
      ratedStars: "Rated {{count}} star!",
      ratedStars_plural: "Rated {{count}} stars!",
      ratingCleared: "Rating cleared",
      failedToSave: "Failed to save rating",
      failedToClear: "Failed to clear rating",
      average: "Average:",
      vote: "vote",
      vote_plural: "votes",
      you: "You",
      notRated: "Not rated",
      voteButton: "Vote ▼",
      collapse: "Collapse ▲",
      otherVotes: "Other votes:",
      user: "User {{id}}",
      notRatedShort: "(not rated)",
      clear: "Clear",
      totalPoints: "Total Points:",
      upvoted: "Upvoted!",
      downvoted: "Downvoted!",
      voteCleared: "Vote cleared",
      notVoted: "Not voted"
    }
  }, Lt = {
    ratings_settings: {
      noRatings: '未配置评分。点击"添加新评分"开始使用。',
      enabled: "已启用",
      disabled: "已禁用",
      delete: "删除",
      showConfig: "显示配置",
      hideConfig: "隐藏配置",
      filterMode: "筛选模式",
      whitelist: "白名单",
      blacklist: "黑名单",
      whitelistLabel: "白名单：",
      whitelistText: "仅在带有选定标签的笔记上显示评分。",
      blacklistLabel: "黑名单：",
      blacklistText: "在所有笔记上显示评分，除了带有这些标签的笔记。",
      allowedTags: "允许的标签",
      excludedTags: "排除的标签",
      refreshTags: "刷新标签",
      loading: "加载中...",
      filterTagsPlaceholder: "筛选标签...",
      noTagsFound: "未找到标签。在 Blinko 中创建标签后，它们将显示在这里。",
      allowed: "已允许",
      excluded: "已排除",
      addNewRating: "添加新评分",
      ratingName: "评分名称",
      ratingNamePlaceholder: "例如：我喜欢、质量、重要性...",
      ratingLabel: "标签（可选）",
      ratingLabelPlaceholder: "例如：为此笔记评分、质量评分...",
      ratingType: "评分类型",
      typeStars: "星级 (1-5)",
      typeUpvotes: "点赞/点踩",
      add: "添加",
      nameRequired: "评分名称是必需的",
      ratingAdded: "评分添加成功！",
      saveSettings: "保存设置",
      saveAndSync: "保存并同步笔记",
      doNotSyncOnSave: "保存时不同步",
      cancel: "取消",
      settingsSaved: "设置已保存！",
      savedAndSynced: "设置已保存并同步笔记！",
      failedToSave: "保存设置失败",
      failedToFetchTags: "获取标签失败：",
      failedToParseConfig: "解析配置失败：",
      syncCardsButton: "同步卡片到所有笔记",
      syncing: "正在同步...",
      syncingCards: "正在同步评分配置到所有笔记...",
      cardsSynced: "成功同步评分配置到所有笔记！",
      failedToSync: "同步卡片失败"
    },
    ratings_rating: {
      ratedStars: "已评分 {{count}} 星！",
      ratedStars_plural: "已评分 {{count}} 星！",
      ratingCleared: "评分已清除",
      failedToSave: "保存评分失败",
      failedToClear: "清除评分失败",
      average: "平均分：",
      vote: "票",
      vote_plural: "票",
      you: "你",
      notRated: "未评分",
      voteButton: "投票 ▼",
      collapse: "收起 ▲",
      otherVotes: "其他投票：",
      user: "用户 {{id}}",
      notRatedShort: "（未评分）",
      clear: "清除",
      totalPoints: "总分：",
      upvoted: "已点赞！",
      downvoted: "已点踩！",
      voteCleared: "已清除投票",
      notVoted: "未投票"
    }
  }, Mt = {
    ratings_settings: {
      noRatings: "Aucune évaluation configurée. Cliquez sur « Ajouter une nouvelle évaluation » pour commencer.",
      enabled: "Activé",
      disabled: "Désactivé",
      delete: "Supprimer",
      showConfig: "Afficher la configuration",
      hideConfig: "Masquer la configuration",
      filterMode: "Mode de filtrage",
      whitelist: "Liste blanche",
      blacklist: "Liste noire",
      whitelistLabel: "Liste blanche :",
      whitelistText: "Afficher l'évaluation uniquement sur les notes avec les étiquettes sélectionnées.",
      blacklistLabel: "Liste noire :",
      blacklistText: "Afficher l'évaluation sur toutes les notes sauf celles avec ces étiquettes.",
      allowedTags: "Étiquettes autorisées",
      excludedTags: "Étiquettes exclues",
      refreshTags: "Actualiser les étiquettes",
      loading: "Chargement...",
      filterTagsPlaceholder: "Filtrer les étiquettes...",
      noTagsFound: "Aucune étiquette trouvée. Les étiquettes apparaîtront ici une fois que vous en aurez créé dans Blinko.",
      allowed: "Autorisé",
      excluded: "Exclu",
      addNewRating: "Ajouter une nouvelle évaluation",
      ratingName: "Nom de l'évaluation",
      ratingNamePlaceholder: "par ex., J'aime, Qualité, Importance...",
      ratingLabel: "Étiquette (Facultatif)",
      ratingLabelPlaceholder: "par ex., Notez cette note, Évaluation de qualité...",
      ratingType: "Type d'évaluation",
      typeStars: "Étoiles (1-5)",
      typeUpvotes: "Vote positif/négatif",
      add: "Ajouter",
      nameRequired: "Le nom de l'évaluation est requis",
      ratingAdded: "Évaluation ajoutée avec succès !",
      saveSettings: "Enregistrer les paramètres",
      saveAndSync: "Enregistrer et synchroniser les notes",
      doNotSyncOnSave: "Ne pas synchroniser lors de l'enregistrement",
      cancel: "Annuler",
      settingsSaved: "Paramètres enregistrés !",
      savedAndSynced: "Paramètres enregistrés et notes synchronisées !",
      failedToSave: "Échec de l'enregistrement des paramètres",
      failedToFetchTags: "Échec de la récupération des étiquettes :",
      failedToParseConfig: "Échec de l'analyse de la configuration :",
      syncCardsButton: "Synchroniser les cartes vers toutes les notes",
      syncing: "Synchronisation...",
      syncingCards: "Synchronisation des configurations d'évaluation vers toutes les notes...",
      cardsSynced: "Configurations d'évaluation synchronisées avec succès vers toutes les notes !",
      failedToSync: "Échec de la synchronisation des cartes"
    },
    ratings_rating: {
      ratedStars: "Noté {{count}} étoile !",
      ratedStars_plural: "Noté {{count}} étoiles !",
      ratingCleared: "Note effacée",
      failedToSave: "Échec de l'enregistrement de la note",
      failedToClear: "Échec de l'effacement de la note",
      average: "Moyenne :",
      vote: "vote",
      vote_plural: "votes",
      you: "Vous",
      notRated: "Non noté",
      voteButton: "Voter ▼",
      collapse: "Réduire ▲",
      otherVotes: "Autres votes :",
      user: "Utilisateur {{id}}",
      notRatedShort: "(non noté)",
      clear: "Effacer",
      totalPoints: "Points totaux :",
      upvoted: "Vote positif !",
      downvoted: "Vote négatif !",
      voteCleared: "Vote effacé",
      notVoted: "Pas de vote"
    }
  };
  class Ft {
    constructor(e) {
      this.config = e;
    }
    getRatingsFromMetadata(e, n) {
      var r, i;
      return (i = (r = e == null ? void 0 : e.metadata) == null ? void 0 : r.ratingConfigs) != null && i[n] ? e.metadata.ratingConfigs[n].ratings || {} : {};
    }
    getRating(e, n) {
      const r = this.config.getUserId();
      return this.getRatingsFromMetadata(e, n)[r] || 0;
    }
    getAverageRating(e, n) {
      const r = this.getRatingsFromMetadata(e, n), i = Object.values(r);
      return i.length === 0 ? 0 : i.reduce((l, c) => l + c, 0) / i.length;
    }
    getVoteCount(e, n) {
      const r = this.getRatingsFromMetadata(e, n);
      return Object.keys(r).length;
    }
    getAllRatings(e, n) {
      return this.getRatingsFromMetadata(e, n);
    }
    getRatingForNote(e, n) {
      return {
        userRating: this.getRating(e, n),
        averageRating: this.getAverageRating(e, n),
        voteCount: this.getVoteCount(e, n),
        allRatings: this.getAllRatings(e, n)
      };
    }
    async saveRating(e, n, r) {
      var p, g, f;
      const i = this.config.getUserId(), a = ((p = e.id) == null ? void 0 : p.toString()) || ((g = e._id) == null ? void 0 : g.toString()), c = { ...this.getRatingsFromMetadata(e, n) };
      r === 0 ? delete c[i] : c[i] = r;
      const d = ((f = e.metadata) == null ? void 0 : f.ratingConfigs) || {}, u = d[n];
      if (!u)
        throw new Error(
          `Rating configuration with guid ${n} not found in note metadata`
        );
      const _ = {
        ...d,
        [n]: {
          ...u,
          ratings: c,
          createdBy: u.createdBy || i
          // Preserve or set createdBy
        }
      }, s = {
        ...e.metadata || {},
        ratingConfigs: _
      };
      try {
        await window.Blinko.api.notes.upsert.mutate({
          id: Number(a),
          metadata: s
        });
      } catch (y) {
        throw y;
      }
    }
  }
  function W({
    rating: t,
    hoverRating: e = 0,
    isInteractive: n = !1,
    onStarClick: r,
    onStarHover: i,
    onStarLeave: a,
    disabled: l = !1
  }) {
    const c = e || t;
    return /* @__PURE__ */ o("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((d) => /* @__PURE__ */ o(
      "span",
      {
        onClick: n && !l && r ? () => r(d) : void 0,
        onMouseEnter: n && !l && i ? () => i(d) : void 0,
        onMouseLeave: n && !l && a ? a : void 0,
        className: `inline-block transition-transform duration-200 origin-center text-lg ${n && !l ? "cursor-pointer" : "cursor-default"} ${n && e === d ? "scale-140" : "scale-120"}`,
        "data-rating": d,
        children: d <= c ? "⭐" : "☆"
      },
      d
    )) });
  }
  let ge = null, ee = null;
  async function Vt() {
    return ge ? Promise.resolve(ge) : ee || (ee = (async () => {
      var e, n;
      const t = /* @__PURE__ */ new Map();
      try {
        const r = window.Blinko.api;
        if (!((n = (e = r.users) == null ? void 0 : e.publicUserList) != null && n.query))
          return console.warn("users.publicUserList API not available"), t;
        const i = await r.users.publicUserList.query();
        Array.isArray(i) && i.forEach((a) => {
          const l = a.id.toString();
          t.set(l, {
            id: l,
            nickname: a.nickname || a.name,
            avatarUrl: a.image
          });
        });
      } catch (r) {
        console.error("Failed to load user cache:", r);
      }
      return ge = t, t;
    })(), ee);
  }
  function pe(t) {
    const [e, n] = T(/* @__PURE__ */ new Map());
    return Fe(() => {
      Vt().then((i) => {
        n(new Map(i));
      });
    }, [t]), Z(() => {
      var c;
      const i = e.get(t);
      if (i)
        return i;
      const a = window.Blinko.store.userStore, l = (c = a == null ? void 0 : a.id) == null ? void 0 : c.toString();
      return t === l ? {
        id: t,
        nickname: a.nickname || a.name,
        avatarUrl: a.image
      } : { id: t };
    }, [t, e]);
  }
  function O({ userId: t, size: e = 24, isCurrentUser: n = !1 }) {
    const r = pe(t), [i, a] = T(!1), l = t.substring(0, 2).toUpperCase();
    return r.avatarUrl && !i ? /* @__PURE__ */ o(
      "div",
      {
        className: "rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold",
        style: {
          width: `${e}px`,
          height: `${e}px`,
          fontSize: `${e * 0.4}px`
        },
        children: /* @__PURE__ */ o(
          "img",
          {
            src: r.avatarUrl,
            alt: r.nickname || `User ${t}`,
            className: "w-full h-full object-cover",
            onError: () => a(!0)
          }
        )
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: "rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold",
        style: {
          width: `${e}px`,
          height: `${e}px`,
          fontSize: `${e * 0.4}px`
        },
        children: l
      }
    );
  }
  function rt(t, e) {
    const [n, r] = T(null), i = Z(() => {
      const d = { ...t || {} };
      return n !== null && (n === 0 ? delete d[e] : d[e] = n), d;
    }, [t, e, n]), a = Z(() => {
      const d = Object.values(i), u = d.length, _ = u > 0 ? d.reduce((y, v) => y + v, 0) / u : 0, s = d.reduce((y, v) => y + v, 0), p = i[e] || 0, g = Object.entries(i).filter(([y]) => y !== e), f = g.length > 0;
      return {
        userRating: p,
        averageRating: _,
        voteCount: u,
        totalPoints: s,
        allRatings: i,
        ratingValues: d,
        otherUsersVotes: g,
        isMultiUserMode: f
      };
    }, [i, e]), l = Ve((d) => {
      r(d);
    }, []), c = Ve(() => {
      r(null);
    }, []);
    return {
      ...a,
      updateVote: l,
      resetVote: c
    };
  }
  function Dt({ userId: t, rating: e }) {
    const n = pe(t), r = window.Blinko.i18n;
    return /* @__PURE__ */ o("div", { className: "flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md", children: [
      /* @__PURE__ */ o(O, { userId: t, size: 24, isCurrentUser: !1 }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/70 min-w-[60px]", children: n.nickname || r.t("ratings_rating.user", { id: t.substring(0, 6) }) }),
      /* @__PURE__ */ o(W, { rating: e, isInteractive: !1 }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/60 ml-1", children: [
        "(",
        e,
        "/5)"
      ] })
    ] });
  }
  function Ht({ noteId: t, ratings: e, currentUserId: n, onRatingChange: r, label: i }) {
    const { userRating: a, averageRating: l, voteCount: c, allRatings: d, otherUsersVotes: u, isMultiUserMode: _, updateVote: s, resetVote: p } = rt(e, n), [g, f] = T(0), [y, v] = T(!1), [m, b] = T(!1), w = window.Blinko.i18n, N = async (C) => {
      if (!y) {
        v(!0), s(C);
        try {
          await r(C), window.Blinko.toast.success(w.t("ratings_rating.ratedStars", { count: C }));
        } catch {
          p(), window.Blinko.toast.error(w.t("ratings_rating.failedToSave"));
        } finally {
          v(!1);
        }
      }
    }, $ = async () => {
      if (!y) {
        v(!0), s(0);
        try {
          await r(0), window.Blinko.toast.success(w.t("ratings_rating.ratingCleared"));
        } catch {
          p(), window.Blinko.toast.error(w.t("ratings_rating.failedToClear"));
        } finally {
          v(!1);
        }
      }
    };
    return _ ? m ? /* @__PURE__ */ o(
      "div",
      {
        className: `blinko-rating-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${y ? "opacity-60" : "opacity-100"}`,
        "data-note-id": t,
        children: [
          i && /* @__PURE__ */ o("div", { className: "text-[11px] font-medium text-gray-500/70 mb-2", children: i }),
          /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-3 text-[13px] text-gray-500/90 font-medium", children: [
            /* @__PURE__ */ o("span", { children: [
              w.t("ratings_rating.average"),
              " ",
              l.toFixed(1),
              "/5"
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "(",
              c,
              " ",
              w.t("ratings_rating.vote", { count: c }),
              ")"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                onClick: () => b(!1),
                className: "px-2 py-0.5 text-[11px] cursor-pointer border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-gray-500/10",
                children: w.t("ratings_rating.collapse")
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "mb-3 pb-3 border-b border-gray-500/10", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md", children: [
            /* @__PURE__ */ o(O, { userId: n, size: 24, isCurrentUser: !0 }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/70 min-w-[60px]", children: w.t("ratings_rating.you") }),
            /* @__PURE__ */ o(
              W,
              {
                rating: a,
                hoverRating: g,
                isInteractive: !0,
                onStarClick: N,
                onStarHover: f,
                onStarLeave: () => f(0),
                disabled: y
              }
            ),
            a > 0 && /* @__PURE__ */ o(E, { children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/60 ml-1", children: [
                "(",
                a,
                "/5)"
              ] }),
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: $,
                  disabled: y,
                  className: `ml-auto px-2 py-0.5 text-[11px] border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500/80 ${y ? "cursor-wait opacity-50" : "cursor-pointer"}`,
                  children: w.t("ratings_rating.clear")
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ o("div", { className: "text-xs text-gray-500/80 mb-1.5 font-medium", children: w.t("ratings_rating.otherVotes") }),
          /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: u.map(([C, D]) => /* @__PURE__ */ o(Dt, { userId: C, rating: D }, C)) })
        ]
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: `blinko-rating-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${y ? "opacity-60" : "opacity-100"}`,
        "data-note-id": t,
        children: [
          i && /* @__PURE__ */ o("div", { className: "text-[11px] font-medium text-gray-500/70 mb-2", children: i }),
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-2 text-xs text-gray-500/80", children: [
            /* @__PURE__ */ o("span", { className: "font-medium min-w-[60px]", children: w.t("ratings_rating.average") }),
            /* @__PURE__ */ o(W, { rating: l, isInteractive: !1 }),
            /* @__PURE__ */ o("span", { className: "text-gray-500/60", children: [
              l.toFixed(1),
              "/5 (",
              c,
              " ",
              w.t("ratings_rating.vote", { count: c }),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ o(
            "div",
            {
              onClick: () => b(!0),
              className: "flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md cursor-pointer transition-colors hover:bg-gray-500/10",
              children: [
                /* @__PURE__ */ o(O, { userId: n, size: 24, isCurrentUser: !0 }),
                /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/70 min-w-[60px]", children: w.t("ratings_rating.you") }),
                a > 0 ? /* @__PURE__ */ o(E, { children: [
                  /* @__PURE__ */ o(W, { rating: a, isInteractive: !1 }),
                  /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/60 ml-1", children: [
                    "(",
                    a,
                    "/5)"
                  ] })
                ] }) : /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/60", children: w.t("ratings_rating.notRated") }),
                /* @__PURE__ */ o("div", { className: "ml-auto text-[11px] text-gray-500/70 font-medium", children: w.t("ratings_rating.voteButton") })
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: `blinko-rating-plugin flex items-center gap-1 p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 text-lg select-none w-full box-border shrink-0 transition-opacity ${y ? "opacity-60" : "opacity-100"}`,
        "data-note-id": t,
        children: [
          i && /* @__PURE__ */ o("div", { className: "text-[11px] font-medium text-gray-500/70 mr-2", children: i }),
          /* @__PURE__ */ o(
            W,
            {
              rating: a,
              hoverRating: g,
              isInteractive: !0,
              onStarClick: N,
              onStarHover: f,
              onStarLeave: () => f(0),
              disabled: y
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-xs text-gray-500/80 ml-2", children: a > 0 ? `${a}/5` : w.t("ratings_rating.notRatedShort") }),
          a > 0 && /* @__PURE__ */ o(
            "button",
            {
              onClick: $,
              disabled: y,
              className: `ml-2 px-2 py-0.5 text-[11px] border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500/80 ${y ? "cursor-wait opacity-50" : "cursor-pointer"}`,
              children: w.t("ratings_rating.clear")
            }
          )
        ]
      }
    );
  }
  function Ot({ userId: t, vote: e }) {
    const n = pe(t), r = window.Blinko.i18n;
    return /* @__PURE__ */ o("div", { className: "flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md", children: [
      /* @__PURE__ */ o(O, { userId: t, size: 24, isCurrentUser: !1 }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/70 min-w-[60px]", children: n.nickname || r.t("ratings_rating.user", { id: t.substring(0, 6) }) }),
      /* @__PURE__ */ o("div", { className: `text-xs font-semibold ${e === 1 ? "text-green-600" : "text-red-600"}`, children: e === 1 ? "+1" : "-1" })
    ] });
  }
  function qt({ noteId: t, ratings: e, currentUserId: n, onRatingChange: r, label: i }) {
    const { userRating: a, totalPoints: l, voteCount: c, allRatings: d, otherUsersVotes: u, isMultiUserMode: _, updateVote: s, resetVote: p } = rt(e, n), [g, f] = T(!1), [y, v] = T(!1), m = window.Blinko.i18n, b = async (N) => {
      if (g)
        return;
      const $ = a === N ? 0 : N;
      f(!0), s($);
      try {
        await r($), $ === 0 ? window.Blinko.toast.success(m.t("ratings_rating.voteCleared")) : window.Blinko.toast.success(
          $ === 1 ? m.t("ratings_rating.upvoted") : m.t("ratings_rating.downvoted")
        );
      } catch {
        p(), window.Blinko.toast.error(m.t("ratings_rating.failedToSave"));
      } finally {
        f(!1);
      }
    }, w = ({ currentVote: N, onVote: $, disabled: C }) => /* @__PURE__ */ o("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ o(
        "button",
        {
          onClick: () => $(1),
          disabled: C,
          className: `px-2.5 py-1 text-sm border rounded transition-all ${C ? "cursor-wait opacity-50" : "cursor-pointer"} ${N === 1 ? "bg-green-500/10 text-green-600 border-green-600/50 font-semibold" : "bg-transparent text-gray-500/80 border-gray-500/30 hover:bg-green-500/15 hover:border-green-600/50"}`,
          children: "+1"
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          onClick: () => $(-1),
          disabled: C,
          className: `px-2.5 py-1 text-sm border rounded transition-all ${C ? "cursor-wait opacity-50" : "cursor-pointer"} ${N === -1 ? "bg-red-500/10 text-red-600 border-red-600/50 font-semibold" : "bg-transparent text-gray-500/80 border-gray-500/30 hover:bg-red-500/15 hover:border-red-600/50"}`,
          children: "-1"
        }
      )
    ] });
    return _ ? y ? /* @__PURE__ */ o(
      "div",
      {
        className: `blinko-upvote-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${g ? "opacity-60" : "opacity-100"}`,
        "data-note-id": t,
        children: [
          i && /* @__PURE__ */ o("div", { className: "text-[11px] font-medium text-gray-500/70 mb-2", children: i }),
          /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-3 text-[13px] text-gray-500/90 font-medium", children: [
            /* @__PURE__ */ o("span", { children: [
              m.t("ratings_rating.totalPoints"),
              /* @__PURE__ */ o("span", { className: `ml-2 font-semibold ${l > 0 ? "text-green-600" : l < 0 ? "text-red-600" : "text-gray-500/80"}`, children: [
                l > 0 ? "+" : "",
                l
              ] })
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "(",
              c,
              " ",
              m.t("ratings_rating.vote", { count: c }),
              ")"
            ] }),
            /* @__PURE__ */ o(
              "button",
              {
                onClick: () => v(!1),
                className: "px-2 py-0.5 text-[11px] cursor-pointer border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-gray-500/10",
                children: m.t("ratings_rating.collapse")
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "mb-3 pb-3 border-b border-gray-500/10", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md", children: [
            /* @__PURE__ */ o(O, { userId: n, size: 24, isCurrentUser: !0 }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/70 min-w-[60px]", children: m.t("ratings_rating.you") }),
            /* @__PURE__ */ o(w, { currentVote: a, onVote: b, disabled: g }),
            a !== 0 && /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/60 ml-1", children: [
              "(",
              a === 1 ? "+1" : "-1",
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ o("div", { className: "text-xs text-gray-500/80 mb-1.5 font-medium", children: m.t("ratings_rating.otherVotes") }),
          /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: u.map(([N, $]) => /* @__PURE__ */ o(Ot, { userId: N, vote: $ }, N)) })
        ]
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: `blinko-upvote-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${g ? "opacity-60" : "opacity-100"}`,
        "data-note-id": t,
        children: [
          i && /* @__PURE__ */ o("div", { className: "text-[11px] font-medium text-gray-500/70 mb-2", children: i }),
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-2 text-xs text-gray-500/80", children: [
            /* @__PURE__ */ o("span", { className: "font-medium min-w-[80px]", children: m.t("ratings_rating.totalPoints") }),
            /* @__PURE__ */ o("span", { className: `text-sm font-semibold ${l > 0 ? "text-green-600" : l < 0 ? "text-red-600" : "text-gray-500/80"}`, children: [
              l > 0 ? "+" : "",
              l
            ] }),
            /* @__PURE__ */ o("span", { className: "text-gray-500/60", children: [
              "(",
              c,
              " ",
              m.t("ratings_rating.vote", { count: c }),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ o(
            "div",
            {
              onClick: () => v(!0),
              className: "flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md cursor-pointer transition-colors hover:bg-gray-500/10",
              children: [
                /* @__PURE__ */ o(O, { userId: n, size: 24, isCurrentUser: !0 }),
                /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/70 min-w-[60px]", children: m.t("ratings_rating.you") }),
                a !== 0 ? /* @__PURE__ */ o("div", { className: `text-xs font-semibold ${a === 1 ? "text-green-600" : "text-red-600"}`, children: a === 1 ? "+1" : "-1" }) : /* @__PURE__ */ o("div", { className: "text-[11px] text-gray-500/60", children: m.t("ratings_rating.notVoted") }),
                /* @__PURE__ */ o("div", { className: "ml-auto text-[11px] text-gray-500/70 font-medium", children: m.t("ratings_rating.voteButton") })
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: `blinko-upvote-plugin flex items-center gap-2 p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 text-sm select-none w-full box-border shrink-0 transition-opacity ${g ? "opacity-60" : "opacity-100"}`,
        "data-note-id": t,
        children: [
          i && /* @__PURE__ */ o("div", { className: "text-[11px] font-medium text-gray-500/70 mr-2", children: i }),
          /* @__PURE__ */ o(w, { currentVote: a, onVote: b, disabled: g }),
          /* @__PURE__ */ o("span", { className: "text-xs text-gray-500/80 ml-1", children: a !== 0 ? a === 1 ? "+1" : "-1" : m.t("ratings_rating.notVoted") })
        ]
      }
    );
  }
  System.register([], (t) => ({
    execute: () => {
      t(
        "default",
        class {
          constructor() {
            te(this, "withSettingPanel", !0);
            te(this, "renderSettingPanel", () => {
              const n = document.createElement("div");
              return Ye(/* @__PURE__ */ o(Bt, {}), n), n;
            });
            Object.assign(this, Ut);
          }
          async init() {
            this.initI18n();
            const n = new tt();
            await n.init(), window.Blinko.addCardFooterSlot({
              name: "note-rating",
              content: (r) => {
                var u, _;
                const i = document.createElement("div");
                if (!r || !((u = r.metadata) != null && u.ratingConfigs))
                  return i;
                const a = new Ft(n), l = r.metadata.ratingConfigs, c = Object.entries(l).filter(
                  ([s, p]) => p.enabled
                );
                if (c.length === 0)
                  return i;
                const d = ((_ = window.Blinko.store.userStore.id) == null ? void 0 : _.toString()) || "anonymous";
                return Ye(
                  /* @__PURE__ */ o(E, { children: c.map(([s, p]) => {
                    var v, m;
                    const f = {
                      stars: Ht,
                      upvotes: qt
                    }[p.type];
                    if (!f)
                      return null;
                    const y = p.ratings || {};
                    return /* @__PURE__ */ o(
                      f,
                      {
                        noteId: ((v = r.id) == null ? void 0 : v.toString()) || ((m = r._id) == null ? void 0 : m.toString()) || "",
                        ratings: y,
                        currentUserId: d,
                        onRatingChange: (b) => a.saveRating(r, s, b),
                        label: p.label
                      },
                      s
                    );
                  }) }),
                  i
                ), i;
              }
            });
          }
          initI18n() {
            window.Blinko.i18n.addResourceBundle("en", "translation", Et), window.Blinko.i18n.addResourceBundle("zh", "translation", Lt), window.Blinko.i18n.addResourceBundle("fr", "translation", Mt);
          }
          destroy() {
          }
        }
      );
    }
  }));
})();
