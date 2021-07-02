import { Request, Response }from "express";
import { resolveProjectReferencePath } from "typescript";
import CicloSchema from "../models/CicloSchema";

class CicloController{
    async listar(request: Request, response:Response){
        try{
            const ciclos = await CicloSchema.find();
            // response.status(200).json({
            //     data: ciclos,
            //     error:false,
            //     msg:"Lista de ciclos de pagamento atualizada!"
            // });

            response.status(200).json(ciclos);
        }catch(error){
            response.status(404).json({
                data: error,
                error: true,
                msg: "Não foi possível listar os ciclos de pagamento",
            });
        }
    }
    async listarPorId(request: Request, response: Response){
        try {
            const { id } = request.params;
            const ciclo = await CicloSchema.findOne({ _id: id });
            // console.log(await CicloSchema.exists({ _id: id }));
            // console.log(await CicloSchema.find({ _id: id }).countDocuments());
      
            if (ciclo != null) {
              //response.status(200).json({ data: ciclo, error: false, msg: "Ciclo encontrado!" });
              response.status(200).json(ciclo);
            } else {
              response.status(404).json({ data: ciclo, error: false, msg: "Ciclo não encontrado!" });
            }
          } catch (error) {
            response.status(400).json({ data: error, error: true, msg: "Esse não é um formato válido para o ID!" });
          }
    }
    //método assíncrono
    async cadastrar(request: Request, response:Response){
        try{
            const novoCiclo = await CicloSchema.create(request.body);     
            response.status(201).json(novoCiclo);
            /*response.status(201).json({
                data: novoCiclo,
                error:false,
                msg:"Ciclo cadastrado."
            });*/
        }
        catch(error){
            response.status(400).json({
                data: error,
                error: true,
                msg: "Não foi possível adicionar o ciclo",
            });
        }
    }
    async excluir(request: Request, response:Response){
        try {
            const { id } = request.params;
            console.log(id);
            const ciclo = await CicloSchema.deleteOne({ _id: id });
            if (ciclo != null) {
              response
                .status(200)
                .json(ciclo);
            }
            response
              .status(400)
              .json({ data: ciclo, error: false, msg: "ciclo não encontrado!" });
          } catch (error) {
            response
              .status(400)
              .json({ data: error, error: true, msg: "Formato de id não válido!" });
          }
    }

    async alterar(request: Request, response: Response) {
        if (!request.body) {
          response.status(404).json({
            error: true,
            msg: "Está faltando o body da request!",
          });
        }
        //const { id } = request.params;
        console.log(request.body);
        //tomar cuidado que _id precisa ser o que está
        //vindo do request
        const { _id, data, creditos, debitos } = request.body;
        try {
          const result = await CicloSchema.updateOne(
            { _id: _id },
            {
              $set: {
                data: data,
                creditos: creditos,
                debitos: debitos,
              },
            }
            );
                   
          if (result != null) {
            response.status(200).json({
              data: result,
              error: false,
              msg: "Ciclo atualizado com sucesso!",
            });
          }
          response.status(404).json({
            data: data,
            error: true,
            msg: "Ciclo não encontrado!",
          });
        } catch (err) {
          response.status(200).json({
            data: err,
            error: true,
            msg: "Ciclo não encontrado!",
          });
        }
      }
      //recupera a data do ciclo para exibição no FRONT
      async recuperaDataMesAno(request: Request, response: Response){
        let ano:number = Number(request.params.ano);
        let mes:number = Number(request.params.mes);
        let ciclos = await CicloSchema.find({}).sort({ date: -1});

        for(let ciclo of ciclos){
          if(ciclo.data.getFullYear() === ano &&
             ciclo.data.getMonth() === mes)
            {
              return response.status(200).json(ciclo);
            }
        }
        return response.status(404).json({msg:"Não encontrado."});

      }
}
//exportar somente o objeto
export { CicloController };