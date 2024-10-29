class QueryFilters {
    constructor(query, queryParams) {
      this.query = query;
      this.queryParams = queryParams;
    }

    filterByMake() {
      if (this.queryParams.make) {
        this.query = this.query.where('make').equals(this.queryParams.make);
      }
      return this;
    }

    filterByModel() {
      if (this.queryParams.model) {
        this.query = this.query.where('model').equals(this.queryParams.model);
      }
      return this;
    }

    filterByYearRange() {
      if (this.queryParams.minYear || this.queryParams.maxYear) {
        this.query = this.query.where('year').gte(this.queryParams.minYear || 0).lte(this.queryParams.maxYear || 9999);
      }
      return this;
    }

    filterByPriceRange() {
      if (this.queryParams.minPrice || this.queryParams.maxPrice) {
        this.query = this.query.where('price').gte(this.queryParams.minPrice || 0).lte(this.queryParams.maxPrice || Infinity);
      }
      return this;
    }

    filterByMileageRange() {
      if (this.queryParams.minMileage || this.queryParams.maxMileage) {
        this.query = this.query.where('mileage').gte(this.queryParams.minMileage || 0).lte(this.queryParams.maxMileage || Infinity);
      }
      return this;
    }

    sortResults() {
      if (this.queryParams.sort) {
        const sortBy = this.queryParams.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      }
      return this;
    }

    execute() {
      return this.query;
    }
  }

  module.exports = QueryFilters;
