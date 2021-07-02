import { model, Schema } from 'mongoose';
import {CreditoSchema} from './CreditoSchema';
import {DebitoSchema} from './DebitoSchema';

//mongoose schema doc
const CicloSchema = new Schema(
    {
        data:{
            type:Date,
            required:[true,"O campo data é obrigatório"],
            min:["2000-01-01","Data permitida mínima 01/01/2000"]
        },
        //array de objeto para o schema do banco
        creditos: [CreditoSchema], 
        debitos: [DebitoSchema]
    },
    {
        //objeto criado e alterado
        timestamps:true,
    }
);
//exporta todo o modelo do mongoose
export default model("ciclos",CicloSchema);






