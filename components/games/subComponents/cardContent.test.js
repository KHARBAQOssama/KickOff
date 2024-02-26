import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CardContent from "./CardContent";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("CardContent", () => {
  it("renders correctly", () => {
    const fixture = {
      id: "123",
      participants: [
        { short_code: "ABC", image_path: "participant1.jpg" },
        { short_code: "DEF", image_path: "participant2.jpg" },
      ],
      starting_at: "2024-02-26 16:00:00",
    };

    const { getByText, getByTestId } = render(
      <CardContent fixture={fixture} />
    );

    expect(getByText(fixture.participants[0].short_code)).toBeTruthy();
    expect(getByText(fixture.participants[1].short_code)).toBeTruthy();
    expect(getByText("16:00")).toBeTruthy();
    expect(getByText("26 FEB")).toBeTruthy();

    expect(getByTestId("card-content-touchable")).toBeTruthy();
  });

  it("calls router.push with correct route when pressed", () => {
    const fixture = {
      id: "123",
      participants: [
        { short_code: "ABC", image_path: "participant1.jpg" },
        { short_code: "DEF", image_path: "participant2.jpg" },
      ],
      starting_at: "2024-02-26 16:00:00",
    };

    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    const { getByTestId } = render(<CardContent fixture={fixture} />);
    const touchableOpacity = getByTestId("card-content-touchable");

    fireEvent.press(touchableOpacity);

    expect(pushMock).toHaveBeenCalledWith(`game-details/${fixture.id}`);
  });
});
