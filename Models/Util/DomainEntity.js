//Generic Entity Class
    class DomainEntity{
        #CreateDate;
        #UpdateDate;
        #id;
        #isActive;

        constructor(){
            this.#CreateDate = null;
            this.#UpdateDate = null;
            this.#id = null;
            this.#isActive = null;
        };
        
        setCreateDate(createDate) {
            this.#CreateDate = createDate;
        };

        setUpdateDate(updateDate) {
            this.#UpdateDate = updateDate;
        };
        
        setId(id) {
            this.#id = id;
        };
        
        setIsActive(isActive) {
            this.#isActive = isActive;
        };

        getCreateDate() {
            return this.#CreateDate;
        };

        getUpdateDate() {
            return this.#UpdateDate;
        };

        getId() {
            return this.#id;
        };
        
        getIsActive() {
            return this.#isActive;
        };
    };

//Exports
    module.exports = DomainEntity;