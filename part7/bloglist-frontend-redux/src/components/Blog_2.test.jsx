import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Blog from "./Blog";

const blog = {
  id: "blog1",
  user: "123456",
  title: "Test blog title",
  author: "Nikolai Roshchin author",
  url: "http://blog.url",
  likes: 1,
};

const user = { name: "Nikolai", userId: "123456" };

const func = () => {};
const mockHandler = vi.fn();

test("twice clicked like button set 2 likes", async () => {
  const mockHandler = vi.fn();
  render(
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={mockHandler}
      handleDelete={func}
      user={user}
    />,
  );
  const userClick = userEvent.setup();
  const button = screen.getByText("like");
  await userClick.click(button);
  await userClick.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
