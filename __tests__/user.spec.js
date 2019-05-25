
const userService = require('../src/services/user/user.service');

describe('User Module', () => {
  it('Should register user using an email and a password', async () => {
    const USER = {
     email: 'test@user.com',
     username: 'user',
     password: 'user',   
    };
  
    const spy = jest.spyOn(userService, 'registerUser')
    .mockImplementation(() => ({ "Status" : true }) );
  
    await userService.registerUser(USER.username, USER.email, USER.password);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(USER.username, USER.email, USER.password);
  });
});
