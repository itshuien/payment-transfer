import { faker } from "@faker-js/faker/.";
import { makeFactory, each } from "factory.ts";
import { Transaction } from "../types";
import { CURRENT_USER } from "./constants";

const refDate = faker.date.recent();

export const transactionBuilder = makeFactory<Transaction>(() => {
    const isOutgoingTransfer = faker.datatype.boolean(0.7);

    const oppositeUser = {
        name: faker.person.fullName(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        avatarUrl: faker.image.personPortrait({ size: 64 }),
    };

    const createdAt = each((seq) => {
        const date = new Date(refDate);
        date.setDate(date.getDate() - seq); // date in descending order
        date.setHours(faker.number.int({ min: 0, max: 23 }));
        date.setMinutes(faker.number.int({ min: 0, max: 59 }));

        return date.toISOString();
    });

    return {
        id: faker.string.alphanumeric(10).toUpperCase(),
        sender: isOutgoingTransfer ? CURRENT_USER : oppositeUser,
        recipient: isOutgoingTransfer ? oppositeUser : CURRENT_USER,
        amount: faker.number.int({ min: 1, max: 1000 }),
        note: faker.helpers.arrayElement([faker.lorem.sentence({ min: 0, max: 5 }), undefined]),
        status: faker.helpers.arrayElement(['completed', 'pending']),
        createdAt: createdAt,
        updatedAt: createdAt,
    }
});
