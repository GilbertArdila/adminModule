import axios from "axios";

import Category from "../schemas/category";
import Geek from "../schemas/geek";
import { API } from "./api";

export async function getGeekList() {
  const geeks: Geek[] = await axios.get(API + "/geeks").then((response) => {
    return response.data;
  });
  return geeks;
}

export async function getCategoryList() {
  const categories: Category[] = await axios
    .get(API + "/categories")
    .then((response) => {
      return response.data;
    });
  return categories;
}

export const deleteGeek = (id: string) => {
  axios.delete(API + "/geeks/" + id).then((response) => {
    return response.data;
  });
};

export const saveGeek = (geek: Geek) => {
  const id = geek.id;
  const info: any = { ...geek };
  delete info.category;
  info.categoryId = geek.category;
  try {
    if (id) {
      delete info.id;
      //editting
      axios.patch(API + "/geeks/" + id, info).then((response) => {
        return response.data;
      });
    } else {
      //creatting
      axios.post(API + "/geeks", info).then((response) => {
        return response.data;
      });
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export async function searchGeekById(id: string) {
  const geek: Geek = await axios.get(API + "/geeks/" + id).then((response) => {
    return response.data;
  });
  return geek;
}
