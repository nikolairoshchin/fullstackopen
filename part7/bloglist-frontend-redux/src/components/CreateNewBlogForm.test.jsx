import CreateNewBlogForm from "./CreateNewBlogForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Create new blog form test", async () => {
  const mockHandler = vi.fn((e) => e.preventDefault());

  const user = userEvent.setup();
  render(<CreateNewBlogForm handleCreateNewBlog={mockHandler} />);

  const userClick = userEvent.setup();
  const button = screen.getByText("create");
  const inputs = screen.getAllByRole("textbox");

  await user.type(inputs[0], "test title");
  await user.type(inputs[1], "test author");
  await user.type(inputs[2], "test url");

  await userClick.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][1]).toBe("test title");
  expect(mockHandler.mock.calls[0][2]).toBe("test author");
  expect(mockHandler.mock.calls[0][3]).toBe("test url");
});
