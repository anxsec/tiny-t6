const DATA_MARKER_ID = 'data-c-l-i';

function getSelector(elm) {
  // return elm.tagName;
  const markerContainers = document.querySelectorAll(`[${DATA_MARKER_ID}]`);
  for (const markerContainer of markerContainers) {
    if (markerContainer.contains(elm))
      return `[${DATA_MARKER_ID}="${markerContainer.getAttribute(
        DATA_MARKER_ID,
      )}"]`;
  }
  return CssSelectorGenerator.getCssSelector(elm);
}

function __test_success_bootstrap() {
  document.body.addEventListener(
    'click',
    (e) => {
      const { target } = e;
      if (!target) return;
      _addTestSuccessAction(
        JSON.stringify({
          context: window.__test_success_context_id,
          page: window.__test_success_page_id,
          action: 'click',
          params: {
            selector: getSelector(target),
          },
        }),
      );
    },
    true,
  );
  document.body.addEventListener('keyup', (e) => {
    const keyCode = e.keyCode || e.which || e.charCode;
    const ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && keyCode == 81) {
      _closeTestSuccessAction();
    }
  });
}

// vendor https://github.com/fczbkk/css-selector-generator
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : 'object' == typeof exports
    ? (exports.CssSelectorGenerator = e())
    : (t.CssSelectorGenerator = e());
})(self, function () {
  return (() => {
    var t = {
        426: (t, e, n) => {
          var r = n(529);
          function o(t, e, n) {
            Array.isArray(t) ? t.push(e) : (t[n] = e);
          }
          t.exports = function (t) {
            var e,
              n,
              i,
              u = [];
            if (Array.isArray(t)) (n = []), (e = t.length - 1);
            else {
              if ('object' != typeof t || null === t)
                throw new TypeError(
                  'Expecting an Array or an Object, but `' +
                    (null === t ? 'null' : typeof t) +
                    '` provided.',
                );
              (n = {}), (i = Object.keys(t)), (e = i.length - 1);
            }
            return (
              (function n(c, s) {
                var a, l, f, p;
                for (
                  l = i ? i[s] : s,
                    Array.isArray(t[l]) ||
                      (void 0 === t[l] ? (t[l] = []) : (t[l] = [t[l]])),
                    a = 0;
                  a < t[l].length;
                  a++
                )
                  o(
                    ((p = c), (f = Array.isArray(p) ? [].concat(p) : r(p))),
                    t[l][a],
                    l,
                  ),
                    s >= e ? u.push(f) : n(f, s + 1);
              })(n, 0),
              u
            );
          };
        },
        529: (t) => {
          t.exports = function () {
            for (var t = {}, n = 0; n < arguments.length; n++) {
              var r = arguments[n];
              for (var o in r) e.call(r, o) && (t[o] = r[o]);
            }
            return t;
          };
          var e = Object.prototype.hasOwnProperty;
        },
      },
      e = {};
    function n(r) {
      var o = e[r];
      if (void 0 !== o) return o.exports;
      var i = (e[r] = { exports: {} });
      return t[r](i, i.exports, n), i.exports;
    }
    (n.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return n.d(e, { a: e }), e;
    }),
      (n.d = (t, e) => {
        for (var r in e)
          n.o(e, r) &&
            !n.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
      }),
      (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (n.r = (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      });
    var r = {};
    return (
      (() => {
        'use strict';
        n.r(r), n.d(r, { default: () => B, getCssSelector: () => q });
        var t =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol
                  ? 'symbol'
                  : typeof t;
              };
        function e(e) {
          return (
            null != e &&
            'object' === (void 0 === e ? 'undefined' : t(e)) &&
            1 === e.nodeType &&
            'object' === t(e.style) &&
            'object' === t(e.ownerDocument)
          );
        }
        function o(t = []) {
          const [e = [], ...n] = t;
          return 0 === n.length
            ? e
            : n.reduce((t, e) => t.filter((t) => e.includes(t)), e);
        }
        function i(t = []) {
          if (0 === t.length) return new RegExp('.^');
          const e = t
            .map((t) =>
              'string' == typeof t
                ? t.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '.+')
                : t.source,
            )
            .join('|');
          return new RegExp(e);
        }
        function u(t, e, n = document) {
          const r = Array.from(n.querySelectorAll(e));
          return r.length === t.length && t.every((t) => r.includes(t));
        }
        function c(t, n) {
          return (
            (n = null != n ? n : t[0].ownerDocument.querySelector(':root')),
            o(
              t.map((t) =>
                (function (t, n) {
                  const r = [];
                  let o = t;
                  for (; e(o) && o !== n; ) r.push(o), (o = o.parentElement);
                  return r;
                })(t, n),
              ),
            )
          );
        }
        function s(t) {
          const n = t.parentNode;
          if (n) {
            const r = Array.from(n.childNodes).filter(e).indexOf(t);
            if (r > -1) return [`:nth-child(${r + 1})`];
          }
          return [];
        }
        function a(t) {
          return o(t.map(s));
        }
        const l = new RegExp(['^$', '\\s', '^\\d'].join('|')),
          f = new RegExp(['^$', '^\\d'].join('|')),
          p = ['id', 'class', 'tag', 'attribute', 'nthchild', 'nthoftype'],
          m = ['nthoftype', 'tag', 'id', 'class', 'attribute', 'nthchild'];
        function d(t) {
          return [
            ':root',
            ...c([t])
              .map((t) => a([t])[0])
              .reverse(),
          ].join(' > ');
        }
        const y = {
          selectors: ['id', 'class', 'tag', 'attribute'],
          includeTag: !1,
          whitelist: [],
          blacklist: [],
          combineWithinSelector: !0,
          combineBetweenSelectors: !0,
          root: document,
          maxCombinations: Number.POSITIVE_INFINITY,
          maxCandidates: Number.POSITIVE_INFINITY,
        };
        function g(t) {
          return (
            'string' == typeof t ||
            (function (t) {
              return t instanceof RegExp;
            })(t)
          );
        }
        function b(t) {
          return Array.isArray(t) ? t.filter(g) : [];
        }
        function h(t, e) {
          return (function (t) {
            const e = [
              Node.DOCUMENT_NODE,
              Node.DOCUMENT_FRAGMENT_NODE,
              Node.ELEMENT_NODE,
            ];
            return (
              (function (t) {
                return t instanceof Node;
              })(t) && e.includes(t.nodeType)
            );
          })(t)
            ? t
            : e.ownerDocument.querySelector(':root');
        }
        function S(t) {
          return 'number' == typeof t ? t : Number.POSITIVE_INFINITY;
        }
        var x = n(426),
          N = n.n(x);
        const v = i(['class', 'id', 'ng-*']);
        function A({ nodeName: t }) {
          return `[${t}]`;
        }
        function j({ nodeName: t, nodeValue: e }) {
          return `[${t}='${R(e)}']`;
        }
        function E({ nodeName: t }) {
          return !v.test(t);
        }
        function w(t) {
          const e = Array.from(t.attributes).filter(E);
          return [...e.map(A), ...e.map(j)];
        }
        function O(t) {
          return (t.getAttribute('class') || '')
            .trim()
            .split(/\s+/)
            .filter((t) => !f.test(t))
            .map((t) => `.${R(t)}`);
        }
        function T(t) {
          const e = [...new Set(t.map((t) => R(t.tagName.toLowerCase())))];
          return 0 === e.length || e.length > 1 ? [] : [e[0]];
        }
        function I(t) {
          const e = T([t])[0],
            n = t.parentElement;
          if (n) {
            const r = Array.from(n.querySelectorAll(e)).indexOf(t);
            if (r > -1) return [`${e}:nth-of-type(${r + 1})`];
          }
          return [];
        }
        function C(t = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
          const n = [];
          let r = 0,
            o = _(1);
          for (; o.length <= t.length && r < e; )
            (r += 1), n.push(o.map((e) => t[e])), (o = $(o, t.length - 1));
          return n;
        }
        function $(t = [], e = 0) {
          const n = t.length;
          if (0 === n) return [];
          const r = [...t];
          r[n - 1] += 1;
          for (let t = n - 1; t >= 0; t--)
            if (r[t] > e) {
              if (0 === t) return _(n + 1);
              r[t - 1]++, (r[t] = r[t - 1] + 1);
            }
          return r[n - 1] > e ? _(n + 1) : r;
        }
        function _(t = 1) {
          return Array.from(Array(t).keys());
        }
        const D = ':'.charCodeAt(0).toString(16).toUpperCase(),
          P = /[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;
        function R(t = '') {
          return t
            .split('')
            .map((t) =>
              ':' === t
                ? `\\${D} `
                : P.test(t)
                ? `\\${t}`
                : escape(t).replace(/%/g, '\\'),
            )
            .join('');
        }
        const M = {
          tag: T,
          id: function (t) {
            if (0 === t.length || t.length > 1) return [];
            const e = t[0],
              n = e.getAttribute('id') || '',
              r = `#${R(n)}`;
            return !l.test(n) && u([e], r, e.ownerDocument) ? [r] : [];
          },
          class: function (t) {
            return o(t.map(O));
          },
          attribute: function (t) {
            return o(t.map(w));
          },
          nthchild: a,
          nthoftype: function (t) {
            return o(t.map(I));
          },
        };
        function k(t) {
          return t.includes('tag') || t.includes('nthoftype')
            ? [...t]
            : [...t, 'tag'];
        }
        function F(t = {}) {
          const e = [...m];
          return (
            t.tag && t.nthoftype && e.splice(e.indexOf('tag'), 1),
            e
              .map((e) => {
                return (r = t)[(n = e)] ? r[n].join('') : '';
                var n, r;
              })
              .join('')
          );
        }
        function V(t, e, n = '', r) {
          const o = (function (t, e) {
            return '' === e
              ? t
              : (function (t, e) {
                  return [
                    ...t.map((t) => e + ' ' + t),
                    ...t.map((t) => e + ' > ' + t),
                  ];
                })(t, e);
          })(
            (function (t, e, n) {
              const r =
                ((o = (function (t, e) {
                  return (function (t) {
                    const {
                        selectors: e,
                        combineBetweenSelectors: n,
                        includeTag: r,
                        maxCandidates: o,
                      } = t,
                      i = n ? C(e, { maxResults: o }) : e.map((t) => [t]);
                    return r ? i.map(k) : i;
                  })(e)
                    .map((e) =>
                      (function (t, e) {
                        const n = {};
                        return (
                          t.forEach((t) => {
                            const r = e[t];
                            r.length > 0 && (n[t] = r);
                          }),
                          N()(n).map(F)
                        );
                      })(e, t),
                    )
                    .filter((t) => t.length > 0);
                })(
                  (function (t, e) {
                    const {
                        blacklist: n,
                        whitelist: r,
                        combineWithinSelector: o,
                        maxCombinations: u,
                      } = e,
                      c = i(n),
                      s = i(r);
                    return (function (t) {
                      const { selectors: e, includeTag: n } = t,
                        r = [].concat(e);
                      return n && !r.includes('tag') && r.push('tag'), r;
                    })(e).reduce((e, n) => {
                      const r = (function (t = [], e) {
                        return t.sort((t, n) => {
                          const r = e.test(t),
                            o = e.test(n);
                          return r && !o ? -1 : !r && o ? 1 : 0;
                        });
                      })(
                        (function (t = [], e, n) {
                          return t.filter((t) => n.test(t) || !e.test(t));
                        })(
                          (function (t, e) {
                            var n;
                            return (
                              null !== (n = M[e]) && void 0 !== n ? n : () => []
                            )(t);
                          })(t, n),
                          c,
                          s,
                        ),
                        s,
                      );
                      return (
                        (e[n] = o
                          ? C(r, { maxResults: u })
                          : r.map((t) => [t])),
                        e
                      );
                    }, {});
                  })(t, n),
                  n,
                )),
                [].concat(...o));
              var o;
              return [...new Set(r)];
            })(t, r.root, r),
            n,
          );
          for (const e of o) if (u(t, e, r.root)) return e;
          return null;
        }
        function q(t, n = {}) {
          const r = (function (t) {
              const n = (Array.isArray(t) ? t : [t]).filter(e);
              return [...new Set(n)];
            })(t),
            o = (function (t, e = {}) {
              const n = Object.assign(Object.assign({}, y), e);
              return {
                selectors:
                  ((r = n.selectors),
                  Array.isArray(r) ? r.filter((t) => p.includes(t)) : []),
                whitelist: b(n.whitelist),
                blacklist: b(n.blacklist),
                root: h(n.root, t),
                combineWithinSelector: !!n.combineWithinSelector,
                combineBetweenSelectors: !!n.combineBetweenSelectors,
                includeTag: !!n.includeTag,
                maxCombinations: S(n.maxCombinations),
                maxCandidates: S(n.maxCandidates),
              };
              var r;
            })(r[0], n);
          let i = '',
            s = o.root;
          function a() {
            return (function (t, e, n = '', r) {
              if (0 === t.length) return null;
              const o = [t.length > 1 ? t : [], ...c(t, e).map((t) => [t])];
              for (const t of o) {
                const e = V(t, 0, n, r);
                if (e) return { foundElements: t, selector: e };
              }
              return null;
            })(r, s, i, o);
          }
          let l = a();
          for (; l; ) {
            const { foundElements: t, selector: e } = l;
            if (u(r, e, o.root)) return e;
            (s = t[0]), (i = e), (l = a());
          }
          return r.length > 1
            ? r.map((t) => q(t, o)).join(', ')
            : (function (t) {
                return t.map(d).join(', ');
              })(r);
        }
        const B = q;
      })(),
      r
    );
  })();
});
