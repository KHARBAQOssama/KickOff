import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Card from "./Card";
import * as ExpoRouter from "expo-router"; // Import the entire module for mocking

describe("Card", () => {
  it("renders correctly", () => {
    const player = {
      id: "123",
      name: "John Doe",
      position: { name: "Forward" },
      image_path: "path/to/image.jpg",
      country: { image_path: "path/to/countryFlag.jpg", iso3: "USA" },
    };

    // Mock the useRouter function
    jest.spyOn(ExpoRouter, "useRouter").mockReturnValue({ push: jest.fn() });

    const { getByText, getByTestId } = render(<Card player={player} />);

    expect(getByText(player.name)).toBeTruthy();
    expect(getByText(player.position.name)).toBeTruthy();
    expect(getByTestId("country-flag")).toBeTruthy();
    expect(getByText(player.country.iso3 || player.country.iso2)).toBeTruthy();
  });

  it("navigates to player details page when pressed", () => {
    const player = {
      id: "123",
      name: "John Doe",
      position: { name: "Forward" },
      image_path: "path/to/image.jpg",
      country: { image_path: "path/to/countryFlag.jpg", iso3: "USA" },
    };

    const pushMock = jest.fn();
    jest.spyOn(ExpoRouter, "useRouter").mockReturnValue({ push: pushMock });

    const { getByTestId } = render(<Card player={player} />);
    const touchableOpacity = getByTestId("card-touchable");

    fireEvent.press(touchableOpacity);

    expect(pushMock).toHaveBeenCalledWith(`player-details/${player.id}`);
  });
});
