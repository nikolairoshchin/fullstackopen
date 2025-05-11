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

let container;

beforeEach(() => {
  container = render(
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={func}
      handleDelete={func}
      user={user}
    />,
  ).container;
});

test("renders content", () => {
  const element = screen.getByText("Test blog title", { exact: false });
  expect(element).toBeDefined();

  const element1 = screen.getByText("Nikolai Roshchin author", {
    exact: false,
  });
  expect(element1).toBeDefined();

  const div = container.querySelector(".togglableContent");
  expect(div).toHaveStyle("display: none");
});

test("render url and likes when button clicked", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".togglableContent");
  expect(div).not.toHaveStyle("display: none");
});
