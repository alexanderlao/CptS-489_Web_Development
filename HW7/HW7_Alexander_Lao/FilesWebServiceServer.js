// Alexander Lao
// 11481444
// 4/10/2017
// FilesWebServiceServer.js

// NOTES: Uses the approach where all list-oriented URLs start
//        with “/lists” and all file download URLs start with “/files”.
//        Server references the directory where this file is currently located.
//        To change the working path, modify the filePath variable on line 21.

var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

var server = http.createServer(function (request, response)
{
    // request to view the lists in XML format
    if (request.url == "/lists" || request.url == "/lists/")
    {
        var filePath = ".";
        var files = fs.readdirSync(filePath);

        response.writeHead(200,
        {
            "Content-Type": "application/xml",
            "Access-Control-Allow-Origin": "*"
        });

        // display the XML
        response.write("<file_list>");

        for (var i in files)
        {
            var name = files[i];

            // if the name corresponds to a directory
            if (fs.statSync(name).isDirectory())
            {
                response.write("<directory name='" + files[i] + "'>");
                response.write("<atime>" + fs.statSync(name).atime + "</atime>");
                response.write("</directory>");
            }
                // otherwise it's a file
            else
            {
                response.write("<file name='" + files[i] + "'>");
                response.write("<size>" + fs.statSync(name).size + "</size>");
                response.write("<atime>" + fs.statSync(name).atime + "</atime>");
                response.write("</file>");
            }
        }

        response.write("</file_list>");
        response.end();
    }
    // request to download a file (ex. http://localhost:8080/files/test.txt to download test.txt)
    else if (path.dirname(request.url) == "/files")
    {
        // retrieve the basename and extension name
        var basename = path.basename(request.url);
        var extName = path.extname(basename);

        // set the correct content type
        var contentType = "text/html";

        // found a file, download it
        if (extName != "")
        {
            switch (extName)
            {
                case ".png":
                    contentType = "image/png";
                    break;
                case ".gif":
                    contentType = "image/gif";
                    break;
                case ".jpeg":
                    contentType = "image/jpeg";
                    break;
                case ".jpg":
                    contentType = "image/jpeg";
                    break;
                case ".txt":
                    contentType = "text/plain";
                    break;
                case ".html":
                    contentType = "text/html";
                    break;
                case ".json":
                    contentType = "application/json";
                    break;
                case ".pdf":
                    contentType = "application/pdf";
                    break;
            }

            response.writeHead(200,
            {
                "Content-Type": contentType,
                "Access-Control-Allow-Origin": "*"
            });

            response.end("Downloading...");

            // download the file
            download(basename, request, response);
        }
        // at a dir, display it
        else
        {
            var filePath = "/Users/Alex/Desktop/HW7/" + basename + "/";
            var files = fs.readdirSync(filePath);

            response.writeHead(200,
            {
                "Content-Type": "application/xml",
                "Access-Control-Allow-Origin": "*"
            });

            // display the XML
            response.write("<file_list>");

            for (var i in files)
            {
                var name = files[i];

                // if the name corresponds to a directory
                if (fs.statSync(filePath + "/" + name).isDirectory())
                {
                    response.write("<directory name='" + files[i] + "'>");
                    response.write("<atime>" + fs.statSync(filePath + "/" + name).atime + "</atime>");
                    response.write("</directory>");
                }
                    // otherwise it's a file
                else
                {
                    response.write("<file name='" + files[i] + "'>");
                    response.write("<size>" + fs.statSync(filePath + "/" + name).size + "</size>");
                    response.write("<atime>" + fs.statSync(filePath + "/" + name).atime + "</atime>");
                    response.write("</file>");
                }
            }

            response.write("</file_list>");
            response.end();
        }
    }
    else
    {
        response.end("404: Navigate to '/lists' to view lists or '/files/filename.ext' to download filename.ext");
    }
});

var download = function (path, destination, callback)
{
    console.log("inside download basename = " + path + "\n");

    var filePath = path + "/";

    var file = fs.createWriteStream(path);
    var request = http.get(filePath, function (response)
    {
        response.pipe(file);

        file.on("finish", function ()
        {
            file.close(callback);
        });
    }).on("error", function (err)
    {
        fs.unlink(path);
        if (callback)
        {
            callback(err.message);
        }
    });
};

server.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');