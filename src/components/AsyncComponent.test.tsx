import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncComponent from "./AsyncComponent";

const user = userEvent.setup(); // userインスタンス生成

describe("AsyncComponent", () => {
  it("ボタンをクリックすると非同期処理が実行される", async () => {
    render(<AsyncComponent />);
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
    expect(screen.getByText("Updated text")).toBeInTheDocument();
    }, {
      interval: 50,
      timeout: 3000,
    });
  });
});
