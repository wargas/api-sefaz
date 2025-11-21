import axios from "axios";
import { get } from "lodash";

export async function getAuditores(ano: string | number, mes: string | number) {

    const params = {
        path: "/public/OpenReports/Portal_Producao/Painel_Remuneracao/Painel_Remuneracao.cda",
        dataAccessId: "sql_jndi",
        parampara_ano: ano,
        parammes_: mes,
        paramsituacao: "%",
        parammatricula_: "",
        parampara_orgao_ano_mes: "SECRETARIA DA FAZENDA",
        parampesquisa_: "",
        parampesquisa_cargo_: "AUD FISCAL DO TESOURO ESTADUAL",
        paramoutros: "3",
        paramlimit_: 1050,
        paramoffset_: 0
    };

    const url = "https://api.pentaho.transparencia.pe.gov.br/pentaho/plugin/cda/api/doQuery"

    const { data } = await axios.get(url, { params })

    const cols = get(data, 'metadata') as []

    const result = (get(data, 'resultset') as []).map((item: any[]) => {
        const obj: any = {}

        cols.forEach((c:any, i) => {
            const colName= String(c.colName).substring(2);
            if(colName == 'link') return;
            obj[colName] = item[i]
        })

        return obj;
    })

    // await Bun.write('result.json', JSON.stringify(result, null, 4))
    return result;
}