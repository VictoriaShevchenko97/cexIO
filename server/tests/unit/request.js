let request = require("request");
const mocha = require("mocha");
const expect = require("chai").expect;

const URL = "127.0.0.1";
const PORT = 3000;
const SUCCESS_STATUS_CODE = 200;
let sessionId;
const FULL_URL = `http://${URL}:${PORT}`;
// Setup the cookie jar to carry cookies
let j = request.jar();
request = request.defaults({jar:j});

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
});

