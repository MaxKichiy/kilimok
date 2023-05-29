import Item from "@models/file";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { skip } = await req.json();
    console.log("🚀 ~ file: route.ts:6 ~ POST ~ skip:", skip);

    try {
        await connectToDB();
        // const skip =
        //     req.query.skip && /^\d+$/.test(req.query.skip)
        //         ? Number(req.query.skip)
        //         : 0;
        const items = await Item.find({}, undefined, {
            skip: skip,
            limit: 2,
        });
        return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
        return new Response(`failed with ${error}`, { status: 500 });
    }
};
