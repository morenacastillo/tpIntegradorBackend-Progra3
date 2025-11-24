// Importacion de modulos para poder trabajar con rutas
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = join(dirname(__filename), "../../../"); 

export {
    __dirname,
    join
}
/* 
- fileURLToPath : convierte una URL de archivo a una ruta de sistema de archivos
- dirname: devuelve el directorio padre de una ruta 
- join: unir segmentos de ruta 

1. import.meta.url: proporciona la URL abosluta del modulo actual
2. fileURLToPath: convierte esta ruta a una ruta de sistema
3. dirname(__filename): obtenemos el directorio del archivo actual 
4. join(../../../): retrocede 3 niveles en la estructura de directorios utils => api => src => /
*/