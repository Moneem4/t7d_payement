exports.display_costume_error = (res, error) => {
  if(error.response !== undefined && error.response.data){
    res.status(res.statusCode).json({
      error: true,
      message: error.response.data
      
    })
  }else{
    res.status(res.statusCode).json({
      error: true,
      message: error.message === undefined ? error  : error.message
      
    })
  }

}
