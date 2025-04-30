import { test, expect } from '@playwright/test';
const username = 'standard_user'
const wrongUsername = 'standard_use'
const password = 'secret_sauce'
const wrongPassword = 'secret_sa'

test.describe('Login in Saucedemo', async() => {
  test.describe('+ Login with correct credential', async() => {
    test('Success login and show correct link', async({page}) => {
      await page.goto('https://saucedemo.com/')
      await page.getByPlaceholder('Username').fill(username)
      await page.getByPlaceholder('Password').fill(password)
      await page.getByRole("button", {name: "Login"}).click()

      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
      await expect(page).toHaveTitle('Swag Labs')
    })
  })
  test.describe('- Login with wrong credential', async() => {
    test('raise Erorr in login with wrong username', async({page})=> {
      await page.goto('https://saucedemo.com/')
      await page.getByPlaceholder('Username').fill(wrongUsername)
      await page.getByPlaceholder('Password').fill(password)
      await page.getByRole("button", {name: "Login"}).click()

      await expect(page.getByTestId('error-button')).toBeVisible()
    })
    test('raise Erorr in login with wrong password', async({page})=> {
      await page.goto('https://saucedemo.com/')
      await page.getByPlaceholder('Username').fill(username)
      await page.getByPlaceholder('Password').fill(wrongPassword)
      await page.getByRole("button", {name: "Login"}).click()

      await expect(page.getByTestId('error-button')).toBeVisible()
    })
  })
})
test.describe('Logout from Saucedemo', async() => {
  test('Success Logout', async({page}) => {
    await page.goto('https://saucedemo.com/')
    await page.getByPlaceholder('Username').fill(username)
    await page.getByPlaceholder('Password').fill(password)
    await page.getByRole("button", {name: "Login"}).click()

    await page.getByRole("button", {name: "Open Menu"}).click()
    await page.getByTestId('logout-sidebar-link').click()

    await expect(page).toHaveURL('https://www.saucedemo.com/')
  })
})

