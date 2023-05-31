import Item from "@models/file";
import { connectToDB } from "@utils/database";

export const POST = async (req: any) => {
    const { name, phoneNumber, post, city, order } = await req.json();

    const text = `ПІБ: ${name}, замовлення: ${order}, місто:${city}, телефон:${phoneNumber}, відділення:${post}`;
    const apiToken = `https://api.telegram.org/bot5952822405:AAE4ro2oSz5DAV5LAzmX_TvEBpxtK67Ev8I/sendMessage?chat_id=5647594632&text=${text}`;
    try {
        const resp = await fetch(apiToken);
        const data = await resp.json();

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(`failed with ${error}`, { status: 500 });
    }
};
