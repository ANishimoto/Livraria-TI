//Imports
    const DomainEntity = require("../Util/DomainEntity");
    const Book = require("./Book");

//Book's Stock Class
    class Stock extends DomainEntity{
        #Product;
        #quantity;
        #cost;
        #unitCost;
        #Supplier;

        constructor(){
            super();
            this.#Product = new Book();
            this.#quantity = null;
            this.#cost = null;
            this.#unitCost = null;
            this.#Supplier = null;
        };

        getProduct(){
            return this.#Product;
        };

        getQuantity(){
            return this.#quantity;
        };

        getCost(){
            return this.#cost;
        };

        getUnitCost(){
            return this.#unitCost;
        };

        getSupplier(){
            return this.#Supplier;
        };

        setProduct(Product){
            this.#Product = Product;
        };

        setQuantity(quantity){
            this.#quantity = quantity;
        };

        setCost(cost){
            this.#cost = cost;
        };

        setUnitCost(){
            this.#unitCost = this.getCost() / this.getQuantity();
        };

        setSupplier(Supplier){
            this.#Supplier = Supplier;
        };

    };

//Exports
    module.exports = Stock;