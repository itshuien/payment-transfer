import { faker } from "@faker-js/faker/.";
import { makeFactory, each } from "factory.ts";
import { Transaction } from "../types";

const refDate = faker.date.recent();

export const transactionBuilder = makeFactory<Transaction>({
    id: each(() => faker.string.uuid()),
    sender: each(() => ({
        name: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        avatarUrl: faker.image.personPortrait({ size: 64 }),
    })),
    recipient: each(() => ({
        name: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        avatarUrl: faker.image.personPortrait({ size: 64 }),
    })),
    amount: each(() => faker.number.int({ min: 1, max: 1000 }) * (faker.helpers.arrayElement([-1, 1]))),
    note: each(() => faker.helpers.arrayElement([faker.lorem.sentence(), undefined])),
    status: each(() => faker.helpers.arrayElement(['completed', 'pending'])),
    createdAt: each((seq) => {
        const date = new Date(refDate);
        date.setDate(date.getDate() - seq); // date in descending order
        date.setHours(faker.number.int({ min: 0, max: 23 }));
        date.setMinutes(faker.number.int({ min: 0, max: 59 }));

        return date.toISOString();
    }),
    updatedAt: each(() => faker.date.recent().toISOString()),
});
