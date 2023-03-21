(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[405], {
    8312: function (e, t, s) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/", function () {
            return s(7697)
        }])
    }, 7697: function (e, t, s) {
        "use strict";
        s.r(t), s.d(t, {
            __N_SSG: function () {
                return m
            }, default: function () {
                return u
            }
        });
        var n = s(5893), r = s(9008), a = s.n(r), o = s(7294), i = s(6873), l = s.n(i);

        function c(e) {
            let {questionId: t, questionText: s, answerHtml: r} = e, [a, i] = (0, o.useState)(!1);
            return (0, n.jsxs)("div", {
                className: "space-y-1 my-8 ",
                children: [(0, n.jsx)("div", {
                    className: " bg-slate-800 rounded-xl p-4 text-white text-center font-bold cursor-pointer shadow-lg shadow-inner",
                    onClick: () => {
                        i(!a)
                    },
                    children: s
                }), (0, n.jsx)("div", {
                    className: "",
                    children: (0, n.jsx)("div", {
                        className: l().markdown,
                        style: {display: a ? "block" : "none"},
                        dangerouslySetInnerHTML: {__html: r}
                    })
                })]
            })
        }

        let d = e => {
            let {allQuestions: t} = e;
            return (0, n.jsxs)("div", {
                className: "",
                children: [(0, n.jsxs)(a(), {
                    children: [(0, n.jsx)("title", {children: 'Interview with Cuauhtemoc "oddgoo" Moreno'}), (0, n.jsx)("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })]
                }), (0, n.jsxs)("header", {
                    className: "flex flex-col w-full items-center",
                    children: [(0, n.jsx)("div", {
                        className: "text-center w-full mx-auto my-5",
                        children: (0, n.jsx)("a", {
                            href: "https://www.amberial.com",
                            className: "text-center mx-auto",
                            children: (0, n.jsx)("img", {
                                src: "https://amberial.com/img/logos/amberial.png",
                                className: "h-24 w-auto mx-auto"
                            })
                        })
                    }), (0, n.jsx)("h1", {
                        className: "text-4xl font-bold mt-6 mb-6 w-full text-center text-amber-300 drop-shadow",
                        children: 'Interview with Cuauh "oddgoo" Moreno'
                    })]
                }), (0, n.jsxs)("main", {
                    className: "sm:w-1/2 p-1 justify-center text-left m-auto",
                    children: [t.map(e => (0, n.jsx)(c, {
                        questionId: e.id,
                        questionText: e.question,
                        answerHtml: e.formattedContent
                    }, e.id)), (0, n.jsx)("iframe", {
                        className: "mx-auto mt-16 mb-32",
                        src: "https://store.steampowered.com/widget/917140/",
                        frameBorder: "0",
                        width: "580",
                        height: "190"
                    })]
                })]
            })
        };
        var m = !0, u = d
    }, 6873: function (e) {
        e.exports = {markdown: "markdown-styles_markdown__h_8de"}
    }, 9008: function (e, t, s) {
        e.exports = s(3121)
    }
}, function (e) {
    e.O(0, [774, 888, 179], function () {
        return e(e.s = 8312)
    }), _N_E = e.O()
}]);