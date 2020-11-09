const supertest =require("supertest")
const server =require("../api/server")
const db =require("../database/dbConfig")


describe("test register routher", ()=>{

    it("It creat a new user", async ()=>{
        const res = await supertest(server).post("/api/auth/register")
        .send({
            username:"kasech", 
            password:"del1"
        })
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("kasech")
        expect(res.body.password).toBe("del1")
         expect(res.body.id).toBeDefined()
        
         

    })
    it("register err", async ()=>{
    const res = await supertest(server).post("/api/auth/register")
        .send({
            username:"kasech", 
            password:"del1"
        })
        expect(res.statusCode).toBe(409)
        expect(res.body.message).toBe("Username is already taken")


    })
    it("user log in", async ()=>{
        const res = await supertest(server).post("/api/auth/login")
            .send({
                username:"kasech", 
                password:"del1"
            })
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("Welcome kasech")

        })
        it("user log err", async ()=>{
            const res = await supertest(server).post("/api/auth/login")
                .send({
                    username:"kasech", 
                    password:"del1"
                })
                expect(res.statusCode).toBe(400)
                expect(res.type).toBe("application/json")
                expect(res.body.message).toBe("You shall not pass!")
        
        
            })

    

})