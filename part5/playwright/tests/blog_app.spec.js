const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, addUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    addUser (request, 'Nikolai Roshchin', 'nicolr', 'salainen')
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'nicolr', 'salainen')
      await expect(page.getByText('Nikolai Roshchin logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'nicolr', 'wrong')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Nikolai Roshchin logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'nicolr', 'salainen')
      await expect(page.getByText('Nikolai Roshchin logged in')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'a new blog created by playwright', 'playwright', 'http://localhost:5173')
      await expect(page.getByTestId('blogList')).toContainText('a new blog created by playwright')
    })

    test('a blog can be liked', async ({ page, request }) => {
      createBlog(page, 'a new blog created by playwright', 'playwright', 'http://localhost:5173')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.locator('.togglableContent')).toContainText('likes: 0')
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.locator('.togglableContent')).toContainText('likes: 1')
      const respond = await request.get('http://localhost:3003/api/blogs')
      expect(respond.likes === 1)
    })

    test('user who added the blog can delete the blog', async ({ page, request }) => {
      createBlog(page, 'a new blog created by playwright', 'playwright', 'http://localhost:5173')
      page.on('dialog', async dialog => {
        if (dialog.message().includes('Delete blog a new blog created by playwright by playwright?')) {
            await dialog.accept()
          }
        })
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete' }).click()
      
      await expect(page.getByTestId('blogList')).not.toContainText('a new blog created by playwright')

      const respond = await request.get('http://localhost:3003/api/blogs')
      expect(respond.data).toBeUndefined()
    })

    test("only the user who added the blog sees the blog's delete button", async ({ page, request }) => {
      createBlog(page, 'a new blog created by playwright', 'playwright', 'http://localhost:5173')
      addUser(request, 'Second user', 'second', 'password')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()
      await page.getByRole('button', { name: 'logout'}).click()
      await loginWith(page, 'second', 'password')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
    
    test("blogs are arranged in the order according to the likes", async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/fill')
      await page.reload()
      await expect(page.getByText('Type wars Robert C. Martin')).toBeVisible()

      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      for ( let i = 0; i < 6; i++ )
        await viewButtons[0].click()

      let likeNum = []
      await page.getByRole('button', {name: 'sort'}).click()

      for (const li of await page.getByText(/likes: \d/, { exact: true }).all()) {
        likeNum = likeNum.concat(await li.textContent())
      }

      await expect(likeNum).toEqual([
                                    "likes: 12",
                                    "likes: 10",
                                    "likes: 7",
                                    "likes: 5",
                                    "likes: 2",
                                    "likes: 0"
                                  ])
    })
  })
})