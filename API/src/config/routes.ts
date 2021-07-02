import { Router }from "express";
import { CicloController} from "../controllers/CicloController";
//pega as requisições http
const router = Router();
const cicloController = new CicloController();

router.get("/ciclo/listar", cicloController.listar);
router.get("/ciclo/listar/:id", cicloController.listarPorId);
router.post("/ciclo/cadastrar",cicloController.cadastrar);
router.delete("/ciclo/excluir/:id",cicloController.excluir);
router.get("/:ano/:mes",cicloController.recuperaDataMesAno);
router.put("/ciclo/alterar",cicloController.alterar);
export { router };