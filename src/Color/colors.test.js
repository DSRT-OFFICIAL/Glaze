import colors from "../src/Color/Colors-libs.esm.js";

describe("Glaze Colors Library", () => {
  test("red500 should match Tailwind hex", () => {
    expect(colors.red500).toBe("#EF4444");
  });

  test("blue600 should match Tailwind hex", () => {
    expect(colors.blue600).toBe("#2563EB");
  });

  test("white should be #FFFFFF", () => {
    expect(colors.white).toBe("#FFFFFF");
  });
});
