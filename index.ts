import { getAuditores } from "./src/getAuditores";

const server = Bun.serve({
    routes: {
        '/api/servidores': async req => {
            const {searchParams} = new URL(req.url);

            const ano = searchParams.get('ano') || '2025';
            const mes = searchParams.get('mes') || '9'; 

            
            const data = await getAuditores(ano, mes)
            return Response.json(data)
        }
    }
})

console.log(`Server running at ${server.url}`);
