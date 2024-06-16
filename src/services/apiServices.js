import { axiosApiInstance } from "./axiosConfig";

export const fetchData = async (time_range, age, cid, sex) => {
    try {
        let url = "/psicossocial";

        const params = [];
        if (time_range) params.push(`time_range=${time_range}`);
        if (age) params.push(`age=${age}`);
        if (cid) params.push(`cid=${cid}`);
        if (sex) params.push(`sex=${sex}`);

        if (params.length > 0) {
            url += `?${params.join("&")}`;
        }

        console.log(`fetch url -> `, url);
        const res = await axiosApiInstance.get(url);
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rejogar o erro para ser tratado onde a função fetchData é chamada
    }
};
