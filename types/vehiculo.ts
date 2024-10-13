import { fakerES_MX } from "faker";
import { z } from "zod";

/**
 * datos de los camiones 
 * (matrícula, 
 * marca, 
 * color, 
 * modelo, 
 * nombre de Chofer 
 * celular *
 *  FECHA_HORA_LLEGADA 2021/09/29..19:16:15) 
 */
export const VehSchema = z.object({
  nombre: z.string(), // User's name
  celular: z.string(), // User's phone number
  color: z.string(),
  marca: z.string(),
  matricula: z.string(),
  modelo: z.string(),
  fecha: z.date(),
});

type Vehiculo = z.infer<typeof VehSchema>

function createVehiculos(size: number) {
  const vehiculos = []
  for (let i = 0; i < size; i++) {
    const nombre = fakerES_MX.person.firstName()
    const veh: Vehiculo  = {
      nombre, 
      celular: fakerES_MX.phone.number(),
      fecha: fakerES_MX.date.between({ from: new Date().setHours(1, 0, 0), to: new Date().setHours(5, 0, 0) }),
      color: fakerES_MX.vehicle.color(),
      marca: fakerES_MX.vehicle.manufacturer(),
      modelo: fakerES_MX.vehicle.model(),
      matricula: fakerES_MX.vehicle.vrm()
    }
    vehiculos.push(veh)
  }

  return vehiculos
}

console.log(createVehiculos(4))