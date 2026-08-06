export async function formatAPIRequest(template:string, values:any[]):Promise<string>{
    return template.replace(/{(\d+)}/g, (match, key)=>{
        const index=parseInt(key,10);
        return index<values.length?String(values[index]):match;
    });
}