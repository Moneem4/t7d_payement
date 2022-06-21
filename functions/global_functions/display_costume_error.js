exports.display_costume_error = (res, error) => {
  console.log(error)
  res.status(res.statusCode).json({
    error: true,
    message: error.message === undefined ? error  : error.message
    
  })
}
