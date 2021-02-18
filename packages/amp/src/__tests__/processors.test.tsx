import Html2React from "@frontity/html2react/src/libraries/component";
import { HelmetProvider } from "frontity";
import { amp, toBeValidAmpHtml } from "./__utilities__/amp-validator";
import { FilledContext } from "react-helmet-async";

import processors from "../processors";
import { render } from "@testing-library/react";

expect.extend({ toBeValidAmpHtml });
HelmetProvider.canUseDOM = false;

test("Validate amp-img", async () => {
  const { container } = render(
    <Html2React html="<img src='test.img'></img>" processors={processors} />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-img
      src="test.img"
    />
  `);

  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});

test("Validate amp-iframe", async () => {
  const helmetContext = {};

  const { container } = render(
    <HelmetProvider context={helmetContext}>
      <Html2React html="<iframe src='test.html' />" processors={processors} />
    </HelmetProvider>
  );

  const head = (helmetContext as FilledContext).helmet;

  expect(head.script.toString()).toMatchInlineSnapshot(
    `"<script data-rh=\\"true\\" async=\\"true\\" custom-element=\\"amp-iframe\\" src=\\"https://cdn.ampproject.org/v0/amp-iframe-0.1.js\\"></script>"`
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <amp-iframe
      src="test.html"
    />
  `);

  expect(await amp(container.innerHTML)).toBeValidAmpHtml();
});
