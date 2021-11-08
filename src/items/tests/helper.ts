import Item from "../item.model";
import { IBaseItem, IItem } from "../item.interface";

const initialItems: IBaseItem[] = [
  {
    name: "Shoes",
    price: 60,
    description: "Running shoes for proffesionals",
    stockCount: 26,
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/06/18/18/42/running-shoe-371625_960_720.jpg",
    isOnSale: false,
  },
  {
    name: "Ball",
    price: 100,
    description: "Lorem ipsum...",
    stockCount: 120,
    imgUrl:
      "https://cdn.pixabay.com/photo/2013/07/12/14/07/basketball-147794_960_720.png",
    isOnSale: false,
  },
];

const getNonExistingId = async (): Promise<string> => {
  const item = new Item({
    name: "Lorem Ipsum",
    price: 50,
    description: "Lorem Ipsum",
    stockCount: 22,
    imgUrl: "Lorem psum",
    isOnSale: false,
  });
  await item.save();
  await item.remove();
  return item._id.toString();
};

export { initialItems, getNonExistingId };
