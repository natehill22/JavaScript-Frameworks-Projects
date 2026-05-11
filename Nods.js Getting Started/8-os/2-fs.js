/*
  //Reads file (with optional object). createReadStream doesn't use buffers so will use less memory
  readFile(path[, options])
  createReadStream(path[, options])

  //Writes file (with optional object). createWriteStream doesn't use buffers so will use less memory
  writeFile(file, data[, options])
  createWriteStream(path[, options])

  //Will append data to a file (or create file if it doesn't exist)
  appendFile(path, data[, options])
  //Will copy files (if file already exists in destination, it'll be over-written)
  copyFile(src, dest[, flags])
  //Will read information about files including size, datemodified, datecreated, etc.
  stat(path[, options])
  //Will read and change user's permissions for files and directories
  access(path[, mode]), chmod(path, mode), chown(path, uid, gid)
  //Will link, unlink, files and even truncate files
  link(existingPath, newPath), unlink(path)
  //Will truncate files
  truncate(path[, len])

  //Makes new directories
  mkdir(path[, mode])
  //Reads a directory's list of files
  readdir(path[, options])
  //Removes directories
  rmdir(path)
  //Renames existing directories
  rename(oldPath, newPath)

*/
