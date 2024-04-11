import { axiosApiInstance } from "./axiosConfig";

export const fetchData = async (time_range, age, cid, sex) => {
  try {
    let url = `/psicossocial`;
    if (time_range) {
      url += `?time_range=${time_range}`;
    }
    if (age) {
      url += `&age=${age}`;
    }
    if (cid) {
      url += `&cid=${cid}`;
    }
    if (sex) {
      url += `&sex=${sex}`;
    }
    const res = await axiosApiInstance.get(url);
    //console.log(`fetch url -> `, url);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
