(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[405], {
    8312: function (e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/", function () {
            return n(7697)
        }])
    }, 7697: function (e, t, n) {
        "use strict";
        n.r(t), n.d(t, {
            __N_SSG: function () {
                return u
            }, default: function () {
                return f
            }
        });
        var r = n(5893), s = n(9008), o = n.n(s), l = n(7294), i = n(6873), c = n.n(i);

        function a(e) {
            let {questionId: t, questionText: n, answerHtml: s} = e, [o, i] = (0, l.useState)(!1);
            return (0, r.jsxs)("div", {
                className: "space-y-1 my-7 ",
                children: [(0, r.jsx)("div", {
                    className: "bg-slate-800 rounded-xl p-4 text-white w-full text-center font-bold cursor-pointer shadow-lg",
                    onClick: () => {
                        i(!o)
                    },
                    children: n
                }), (0, r.jsx)("div", {
                    className: "",
                    children: (0, r.jsx)("div", {
                        className: c().markdown,
                        style: {display: o ? "block" : "none"},
                        dangerouslySetInnerHTML: {__html: s}
                    })
                })]
            })
        }

        let d = e => {
            let {allQuestions: t} = e;
            return (0, r.jsxs)("div", {
                className: "",
                children: [(0, r.jsxs)(o(), {
                    children: [(0, r.jsx)("title", {children: "Create Next App"}), (0, r.jsx)("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })]
                }), (0, r.jsxs)("main", {
                    className: "w-1/2 justify-center text-left m-auto",
                    children: [(0, r.jsx)("h1", {
                        className: "text-4xl font-bold my-5 w-full text-center",
                        children: 'Interview with Cuauh "oddgoo" Moreno'
                    }), t.map(e => (0, r.jsx)(a, {
                        questionId: e.id,
                        questionText: e.question,
                        answerHtml: e.formattedContent
                    }, e.id))]
                }), (0, r.jsx)("footer", {
                    className: "flex h-24 w-full items-center justify-center border-t",
                    children: (0, r.jsx)("a", {
                        className: "flex items-center justify-center gap-2",
                        href: "https://www.oddgoo.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: "Interview coded by www.oddgoo.com"
                    })
                })]
            })
        };
        var u = !0, f = d
    }, 6873: function (e) {
        e.exports = {markdown: "markdown-styles_markdown__h_8de"}
    }, 9008: function (e, t, n) {
        e.exports = n(3121)
    }
}, function (e) {
    e.O(0, [774, 888, 179], function () {
        return e(e.s = 8312)
    }), _N_E = e.O()
}]);