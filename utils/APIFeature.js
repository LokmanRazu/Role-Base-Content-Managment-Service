class ApiFeatures {
  constructor(query, queryString) {
    this.query = query; // query = Model.find()
    this.queryString = queryString; // queryString = req.query
  }
  //  FILTERING
  filter() {
    let queryobj = { ...this.queryString };
    const excludeFildes = ['page', 'sort', 'limit', 'fildes']
    excludeFildes.forEach( e => delete queryobj[e])

    let queryStr = JSON.stringify(queryobj)
    console.log(`the QueryStr is : ${queryStr}`)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    this.query.find(JSON.parse(queryStr));
    return this
  };

  sort(){
    if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ')
        console.log(`sortBy : ${sortBy}`)
        this.query = this.query.sort(sortBy)
    }else{
        this.query = this.query.sort('-createdAt')
    }
    return this;
  };

  limitFields(){
if(this.queryString.fields){
console.log(this.queryString.fields)
const fields = this.queryString.fields.split(',').join(' ')  
this.query = this.query.select(fields)
} else{
this.query = this.query.select('-__v')   
}
return this;
};

paginate(){
    // Pagination {IMPORTANT}
const page = this.queryString.page * 1 || 1;
const limit = this.queryString.limit * 1 || 100;
const skip = (page -1) * limit;
this.query = this.query.skip(skip).limit(limit)
// Pagination (if DATA and VALUE are equals then refuse to empty DATA page)
// if(this.queryString.page){
//     const numTours = await Tour.countDocuments()
//     if(skip >= numTours) throw new Error('This page does not exist')
// }
 return this;
}
}

module.exports = ApiFeatures;