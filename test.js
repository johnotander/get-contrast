const test = require("ava");
const contrast = require(".");

test("ratio", (t) => {
  t.deepEqual(Math.round(contrast.ratio("#fafafa", "rgba(0,0,0,.75)")), 20);
  t.truthy(contrast.ratio("tomato", "rebeccapurple"));
});

test("score", (t) => {
  t.deepEqual(contrast.score("#fafafa", "rgba(0,0,0,.75)"), "AAA");
  t.deepEqual(contrast.score("#fafafa", "#fff"), "Fail");
  t.deepEqual(contrast.score("tomato", "DarkSlateGray"), "AA Large");
});

test("isAccessible", (t) => {
  t.falsy(contrast.isAccessible("#fafafa", "#fff"));
  t.truthy(contrast.isAccessible("#fafafa", "rgba(0,0,0,.75)"));
});

test("isNotTransparent", (t) => {
  t.throws(() => contrast.isNotTransparent("rgba(255,255,255,0)"));
  t.throws(() => contrast.isNotTransparent("hsl(100,100,100,0)"));
  t.throws(() => contrast.isNotTransparent("transparent"));
  t.throws(() => contrast.isNotTransparent("#FFFFFF00"));

  t.truthy(
    contrast.isNotTransparent("rgba(0, 0, 0, 0)", { ignoreAlpha: true })
  );
});
