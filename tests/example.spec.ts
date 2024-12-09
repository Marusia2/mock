import { test, expect } from '@playwright/test';

test.only('has title', async ({ page }) => {
  await page.goto('https://fe-delivery.tallinn-learning.ee/signin');
  await page.getByTestId('username-input').fill('testnewuser-user');
  await page.getByPlaceholder('Password').fill('password');


  const routeToMock = '**/login/student'
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpamEtcCIsImV4cCI6MTczMzQzOTkyMywiaWF0IjoxNzMzNDIxOTIzfQ.zjuEeSENo4w2zlh8oPGfPXCNlfOJdJ3UlSCBDzCakN9ZVJCMRGo8rpJmiJ72qX4oyowknEwn4kfFu9qDsssmrg'

  await page.route(routeToMock, async (route) => {
    await route.fulfill({
      status: 200,
      body: token
    });
  });
  await page.getByRole('button', {name: 'Sign in'}).click();

  const routeToMock2 = '**/orders'
  await page.route(routeToMock, async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        "status": "OPEN",
        "courierId": null,
        "customerName": "test",
        "customerPhone": "88888833",
        "comment": "test",
        "id": 2972
          })
    });
  });
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('test123');
  await page.getByTestId('phone-input').click();
  await page.getByTestId('phone-input').fill('4662662266');
  await page.getByTestId('comment-input').click();
  await page.getByTestId('comment-input').fill('testtest');
  await page.getByTestId('createOrder-button').click();
});

test('order search', async ({ page }) => {
  await page.goto('https://fe-delivery.tallinn-learning.ee/signin');
  await page.getByTestId('username-input').fill('testnewuser-user');
  await page.getByPlaceholder('Password').fill('password');


  const routeToMock = '**/login/student'
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpamEtcCIsImV4cCI6MTczMzQzOTkyMywiaWF0IjoxNzMzNDIxOTIzfQ.zjuEeSENo4w2zlh8oPGfPXCNlfOJdJ3UlSCBDzCakN9ZVJCMRGo8rpJmiJ72qX4oyowknEwn4kfFu9qDsssmrg'

  await page.route(routeToMock, async (route) => {
    await route.fulfill({
      status: 200,
      body: token
    });
  });
  await page.getByRole('button', {name: 'Sign in'}).click();

  const routeToMock2 = '**/orders/*'
  await page.route(routeToMock2, async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        "status": "ACCEPTED",
        "courierId": null,
        "customerName": "test",
        "customerPhone": "88888833",
        "comment": "test",
        "id": 2972
      })
    });
  });
  await page.getByTestId('openStatusPopup-button').click();
  await page.getByTestId('searchOrder-input').click();
  await page.getByTestId('searchOrder-input').fill('2973')
});
test('sign in mock 500', async ({ page }) => {
  await page.goto('https://fe-delivery.tallinn-learning.ee/signin');
  await page.getByTestId('username-input').fill('testnewuser-user');
  await page.getByPlaceholder('Password').fill('password');


  const routeToMock = '**/login/student'
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpamEtcCIsImV4cCI6MTczMzQzOTkyMywiaWF0IjoxNzMzNDIxOTIzfQ.zjuEeSENo4w2zlh8oPGfPXCNlfOJdJ3UlSCBDzCakN9ZVJCMRGo8rpJmiJ72qX4oyowknEwn4kfFu9qDsssmrg'

  await page.route(routeToMock, async (route) => {
    await route.fulfill({
      status: 500,

    });
  });
  await page.pause()
});
test('sign 2in mock 500', async ({context }) => {
  await context.addInitScript(() => {
    localStorage.setItem('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpamEtcCIsImV4cCI6MTczMzQzOTkyMywiaWF0IjoxNzMzNDIxOTIzfQ.zjuEeSENo4w2zlh8oPGfPXCNlfOJdJ3UlSCBDzCakN9ZVJCMRGo8rpJmiJ72qX4oyowknEwn4kfFu9qDsssmrg');
  });

  const page = await context.newPage()
  await page.goto('https://fe-delivery.tallinn-learning.ee')
  await expect(page.getByRole('button', {name: 'Order'})).toBeVisible()
});