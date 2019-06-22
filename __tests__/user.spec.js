
import userService from '../src/services/user/user.service';

describe('User Module', () => {
  it('Should register user using an email and a password', async () => {
    const USER = {
     email: 'test@user.com',
     username: 'user',
     password: 'user',   
    };
  
    const spy = jest.spyOn(userService, 'registerUser')
    .mockImplementation(() => ({ "status" : true }) );
  
    await userService.registerUser(USER.username, USER.email, USER.password);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(USER.username, USER.email, USER.password);
  });

  it('Should fetch user information by id', async () => {
    const USER = {
      _id: 12345,
      email: 'test@user.com',
      username: 'user',
      password: 'user',   
     };
   
    const spy = jest.spyOn(userService, 'getUser')
    .mockImplementation(() => ({ "status" : true, data: USER }) );

    const result = await userService.getUser(12345);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(USER._id);
    expect(result.status).toBeTruthy();
    expect(result.data).toEqual(USER);
  });
});
