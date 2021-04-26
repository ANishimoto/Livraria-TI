//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const Publisher = require("./Publisher");
    const PriceGroup = require("./PriceGroup");

//Book Class
    class Book extends DomainEntity {
        #title;
        #Publisher;
        #authors;
        #categories;
        #publishYear;
        #edition;
        #ISBN;
        #numberOfPages;
        #synopsis;
        #dimensions;
        #PriceGroup;
        #barCode;
        #price;
        #stocks;

        constructor(){
            super();
            this.#title = null;
            this.#Publisher = new Publisher();
            this.#publishYear = null;
            this.#edition = null;
            this.#ISBN = null;
            this.#numberOfPages = null;
            this.#synopsis = null;
            this.#dimensions =  {
                                    height: null,
                                    width: null,
                                    weight: null,
                                    depth: null
                                };
            this.#PriceGroup = new PriceGroup();
            this.#barCode = null;
            this.#authors = [];
            this.#categories = [];
            this.#price = null;
            this.#stocks = [];
        };

        getTitle(){
            return this.#title;
        };

        getPublisher(){
            return this.#Publisher;
        };

        getPublishYear(){
            return this.#publishYear;
        };

        getEdition(){
            return this.#edition;
        };

        getISBN(){
            return this.#ISBN;
        };

        getNumberOfPages(){
            return this.#numberOfPages;
        };

        getSynopsis(){
            return this.#synopsis;
        };

        getDimensions(){
            return this.#dimensions;
        };

        getPriceGroup(){
            return this.#PriceGroup;
        };

        getBarCode(){
            return this.#barCode;
        };

        getAuthors(){
            return this.#authors;
        };

        getCategories(){
            return this.#categories;
        };

        getPrice(){
            return this.#price;
        };

        getStoks(){
            return this.#stocks;
        };

        setTitle(title){
            this.#title = title;
        };

        setPublisher(Publisher){
            this.#Publisher = Publisher;
        };

        setPublishYear(publishYear){
            this.#publishYear = publishYear;
        };

        setEdition(edition){
            this.#edition = edition;
        };

        setISBN(ISBN){
            this.#ISBN = ISBN;
        };

        setNumberOfPages(numberOfPages){
            this.#numberOfPages = numberOfPages;
        };

        setSynopsis(synopsis){
            this.#synopsis = synopsis;
        };

        setDimensions(dimensions){
            this.#dimensions = dimensions;
        };

        setPriceGroup(PriceGroup){
            this.#PriceGroup = PriceGroup;
        };

        setBarCode(barCode){
            this.#barCode = barCode;
        };

        setPrice(price){
            this.#price = price;
        };

        addAuthor(){
            this.#authors.push(author);
        };

        addCategory(category){
            this.#categories.push(category);
        };

        addStock(stock){
            this.#stocks.push(stock);
        };

    };

//Exports
    module.exports = Book;