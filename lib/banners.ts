"use server";

import { ref, get } from "firebase/database";

import { db } from "./firebase";
import { Banner } from "@/types";

export const fetchBanners = async (): Promise<Banner[]> => {
    try {
        const bannersRef = ref(db, "banners");

        const snapshot = await get(bannersRef);
        if(!snapshot.exists()) return []

        const data = snapshot.val();

        let list = Object.entries(data).map(([id, val]) => ({ ...(val as any), id }))

        return list;
    } catch(error) {
        console.log(error);
        throw new Error("Could not fetch all banners.")
    }
}