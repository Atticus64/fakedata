import { faker } from "faker";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(), // Unique identifier for the user
  name: z.string(), // User's name
  email: z.string().email(), // User's email
  age: z.number().int().positive(), // User's age
  phone: z.string(), // User's phone number
  date: z.date(),
});

type User = z.infer<typeof UserSchema>;

function createUsers(size: number) {
  const users = []
  for (let i = 0; i < size; i++) {
    const name = faker.person.firstName()
    const user: User  = {
      name, 
      email: faker.internet.exampleEmail({ firstName: name }),
      id: faker.string.uuid(),
      age: faker.helpers.rangeToNumber({ min: 19, max: 55 }),
      phone: faker.phone.number(),
      date: faker.date.between({ from: new Date().setHours(1, 0, 0), to: new Date().setHours(5, 0, 0) })
    }
    users.push(user)
  }

  return users
}

async function _createFile(users: User[]) {
  const path = "./users.csv";

  const headers = ["ID", "NAME", "EMAIL", "AGE", "PHONE", "DATE"];
  const content = [];
  content.push(headers.join(","));

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const line =
      `\n${user.id},${user.name},${user.email},${user.age},${user.phone},${user.date.toISOString()}`;
    content.push(line);
  }

  await Deno.writeTextFile(path, content.join(""));
}

console.log(createUsers(10))