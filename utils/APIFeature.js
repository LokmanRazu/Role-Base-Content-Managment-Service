class ApiFeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    };
    //  FILTERING
    filter(){
        //  Matching Query Will be Delete from the 'queryObj' and Unmatched Query will be the main Query object 'queryobj'
        let queryObj = { ...this.queryString };
        const excludeFildes = ['page','sort','limit','fildes']   // Video Ref = 96
        excludeFildes.forEach(e => delete queryObj[e])

    //  ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)  // 'g' flag is important

        this.query.find(JSON.parse(queryStr));
        return this
    };
    sort(){
        // 2. Sorthing DATA
     if (this.queryString.sort){                     // Main Query
         const sortBy = this.queryString.sort.split(',').join(' ')
         this.query = this.query.sort(sortBy)
     }else{
         this.query = this.query.sort('-createdAt');
     }
 return this;
 };

 limitFields(){
         //  field DATA
 if(this.queryString.fields){
     console.log(this.queryString.fields)
   const fields = this.queryString.fields.split(',').join(' ')  
   this.query = this.query.select(fields)
 } else{
  this.query = this.query.select('-__v')   
 }
 return this;
 }

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