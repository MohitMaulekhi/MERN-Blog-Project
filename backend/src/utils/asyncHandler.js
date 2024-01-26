/*
    It takes another function as an argument, which is the request handler for a specific route.
    It returns a function that wraps the request handler in a promise and catches any errors that might occur.
*/

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}

export {asyncHandler}