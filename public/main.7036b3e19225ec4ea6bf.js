(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let o = !1;
      const s = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            o &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          o = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return o;
        },
      };
      function i(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const l = {
          closed: !0,
          next(t) {},
          error(t) {
            if (s.useDeprecatedSynchronousErrorHandling) throw t;
            i(t);
          },
          complete() {},
        },
        a = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: o,
              _unsubscribe: s,
              _subscriptions: i,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(s)) {
              o && (this._unsubscribe = void 0);
              try {
                s.call(this);
              } catch (l) {
                e = l instanceof u ? d(l.errors) : [l];
              }
            }
            if (a(i)) {
              let t = -1,
                n = i.length;
              for (; ++t < n; ) {
                const n = i[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (l) {
                    (e = e || []),
                      l instanceof u ? (e = e.concat(d(l.errors))) : e.push(l);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const o = this._subscriptions;
            return null === o ? (this._subscriptions = [n]) : o.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const f = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class p extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = l;
              break;
            case 1:
              if (!t) {
                this.destination = l;
                break;
              }
              if ("object" == typeof t) {
                t instanceof p
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [f]() {
          return this;
        }
        static create(t, e, n) {
          const r = new p(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends p {
        constructor(t, e, n, o) {
          let s;
          super(), (this._parentSubscriber = t);
          let i = this;
          r(e)
            ? (s = e)
            : e &&
              ((s = e.next),
              (n = e.error),
              (o = e.complete),
              e !== l &&
                ((i = Object.create(e)),
                r(i.unsubscribe) && this.add(i.unsubscribe.bind(i)),
                (i.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = i),
            (this._next = s),
            (this._error = n),
            (this._complete = o);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            s.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = s;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : i(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              i(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              s.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), s.useDeprecatedSynchronousErrorHandling))
              throw n;
            i(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!s.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return s.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (i(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const _ = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function m(t) {
        return t;
      }
      let y = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              o = (function (t, e, n) {
                if (t) {
                  if (t instanceof p) return t;
                  if (t[f]) return t[f]();
                }
                return t || e || n ? new p(t, e, n) : new p(l);
              })(t, e, n);
            if (
              (o.add(
                r
                  ? r.call(o, this.source)
                  : this.source ||
                    (s.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              s.useDeprecatedSynchronousErrorHandling &&
                o.syncErrorThrowable &&
                ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              s.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof p ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = w(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (o) {
                    n(o), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [_]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? m
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = w(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function w(t) {
        if ((t || (t = s.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const v = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class b extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class x extends p {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let C = (() => {
        class t extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [f]() {
            return new x(this);
          }
          lift(t) {
            const e = new k(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new v();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let o = 0; o < n; o++) r[o].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new v();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let o = 0; o < n; o++) r[o].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new v();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new v();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new v();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new b(this, t));
          }
          asObservable() {
            const t = new y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new k(t, e)), t;
      })();
      class k extends C {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      class E {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new T(t, this.project, this.thisArg));
        }
      }
      class T extends p {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const A = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function I() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const S = I();
      const M = (t) => {
        if (t && "function" == typeof t[_])
          return (
            (s = t),
            (t) => {
              const e = s[_]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if ((e = t) && "number" == typeof e.length && "function" != typeof e)
          return A(t);
        var e, n, r, o, s;
        if (
          (n = t) &&
          "function" != typeof n.subscribe &&
          "function" == typeof n.then
        )
          return (
            (o = t),
            (t) => (
              o
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, i),
              t
            )
          );
        if (t && "function" == typeof t[S])
          return (
            (r = t),
            (t) => {
              const e = r[S]();
              for (;;) {
                let r;
                try {
                  r = e.next();
                } catch (n) {
                  return t.error(n), t;
                }
                if (r.done) {
                  t.complete();
                  break;
                }
                if ((t.next(r.value), t.closed)) break;
              }
              return (
                "function" == typeof e.return &&
                  t.add(() => {
                    e.return && e.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
      };
      class P extends p {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class O extends p {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function D(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                D((n, r) => {
                  return ((o = t(n, r)), o instanceof y ? o : new y(M(o))).pipe(
                    (function (t, e) {
                      return function (e) {
                        return e.lift(new E(t, void 0));
                      };
                    })((t, o) => e(n, t, r, o))
                  );
                  var o;
                }, n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new j(t, n)));
      }
      class j {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new R(t, this.project, this.concurrent));
        }
      }
      class R extends O {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new P(this),
            n = this.destination;
          n.add(e);
          const r = (function (t, e) {
            if (!e.closed) return t instanceof y ? t.subscribe(e) : M(t)(e);
          })(t, e);
          r !== e && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function N() {
        return function (t) {
          return t.lift(new H(t));
        };
      }
      class H {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new V(t, n),
            o = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), o;
        }
      }
      class V extends p {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class F extends y {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new Z(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return N()(this);
        }
      }
      const L = (() => {
        const t = F.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class Z extends x {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function z() {
        return new C();
      }
      function B(t) {
        for (let e in t) if (t[e] === B) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function G(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(G).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function $(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const U = B({ __forward_ref__: B });
      function W(t) {
        return (
          (t.__forward_ref__ = W),
          (t.toString = function () {
            return G(this());
          }),
          t
        );
      }
      function q(t) {
        return "function" == typeof (e = t) &&
          e.hasOwnProperty(U) &&
          e.__forward_ref__ === W
          ? t()
          : t;
        var e;
      }
      function Q(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function J(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function Y(t) {
        return K(t, tt) || K(t, nt);
      }
      function K(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function X(t) {
        return t && (t.hasOwnProperty(et) || t.hasOwnProperty(rt))
          ? t[et]
          : null;
      }
      const tt = B({ "\u0275prov": B }),
        et = B({ "\u0275inj": B }),
        nt = B({ ngInjectableDef: B }),
        rt = B({ ngInjectorDef: B });
      var ot = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      let st;
      function it(t) {
        const e = st;
        return (st = t), e;
      }
      function lt(t, e, n) {
        const r = Y(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & ot.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${G(t)}]`);
      }
      function at(t) {
        return { toString: t }.toString();
      }
      var ct = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        ut = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const ht = "undefined" != typeof globalThis && globalThis,
        dt = "undefined" != typeof window && window,
        ft =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        pt = "undefined" != typeof global && global,
        gt = ht || pt || dt || ft,
        _t = {},
        mt = [],
        yt = B({ "\u0275cmp": B }),
        wt = B({ "\u0275dir": B }),
        vt = B({ "\u0275pipe": B }),
        bt = B({ "\u0275mod": B }),
        xt = B({ "\u0275loc": B }),
        Ct = B({ "\u0275fac": B }),
        kt = B({ __NG_ELEMENT_ID__: B });
      let Et = 0;
      function Tt(t) {
        return at(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === ct.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || mt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || ut.Emulated,
              id: "c",
              styles: t.styles || mt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            o = t.features,
            s = t.pipes;
          return (
            (n.id += Et++),
            (n.inputs = Pt(t.inputs, e)),
            (n.outputs = Pt(t.outputs)),
            o && o.forEach((t) => t(n)),
            (n.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(At)
              : null),
            (n.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(It)
              : null),
            n
          );
        });
      }
      function At(t) {
        return (
          Dt(t) ||
          (function (t) {
            return t[wt] || null;
          })(t)
        );
      }
      function It(t) {
        return (function (t) {
          return t[vt] || null;
        })(t);
      }
      const St = {};
      function Mt(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || mt,
          declarations: t.declarations || mt,
          imports: t.imports || mt,
          exports: t.exports || mt,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            at(() => {
              St[t.id] = t.type;
            }),
          e
        );
      }
      function Pt(t, e) {
        if (null == t) return _t;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let o = t[r],
              s = o;
            Array.isArray(o) && ((s = o[1]), (o = o[0])),
              (n[o] = r),
              e && (e[o] = s);
          }
        return n;
      }
      const Ot = Tt;
      function Dt(t) {
        return t[yt] || null;
      }
      function jt(t, e) {
        const n = t[bt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${G(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Rt = 20,
        Nt = 10;
      function Ht(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Vt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Ft(t) {
        return 0 != (8 & t.flags);
      }
      function Lt(t) {
        return 2 == (2 & t.flags);
      }
      function Zt(t) {
        return 1 == (1 & t.flags);
      }
      function zt(t) {
        return null !== t.template;
      }
      function Bt(t, e) {
        return t.hasOwnProperty(Ct) ? t[Ct] : null;
      }
      class Gt extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function $t(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function Ut(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : $t(t);
      }
      function Wt(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new Gt("201", `No provider for ${Ut(t)} found${n}`);
      }
      class qt {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Qt() {
        const t = Yt(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === _t) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function Jt(t, e, n, r) {
        const o =
            Yt(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: _t, current: null }),
          s = o.current || (o.current = {}),
          i = o.previous,
          l = this.declaredInputs[n],
          a = i[l];
        (s[l] = new qt(a && a.currentValue, e, i === _t)), (t[r] = e);
      }
      function Yt(t) {
        return t.__ngSimpleChanges__ || null;
      }
      const Kt = "http://www.w3.org/2000/svg";
      let Xt;
      function te(t) {
        return !!t.listen;
      }
      const ee = {
        createRenderer: (t, e) =>
          void 0 !== Xt
            ? Xt
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function ne(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function re(t, e) {
        return ne(e[t.index]);
      }
      function oe(t, e) {
        return t.data[e];
      }
      function se(t, e) {
        const n = e[t];
        return Ht(n) ? n : n[0];
      }
      function ie(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function le(t) {
        return 128 == (128 & t[2]);
      }
      function ae(t, e) {
        return null == e ? null : t[e];
      }
      function ce(t) {
        t[18] = 0;
      }
      function ue(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const he = {
        lFrame: Me(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function de() {
        return he.bindingsEnabled;
      }
      function fe() {
        return he.lFrame.lView;
      }
      function pe() {
        return he.lFrame.tView;
      }
      function ge(t) {
        he.lFrame.contextLView = t;
      }
      function _e() {
        let t = me();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function me() {
        return he.lFrame.currentTNode;
      }
      function ye(t, e) {
        const n = he.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function we() {
        return he.lFrame.isParent;
      }
      function ve() {
        return he.isInCheckNoChangesMode;
      }
      function be(t) {
        he.isInCheckNoChangesMode = t;
      }
      function xe() {
        return he.lFrame.bindingIndex++;
      }
      function Ce(t, e) {
        const n = he.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), ke(e);
      }
      function ke(t) {
        he.lFrame.currentDirectiveIndex = t;
      }
      function Ee(t) {
        he.lFrame.currentQueryIndex = t;
      }
      function Te(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function Ae(t, e, n) {
        if (n & ot.SkipSelf) {
          let r = e,
            o = t;
          for (
            ;
            (r = r.parent),
              !(
                null !== r ||
                n & ot.Host ||
                ((r = Te(o)), null === r) ||
                ((o = o[15]), 10 & r.type)
              );

          );
          if (null === r) return !1;
          (e = r), (t = o);
        }
        const r = (he.lFrame = Se());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function Ie(t) {
        const e = Se(),
          n = t[1];
        (he.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Se() {
        const t = he.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Me(t) : e;
      }
      function Me(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Pe() {
        const t = he.lFrame;
        return (
          (he.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const Oe = Pe;
      function De() {
        const t = Pe();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function je() {
        return he.lFrame.selectedIndex;
      }
      function Re(t) {
        he.lFrame.selectedIndex = t;
      }
      function Ne() {
        he.lFrame.currentNamespace = Kt;
      }
      function He() {
        he.lFrame.currentNamespace = null;
      }
      function Ve(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: o,
              ngAfterViewInit: s,
              ngAfterViewChecked: i,
              ngOnDestroy: l,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            o &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, o),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, o)),
            s && (t.viewHooks || (t.viewHooks = [])).push(-n, s),
            i &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, i),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, i)),
            null != l && (t.destroyHooks || (t.destroyHooks = [])).push(n, l);
        }
      }
      function Fe(t, e, n) {
        ze(t, e, 3, n);
      }
      function Le(t, e, n, r) {
        (3 & t[2]) === n && ze(t, e, n, r);
      }
      function Ze(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function ze(t, e, n, r) {
        const o = null != r ? r : -1,
          s = e.length - 1;
        let i = 0;
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < s; l++)
          if ("number" == typeof e[l + 1]) {
            if (((i = e[l]), null != r && i >= r)) break;
          } else
            e[l] < 0 && (t[18] += 65536),
              (i < o || -1 == o) &&
                (Be(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function Be(t, e, n, r) {
        const o = n[r] < 0,
          s = n[r + 1],
          i = t[o ? -n[r] : n[r]];
        o
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), s.call(i))
          : s.call(i);
      }
      const Ge = -1;
      class $e {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function Ue(t, e, n) {
        const r = te(t);
        let o = 0;
        for (; o < n.length; ) {
          const s = n[o];
          if ("number" == typeof s) {
            if (0 !== s) break;
            o++;
            const i = n[o++],
              l = n[o++],
              a = n[o++];
            r ? t.setAttribute(e, l, a, i) : e.setAttributeNS(i, l, a);
          } else {
            const i = s,
              l = n[++o];
            We(i)
              ? r && t.setProperty(e, i, l)
              : r
              ? t.setAttribute(e, i, l)
              : e.setAttribute(i, l),
              o++;
          }
        }
        return o;
      }
      function We(t) {
        return 64 === t.charCodeAt(0);
      }
      function qe(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const o = e[r];
            "number" == typeof o
              ? (n = o)
              : 0 === n ||
                Qe(t, n, o, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function Qe(t, e, n, r, o) {
        let s = 0,
          i = t.length;
        if (-1 === e) i = -1;
        else
          for (; s < t.length; ) {
            const n = t[s++];
            if ("number" == typeof n) {
              if (n === e) {
                i = -1;
                break;
              }
              if (n > e) {
                i = s - 1;
                break;
              }
            }
          }
        for (; s < t.length; ) {
          const e = t[s];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== o && (t[s + 1] = o));
            if (r === t[s + 1]) return void (t[s + 2] = o);
          }
          s++, null !== r && s++, null !== o && s++;
        }
        -1 !== i && (t.splice(i, 0, e), (s = i + 1)),
          t.splice(s++, 0, n),
          null !== r && t.splice(s++, 0, r),
          null !== o && t.splice(s++, 0, o);
      }
      function Je(t) {
        return t !== Ge;
      }
      function Ye(t) {
        return 32767 & t;
      }
      function Ke(t, e) {
        let n = t >> 16,
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Xe = !0;
      function tn(t) {
        const e = Xe;
        return (Xe = t), e;
      }
      let en = 0;
      function nn(t, e) {
        const n = on(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          rn(r.data, t),
          rn(e, null),
          rn(r.blueprint, null));
        const o = sn(t, e),
          s = t.injectorIndex;
        if (Je(o)) {
          const t = Ye(o),
            n = Ke(o, e),
            r = n[1].data;
          for (let o = 0; o < 8; o++) e[s + o] = n[t + o] | r[t + o];
        }
        return (e[s + 8] = o), s;
      }
      function rn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function on(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function sn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          o = e;
        for (; null !== o; ) {
          const t = o[1],
            e = t.type;
          if (((r = 2 === e ? t.declTNode : 1 === e ? o[6] : null), null === r))
            return Ge;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Ge;
      }
      function ln(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(kt) && (r = n[kt]),
            null == r && (r = n[kt] = en++);
          const o = 255 & r;
          e.data[t + (o >> 5)] |= 1 << o;
        })(t, e, n);
      }
      function an(t, e, n) {
        if (n & ot.Optional) return t;
        Wt(e, "NodeInjector");
      }
      function cn(t, e, n, r) {
        if (
          (n & ot.Optional && void 0 === r && (r = null),
          0 == (n & (ot.Self | ot.Host)))
        ) {
          const o = t[9],
            s = it(void 0);
          try {
            return o ? o.get(e, r, n & ot.Optional) : lt(e, r, n & ot.Optional);
          } finally {
            it(s);
          }
        }
        return an(r, e, n);
      }
      function un(t, e, n, r = ot.Default, o) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(kt) ? t[kt] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : dn) : e;
          })(n);
          if ("function" == typeof s) {
            if (!Ae(e, t, r)) return r & ot.Host ? an(o, n, r) : cn(e, n, r, o);
            try {
              const t = s();
              if (null != t || r & ot.Optional) return t;
              Wt(n);
            } finally {
              Oe();
            }
          } else if ("number" == typeof s) {
            let o = null,
              i = on(t, e),
              l = Ge,
              a = r & ot.Host ? e[16][6] : null;
            for (
              (-1 === i || r & ot.SkipSelf) &&
              ((l = -1 === i ? sn(t, e) : e[i + 8]),
              l !== Ge && _n(r, !1)
                ? ((o = e[1]), (i = Ye(l)), (e = Ke(l, e)))
                : (i = -1));
              -1 !== i;

            ) {
              const t = e[1];
              if (gn(s, i, t.data)) {
                const t = fn(i, e, n, o, r, a);
                if (t !== hn) return t;
              }
              (l = e[i + 8]),
                l !== Ge && _n(r, e[1].data[i + 8] === a) && gn(s, i, e)
                  ? ((o = t), (i = Ye(l)), (e = Ke(l, e)))
                  : (i = -1);
            }
          }
        }
        return cn(e, n, r, o);
      }
      const hn = {};
      function dn() {
        return new mn(_e(), fe());
      }
      function fn(t, e, n, r, o, s) {
        const i = e[1],
          l = i.data[t + 8],
          a = (function (t, e, n, r, o) {
            const s = t.providerIndexes,
              i = e.data,
              l = 1048575 & s,
              a = t.directiveStart,
              c = s >> 20,
              u = o ? l + c : t.directiveEnd;
            for (let h = r ? l : l + c; h < u; h++) {
              const t = i[h];
              if ((h < a && n === t) || (h >= a && t.type === n)) return h;
            }
            if (o) {
              const t = i[a];
              if (t && zt(t) && t.type === n) return a;
            }
            return null;
          })(
            l,
            i,
            n,
            null == r ? Lt(l) && Xe : r != i && 0 != (3 & l.type),
            o & ot.Host && s === l
          );
        return null !== a ? pn(e, i, a, l) : hn;
      }
      function pn(t, e, n, r) {
        let o = t[n];
        const s = e.data;
        if (o instanceof $e) {
          const i = o;
          i.resolving &&
            (function (t, e) {
              throw new Gt(
                "200",
                `Circular dependency in DI detected for ${t}`
              );
            })(Ut(s[n]));
          const l = tn(i.canSeeViewProviders);
          i.resolving = !0;
          const a = i.injectImpl ? it(i.injectImpl) : null;
          Ae(t, r, ot.Default);
          try {
            (o = t[n] = i.factory(void 0, s, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (r) {
                    const r =
                      ((i = e).type.prototype.ngOnChanges && (i.setInput = Jt),
                      Qt);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r);
                  }
                  var i;
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, o),
                    s &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s));
                })(n, s[n], e);
          } finally {
            null !== a && it(a), tn(l), (i.resolving = !1), Oe();
          }
        }
        return o;
      }
      function gn(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function _n(t, e) {
        return !(t & ot.Self || (t & ot.Host && e));
      }
      class mn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return un(this._tNode, this._lView, t, void 0, e);
        }
      }
      const yn = "__parameters__";
      function wn(t, e, n) {
        return at(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function o(...t) {
            if (this instanceof o) return r.apply(this, t), this;
            const e = new o(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const o = t.hasOwnProperty(yn)
                ? t[yn]
                : Object.defineProperty(t, yn, { value: [] })[yn];
              for (; o.length <= r; ) o.push(null);
              return (o[r] = o[r] || []).push(e), t;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = t),
            (o.annotationCls = o),
            o
          );
        });
      }
      class vn {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = Q({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function bn(t, e) {
        t.forEach((t) => (Array.isArray(t) ? bn(t, e) : e(t)));
      }
      function xn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Cn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      const kn = {},
        En = /\n/gm,
        Tn = "__source",
        An = B({ provide: String, useValue: B });
      let In;
      function Sn(t) {
        const e = In;
        return (In = t), e;
      }
      function Mn(t, e = ot.Default) {
        if (void 0 === In)
          throw new Error("inject() must be called from an injection context");
        return null === In
          ? lt(t, void 0, e)
          : In.get(t, e & ot.Optional ? null : void 0, e);
      }
      function Pn(t, e = ot.Default) {
        return (st || Mn)(q(t), e);
      }
      function On(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = q(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t,
              n = ot.Default;
            for (let e = 0; e < r.length; e++) {
              const o = r[e],
                s = o.__NG_DI_FLAG__;
              "number" == typeof s
                ? -1 === s
                  ? (t = o.token)
                  : (n |= s)
                : (t = o);
            }
            e.push(Pn(t, n));
          } else e.push(Pn(r));
        }
        return e;
      }
      function Dn(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t;
      }
      const jn = Dn(
          wn("Inject", (t) => ({ token: t })),
          -1
        ),
        Rn = Dn(wn("Optional"), 8),
        Nn = Dn(wn("SkipSelf"), 4);
      function Hn(t) {
        return t.ngDebugContext;
      }
      function Vn(t) {
        return t.ngOriginalError;
      }
      function Fn(t, ...e) {
        t.error(...e);
      }
      class Ln {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || Fn;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (Hn(t) ? Hn(t) : this._findContext(Vn(t))) : null;
        }
        _findOriginalError(t) {
          let e = Vn(t);
          for (; e && Vn(e); ) e = Vn(e);
          return e;
        }
      }
      function Zn(t, e) {
        t.__ngContext__ = e;
      }
      const zn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(gt))();
      function Bn(t) {
        return t instanceof Function ? t() : t;
      }
      var Gn = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      function $n(t, e) {
        return (void 0)(t, e);
      }
      function Un(t) {
        const e = t[3];
        return Vt(e) ? e[3] : e;
      }
      function Wn(t) {
        return Qn(t[13]);
      }
      function qn(t) {
        return Qn(t[4]);
      }
      function Qn(t) {
        for (; null !== t && !Vt(t); ) t = t[4];
        return t;
      }
      function Jn(t, e, n, r, o) {
        if (null != r) {
          let s,
            i = !1;
          Vt(r) ? (s = r) : Ht(r) && ((i = !0), (r = r[0]));
          const l = ne(r);
          0 === t && null !== n
            ? null == o
              ? rr(e, n, l)
              : nr(e, n, l, o || null, !0)
            : 1 === t && null !== n
            ? nr(e, n, l, o || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = sr(t, e);
                r &&
                  (function (t, e, n, r) {
                    te(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, l, i)
            : 3 === t && e.destroyNode(l),
            null != s &&
              (function (t, e, n, r, o) {
                const s = n[7];
                s !== ne(n) && Jn(e, t, r, s, o);
                for (let i = Nt; i < n.length; i++) {
                  const o = n[i];
                  ur(o[1], o, t, e, r, s);
                }
              })(e, t, s, n, o);
        }
      }
      function Yn(t, e, n) {
        return te(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function Kn(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          o = e[3];
        1024 & e[2] && ((e[2] &= -1025), ue(o, -1)), n.splice(r, 1);
      }
      function Xn(t, e) {
        if (t.length <= Nt) return;
        const n = Nt + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && Kn(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const i = Cn(t, Nt + e);
          ur(r[1], (o = r), o[11], 2, null, null), (o[0] = null), (o[6] = null);
          const l = i[19];
          null !== l && l.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        var o;
        return r;
      }
      function tr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          te(n) && n.destroyNode && ur(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return er(t[1], t);
              for (; e; ) {
                let n = null;
                if (Ht(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Ht(e) && er(e[1], e), (e = e[3]);
                  null === e && (e = t), Ht(e) && er(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function er(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof $e)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let o = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const t = n[s + 1],
                      i = "function" == typeof t ? t(e) : ne(e[t]),
                      l = r[(o = n[s + 2])],
                      a = n[s + 3];
                    "boolean" == typeof a
                      ? i.removeEventListener(n[s], l, a)
                      : a >= 0
                      ? r[(o = a)]()
                      : r[(o = -a)].unsubscribe(),
                      (s += 2);
                  } else {
                    const t = r[(o = n[s + 1])];
                    n[s].call(t);
                  }
              if (null !== r) {
                for (let t = o + 1; t < r.length; t++) (0, r[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && te(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && Vt(e[3])) {
            n !== e[3] && Kn(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function nr(t, e, n, r, o) {
        te(t) ? t.insertBefore(e, n, r, o) : e.insertBefore(n, r, o);
      }
      function rr(t, e, n) {
        te(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function or(t, e, n, r, o) {
        null !== r ? nr(t, e, n, r, o) : rr(t, e, n);
      }
      function sr(t, e) {
        return te(t) ? t.parentNode(e) : e.parentNode;
      }
      function ir(t, e, n, r) {
        const o = (function (t, e, n) {
            return (function (t, e, n) {
              let r = e;
              for (; null !== r && 40 & r.type; ) r = (e = r).parent;
              if (null === r) return n[0];
              if (2 & r.flags) {
                const e = t.data[r.directiveStart].encapsulation;
                if (e === ut.None || e === ut.Emulated) return null;
              }
              return re(r, n);
            })(t, e.parent, n);
          })(t, r, e),
          s = e[11],
          i = (function (t, e, n) {
            return (function (t, e, n) {
              return 40 & t.type ? re(t, n) : null;
            })(t, 0, n);
          })(r.parent || e[6], 0, e);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) or(s, o, n[l], i, !1);
          else or(s, o, n, i, !1);
      }
      function lr(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return re(e, t);
          if (4 & n) return ar(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return lr(t, n);
            {
              const n = t[e.index];
              return Vt(n) ? ar(-1, n) : ne(n);
            }
          }
          if (32 & n) return $n(e, t)() || ne(t[e.index]);
          {
            const n = t[16],
              r = n[6],
              o = Un(n),
              s = r.projection[e.projection];
            return null != s ? lr(o, s) : lr(t, e.next);
          }
        }
        return null;
      }
      function ar(t, e) {
        const n = Nt + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r) return lr(t, r);
        }
        return e[7];
      }
      function cr(t, e, n, r, o, s, i) {
        for (; null != n; ) {
          const l = r[n.index],
            a = n.type;
          if (
            (i && 0 === e && (l && Zn(ne(l), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & a) cr(t, e, n.child, r, o, s, !1), Jn(e, t, o, l, s);
            else if (32 & a) {
              const i = $n(n, r);
              let a;
              for (; (a = i()); ) Jn(e, t, o, a, s);
              Jn(e, t, o, l, s);
            } else 16 & a ? hr(t, e, r, n, o, s) : Jn(e, t, o, l, s);
          n = i ? n.projectionNext : n.next;
        }
      }
      function ur(t, e, n, r, o, s) {
        cr(n, r, t.firstChild, e, o, s, !1);
      }
      function hr(t, e, n, r, o, s) {
        const i = n[16],
          l = i[6].projection[r.projection];
        if (Array.isArray(l))
          for (let a = 0; a < l.length; a++) Jn(e, t, o, l[a], s);
        else cr(t, e, l, i[3], o, s, !0);
      }
      function dr(t, e, n) {
        te(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function fr(t, e, n) {
        te(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function pr(t, e, n) {
        let r = t.length;
        for (;;) {
          const o = t.indexOf(e, n);
          if (-1 === o) return o;
          if (0 === o || t.charCodeAt(o - 1) <= 32) {
            const n = e.length;
            if (o + n === r || t.charCodeAt(o + n) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const gr = "ng-template";
      function _r(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let o = t[r++];
          if (n && "class" === o) {
            if (((o = t[r]), -1 !== pr(o.toLowerCase(), e, 0))) return !0;
          } else if (1 === o) {
            for (; r < t.length && "string" == typeof (o = t[r++]); )
              if (o.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function mr(t) {
        return 4 === t.type && t.value !== gr;
      }
      function yr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : gr);
      }
      function wr(t, e, n) {
        let r = 4;
        const o = t.attrs || [],
          s = (function (t) {
            for (let n = 0; n < t.length; n++)
              if (3 === (e = t[n]) || 4 === e || 6 === e) return n;
            var e;
            return t.length;
          })(o);
        let i = !1;
        for (let l = 0; l < e.length; l++) {
          const a = e[l];
          if ("number" != typeof a) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== a && !yr(t, a, n)) || ("" === a && 1 === e.length))
                ) {
                  if (vr(r)) return !1;
                  i = !0;
                }
              } else {
                const c = 8 & r ? a : e[++l];
                if (8 & r && null !== t.attrs) {
                  if (!_r(t.attrs, c, n)) {
                    if (vr(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const u = br(8 & r ? "class" : a, o, mr(t), n);
                if (-1 === u) {
                  if (vr(r)) return !1;
                  i = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > s ? "" : o[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== pr(e, c, 0)) || (2 & r && c !== t)) {
                    if (vr(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !vr(r) && !vr(a)) return !1;
            if (i && vr(a)) continue;
            (i = !1), (r = a | (1 & r));
          }
        }
        return vr(r) || i;
      }
      function vr(t) {
        return 0 == (1 & t);
      }
      function br(t, e, n, r) {
        if (null === e) return -1;
        let o = 0;
        if (r || !n) {
          let n = !1;
          for (; o < e.length; ) {
            const r = e[o];
            if (r === t) return o;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++o];
                for (; "string" == typeof t; ) t = e[++o];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                o += 4;
                continue;
              }
            }
            o += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function xr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (wr(t, e[r], n)) return !0;
        return !1;
      }
      function Cr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function kr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          o = "",
          s = !1;
        for (; n < t.length; ) {
          let i = t[n];
          if ("string" == typeof i)
            if (2 & r) {
              const e = t[++n];
              o += "[" + i + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (o += "." + i) : 4 & r && (o += " " + i);
          else
            "" === o || vr(i) || ((e += Cr(s, o)), (o = "")),
              (r = i),
              (s = s || !vr(r));
          n++;
        }
        return "" !== o && (e += Cr(s, o)), e;
      }
      const Er = {};
      function Tr(t) {
        Ar(pe(), fe(), je() + t, ve());
      }
      function Ar(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && Fe(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && Le(e, r, 0, n);
          }
        Re(n);
      }
      function Ir(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              s = n[r + 1];
            if (-1 !== s) {
              const n = t.data[s];
              Ee(o), n.contentQueries(2, e[s], s);
            }
          }
      }
      function Sr(t, e, n, r, o, s, i, l, a, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = o),
          (u[2] = 140 | r),
          ce(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = i || (t && t[10])),
          (u[11] = l || (t && t[11])),
          (u[12] = a || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = s),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Mr(t, e, n, r, o) {
        let s = t.data[e];
        if (null === s)
          (s = (function (t, e, n, r, o) {
            const s = me(),
              i = we(),
              l = (t.data[e] = (function (t, e, n, r, o, s) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, i ? s : s && s.parent, n, e, r, o));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== s &&
                (i
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(t, e, n, r, o)),
            he.lFrame.inI18n && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = n), (s.value = r), (s.attrs = o);
          const t = (function () {
            const t = he.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return ye(s, !0), s;
      }
      function Pr(t, e, n, r) {
        if (0 === n) return -1;
        const o = e.length;
        for (let s = 0; s < n; s++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return o;
      }
      function Or(t, e, n) {
        Ie(e);
        try {
          const r = t.viewQuery;
          null !== r && so(1, r, n);
          const o = t.template;
          null !== o && Rr(t, e, o, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Ir(t, e),
            t.staticViewQueries && so(2, t.viewQuery, n);
          const s = t.components;
          null !== s &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) to(t, e[n]);
            })(e, s);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), De();
        }
      }
      function Dr(t, e, n, r) {
        const o = e[2];
        if (256 == (256 & o)) return;
        Ie(e);
        const s = ve();
        try {
          ce(e),
            (he.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Rr(t, e, n, 2, r);
          const i = 3 == (3 & o);
          if (!s)
            if (i) {
              const n = t.preOrderCheckHooks;
              null !== n && Fe(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && Le(e, n, 0, null), Ze(e, 0);
            }
          if (
            ((function (t) {
              for (let e = Wn(t); null !== e; e = qn(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && ue(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = Wn(t); null !== e; e = qn(e))
                for (let t = Nt; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  le(n) && Dr(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Ir(t, e),
            !s)
          )
            if (i) {
              const n = t.contentCheckHooks;
              null !== n && Fe(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && Le(e, n, 1), Ze(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t];
                  if (r < 0) Re(~r);
                  else {
                    const o = r,
                      s = n[++t],
                      i = n[++t];
                    Ce(s, o), i(2, e[o]);
                  }
                }
              } finally {
                Re(-1);
              }
          })(t, e);
          const l = t.components;
          null !== l &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Kr(t, e[n]);
            })(e, l);
          const a = t.viewQuery;
          if ((null !== a && so(2, a, r), !s))
            if (i) {
              const n = t.viewCheckHooks;
              null !== n && Fe(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && Le(e, n, 2), Ze(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), ue(e[3], -1));
        } finally {
          De();
        }
      }
      function jr(t, e, n, r) {
        const o = e[10],
          s = !ve(),
          i = 4 == (4 & e[2]);
        try {
          s && !i && o.begin && o.begin(), i && Or(t, e, r), Dr(t, e, n, r);
        } finally {
          s && !i && o.end && o.end();
        }
      }
      function Rr(t, e, n, r, o) {
        const s = je();
        try {
          Re(-1), 2 & r && e.length > Rt && Ar(t, e, Rt, ve()), n(r, o);
        } finally {
          Re(s);
        }
      }
      function Nr(t, e, n) {
        de() &&
          ((function (t, e, n, r) {
            const o = n.directiveStart,
              s = n.directiveEnd;
            t.firstCreatePass || nn(n, e), Zn(r, e);
            const i = n.initialInputs;
            for (let l = o; l < s; l++) {
              const r = t.data[l],
                s = zt(r);
              s && qr(e, n, r);
              const a = pn(e, t, l, n);
              Zn(a, e),
                null !== i && Qr(0, l - o, a, r, 0, i),
                s && (se(n.index, e)[8] = a);
            }
          })(t, e, n, re(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                s = n.index,
                i = he.lFrame.currentDirectiveIndex;
              try {
                Re(s);
                for (let n = r; n < o; n++) {
                  const r = t.data[n],
                    o = e[n];
                  ke(n),
                    (null === r.hostBindings &&
                      0 === r.hostVars &&
                      null === r.hostAttrs) ||
                      Br(r, o);
                }
              } finally {
                Re(-1), ke(i);
              }
            })(t, e, n));
      }
      function Hr(t, e, n = re) {
        const r = e.localNames;
        if (null !== r) {
          let o = e.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const i = r[s + 1],
              l = -1 === i ? n(e, t) : t[i];
            t[o++] = l;
          }
        }
      }
      function Vr(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Fr(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Fr(t, e, n, r, o, s, i, l, a, c) {
        const u = Rt + r,
          h = u + o,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : Er);
            return n;
          })(u, h),
          f = "function" == typeof c ? c() : c;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: l,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof i ? i() : i,
          firstChild: null,
          schemas: a,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function Lr(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const o = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, o)
              : (n[r] = [e, o]);
          }
        return n;
      }
      function Zr(t, e, n, r) {
        let o = !1;
        if (de()) {
          const s = (function (t, e, n) {
              const r = t.directiveRegistry;
              let o = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const i = r[s];
                  xr(n, i.selectors, !1) &&
                    (o || (o = []),
                    ln(nn(n, e), t, i.type),
                    zt(i) ? (Gr(t, n), o.unshift(i)) : o.push(i));
                }
              return o;
            })(t, e, n),
            i = null === r ? null : { "": -1 };
          if (null !== s) {
            (o = !0), Ur(n, t.data.length, s.length);
            for (let t = 0; t < s.length; t++) {
              const e = s[t];
              e.providersResolver && e.providersResolver(e);
            }
            let r = !1,
              l = !1,
              a = Pr(t, e, s.length, null);
            for (let o = 0; o < s.length; o++) {
              const c = s[o];
              (n.mergedAttrs = qe(n.mergedAttrs, c.hostAttrs)),
                Wr(t, n, e, a, c),
                $r(a, c, i),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const u = c.type.prototype;
              !r &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (r = !0)),
                l ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                a++;
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                o = e.attrs,
                s = [];
              let i = null,
                l = null;
              for (let a = e.directiveStart; a < n; a++) {
                const t = r[a],
                  n = t.inputs,
                  c = null === o || mr(e) ? null : Jr(n, o);
                s.push(c), (i = Lr(n, a, i)), (l = Lr(t.outputs, a, l));
              }
              null !== i &&
                (i.hasOwnProperty("class") && (e.flags |= 16),
                i.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = s),
                (e.inputs = i),
                (e.outputs = l);
            })(t, n);
          }
          i &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const o = n[e[t + 1]];
                  if (null == o)
                    throw new Gt(
                      "301",
                      `Export of name '${e[t + 1]}' not found!`
                    );
                  r.push(e[t], o);
                }
              }
            })(n, r, i);
        }
        return (n.mergedAttrs = qe(n.mergedAttrs, n.attrs)), o;
      }
      function zr(t, e, n, r, o, s) {
        const i = s.hostBindings;
        if (i) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const s = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != s && n.push(s),
            n.push(r, o, i);
        }
      }
      function Br(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Gr(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function $r(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          zt(e) && (n[""] = t);
        }
      }
      function Ur(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Wr(t, e, n, r, o) {
        t.data[r] = o;
        const s = o.factory || (o.factory = Bt(o.type)),
          i = new $e(s, zt(o), null);
        (t.blueprint[r] = i),
          (n[r] = i),
          zr(t, e, 0, r, Pr(t, n, o.hostVars, Er), o);
      }
      function qr(t, e, n) {
        const r = re(e, t),
          o = Vr(n),
          s = t[10],
          i = eo(
            t,
            Sr(
              t,
              o,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              s,
              s.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = i;
      }
      function Qr(t, e, n, r, o, s) {
        const i = s[e];
        if (null !== i) {
          const t = r.setInput;
          for (let e = 0; e < i.length; ) {
            const o = i[e++],
              s = i[e++],
              l = i[e++];
            null !== t ? r.setInput(n, l, o, s) : (n[s] = l);
          }
        }
      }
      function Jr(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              t.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, t[o], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Yr(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function Kr(t, e) {
        const n = se(e, t);
        if (le(n)) {
          const t = n[1];
          80 & n[2] ? Dr(t, n, t.template, n[8]) : n[5] > 0 && Xr(n);
        }
      }
      function Xr(t) {
        for (let n = Wn(t); null !== n; n = qn(n))
          for (let t = Nt; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              Dr(t, e, t.template, e[8]);
            } else e[5] > 0 && Xr(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = se(e[n], t);
            le(r) && r[5] > 0 && Xr(r);
          }
      }
      function to(t, e) {
        const n = se(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          Or(r, n, n[8]);
      }
      function eo(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function no(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Un(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e;
        }
        return null;
      }
      function ro(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          Dr(t, e, t.template, n);
        } catch (o) {
          throw (co(e, o), o);
        } finally {
          r.end && r.end();
        }
      }
      function oo(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = ie(n),
              o = r[1];
            jr(o, r, o.template, n);
          }
        })(t[8]);
      }
      function so(t, e, n) {
        Ee(0), e(t, n);
      }
      const io = (() => Promise.resolve(null))();
      function lo(t) {
        return t[7] || (t[7] = []);
      }
      function ao(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function co(t, e) {
        const n = t[9],
          r = n ? n.get(Ln, null) : null;
        r && r.handleError(e);
      }
      function uo(t, e, n, r, o) {
        for (let s = 0; s < n.length; ) {
          const i = n[s++],
            l = n[s++],
            a = e[i],
            c = t.data[i];
          null !== c.setInput ? c.setInput(a, o, r, l) : (a[l] = o);
        }
      }
      function ho(t, e, n) {
        let r = n ? t.styles : null,
          o = n ? t.classes : null,
          s = 0;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const t = e[i];
            "number" == typeof t
              ? (s = t)
              : 1 == s
              ? (o = $(o, t))
              : 2 == s && (r = $(r, t + ": " + e[++i] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = o) : (t.classesWithoutHost = o);
      }
      const fo = new vn("INJECTOR", -1);
      class po {
        get(t, e = kn) {
          if (e === kn) {
            const e = new Error(`NullInjectorError: No provider for ${G(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      const go = new vn("Set Injector scope."),
        _o = {},
        mo = {},
        yo = [];
      let wo;
      function vo() {
        return void 0 === wo && (wo = new po()), wo;
      }
      function bo(t, e = null, n = null, r) {
        return new xo(t, n, e || vo(), r);
      }
      class xo {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const o = [];
          e && bn(e, (n) => this.processProvider(n, t, e)),
            bn([t], (t) => this.processInjectorType(t, [], o)),
            this.records.set(fo, ko(void 0, this));
          const s = this.records.get(go);
          (this.scope = null != s ? s.value : null),
            (this.source = r || ("object" == typeof t ? null : G(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = kn, n = ot.Default) {
          this.assertNotDestroyed();
          const r = Sn(this);
          try {
            if (!(n & ot.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (o = t) ||
                    ("object" == typeof o && o instanceof vn)) &&
                  Y(t);
                (e = n && this.injectableDefInScope(n) ? ko(Co(t), _o) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & ot.Self ? vo() : this.parent).get(
              t,
              (e = n & ot.Optional && e === kn ? null : e)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (
                ((s.ngTempTokenPath = s.ngTempTokenPath || []).unshift(G(t)), r)
              )
                throw s;
              return (function (t, e, n, r) {
                const o = t.ngTempTokenPath;
                throw (
                  (e[Tn] && o.unshift(e[Tn]),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let o = G(e);
                    if (Array.isArray(e)) o = e.map(G).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : G(r))
                          );
                        }
                      o = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${t.replace(
                      En,
                      "\n  "
                    )}`;
                  })("\n" + t.message, o, n, r)),
                  (t.ngTokenPath = o),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Sn(r);
          }
          var o;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(G(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = q(t))) return !1;
          let r = X(t);
          const o = (null == r && t.ngModule) || void 0,
            s = void 0 === o ? t : o,
            i = -1 !== n.indexOf(s);
          if ((void 0 !== o && (r = X(o)), null == r)) return !1;
          if (null != r.imports && !i) {
            let t;
            n.push(s);
            try {
              bn(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                bn(r, (t) => this.processProvider(t, n, r || yo));
              }
          }
          this.injectorDefTypes.add(s), this.records.set(s, ko(r.factory, _o));
          const l = r.providers;
          if (null != l && !i) {
            const e = t;
            bn(l, (t) => this.processProvider(t, e, l));
          }
          return void 0 !== o && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = To((t = q(t))) ? t : q(t && t.provide);
          const o = (function (t, e, n) {
            return Eo(t)
              ? ko(void 0, t.useValue)
              : ko(
                  (function (t, e, n) {
                    let r;
                    if (To(t)) {
                      const e = q(t);
                      return Bt(e) || Co(e);
                    }
                    if (Eo(t)) r = () => q(t.useValue);
                    else if ((o = t) && o.useFactory)
                      r = () => t.useFactory(...On(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => Pn(q(t.useExisting));
                    else {
                      const e = q(t && (t.useClass || t.provide));
                      if (
                        !(function (t) {
                          return !!t.deps;
                        })(t)
                      )
                        return Bt(e) || Co(e);
                      r = () => new e(...On(t.deps));
                    }
                    var o;
                    return r;
                  })(t),
                  _o
                );
          })(t);
          if (To(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e ||
              ((e = ko(void 0, _o, !0)),
              (e.factory = () => On(e.multi)),
              this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, o);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === _o && ((e.value = mo), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Co(t) {
        const e = Y(t),
          n = null !== e ? e.factory : Bt(t);
        if (null !== n) return n;
        const r = X(t);
        if (null !== r) return r.factory;
        if (t instanceof vn)
          throw new Error(`Token ${G(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push("?");
                return n;
              })(e);
              throw new Error(
                `Can't resolve all parameters for ${G(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[tt] || t[nt]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function ko(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Eo(t) {
        return null !== t && "object" == typeof t && An in t;
      }
      function To(t) {
        return "function" == typeof t;
      }
      const Ao = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const o = bo(t, e, n, r);
          return o._resolveInjectorDefTypes(), o;
        })({ name: n }, e, t, n);
      };
      let Io = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? Ao(t, e, "")
              : Ao(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = kn),
          (t.NULL = new po()),
          (t.ɵprov = Q({ token: t, providedIn: "any", factory: () => Pn(fo) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function So(t, e) {
        Ve(ie(t)[1], _e());
      }
      let Mo = null;
      function Po() {
        if (!Mo) {
          const t = gt.Symbol;
          if (t && t.iterator) Mo = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Mo = n);
            }
          }
        }
        return Mo;
      }
      function Oo(t) {
        return (
          !!Do(t) && (Array.isArray(t) || (!(t instanceof Map) && Po() in t))
        );
      }
      function Do(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function jo(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Ro(t, e, n, r, o, s, i, l) {
        const a = fe(),
          c = pe(),
          u = t + Rt,
          h = c.firstCreatePass
            ? (function (t, e, n, r, o, s, i, l, a) {
                const c = e.consts,
                  u = Mr(e, t, 4, i || null, ae(c, l));
                Zr(e, n, u, ae(c, a)), Ve(e, u);
                const h = (u.tViews = Fr(
                  2,
                  u,
                  r,
                  o,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  c
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, c, a, e, n, r, o, s, i)
            : c.data[u];
        ye(h, !1);
        const d = a[11].createComment("");
        ir(c, a, d, h),
          Zn(d, a),
          eo(a, (a[u] = Yr(d, a, d, h))),
          Zt(h) && Nr(c, a, h),
          null != i && Hr(a, h, l);
      }
      function No(t) {
        return (function (t, e) {
          return t[e];
        })(he.lFrame.contextLView, Rt + t);
      }
      function Ho(t, e = ot.Default) {
        const n = fe();
        return null === n ? Pn(t, e) : un(_e(), n, q(t), e);
      }
      function Vo(t, e, n) {
        const r = fe();
        return (
          jo(r, xe(), e) &&
            (function (t, e, n, r, o, s, i, l) {
              const a = re(e, n);
              let c,
                u = e.inputs;
              var h;
              null != u && (c = u[r])
                ? (uo(t, n, c, r, o),
                  Lt(e) &&
                    (function (t, e) {
                      const n = se(e, t);
                      16 & n[2] || (n[2] |= 64);
                    })(n, e.index))
                : 3 & e.type &&
                  ((r =
                    "class" === (h = r)
                      ? "className"
                      : "for" === h
                      ? "htmlFor"
                      : "formaction" === h
                      ? "formAction"
                      : "innerHtml" === h
                      ? "innerHTML"
                      : "readonly" === h
                      ? "readOnly"
                      : "tabindex" === h
                      ? "tabIndex"
                      : h),
                  (o = null != i ? i(o, e.value || "", r) : o),
                  te(s)
                    ? s.setProperty(a, r, o)
                    : We(r) ||
                      (a.setProperty ? a.setProperty(r, o) : (a[r] = o)));
            })(
              pe(),
              (function () {
                const t = he.lFrame;
                return oe(t.tView, t.selectedIndex);
              })(),
              r,
              t,
              e,
              r[11],
              n
            ),
          Vo
        );
      }
      function Fo(t, e, n, r, o) {
        const s = o ? "class" : "style";
        uo(t, n, e.inputs[s], s, r);
      }
      function Lo(t, e, n, r) {
        const o = fe(),
          s = pe(),
          i = Rt + t,
          l = o[11],
          a = (o[i] = Yn(l, e, he.lFrame.currentNamespace)),
          c = s.firstCreatePass
            ? (function (t, e, n, r, o, s, i) {
                const l = e.consts,
                  a = Mr(e, t, 2, o, ae(l, s));
                return (
                  Zr(e, n, a, ae(l, i)),
                  null !== a.attrs && ho(a, a.attrs, !1),
                  null !== a.mergedAttrs && ho(a, a.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(i, s, o, 0, e, n, r)
            : s.data[i];
        ye(c, !0);
        const u = c.mergedAttrs;
        null !== u && Ue(l, a, u);
        const h = c.classes;
        null !== h && fr(l, a, h);
        const d = c.styles;
        null !== d && dr(l, a, d),
          64 != (64 & c.flags) && ir(s, o, a, c),
          0 === he.lFrame.elementDepthCount && Zn(a, o),
          he.lFrame.elementDepthCount++,
          Zt(c) &&
            (Nr(s, o, c),
            (function (t, e, n) {
              if (Ft(e)) {
                const r = e.directiveEnd;
                for (let o = e.directiveStart; o < r; o++) {
                  const e = t.data[o];
                  e.contentQueries && e.contentQueries(1, n[o], o);
                }
              }
            })(s, c, o)),
          null !== r && Hr(o, c);
      }
      function Zo() {
        let t = _e();
        we() ? (he.lFrame.isParent = !1) : ((t = t.parent), ye(t, !1));
        const e = t;
        he.lFrame.elementDepthCount--;
        const n = pe();
        n.firstCreatePass && (Ve(n, t), Ft(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Fo(n, e, fe(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Fo(n, e, fe(), e.stylesWithoutHost, !1);
      }
      function zo(t, e, n, r) {
        Lo(t, e, n, r), Zo();
      }
      function Bo(t) {
        return !!t && "function" == typeof t.then;
      }
      function Go(t, e, n = !1, r) {
        const o = fe(),
          s = pe(),
          i = _e();
        return (
          (function (t, e, n, r, o, s, i = !1, l) {
            const a = Zt(r),
              c = t.firstCreatePass && ao(t),
              u = lo(e);
            let h = !0;
            if (3 & r.type) {
              const d = re(r, e),
                f = l ? l(d) : _t,
                p = f.target || d,
                g = u.length,
                _ = l ? (t) => l(ne(t[r.index])).target : r.index;
              if (te(n)) {
                let i = null;
                if (
                  (!l &&
                    a &&
                    (i = (function (t, e, n, r) {
                      const o = t.cleanup;
                      if (null != o)
                        for (let s = 0; s < o.length - 1; s += 2) {
                          const t = o[s];
                          if (t === n && o[s + 1] === r) {
                            const t = e[7],
                              n = o[s + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (s += 2);
                        }
                      return null;
                    })(t, e, o, r.index)),
                  null !== i)
                )
                  ((i.__ngLastListenerFn__ || i).__ngNextListenerFn__ = s),
                    (i.__ngLastListenerFn__ = s),
                    (h = !1);
                else {
                  s = Uo(r, e, s, !1);
                  const t = n.listen(f.name || p, o, s);
                  u.push(s, t), c && c.push(o, _, g, g + 1);
                }
              } else
                (s = Uo(r, e, s, !0)),
                  p.addEventListener(o, s, i),
                  u.push(s),
                  c && c.push(o, _, g, i);
            } else s = Uo(r, e, s, !1);
            const d = r.outputs;
            let f;
            if (h && null !== d && (f = d[o])) {
              const t = f.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[f[n]][f[n + 1]].subscribe(s),
                    i = u.length;
                  u.push(s, t), c && c.push(o, r.index, i, -(i + 1));
                }
            }
          })(s, o, o[11], i, t, e, n, r),
          Go
        );
      }
      function $o(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return co(t, r), !1;
        }
      }
      function Uo(t, e, n, r) {
        return function o(s) {
          if (s === Function) return n;
          const i = 2 & t.flags ? se(t.index, e) : e;
          0 == (32 & e[2]) && no(i);
          let l = $o(e, n, s),
            a = o.__ngNextListenerFn__;
          for (; a; ) (l = $o(e, a, s) && l), (a = a.__ngNextListenerFn__);
          return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Wo(t, e = "") {
        const n = fe(),
          r = pe(),
          o = t + Rt,
          s = r.firstCreatePass ? Mr(r, o, 1, e, null) : r.data[o],
          i = (n[o] = (function (t, e) {
            return te(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        ir(r, n, i, s), ye(s, !1);
      }
      function qo(t, e, n) {
        const r = fe(),
          o = (function (t, e, n, r) {
            return jo(t, xe(), n) ? e + $t(n) + r : Er;
          })(r, t, e, n);
        return (
          o !== Er &&
            (function (t, e, n) {
              const r = (function (t, e) {
                return ne(e[t]);
              })(e, t);
              !(function (t, e, n) {
                te(t) ? t.setValue(e, n) : (e.textContent = n);
              })(t[11], r, n);
            })(r, je(), o),
          qo
        );
      }
      const Qo = void 0;
      var Jo = [
        "en",
        [["a", "p"], ["AM", "PM"], Qo],
        [["AM", "PM"], Qo, Qo],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Qo,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Qo,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Qo, "{1} 'at' {0}", Qo],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Yo = {};
      function Ko(t) {
        return (
          t in Yo ||
            (Yo[t] =
              gt.ng &&
              gt.ng.common &&
              gt.ng.common.locales &&
              gt.ng.common.locales[t]),
          Yo[t]
        );
      }
      var Xo = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      const ts = "en-US";
      let es = ts;
      function ns(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                `ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (es = t.toLowerCase().replace(/_/g, "-"));
      }
      class rs {}
      class os {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${G(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let ss = (() => {
        class t {}
        return (t.NULL = new os()), t;
      })();
      function is(...t) {}
      function ls(t, e) {
        return new cs(re(t, e));
      }
      const as = function () {
        return ls(_e(), fe());
      };
      let cs = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = as), t;
      })();
      class us {}
      let hs = (() => {
        class t {}
        return (
          (t.ɵprov = Q({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class ds {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const fs = new ds("11.1.1");
      class ps {
        constructor() {}
        supports(t) {
          return Oo(t);
        }
        create(t) {
          return new _s(t);
        }
      }
      const gs = (t, e) => e;
      class _s {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || gs);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            o = null;
          for (; e || n; ) {
            const s = !n || (e && e.currentIndex < vs(n, r, o)) ? e : n,
              i = vs(s, r, o),
              l = s.currentIndex;
            if (s === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const t = i - r,
                e = l - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < o.length ? o[n] : (o[n] = 0),
                    s = r + n;
                  e <= s && s < t && (o[n] = r + 1);
                }
                o[s.previousIndex] = e - t;
              }
            }
            i !== l && t(s, i, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Oo(t)))
            throw new Error(
              `Error trying to diff '${G(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            o = this._itHead,
            s = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== o && Object.is(o.trackById, r)
                  ? (s && (o = this._verifyReinsertion(o, n, r, e)),
                    Object.is(o.item, n) || this._addIdentityChange(o, n))
                  : ((o = this._mismatch(o, n, r, e)), (s = !0)),
                (o = o._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Po()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== o && Object.is(o.trackById, r)
                    ? (s && (o = this._verifyReinsertion(o, t, r, e)),
                      Object.is(o.item, t) || this._addIdentityChange(o, t))
                    : ((o = this._mismatch(o, t, r, e)), (s = !0)),
                  (o = o._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(o), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, o, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, o, r))
              : (t = this._addAfter(new ms(e, n), o, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new ws()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ws()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class ms {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class ys {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class ws {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new ys()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function vs(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + e + o;
      }
      class bs {
        constructor() {}
        supports(t) {
          return t instanceof Map || Do(t);
        }
        create() {
          return new xs();
        }
      }
      class xs {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Do(t)))
              throw new Error(
                `Error trying to diff '${G(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              o = n._next;
            return (
              r && (r._next = o),
              o && (o._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new Cs(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class Cs {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function ks() {
        return new Es([new ps()]);
      }
      let Es = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || ks()),
              deps: [[t, new Nn(), new Rn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (null != e) return e;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${
                ((n = t), n.name || typeof n)
              }'`
            );
            var n;
          }
        }
        return (t.ɵprov = Q({ token: t, providedIn: "root", factory: ks })), t;
      })();
      function Ts() {
        return new As([new bs()]);
      }
      let As = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || Ts()),
              deps: [[t, new Nn(), new Rn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (t.ɵprov = Q({ token: t, providedIn: "root", factory: Ts })), t;
      })();
      function Is(t, e, n, r, o = !1) {
        for (; null !== n; ) {
          const s = e[n.index];
          if ((null !== s && r.push(ne(s)), Vt(s)))
            for (let t = Nt; t < s.length; t++) {
              const e = s[t],
                n = e[1].firstChild;
              null !== n && Is(e[1], e, n, r);
            }
          const i = n.type;
          if (8 & i) Is(t, e, n.child, r);
          else if (32 & i) {
            const t = $n(n, e);
            let o;
            for (; (o = t()); ) r.push(o);
          } else if (16 & i) {
            const t = e[16],
              o = t[6].projection[n.projection];
            if (Array.isArray(o)) r.push(...o);
            else {
              const e = Un(t);
              Is(e[1], e, o, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Ss {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return Is(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Vt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (Xn(t, n), Cn(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          tr(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function (t, e, n, r) {
            const o = lo(e);
            o.push(r);
          })(0, this._lView, 0, t);
        }
        markForCheck() {
          no(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          ro(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            be(!0);
            try {
              ro(t, e, n);
            } finally {
              be(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            ur(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class Ms extends Ss {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          oo(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            be(!0);
            try {
              oo(t);
            } finally {
              be(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Ps = [new bs()],
        Os = new Es([new ps()]),
        Ds = new As(Ps),
        js = function () {
          return (
            (t = _e()), (e = fe()), 4 & t.type ? new Hs(e, t, ls(t, e)) : null
          );
          var t, e;
        };
      let Rs = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = js), t;
      })();
      const Ns = Rs,
        Hs = class extends Ns {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = Sr(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null
              );
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const r = this._declarationLView[19];
            return (
              null !== r && (n[19] = r.createEmbeddedView(e)),
              Or(e, n, t),
              new Ss(n)
            );
          }
        };
      class Vs {}
      const Fs = function () {
        return (function (t, e) {
          let n;
          const r = e[t.index];
          if (Vt(r)) n = r;
          else {
            let o;
            if (8 & t.type) o = ne(r);
            else {
              const n = e[11];
              o = n.createComment("");
              const r = re(t, e);
              nr(
                n,
                sr(n, r),
                o,
                (function (t, e) {
                  return te(t) ? t.nextSibling(e) : e.nextSibling;
                })(n, r),
                !1
              );
            }
            (e[t.index] = n = Yr(r, e, o, t)), eo(e, n);
          }
          return new zs(n, t, e);
        })(_e(), fe());
      };
      let Ls = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Fs), t;
      })();
      const Zs = Ls,
        zs = class extends Zs {
          constructor(t, e, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = n);
          }
          get element() {
            return ls(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new mn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = sn(this._hostTNode, this._hostLView);
            if (Je(t)) {
              const e = Ke(t, this._hostLView),
                n = Ye(t);
              return new mn(e[1].data[n + 8], e);
            }
            return new mn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Bs(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - Nt;
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r;
          }
          createComponent(t, e, n, r, o) {
            const s = n || this.parentInjector;
            if (!o && null == t.ngModule && s) {
              const t = s.get(Vs, null);
              t && (o = t);
            }
            const i = t.create(s, r, void 0, o);
            return this.insert(i.hostView, e), i;
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1];
            if (Vt(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  r = new zs(e, e[6], e[3]);
                r.detach(r.indexOf(t));
              }
            }
            const o = this._adjustIndex(e),
              s = this._lContainer;
            !(function (t, e, n, r) {
              const o = Nt + r,
                s = n.length;
              r > 0 && (n[o - 1][4] = e),
                r < s - Nt
                  ? ((e[4] = n[o]), xn(n, Nt + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const i = e[17];
              null !== i &&
                n !== i &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(i, e);
              const l = e[19];
              null !== l && l.insertView(t), (e[2] |= 128);
            })(r, n, s, o);
            const i = ar(o, s),
              l = n[11],
              a = sr(l, s[7]);
            return (
              null !== a &&
                (function (t, e, n, r, o, s) {
                  (r[0] = o), (r[6] = e), ur(t, r, n, 1, o, s);
                })(r, s[6], l, n, a, i),
              t.attachToViewContainerRef(),
              xn(Gs(s), o, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Bs(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = Xn(this._lContainer, e);
            n && (Cn(Gs(this._lContainer), e), tr(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = Xn(this._lContainer, e);
            return n && null != Cn(Gs(this._lContainer), e) ? new Ss(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function Bs(t) {
        return t[8];
      }
      function Gs(t) {
        return t[8] || (t[8] = []);
      }
      const $s = {};
      class Us extends ss {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = Dt(t);
          return new Qs(e, this.ngModule);
        }
      }
      function Ws(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const qs = new vn("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => zn,
      });
      class Qs extends rs {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(kr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Ws(this.componentDef.inputs);
        }
        get outputs() {
          return Ws(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const o = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, o) => {
                      const s = t.get(n, $s, o);
                      return s !== $s || r === $s ? s : e.get(n, r, o);
                    },
                  };
                })(t, r.injector)
              : t,
            s = o.get(us, ee),
            i = o.get(hs, null),
            l = s.createRenderer(null, this.componentDef),
            a = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (te(t)) return t.selectRootElement(e, n === ut.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(l, n, this.componentDef.encapsulation)
              : Yn(
                  s.createRenderer(null, this.componentDef),
                  a,
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? Kt
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(a)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: zn,
              clean: io,
              playerHandler: null,
              flags: 0,
            },
            d = Fr(0, null, null, 1, 0, null, null, null, null, null),
            f = Sr(null, d, h, u, null, null, s, l, i, o);
          let p, g;
          Ie(f);
          try {
            const t = (function (t, e, n, r, o, s) {
              const i = n[1];
              n[20] = t;
              const l = Mr(i, 20, 2, "#host", null),
                a = (l.mergedAttrs = e.hostAttrs);
              null !== a &&
                (ho(l, a, !0),
                null !== t &&
                  (Ue(o, t, a),
                  null !== l.classes && fr(o, t, l.classes),
                  null !== l.styles && dr(o, t, l.styles)));
              const c = r.createRenderer(t, e),
                u = Sr(
                  n,
                  Vr(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  l,
                  r,
                  c,
                  null,
                  null
                );
              return (
                i.firstCreatePass &&
                  (ln(nn(l, n), i, e.type), Gr(i, l), Ur(l, n.length, 1)),
                eo(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, f, s, l);
            if (c)
              if (n) Ue(l, c, ["ng-version", fs.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < t.length; ) {
                    let s = t[r];
                    if ("string" == typeof s)
                      2 === o
                        ? "" !== s && e.push(s, t[++r])
                        : 8 === o && n.push(s);
                    else {
                      if (!vr(o)) break;
                      o = s;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && Ue(l, c, t), e && e.length > 0 && fr(l, c, e.join(" "));
              }
            if (((g = oe(d, Rt)), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (p = (function (t, e, n, r, o) {
              const s = n[1],
                i = (function (t, e, n) {
                  const r = _e();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Wr(t, r, e, Pr(t, e, 1, null), n));
                  const o = pn(e, t, r.directiveStart, r);
                  Zn(o, e);
                  const s = re(r, e);
                  return s && Zn(s, e), o;
                })(s, n, e);
              if (
                (r.components.push(i),
                (t[8] = i),
                o && o.forEach((t) => t(i, e)),
                e.contentQueries)
              ) {
                const t = _e();
                e.contentQueries(1, i, t.directiveStart);
              }
              const l = _e();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Re(l.index),
                  zr(n[1], l, 0, l.directiveStart, l.directiveEnd, e),
                  Br(e, i)),
                i
              );
            })(t, this.componentDef, f, h, [So])),
              Or(d, f, null);
          } finally {
            De();
          }
          return new Js(this.componentType, p, ls(g, f), f, g);
        }
      }
      class Js extends class {} {
        constructor(t, e, n, r, o) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = o),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Ms(r)),
            (this.componentType = t);
        }
        get injector() {
          return new mn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const Ys = new Map();
      class Ks extends Vs {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Us(this));
          const n = jt(t),
            r = t[xt] || null;
          r && ns(r),
            (this._bootstrapComponents = Bn(n.bootstrap)),
            (this._r3Injector = bo(
              t,
              e,
              [
                { provide: Vs, useValue: this },
                { provide: ss, useValue: this.componentFactoryResolver },
              ],
              G(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = Io.THROW_IF_NOT_FOUND, n = ot.Default) {
          return t === Io || t === Vs || t === fo
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Xs extends class {} {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== jt(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const r = jt(n, !0),
                    o = r.id;
                  null !== o &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${G(
                            e
                          )} vs ${G(e.name)}`
                        );
                    })(o, Ys.get(o), n),
                    Ys.set(o, n));
                  const s = Bn(r.imports);
                  for (const i of s) e.has(i) || (e.add(i), t(i));
                })(t);
              })(t);
        }
        create(t) {
          return new Ks(this.moduleType, t);
        }
      }
      const ti = class extends C {
          constructor(t = !1) {
            super(), (this.__isAsync = t);
          }
          emit(t) {
            super.next(t);
          }
          subscribe(t, e, n) {
            let r,
              o = (t) => null,
              s = () => null;
            t && "object" == typeof t
              ? ((r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.next(e));
                    }
                  : (e) => {
                      t.next(e);
                    }),
                t.error &&
                  (o = this.__isAsync
                    ? (e) => {
                        setTimeout(() => t.error(e));
                      }
                    : (e) => {
                        t.error(e);
                      }),
                t.complete &&
                  (s = this.__isAsync
                    ? () => {
                        setTimeout(() => t.complete());
                      }
                    : () => {
                        t.complete();
                      }))
              : ((r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t(e));
                    }
                  : (e) => {
                      t(e);
                    }),
                e &&
                  (o = this.__isAsync
                    ? (t) => {
                        setTimeout(() => e(t));
                      }
                    : (t) => {
                        e(t);
                      }),
                n &&
                  (s = this.__isAsync
                    ? () => {
                        setTimeout(() => n());
                      }
                    : () => {
                        n();
                      }));
            const i = super.subscribe(r, o, s);
            return t instanceof h && t.add(i), i;
          }
        },
        ei = new vn("Application Initializer");
      let ni = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = is),
              (this.reject = is),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                Bo(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(ei, 8));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ri = new vn("AppId"),
        oi = {
          provide: ri,
          useFactory: function () {
            return `${si()}${si()}${si()}`;
          },
          deps: [],
        };
      function si() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ii = new vn("Platform Initializer"),
        li = new vn("Platform ID"),
        ai = new vn("appBootstrapListener");
      let ci = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ui = new vn("LocaleId"),
        hi = new vn("DefaultCurrencyCode");
      class di {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const fi = function (t) {
          return new Xs(t);
        },
        pi = fi,
        gi = function (t) {
          return Promise.resolve(fi(t));
        },
        _i = function (t) {
          const e = fi(t),
            n = Bn(jt(t).declarations).reduce((t, e) => {
              const n = Dt(e);
              return n && t.push(new Qs(n)), t;
            }, []);
          return new di(e, n);
        },
        mi = _i,
        yi = function (t) {
          return Promise.resolve(_i(t));
        };
      let wi = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = pi),
              (this.compileModuleAsync = gi),
              (this.compileModuleAndAllComponentsSync = mi),
              (this.compileModuleAndAllComponentsAsync = yi);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const vi = (() => Promise.resolve(0))();
      function bi(t) {
        "undefined" == typeof Zone
          ? vi.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class xi {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ti(!1)),
            (this.onMicrotaskEmpty = new ti(!1)),
            (this.onStable = new ti(!1)),
            (this.onError = new ti(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !n && e),
            (r.shouldCoalesceRunChangeDetection = n),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function () {
              let t = gt.requestAnimationFrame,
                e = gt.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  -1 === t.lastRequestAnimationFrameId &&
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(gt, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                Ei(t),
                                ki(t);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    Ei(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, s, i, l) => {
                  try {
                    return Ti(t), n.invokeTask(o, s, i, l);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Ai(t);
                  }
                },
                onInvoke: (n, r, o, s, i, l, a) => {
                  try {
                    return Ti(t), n.invoke(o, s, i, l, a);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Ai(t);
                  }
                },
                onHasTask: (e, n, r, o) => {
                  e.hasTask(r, o),
                    n === r &&
                      ("microTask" == o.change
                        ? ((t._hasPendingMicrotasks = o.microTask),
                          Ei(t),
                          ki(t))
                        : "macroTask" == o.change &&
                          (t.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (e, n, r, o) => (
                  e.handleError(r, o),
                  t.runOutsideAngular(() => t.onError.emit(o)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!xi.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (xi.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + r, t, Ci, is, is);
          try {
            return o.runTask(s, e, n);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Ci = {};
      function ki(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Ei(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Ti(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ai(t) {
        t._nesting--, ki(t);
      }
      class Ii {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ti()),
            (this.onMicrotaskEmpty = new ti()),
            (this.onStable = new ti()),
            (this.onError = new ti());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Si = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      xi.assertNotInAngularZone(),
                        bi(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                bi(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Pn(xi));
            }),
            (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Mi = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Di.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Di.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Pi {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Oi,
        Di = new Pi(),
        ji = !0,
        Ri = !1;
      function Ni() {
        return (Ri = !0), ji;
      }
      const Hi = new vn("AllowMultipleToken");
      function Vi(t, e, n = []) {
        const r = `Platform: ${e}`,
          o = new vn(r);
        return (e = []) => {
          let s = Fi();
          if (!s || s.injector.get(Hi, !1))
            if (t) t(n.concat(e).concat({ provide: o, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: o, useValue: !0 },
                  { provide: go, useValue: "platform" }
                );
              !(function (t) {
                if (Oi && !Oi.destroyed && !Oi.injector.get(Hi, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Oi = t.get(Li);
                const e = t.get(ii, null);
                e && e.forEach((t) => t());
              })(Io.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = Fi();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(o);
        };
      }
      function Fi() {
        return Oi && !Oi.destroyed ? Oi : null;
      }
      let Li = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Ii()
                      : ("zone.js" === t ? void 0 : t) ||
                        new xi({
                          enableLongStackTrace: Ni(),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              r = [{ provide: xi, useValue: n }];
            return n.run(() => {
              const e = Io.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                o = t.create(e),
                s = o.injector.get(Ln, null);
              if (!s)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      s.handleError(t);
                    },
                  });
                  o.onDestroy(() => {
                    Bi(this._modules, o), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return Bo(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(s, n, () => {
                  const t = o.injector.get(ni);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        ns(o.injector.get(ui, ts) || ts),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Zi({}, e);
            return (function (t, e, n) {
              const r = new Xs(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(zi);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${G(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(Io));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Zi(t, e) {
        return Array.isArray(e)
          ? e.reduce(Zi, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let zi = (() => {
        class t {
          constructor(t, e, n, r, o, s) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = o),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new y((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              l = new y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    xi.assertNotInAngularZone(),
                      bi(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  xi.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              var o;
              return (
                (o = r) && "function" == typeof o.schedule
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof y
                  ? t[0]
                  : (function (t = Number.POSITIVE_INFINITY) {
                      return D(m, t);
                    })(e)(
                      (function (t, e) {
                        return e
                          ? (function (t, e) {
                              return new y((n) => {
                                const r = new h();
                                let o = 0;
                                return (
                                  r.add(
                                    e.schedule(function () {
                                      o !== t.length
                                        ? (n.next(t[o++]),
                                          n.closed || r.add(this.schedule()))
                                        : n.complete();
                                    })
                                  ),
                                  r
                                );
                              });
                            })(t, e)
                          : new y(A(t));
                      })(t, n)
                    )
              );
            })(
              i,
              l.pipe((t) => {
                return N()(
                  ((e = z),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, L);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof rs
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(Vs),
              o = n.create(Io.NULL, [], e || n.selector, r),
              s = o.location.nativeElement,
              i = o.injector.get(Si, null),
              l = i && o.injector.get(Mi);
            return (
              i && l && l.registerApplication(s, i),
              o.onDestroy(() => {
                this.detachView(o.hostView),
                  Bi(this.components, o),
                  l && l.unregisterApplication(s);
              }),
              this._loadComponent(o),
              Ni() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              o
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Bi(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(ai, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(xi), Pn(ci), Pn(Io), Pn(Ln), Pn(ss), Pn(ni));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Bi(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const Gi = Vi(null, "core", [
          { provide: li, useValue: "unknown" },
          { provide: Li, deps: [Io] },
          { provide: Mi, deps: [] },
          { provide: ci, deps: [] },
        ]),
        $i = [
          { provide: zi, useClass: zi, deps: [xi, ci, Io, Ln, ss, ni] },
          {
            provide: qs,
            deps: [xi],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: ni, useClass: ni, deps: [[new Rn(), ei]] },
          { provide: wi, useClass: wi, deps: [] },
          oi,
          {
            provide: Es,
            useFactory: function () {
              return Os;
            },
            deps: [],
          },
          {
            provide: As,
            useFactory: function () {
              return Ds;
            },
            deps: [],
          },
          {
            provide: ui,
            useFactory: function (t) {
              return (
                ns(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    ts)
                ),
                t
              );
            },
            deps: [[new jn(ui), new Rn(), new Nn()]],
          },
          { provide: hi, useValue: "USD" },
        ];
      let Ui = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = Mt({ type: t })),
            (t.ɵinj = J({
              factory: function (e) {
                return new (e || t)(Pn(zi));
              },
              providers: $i,
            })),
            t
          );
        })(),
        Wi = null;
      function qi() {
        return Wi;
      }
      const Qi = new vn("DocumentToken");
      var Ji = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class Yi {}
      let Ki = (() => {
        class t extends Yi {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = Ko(e);
                  if (n) return n;
                  const r = e.split("-")[0];
                  if (((n = Ko(r)), n)) return n;
                  if ("en" === r) return Jo;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[Xo.PluralCase];
              })(e || this.locale)(t)
            ) {
              case Ji.Zero:
                return "zero";
              case Ji.One:
                return "one";
              case Ji.Two:
                return "two";
              case Ji.Few:
                return "few";
              case Ji.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(ui));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Xi {
        constructor(t, e) {
          (this._viewContainerRef = t),
            (this._templateRef = e),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let tl = (() => {
          class t {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(t) {
              (this._ngSwitch = t),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(t) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(t);
            }
            _matchCase(t) {
              const e = t == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || e),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                e
              );
            }
            _updateDefaultCases(t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (let e = 0; e < this._defaultViews.length; e++)
                  this._defaultViews[e].enforceState(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = Ot({
              type: t,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
            })),
            t
          );
        })(),
        el = (() => {
          class t {
            constructor(t, e, n) {
              (this.ngSwitch = n), n._addCase(), (this._view = new Xi(t, e));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Ho(Ls), Ho(Rs), Ho(tl, 1));
            }),
            (t.ɵdir = Ot({
              type: t,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
            })),
            t
          );
        })(),
        nl = (() => {
          class t {
            constructor(t, e, n) {
              n._addDefault(new Xi(t, e));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Ho(Ls), Ho(Rs), Ho(tl, 1));
            }),
            (t.ɵdir = Ot({
              type: t,
              selectors: [["", "ngSwitchDefault", ""]],
            })),
            t
          );
        })(),
        rl = (() => {
          class t {}
          return (
            (t.ɵmod = Mt({ type: t })),
            (t.ɵinj = J({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: Yi, useClass: Ki }],
            })),
            t
          );
        })();
      class ol extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new ol()), Wi || (Wi = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            il || ((il = document.querySelector("base")), il)
              ? il.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              sl || (sl = document.createElement("a")),
              sl.setAttribute("href", n),
              "/" === sl.pathname.charAt(0) ? sl.pathname : "/" + sl.pathname);
          var n;
        }
        resetBaseElement() {
          il = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [r, o] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (r.trim() === e) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let sl,
        il = null;
      const ll = new vn("TRANSITION_ID"),
        al = [
          {
            provide: ei,
            useFactory: function (t, e, n) {
              return () => {
                n.get(ni).donePromise.then(() => {
                  const n = qi();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [ll, Qi, Io],
            multi: !0,
          },
        ];
      class cl {
        static init() {
          var t;
          (t = new cl()), (Di = t);
        }
        addToWindow(t) {
          (gt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (gt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (gt.getAllAngularRootElements = () => t.getAllRootElements()),
            gt.frameworkStabilizers || (gt.frameworkStabilizers = []),
            gt.frameworkStabilizers.push((t) => {
              const e = gt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const o = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(o);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? qi().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const ul = new vn("EventManagerPlugins");
      let hl = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(ul), Pn(xi));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class dl {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = qi().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let fl = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        pl = (() => {
          class t extends fl {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => qi().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Pn(Qi));
            }),
            (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const gl = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        _l = /%COMP%/g;
      function ml(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let o = e[r];
          Array.isArray(o) ? ml(t, o, n) : ((o = o.replace(_l, t)), n.push(o));
        }
        return n;
      }
      function yl(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let wl = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new vl(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case ut.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new bl(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case ut.ShadowDom:
                return new xl(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = ml(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(hl), Pn(pl), Pn(ri));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class vl {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(gl[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const o = gl[r];
            o ? t.setAttributeNS(o, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = gl[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & (Gn.DashCase | Gn.Important)
            ? t.style.setProperty(e, n, r & Gn.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & Gn.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, yl(n))
            : this.eventManager.addEventListener(t, e, yl(n));
        }
      }
      class bl extends vl {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const o = ml(r + "-" + n.id, n.styles, []);
          e.addStyles(o),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              _l,
              r + "-" + n.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(_l, r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class xl extends vl {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = ml(r.id, r.styles, []);
          for (let s = 0; s < o.length; s++) {
            const t = document.createElement("style");
            (t.textContent = o[s]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Cl = (() => {
        class t extends dl {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(Qi));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const kl = ["alt", "control", "meta", "shift"],
        El = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Tl = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Al = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let Il = (() => {
        class t extends dl {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const o = t.parseEventName(n),
              s = t.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => qi().onAndCancel(e, o.domEventName, s));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const o = t._normalizeKey(n.pop());
            let s = "";
            if (
              (kl.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (s += t + "."));
              }),
              (s += o),
              0 != n.length || 0 === o.length)
            )
              return null;
            const i = {};
            return (i.domEventName = r), (i.fullKey = s), i;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Tl.hasOwnProperty(e) && (e = Tl[e]));
                }
                return El[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              kl.forEach((r) => {
                r != n && (0, Al[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (o) => {
              t.getEventFullKey(o) === e && r.runGuarded(() => n(o));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Pn(Qi));
          }),
          (t.ɵprov = Q({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Sl = Vi(Gi, "browser", [
          { provide: li, useValue: "browser" },
          {
            provide: ii,
            useValue: function () {
              ol.makeCurrent(), cl.init();
            },
            multi: !0,
          },
          {
            provide: Qi,
            useFactory: function () {
              return (
                (function (t) {
                  Xt = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Ml = [
          [],
          { provide: go, useValue: "root" },
          {
            provide: Ln,
            useFactory: function () {
              return new Ln();
            },
            deps: [],
          },
          { provide: ul, useClass: Cl, multi: !0, deps: [Qi, xi, li] },
          { provide: ul, useClass: Il, multi: !0, deps: [Qi] },
          [],
          { provide: wl, useClass: wl, deps: [hl, pl, ri] },
          { provide: us, useExisting: wl },
          { provide: fl, useExisting: pl },
          { provide: pl, useClass: pl, deps: [Qi] },
          { provide: Si, useClass: Si, deps: [xi] },
          { provide: hl, useClass: hl, deps: [ul, xi] },
          [],
        ];
      let Pl = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ri, useValue: e.appId },
                { provide: ll, useExisting: ri },
                al,
              ],
            };
          }
        }
        return (
          (t.ɵmod = Mt({ type: t })),
          (t.ɵinj = J({
            factory: function (e) {
              return new (e || t)(Pn(t, 12));
            },
            providers: Ml,
            imports: [rl, Ui],
          })),
          t
        );
      })();
      function Ol(t, e) {
        1 & t && (Lo(0, "pre"), Wo(1, "ng generate component xyz"), Zo());
      }
      function Dl(t, e) {
        1 & t && (Lo(0, "pre"), Wo(1, "ng add @angular/material"), Zo());
      }
      function jl(t, e) {
        1 & t && (Lo(0, "pre"), Wo(1, "ng add @angular/pwa"), Zo());
      }
      function Rl(t, e) {
        1 & t && (Lo(0, "pre"), Wo(1, "ng add _____"), Zo());
      }
      function Nl(t, e) {
        1 & t && (Lo(0, "pre"), Wo(1, "ng test"), Zo());
      }
      function Hl(t, e) {
        1 & t && (Lo(0, "pre"), Wo(1, "ng build --prod"), Zo());
      }
      "undefined" != typeof window && window;
      let Vl = (() => {
          class t {
            constructor() {
              this.title = "angular-app";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Tt({
              type: t,
              selectors: [["app-root"]],
              decls: 154,
              vars: 7,
              consts: [
                ["role", "banner", 1, "toolbar"],
                [
                  "width",
                  "40",
                  "alt",
                  "Angular Logo",
                  "src",
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==",
                ],
                [1, "spacer"],
                [
                  "aria-label",
                  "Angular on twitter",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://twitter.com/angular",
                  "title",
                  "Twitter",
                ],
                [
                  "id",
                  "twitter-logo",
                  "height",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 400 400",
                ],
                ["width", "400", "height", "400", "fill", "none"],
                [
                  "d",
                  "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23",
                  "fill",
                  "#fff",
                ],
                ["role", "main", 1, "content"],
                [1, "card", "highlight-card", "card-small"],
                [
                  "id",
                  "rocket",
                  "alt",
                  "Rocket Ship",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "101.678",
                  "height",
                  "101.678",
                  "viewBox",
                  "0 0 101.678 101.678",
                ],
                [
                  "id",
                  "Group_83",
                  "data-name",
                  "Group 83",
                  "transform",
                  "translate(-141 -696)",
                ],
                [
                  "id",
                  "Ellipse_8",
                  "data-name",
                  "Ellipse 8",
                  "cx",
                  "50.839",
                  "cy",
                  "50.839",
                  "r",
                  "50.839",
                  "transform",
                  "translate(141 696)",
                  "fill",
                  "#dd0031",
                ],
                [
                  "id",
                  "Group_47",
                  "data-name",
                  "Group 47",
                  "transform",
                  "translate(165.185 720.185)",
                ],
                [
                  "id",
                  "Path_33",
                  "data-name",
                  "Path 33",
                  "d",
                  "M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z",
                  "transform",
                  "translate(0.371 3.363)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Path_34",
                  "data-name",
                  "Path 34",
                  "d",
                  "M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z",
                  "transform",
                  "translate(0 0.005)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "rocket-smoke",
                  "alt",
                  "Rocket Ship Smoke",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "516.119",
                  "height",
                  "1083.632",
                  "viewBox",
                  "0 0 516.119 1083.632",
                ],
                [
                  "id",
                  "Path_40",
                  "data-name",
                  "Path 40",
                  "d",
                  "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z",
                  "transform",
                  "translate(-147.025 -140.939)",
                  "fill",
                  "#f5f5f5",
                ],
                [1, "card-container"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/tutorial",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24",
                  "height",
                  "24",
                  "viewBox",
                  "0 0 24 24",
                  1,
                  "material-icons",
                ],
                [
                  "d",
                  "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
                ],
                ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/cli",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://blog.angular.io/",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
                ],
                ["type", "hidden"],
                ["selection", ""],
                ["tabindex", "0", 1, "card", "card-small", 3, "click"],
                ["d", "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"],
                [1, "terminal", 3, "ngSwitch"],
                [4, "ngSwitchDefault"],
                [4, "ngSwitchCase"],
                [
                  "title",
                  "Animations",
                  "href",
                  "https://angular.io/guide/animations",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "id",
                  "Group_20",
                  "data-name",
                  "Group 20",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "21.813",
                  "height",
                  "23.453",
                  "viewBox",
                  "0 0 21.813 23.453",
                ],
                [
                  "id",
                  "Path_15",
                  "data-name",
                  "Path 15",
                  "d",
                  "M4099.584,972.736h0l-10.882,3.9,1.637,14.4,9.245,5.153,9.245-5.153,1.686-14.4Z",
                  "transform",
                  "translate(-4088.702 -972.736)",
                  "fill",
                  "#ffa726",
                ],
                [
                  "id",
                  "Path_16",
                  "data-name",
                  "Path 16",
                  "d",
                  "M4181.516,972.736v23.453l9.245-5.153,1.686-14.4Z",
                  "transform",
                  "translate(-4170.633 -972.736)",
                  "fill",
                  "#fb8c00",
                ],
                [
                  "id",
                  "Path_17",
                  "data-name",
                  "Path 17",
                  "d",
                  "M4137.529,1076.127l-7.7-3.723,4.417-2.721,7.753,3.723Z",
                  "transform",
                  "translate(-4125.003 -1058.315)",
                  "fill",
                  "#ffe0b2",
                ],
                [
                  "id",
                  "Path_18",
                  "data-name",
                  "Path 18",
                  "d",
                  "M4137.529,1051.705l-7.7-3.723,4.417-2.721,7.753,3.723Z",
                  "transform",
                  "translate(-4125.003 -1036.757)",
                  "fill",
                  "#fff3e0",
                ],
                [
                  "id",
                  "Path_19",
                  "data-name",
                  "Path 19",
                  "d",
                  "M4137.529,1027.283l-7.7-3.723,4.417-2.721,7.753,3.723Z",
                  "transform",
                  "translate(-4125.003 -1015.199)",
                  "fill",
                  "#fff",
                ],
                [
                  "title",
                  "CLI",
                  "href",
                  "https://cli.angular.io/",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "alt",
                  "Angular CLI Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "21.762",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 21.762 23.447",
                ],
                [
                  "id",
                  "Group_21",
                  "data-name",
                  "Group 21",
                  "transform",
                  "translate(0)",
                ],
                [
                  "id",
                  "Path_20",
                  "data-name",
                  "Path 20",
                  "d",
                  "M2660.313,313.618h0l-10.833,3.9,1.637,14.4,9.2,5.152,9.244-5.152,1.685-14.4Z",
                  "transform",
                  "translate(-2649.48 -313.618)",
                  "fill",
                  "#37474f",
                ],
                [
                  "id",
                  "Path_21",
                  "data-name",
                  "Path 21",
                  "d",
                  "M2741.883,313.618v23.447l9.244-5.152,1.685-14.4Z",
                  "transform",
                  "translate(-2731.05 -313.618)",
                  "fill",
                  "#263238",
                ],
                [
                  "id",
                  "Path_22",
                  "data-name",
                  "Path 22",
                  "d",
                  "M2692.293,379.169h11.724V368.618h-11.724Zm11.159-.6h-10.608v-9.345h10.621v9.345Z",
                  "transform",
                  "translate(-2687.274 -362.17)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Path_23",
                  "data-name",
                  "Path 23",
                  "d",
                  "M2709.331,393.688l.4.416,2.265-2.28-2.294-2.294-.4.4,1.893,1.893Z",
                  "transform",
                  "translate(-2702.289 -380.631)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Rectangle_12",
                  "data-name",
                  "Rectangle 12",
                  "width",
                  "3.517",
                  "height",
                  "0.469",
                  "transform",
                  "translate(9.709 13.744)",
                  "fill",
                  "#fff",
                ],
                [
                  "title",
                  "Augury",
                  "href",
                  "https://augury.rangle.io/",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "alt",
                  "Angular Augury Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  0,
                  "xmlns",
                  "xlink",
                  "http://www.w3.org/1999/xlink",
                  "width",
                  "21.81",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 21.81 23.447",
                ],
                ["id", "clip-path"],
                [
                  "id",
                  "Rectangle_13",
                  "data-name",
                  "Rectangle 13",
                  "width",
                  "10.338",
                  "height",
                  "10.27",
                  "fill",
                  "none",
                ],
                [
                  "id",
                  "Group_25",
                  "data-name",
                  "Group 25",
                  "transform",
                  "translate(0)",
                ],
                [
                  "id",
                  "Path_24",
                  "data-name",
                  "Path 24",
                  "d",
                  "M3780.155,311.417h0l-10.881,3.9,1.637,14.4,9.244,5.152,9.244-5.152,1.685-14.4Z",
                  "transform",
                  "translate(-3769.274 -311.417)",
                  "fill",
                  "#4a3493",
                ],
                [
                  "id",
                  "Path_25",
                  "data-name",
                  "Path 25",
                  "d",
                  "M3862.088,311.417v23.447l9.244-5.152,1.685-14.4Z",
                  "transform",
                  "translate(-3851.207 -311.417)",
                  "fill",
                  "#311b92",
                ],
                [
                  "id",
                  "Group_24",
                  "data-name",
                  "Group 24",
                  "transform",
                  "translate(6.194 6.73)",
                  "opacity",
                  "0.5",
                ],
                [
                  "id",
                  "Group_23",
                  "data-name",
                  "Group 23",
                  "transform",
                  "translate(0 0)",
                ],
                [
                  "id",
                  "Group_22",
                  "data-name",
                  "Group 22",
                  "clip-path",
                  "url(#clip-path)",
                ],
                [
                  "id",
                  "Path_26",
                  "data-name",
                  "Path 26",
                  "d",
                  "M3832.4,373.252a5.168,5.168,0,1,1-5.828-4.383,5.216,5.216,0,0,1,2.574.3,3.017,3.017,0,1,0,3.252,4.086Z",
                  "transform",
                  "translate(-3822.107 -368.821)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Path_27",
                  "data-name",
                  "Path 27",
                  "d",
                  "M3830.582,370.848a5.162,5.162,0,1,1-3.254-4.086,3.017,3.017,0,1,0,3.252,4.086Z",
                  "transform",
                  "translate(-3814.311 -359.969)",
                  "fill",
                  "#fff",
                ],
                [
                  "title",
                  "Protractor",
                  "href",
                  "https://www.protractortest.org/",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "alt",
                  "Angular Protractor Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "21.81",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 21.81 23.447",
                ],
                [
                  "id",
                  "Group_26",
                  "data-name",
                  "Group 26",
                  "transform",
                  "translate(0)",
                ],
                [
                  "id",
                  "Path_28",
                  "data-name",
                  "Path 28",
                  "d",
                  "M4620.155,311.417h0l-10.881,3.9,1.637,14.4,9.244,5.152,9.244-5.152,1.685-14.4Z",
                  "transform",
                  "translate(-4609.274 -311.417)",
                  "fill",
                  "#e13439",
                ],
                [
                  "id",
                  "Path_29",
                  "data-name",
                  "Path 29",
                  "d",
                  "M4702.088,311.417v23.447l9.244-5.152,1.685-14.4Z",
                  "transform",
                  "translate(-4691.207 -311.417)",
                  "fill",
                  "#b52f32",
                ],
                [
                  "id",
                  "Path_30",
                  "data-name",
                  "Path 30",
                  "d",
                  "M4651.044,369.58v-.421h1.483a7.6,7.6,0,0,0-2.106-5.052l-1.123,1.123-.3-.3,1.122-1.121a7.588,7.588,0,0,0-4.946-2.055v1.482h-.421v-1.485a7.589,7.589,0,0,0-5.051,2.058l1.122,1.121-.3.3-1.123-1.123a7.591,7.591,0,0,0-2.106,5.052h1.482v.421h-1.489v1.734h15.241V369.58Zm-10.966-.263a4.835,4.835,0,0,1,9.67,0Z",
                  "transform",
                  "translate(-4634.008 -355.852)",
                  "fill",
                  "#fff",
                ],
                [
                  "title",
                  "Find a Local Meetup",
                  "href",
                  "https://www.meetup.com/find/?keywords=angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "alt",
                  "Meetup Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24.607",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 24.607 23.447",
                ],
                [
                  "id",
                  "logo--mSwarm",
                  "d",
                  "M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z",
                  "transform",
                  "translate(0 0.123)",
                  "fill",
                  "#f64060",
                ],
                [
                  "title",
                  "Join the Conversation on Gitter",
                  "href",
                  "https://gitter.im/angular/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "alt",
                  "Gitter Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "19.447",
                  "height",
                  "19.447",
                  "viewBox",
                  "0 0 19.447 19.447",
                ],
                [
                  "id",
                  "Group_40",
                  "data-name",
                  "Group 40",
                  "transform",
                  "translate(-1612 -405)",
                ],
                [
                  "id",
                  "Rectangle_19",
                  "data-name",
                  "Rectangle 19",
                  "width",
                  "19.447",
                  "height",
                  "19.447",
                  "transform",
                  "translate(1612 405)",
                  "fill",
                  "#e60257",
                ],
                ["id", "gitter", "transform", "translate(1617.795 408.636)"],
                [
                  "id",
                  "Group_33",
                  "data-name",
                  "Group 33",
                  "transform",
                  "translate(0 0)",
                ],
                [
                  "id",
                  "Rectangle_15",
                  "data-name",
                  "Rectangle 15",
                  "width",
                  "1.04",
                  "height",
                  "9.601",
                  "transform",
                  "translate(2.304 2.324)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Rectangle_16",
                  "data-name",
                  "Rectangle 16",
                  "width",
                  "1.04",
                  "height",
                  "9.601",
                  "transform",
                  "translate(4.607 2.324)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Rectangle_17",
                  "data-name",
                  "Rectangle 17",
                  "width",
                  "1.04",
                  "height",
                  "4.648",
                  "transform",
                  "translate(6.91 2.324)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Rectangle_18",
                  "data-name",
                  "Rectangle 18",
                  "width",
                  "1.04",
                  "height",
                  "6.971",
                  "transform",
                  "translate(0 0)",
                  "fill",
                  "#fff",
                ],
                [
                  "href",
                  "https://github.com/angular/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                ],
                [1, "github-star-badge"],
                ["d", "M0 0h24v24H0z", "fill", "none"],
                [
                  "d",
                  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
                ],
                [
                  "d",
                  "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
                  "fill",
                  "#1976d2",
                ],
                [
                  "id",
                  "clouds",
                  "alt",
                  "Gray Clouds Background",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "2611.084",
                  "height",
                  "485.677",
                  "viewBox",
                  "0 0 2611.084 485.677",
                ],
                [
                  "id",
                  "Path_39",
                  "data-name",
                  "Path 39",
                  "d",
                  "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z",
                  "transform",
                  "translate(142.69 -634.312)",
                  "fill",
                  "#eee",
                ],
              ],
              template: function (t, e) {
                if (1 & t) {
                  const t = fe();
                  Lo(0, "div", 0),
                    zo(1, "img", 1),
                    Lo(2, "span"),
                    Wo(3, "Welcome"),
                    Zo(),
                    zo(4, "div", 2),
                    Lo(5, "a", 3),
                    Ne(),
                    Lo(6, "svg", 4),
                    zo(7, "rect", 5),
                    zo(8, "path", 6),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(9, "div", 7),
                    Lo(10, "div", 8),
                    Ne(),
                    Lo(11, "svg", 9),
                    Lo(12, "g", 10),
                    zo(13, "circle", 11),
                    Lo(14, "g", 12),
                    zo(15, "path", 13),
                    zo(16, "path", 14),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(17, "span"),
                    Wo(18),
                    Zo(),
                    Ne(),
                    Lo(19, "svg", 15),
                    zo(20, "path", 16),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(21, "h2"),
                    Wo(22, "Resources"),
                    Zo(),
                    Lo(23, "p"),
                    Wo(24, "Here are some links to help you get started:"),
                    Zo(),
                    Lo(25, "div", 17),
                    Lo(26, "a", 18),
                    Ne(),
                    Lo(27, "svg", 19),
                    zo(28, "path", 20),
                    Zo(),
                    He(),
                    Lo(29, "span"),
                    Wo(30, "Learn Angular"),
                    Zo(),
                    Ne(),
                    Lo(31, "svg", 19),
                    zo(32, "path", 21),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(33, "a", 22),
                    Ne(),
                    Lo(34, "svg", 19),
                    zo(35, "path", 23),
                    Zo(),
                    He(),
                    Lo(36, "span"),
                    Wo(37, "CLI Documentation"),
                    Zo(),
                    Ne(),
                    Lo(38, "svg", 19),
                    zo(39, "path", 21),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(40, "a", 24),
                    Ne(),
                    Lo(41, "svg", 19),
                    zo(42, "path", 25),
                    Zo(),
                    He(),
                    Lo(43, "span"),
                    Wo(44, "Angular Blog"),
                    Zo(),
                    Ne(),
                    Lo(45, "svg", 19),
                    zo(46, "path", 21),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(47, "h2"),
                    Wo(48, "Next Steps"),
                    Zo(),
                    Lo(49, "p"),
                    Wo(50, "What do you want to do next with your app?"),
                    Zo(),
                    zo(51, "input", 26, 27),
                    Lo(53, "div", 17),
                    Lo(54, "div", 28),
                    Go("click", function () {
                      return ge(t), (No(52).value = "component");
                    }),
                    Ne(),
                    Lo(55, "svg", 19),
                    zo(56, "path", 29),
                    Zo(),
                    He(),
                    Lo(57, "span"),
                    Wo(58, "New Component"),
                    Zo(),
                    Zo(),
                    Lo(59, "div", 28),
                    Go("click", function () {
                      return ge(t), (No(52).value = "material");
                    }),
                    Ne(),
                    Lo(60, "svg", 19),
                    zo(61, "path", 29),
                    Zo(),
                    He(),
                    Lo(62, "span"),
                    Wo(63, "Angular Material"),
                    Zo(),
                    Zo(),
                    Lo(64, "div", 28),
                    Go("click", function () {
                      return ge(t), (No(52).value = "pwa");
                    }),
                    Ne(),
                    Lo(65, "svg", 19),
                    zo(66, "path", 29),
                    Zo(),
                    He(),
                    Lo(67, "span"),
                    Wo(68, "Add PWA Support"),
                    Zo(),
                    Zo(),
                    Lo(69, "div", 28),
                    Go("click", function () {
                      return ge(t), (No(52).value = "dependency");
                    }),
                    Ne(),
                    Lo(70, "svg", 19),
                    zo(71, "path", 29),
                    Zo(),
                    He(),
                    Lo(72, "span"),
                    Wo(73, "Add Dependency"),
                    Zo(),
                    Zo(),
                    Lo(74, "div", 28),
                    Go("click", function () {
                      return ge(t), (No(52).value = "test");
                    }),
                    Ne(),
                    Lo(75, "svg", 19),
                    zo(76, "path", 29),
                    Zo(),
                    He(),
                    Lo(77, "span"),
                    Wo(78, "Run and Watch Tests"),
                    Zo(),
                    Zo(),
                    Lo(79, "div", 28),
                    Go("click", function () {
                      return ge(t), (No(52).value = "build");
                    }),
                    Ne(),
                    Lo(80, "svg", 19),
                    zo(81, "path", 29),
                    Zo(),
                    He(),
                    Lo(82, "span"),
                    Wo(83, "Build for Production"),
                    Zo(),
                    Zo(),
                    Zo(),
                    Lo(84, "div", 30),
                    Ro(85, Ol, 2, 0, "pre", 31),
                    Ro(86, Dl, 2, 0, "pre", 32),
                    Ro(87, jl, 2, 0, "pre", 32),
                    Ro(88, Rl, 2, 0, "pre", 32),
                    Ro(89, Nl, 2, 0, "pre", 32),
                    Ro(90, Hl, 2, 0, "pre", 32),
                    Zo(),
                    Lo(91, "div", 17),
                    Lo(92, "a", 33),
                    Ne(),
                    Lo(93, "svg", 34),
                    zo(94, "path", 35),
                    zo(95, "path", 36),
                    zo(96, "path", 37),
                    zo(97, "path", 38),
                    zo(98, "path", 39),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(99, "a", 40),
                    Ne(),
                    Lo(100, "svg", 41),
                    Lo(101, "g", 42),
                    zo(102, "path", 43),
                    zo(103, "path", 44),
                    zo(104, "path", 45),
                    zo(105, "path", 46),
                    zo(106, "rect", 47),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(107, "a", 48),
                    Ne(),
                    Lo(108, "svg", 49),
                    Lo(109, "defs"),
                    Lo(110, "clipPath", 50),
                    zo(111, "rect", 51),
                    Zo(),
                    Zo(),
                    Lo(112, "g", 52),
                    zo(113, "path", 53),
                    zo(114, "path", 54),
                    Lo(115, "g", 55),
                    Lo(116, "g", 56),
                    Lo(117, "g", 57),
                    zo(118, "path", 58),
                    Zo(),
                    Zo(),
                    Zo(),
                    zo(119, "path", 59),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(120, "a", 60),
                    Ne(),
                    Lo(121, "svg", 61),
                    Lo(122, "g", 62),
                    zo(123, "path", 63),
                    zo(124, "path", 64),
                    zo(125, "path", 65),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(126, "a", 66),
                    Ne(),
                    Lo(127, "svg", 67),
                    zo(128, "path", 68),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(129, "a", 69),
                    Ne(),
                    Lo(130, "svg", 70),
                    Lo(131, "g", 71),
                    zo(132, "rect", 72),
                    Lo(133, "g", 73),
                    Lo(134, "g", 74),
                    zo(135, "rect", 75),
                    zo(136, "rect", 76),
                    zo(137, "rect", 77),
                    zo(138, "rect", 78),
                    Zo(),
                    Zo(),
                    Zo(),
                    Zo(),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(139, "footer"),
                    Wo(140, " Love Angular?\xa0 "),
                    Lo(141, "a", 79),
                    Wo(142, " Give our repo a star. "),
                    Lo(143, "div", 80),
                    Ne(),
                    Lo(144, "svg", 19),
                    zo(145, "path", 81),
                    zo(146, "path", 82),
                    Zo(),
                    Wo(147, " Star "),
                    Zo(),
                    Zo(),
                    He(),
                    Lo(148, "a", 79),
                    Ne(),
                    Lo(149, "svg", 19),
                    zo(150, "path", 83),
                    zo(151, "path", 81),
                    Zo(),
                    Zo(),
                    Zo(),
                    Lo(152, "svg", 84),
                    zo(153, "path", 85),
                    Zo(),
                    Zo();
                }
                if (2 & t) {
                  const t = No(52);
                  Tr(18),
                    qo("", e.title, " app is running!"),
                    Tr(66),
                    Vo("ngSwitch", t.value),
                    Tr(2),
                    Vo("ngSwitchCase", "material"),
                    Tr(1),
                    Vo("ngSwitchCase", "pwa"),
                    Tr(1),
                    Vo("ngSwitchCase", "dependency"),
                    Tr(1),
                    Vo("ngSwitchCase", "test"),
                    Tr(1),
                    Vo("ngSwitchCase", "build");
                }
              },
              directives: [tl, nl, el],
              styles: [
                "",
                '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n\n  \n  @media screen and (max-width: 767px) {\n\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }',
              ],
            })),
            t
          );
        })(),
        Fl = (() => {
          class t {}
          return (
            (t.ɵmod = Mt({ type: t, bootstrap: [Vl] })),
            (t.ɵinj = J({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [],
              imports: [[Pl]],
            })),
            t
          );
        })();
      (function () {
        if (Ri)
          throw new Error("Cannot enable prod mode after platform setup.");
        ji = !1;
      })(),
        Sl()
          .bootstrapModule(Fl)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
