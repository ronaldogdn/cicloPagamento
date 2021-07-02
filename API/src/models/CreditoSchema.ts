import { model, Schema } from 'mongoose';

//mongoose schema doc
const CreditoSchema = new Schema(
    {
        nome:{
            type:String,
            required:[true,"O campo nome do crédito é obrigatório!"],
        },
        valor:{
            type:Number,
            min:[1,"Valor mínimo de R$1,00"],
            required:[true,"O campo valor do crédito é obrigatório!"],
        }
    },
    {
        //objeto criado e alterado
        timestamps:true,
    }
);

export { CreditoSchema};






