import React from "react";
import { render } from "@testing-library/react-native";

import FavoriteToggler from "./FavoriteToggler";

describe("<FavoriteToggler />", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<FavoriteToggler />);
    const favoriteToggler = getByTestId("favorite-toggler");
    expect(favoriteToggler).toBeDefined();
  });
});
