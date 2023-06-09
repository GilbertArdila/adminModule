import Category from "./category";

export default interface Geek {
  id?: string;
  name?: string;
  url?: string;
  description?: string;
  price?: number;
  category?: Category;
  quantity?: number;
}
