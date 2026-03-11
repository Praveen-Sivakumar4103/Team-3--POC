import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import RegisterForm from "./RegisterForm";

describe("RegisterForm Component", () => {

  it("renders the register form", () => {
    render(<RegisterForm />);

    const heading = screen.getByRole("heading", { name: /register/i });
    expect(heading).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", () => {
    render(<RegisterForm />);

    const button = screen.getByRole("button", { name: /register/i });
    fireEvent.click(button);

    const nameError = screen.getByText("Name is required");
    expect(nameError).toBeInTheDocument();
  });

  it("allows user to type in input fields", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Full Name");

    fireEvent.change(nameInput, {
      target: { value: "Praveen" }
    });

    expect(nameInput.value).toBe("Praveen");
  });

});