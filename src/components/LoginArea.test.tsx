import { render, screen, fireEvent } from "@testing-library/react";
import LoginArea from "./LoginArea";
import { BrowserRouter } from "react-router-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeRequired(): R;
    }
  }
}
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginArea", () => {
  it("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginArea />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/아이디/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(
      <BrowserRouter>
        <LoginArea />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /로그인/i });
    fireEvent.click(submitButton);

    expect(screen.getByLabelText(/아이디/i)).toBeRequired();
    expect(screen.getByLabelText(/비밀번호/i)).toBeRequired();
  });
});
