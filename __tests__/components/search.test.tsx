// __tests__/compontents/board.test.jsx
import { render } from "@testing-library/react";
import Search from "@/app/components/Search";

describe("Search", () => {
  it("should render with empty input search", () => {
    const { container } = render(
      <Search />
    );
    const cellElements = container.querySelectorAll(".searchTextbox");
    expect(cellElements.values.length).toEqual(0);
  });
});