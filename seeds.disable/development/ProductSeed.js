var faker = require('faker');

module.exports = (function() {

    var mockData = [];

    for (var i = 0; i < 10; i++) {
        mockData.push({
            publisher: faker.company.catchPhrase(),
            publishing_year: faker.date.recent(1000).getFullYear(),
            number: faker.finance.mask(2),
            subject: faker.lorem.sentence(),
            theme: faker.lorem.sentence(),
            annotation: faker.lorem.sentence(2),
            content: faker.lorem.paragraphs(2),
            isbn: faker.finance.account(),
            price: faker.finance.mask(3),
            image: faker.image.technics(),
            header: faker.company.catchPhrase(),
            balance: faker.finance.mask(2),
            text: faker.lorem.sentence(4)
        });
    }

    console.log("faker.date.recent(): ", faker.date.recent());

    return mockData;

}());

