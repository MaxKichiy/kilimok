export const POST = async (req: any) => {
    const data = await req.json();
    const apiToken = `https://api.telegram.org/bot5952822405:AAE4ro2oSz5DAV5LAzmX_TvEBpxtK67Ev8I/sendMessage?chat_id=835005319&text=${data.item}`;

    try {
        const resp = await fetch(apiToken);
        const data = await resp.json();

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(`failed with ${error}`, { status: 500 });
    }
};
