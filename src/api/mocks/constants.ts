import { faker } from "@faker-js/faker/.";

export const CURRENT_USER = {
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
};
