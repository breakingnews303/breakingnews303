// Back to top button
(function() {
  $(document).ready(function() {
    return $(window).scroll(function() {
      return $(window).scrollTop() > 200 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
    }), $("#back-to-top").click(function() {
      return $("html,body").animate({
        scrollTop: "0"
      })
    })
  })
}).call(this);

// Breaking News ticker by http://www.arlinadzgn.com
function getauthor(t) {
  for (var e = 0; e < t.length; e++) var i = t[e].name.$t;
  return i
}

function getmeta(t) {
  var e = [];
  e[1] = "Jan", e[2] = "Feb", e[3] = "Mar", e[4] = "Apr", e[5] = "May", e[6] = "Jun", e[7] = "Jul", e[8] = "Aug", e[9] = "Sep", e[10] = "Oct", e[11] = "Nov", e[12] = "Dec";
  var i = t.substring(0, 4),
    a = t.substring(5, 7),
    n = t.substring(8, 10),
    r = e[parseInt(a, 10)] + " " + n + " " + i;
  return r
}

function arlinadesignTicker(t) {
  var e = document.querySelector("#ticker"),
    i = t.feed.entry,
    a = "<ul id='ticket-wrapper-inner'>";
  if (i) {
    for (var n = 0; n < i.length; n++) {
      for (var r = i[n], s = 0; s < r.link.length; s++)
        if ("alternate" == r.link[s].rel) {
          var l = r.link[s].href;
          break
        }
      try {
        var o = '<img src="' + r.media$thumbnail.url + '"/>'
      } catch (t) {
        var o = ""
      }
      var u = r.title.$t,
        c = getauthor(r.author),
        d = getmeta(r.published.$t);
      a += "<li>" + o + '<h3><a href="' + l + '">' + u + '</a></h3><div class="tickermeta"><span>' + c + "</span> - <span>" + d + "</span></div></li>"
    }
    a += "</ul>", e.innerHTML = a
  }
  $("#ticker").vTicker()
}! function(t) {
  var e = {
      speed: 700,
      pause: 4e3,
      showItems: 1,
      mousePause: !0,
      height: 0,
      animate: !0,
      margin: 0,
      padding: 0,
      startPaused: !1
    },
    i = {
      moveUp: function(t, e) {
        i.animate(t, e, "up")
      },
      moveDown: function(t, e) {
        i.animate(t, e, "down")
      },
      animate: function(e, i, a) {
        var n = e.itemHeight,
          r = e.options,
          s = e.element,
          l = s.children("ul"),
          o = "up" === a ? "li:first" : "li:last";
        s.trigger("vticker.beforeTick");
        var u = l.children(o).clone(!0);
        if (0 < r.height && (n = l.children("li:first").height()), n += r.margin + 2 * r.padding, "down" === a && l.css("top", "-" + n + "px").prepend(u), i && i.animate) {
          if (e.animating) return;
          e.animating = !0, l.animate("up" === a ? {
            top: "-=" + n + "px"
          } : {
            top: 0
          }, r.speed, function() {
            t(l).children(o).remove(), t(l).css("top", "0px"), e.animating = !1, s.trigger("vticker.afterTick")
          })
        } else l.children(o).remove(), l.css("top", "0px"), s.trigger("vticker.afterTick");
        "up" === a && u.appendTo(l)
      },
      nextUsePause: function() {
        var e = t(this).data("state"),
          i = e.options;
        e.isPaused || 2 > e.itemCount || a.next.call(this, {
          animate: i.animate
        })
      },
      startInterval: function() {
        var e = t(this).data("state"),
          a = this;
        e.intervalId = setInterval(function() {
          i.nextUsePause.call(a)
        }, e.options.pause)
      },
      stopInterval: function() {
        var e = t(this).data("state");
        e && (e.intervalId && clearInterval(e.intervalId), e.intervalId = void 0)
      },
      restartInterval: function() {
        i.stopInterval.call(this), i.startInterval.call(this)
      }
    },
    a = {
      init: function(n) {
        a.stop.call(this);
        var r = jQuery.extend({}, e);
        n = t.extend(r, n);
        var r = t(this),
          s = {
            itemCount: r.children("ul").children("li").length,
            itemHeight: 0,
            itemMargin: 0,
            element: r,
            animating: !1,
            options: n,
            isPaused: n.startPaused ? !0 : !1,
            pausedByCode: !1
          };
        t(this).data("state", s), r.css({
          overflow: "hidden",
          position: "relative"
        }).children("ul").css({
          position: "absolute",
          margin: 0,
          padding: 0
        }).children("li").css({
          margin: n.margin,
          padding: n.padding
        }), isNaN(n.height) || 0 === n.height ? (r.children("ul").children("li").each(function() {
          var e = t(this);
          e.height() > s.itemHeight && (s.itemHeight = e.height())
        }), r.children("ul").children("li").each(function() {
          t(this).height(s.itemHeight)
        }), r.height((s.itemHeight + (n.margin + 2 * n.padding)) * n.showItems + n.margin)) : r.height(n.height);
        var l = this;
        n.startPaused || i.startInterval.call(l), n.mousePause && r.bind("mouseenter", function() {
          !0 !== s.isPaused && (s.pausedByCode = !0, i.stopInterval.call(l), a.pause.call(l, !0))
        }).bind("mouseleave", function() {
          (!0 !== s.isPaused || s.pausedByCode) && (s.pausedByCode = !1, a.pause.call(l, !1), i.startInterval.call(l))
        })
      },
      pause: function(e) {
        var i = t(this).data("state");
        if (i) {
          if (2 > i.itemCount) return !1;
          i.isPaused = e, i = i.element, e ? (t(this).addClass("paused"), i.trigger("vticker.pause")) : (t(this).removeClass("paused"), i.trigger("vticker.resume"))
        }
      },
      next: function(e) {
        var a = t(this).data("state");
        if (a) {
          if (a.animating || 2 > a.itemCount) return !1;
          i.restartInterval.call(this), i.moveUp(a, e)
        }
      },
      prev: function(e) {
        var a = t(this).data("state");
        if (a) {
          if (a.animating || 2 > a.itemCount) return !1;
          i.restartInterval.call(this), i.moveDown(a, e)
        }
      },
      stop: function() {
        t(this).data("state") && i.stopInterval.call(this)
      },
      remove: function() {
        var e = t(this).data("state");
        e && (i.stopInterval.call(this), e = e.element, e.unbind(), e.remove())
      }
    };
  t.fn.vTicker = function(e) {
    return a[e] ? a[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist on jQuery.vTicker") : a.init.apply(this, arguments)
  }
}(jQuery), $(function() {
  var t = document.createElement("script");
  t.src = "https://" + $(".ticker-wrap").data("domain") + "/feeds/posts/summary?alt=json&callback=arlinadesignTicker", t.type = "text/javascript", document.getElementsByTagName("body")[0].appendChild(t)
});
