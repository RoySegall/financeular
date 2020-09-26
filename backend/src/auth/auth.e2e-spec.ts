import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {AppModule} from "../app.module";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";
let mockGetByUsernameAndPassword = jest.fn();

jest.mock('../user/user.service', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        getByUsernameAndPassword: mockGetByUsernameAndPassword,
      };
    })
  };
});
//
// foo('Auth E2E', () => {
//   let app: INestApplication;
//
//   const sendGraphQlRequest = async (payload) => await request(app.getHttpServer())
//     .post('/graphql')
//     .send({query: payload})
//     .set('Accept', 'application/json');
//
//   const getUser = () => {
//     const user = new User();
//     user.id = 42;
//     user.username = 'john';
//     return user;
//   }
//
//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({imports: [AppModule]}).compile();
//     app = moduleRef.createNestApplication();
//     await app.init();
//   });
//
//   it(`Try to authenticate as an anonymous`, async () => {
//     const payload = `
//       query {
//         whoAmI {
//           username
//         }
//       }
//     `;
//     const response = await sendGraphQlRequest(payload);
//
//     expect(response.body.errors[0].message).toBe('Unauthorized')
//   });
//
//   it('Login with a wrong username and password', async () => {
//
//     const payload = `
//       mutation {
//         login (username: "simple_user", password: "1234") {
//           access_token
//           expires
//           refresh_token
//         }
//       }
//     `;
//
//     // Return a null - invalid username and password.
//     mockGetByUsernameAndPassword.mockImplementationOnce(() => null);
//     const response = await sendGraphQlRequest(payload);
//     expect(mockGetByUsernameAndPassword).toBeCalledWith("simple_user", "1234");
//     expect(response.body.errors[0].message).toBe('Username or password are wrong. Please check again');
//   });
//
//   it('Login with a valid username and password', async () => {
//     const payload = `
//       mutation {
//         login (username: "simple_user", password: "1234") {
//           access_token
//           expires
//           refresh_token
//         }
//       }
//     `;
//
//     // Return an access token - valid username and password.
//     mockGetByUsernameAndPassword.mockReturnValueOnce(getUser());
//
//     // Send the request and make sure the login method has been called.
//     const response = await sendGraphQlRequest(payload);
//     expect(Object.keys(response.body.data.login)).toStrictEqual(['access_token', 'expires', 'refresh_token']);
//     expect(mockGetByUsernameAndPassword).toBeCalledWith("simple_user", "1234");
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
// });
