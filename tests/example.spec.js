import { test, expect } from '@playwright/test';
const username = 'standard_user'
const wrongPassword = 'standard_use'
const password = 'secret_sauce'

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
    test('raise Erorr', async({page})=> {
      await page.goto('https://saucedemo.com/')
      await page.getByPlaceholder('Username').fill(wrongPassword)
      await page.getByPlaceholder('Password').fill(password)
      await page.getByRole("button", {name: "Login"}).click()

      await expect(page.getByTestId('error-button')).toBeVisible()
    })
  })
})

