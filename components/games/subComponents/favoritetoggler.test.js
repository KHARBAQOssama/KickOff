import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FavoriteToggler from "./FavoriteToggler";
import { toggleGameSaving } from "../../../src/features/global.slice";

jest.mock("react-redux", () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockStore = configureStore([]);

describe("FavoriteToggler", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      global: {
        savedGames: ["123"],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FavoriteToggler fixtureId="123" />
      </Provider>
    );

    expect(getByTestId("favorite-toggler")).toBeTruthy();
  });

  it("displays the correct heart icon based on saved status", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FavoriteToggler fixtureId="123" />
      </Provider>
    );

    const heartIcon = getByTestId("heart-icon");
    expect(heartIcon.props.source).toEqual(
      require("../../../assets/icons/red-heart.png")
    );
  });

  it("dispatches toggleGameSaving action when pressed", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FavoriteToggler fixtureId="456" />
      </Provider>
    );

    const heartIcon = getByTestId("heart-icon");
    fireEvent.press(heartIcon);

    expect(store.dispatch).toHaveBeenCalledWith(toggleGameSaving("456"));
  });
});
