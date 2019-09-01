let request = require("request");
const mocha = require("mocha");
const path = require("path");
const expect = require("chai").expect;
const fs = require("fs");
const URL = "127.0.0.1";
const PORT = 3000;
const SUCCESS_STATUS_CODE = 200;
let sessionId;
const FULL_URL = `http://${URL}:${PORT}`;

// Setup the cookie jar to carry cookies
let j = request.jar();
request = request.defaults({jar:j});

before(function (done) {
    console.log("Delete all files in folder `files`...");
    let directory = ("../../files");
    fs.readdir(directory, (err, files) => {
        if (err) done(err);
      
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) done(err);
          });
        }
    });
    done();   
});
describe("POST-requests", () => {
    it("Wrong get request", (done) => {
        request.get({url: FULL_URL + "/lalal"}
        , (err, httpResp, body) => {
            if (err) {
                return done(err);
            }
            expect(body).to.equal(`Server is working. Please post at "/login" to submit a message.`);
            done();
        });
    });
    it("LOGIN", (done) => {
        request.post({
            url: FULL_URL + "/login"
        }, function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            let resp;
            try {
                resp = JSON.parse(body);
            } catch (e) {
                return done(e);
            }
            sessionId = resp.data.sessionId;
            expect(resp.status).to.equal("ok");
            expect(resp.data.sessionId).to.be;
            done();
          });
    });
    it("SUBSCRIBE", (done) => {
        request.post({
            url: FULL_URL + "/subscribe",
            json: true,
            body: {"sessionId": sessionId} }
        , function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            expect(body.status).to.equal("ok");
            expect(typeof body.data.token).to.equal("string");
            done();
          });
    });

    it("UPLOAD", (done) => {
        request.post({
            url: FULL_URL + "/upload",
            json: true,
            body: {
                sessionId,
                data: "hello",
                fileName: "name.txt",
                sizeOfFile: Math.round((JSON.stringify("helloworld").length / 4) * 3)
            }
        }
        , function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            expect(body.status).to.equal("ok");
            done();
          });
    });

    it("UPLOAD", (done) => {
        request.post({
            url: FULL_URL + "/upload",
            json: true,
            body: {
                sessionId,
                data: "world",
                fileName: "name.txt",
                sizeOfFile:  Math.round((JSON.stringify("helloworld").length / 4) * 3)
            }
        }
        , function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            expect(body.status).to.equal("ok");
            done();
          });
    });
    it("WRONG_FORMAT UPLOAD", (done) => {
        request.post({
            url: FULL_URL + "/upload",
            json: true,
            body: {
                sessionId,
                data: "hello",
                fileName: "name.txt"
            }
        }
        , function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            expect(body.status).to.equal("error");
            expect(body.error).to.equal("WRONG_FORMAT");
            done();
          });
    });

    it("Upload data > sizeOfFile", (done) => {
        let directory = ("../../files");
        fs.readdir(directory, (err, files) => {
            if (err) done(err);
        
            for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) done(err);
            });
            }
        });
        request.post({
            url: FULL_URL + "/upload",
            json: true,
            body: {
                sessionId,
                data: "hello",
                fileName: "name.txt",
                sizeOfFile: Math.round((JSON.stringify("H").length / 4) * 3)
            }
        }
        , function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            expect(body.status).to.equal("error");
            expect(body.error).to.equal("WRONG_FORMAT");
            done()
          });
    });

    it("WRONG_FORMAT", (done) => {
        let bigFile = fs.readFileSync("./diplom.txt", 'utf8');
        let sizeOfFile = fs.statSync("./diplom.txt").size;
        request.post({
            url: FULL_URL + "/upload",
            json: true,
            body: {
                sessionId,
                data: bigFile,
                fileName: "name.txt",
                sizeOfFile: 1
            }
        }
        , function(err, httpResp, body) {
            if (err) {
                return done(err);
            }
            expect(body.status).to.equal("error");
            expect(body.error).to.equal("WRONG_FORMAT");
            done();
          });
    });

    it("Send file partial", (done) => {
            let bigFileSize = fs.statSync("./diplom.txt").size; // in Bytes
            console.log(bigFileSize);
            
            let stream = fs.createReadStream("./diplom.txt", { encoding: "utf-8", flags: "r" });
            stream.on("data", (data)=>{
                console.log("data");
                
                request.post({
                    url: FULL_URL + "/upload",
                    json: true,
                    body: {
                        sessionId,
                        data: (data).toString(),
                        fileName: "name.txt",
                        sizeOfFile: bigFileSize
                    }
                }
                , function(err, httpResp, body) {
                    console.log(body);
                    expect(body.status).to.equal("ok");
                });
            });
            stream.on("end", () => {
                request.post({
                    url: FULL_URL + "/upload",
                    json: true,
                    body: {
                        sessionId,
                        data: "some text",
                        fileName: "name.txt",
                        sizeOfFile: bigFileSize
                    }
                }
                , function(err, httpResp, body) {
                    console.log(body);
                    expect(body.status).to.equal("error");
                    expect(body.err).to.equal("WRONG_FORMAT");
                });
                done();
            });
        
    }).timeout(15000);
});

function readPartOfFile(start) {
    return new Promise((resolve, reject) => {
        // let stream = fs.createReadStream("./diplom.txt", { encoding: "utf-8", start, end: start + (1024 * 1024) });
        // stream.on("error", err => reject(err));
        // stream.on("data", (chunk) => {
        //     console.log("chunk");
            
        //     resolve(chunk)});

        

      });
}