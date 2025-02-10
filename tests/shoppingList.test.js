const request = require("supertest");
const app = require("../src/app");

describe("Shopping List API", () => {
    let createdListId;

    it("should create a new shopping list", async () => {
        const newList = { title: "Test List", ownerId: "user123", members: ["user123"] };
        const res = await request(app).post("/api/shopping-lists").send(newList);
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");

        createdListId = res.body.id;
        console.log("Created List ID:", createdListId);
    });

    it("should get all shopping lists", async () => {
        const res = await request(app).get("/api/shopping-lists");
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.shoppingLists)).toBeTruthy();
    });

    it("should get a shopping list by ID", async () => {
        if (!createdListId) {
            throw new Error("createdListId is undefined. Previous test might have failed.");
        }

        const res = await request(app).get(`/api/shopping-lists/${createdListId}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(createdListId);
    });

    it("should update a shopping list", async () => {
        if (!createdListId) {
            throw new Error("createdListId is undefined. Previous test might have failed.");
        }

        const updatedData = { title: "Updated Test List" };
        const res = await request(app).patch(`/api/shopping-lists/${createdListId}`).send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(updatedData.title);
    });

    it("should delete a shopping list", async () => {
        if (!createdListId) {
            throw new Error("createdListId is undefined. Previous test might have failed.");
        }

        const res = await request(app).delete(`/api/shopping-lists/${createdListId}`);

        expect(res.statusCode).toBe(200);
    });
});