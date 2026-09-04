import { UserRegistration } from '../../pages/user-registration';
import {test} from '../../fixtures/fixture'

test('User registration', async ({ page }) => {
  const userReg = new UserRegistration(page)
  await userReg.registerNewUser()
});