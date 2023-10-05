// GET (read request)
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

// PATCH (Update request)

export const PATCH = async(request, { params }) => {
    const { prompt,tag } = await request.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        
        if(!existingPrompt) return new Response("Prompt not found", {status: 404})

        //One we found the prompt we update it
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200})
        
    } catch (error) {
        console.log(error)
        return new Response("Failed to update prompt", {status:500})
    }
}

// Delete (delete promptcard)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt Deleted Succesfully", {status: 200})

    } catch (error) {
        console.log(error)
        return new Response("Failed to delete prompt", { status:500 })
    }
}