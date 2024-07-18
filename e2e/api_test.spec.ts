import { test, expect } from '@playwright/test';
import { accessTokenSecret } from '../src/config/TSenv';


// test('Get Users', async ({ request }) => {
//     const response = await request.get('/user', {
//     headers: {
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJuYW1lIjoiam9obi0zIiwiZW1haWwiOiJqb2huLTNAZ21haWwuY29tIn0sImlhdCI6MTcyMDcxNzc4MSwiZXhwIjoxNzIxMzIyNTgxfQ.U0Bd9YIdgnu_mFjkWb_FQmVkkm2x9T3nDwLCeBquBn4',
//     },
// });
// expect(response.status()).toBe(200)
// })



let TestUser
let accessToken
test.describe(`User CRUD operations`, ()=> {

    test.beforeAll(`Create User`, async({request}) => {
        const testUser = {
            name: "testUser",
            email: "testUser@gmail.com",
            password: "testing123",
        }
    
        const response = await request.post("/auth/register", {
            data: testUser
        })
        const resData = await response.json()
        TestUser = resData.savedUser
        expect(response.status()).toBe(201)
    } )
    // console.log(`Create User Response: ${response.status()}`);
    console.log(TestUser)

    test(`login user`, async ({request}) => {
        const loginData = {
            email: `testUser@gmail.com`,
            password: `testing123`
        }
        const response = await request.post("/auth/login", {data: loginData })
        const res = await response.json()
        // console.log(accessToken)
        accessToken = res.accessToken
        expect(response.status()).toBe(201)
    })

    test(`fetch User Account Details`, async({request}) => {
        const response = await request.get(`/user/${TestUser._id}`)
        const { user } = await response.json()
        expect(response.status()).toBe(200)
        expect(user).toEqual(TestUser)
    })

    test.skip(`User Update`, async ({request}) => {
        const updateData = {
            name: `testUserUpdated`,
            email: `testUserUpdated@gmail.com`,
            password: `testing123`
        }
        if (TestUser) {
            const response = await request.put(`/user/${TestUser._id}`, {
            data: updateData,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            });
        expect(response.status()).toBe(200)
        }
    })


    test.afterAll(`Delete User`, async({request}) => {
        
        // const response2 = await request.delete(`/user/66903cfe9536307dc2f6aba4`)
        const response = await request.delete(`/user/${TestUser._id}`)
        console.log(await response.json())
        expect(response.status()).toBe(200)
    } )

})
