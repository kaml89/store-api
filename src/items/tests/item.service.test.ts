import * as ItemService from "../item.service";
import { IBaseItem, IItem } from "../item.interface";
import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import Item from "../item.model";
import { getNonExistingId, initialItems } from "./helper";

beforeEach(async () => {
  await Item.deleteMany({});
  for (const item of initialItems) {
    const newItem: IItem = new Item(item);
    await newItem.save();
  }
});

describe("Items", () => {
  it("Gets all items", async () => {
    const response = await request(app).get("/items/").expect(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Ball" })])
    );
  });

  it("Adds valid item", async () => {
    const newItem = {
      name: "Pants",
      price: 120,
      description: "Lorem ipsum...",
      stockCount: 20,
      imgUrl:
        "https://cdn.pixabay.com/photo/2020/03/02/12/13/jeans-4895573_960_720.jpg",
      isOnSale: false,
    };

    await request(app)
      .post("/items/")
      .send(newItem)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await request(app).get("/items/").expect(200);
    expect(response.body).toHaveLength(initialItems.length + 1);

    const dataInCollection = await Item.find({});
    expect(dataInCollection).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Pants" })])
    );
  });

  it("Removes item", async () => {
    const items = await Item.find({});
    const id = items[0]._id.toString();
    const response = await request(app).delete(`/items/${id}`).expect(202);
    const newItems = await Item.find({});
    expect(newItems.length).toBe(items.length - 1);
    expect(response.body.id).toEqual(id);
  });

  it("Sends 404 after deleting non existing item", async () => {
    const id = await getNonExistingId();
    await request(app).delete(`/items/${id}`).expect(404);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
