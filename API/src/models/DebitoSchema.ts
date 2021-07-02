import { model, Schema } from 'mongoose';

//mongoose schema doc
const DebitoSchema = new Schema(
    {
        nome:{
            type:String,
            required:[true,"O campo nome do crédito é obrigatório!"],
        },
        valor:{
            type:Number,
            min:[1,"Valor mínimo de R$1,00"],
            required:[true,"O campo valor do crédito é obrigatório!"],
        },
        status:{
            type:String,
            enum:["PAGO","AGENDADO","PENDENTE"],
            uppercase:true
        }
    },
    {
        //objeto criado e alterado
        timestamps:true,
    }
);
//exportar somente o objeto
export {DebitoSchema};






