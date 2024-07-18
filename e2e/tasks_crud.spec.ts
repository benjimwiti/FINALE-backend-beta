import { test, expect } from '@playwright/test'

let TestUser
let accessToken
let testTask
test.describe(`Task CRUD operations`, ()=> {

    test.beforeAll(`Create User`, async({request}) => {
        const testUser = {
            name: "testUser",
            email: "testUser22383838383838383838@gmail.com",
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

    test.beforeAll(`login user`, async ({request}) => {
        const loginData = {
            email: `testUser2383838383838383838@gmail.com`,
            password: `testing123`
        }
        const response = await request.post("/auth/login", {data: loginData })
        const res = await response.json()
        // console.log(accessToken)
        accessToken = res.accessToken
        expect(response.status()).toBe(201)
    })

    test.beforeAll(`create task`, async({request}) => {
        const taskDataToSend = {
            title: "Plan Birthday party",
            description: "Invite friends, Order Cake from Matt-Bakers",
            dueDate: "07-10-2024",
            userId: TestUser._id
        }
        const response = await request.post(`/tasks`, {data: taskDataToSend})
        const { savedTask } = await response.json()
        testTask = savedTask
        expect(response.status()).toBe(201)
    })
    test(`fetch created Task`, async ({request}) => {
        const response = await request.get(`tasks/task/${testTask._id}`)
        const { savedTask } = await response.json()
        expect(response.status()).toBe(200)
    })

    test.afterAll(`update Task`, async ({request}) => {
        const updateData = {
            title: `Plan Boss' Birthday Party`,
            description: `order White-Forest cake`,
            dueDate: "07-14-2024"
        }
        if (testTask) {
            const response = await request.put(`/tasks/task/${testTask._id}`, {
            data: updateData,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            });
        expect(response.status()).toBe(201)
        }
    })


    test.afterAll(`Delete Task`, async({request}) => {
        
        // const response2 = await request.delete(`/user/66903cfe9536307dc2f6aba4`)
        const response = await request.delete(`/tasks/task/${testTask._id}`)
        console.log(await response.json())
        expect(response.status()).toBe(201)
    } )

})