var faker = require('faker');

module.exports = (function() {

    var mockData = [];

    for (var i = 0; i < 10; i++) {
        console.log(i);
        mockData.push({
            header: faker.company.catchPhrase,
            image: faker.image.technics(),
            theme: faker.lorem.words(),
            annotation: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            isbn: faker.finance.account(),
            price: faker.finance.mask()
        });
    }

    return mockData;

}());

