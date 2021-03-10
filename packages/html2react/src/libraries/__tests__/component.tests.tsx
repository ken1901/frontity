/* eslint-disable @typescript-eslint/no-empty-function */
import TestRenderer from "react-test-renderer";
import Component from "../component";
import parse from "../parse";
import htmlMock from "./mocks/html";

describe("Component", () => {
  const libraries = {
    html2react: {
      parse,
      processors: [],
    },
  };
  const Html2React = Component as any;

  test("works just fine", () => {
    libraries.html2react.processors = [
      {
        name: "priority-15",
        priority: 15,
        test: () => false,
        processor: () => {},
      },
      {
        name: "priority-5",
        priority: 5,
        test: () => false,
        processor: () => {},
      },
      {
        name: "priority-none",
        test: () => false,
        processor: () => {},
      },
    ];

    expect(libraries.html2react.processors[0].name).toBe("priority-15");
    expect(libraries.html2react.processors[1].name).toBe("priority-5");
    expect(libraries.html2react.processors[2].name).toBe("priority-none");

    const result = TestRenderer.create(
      <Html2React html={htmlMock} libraries={libraries} />
    ).toJSON();

    expect(libraries.html2react.processors[0].name).toBe("priority-5");
    expect(libraries.html2react.processors[1].name).toBe("priority-none");
    expect(libraries.html2react.processors[2].name).toBe("priority-15");
    expect(result).toMatchSnapshot();
  });

  test("Should not pass classname to custom elements", () => {
    const html = `<my-custom-component style="height: auto;">`;

    const result = TestRenderer.create(
      <Html2React html={html} libraries={libraries} />
    );

    // Should not pass className to the custom component and pass the class instead
    expect(result.toJSON()).toMatchInlineSnapshot(`
      .emotion-0 {
        height: auto;
      }

      <my-custom-component
        class="emotion-0"
      />
    `);
  });

  test("Should pass 'class' to custom elements", () => {
    const html = `<my-custom-component class="test hello">`;

    const result = TestRenderer.create(
      <Html2React html={html} libraries={libraries} />
    );

    // Should preserve the class on the
    expect(result.toJSON()).toMatchInlineSnapshot(`
      <my-custom-component
        class="test hello"
      />
    `);
  });

  test("Should not pass classname to custom elements and concatenate class names", () => {
    const html = `<my-custom-component style="height: auto;" class="test">`;

    const result = TestRenderer.create(
      <Html2React html={html} libraries={libraries} />
    );

    expect(result.toJSON()).toMatchInlineSnapshot(`
      .emotion-0 {
        height: auto;
      }

      <my-custom-component
        class="test emotion-0"
      />
    `);
  });
});
